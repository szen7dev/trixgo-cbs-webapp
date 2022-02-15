import {createSlice} from "@reduxjs/toolkit";

const initialState : {data: {isOpenDetailNPS: boolean, messageId: string}} = {
    data: {
        isOpenDetailNPS: false,
        messageId: ""
    }
};

const detailNPSMessageSlice = createSlice({
    name: 'detail-nps-message',
    initialState,
    reducers: {
        openDetailNPSMessage (state, action) {
            state.data = {
                ...state.data,
                isOpenDetailNPS: true,
                messageId: action.payload.messageId
            }
        },
        dismissDetailNPSMessage (state, action) {
            state.data = {
                ...state.data,
                isOpenDetailNPS: false,
                messageId: ""
            }
        }
    },
    extraReducers: {}
});

export const { openDetailNPSMessage, dismissDetailNPSMessage } = detailNPSMessageSlice.actions;
export default detailNPSMessageSlice.reducer;