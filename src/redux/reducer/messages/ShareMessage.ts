import {createSlice} from "@reduxjs/toolkit";
import {ItemMessage} from "typings/apis/messages/listMessage";

const initialState : {data: {isOpenShare: boolean, shareMessage: ItemMessage|null}} = {
    data: {
        isOpenShare: false,
        shareMessage: null
    }
};

const shareMessageSlice = createSlice({
    name: 'share-message',
    initialState,
    reducers: {
        shareMessageToConversation (state, action) {
            state.data = {
                ...state.data,
                isOpenShare: true,
                shareMessage: action.payload.messageData
            }
        },
        dismissShare (state, action) {
            state.data = {
                ...state.data,
                isOpenShare: false,
                shareMessage: null
            }
        }
    },
    extraReducers: {}
});

export const { shareMessageToConversation, dismissShare } = shareMessageSlice.actions;
export default shareMessageSlice.reducer;