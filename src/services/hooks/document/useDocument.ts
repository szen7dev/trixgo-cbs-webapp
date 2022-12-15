import {useMutation, useInfiniteQuery} from 'react-query';

import { DocumentRepository } from 'apis/document';

import type {
    DocumentUpdatePayload,
    DocumentUpdateResponse,
    DocumentQueryPayload,
    Document,
    DocumentProps,
} from 'typings/document/document';

// Khai báo kiểu
type UseDocumentCustom = {
    downloadTemplateImportExcelDocumentAsync: (payload: { projectID: string }) => Promise<any>,
    importDocumentFromExcelAsync: (payload: any) => Promise<any>,
    exportDocumentAsync: (payload: any) => Promise<any>,
};

type UseDocumentCustomParams = {
    params?: any
}

// Custom hook mới cho Document
export const useDocumentCustom = ({
    params = {}
}: UseDocumentCustomParams) : UseDocumentCustom => {

    // Tải mẫu import excel
    const { mutateAsync: downloadTemplateImportExcelDocumentAsync } =
        useMutation((payload: { projectID?: string }) =>
        DocumentRepository.downloadTemplateImportExcelDocument(payload)
    );

    // Import excel
    const { mutateAsync: importDocumentFromExcelAsync } =
        useMutation((payload: { projectID?: string, dataImport: string }) =>
        DocumentRepository.importDocumentFromExcel(payload)
    );

    // Export excel
    const { mutateAsync: exportDocumentAsync } =
        useMutation((payload: any) =>
            DocumentRepository.exportDocument(payload)
    );

    return {
        downloadTemplateImportExcelDocumentAsync,
        importDocumentFromExcelAsync,
        exportDocumentAsync
    }
}

interface UseMutationDocument {
    insertDocumentAsync: (payload: any) => Promise<any>;
    updateDocumentAsync: (payload: DocumentUpdatePayload) => Promise<DocumentUpdateResponse>;
}

export const useMutationDocument = (): UseMutationDocument => {
    const { mutateAsync: insertDocumentAsync } = useMutation((payload: any) => DocumentRepository.insert(payload));
    const { mutateAsync: updateDocumentAsync } = useMutation((payload: any) => DocumentRepository.update(payload));

    return {
        insertDocumentAsync,
        updateDocumentAsync
    }
}

export interface UseQueryListDocument {
    createDocumentMutateAsync?: any,
    isLoading: boolean;
    totalRecord: number;
    totalPage: number;
    hasNextPage?: boolean;
    nextCursor?: string | null,
    listDocument: Array<Document>;
    listDocumentWithPager: Array<DocumentProps[]>;
    refetchListDocument: () => void;
    fetchNextPageDocument: () => void;
    fetchPrevPageDocument: () => void;
    isFetching: boolean;
}

export const useListDocument = ({ params = {},  isFetchList = false }: DocumentQueryPayload): UseQueryListDocument => {

    const res = useInfiniteQuery(
        [`list_document`, { params }],
        async ({ pageParam }: any) =>
            DocumentRepository.fetchList({
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
        isFetching
    } = res;

    const listDocument = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const listDocumentWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    return {
        isLoading,
        listDocument,
        listDocumentWithPager,
        totalRecord,
        totalPage,
        hasNextPage,
        nextCursor,
        refetchListDocument: refetch,
        fetchNextPageDocument: fetchNextPage,
        fetchPrevPageDocument: fetchPreviousPage,
        isFetching
    }
}

export const useListFilterDocument = ({ params = {},  isFetchList = false }: DocumentQueryPayload): UseQueryListDocument => {

    const res = useInfiniteQuery(
        [`list_filter_document`, { params }],
        async ({ pageParam }: any) =>
            DocumentRepository.fetchFilterList({
                lastestID: pageParam, ...params
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            cacheTime: 0,
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
        isFetching
    } = res;

    const listDocument = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const listDocumentWithPager = (data?.pages || []).map((d: any) => d.data?.listRecords);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    return {
        isLoading,
        listDocument,
        listDocumentWithPager,
        totalRecord,
        totalPage,
        hasNextPage,
        nextCursor,
        refetchListDocument: refetch,
        fetchNextPageDocument: fetchNextPage,
        fetchPrevPageDocument: fetchPreviousPage,
        isFetching
    }
}