import { useQuery } from 'react-query';
import { DocumentRepository } from 'apis/ppt';

import type { Document } from 'typings/ppt';

interface UseQueryListDocument {
    loading: boolean;
    data: Document[];
    totalPages: number;
    totalRecord: number;
    refetch: () => void;
    hasNextPage?: boolean;
    nextCursor?: string | null;
    // fetchNextPage: () => void;
    // fetchPreviousPage: () => void;
}

export const useQueryListDocument = (departmentID: string, pageParam: any): UseQueryListDocument => {
    const result = useQuery(
        [`list_document`, { pageParam }], async () =>
        DocumentRepository.fetchListDocument({
            departmentID,
            ...pageParam
        }), {
        // getNextPageParam: ({ data }: any) => {
        //     return data?.nextCursor || undefined;
        // },
        refetchOnWindowFocus: false,
        enabled: true,
    });
    const {
        isLoading,
        data,
        refetch,
    } = result;

    // const listDocument = []
    //     .concat(
    //         ...(data?.pages || []).map((d: any) => d.data?.listRecords)
    //     )
    //     .filter(Boolean);
    const totalRecord = data?.data?.totalRecord || 0;
    const totalPages = data?.data?.totalPage || 0;
    const nextCursor = data?.data?.nextCursor || null

    return {
        loading: isLoading,
        data: data?.data?.listRecords || [],
        totalRecord,
        totalPages,
        refetch,
        nextCursor,
        // hasNextPage,
        // fetchNextPage,
        // fetchPreviousPage,
    }
}
