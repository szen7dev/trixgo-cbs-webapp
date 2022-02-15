import {createSlice} from "@reduxjs/toolkit";

const initialState : {data: {isOpenCreateNPS: boolean, conversationId: string}} = {
    data: {
        isOpenCreateNPS: false,
        conversationId: ""
    }
};

const createNPSMessageSlice = createSlice({
    name: 'create-nps-message',
    initialState,
    reducers: {
        sendNPSMessageToConversation (state, action) {
            state.data = {
                ...state.data,
                isOpenCreateNPS: true,
                conversationId: action.payload.conversationId
            }
        },
        dismissSendNPSMessage (state, action) {
            state.data = {
                ...state.data,
                isOpenCreateNPS: false,
                conversationId: ""
            }
        }
    },
    extraReducers: {}
});

export const { sendNPSMessageToConversation, dismissSendNPSMessage } = createNPSMessageSlice.actions;
export default createNPSMessageSlice.reducer;