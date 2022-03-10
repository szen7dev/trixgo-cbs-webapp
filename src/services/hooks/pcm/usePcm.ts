// MỤC ĐÍCH: TƯƠNG TÁC VỚI DB
import { useInfiniteQuery, useMutation } from "react-query";
import PcmRepository from "apis/pcm";
import { PcmPlanTaskProps, SendMailTaskPayload } from "typings/pcm";

type UsePcm = {
    sendMailDetailTaskAsync: (payload: SendMailTaskPayload) => Promise<any>,
    listTasks: Array<PcmPlanTaskProps>,
    isLoadingListTasks: boolean,
    refetchListTasks: () => void,
    nextPageListTasks: () => void,
    prevPageListTasks: () => void,
    totalRecord: number | undefined,
    totalPages: number | undefined,
    hasNextPage: boolean | undefined
};

export const usePcm = (params?: any, isFetch?: boolean) : UsePcm => {
    const { mutateAsync: sendMailDetailTaskAsync } =
        useMutation((payload: SendMailTaskPayload) =>
            PcmRepository.sendMailDetailTask(payload)
        ); 

    const {
        isLoading: isLoadingListTasks,
        refetch: refetchListTasks,
        data: dataListTasks,
        fetchNextPage: nextPageListTasks,
        fetchPreviousPage: prevPageListTasks,
        hasNextPage: hasNextPage
    } =
        useInfiniteQuery(
            "list_tasks",
            async ({ pageParams }: any) => 
            PcmRepository.listTasks({ 
                lastestID: pageParams ? pageParams : "",
                ...params
            }),
            {
                getNextPageParam: ({ data }: any) => {
                    return data?.nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: isFetch ?? false
            }
        );

    const listTasks = [].concat(...(dataListTasks?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = dataListTasks?.pages[0]?.data?.totalRecord;
    const totalPages = dataListTasks?.pages[0]?.data?.totalPages;

    return {
        sendMailDetailTaskAsync,
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
