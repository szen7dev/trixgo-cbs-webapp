import { useInfiniteQuery, useMutation } from "react-query";
import NotificationRepository from "apis/notification";
import { NotificationProps, UpdateNotificationPayload } from "typings/notification";

type UseNotification = {
    updateNotificationAsync: (payload: UpdateNotificationPayload) => Promise<any>,
    listNotifications: Array<NotificationProps>,
    isLoadingListNotification: boolean,
    refetchListNotification: () => void,
    nextPageListNotification: () => void,
    prevPageListNotification: () => void,
    totalRecord: number,
    totalPages: number,
    hasNextPage: boolean | undefined
};

export const useNotification = (params?: any, isFetch?: boolean) : UseNotification => {
    const { mutateAsync: updateNotificationAsync } =
        useMutation((payload: UpdateNotificationPayload) =>
            NotificationRepository.updateNotification(payload)
        );

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
                enabled: isFetch ?? false
            }
        );

    const listNotifications = []
        .concat(...(dataListNotifications?.pages || [])
        .map((d: any) => d.data?.listRecords))
        .filter(Boolean);

    const totalRecord = dataListNotifications?.pages[0]?.data?.totalRecord || 0;
    const totalPages = dataListNotifications?.pages[0]?.data?.totalPage || 0;

    return {
        updateNotificationAsync,
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
