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
            const {listRecords, totalRecordFront, totalRecordBack} = action.payload.data;
            const {isFirstInit, direction, conversationId} = action.payload;
            const newMessageData:{[key: string]: ItemMessage} = {};
            (listRecords??[]).forEach((message: ItemMessage) => {
                newMessageData[message._id] = message;
            });

            const nextCursor = {...state.data.nextCursor}
            const prevCursor = {...state.data.prevCursor}
            const hasMoreDataBack = {...state.data.hasMoreDataBack};
            const hasMoreDataFront = {...state.data.hasMoreDataFront};

            hasMoreDataBack[conversationId] = totalRecordBack > 0;
            hasMoreDataFront[conversationId] = totalRecordFront > 0;

            if (isFirstInit) {
                nextCursor[conversationId] = listRecords[listRecords.length - 1]._id;
                prevCursor[conversationId] = listRecords[0]._id;
            } else {
                if (direction === "front") {
                    nextCursor[conversationId] = listRecords[listRecords.length - 1]._id;
                } else {
                    prevCursor[conversationId] = listRecords[0]._id;
                }
            }

            state.data = {
                ...state.data,
                inSearchMode: {
                    ...state.data.inSearchMode,
                    [conversationId] : true
                },
                listSearchMessage: {
                    ...state.data.listSearchMessage,
                    [conversationId] :
                        (isFirstInit||direction==="front")?
                            {
                                ...state.data.listSearchMessage[conversationId],
                                ...newMessageData
                            }
                            :
                            Object.assign(newMessageData, state.data.listSearchMessage[conversationId])
                },
                totalRecordFront: {
                    ...state.data.totalRecordFront,
                    [action.payload.conversationId]: totalRecordFront
                },
                totalRecordBack: {
                    ...state.data.totalRecordBack,
                    [action.payload.conversationId]: totalRecordBack
                },
                nextCursor,
                prevCursor,
                hasMoreDataFront,
                hasMoreDataBack
            };
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
    setLoadingSearch,
    setInSearchMode,
    dismissSearchMode
} = listSearchMessageSlice.actions;
export default listSearchMessageSlice.reducer;