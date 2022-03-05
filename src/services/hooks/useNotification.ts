import { useInfiniteQuery } from "react-query";
import NotificationRepository from "apis/notification";
import { NotificationProps } from "typings/notification";

type UseNotification = {
    listNotifications: Array<NotificationProps>,
    isLoadingListNotification: boolean,
    refetchListNotification: () => void,
    nextPageListNotification: () => void,
    prevPageListNotification: () => void,
    totalRecord: number | undefined,
    totalPages: number | undefined,
    hasNextPage: boolean | undefined
};

export const useNotification = (params?: any) : UseNotification => {
    const {
        isLoading: isLoadingListNotification,
        refetch: refetchListNotification,
        data: dataListNotifications,
        fetchNextPage: nextPageListNotification,
        fetchPreviousPage: prevPageListNotification,
        hasNextPage: hasNextPage
    } =
        useInfiniteQuery(
            ["list_notifications", params],
            async ({ pageParam }: any) => 
            NotificationRepository.listNotification({ 
                ...params,
                lastestID: pageParam
            }),
            {
                getNextPageParam: (params: any) => {
                    const nextCursor = params?.data?.nextCursor;
                    return nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: true
            }
        );

    const listNotifications = []
        .concat(...(dataListNotifications?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = dataListNotifications?.pages[0]?.data?.totalRecord;
    const totalPages = dataListNotifications?.pages[0]?.data?.totalPage;

    return {
        listNotifications,
        isLoadingListNotification,
        refetchListNotification,
        nextPageListNotification,
        prevPageListNotification,
        totalRecord,
        totalPages,
        hasNextPage
    };
};
