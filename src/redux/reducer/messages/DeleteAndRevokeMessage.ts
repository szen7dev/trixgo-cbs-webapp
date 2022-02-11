import {createSlice} from "@reduxjs/toolkit";
import {ItemMessage} from "typings/apis/messages/listMessage";

const initialState : {data: {isOpenDeleteRevoke: boolean, deleteAndRevokeMessage: ItemMessage[], conversationId: string}} = {
    data: {
        isOpenDeleteRevoke: false,
        deleteAndRevokeMessage: [],
        conversationId: ""
    }
};

const deleteAndRevokeMessageSlice = createSlice({
    name: 'delete-revoke-message',
    initialState,
    reducers: {
        deleteAndRevokeMessageOfConversation (state, action) {
            state.data = {
                ...state.data,
                isOpenDeleteRevoke: true,
                deleteAndRevokeMessage: action.payload.messageIds,
                conversationId: action.payload.conversationId
            }
        },
        dismissDeleteRevoke (state, action) {
            state.data = {
                ...state.data,
                isOpenDeleteRevoke: false,
                deleteAndRevokeMessage: [],
                conversationId: ""
            }
        }
    },
    extraReducers: {}
});

export const { deleteAndRevokeMessageOfConversation, dismissDeleteRevoke } = deleteAndRevokeMessageSlice.actions;
export default deleteAndRevokeMessageSlice.reducer;