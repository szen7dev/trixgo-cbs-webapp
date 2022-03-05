import {createSlice} from "@reduxjs/toolkit";

const initialState : {data: {isOpenAddConversationToFolder: boolean, conversationId: string}} = {
    data: {
        isOpenAddConversationToFolder: false,
        conversationId: ""
    }
};

const addConversationToFolderSlice = createSlice({
    name: 'add-conversation-to-folder',
    initialState,
    reducers: {
        openAddConversationToFolder (state, action) {
            state.data = {
                ...state.data,
                isOpenAddConversationToFolder: true,
                conversationId: action.payload.conversationId
            }
        },
        dismissAddConversationToFolder (state) {
            state.data = {
                ...state.data,
                isOpenAddConversationToFolder: false,
                conversationId: ""
            }
        }
    },
    extraReducers: {}
});

export const { openAddConversationToFolder, dismissAddConversationToFolder } = addConversationToFolderSlice.actions;
export default addConversationToFolderSlice.reducer;