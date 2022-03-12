import {useInfiniteQuery} from "react-query";
import ListConversationRepository from "apis/messages";
import {
    ItemFileMessage,
    ItemLinkMessage,
    ItemListConversation,
    ListFileMessagePayload, ListLinksMessagePayload
} from "typings/apis/messages/listConversation";
import ReactionMessageRepository from "../../../apis/messages/reactionMessage";
import InformationMessageRepository from "../../../apis/messages/informationMessage";

type UseInformationMessageType = {
    isLoadingListFiles: boolean,
    refetchListFiles: () => void,
    listFilesMessage: Array<ItemFileMessage>,
    nextPageListFiles: () => void,
    prevPageListFiles: () => void,
    hasListFilesNextPage: boolean | undefined,
    totalRecordRequest: number | undefined,

    isLoadingListLinks: boolean,
    refetchListLinks: () => void,
    listLinksMessage: Array<ItemLinkMessage>,
    nextPageListLinks: () => void,
    prevPageListLinks: () => void,
    hasListLinksNextPage: boolean | undefined,
    totalRecordRequestLinks: number | undefined,
}

export const UseInformationMessage = (params: ListFileMessagePayload|ListLinksMessagePayload, enableQuery: boolean, type: string) : UseInformationMessageType => {

    const {
        isLoading: isLoadingListFiles,
        refetch: refetchListFiles,
        data: listFilesFromAPI, // dataListContracts
        fetchNextPage: nextPageListFiles,
        fetchPreviousPage: prevPageListFiles,
        hasNextPage: hasListFilesNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            [`list_files_message_${params.conversationID}_${params.type}`, params], // Key để phân biệt vùng tác động bởi data thay đổi
            async ({pageParam} : any) =>
                InformationMessageRepository.getListFilesMessage({
                    lastestID: pageParam||"",
                    ...params
                }),
            {
                getNextPageParam: ({data} : any) => {
                    return data?.nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: (enableQuery&&["files","images"].includes(type)), // https://react-query.tanstack.com/guides/disabling-queries
            }
        );
    const listFilesMessage = [].concat(...(listFilesFromAPI?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecordRequest = listFilesFromAPI?.pages[0]?.data?.totalRecord;

    const {
        isLoading: isLoadingListLinks,
        refetch: refetchListLinks,
        data: listLinksFromAPI, // dataListContracts
        fetchNextPage: nextPageListLinks,
        fetchPreviousPage: prevPageListLinks,
        hasNextPage: hasListLinksNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            [`list_links_message_${params.conversationID}`, params], // Key để phân biệt vùng tác động bởi data thay đổi
            async ({pageParam} : any) =>
                InformationMessageRepository.getListLinksMessage({
                    lastestID: pageParam||"",
                    ...params
                }),
            {
                getNextPageParam: ({data} : any) => {
                    return data?.nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: enableQuery&&type==="links", // https://react-query.tanstack.com/guides/disabling-queries
            }
        );
    const listLinksMessage = [].concat(...(listLinksFromAPI?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecordRequestLinks = listLinksFromAPI?.pages[0]?.data?.totalRecord;

    return {
        listFilesMessage,
        totalRecordRequest,
        isLoadingListFiles,
        refetchListFiles,
        nextPageListFiles,
        prevPageListFiles,
        hasListFilesNextPage,

        isLoadingListLinks,
        refetchListLinks,
        listLinksMessage,
        nextPageListLinks,
        prevPageListLinks,
        hasListLinksNextPage,
        totalRecordRequestLinks,
    }
}