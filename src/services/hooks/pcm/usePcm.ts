import PcmRepository from "apis/pcm";
import {
    FetchNextPageOptions,
    FetchPreviousPageOptions,
    useInfiniteQuery,
    useMutation,
    useQuery
} from "react-query";

import {
    AddConditionTaskReportPayload,
    FilesPcmGroupByContract,
    FilesPcmGroupByDate,
    ListFilesPcmPayload,
    PcmPlanTaskProps,
    PcmReport,
    PcmFile,
    SendMailTaskPayload,
    UpdateTaskReportPayload,
    PcmComment,
    PcmCommentListParams,
    PcmExportReportPayload,
    PcmPlanTaskDownloadExcelPayload
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
            ["list_tasks", params],
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
    updateTaskReportAsync: (payload: UpdateTaskReportPayload) => Promise<any>,
    deleteTaskReportAsync: (payload: Array<string>) => Promise<any>,
    listReports: Array<PcmReport>,
    infoReport: PcmReport,
    refetchInfoReport: () => void,
    isLoadingListReports: boolean,
    isLoadingInfoReport: boolean,
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

    const { mutateAsync: updateTaskReportAsync } =
        useMutation((payload: UpdateTaskReportPayload) =>
            PcmRepository.updateTaskReport(payload)
        );

    const { mutateAsync: deleteTaskReportAsync } =
        useMutation((payload: Array<string>) =>
            PcmRepository.deleteTaskReport(payload)
        );

    const {
        data: dataInfoReport,
        refetch: refetchInfoReport,
        isLoading: isLoadingInfoReport
    } = useQuery(
        ['pcm_report--info', params],
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
    const infoReport = dataInfoReport?.data ?? {};

    return {
        infoReport,
        refetchInfoReport,
        addConditionTaskReportAsync,
        updateTaskReportAsync,
        deleteTaskReportAsync,
        listReports,
        isLoadingListReports,
        isLoadingInfoReport,
        refetchListReports,
        nextPageListReports,
        prevPageListReports,
        totalRecord,
        hasNextPage
    }
}

type UsePcmReportCustom = {
    exportReportAsync: (payload: PcmExportReportPayload) => Promise<any>,
};

type UsePcmReportCustomParams = {
    params?: any
}

export const usePcmReportCustom = ({
    params = {}
}: UsePcmReportCustomParams) : UsePcmReportCustom => {
    const { mutateAsync: exportReportAsync } =
        useMutation((payload: PcmExportReportPayload) =>
            PcmRepository.exportReport(payload)
        );

    return {
        exportReportAsync
    }
}

// Khai báo kiểu
type UsePcmPlanTaskCustom = {
    downloadExcelTaskAsync: (payload: PcmPlanTaskDownloadExcelPayload) => Promise<any>,
    downloadTemplateImportExcelTaskAsync: (payload: { option: number, projectID: string, taskID: string }) => Promise<any>,
    importTaskFromExcelAsync: (payload: any) => Promise<any>,
};

type UsePcmPlanTaskCustomParams = {
    params?: any
}

// Custom hook mới cho Task
export const usePcmPlanTaskCustom = ({params = {}}: UsePcmPlanTaskCustomParams) : UsePcmPlanTaskCustom => {
    
    const { mutateAsync: downloadExcelTaskAsync } =
        useMutation((payload: PcmPlanTaskDownloadExcelPayload) =>
            PcmRepository.downloadExcelTask(payload)
        );

    const { mutateAsync: downloadTemplateImportExcelTaskAsync } =
    useMutation((payload: { projectID: string, taskID: string }) =>
        PcmRepository.downloadTemplateImportExcelTask(payload)
    );
    
    const { mutateAsync: importTaskFromExcelAsync } =
    useMutation((payload: { taskID?: string, dataImport: string }) =>
        PcmRepository.importTaskFromExcel(payload)
    );
    
    return {
        downloadExcelTaskAsync,
        downloadTemplateImportExcelTaskAsync,
        importTaskFromExcelAsync
    }
}

/**
 * ============================ ***************** ===============================
 * ============================ 	 PCM FILE     ===============================
 * ============================ ***************** ===============================
 */

interface UsePcmFile{
    filesGroupByDate: FilesPcmGroupByDate[],
    filesGroupByContract: FilesPcmGroupByContract[],
    listFilesPcm: Array<PcmFile>,
    isLoading: boolean,
    refetch: () => void,
    fetchNextPage: (options?: FetchNextPageOptions) => void,
    fetchPreviousPage: (options?: FetchPreviousPageOptions) => void,
    hasNextPage: boolean | undefined,
    totalRecord: number,
    totalPage: number,
    nextCursor: string,
};

type UsePcmFileProps = {
    params?: ListFilesPcmPayload,
    isFetch?: boolean;
    isFetchFilesGroupDate?: boolean;
    isFetchFilesGroupContract?: boolean;
}

export const usePcmFile = ({
    params = {},
    isFetch = false,
    isFetchFilesGroupDate = false,
    isFetchFilesGroupContract = false
}: UsePcmFileProps) : UsePcmFile => {

    const { data: dataFilesGroupByDate } =
        useQuery("pcm_files__group_by_date", () => PcmRepository.listFilesPcmGroupByDate(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchFilesGroupDate,
        });

    const { data: dataFilesGroupByContract } =
        useQuery("pcm_files__group_by_contract", () => PcmRepository.listFilesPcmGroupByContract(params), {
            refetchOnWindowFocus: false,
            enabled: isFetchFilesGroupContract,
        });

    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage
    } =
        useInfiniteQuery(
            ["pcm_files", params],
            ({ pageParam }) => PcmRepository.listFilesPcm({ lastestID: pageParam, ...params }),
            {
                getNextPageParam: ({ data }: any) => {
                    return data?.nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: isFetch ?? true
            }
        );

    const listFilesPcm = (data?.pages || []).flatMap((d: any) => d?.data?.listRecords);
    const totalRecord = data?.pages && data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages && data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    const filesGroupByDate = dataFilesGroupByDate?.data?.listRecords || [];
    const filesGroupByContract = dataFilesGroupByContract?.data?.listRecords || [];

    return {
        filesGroupByDate,
        filesGroupByContract,
        listFilesPcm,
        isLoading,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        totalRecord,
        totalPage,
        nextCursor
    }
}

/**
 * ============================ ******************** ===============================
 * ============================ 	 PCM COMMENT     ===============================
 * ============================ ******************** ===============================
 */

 interface UsePcmComment {
    list: PcmComment[];
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage: boolean | undefined;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
}

type UsePcmCommentProps = {
    params?: PcmCommentListParams,
    isFetchList?: boolean,
}

export const usePcmComment = ({ params = {}, isFetchList = false }: UsePcmCommentProps): UsePcmComment => {
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage
    } = useInfiniteQuery(
        ['pcm_comment--list', params],
        async ({ pageParam }: any) =>
            PcmRepository.fetchListPcmComments({
                lastestID: pageParam,
                ...params,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor ?? undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList,
        }
    );

    const list = (data?.pages || []).flatMap((d: any) => d?.data?.listRecords);
    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;

    return {
        isLoading,
        list,
        totalRecord,
        totalPage,
        hasNextPage,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
    }
}