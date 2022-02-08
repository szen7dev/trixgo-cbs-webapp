import {createSlice} from "@reduxjs/toolkit";
import {ItemMessage} from "typings/apis/messages/listMessage";

const initialState : {data: {isOpenShare: boolean, shareMessage: {[key: string]: ItemMessage}}} = {
    data: {
        isOpenShare: false,
        shareMessage: {}
    }
};

const shareMessageSlice = createSlice({
    name: 'share-message',
    initialState,
    reducers: {
        shareMessageToConversation (state, action) {
            const newShareData = {...state.data.shareMessage};
            action.payload.messageData.forEach((message: ItemMessage) => {
                newShareData[message._id] = message
            });
            state.data = {
                ...state.data,
                isOpenShare: true,
                shareMessage: newShareData
            }
        },
        dismissShare (state, action) {
            state.data = {
                ...state.data,
                isOpenShare: false,
                shareMessage: {}
            }
        }
    },
    extraReducers: {}
});

export const { shareMessageToConversation, dismissShare } = shareMessageSlice.actions;
export default shareMessageSlice.reducer;