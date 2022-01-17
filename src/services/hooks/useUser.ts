import { UpdateUser, UpdatePasswordUser, ListFriendsPayload, User } from "typings/user";
import { FetchNextPageOptions, useInfiniteQuery, useMutation } from "react-query";
import UserRepository from "apis/user";
import { toast } from "react-toastify";

type UseUser = {
    listFriends: Array<User>,
    updateUser: (payload: UpdateUser) => Promise<void>,
    updatePasswordUser: (payload: UpdatePasswordUser) => Promise<void>,
    isLoadingListFriends: boolean,
    refetchListFriends: () => void,
    nextPageListFriends: (options?: FetchNextPageOptions | undefined) => void,
    prevPageListFriends: () => void,
    totalRecord: number | undefined,
    totalPages: number | undefined,
    hasNextPage: boolean | undefined,
};
export const useUser = (key?: string, params?: ListFriendsPayload) : UseUser => {
    const { mutateAsync: updateUserAsync } =
        useMutation((payload: UpdateUser) =>
        UserRepository.updateUser(payload)
        );

    const { mutateAsync: updatePasswordUserAsync } =
        useMutation((payload: UpdatePasswordUser) =>
        UserRepository.updatePasswordUser(payload)
        );
    const updateUser = async (payload: UpdateUser) => {
        try {
            const { error, message } = await updateUserAsync(payload);

            if (!error) {
                toast.success('Cập nhật thông tin thành công');
            } else {
                toast.error(message);
            }
        } catch (error: unknown) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const updatePasswordUser = async (payload: UpdatePasswordUser) => {
        try {
            const { error, data } = await updatePasswordUserAsync(payload);

            if (!error) {
                toast.success('Cập nhật mật khẩu thành công');
            } else {
                if(data && data[0]) {
                    toast.error(data[0].message);
                }
            }
        } catch (error: unknown) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };
    // Get danh sách
    const {
        isLoading: isLoadingListFriends,
        refetch: refetchListFriends,
        data: dataListFriends,
        fetchNextPage: nextPageListFriends,
        fetchPreviousPage: prevPageListFriends,
        hasNextPage: hasNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            key || "list_friends",
            async ({ pageParam }: any) =>
                UserRepository.listFriends({ 
                    lastestID: pageParam ? pageParam : "",
                    ...params,
                }),
            {
                getNextPageParam: (params: any) => {
                    const nextCursor = params?.data?.nextCursor;
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
            }
        );
    const listFriends = [].concat(...(dataListFriends?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = dataListFriends?.pages[0]?.data?.totalRecord;
    const totalPages = dataListFriends?.pages[0]?.data?.totalPages;
    return {
        updateUser,
        updatePasswordUser,
        listFriends,
        isLoadingListFriends,
        refetchListFriends,
        nextPageListFriends,
        prevPageListFriends,
        totalRecord,
        totalPages,
        hasNextPage,
    }
}