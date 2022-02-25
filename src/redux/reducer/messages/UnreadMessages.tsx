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
        },
        pushMoreUnreadMessage(state, action) {
            state.data = {
                ...state.data,
                unreadMessages: {
                    ...state.data.unreadMessages,
                    [action.payload.conversationId]: [
                        ...state.data.unreadMessages[action.payload.conversationId]??[],
                        ...action.payload.messagesId
                    ]
                }
            }
        }
    },
    extraReducers: {}
});

export const { setUnreadMessage, pushMoreUnreadMessage } = unreadMessagesSlice.actions;
export default unreadMessagesSlice.reducer;