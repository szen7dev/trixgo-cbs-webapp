import React from 'react';
import { useQuery, useMutation, useInfiniteQuery } from 'react-query';
import { DocumentRepository } from 'apis/ppt';

import type { Document, } from 'typings/ppt';

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
export const useQueryListDocument = (departmentID: string, pageParam: any,  packageID?: string, limit?: string): UseQueryListDocument => {
    const result = useQuery(
        [`list_document`, { pageParam }], async () =>
        DocumentRepository.fetchListDocument({
            packageID,
            limit,
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
    const totalPages  = data?.data?.totalPage || 0;
    const nextCursor  = data?.data?.nextCursor || null

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
interface UseQueryDetailDocument {
    loading: boolean;
    detailDocument: Document,
    onFetchDetailDocumentAsync: (documentId: string) => Promise<Document>;
}
    
export const useQueryDetailDocument = (): UseQueryDetailDocument => {
    const [detailDocument, setDetailDocument] = React.useState<| any>({});
    const [loading, setLoading] = React.useState(false);

    const onFetchDetailDocumentAsync = React.useCallback(async (documentId): Promise<Document | any> => {
        const result = {}
        try {
            setLoading(true);
            const res = await DocumentRepository.fetchDocumentInfo({ documentID: documentId });
            setDetailDocument(res.data);
            Object.assign(result, res.data);
        } catch (err) {
            console.error(err);
            setDetailDocument({});
        } finally {
            setLoading(false)
        }
        return result;
    }, []);

    return {
        onFetchDetailDocumentAsync,
        detailDocument,
        loading
    }
}

/**
 * ============================ ************************* ===============================
 * ============================ 	BÌNH LUẬN DOCUMENT    ===============================
 * ============================ ************************* ===============================
 */

 type UseCommentDocument = {
    createCommentAsync: (payload: any) => Promise<any>,
    updateCommentAsync: (payload: any) => Promise<any>,
    deleteCommentAsync: (id: string) => Promise<any>,
    listComments: Array<any>,
    totalRecord: number,
    limit: number,
    nextCursor: string | undefined,
    isLoadingListComments: boolean,
    refetchListComments: () => void,
    nextPageListComments: () => void,
    prevPageListComments: () => void,
}

type UseCommentDocumentProps = {
    key?: string,
    params?: any,
    isFetchComment?: boolean
}

export const useCommentDocument = ({
    key, 
    params = {},
    isFetchComment = false
}: UseCommentDocumentProps) : UseCommentDocument => {

    const { mutateAsync: createCommentAsync } =
        useMutation((payload: any) =>
            Promise.resolve(payload)
            // DocumentRepository.createComment(payload)
        );

    const { mutateAsync: deleteCommentAsync } =
        useMutation((id: string) =>
            Promise.resolve(id)
            // DocumentRepository.deleteComment(id)
        );

    const { mutateAsync: updateCommentAsync } =
        useMutation((payload: any) =>
            Promise.resolve(payload)
            // DocumentRepository.updateComment(payload)
        );

    const {
        isLoading: isLoadingListComments,
        refetch: refetchListComments,
        data: dataListComments,
        fetchNextPage: nextPageListComments,
        fetchPreviousPage: prevPageListComments,
    } =
        useInfiniteQuery(
            [key || "list_comments", params],
            async ({ pageParams }: any) => 
            Promise.resolve(pageParams),
            // DocumentRepository.listComments({ 
            //     lastestID: pageParams ? pageParams : "",
            //     ...params
            // }),
            {
                getNextPageParam: ({ nextCursor }: any) => {
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: isFetchComment
            }
        );

    const listComments = []
        .concat(...(dataListComments?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = dataListComments?.pages[0]?.data?.totalRecord || 0;
    const nextCursor = dataListComments?.pages[0]?.data?.nextCursor;
    const limit = dataListComments?.pages[0]?.data?.limit || 5;

    return {
        createCommentAsync,
        updateCommentAsync,
        deleteCommentAsync,
        listComments,
        limit,
        totalRecord,
        nextCursor,
        isLoadingListComments,
        refetchListComments,
        nextPageListComments,
        prevPageListComments,
    }
}