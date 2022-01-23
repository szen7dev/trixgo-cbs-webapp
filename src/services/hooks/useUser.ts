import { UpdateUser, UpdatePasswordUser, ListFriendsPayload, User, CheckCodeUser, CheckCodeResponse, AddFriendPayLoad, UnFriendPayLoad, UpdateAvatarUser, AcceptRequestFriend, RemoveRequestFriend } from "typings/user";
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
    acceptRequestFriend: (payload: AcceptRequestFriend) => Promise<void>,
    removeRequestFriend: (payload: RemoveRequestFriend) => Promise<void>,
    checkCodeUser: (payload: CheckCodeUser) => Promise<CheckCodeResponse>,
    getCodeUser: () => Promise<CheckCodeResponse>,
    codeUser: any;
    refetchCode: () => void,
    totalRecord: number | undefined,
    totalPage: number | undefined,
    nextCursor: string,
    refetchListFriends: () => void,
    // request friends
    isLoadingListRequestFriends: boolean,
    refetchListRequestFriends: () => void,
    listRequestFriends: Array<User>,
    nextPageListRequestFriends: () => void,
    prevPageListRequestFriends: () => void,
    hasNextPage: boolean | undefined,
    totalRecordRequest: number | undefined,
    totalPagesRequest: number | undefined,
};
export const useUser = (pageParam = '', params?: any ) : UseUser => {
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
    const { mutateAsync: acceptRequestAsync } =
        useMutation((payload: AcceptRequestFriend) =>
        UserRepository.acceptRequestFriend(payload)
    );
    const { mutateAsync: removeRequestAsync } =
        useMutation((payload: RemoveRequestFriend) =>
        UserRepository.removeRequestFriend(payload)
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

    const acceptRequestFriend = async (payload: AcceptRequestFriend) => {
        try {
            const { error, data } = await acceptRequestAsync(payload);

            if (!error) {
                toast.success('Đông ý kết bạn thành công');
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

    const removeRequestFriend = async (payload: RemoveRequestFriend) => {
        try {
            const { error, data } = await removeRequestAsync(payload);

            if (!error) {
                toast.success('Hủy lời mời kết bạn thành công');
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

    // Danh sách bạn bè của mình
    const {
        status,
        data,
        error,
        refetch: refetchListFriends
    } = useQuery(
        ["list_friends", { pageParam }, params.keyword],
        async () => {
            return UserRepository.listFriends({
                lastestID: pageParam || "",
                ...params,
            })
        },
        { keepPreviousData: true }
    );

    const listFriends = data?.data?.listRecords
    const totalRecord = data?.data?.totalRecord
    const totalPage = data?.data?.totalPage
    const nextCursor = data?.data?.nextCursor

    // Danh sách lời mời kết bạn
    // Get danh sách
    const {
        isLoading: isLoadingListRequestFriends,
        refetch: refetchListRequestFriends,
        data: listRequestFriendsFromAPI, // dataListContracts
        fetchNextPage: nextPageListRequestFriends,
        fetchPreviousPage: prevPageListRequestFriends,
        hasNextPage: hasNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            "list_request_friends", // Key để phân biệt vùng tác động bởi data thay đổi
            async ({ pageParams }: any) => 
            UserRepository.listRequestFriends({ 
                lastestID: pageParams ? pageParams : "",
                ...params
            }),
            {
                getNextPageParam: ({ nextCursor }: any) => {
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
            }
        );
    const listRequestFriends = [].concat(...(listRequestFriendsFromAPI?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecordRequest = listRequestFriendsFromAPI?.pages[0]?.data?.totalRecord;
    const totalPagesRequest = listRequestFriendsFromAPI?.pages[0]?.data?.totalPages;
    return {
        updateUser,
        updatePasswordUser,
        updateAvatarUser,
        requestAddFriend,
        requestUnFriend,
        acceptRequestFriend,
        removeRequestFriend,
        checkCodeUser,
        codeUser,
        getCodeUser,
        refetchCode,
        listFriends,
        totalRecord,
        totalPage,
        nextCursor,
        refetchListFriends,
        listRequestFriends,
        isLoadingListRequestFriends,
        refetchListRequestFriends,
        totalRecordRequest,
        totalPagesRequest,
        nextPageListRequestFriends,
        prevPageListRequestFriends,
        hasNextPage
    }
}