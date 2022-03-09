import { FetchNextPageOptions, useInfiniteQuery, useMutation } from "react-query";
import MediaRepository from "apis/media";
import { 
    MediaProps, 
    MediaPayload, 
    CommentPayload, 
    ListCommentsPayload, 
    ListMediasPayload,
    MediaReactionPayload,
    MediaInfoResponse,
    FetchMediaPayload
} from "typings/media";
import { CommentProps, CommentResponse } from 'typings/media';

/**
 * ============================ ************** ===============================
 * ============================ 	 MEDIA     ===============================
 * ============================ ************** ===============================
 */

type UseMedia = {
    // SEEN
    listSeens: Array<any>,
    totalRecordSeen: number,
    refetchListSeens: () => void,
    nextPageListSeens: (options?: FetchNextPageOptions | undefined) => void,
    // REACTION
    reactionMediaAsync: (payload: MediaReactionPayload) => Promise<void>,
    listReactions: Array<any>,
    refetchListReactions: () => void,
    nextPageListReactions: (options?: FetchNextPageOptions | undefined) => void,
    // MEDIA
    createMediaAsync: (payload: MediaPayload) => Promise<MediaInfoResponse>,
    updateMediaAsync: (payload: MediaPayload) => Promise<MediaInfoResponse>,
    deleteMediaAsync: (id: string) => Promise<any>,
    listMedias: Array<MediaProps>,
    isLoadingMedias: boolean,
    refetchListMedias: () => void,
    nextPageListMedias: (options?: FetchNextPageOptions | undefined) => void,
    prevPageListMedias: () => void,
    totalRecordMedia: number | undefined,
    totalPagesMedia: number | undefined,
    hasNextPageMedia: boolean | undefined,
};

type UseMediaProps = {
    key?: string;
    params?: ListMediasPayload;
} & FetchMediaPayload

export const useMedia = ({ 
    key, 
    params = {},
    isFetchMedias = false,
    isFetchReactions = false,
    isFetchSeens = false
}: UseMediaProps) : UseMedia => {
    const { mutateAsync: createMediaAsync } =
        useMutation((payload: MediaPayload) =>
            MediaRepository.createMedia(payload)
        );

    const { mutateAsync: updateMediaAsync } =
        useMutation((payload: MediaPayload) =>
            MediaRepository.updateMedia(payload)
        );

    const { mutateAsync: deleteMediaAsync } =
        useMutation((id: string) =>
            MediaRepository.deleteMedia(id)
        );

    const { mutateAsync: reactionMediaAsync } =
        useMutation((payload: MediaReactionPayload) =>
            MediaRepository.reactionMedia(payload)
        );

    // Get danh sách media
    const {
        isLoading: isLoadingMedias,
        refetch: refetchListMedias,
        data: dataListMedias,
        fetchNextPage: nextPageListMedias,
        fetchPreviousPage: prevPageListMedias,
        hasNextPage: hasNextPageMedia
    } =
        useInfiniteQuery(
            [key || "list_medias", params],
            async ({ pageParam }: any) =>
                MediaRepository.listMedias({ 
                    lastestID: pageParam ? pageParam : "",
                    ...params,
                }),
            {
                getNextPageParam: (params: any) => {
                    const nextCursor = params?.data?.nextCursor;
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: isFetchMedias
            }
        );

    // Get danh sách reaction
    const {
        data: dataListReactions,
        refetch: refetchListReactions,
        fetchNextPage: nextPageListReactions,
    } =
        useInfiniteQuery(
            [key, "list_reactions", params],
            async ({ pageParam }: any) =>
                MediaRepository.listReactions({ 
                    limit: 10,
                    lastestID: pageParam ? pageParam : "",
                    ...params,
                }),
            {
                getNextPageParam: (params: any) => {
                    const nextCursor = params?.data?.nextCursor;
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: isFetchReactions
            }
        );

    // Get danh sách seen media
    const {
        data: dataListSeens,
        refetch: refetchListSeens,
        fetchNextPage: nextPageListSeens,
    } =
        useInfiniteQuery(
            [key, "list_seens", params],
            async ({ pageParam }: any) =>
                MediaRepository.listSeensMedia({ 
                    limit: 20,
                    lastestID: pageParam ? pageParam : "",
                    populates: JSON.stringify({
                        path: 'author',
                        select: '_id fullname bizfullname image'
                    }),
                    ...params,
                }),
            {
                getNextPageParam: (params: any) => {
                    const nextCursor = params?.data?.nextCursor;
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: isFetchSeens
            }
        );

    const listMedias = []
        .concat(...(dataListMedias?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const listSeens = []
        .concat(...(dataListSeens?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const listReactions = []
        .concat(...(dataListReactions?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecordSeen = dataListSeens?.pages[0]?.data?.totalRecord;
    const totalRecordMedia = dataListMedias?.pages[0]?.data?.totalRecord;
    const totalPagesMedia = dataListMedias?.pages[0]?.data?.totalPages;

    return {
        // SEEN MEDIA
        listSeens,
        totalRecordSeen,
        refetchListSeens,
        nextPageListSeens,
        // REACTION
        reactionMediaAsync,
        listReactions,
        refetchListReactions,
        nextPageListReactions,
        // MEDIA
        createMediaAsync,
        updateMediaAsync,
        deleteMediaAsync,
        listMedias,
        isLoadingMedias,
        refetchListMedias,
        nextPageListMedias,
        prevPageListMedias,
        totalRecordMedia,
        totalPagesMedia,
        hasNextPageMedia
    };
};

/**
 * ============================ ********************** ===============================
 * ============================ 	BÌNH LUẬN MEDIA    ===============================
 * ============================ ********************** ===============================
 */

type UseCommentMedia = {
    createCommentAsync: (payload: CommentPayload) => Promise<CommentResponse>,
    updateCommentAsync: (payload: CommentPayload) => Promise<CommentResponse>,
    deleteCommentAsync: (id: string) => Promise<{ error: boolean; message: string; }>,
    listComments: Array<CommentProps>,
    totalRecord: number,
    limit: number,
    nextCursor: string | undefined,
    isLoadingListComments: boolean,
    refetchListComments: () => void,
    nextPageListComments: () => void,
    prevPageListComments: () => void,
}

type UseCommentMediaProps = {
    key?: string,
    params?: ListCommentsPayload,
    isFetchComment?: boolean
}

export const useCommentMedia = ({
    key, 
    params = {},
    isFetchComment = false
}: UseCommentMediaProps) : UseCommentMedia => {

    const { mutateAsync: createCommentAsync } =
        useMutation((payload: CommentPayload) =>
            MediaRepository.createComment(payload)
        );

    const { mutateAsync: deleteCommentAsync } =
        useMutation((id: string) =>
            MediaRepository.deleteComment(id)
        );

    const { mutateAsync: updateCommentAsync } =
        useMutation((payload: CommentPayload) =>
            MediaRepository.updateComment(payload)
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
            MediaRepository.listComments({ 
                lastestID: pageParams ? pageParams : "",
                ...params
            }),
            {
                getNextPageParam: ({ nextCursor }: any) => {
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: isFetchComment,
                cacheTime: 60 * 1000
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
