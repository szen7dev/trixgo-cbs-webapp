import { useInfiniteQuery } from "react-query";
import MainSearchRepository from "apis/main-search";
import { SearchListRecord, SearchPayload } from "typings/main-search";

type UseMainSearch = {
    searchResultList: Array<SearchListRecord>,
    isLoadingSearchResultList: boolean,
    fetchSearchResultList: () => void,
    nextPageSearchResultList: () => void,
    prevPageSearchResultList: () => void,
    totalRecord: number | undefined,
    nextCursor: string | null,
    hasNextPage: boolean | undefined
};

/**
 * @deprecated Use 'useSearchTask' hook instead.
 * this hook will be refactored in the future;
 */
export const useMainSearch = (key?: string, params?: SearchPayload, isFetch?: boolean): UseMainSearch => {
    const {
        isLoading: isLoadingSearchResultList,
        data: dataSearchResultList,
        refetch: fetchSearchResultList,
        fetchNextPage: nextPageSearchResultList,
        fetchPreviousPage: prevPageSearchResultList,
        hasNextPage: hasNextPage
    } = useInfiniteQuery(
            [key || 'search_results', params],
            async ({ pageParam }: any) =>
            MainSearchRepository.mainSearch({
                lastestID: pageParam ? pageParam : "",
                // select: "name description amountChecklist amountFinishedChecklist assignee actualFinishTime",
                populates: JSON.stringify({
                    path: "assignee author project group lastLog",
                    select: "name fullname image sign content author",
                    populate: {
                        path: "author",
                        select: "bizfullname fullname image sign"
                    }
                }),
                ...params,
            }),
            {
                getNextPageParam: ({ data }: any) => {
                    return data?.nextCursor ?? undefined;
                },
                refetchOnWindowFocus: false,
                enabled: isFetch ?? false
            }
        );

    const searchResultList = []
        .concat(...(dataSearchResultList?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = dataSearchResultList?.pages[0]?.data?.totalRecord;
    const nextCursor = dataSearchResultList?.pages[0]?.data?.nextCursor || null;

    return {
        searchResultList,
        isLoadingSearchResultList,
        fetchSearchResultList,
        nextPageSearchResultList,
        prevPageSearchResultList,
        totalRecord,
        nextCursor,
        hasNextPage
    };
};

/**
 * ============================ ****************** ===============================
 * ============================ 	 SEARCH TASK   ===============================
 * ============================ ****************** ===============================
 */

type UseSearchTask = {
    listTasks: Array<SearchListRecord>;
    isLoadingListTask: boolean;
    totalRecord: number | undefined;
    totalPage: number | undefined;
    hasNextPage: boolean | undefined;
    refetchListTask: () => void;
    nextPageListTask: () => void;
    prevPageListTask: () => void;
    isFetching: boolean;
    listTasksWithPager: any;
};

type UseSearchTaskProps ={
    params?: any,
    isFetch?: boolean;
}

export const useSearchTask = ({
    params = {},
    isFetch = false,
}: UseSearchTaskProps): UseSearchTask => {
    const {
        isLoading: isLoadingListTask,
        data: dataListTask,
        refetch: refetchListTask,
        fetchNextPage: nextPageListTask,
        fetchPreviousPage: prevPageListTask,
        hasNextPage,
        isFetching,
    } = useInfiniteQuery(
        ["task--list_by_filter", params],
        async ({ pageParam }: any) =>
        MainSearchRepository.mainSearch({
            lastestID: pageParam || "",
            populates: JSON.stringify({
                path: "assignee author project group lastLog lastComment",
                select: "name fullname image sign content author createAt sign files",
                populate: {
                    path: "author files images",
                    select: "fullname image sign nameOrg path createAt",
                    // populate: {
                    //     path: "author",
                    //     select: "fullname" 
                    // } 
                }
            }),
            ...params,
        }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetch ?? false,
        }
    );

    const listTasks = []
        .concat(...(dataListTask?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const listTasksWithPager = (dataListTask?.pages || []).map((d: any) => d.data?.listRecords);
    
    const totalRecord = dataListTask?.pages[0]?.data?.totalRecord;
    const totalPage = dataListTask?.pages[0]?.data?.totalPage;

    return {
        listTasks,
        isLoadingListTask,
        totalRecord,
        hasNextPage,
        totalPage,
        refetchListTask,
        nextPageListTask,
        prevPageListTask,
        isFetching,
        listTasksWithPager
    };
};