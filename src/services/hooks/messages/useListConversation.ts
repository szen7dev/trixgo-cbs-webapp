import ListConversationRepository from "apis/messages";
import {ListConversationPayload, ListMembersOfConversationPayload} from "typings/apis/messages/listConversation";
import {useDispatch} from "react-redux";
import {setNextCursor, setListConversation, setTotalRecord, setLoading} from "redux/reducer/messages/ListConversation";
import {setListMembers} from "redux/reducer/messages/ListMessage";

type UseListConversationType = {
    getListConversation: (params: ListConversationPayload) => void;
    getListMembersOfConversation: (params: ListMembersOfConversationPayload) => void;
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
        dispatch(setListMembers({conversationId: params.conversationID, data}))
    }

    return {
        getListConversation,
        getListMembersOfConversation
    }
};