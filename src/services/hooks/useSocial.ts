import { useInfiniteQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import SocialRepository from "apis/social";
import { MediaProps, MediaPayload } from "typings/social";

type UseSocial = {
    listMedias: Array<MediaProps>,
    isLoadingListMedias: boolean,
    createMedia: (payload: MediaPayload) => Promise<void>,
    updateMedia: (payload: MediaPayload) => Promise<void>,
    deleteMedia: (id: string) => Promise<void>,
    refetchListMedias: () => void,
    nextPageListMedias: () => void,
    prevPageListMedias: () => void,
    totalRecord: number | undefined,
    totalPages: number | undefined,
    hasNextPage: boolean | undefined
};

export const useSocial = () : UseSocial => {
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
            const { error, data, message } = await updateMediaAsync(payload);
            console.log({ error, data, message });

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
            const { error, data, message } = await deleteMediaAsync(id);
            console.log({ error, data, message });

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

    const listMedias = [].concat(...(dataListMedias?.pages || []).map((d: any) => d.data?.listRecords));
    const totalRecord = dataListMedias?.pages[0]?.data?.totalRecord;
    const totalPages = dataListMedias?.pages[0]?.data?.totalPages;

    return {
        createMedia,
        updateMedia,
        deleteMedia,
        listMedias,
        isLoadingListMedias,
        refetchListMedias,
        nextPageListMedias,
        prevPageListMedias,
        totalRecord,
        totalPages,
        hasNextPage
    };
};
