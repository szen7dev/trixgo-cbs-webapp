import ListConversationRepository from "apis/messages";
import {
    CreateConversationPayload, CreateConversationResponseBodyData,
    ListConversationPayload,
    ListMembersOfConversationPayload, MediasOfConversationPayload
} from "typings/apis/messages/listConversation";
import {useDispatch} from "react-redux";
import {setNextCursor, setListConversation, setTotalRecord, setLoading} from "redux/reducer/messages/ListConversation";
import {setListMembers, setListMedias} from "redux/reducer/messages/ListMessage";

type UseListConversationType = {
    getListConversation: (params: ListConversationPayload) => Promise<void>;
    getListMembersOfConversation: (params: ListMembersOfConversationPayload) => Promise<void>;
    createConversation: (params: CreateConversationPayload) => Promise<CreateConversationResponseBodyData>;
    getListMediasOfConversation: (params: MediasOfConversationPayload) => Promise<void>;
};

export const UseListConversation = () : UseListConversationType => {
    const dispatch = useDispatch();

    const getListConversation = async (params: ListConversationPayload) => {
        dispatch(setLoading(true));
        const {data} = await ListConversationRepository.getListConversation(params);
        dispatch(setTotalRecord(data.totalRecord));
        dispatch(setNextCursor(data.nextCursor));
        dispatch(setListConversation(data.listRecords));
        dispatch(setLoading(false));
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

    return {
        getListConversation,
        getListMembersOfConversation,
        createConversation,
        getListMediasOfConversation
    }
};