import {useInfiniteQuery} from "react-query";
import CmcsRepository from "apis/cmcs";
import {CmcsListByFilterQueryPayload} from "typings/cmcs";

export interface UseQueryListCmcsByFilter {
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage?: boolean;
    nextCursor?: string | null,
    listCmcsByFilter: Array<any>;
    listCmcsByFilterWithPager: Array<any[]>;
    refetchListCmcsByFilter: () => void;
    fetchNextPageListCmcsByFilter: () => void;
    fetchPrevPageListCmcsByFilter: () => void;
}

export const useListFilterContract = ({ params = {},  isFetchList = false }: CmcsListByFilterQueryPayload): UseQueryListCmcsByFilter => {

    const res = useInfiniteQuery(
        [`list_filter_cmcs`, { params }],
        async ({ pageParam }: any) =>
            CmcsRepository.listByFilter({
                lastestID: pageParam, ...params
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList ?? true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
    } = res;

    const listCmcsByFilter = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const listCmcsByFilterWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    return {
        isLoading,
        listCmcsByFilter,
        listCmcsByFilterWithPager,
        totalRecord,
        totalPage,
        hasNextPage,
        nextCursor,
        refetchListCmcsByFilter: refetch,
        fetchNextPageListCmcsByFilter: fetchNextPage,
        fetchPrevPageListCmcsByFilter: fetchPreviousPage
    }
}