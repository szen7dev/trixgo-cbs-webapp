// MỤC ĐÍCH: TƯƠNG TÁC VỚI DB
import { useInfiniteQuery } from "react-query";
import PcmRepository from "apis/pcm";
import { PcmPlanTaskProps } from "typings/pcm";

type UsePcm = {
    listTasks: Array<PcmPlanTaskProps>,
    isLoadingListTasks: boolean,
    refetchListTasks: () => void,
    nextPageListTasks: () => void,
    prevPageListTasks: () => void,
    totalRecord: number | undefined,
    totalPages: number | undefined,
    hasNextPage: boolean | undefined
};

export const usePcm = () : UsePcm => {

    // Get danh sách
    const {
        isLoading: isLoadingListTasks,
        refetch: refetchListTasks,
        data: dataListTasks,
        fetchNextPage: nextPageListTasks,
        fetchPreviousPage: prevPageListTasks,
        hasNextPage: hasNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            "list_tasks",
            async ({ pageParams }: any) => 
            PcmRepository.listTasks({ 
                lastestID: pageParams ? pageParams : "",
                filter: JSON.stringify({ 
                    _id: 1,
                    name: 1,
                    assignee: 1, 
                    lastLog: 1,
                }),
                populates: JSON.stringify({
                    value: "assignee lastLog",
                    select: "name fullname image content author createAt",
                }),
                populates1: JSON.stringify({
                    value: "author",
                    select: "_id fullname image"
                }),
            }),
            {
                getNextPageParam: ({ nextCursor }: any) => {
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
            }
        );
    
    // console.log('==============>>>>>')
    // console.log(dataListTasks)
    console.log(PcmRepository)

    const listTasks = [].concat(...(dataListTasks?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = dataListTasks?.pages[0]?.data?.totalRecord;
    const totalPages = dataListTasks?.pages[0]?.data?.totalPages;

    return {
        listTasks,
        isLoadingListTasks,
        refetchListTasks,
        nextPageListTasks,
        prevPageListTasks,
        totalRecord,
        totalPages,
        hasNextPage
    };
};
