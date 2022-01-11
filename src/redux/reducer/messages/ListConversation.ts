import {createSlice} from '@reduxjs/toolkit';
import {ItemListConversation} from "typings/apis/messages/listConversation";

const initialState : {data: {listConversationPined: {[key: string]: ItemListConversation}, listConversationUnPin: {[key: string]: ItemListConversation}, totalRecord: number, nextCursor: string, hasMoreData: boolean, isLoading: boolean}} = {
    data: {
        listConversationPined: {},
        listConversationUnPin: {},
        totalRecord: 0,
        nextCursor: "",
        hasMoreData: true,
        isLoading: false,
    }
};

const listConversationSlice = createSlice({
    name: 'list-conversation',
    initialState,
    reducers: {
        setListConversationUnpin(state, action) {
            const newConversationData = {...state.data.listConversationUnPin};
            action.payload.forEach((conversation: ItemListConversation) => {
                newConversationData[conversation._id] = conversation
            });

            state.data = {
                ...state.data,
                listConversationUnPin: newConversationData
            };
        },
        setListConversationPined(state, action) {
            const newConversationPinnedData = {...state.data.listConversationPined};
            action.payload.forEach((conversation: ItemListConversation) => {
                newConversationPinnedData[conversation._id] = {
                    ...conversation,
                    pinned: true
                }
            });

            state.data = {
                ...state.data,
                listConversationPined: newConversationPinnedData
            };
        },
        setTotalRecord(state, action) {
            state.data.totalRecord = action.payload;
        },
        setNextCursor(state, action) {
            state.data = {
                ...state.data,
                nextCursor : action.payload,
                hasMoreData: action.payload !== null && action.payload !== undefined && action.payload !== ""
            }
        },
        setLoading(state, action) {
            state.data.isLoading = action.payload
        }
    },
    extraReducers: {}
});

export const { setListConversationUnpin, setListConversationPined, setTotalRecord, setNextCursor, setLoading } = listConversationSlice.actions;
export default listConversationSlice.reducer;