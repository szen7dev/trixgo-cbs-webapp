import { useInfiniteQuery } from "react-query";

import { PositionRepository } from 'apis/item';
import type { QueryParam } from 'typings/items/position';

interface UsePosition {
    loading: boolean;
    data: any[];
    hasNextPage?: boolean;
    totalPages: number;
    totalRecord: number;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

export const usePosition = (params?: QueryParam, isFetch?: boolean): UsePosition => {
    const result = useInfiniteQuery(
        ['list_positions', params],
        async ({ pageParam }: any) =>
        PositionRepository.listPosition({
            lastestID: pageParam,
            ...params,
        }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetch ?? false,
        });

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage
    } = result;

    const listPositions = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;

    return {
        loading: isLoading,
        data: listPositions,
        hasNextPage,
        totalPages,
        totalRecord,
        refetch,
        fetchNextPage,
        fetchPreviousPage
    }
}