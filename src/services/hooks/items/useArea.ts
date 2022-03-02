import { FetchNextPageOptions, useInfiniteQuery } from "react-query";
import { Area, ListAreaPayload } from 'typings/items/area';
import AreaRepository from 'apis/item/area';

interface useArea {
    listAreas: Array<Area>,
    isLoading: boolean,
    refetchList: () => void,
    nextPageList: (options?: FetchNextPageOptions | undefined) => void,
    prevPageList: () => void,
    totalRecord: number | undefined,
    totalPage: number | undefined,
    hasNextPage: boolean | undefined,
}

type useAreaProps = Partial<{
    key: string,
    params: ListAreaPayload,
    isFetchAreas: boolean
}>

export const useArea = ({
    key,
    params = {},
    isFetchAreas = false
}: useAreaProps) : useArea => {
    const {
        isLoading: isLoading,
        refetch: refetchList,
        data: dataList,
        fetchNextPage: nextPageList,
        fetchPreviousPage: prevPageList,
        hasNextPage: hasNextPage
    } =
        useInfiniteQuery(
            [key || "list_areas", params],
            async ({ pageParam }: any) =>
                AreaRepository.listAreas({ 
                    lastestID: pageParam ? pageParam : "",
                    ...params,
                }),
            {
                getNextPageParam: (params: any) => {
                    const nextCursor = params?.data?.nextCursor;
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: isFetchAreas
            }
        );

    const listAreas = []
        .concat(...(dataList?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = dataList?.pages[0]?.data?.totalRecord;
    const totalPage = dataList?.pages[0]?.data?.totalPage;

    return {
        listAreas,
        isLoading,
        refetchList,
        nextPageList,
        prevPageList,
        hasNextPage,
        totalRecord,
        totalPage
    }
};
