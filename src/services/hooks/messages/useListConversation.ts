import { useInfiniteQuery } from "react-query";
import ListConversationRepository from "apis/messages";
import {ItemListConversation, ListConversationPayload} from "typings/apis/messages/listConversation";

type UseListConversation = {
    listConversation: Array<ItemListConversation>,
    isLoadingListConversation: boolean,
    fetchListConversation: () => void,
    nextListConversation: () => void,
    prevListConversation: () => void,
    totalRecord: number | undefined,
    hasNextPage: boolean | undefined
};

export const UseListConversation = (key?: string, params?: ListConversationPayload): UseListConversation => {
    const {
        isLoading: isLoadingListConversation,
        data: dataListConversation,
        refetch: fetchListConversation,
        fetchNextPage: nextListConversation,
        fetchPreviousPage: prevListConversation,
        hasNextPage: hasNextPage
    } = useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
        [key || "list_conversation", params?.keyword],
        async ({ pageParam }: any) =>
            ListConversationRepository.getListConversation({
                lastestID: pageParam||"",
                ...params,
            }),
        {
            getNextPageParam: ({ data }: any) => {
                return data?.nextCursor || undefined;
            },
            refetchOnWindowFocus: false,
            enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
        }
    );

    const listConversationUnPin = [].concat(...(dataListConversation?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const listConversationPined = [].concat(...(dataListConversation?.pages || []).map((d: any) => d.data?.listConversationPin.map((conversation: ItemListConversation) => {
        return {
            ...conversation,
            pinned: true
        }
    }))).filter(Boolean);
    const listConversation = listConversationPined.concat(listConversationUnPin);

    const totalRecord = dataListConversation?.pages[0]?.data?.totalRecord;

    return {
        listConversation,
        isLoadingListConversation,
        fetchListConversation,
        nextListConversation,
        prevListConversation,
        totalRecord,
        hasNextPage
    };
};