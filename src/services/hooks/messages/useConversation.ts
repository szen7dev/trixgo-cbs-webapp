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
        dispatch(setLoading(true));
        const {data} = await ListMessageRepository.getListMessage(params);
        dispatch(setTotalRecord(data.totalRecord));
        dispatch(setNextCursor(data.listRecords[data.listRecords.length-1]._id));
        dispatch(setListMessage({conversationId: params.conversationID, messages: data.listRecords}));
        dispatch(setLoading(false));

        return data;
    }

    return {
        getListMessage
    }
}