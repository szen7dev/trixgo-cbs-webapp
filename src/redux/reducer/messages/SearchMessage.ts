import {createSlice} from '@reduxjs/toolkit';
import {ItemMessage} from "typings/apis/messages/listMessage";

const initialState : {
    data: {
        listSearchMessage: {
            [key: string]: {
                [key: string] : ItemMessage
            }
        },
        totalRecordBack: {
            [key: string]: number;
        },
        totalRecordFront: {
            [key: string]: number;
        },
        nextCursor: {
            [key: string]: string;
        },
        prevCursor: {
            [key: string]: string;
        },
        hasMoreDataFront: {
            [key: string]: boolean
        },
        hasMoreDataBack: {
            [key: string]: boolean
        },
        isLoading: {
            [key:string] : boolean
        },
        inSearchMode: {
            [key:string] : boolean
        }
    }
} = {
    data: {
        listSearchMessage: {},
        totalRecordBack: {},
        totalRecordFront: {},
        nextCursor: {},
        prevCursor: {},
        hasMoreDataBack: {},
        hasMoreDataFront: {},
        isLoading: {},
        inSearchMode: {},
    }
};

const listSearchMessageSlice = createSlice({
    name: 'list-search-message',
    initialState,
    reducers: {
        setListSearchMessage(state, action) {
            const newMessageData:{[key: string]: ItemMessage} = {};
            (action.payload.messages??[]).forEach((message: ItemMessage) => {
                newMessageData[message._id] = message;
            });

            state.data = {
                ...state.data,
                inSearchMode: {
                    ...state.data.inSearchMode,
                    [action.payload.conversationId] : true
                },
                listSearchMessage: {
                    ...state.data.listSearchMessage,
                    [action.payload.conversationId] :
                        action.payload.isFreshData?
                            {
                                ...state.data.listSearchMessage[action.payload.conversationId],
                                ...newMessageData
                            }
                            :
                            Object.assign(newMessageData, state.data.listSearchMessage[action.payload.conversationId])
                }
            };
        },
        setTotalRecordFront(state, action) {
            state.data.totalRecordFront[action.payload.conversationId] = action.payload.data;
        },
        setTotalRecordBack(state, action) {
            state.data.totalRecordBack[action.payload.conversationId] = action.payload.data;
        },
        setNextSearchCursor(state, action) {
            state.data = {
                ...state.data,
                nextCursor : {
                    ...state.data.nextCursor,
                    [action.payload.conversationId]: action.payload.data
                },
                hasMoreDataFront : {
                    ...state.data.hasMoreDataFront,
                    [action.payload.conversationId]: action.payload.data !== null && action.payload.data !== undefined && action.payload.data !== ""
                },
            }
        },
        setPrevSearchCursor(state, action) {
            state.data = {
                ...state.data,
                prevCursor : {
                    ...state.data.prevCursor,
                    [action.payload.conversationId]: action.payload.data
                },
                hasMoreDataBack : {
                    ...state.data.hasMoreDataBack,
                    [action.payload.conversationId]: action.payload.data !== null && action.payload.data !== undefined && action.payload.data !== ""
                },
            }
        },
        setLoadingSearch(state, action) {
            state.data.isLoading[action.payload.conversationId] = action.payload.data
        },
        setInSearchMode (state, action) {
            state.data.inSearchMode[action.payload.conversationId] = action.payload.data
        },
        dismissSearchMode (state, action) {
            state.data = {
                ...state.data,
                listSearchMessage: {
                    ...state.data.listSearchMessage,
                    [action.payload.conversationId]: {}
                },
                totalRecordFront: {
                    ...state.data.totalRecordFront,
                    [action.payload.conversationId]: 0
                },
                totalRecordBack: {
                    ...state.data.totalRecordFront,
                    [action.payload.conversationId]: 0
                },
                nextCursor: {
                    ...state.data.nextCursor,
                    [action.payload.conversationId]: null
                },
                prevCursor: {
                    ...state.data.prevCursor,
                    [action.payload.conversationId]: null
                },
                hasMoreDataFront: {
                    ...state.data.hasMoreDataFront,
                    [action.payload.conversationId]: false
                },
                hasMoreDataBack: {
                    ...state.data.hasMoreDataBack,
                    [action.payload.conversationId]: false
                },
                isLoading: {
                    ...state.data.isLoading,
                    [action.payload.conversationId]: false
                },
                inSearchMode: {
                    ...state.data.inSearchMode,
                    [action.payload.conversationId]: false
                },
            }
        }
    },
    extraReducers: {}
});

export const {
    setListSearchMessage,
    setTotalRecordBack,
    setTotalRecordFront,
    setNextSearchCursor,
    setPrevSearchCursor,
    setLoadingSearch,
    setInSearchMode
} = listSearchMessageSlice.actions;
export default listSearchMessageSlice.reducer;