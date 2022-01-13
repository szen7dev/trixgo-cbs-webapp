import ListMessageRepository from "apis/messages/message";
import {ListMessageData, ListMessagePayload, SendNormalMessagePayload} from "typings/apis/messages/listMessage";
import {setLoading, setListMessage, setNextCursor, setTotalRecord, appendMessageToConversation} from "redux/reducer/messages/ListMessage";
import {useDispatch} from "react-redux";

type UseConversationType = {
    getListMessage: (params: ListMessagePayload) => Promise<ListMessageData>;
    sendNormalMessage: (params: SendNormalMessagePayload) => void;
}

export const UseConversation = () : UseConversationType => {
    const dispatch = useDispatch();
    const currentUser = localStorage.getItem("currentUser")??"";
    const profile = JSON.parse(currentUser);

    const getListMessage = async (params: ListMessagePayload) => {
        dispatch(setLoading({conversationId: params.conversationID, data: true}));
        const {data} = await ListMessageRepository.getListMessage(params);
        dispatch(setTotalRecord({conversationId: params.conversationID, data: data.totalRecord}));
        dispatch(setNextCursor({conversationId: params.conversationID, data: data.nextCursor}));
        dispatch(setListMessage({conversationId: params.conversationID, messages: data.listRecords, isFreshData: !params.lastestID}));
        dispatch(setLoading({conversationId: params.conversationID, data: false}));

        return new Promise<ListMessageData>((resolve, reject) => {
            resolve(data);
        });
    }

    const sendNormalMessage = async (params: SendNormalMessagePayload) => {
        const {data} = await ListMessageRepository.sendNormalMessage(params);
        data&&dispatch(appendMessageToConversation({
            conversationId: params.conversationID,
            messageId: data._id,
            messageData: {
                ...data,
                sender: profile
            }
        }));

        return data;
    }
    return {
        getListMessage,
        sendNormalMessage
    }
}