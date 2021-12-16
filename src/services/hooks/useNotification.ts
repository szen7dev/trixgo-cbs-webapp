import { useInfiniteQuery } from "react-query";
import NotificationRepository from "apis/notification";
import { NotificationProps } from "typings/notification";

type UseNotification = {
    listNotifications: Array<NotificationProps>,
    isLoadingListNotification: boolean,
    refetchListMedias: () => void,
    nextPageListNotification: () => void,
    prevPageListNotification: () => void,
    totalRecord: number | undefined,
    totalPages: number | undefined,
    hasNextPage: boolean | undefined
};

export const useNotification = () : UseNotification => {
    const {
        isLoading: isLoadingListNotification,
        refetch: refetchListMedias,
        data: dataListNotifications,
        fetchNextPage: nextPageListNotification,
        fetchPreviousPage: prevPageListNotification,
        hasNextPage: hasNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            "list_notifications",
            async ({ pageParams }: any) => 
            NotificationRepository.listNotification({ 
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

    const listNotifications = [].concat(...(dataListNotifications?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecord = dataListNotifications?.pages[0]?.data?.totalRecord;
    const totalPages = dataListNotifications?.pages[0]?.data?.totalPages;

    return {
        listNotifications,
        isLoadingListNotification,
        refetchListMedias,
        nextPageListNotification,
        prevPageListNotification,
        totalRecord,
        totalPages,
        hasNextPage
    };
};
