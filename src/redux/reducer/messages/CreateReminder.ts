import {createSlice} from "@reduxjs/toolkit";

const initialState : {data: {isOpenCreateReminder: boolean, conversationId: string}} = {
    data: {
        isOpenCreateReminder: false,
        conversationId: ""
    }
};

const createReminderSlice = createSlice({
    name: 'create-reminder-message',
    initialState,
    reducers: {
        openCreateReminder (state, action) {
            state.data = {
                ...state.data,
                isOpenCreateReminder: true,
                conversationId: action.payload.conversationId
            }
        },
        dismissCreateReminder (state, action) {
            state.data = {
                ...state.data,
                isOpenCreateReminder: false,
                conversationId: ""
            }
        }
    },
    extraReducers: {}
});

export const { openCreateReminder, dismissCreateReminder } = createReminderSlice.actions;
export default createReminderSlice.reducer;