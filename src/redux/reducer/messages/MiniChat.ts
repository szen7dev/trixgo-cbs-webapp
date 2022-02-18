import {createSlice} from "@reduxjs/toolkit";
import {ItemListConversation} from "typings/apis/messages/listConversation";

const initialState : {
    data: {
        isNewChatboxVisible: boolean,
        isChatboxVisible: boolean,
        conversation: ItemListConversation|null
    }
} = {
    data: {
        isNewChatboxVisible: false,
        isChatboxVisible: false,
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
        dismissCreateNewChatMini (state, action) {
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
        }
    },
    extraReducers: {}
});

export const { openCreateNewChatMini, openChatBox, dismissCreateNewChatMini, dismissChatBox } = miniChatSlice.actions;
export default miniChatSlice.reducer;