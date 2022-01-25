import ListConversationRepository from "apis/messages";
import {
    CreateConversationPayload, CreateConversationResponseBodyData, DataListConversation, ItemListConversation,
    ListConversationPayload,
    ListMembersOfConversationPayload, MediasOfConversationPayload
} from "typings/apis/messages/listConversation";
import {useDispatch} from "react-redux";
import {setNextCursor, setListConversation, setTotalRecord, setLoading} from "redux/reducer/messages/ListConversation";
import {setListMembers, setListMedias} from "redux/reducer/messages/ListMessage";
import {useInfiniteQuery} from "react-query";

type UseListConversationType = {
    getListConversation: (params: ListConversationPayload, saveToRedux?: boolean) => Promise<DataListConversation>;
    getListMembersOfConversation: (params: ListMembersOfConversationPayload) => Promise<void>;
    createConversation: (params: CreateConversationPayload) => Promise<CreateConversationResponseBodyData>;
    getListMediasOfConversation: (params: MediasOfConversationPayload) => Promise<void>;
    isLoadingListConversations: boolean,
    refetchListConversations: () => void,
    listConversations: Array<ItemListConversation>,
    nextPageListConversations: () => void,
    prevPageListConversations: () => void,
    hasListConversationNextPage: boolean | undefined,
    totalRecordRequest: number | undefined,
};

export const UseListConversation = (params?: any) : UseListConversationType => {
    const dispatch = useDispatch();

    const getListConversation = async (params: ListConversationPayload, saveToRedux = true) => {
        saveToRedux&&dispatch(setLoading(true));
        const {data} = await ListConversationRepository.getListConversation(params);
        saveToRedux&&dispatch(setTotalRecord(data.totalRecord));
        saveToRedux&&dispatch(setNextCursor(data.nextCursor));
        saveToRedux&&dispatch(setListConversation(data.listRecords));
        saveToRedux&&dispatch(setLoading(false));

        return data
    }

    const getListMembersOfConversation = async (params: ListMembersOfConversationPayload) => {
        const { data } = await ListConversationRepository.getListMembersOfConversation(params);
        dispatch(setListMembers({conversationId: params.conversationID, data: data.listRecords}))
    }

    const createConversation = async (params: CreateConversationPayload) => {
        const {data} = await ListConversationRepository.createConversation(params);
        return data;
    }

    const getListMediasOfConversation = async (params: MediasOfConversationPayload) => {
        const {data} = await ListConversationRepository.getListImagesOfConversation(params);
        dispatch(setListMedias({conversationId: params.conversationID, data: data.listRecords, type: params.typeMessage}))
    }

    const {
        isLoading: isLoadingListConversations,
        refetch: refetchListConversations,
        data: listConversationsFromAPI, // dataListContracts
        fetchNextPage: nextPageListConversations,
        fetchPreviousPage: prevPageListConversations,
        hasNextPage: hasListConversationNextPage
    } =
        useInfiniteQuery( // https://react-query.tanstack.com/reference/useInfiniteQuery
            [`list_conversations`, params?.keyword], // Key để phân biệt vùng tác động bởi data thay đổi
            async ({pageParam} : any) =>
                ListConversationRepository.getListConversation({
                    lastestID: pageParam,
                    ...params
                }),
            {
                getNextPageParam: ({data} : any) => {
                    return data.nextCursor || undefined;
                },
                refetchOnWindowFocus: false,
                enabled: true, // https://react-query.tanstack.com/guides/disabling-queries
            }
        );
    const listConversations = [].concat(...(listConversationsFromAPI?.pages || []).map((d: any) => d.data?.listRecords)).filter(Boolean);
    const totalRecordRequest = listConversationsFromAPI?.pages[0]?.data?.totalRecord;

    return {
        getListConversation,
        getListMembersOfConversation,
        createConversation,
        getListMediasOfConversation,
        isLoadingListConversations,
        refetchListConversations,
        listConversations,
        nextPageListConversations,
        prevPageListConversations,
        hasListConversationNextPage,
        totalRecordRequest
    }
};