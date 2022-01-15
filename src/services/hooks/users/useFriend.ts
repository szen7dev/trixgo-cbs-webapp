import { useInfiniteQuery } from "react-query";

import { FriendRepository } from 'apis/users';
import type { Friend, ListFriendPayload } from 'typings/users/firends';

interface UseQueryListFriend {
    loading: boolean;
    data: Friend[];
    hasNextPage?: boolean;
    totalPages: number;
    totalRecord: number;
    refetch: () => void;
    fetchNextPage: () => void;
}

type ParamsQuery = Pick<ListFriendPayload, 'limit' | 'keyword'>;

export const useQueryListFriend = (params?: ParamsQuery): UseQueryListFriend => {
    const result = useInfiniteQuery(
        `users.friend.${params?.keyword}`, async ({ pageParam }: any) =>
        FriendRepository.fetchListFriend({
            lastestID: pageParam,
            keyword: params?.keyword || '',
        }), {
        getNextPageParam: ({ data }: any) => {
            return data?.nextCursor || undefined;
        },
        refetchOnWindowFocus: false,
        enabled: true,
    });
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        hasNextPage
    } = result;

    const listFriend = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;

    return {
        loading: isLoading,
        data: listFriend,
        hasNextPage,
        totalPages,
        totalRecord,
        refetch,
        fetchNextPage
    }
}