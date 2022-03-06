import { User, CheckCodeUser, CheckCodeResponse, AddFriendPayLoad, UnFriendPayLoad, AcceptRequestFriend, RemoveRequestFriend } from "typings/user";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { PersonalRepository } from "apis/personal";
import { toast } from "react-toastify";

type UseUser = {
    listFriends: Array<User>,
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
export const usePersonal = (params?: any, pageParam = '' ) : UseUser => {
    const { mutateAsync: acceptRequestAsync } =
        useMutation((payload: AcceptRequestFriend) =>
        PersonalRepository.acceptRequestFriend(payload)
    );
    const { mutateAsync: removeRequestAsync } =
        useMutation((payload: RemoveRequestFriend) =>
        PersonalRepository.removeRequestFriend(payload)
    );
    
    const { mutateAsync: checkCodeUserAsync } =
        useMutation((payload: CheckCodeUser) =>
        PersonalRepository.checkCodeUser(payload)
    );

    const { mutateAsync: requestAddFriendAsync } =
        useMutation((payload: AddFriendPayLoad) =>
        PersonalRepository.requestAddFriend(payload)
    );

    const { mutateAsync: requestUnFriendAsync } =
        useMutation((payload: UnFriendPayLoad) =>
        PersonalRepository.requestUnFriend(payload)
    );

    const { mutateAsync: getCodeUserAsync } =
        useMutation(() =>
        PersonalRepository.getCodeUser()
    );

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
    const { data: dataUserCode, refetch: refetchCode } = useQuery("user_code", () => PersonalRepository.getCodeUser(), {enabled: false});
    const codeUser = dataUserCode?.data;

    // Danh sách bạn bè của mình
    const {
        status,
        data,
        error,
        refetch: refetchListFriends
    } = useQuery(
        ["list_friends", { pageParam }, params?.keyword],
        async () => {
            return PersonalRepository.listFriends({
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
    const infinityQuery = useInfiniteQuery(
        ['list_request_friends'],
        async ({ pageParam }: any) => {
            return PersonalRepository.listRequestFriends({
                ...params,
                lastestID: pageParam || "",
            })
        }
        ,
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    )
    const {
        isLoading: isLoadingListRequestFriends,
        refetch: refetchListRequestFriends,
        data: listRequestFriendsFromAPI, // dataListContracts
        fetchNextPage: nextPageListRequestFriends,
        fetchPreviousPage: prevPageListRequestFriends,
        hasNextPage: hasNextPage
    } = infinityQuery;

    const listRequestFriends = []
        .concat(
            ...(listRequestFriendsFromAPI?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecordRequest = listRequestFriendsFromAPI?.pages[0]?.data?.totalRecord;
    const totalPagesRequest = listRequestFriendsFromAPI?.pages[0]?.data?.totalPages;

    return {
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
        hasNextPage,
    }
}