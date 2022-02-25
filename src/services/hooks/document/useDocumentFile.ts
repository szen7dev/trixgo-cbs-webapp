import { useInfiniteQuery } from "react-query";
import { DocumentFileRepository } from 'apis/document';

import type { DocumentFileProps, DocumentFileQueryPayload } from 'typings/document/document-file';

interface UseQueryListDocumentFile {
    loading: boolean;
    totalRecord: number;
    totalPages: number;
    hasNextPage?: boolean;
    documentFiles: Array<DocumentFileProps>;
    refetch: () => void;
    fetchNextPage: () => void;
    nextCursor: string | null;
}

export const useQueryListDocumentFile = (params: DocumentFileQueryPayload): UseQueryListDocumentFile => {
    let nextCursor = null;

    const res = useInfiniteQuery(
        [`document-files`, { params }],
        async ({ pageParam }: any) =>
            DocumentFileRepository.fetchList({
                limit: params?.limit || 10,
                lastestID: pageParam || "",
                keyword: params?.keyword || '',
                select: params?.select || '',
                ...params,
                documentID: params.documentID,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                nextCursor = data?.nextCursor;
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
        hasNextPage
    } = res;

    const documentFiles = []
        .concat(...(data?.pages || [])
            .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = data?.pages[0]?.data?.totalRecord || 0;
    const totalPages = data?.pages[0]?.data?.totalPage || 0;
    
    return {
        loading: isLoading,
        nextCursor,
        documentFiles,
        totalRecord,
        totalPages,
        hasNextPage,
        refetch,
        fetchNextPage
    }
}