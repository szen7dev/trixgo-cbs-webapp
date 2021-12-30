import { useInfiniteQuery } from "react-query";
import HumanRepository from 'apis/human';

import type { Human } from 'typings/human';

type UseListHuman = {
    listHuman: Array<Human>;
    isLoading: boolean;
    totalRecord: number | undefined;
    totalPages: number | undefined;
    hasNextPage: boolean | undefined;
    refetchListHuman: () => void;
    fetchNextPageHuman: () => void;
};

export const useFetchListHuman = (limit = 10): UseListHuman => {
    const infinityQuery = useInfiniteQuery(
        ['list_human', limit],
        async ({ pageParams }: any) =>
            HumanRepository.fetchListHuman({
                limit,
                lastestID: pageParams || "",
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    )
    // console.log(infinityQuery);
    const {
        isLoading,
        data,
        refetch: refetchListHuman,
        fetchNextPage: fetchNextPageHuman,
        hasNextPage
    } = infinityQuery;

    const listHuman = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;
    const totalPages = data?.pages[0]?.data?.totalPages;

    return {
        isLoading,
        listHuman,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListHuman,
        fetchNextPageHuman
    }
}