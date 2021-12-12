import { useDispatch } from "react-redux";
import { useInfiniteQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import SocialRepository from "apis/social";
import { addMedia } from 'redux/reducer/SocialSlice';
import { MediaProps, MediaPayload } from "typings/social";

type UseSocial = {
    listMedias: Array<MediaProps>,
    isLoadingListMedias: boolean,
    createPost: (payload: MediaPayload) => Promise<void>,
    refetchListMedias: () => void,
    nextPageListMedias: () => void,
    prevPageListMedias: () => void
};

export const useSocial = () : UseSocial => {
    const dispatch = useDispatch();

    const { mutateAsync: createPostAsync } =
        useMutation((payload: MediaPayload) =>
            SocialRepository.createPost(payload)
        );

    const createPost = async (payload: MediaPayload) => {
        try {
            const { error, data, message } = await createPostAsync(payload);
            console.log({ error, data, message });

            if (!error) {
                dispatch(addMedia(data));
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

    const {
        isLoading: isLoadingListMedias,
        refetch: refetchListMedias,
        data: dataListMedias,
        fetchNextPage: nextPageListMedias,
        fetchPreviousPage: prevPageListMedias
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

    const listMedias = [].concat(...(dataListMedias?.pages || []).map((d: any) => d.data?.listRecords));

    return {
        createPost,
        listMedias,
        isLoadingListMedias,
        refetchListMedias,
        nextPageListMedias,
        prevPageListMedias
    };
};
