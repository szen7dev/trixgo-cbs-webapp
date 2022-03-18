import {useInfiniteQuery} from "react-query";
import ListConversationRepository from "apis/messages";
import {
    ItemFileMessage,
    ItemLinkMessage,
    ItemListConversation, ItemMemberMessage,
    ListFileMessagePayload, ListLinksMessagePayload, ListMembersMessagePayload
} from "typings/apis/messages/listConversation";
import ReactionMessageRepository from "../../../apis/messages/reactionMessage";
import InformationMessageRepository from "../../../apis/messages/informationMessage";

type UseInformationMessageType = {
    isLoadingListMedias: boolean,
    refetchListMedias: () => void,
    listMediasMessage: Array<ItemFileMessage>,
    nextPageListMedias: () => void,
    prevPageListMedias: () => void,
    hasListMediasNextPage: boolean | undefined,
    totalRecordRequestMedias: number | undefined,

    isLoadingListFiles: boolean,
    refetchListFiles: () => void,
    listFilesMessage: Array<ItemFileMessage>,
    nextPageListFiles: () => void,
    prevPageListFiles: () => void,
    hasListFilesNextPage: boolean | undefined,
    totalRecordRequestFiles: number | undefined,

    isLoadingListLinks: boolean,
    refetchListLinks: () => void,
    listLinksMessage: Array<ItemLinkMessage>,
    nextPageListLinks: () => void,
    prevPageListLinks: () => void,
    hasListLinksNextPage: boolean | undefined,
    totalRecordRequestLinks: number | undefined,

    isLoadingListMembers: boolean,
    refetchListMembers: () => void,
    listMembersMessage: Array<ItemMemberMessage>,
    nextPageListMembers: () => void,
    prevPageListMembers: () => void,
    hasListMembersNextPage: boolean | undefined,
    totalRecordRequestMembers: number | undefined,
}

export const UseInformationMessage = (params: ListFileMessagePayload|ListLinksMessagePayload|ListMembersMessagePayload, enableQuery: boolean, type: string) : UseInformationMessageType => {

    const {
        isLoading: isLoadingListMedias,
        refetch: refetchListMedias,
        data: listMediasFromAPI, // dataListContracts
        fetchNextPage: nextPageListMedias,
        fetchPreviousPage: prevPageListMedias,
        hasNextPage: hasListMediasNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            [`list_medias_message_${params.conversationID}_${params.type}`, params.fromDate, params.toDate, params.authorID], // Key để phân biệt vùng tác động bởi data thay đổi
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
                enabled: (enableQuery&&type==="images"), // https://react-query.tanstack.com/guides/disabling-queries
            }
        );
    const listMediasMessage = [].concat(...(listMediasFromAPI?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecordRequestMedias = listMediasFromAPI?.pages[0]?.data?.totalRecord;

    const {
        isLoading: isLoadingListFiles,
        refetch: refetchListFiles,
        data: listFilesFromAPI, // dataListContracts
        fetchNextPage: nextPageListFiles,
        fetchPreviousPage: prevPageListFiles,
        hasNextPage: hasListFilesNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            [`list_files_message_${params.conversationID}_${params.type}`, params.fromDate, params.toDate, params.authorID], // Key để phân biệt vùng tác động bởi data thay đổi
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
                enabled: (enableQuery&&type==="files"), // https://react-query.tanstack.com/guides/disabling-queries
            }
        );
    const listFilesMessage = [].concat(...(listFilesFromAPI?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecordRequestFiles = listFilesFromAPI?.pages[0]?.data?.totalRecord;

    const {
        isLoading: isLoadingListLinks,
        refetch: refetchListLinks,
        data: listLinksFromAPI, // dataListContracts
        fetchNextPage: nextPageListLinks,
        fetchPreviousPage: prevPageListLinks,
        hasNextPage: hasListLinksNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            [`list_links_message_${params.conversationID}`, params.fromDate, params.toDate, params.authorID], // Key để phân biệt vùng tác động bởi data thay đổi
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

    const {
        isLoading: isLoadingListMembers,
        refetch: refetchListMembers,
        data: listMembersFromAPI, // dataListContracts
        fetchNextPage: nextPageListMembers,
        fetchPreviousPage: prevPageListMembers,
        hasNextPage: hasListMembersNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            [`list_members_message_${params.conversationID}`, params.keyword], // Key để phân biệt vùng tác động bởi data thay đổi
            async ({pageParam} : any) =>
                InformationMessageRepository.getListMembersMessage({
                    lastestID: pageParam||"",
                    ...params
                }),
            {
                getNextPageParam: ({data} : any) => {
                    return data?.nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: enableQuery&&type==="members", // https://react-query.tanstack.com/guides/disabling-queries
            }
        );
    const listMembersMessage = [].concat(...(listMembersFromAPI?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecordRequestMembers = listMembersFromAPI?.pages[0]?.data?.totalRecord;

    return {
        listMediasMessage,
        totalRecordRequestMedias,
        isLoadingListMedias,
        refetchListMedias,
        nextPageListMedias,
        prevPageListMedias,
        hasListMediasNextPage,

        listFilesMessage,
        totalRecordRequestFiles,
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

        isLoadingListMembers,
        refetchListMembers,
        listMembersMessage,
        nextPageListMembers,
        prevPageListMembers,
        hasListMembersNextPage,
        totalRecordRequestMembers,
    }
}