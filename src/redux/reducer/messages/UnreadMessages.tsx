import {createSlice} from "@reduxjs/toolkit";

const initialState : {
    data: {
        unreadMessages: {
            [key: string]: string[]
        }
    }
} = {
    data: {
        unreadMessages: {}
    }
};

const unreadMessagesSlice = createSlice({
    name: 'unread-messages',
    initialState,
    reducers: {
        setUnreadMessage(state, action) {
            state.data = {
                ...state.data,
                unreadMessages: {
                    ...state.data.unreadMessages,
                    [action.payload.conversationId]: action.payload.unreadMessages
                }
            }
        }
    },
    extraReducers: {}
});

export const { setUnreadMessage } = unreadMessagesSlice.actions;
export default unreadMessagesSlice.reducer;