import ListMessageRepository from "apis/messages/message";
import {
    ListMessageData,
    ListMessagePayload,
    SendNormalMessagePayload, ShareMessageData, ShareMessagePayload, UpdateReminderMessageData,
    UpdateReminderMessagePayload
} from "typings/apis/messages/listMessage";
import {setLoading, setListMessage, setNextCursor, setTotalRecord, appendMessageToConversation, updateReminderData} from "redux/reducer/messages/ListMessage";
import {useDispatch} from "react-redux";

type UseConversationType = {
    getListMessage: (params: ListMessagePayload) => Promise<ListMessageData>;
    sendNormalMessage: (params: SendNormalMessagePayload) => void;
    updateReminder: (params: UpdateReminderMessagePayload) => Promise<UpdateReminderMessageData>;
    shareMessageToConversation: (params: ShareMessagePayload) => Promise<ShareMessageData[]>
}

export const UseConversation = () : UseConversationType => {
    const dispatch = useDispatch();
    const currentUser = localStorage.getItem("currentUser")??"{}";
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

    const updateReminder = async (params: UpdateReminderMessagePayload) => {
        const {data} = await ListMessageRepository.updateReminder(params);
        dispatch(updateReminderData({conversationId: params.conversationID, messageId: params.messageID, reminderData: data.infoReminder}));
        return new Promise<UpdateReminderMessageData>((resolve, reject) => {
            resolve(data);
        });
    }

    const shareMessageToConversation = async (params: ShareMessagePayload) => {
        const {data} = await ListMessageRepository.shareMessage(params);
        return new Promise<ShareMessageData[]>((resolve, reject) => {
            resolve(data);
        });
    }

    return {
        getListMessage,
        sendNormalMessage,
        updateReminder,
        shareMessageToConversation
    }
}