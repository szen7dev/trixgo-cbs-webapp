import {createSlice} from "@reduxjs/toolkit";
import {ItemMessage} from "typings/apis/messages/listMessage";

const initialState : {data: {isOpenMessageNPSVoteDetail: boolean, messageId: string, conversationId: string}} = {
    data: {
        isOpenMessageNPSVoteDetail: false,
        messageId: "",
        conversationId: ""
    }
};

const usersMessageNPSVoteDetailSlice = createSlice({
    name: 'message-nps-vote-detail',
    initialState,
    reducers: {
        openMessageNPSDetail (state, action) {
            state.data = {
                ...state.data,
                isOpenMessageNPSVoteDetail: true,
                messageId: action.payload.messageId,
                conversationId: action.payload.conversationId,
            }
        },
        dismissMessageNPSDetail (state) {
            state.data = {
                ...state.data,
                isOpenMessageNPSVoteDetail: false,
                messageId: "",
                conversationId: ""
            }
        }
    },
    extraReducers: {}
});

export const { openMessageNPSDetail, dismissMessageNPSDetail } = usersMessageNPSVoteDetailSlice.actions;
export default usersMessageNPSVoteDetailSlice.reducer;