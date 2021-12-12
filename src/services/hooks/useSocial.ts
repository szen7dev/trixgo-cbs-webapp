import { useInfiniteQuery } from "react-query";
import SocialRepository from "apis/social";
import { MediaProps } from "typings/social";

type UseSocial = {
    listMedias: Array<MediaProps>,
    isLoadingListMedias: boolean,
    refetchListMedias: () => void,
    nextPageListMedias: () => void,
    prevPageListMedias: () => void,
    totalRecord: number | undefined,
    totalPages: number | undefined,
    hasNextPage: boolean | undefined
};

export const useSocial = (): UseSocial => {
    const {
        isLoading: isLoadingListMedias,
        refetch: refetchListMedias,
        data: dataListMedias,
        fetchNextPage: nextPageListMedias,
        fetchPreviousPage: prevPageListMedias,
        hasNextPage: hasNextPage
    } =
        useInfiniteQuery(                                                   // https://react-query.tanstack.com/reference/useInfiniteQuery
            "list_medias",
            async ({ pageParams }: any) => SocialRepository.listMedias({ lastestID: pageParams ? pageParams: "" }),
            {
                getNextPageParam: ({ nextCursor }: any) => {
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: true,                                              // https://react-query.tanstack.com/guides/disabling-queries
            }
        );

    const listMedias = [].concat(...(dataListMedias?.pages || []).map((d: any) => d.data?.listRecords));
    const totalRecord = dataListMedias?.pages[0]?.data?.totalRecord;
    const totalPages = dataListMedias?.pages[0]?.data?.totalPages;

    return {
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
