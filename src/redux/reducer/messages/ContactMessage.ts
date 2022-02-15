import {createSlice} from "@reduxjs/toolkit";

const initialState : {data: {isOpenSendContact: boolean, conversationId: string}} = {
    data: {
        isOpenSendContact: false,
        conversationId: ""
    }
};

const contactMessageSlice = createSlice({
    name: 'share-message',
    initialState,
    reducers: {
        sendContactMessageToConversation (state, action) {
            state.data = {
                ...state.data,
                isOpenSendContact: true,
                conversationId: action.payload.conversationId
            }
        },
        dismissSendContactMessage (state, action) {
            state.data = {
                ...state.data,
                isOpenSendContact: false,
                conversationId: ""
            }
        }
    },
    extraReducers: {}
});

export const { sendContactMessageToConversation, dismissSendContactMessage } = contactMessageSlice.actions;
export default contactMessageSlice.reducer;