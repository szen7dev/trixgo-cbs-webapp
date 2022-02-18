import {createSlice} from "@reduxjs/toolkit";

const initialState : {
    data: {
        isNewChatboxVisible: boolean,
        isChatboxVisible: boolean,
        conversationId: string
    }
} = {
    data: {
        isNewChatboxVisible: false,
        isChatboxVisible: false,
        conversationId: ""
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
                conversationId: action.payload.conversationId
            }
        },
        dismissCreateNewChatMini (state, action) {
            state.data = {
                ...state.data,
                isNewChatboxVisible: false,
            }
        },
        dismissChatBox (state, action) {
            state.data = {
                ...state.data,
                isChatboxVisible: false,
                conversationId: ""
            }
        }
    },
    extraReducers: {}
});

export const { openCreateNewChatMini, openChatBox, dismissCreateNewChatMini, dismissChatBox } = miniChatSlice.actions;
export default miniChatSlice.reducer;