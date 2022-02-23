import { FetchNextPageOptions, useInfiniteQuery, useMutation } from "react-query";
import { useSocket } from 'services/hooks/useSocket';
import { toast } from "react-toastify";
import MediaRepository from "apis/media";
import { 
    MediaProps, 
    MediaPayload, 
    CommentPayload, 
    ListCommentsPayload, 
    ListMediasPayload,
    MediaReactionPayload
} from "typings/media";
import { CommentProps } from 'typings/common';

type UseMedia = {
    // SEEN
    listSeens: Array<any>,
    totalRecordSeen: number,
    refetchListSeens: () => void,
    nextPageListSeens: (options?: FetchNextPageOptions | undefined) => void,
    // REACTION
    reactionMedia: (payload: MediaReactionPayload) => Promise<void>,
    listReactions: Array<any>,
    refetchListReactions: () => void,
    nextPageListReactions: (options?: FetchNextPageOptions | undefined) => void,
    // MEDIA
    createMedia: (payload: MediaPayload) => Promise<void>,
    updateMedia: (payload: MediaPayload) => Promise<void>,
    deleteMedia: (id: string) => Promise<void>,
    listMedias: Array<MediaProps>,
    isLoadingListMedias: boolean,
    refetchListMedias: () => void,
    nextPageListMedias: (options?: FetchNextPageOptions | undefined) => void,
    prevPageListMedias: () => void,
    totalRecord: number | undefined,
    totalPages: number | undefined,
    hasNextPage: boolean | undefined,
};

export const useMedia = (key?: string, params?: ListMediasPayload) : UseMedia => {
    const { current: socket }: any = useSocket();

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
        isLoading: isLoadingListMedias,
        refetch: refetchListMedias,
        data: dataListMedias,
        fetchNextPage: nextPageListMedias,
        fetchPreviousPage: prevPageListMedias,
        hasNextPage: hasNextPage
    } =
        useInfiniteQuery(
            key || "list_medias",
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
                enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
            }
        );

    // Get danh sách reaction
    const {
        data: dataListReactions,
        refetch: refetchListReactions,
        fetchNextPage: nextPageListReactions,
    } =
        useInfiniteQuery(
            ["list_reactions", key],
            async ({ pageParam }: any) =>
                MediaRepository.listReactions({ 
                    limit: 10,
                    lastestID: pageParam ? pageParam : "",
                    populates: JSON.stringify({
                        path: 'reaction userCreate',
                        select: '_id type fullname bizfullname image'
                    }),
                    ...params,
                }),
            {
                getNextPageParam: (params: any) => {
                    const nextCursor = params?.data?.nextCursor;
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
            }
        );

    // Get danh sách seen media
    const {
        data: dataListSeens,
        refetch: refetchListSeens,
        fetchNextPage: nextPageListSeens,
    } =
        useInfiniteQuery(
            ["list_seens_media", key],
            async ({ pageParam }: any) =>
                MediaRepository.listSeensMedia({ 
                    limit: 20,
                    lastestID: pageParam ? pageParam : "",
                    populates: JSON.stringify({
                        path: 'userCreate',
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
                enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
            }
        );

    const createMedia = async (payload: MediaPayload) => {
        try {
            const { error, data, message } = await createMediaAsync(payload);

            if (!error) {
                toast.success('Tạo bài viết thành công');
                socket.emit('NOTIFICATION_CSS_RECEIVE_NEW_NOTIFICATION', {
                    receivers: data.receivers
                });
            } else {
                toast.error(message);
            }
        } catch (error: unknown) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const updateMedia = async (payload: MediaPayload) => {
        try {
            const { error, message } = await updateMediaAsync(payload);

            if (!error) {
                toast.success('Cập nhật bài viết thành công');
            } else {
                toast.error(message);
            }
        } catch (error: unknown) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const deleteMedia = async (id: string) => {
        try {
            const { error, message } = await deleteMediaAsync(id);

            if (!error) {
                refetchListMedias();
                toast.success('Xóa bài viết thành công');
            } else {
                toast.error(message);
            }
        } catch (error: unknown) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const reactionMedia = async (payload: MediaReactionPayload) => {
        try {
            await reactionMediaAsync(payload);
        } catch (error: unknown) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const listMedias = []
        .concat(...(dataListMedias?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const listSeens = []
        .concat(...(dataListSeens?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecordSeen = dataListSeens?.pages[0]?.data?.totalRecord;
    const totalRecord = dataListMedias?.pages[0]?.data?.totalRecord;
    const totalPages = dataListMedias?.pages[0]?.data?.totalPages;

    const listReactions = [].concat(...(dataListReactions?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);

    return {
        // SEEN MEDIA
        listSeens,
        totalRecordSeen,
        refetchListSeens,
        nextPageListSeens,
        // REACTION
        listReactions,
        refetchListReactions,
        nextPageListReactions,
        // MEDIA
        createMedia,
        updateMedia,
        deleteMedia,
        reactionMedia,
        listMedias,
        isLoadingListMedias,
        refetchListMedias,
        nextPageListMedias,
        prevPageListMedias,
        totalRecord,
        totalPages,
        hasNextPage,
    };
};

type UseCommentMedia = {
    createComment: (payload: CommentPayload) => Promise<{ data: CommentProps } | undefined>,
    updateComment: (payload: CommentPayload) => Promise<{ data: CommentProps } | undefined>,
    deleteComment: (id: string) => Promise<void>,
    listComments: Array<CommentProps>,
    totalRecord: number,
    limit: number,
    nextCursor: string | undefined,
    isLoadingListComments: boolean,
    refetchListComments: () => void,
    nextPageListComments: () => void,
    prevPageListComments: () => void,
}

export const useCommentMedia = (payload?: ListCommentsPayload) : UseCommentMedia => {
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
            (payload && payload.key) || "list_comments",
            async ({ pageParams }: any) => 
            MediaRepository.listComments({ 
                lastestID: pageParams ? pageParams : "",
                ...payload
            }),
            {
                getNextPageParam: ({ nextCursor }: any) => {
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
            }
        );

    const createComment = async (payload: CommentPayload) => {
        try {
            const { error, data, message } = await createCommentAsync(payload);
            error && toast.error(message);

            return data;
        } catch (error: unknown) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const updateComment = async (payload: CommentPayload) => {
        try {
            const { error, data, message } = await updateCommentAsync(payload);
            error && toast.error(message);

            return data;
        } catch (error: unknown) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const deleteComment = async (id: string) => {
        try {
            const { error, message } = await deleteCommentAsync(id);
            error && toast.error(message);
        } catch (error: unknown) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const listComments = []
        .concat(...(dataListComments?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = dataListComments?.pages[0]?.data?.totalRecord || 0;
    const nextCursor = dataListComments?.pages[0]?.data?.nextCursor;
    const limit = dataListComments?.pages[0]?.data?.limit || 5;

    return {
        createComment,
        deleteComment,
        updateComment,
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
