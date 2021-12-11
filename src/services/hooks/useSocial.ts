import { useInfiniteQuery } from "react-query";
import SocialRepository from "apis/social";
import { MediaProps } from "typings/social";

type UseSocial = {
    listMedias: Array<MediaProps>,
    isLoadingListMedias: boolean,
    refetchListMedias: () => void,
    nextPageListMedias: () => void,
    prevPageListMedias: () => void
};

export const useSocial = (): UseSocial => {
    const {
        isLoading: isLoadingListMedias,
        refetch: refetchListMedias,
        data: dataListMedias,
        fetchNextPage: nextPageListMedias,
        fetchPreviousPage: prevPageListMedias
    } =
        useInfiniteQuery(                                                   // https://react-query.tanstack.com/reference/useInfiniteQuery
            "list_medias",
            async ({ pageParams }: any) => SocialRepository.listMedias({ lastestID: pageParams }),
            {
                getNextPageParam: ({ nextCursor }: any) => {
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: true,                                              // https://react-query.tanstack.com/guides/disabling-queries
            }
        );

    const listMedias = [].concat(...(dataListMedias?.pages || []).map((d: any) => d.listRecords));

    return {
        listMedias,
        isLoadingListMedias,
        refetchListMedias,
        nextPageListMedias,
        prevPageListMedias
    };
};
