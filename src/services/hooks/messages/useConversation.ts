import ListMessageRepository from "apis/messages/message";
import {
    AddUserToConversationPayload,
    DeleteRevokeMessagePayload, ItemMessage,
    ListMessageData,
    ListMessagePayload,
    PinnedMessagePayload, SearchMessageInConversationByIdPayload,
    SendNormalMessagePayload,
    ShareMessageData,
    ShareMessagePayload, UpdatePinnedMessageData,
    UpdatePinnedMessagePayload, UpdatePollData, UpdatePollPayload,
    UpdateReminderMessageData,
    UpdateReminderMessagePayload
} from "typings/apis/messages/listMessage";
import {setLoading, setListMessage, setNextCursor, setTotalRecord, appendMessageToConversation, updateReminderData, setPinnedMessage, deleteMessageInConversations, revokeMessageInConversation} from "redux/reducer/messages/ListMessage";
import {setLoadingSearch, setListSearchMessage, setNextSearchCursor, setPrevSearchCursor, setTotalRecordBack, setTotalRecordFront} from "redux/reducer/messages/SearchMessage";
import {useDispatch} from "react-redux";

type UseConversationType = {
    getListMessage: (params: ListMessagePayload) => Promise<ListMessageData>;
    sendNormalMessage: (params: SendNormalMessagePayload) => void;
    updateReminder: (params: UpdateReminderMessagePayload) => Promise<UpdateReminderMessageData>;
    shareMessageToConversation: (params: ShareMessagePayload) => Promise<ShareMessageData[]>;
    getListPinMessage: (params: PinnedMessagePayload) => void;
    updatePinMessage: (params: UpdatePinnedMessagePayload) => Promise<UpdatePinnedMessageData>;
    deleteMessage: (params: DeleteRevokeMessagePayload) => void;
    revokeMessage: (params: DeleteRevokeMessagePayload) => Promise<{data: ItemMessage[], error: boolean}>;
    updatePoll: (params: UpdatePollPayload) => Promise<UpdatePollData>;
    addUserToConversation: (params: AddUserToConversationPayload) => Promise<{ data: any, error: boolean }>;
    goToMessagePosition: (params: SearchMessageInConversationByIdPayload, isFirstInit? : boolean, direction?: "front"|"back") => void;
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

    const getListPinMessage = async (params: PinnedMessagePayload) => {
        const {data} = await ListMessageRepository.getListPinMessage(params);
        dispatch(setPinnedMessage({conversationId: params.conversationID, listMessagesPinned: data.listRecords}))
        return data
    }

    const updatePinMessage = async (params: UpdatePinnedMessagePayload) => {
        const {data} = await ListMessageRepository.updatePinMessage(params);

        return new Promise<UpdatePinnedMessageData>((resolve, reject) => {
            resolve(data);
        });
    }

    const deleteMessage = async (params: DeleteRevokeMessagePayload) => {
        const {data} = await ListMessageRepository.deleteMessage(params);
        dispatch(deleteMessageInConversations({
            conversationId: params.conversationID,
            messageData: data
        }));

        return data;
    }

    const revokeMessage = async (params: DeleteRevokeMessagePayload) => {
        const {data,error} = await ListMessageRepository.revokeMessage(params);

        return new Promise<{data: ItemMessage[], error: boolean}>((resolve, reject) => {
            resolve({data, error});
        });
    }

    const updatePoll = async (params: UpdatePollPayload) => {
        const {data} = await  ListMessageRepository.updatePoll(params);

        return new Promise<UpdatePollData>((resolve, reject) => {
            resolve(data);
        });
    }

    const addUserToConversation = async (params: AddUserToConversationPayload) => {
        const {data, error} = await ListMessageRepository.addUserToConversation(params);

        return new Promise<{ data: any, error: boolean }>((resolve, reject) => {
            resolve({data, error});
        });
    }

    const goToMessagePosition = async (params: SearchMessageInConversationByIdPayload, isFirstInit = true, direction = "front") => {
        dispatch(setLoadingSearch({conversationId: params.conversationID, data: true}));
        const {data} = await ListMessageRepository.goToMessagePosition(params);
        dispatch(setTotalRecordFront({conversationId: params.conversationID, data: data.totalRecordFront}));
        dispatch(setTotalRecordBack({conversationId: params.conversationID, data: data.totalRecordBack}));
        if (isFirstInit) {
            dispatch(setNextSearchCursor({conversationId: params.conversationID, data: data.listRecords[data.listRecords.length - 1]._id}));
            dispatch(setPrevSearchCursor({conversationId: params.conversationID, data: data.listRecords[0]._id}));
        } else {
            if (direction === "front") {
                dispatch(setNextSearchCursor({conversationId: params.conversationID, data: data.listRecords[data.listRecords.length - 1]._id}));
            } else {
                dispatch(setPrevSearchCursor({conversationId: params.conversationID, data: data.listRecords[0]._id}));
            }
        }
        dispatch(setListSearchMessage({conversationId: params.conversationID, messages: data.listRecords}));
        dispatch(setLoadingSearch({conversationId: params.conversationID, data: false}));

        return data;
    }

    return {
        getListMessage,
        sendNormalMessage,
        updateReminder,
        shareMessageToConversation,
        getListPinMessage,
        updatePinMessage,
        deleteMessage,
        revokeMessage,
        updatePoll,
        addUserToConversation,
        goToMessagePosition
    }
}