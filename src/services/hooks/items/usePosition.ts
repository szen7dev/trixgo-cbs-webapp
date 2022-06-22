import { useInfiniteQuery, useMutation } from "react-query";

import { PositionRepository } from 'apis/item';
import type { QueryParam } from 'typings/items/position';

interface UsePosition {
    addPositionAsync: (params: any) => Promise<any>;
    updatePositionAsync: (params: any) => Promise<any>;
    deletePositionAsync: (ids: Array<string>) => Promise<any>;
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
    const { mutateAsync: addPositionAsync } =
        useMutation((payload: any) =>
            PositionRepository.addPosition(payload)
        );

    const { mutateAsync: updatePositionAsync } =
        useMutation((payload: any) =>
            PositionRepository.updatePosition(payload)
        );

    const { mutateAsync: deletePositionAsync } =
        useMutation((ids: Array<string>) =>
            PositionRepository.deletePosition(ids)
        );

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage
    } = useInfiniteQuery(
        ['position--list', params],
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

    const listPositions = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;

    return {
        addPositionAsync,
        updatePositionAsync,
        deletePositionAsync,
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