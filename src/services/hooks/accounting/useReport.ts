import {useMutation, useInfiniteQuery, useQuery} from 'react-query';
import { ReportRepository } from 'apis/accounting/report';
import type {
    DocumentProps,
} from 'typings/accounting/journal';

type UseDataCustom = {
    downloadTemplateExcelDocumentAsync: (payload: any) => Promise<any>,
    importFromExcelAsync: (payload: any) => Promise<any>,
    exportExcelAsync: (payload: any) => Promise<any>,
};

export const useDocumentCustom = ({
    params = {}
}: any) : UseDataCustom => {

    // Tải mẫu import excel
    const { mutateAsync: downloadTemplateExcelDocumentAsync } =
        useMutation((payload: any ) =>
            ReportRepository.downloadTemplateExcel(payload)
    );

    // Import excel
    const { mutateAsync: importFromExcelAsync } =
        useMutation((payload: { projectID?: string, dataImport: string }) =>
            ReportRepository.importFromExcel(payload)
    );

    // Export excel
    const { mutateAsync: exportExcelAsync } =
        useMutation((payload: any) =>
            ReportRepository.exportExcel(payload)
    );

    return {
        downloadTemplateExcelDocumentAsync,
        importFromExcelAsync,
        exportExcelAsync
    }
}

interface UseMutationDocument {
    insertDocumentAsync: (payload: any) => Promise<any>;
    updateDocumentAsync: (payload: any) => Promise<any>;
}

export const useMutationDocument = (): UseMutationDocument => {
    const { mutateAsync: insertDocumentAsync } = useMutation((payload: any) => ReportRepository.insert(payload));
    const { mutateAsync: updateDocumentAsync } = useMutation((payload: any) => ReportRepository.update(payload));

    return {
        insertDocumentAsync,
        updateDocumentAsync,
    }
}

export interface UseQueryListData {
    createDataMutateAsync?: any,
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage?: boolean;
    nextCursor?: string | null;
    listData: Array<[]>;
    listDataWithPager: Array<DocumentProps[]>;
    refetch: () => void;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
    isFetching: boolean;
}

export const useReportList = ({ params = {},  isFetchList = false }: any): UseQueryListData => {

    const res = useInfiniteQuery(
        [`list_report`, { params }],
        async ({ pageParam }: any) =>
            ReportRepository.fetchListReport({
                lastestID: pageParam, ...params
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: isFetchList ?? true,
        }
    );
    const {
        isLoading,
        data,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        isFetching
    } = res;

    const listData = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean)

    const listDataWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords)

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    return {
        isLoading,
        listData,
        listDataWithPager,
        totalRecord,
        totalPage,
        hasNextPage,
        nextCursor,
        refetch,
        fetchNextPage,
        fetchPreviousPage,
        isFetching,
    }
}

export const useReportByProperty = ({ params = {},  isFetchList = false }: any): any => {

    const { data: detailData, isLoading, refetch } =
    useQuery([`report_by_property`,{...params, isFetchList }],() => ReportRepository.fetchListByProperty(params), {
        refetchOnWindowFocus: false,
        enabled: isFetchList,
    });
    
    const listJournalByProperty = detailData?.data;

    return {
        listJournalByProperty,
        isLoading,
        refetch
    }
}