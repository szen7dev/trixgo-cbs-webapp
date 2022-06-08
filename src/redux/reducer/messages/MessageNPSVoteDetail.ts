import {createSlice} from "@reduxjs/toolkit";
import {ItemMessage} from "typings/apis/messages/listMessage";

const initialState : {data: {isOpenMessageNPSVoteDetail: boolean, message: ItemMessage|null}} = {
    data: {
        isOpenMessageNPSVoteDetail: false,
        message: null
    }
};

const usersMessageNPSVoteDetailSlice = createSlice({
    name: 'message-nps-vote-detail',
    initialState,
    reducers: {
        openMessageNPSDetail (state, action) {
            state.data = {
                ...state.data,
                isOpenMessageNPSVoteDetail: true,
                message: action.payload.message
            }
        },
        dismissMessageNPSDetail (state) {
            state.data = {
                ...state.data,
                isOpenMessageNPSVoteDetail: false,
                message: null
            }
        }
    },
    extraReducers: {}
});

export const { openMessageNPSDetail, dismissMessageNPSDetail } = usersMessageNPSVoteDetailSlice.actions;
export default usersMessageNPSVoteDetailSlice.reducer;