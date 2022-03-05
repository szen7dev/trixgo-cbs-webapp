import {createSlice} from "@reduxjs/toolkit";
import {ItemListConversation} from "typings/apis/messages/listConversation";

const initialState : {data: {isOpenAddConversationToFolder: boolean, conversation: ItemListConversation|null}} = {
    data: {
        isOpenAddConversationToFolder: false,
        conversation: null
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
                conversation: action.payload.conversation
            }
        },
        dismissAddConversationToFolder (state) {
            state.data = {
                ...state.data,
                isOpenAddConversationToFolder: false,
                conversation: null
            }
        }
    },
    extraReducers: {}
});

export const { openAddConversationToFolder, dismissAddConversationToFolder } = addConversationToFolderSlice.actions;
export default addConversationToFolderSlice.reducer;