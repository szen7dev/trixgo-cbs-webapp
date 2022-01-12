import {createSlice} from '@reduxjs/toolkit';
import {ItemMessage} from "typings/apis/messages/listMessage";

const initialState : {
    data: {
        listMessage: {
            [key: string]: {
                [key: string] : ItemMessage
            }
        },
        totalRecord: number,
        nextCursor: string,
        hasMoreData: boolean,
        isLoading: boolean
    }
} = {
    data: {
        listMessage: {},
        totalRecord: 0,
        nextCursor: "",
        hasMoreData: true,
        isLoading: false,
    }
};

const listMessageSlice = createSlice({
    name: 'list-message',
    initialState,
    reducers: {
        setListMessage(state, action) {
            const newMessageData = {...state.data.listMessage};
            (action.payload.messages??[]).forEach((message: ItemMessage) => {
                if (!Object.prototype.hasOwnProperty.call(newMessageData,action.payload.conversationId)) {
                    newMessageData[action.payload.conversationId] = {}
                }
                newMessageData[action.payload.conversationId][message._id] = message;
            });

            state.data = {
                ...state.data,
                listMessage: {
                    ...state.data.listMessage,
                    ...newMessageData
                }
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

export const { setListMessage, setTotalRecord, setNextCursor, setLoading } = listMessageSlice.actions;
export default listMessageSlice.reducer;