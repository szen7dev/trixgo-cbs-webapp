import { useInfiniteQuery, useMutation } from "react-query";
import { useSocket } from 'services/hooks/useSocket';
import { toast } from "react-toastify";
import SocialRepository from "apis/social";
import { MediaProps, MediaPayload, CommentMediaPayload } from "typings/social";

type UseSocial = {
    listMedias: Array<MediaProps>,
    createMedia: (payload: MediaPayload) => Promise<void>,
    updateMedia: (payload: MediaPayload) => Promise<void>,
    deleteMedia: (id: string) => Promise<void>,
    createComment: (payload: CommentMediaPayload) => Promise<void>,
    isLoadingListMedias: boolean,
    refetchListMedias: () => void,
    nextPageListMedias: () => void,
    prevPageListMedias: () => void,
    totalRecord: number | undefined,
    totalPages: number | undefined,
    hasNextPage: boolean | undefined
};

export const useSocial = () : UseSocial => {
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

    const { mutateAsync: createCommentAsync } =
        useMutation((payload: CommentMediaPayload) =>
            SocialRepository.createComment(payload)
        );

    const {
        isLoading: isLoadingListMedias,
        refetch: refetchListMedias,
        data: dataListMedias,
        fetchNextPage: nextPageListMedias,
        fetchPreviousPage: prevPageListMedias,
        hasNextPage: hasNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            "list_medias",
            async ({ pageParams }: any) => 
            SocialRepository.listMedias({ 
                lastestID: pageParams ? pageParams : "",
            }),
            {
                getNextPageParam: ({ nextCursor }: any) => {
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
            }
        );

    const createMedia = async (payload: MediaPayload) => {
        try {
            const { error, data, message } = await createMediaAsync(payload);
            console.log({ error, data, message });

            if (!error) {
                refetchListMedias();

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

    const createComment = async (payload: CommentMediaPayload) => {
        try {
            const { error, data, message } = await createCommentAsync(payload);
            console.log({ error, data, message });

            if (error) {
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

    const listMedias = [].concat(...(dataListMedias?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = dataListMedias?.pages[0]?.data?.totalRecord;
    const totalPages = dataListMedias?.pages[0]?.data?.totalPages;

    return {
        createMedia,
        updateMedia,
        deleteMedia,
        listMedias,
        createComment,
        isLoadingListMedias,
        refetchListMedias,
        nextPageListMedias,
        prevPageListMedias,
        totalRecord,
        totalPages,
        hasNextPage
    };
};
