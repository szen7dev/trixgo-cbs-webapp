import { useMutation, useInfiniteQuery } from 'react-query';

import { DocumentChildRepository } from 'apis/document';

import type {
    DocumentChildInserPayload,
    DocumentChildInserResponse,
    DocumentChildUpdatePayload,
    DocumentChildUpdateResponse,
    DocumentChildQueryPayload,
    Document
} from 'typings/document/document-child';

interface UseMutationDocumentChild {
    inserDocumentChildAsync: (payload: DocumentChildInserPayload) => Promise<DocumentChildInserResponse>;
    updateDocumentChildAsync: (payload: DocumentChildUpdatePayload) => Promise<DocumentChildUpdateResponse>;
}

export const useMutationDocumentChild = (): UseMutationDocumentChild => {
    const { mutateAsync: inserDocumentChildAsync } = useMutation((payload: any) => DocumentChildRepository.insert(payload));

    const { mutateAsync: updateDocumentChildAsync } = useMutation((payload: any) => DocumentChildRepository.update(payload));

    return {
        inserDocumentChildAsync,
        updateDocumentChildAsync
    }
}

export interface UseQueryListDocumentChild {
    loading: boolean;
    totalRecord: number;
    totalPages: number;
    hasNextPage?: boolean;
    listDocumentChild: Array<Document>;
    refetchListDocumentChild: () => void;
    fetchNextPageDocumentChild: () => void;
    fetchPrevPageDocumentChild: () => void;
}

export const useQueryListDocumentChild = (params: DocumentChildQueryPayload): UseQueryListDocumentChild => {
    const res = useInfiniteQuery(
        [`document-childs`, { params }],
        async ({ pageParam }: any) =>
            DocumentChildRepository.fetchList({
                limit: params?.limit || 10,
                lastestID: pageParam || "",
                keyword: params?.keyword || '',
                select: params?.select || '',
                ...params,
                parentID: params.parentID,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
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

    const listDocumentChild = []
        .concat(
            ...(data?.pages || []).map((d: any) => d.data?.listRecords)
        )
        .filter(Boolean);
    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPages || 0;

    return {
        loading: isLoading,
        listDocumentChild,
        totalRecord,
        totalPages,
        hasNextPage,
        refetchListDocumentChild: refetch,
        fetchNextPageDocumentChild: fetchNextPage,
        fetchPrevPageDocumentChild: fetchPreviousPage
    }
}