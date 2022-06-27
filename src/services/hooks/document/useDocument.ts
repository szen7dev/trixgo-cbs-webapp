import { useMutation, useInfiniteQuery } from 'react-query';

import { DocumentRepository } from 'apis/document';

import type {
    DocumentUpdatePayload,
    DocumentUpdateResponse,
    DocumentQueryPayload,
    Document
} from 'typings/document/document';

type UseDocumentCustom = {
    exportDocumentAsync: (payload: any) => Promise<any>,
};

type UseDocumentCustomParams = {
    params?: any
}

export const useDocumentCustom = ({
    params = {}
}: UseDocumentCustomParams) : UseDocumentCustom => {
    const { mutateAsync: exportDocumentAsync } =
        useMutation((payload: any) =>
            DocumentRepository.exportDocument(payload)
        );

    return {
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
    refetchListDocument: () => void;
    fetchNextPageDocument: () => void;
    fetchPrevPageDocument: () => void;
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
        hasNextPage
    } = res;
    
    const listDocument = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPage = data?.pages[0]?.data?.totalPage || 0;
    const nextCursor = data?.pages && data?.pages[0]?.data?.nextCursor;

    return {
        isLoading,
        listDocument,
        totalRecord,
        totalPage,
        hasNextPage,
        nextCursor,
        refetchListDocument: refetch,
        fetchNextPageDocument: fetchNextPage,
        fetchPrevPageDocument: fetchPreviousPage
    }
}