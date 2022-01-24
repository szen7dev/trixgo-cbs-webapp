import { FetchNextPageOptions, useInfiniteQuery, useMutation } from "react-query";
import { useSocket } from 'services/hooks/useSocket';
import { toast } from "react-toastify";
import SocialRepository from "apis/social";
import { 
    MediaProps, 
    MediaPayload, 
    CommentPayload, 
    ListCommentsPayload, 
    ListMediasPayload,
    MediaReactionPayload
} from "typings/social";
import { CommentProps } from 'typings/common';
import { objPopulate } from 'views/pages/media/utils';

// Định nghĩa toàn bộ các Hook (đóng gói lại) để làm việc với API
type UseSocial = {
    listMedias: Array<MediaProps>,
    createMedia: (payload: MediaPayload) => Promise<void>,
    updateMedia: (payload: MediaPayload) => Promise<void>,
    reactionMedia: (payload: MediaReactionPayload) => Promise<void>,
    deleteMedia: (id: string) => Promise<void>,
    isLoadingListMedias: boolean,
    refetchListMedias: () => void,
    nextPageListMedias: (options?: FetchNextPageOptions | undefined) => void,
    prevPageListMedias: () => void,
    totalRecord: number | undefined,
    totalPages: number | undefined,
    hasNextPage: boolean | undefined,
};

type UseCommentSocial = {
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

export const useSocial = (key?: string, params?: ListMediasPayload) : UseSocial => {
    const { current: socket }: any = useSocket();

    const { mutateAsync: createMediaAsync } =
        useMutation((payload: MediaPayload) =>
            SocialRepository.createMedia(payload)
        );

    const { mutateAsync: updateMediaAsync } =
        useMutation((payload: MediaPayload) =>
            SocialRepository.updateMedia(payload)
        );

    const { mutateAsync: deleteMediaAsync } =
        useMutation((id: string) =>
            SocialRepository.deleteMedia(id)
        );

    const { mutateAsync: reactionMediaAsync } =
        useMutation((payload: MediaReactionPayload) =>
            SocialRepository.reactionMedia(payload)
        );
    
    // Get danh sách
    const {
        isLoading: isLoadingListMedias,
        refetch: refetchListMedias,
        data: dataListMedias,
        fetchNextPage: nextPageListMedias,
        fetchPreviousPage: prevPageListMedias,
        hasNextPage: hasNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            key || "list_medias",
            async ({ pageParam }: any) =>
                SocialRepository.listMedias({ 
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

    const createMedia = async (payload: MediaPayload) => {
        try {
            const { error, data, message } = await createMediaAsync(payload);

            if (!error) {
                // refetchListMedias();

                toast.success('Tạo bài viết thành công');
                socket.emit('NOTIFICATION_CSS_ADD_MEDIA', {
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
            const response = await reactionMediaAsync(payload);
            console.log({ response });
        } catch (error: unknown) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const listMedias = [].concat(...(dataListMedias?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = dataListMedias?.pages[0]?.data?.totalRecord;
    const totalPages = dataListMedias?.pages[0]?.data?.totalPages;

    return {
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

export const useCommentSocial = (payload?: ListCommentsPayload) : UseCommentSocial => {
    const { mutateAsync: createCommentAsync } =
        useMutation((payload: CommentPayload) =>
            SocialRepository.createComment(payload)
        );

    const { mutateAsync: deleteCommentAsync } =
        useMutation((id: string) =>
            SocialRepository.deleteComment(id)
        );

    const { mutateAsync: updateCommentAsync } =
        useMutation((payload: CommentPayload) =>
            SocialRepository.updateComment(payload)
        );

    const {
        isLoading: isLoadingListComments,
        refetch: refetchListComments,
        data: dataListComments,
        fetchNextPage: nextPageListComments,
        fetchPreviousPage: prevPageListComments,
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            (payload && payload.key) || "list_comments",
            async ({ pageParams }: any) => 
            SocialRepository.listComments({ 
                lastestID: pageParams ? pageParams : "",
                ...objPopulate,
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

    const listComments = [].concat(...(dataListComments?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean)
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
