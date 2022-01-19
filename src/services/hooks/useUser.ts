import { UpdateUser, UpdatePasswordUser, ListFriendsPayload, User, CheckCodeUser, CheckCodeResponse, AddFriendPayLoad, UnFriendPayLoad, UpdateAvatarUser } from "typings/user";
import { FetchNextPageOptions, useInfiniteQuery, useMutation, useQuery } from "react-query";
import UserRepository from "apis/user";
import { toast } from "react-toastify";

type UseUser = {
    listFriends: Array<User>,
    updateUser: (payload: UpdateUser) => Promise<void>,
    updatePasswordUser: (payload: UpdatePasswordUser) => Promise<void>,
    updateAvatarUser: (payload: UpdateAvatarUser) => Promise<void>,
    requestAddFriend: (payload: AddFriendPayLoad) => Promise<void>,
    requestUnFriend: (payload: UnFriendPayLoad) => Promise<void>,
    checkCodeUser: (payload: CheckCodeUser) => Promise<CheckCodeResponse>,
    getCodeUser: () => Promise<CheckCodeResponse>,
    codeUser: any;
    refetchCode: () => void,
    isLoadingListFriends: boolean,
    refetchListFriends: () => void,
    nextPageListFriends: (options?: FetchNextPageOptions | undefined) => void,
    prevPageListFriends: () => void,
    totalRecord: number | undefined,
    totalPages: number | undefined,
    hasNextPageListFriends: boolean | undefined,
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
    const { mutateAsync: updateAvatarUserAsync } =
        useMutation((payload: UpdateAvatarUser) =>
        UserRepository.updateAvatarUser(payload)
    );
    
    const { mutateAsync: checkCodeUserAsync } =
        useMutation((payload: CheckCodeUser) =>
        UserRepository.checkCodeUser(payload)
    );

    const { mutateAsync: requestAddFriendAsync } =
        useMutation((payload: AddFriendPayLoad) =>
        UserRepository.requestAddFriend(payload)
    );

    const { mutateAsync: requestUnFriendAsync } =
        useMutation((payload: UnFriendPayLoad) =>
        UserRepository.requestUnFriend(payload)
    );

    const { mutateAsync: getCodeUserAsync } =
        useMutation(() =>
        UserRepository.getCodeUser()
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

    const updateAvatarUser = async (payload: UpdateAvatarUser) => {
        try {
            const { error, data } = await updateAvatarUserAsync(payload);

            if (!error) {
                toast.success('Cập nhật ảnh đại diện thành công');
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

    const getCodeUser = async () => {
        try {
            const { error, data } = await getCodeUserAsync();

            if (!error) {
                toast.success('Tạo mã thành công');
                return data
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

    const checkCodeUser = async (payload: CheckCodeUser) => {
        try {
            const { error, data } = await checkCodeUserAsync(payload);
            if (!error) {
                return data
            } else {
                if(data && data[0]) {
                    if(data[0].message === 'code_invalid') {
                        toast.error('Mã không tồn tại');
                    }  
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

    const requestAddFriend = async (payload: AddFriendPayLoad) => {
        try {
            const { error, data } = await requestAddFriendAsync(payload);

            if (!error) {
                toast.success('Gửi lời mời kết bạn thành công');
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
    
    const requestUnFriend = async (payload: UnFriendPayLoad) => {
        try {
            const { error, data } = await requestUnFriendAsync(payload);

            if (!error) {
                toast.success('Hủy kết bạn thành công');
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

    // Get code
    const { data: dataUserCode, refetch: refetchCode } = useQuery("user_code", () => UserRepository.getCodeUser(), {enabled: false});
    const codeUser = dataUserCode?.data;

    // const { data: dataFriend, refetch: refetchFriend } = useQuery("user_code", () => UserRepository.checkCodeUser(), {enabled: false});
    // const friend = dataFriend?.data;

    // Get danh sách
    const {
        isLoading: isLoadingListFriends,
        refetch: refetchListFriends,
        data: dataListFriends,
        fetchNextPage: nextPageListFriends,
        fetchPreviousPage: prevPageListFriends,
        hasNextPage: hasNextPageListFriends
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            key || "list_friends",
            async ({ pageParam }: any) =>
                UserRepository.listFriends({ 
                    lastestID: pageParam || "",
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
    // const totalPages = dataListFriends?.pages[0]?.data?.totalPages;
    const totalPages = 5
    return {
        updateUser,
        updatePasswordUser,
        updateAvatarUser,
        requestAddFriend,
        requestUnFriend,
        checkCodeUser,
        codeUser,
        getCodeUser,
        refetchCode,
        listFriends,
        isLoadingListFriends,
        refetchListFriends,
        nextPageListFriends,
        prevPageListFriends,
        totalRecord,
        totalPages,
        hasNextPageListFriends,
    }
}