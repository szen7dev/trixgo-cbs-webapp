import {useInfiniteQuery} from "react-query";
import ListConversationRepository from "apis/messages";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import ReactionMessageRepository from "../../../apis/messages/reactionMessage";

type UseConversationType = {
    isLoadingListReaction: boolean,
    refetchListReaction: () => void,
    listReactionsMessage: Array<ItemListConversation>,
    nextPageListReaction: () => void,
    prevPageListReaction: () => void,
    hasListReactionNextPage: boolean | undefined,
    totalRecordRequest: number | undefined,
}

export const UseReactMessage = (params: any, enableQuery: boolean) : UseConversationType => {

    const {
        isLoading: isLoadingListReaction,
        refetch: refetchListReaction,
        data: listReactionsFromAPI, // dataListContracts
        fetchNextPage: nextPageListReaction,
        fetchPreviousPage: prevPageListReaction,
        hasNextPage: hasListReactionNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            [`list_reactions_${params.messageID}`], // Key để phân biệt vùng tác động bởi data thay đổi
            async ({pageParam} : any) =>
                ReactionMessageRepository.getListReactionMessage({
                    lastestID: pageParam||"",
                    ...params
                }),
            {
                getNextPageParam: ({data} : any) => {
                    return data?.nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: enableQuery, // https://react-query.tanstack.com/guides/disabling-queries
            }
        );
    const listReactionsMessage = [].concat(...(listReactionsFromAPI?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecordRequest = listReactionsFromAPI?.pages[0]?.data?.totalRecord;

    return {
        listReactionsMessage,
        totalRecordRequest,
        isLoadingListReaction,
        refetchListReaction,
        nextPageListReaction,
        prevPageListReaction,
        hasListReactionNextPage
    }
}