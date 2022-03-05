import {createSlice} from "@reduxjs/toolkit";
import {ItemListConversation} from "typings/apis/messages/listConversation";

const initialState : {data: {isOpenUsersSeenDetail: boolean, usersSeen: any[]}} = {
    data: {
        isOpenUsersSeenDetail: false,
        usersSeen: []
    }
};

const usersSeenDetailSlice = createSlice({
    name: 'users-seen-detail',
    initialState,
    reducers: {
        openUsersSeenDetail (state, action) {
            state.data = {
                ...state.data,
                isOpenUsersSeenDetail: true,
                usersSeen: action.payload.usersSeen
            }
        },
        dismissUsersSeenDetail (state) {
            state.data = {
                ...state.data,
                isOpenUsersSeenDetail: false,
                usersSeen: []
            }
        }
    },
    extraReducers: {}
});

export const { openUsersSeenDetail, dismissUsersSeenDetail } = usersSeenDetailSlice.actions;
export default usersSeenDetailSlice.reducer;