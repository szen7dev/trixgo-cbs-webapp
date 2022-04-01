import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import PcmRepository from "apis/pcm";
import {
    AddConditionTaskReportPayload,
    ListFilesPcmPayload,
    PcmPlanTaskProps,
    PcmReport,
    SendMailTaskPayload,
    UpdateConditionTaskReportPayload
} from "typings/pcm";

/**
 * ============================ ************ ===============================
 * ============================ 	 PCM     ===============================
 * ============================ ************ ===============================
 */

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

/**
 * ============================ ******************* ===============================
 * ============================ 	 PCM REPORT     ===============================
 * ============================ ******************* ===============================
 */

type UsePcmReport = {
    addConditionTaskReportAsync: (payload: AddConditionTaskReportPayload) => Promise<any>,
    updateConditionTaskReportAsync: (payload: UpdateConditionTaskReportPayload) => Promise<any>,
    listReports: Array<PcmReport>,
    infoReport: PcmReport,
    refetchInfoReport: () => void,
    isLoadingListReports: boolean,
    refetchListReports: () => void,
    nextPageListReports: () => void,
    prevPageListReports: () => void,
    totalRecord: number,
    hasNextPage: boolean | undefined
};

export const usePcmReport = (params?: any, isFetch?: boolean) : UsePcmReport => {
    const { mutateAsync: addConditionTaskReportAsync } =
        useMutation((payload: AddConditionTaskReportPayload) =>
            PcmRepository.addConditionTaskReport(payload)
        );

    const { mutateAsync: updateConditionTaskReportAsync } =
        useMutation((payload: UpdateConditionTaskReportPayload) =>
            PcmRepository.updateConditionTaskReport(payload)
        );

    const { data: dataInfoReport, refetch: refetchInfoReport } = useQuery(`report_info.${params?.subjectID}`,
		() => PcmRepository.getInfoReports(params?.subjectID),
		{
			enabled: !!params?.subjectID ?? false,
			refetchOnWindowFocus: false
		});

    const {
        isLoading: isLoadingListReports,
        refetch: refetchListReports,
        data: dataListReports,
        fetchNextPage: nextPageListReports,
        fetchPreviousPage: prevPageListReports,
        hasNextPage: hasNextPage
    } =
        useInfiniteQuery(
            ["list_reports", params],
            async ({ pageParams }: any) =>
            PcmRepository.listReports({
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

    const listReports = [].concat(...(dataListReports?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = dataListReports?.pages[0]?.data?.totalRecord;
    const infoReport = dataInfoReport?.data;

    return {
        infoReport,
        refetchInfoReport,
        addConditionTaskReportAsync,
        updateConditionTaskReportAsync,
        listReports,
        isLoadingListReports,
        refetchListReports,
        nextPageListReports,
        prevPageListReports,
        totalRecord,
        hasNextPage
    }
}

/**
 * ============================ ***************** ===============================
 * ============================ 	 PCM FILE     ===============================
 * ============================ ***************** ===============================
 */

 type UsePcmFile = {
    listFilesPcm: Array<PcmReport>,
    isLoading: boolean,
    refetch: () => void,
    fetchNextPage: () => void,
    totalRecord: number,
    hasNextPage: boolean | undefined
};

export const usePcmFile = (params?: ListFilesPcmPayload, isFetch?: boolean) : UsePcmFile => {
    const {
        isLoading,
        refetch,
        data,
        fetchNextPage,
        hasNextPage
    } =
        useInfiniteQuery(
            ["list_files_pcm", params],
            async ({ pageParams }: any) =>
            PcmRepository.listFilesPcm({
                lastestID: pageParams ? pageParams : "",
                ...params
            }),
            {
                getNextPageParam: ({ data }: any) => {
                    return data?.nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: isFetch ?? true
            }
        );

    const listFilesPcm = [].concat(...(data?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord;

    return {
        listFilesPcm,
        isLoading,
        refetch,
        fetchNextPage,
        hasNextPage,
        totalRecord,
    }
}