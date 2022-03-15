import {createSlice} from "@reduxjs/toolkit";
import {ItemListConversation} from "typings/apis/messages/listConversation";

const initialState : {data: {isOpenConversationConfig: boolean, conversationId: string}} = {
    data: {
        isOpenConversationConfig: false,
        conversationId: ""
    }
};

const configConversationSlice = createSlice({
    name: 'config-conversation',
    initialState,
    reducers: {
        openConfigConversation (state, action) {
            state.data = {
                ...state.data,
                isOpenConversationConfig: true,
                conversationId: action.payload.conversationId
            }
        },
        dismissConfigConversation (state) {
            state.data = {
                ...state.data,
                isOpenConversationConfig: false,
                conversationId: ""
            }
        }
    },
    extraReducers: {}
});

export const { openConfigConversation, dismissConfigConversation } = configConversationSlice.actions;
export default configConversationSlice.reducer;