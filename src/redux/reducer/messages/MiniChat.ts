import {createSlice} from "@reduxjs/toolkit";
import {ItemListConversation} from "typings/apis/messages/listConversation";

const initialState : {
    data: {
        isNewChatboxVisible: boolean,
        isChatboxVisible: boolean,
        isListConversationVisible: boolean,
        conversation: ItemListConversation|null
    }
} = {
    data: {
        isNewChatboxVisible: false,
        isChatboxVisible: false,
        isListConversationVisible: false,
        conversation: null
    }
};

const miniChatSlice = createSlice({
    name: 'mini-chat',
    initialState,
    reducers: {
        openCreateNewChatMini (state) {
            state.data = {
                ...state.data,
                isNewChatboxVisible: true,
            }
        },
        openChatBox (state, action) {
            state.data = {
                ...state.data,
                isChatboxVisible: true,
                conversation: action.payload.conversation
            }
        },
        openListConversation (state) {
            state.data = {
                ...state.data,
                isListConversationVisible: true
            }
        },
        dismissCreateNewChatMini (state) {
            state.data = {
                ...state.data,
                isNewChatboxVisible: false,
            }
        },
        dismissChatBox (state) {
            state.data = {
                ...state.data,
                isChatboxVisible: false,
                conversation: null
            }
        },
        dismissListConversation (state) {
            state.data = {
                ...state.data,
                isListConversationVisible: false
            }
        }
    },
    extraReducers: {}
});

export const { openCreateNewChatMini, openChatBox, dismissCreateNewChatMini, dismissChatBox, dismissListConversation, openListConversation } = miniChatSlice.actions;
export default miniChatSlice.reducer;