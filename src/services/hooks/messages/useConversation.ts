import ListMessageRepository from "apis/messages/message";
import {ListMessagePayload} from "typings/apis/messages/listMessage";
import {setLoading, setListMessage, setNextCursor, setTotalRecord} from "redux/reducer/messages/ListMessage";
import {useDispatch} from "react-redux";

type UseConversationType = {
    getListMessage: (params: ListMessagePayload) => void;
}

export const UseConversation = () : UseConversationType => {
    const dispatch = useDispatch();

    const getListMessage = async (params: ListMessagePayload) => {
        dispatch(setLoading({conversationId: params.conversationID, data: true}));
        const {data} = await ListMessageRepository.getListMessage(params);
        dispatch(setTotalRecord({conversationId: params.conversationID, data: data.totalRecord}));
        dispatch(setNextCursor({conversationId: params.conversationID, data: data.nextCursor}));
        dispatch(setListMessage({conversationId: params.conversationID, messages: data.listRecords}));
        dispatch(setLoading({conversationId: params.conversationID, data: false}));

        return data;
    }

    return {
        getListMessage
    }
}