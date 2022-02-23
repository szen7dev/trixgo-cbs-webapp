import {useInfiniteQuery} from "react-query";
import ListMessageRepository from "apis/messages/message";
import {ItemMessage} from "../../../typings/apis/messages/listMessage";

type UseMessageType = {
    isLoadingSearchMessage: boolean,
    refetchSearchMessage: () => void,
    searchMessages: Array<ItemMessage>,
    nextPageSearchMessage: () => void,
    prevPageSearchMessage: () => void,
    hasSearchMessageNextPage: boolean | undefined,
    totalRecordRequest: number | undefined,
};

export const UseMessage = (params: any, enabled: boolean) : UseMessageType => {
    const {
        isLoading: isLoadingSearchMessage,
        refetch: refetchSearchMessage,
        data: searchMessagesFromAPI,
        fetchNextPage: nextPageSearchMessage,
        fetchPreviousPage: prevPageSearchMessage,
        hasNextPage: hasSearchMessageNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            [`list_search_messages`, params?.keyword, params.conversationID], // Key để phân biệt vùng tác động bởi data thay đổi
            async ({pageParam} : any) =>
                ListMessageRepository.getListMessage({
                    lastestID: pageParam||"",
                    ...params
                }),
            {
                getNextPageParam: ({data} : any) => {
                    return data?.nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: enabled, // https://react-query.tanstack.com/guides/disabling-queries
            }
        );
    const searchMessages = [].concat(...(searchMessagesFromAPI?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecordRequest = searchMessagesFromAPI?.pages[0]?.data?.totalRecord;

    return {
        isLoadingSearchMessage,
        refetchSearchMessage,
        searchMessages,
        nextPageSearchMessage,
        prevPageSearchMessage,
        hasSearchMessageNextPage,
        totalRecordRequest,
    }
}