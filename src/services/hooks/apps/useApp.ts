import { useInfiniteQuery } from "react-query";

import { AppRepository } from 'apis/app';
import type {
    AppProps,
    QueryParam,
} from 'typings/apps/app';

interface UseAppUser {
    loading: boolean;
    data: AppProps[];
    hasNextPage?: boolean;
    totalRecord: number;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

export const useApp = (params?: QueryParam, isFetch?: boolean): UseAppUser => {
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage
    } = useInfiniteQuery(
        ['list_apps_menu', params],
        async ({ pageParam }: any) =>
        AppRepository.listApps({
            lastestID: pageParam,
            ...params,
        }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetch ?? true,
        });

    const listApps = []
        .concat(...(data?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;

    return {
        loading: isLoading,
        data: listApps,
        hasNextPage,
        totalRecord,
        refetch,
        fetchNextPage,
        fetchPreviousPage
    }
}