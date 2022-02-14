import {createSlice} from "@reduxjs/toolkit";

const initialState : {data: {isOpenCreatePoll: boolean, conversationId: string}} = {
    data: {
        isOpenCreatePoll: false,
        conversationId: ""
    }
};

const createPollSlice = createSlice({
    name: 'create-poll-message',
    initialState,
    reducers: {
        openCreatePoll (state, action) {
            state.data = {
                ...state.data,
                isOpenCreatePoll: true,
                conversationId: action.payload.conversationId
            }
        },
        dismissCreatePoll (state, action) {
            state.data = {
                ...state.data,
                isOpenCreatePoll: false,
                conversationId: ""
            }
        }
    },
    extraReducers: {}
});

export const { openCreatePoll, dismissCreatePoll } = createPollSlice.actions;
export default createPollSlice.reducer;