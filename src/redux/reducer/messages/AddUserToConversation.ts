import {createSlice} from "@reduxjs/toolkit";

const initialState : {data: {isOpenAddUsersToConversation: boolean, conversationId: string}} = {
    data: {
        isOpenAddUsersToConversation: false,
        conversationId: ""
    }
};

const addUserToConversationSlice = createSlice({
    name: 'add-user-to-conversation',
    initialState,
    reducers: {
        openAddUserToConversation (state, action) {
            state.data = {
                ...state.data,
                isOpenAddUsersToConversation: true,
                conversationId: action.payload.conversationId
            }
        },
        dismissAddUserToConversation (state, action) {
            state.data = {
                ...state.data,
                isOpenAddUsersToConversation: false,
                conversationId: ""
            }
        }
    },
    extraReducers: {}
});

export const { openAddUserToConversation, dismissAddUserToConversation } = addUserToConversationSlice.actions;
export default addUserToConversationSlice.reducer;