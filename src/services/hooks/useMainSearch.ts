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

export const UseMainSearch = (key?: string, params?: SearchPayload, isFetch?: boolean): UseMainSearch => {
    const {
        isLoading: isLoadingSearchResultList,
        data: dataSearchResultList,
        refetch: fetchSearchResultList,
        fetchNextPage: nextPageSearchResultList,
        fetchPreviousPage: prevPageSearchResultList,
        hasNextPage: hasNextPage
    } = useInfiniteQuery(
            ['search_results', key, params],
            async ({ pageParams }: any) => 
            MainSearchRepository.mainSearch({ 
                lastestID: pageParams ? pageParams : "",
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
                getNextPageParam: ({ nextCursor }: any) => {
                    return nextCursor || undefined;
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