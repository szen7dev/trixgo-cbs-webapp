import {createSlice} from '@reduxjs/toolkit';
import {ItemMessage} from "typings/apis/messages/listMessage";
import {ItemMembersOfConversation} from "typings/apis/messages/listConversation";

const initialState : {
    data: {
        listMessage: {
            [key: string]: {
                [key: string] : ItemMessage
            }
        },
        listFakeMessage: {
            [key: string]: {
                [key: string] : ItemMessage
            }
        },
        totalRecord: {
            [key: string]: number;
        },
        nextCursor: {
            [key: string]: string;
        },
        hasMoreData: {
            [key: string]: boolean
        },
        isLoading: {
            [key:string] : boolean
        },
        listMembers: {
            [key:string] : ItemMembersOfConversation[];
        }
    }
} = {
    data: {
        listMessage: {},
        listFakeMessage: {},
        totalRecord: {},
        nextCursor: {},
        hasMoreData: {},
        isLoading: {},
        listMembers: {}
    }
};

const listMessageSlice = createSlice({
    name: 'list-message',
    initialState,
    reducers: {
        setListMessage(state, action) {
            const newMessageData:{[key: string]: ItemMessage} = {};
            (action.payload.messages??[]).forEach((message: ItemMessage) => {
                newMessageData[message._id] = message;
            });

            state.data = {
                ...state.data,
                listMessage: {
                    ...state.data.listMessage,
                    [action.payload.conversationId] :
                        action.payload.isFreshData?
                        {
                            ...state.data.listMessage[action.payload.conversationId],
                            ...newMessageData
                        }
                        :
                        Object.assign(newMessageData, state.data.listMessage[action.payload.conversationId])
                }
            };
        },
        setTotalRecord(state, action) {
            state.data.totalRecord[action.payload.conversationId] = action.payload.data;
        },
        setNextCursor(state, action) {
            state.data = {
                ...state.data,
                nextCursor : {
                    ...state.data.nextCursor,
                    [action.payload.conversationId]: action.payload.data
                },
                hasMoreData : {
                    ...state.data.hasMoreData,
                    [action.payload.conversationId]: action.payload.data !== null && action.payload.data !== undefined && action.payload.data !== ""
                },
            }
        },
        setLoading(state, action) {
            state.data.isLoading[action.payload.conversationId] = action.payload.data
        },
        appendMessageToConversation(state, action) {
            state.data = {
                ...state.data,
                listMessage: {
                    ...state.data.listMessage,
                    [action.payload.conversationId]: {
                        ...state.data.listMessage[action.payload.conversationId],
                        [action.payload.messageId] : action.payload.messageData
                    }
                },
                totalRecord: {
                    ...state.data.totalRecord,
                    [action.payload.conversationId]: state.data.totalRecord[action.payload.conversationId]+1
                }
            }
        },
        appendFakeMessageToConversation(state, action) {
            state.data = {
                ...state.data,
                listFakeMessage: {
                    ...state.data.listFakeMessage,
                    [action.payload.conversationId]: {
                        ...state.data.listFakeMessage[action.payload.conversationId],
                        [action.payload.messageId] : action.payload.messageData
                    }
                },
            }
        },
        updateNewMessageToConversation(state, action) {
            const newMessage = {...state.data.listMessage[action.payload.conversationId]};
            newMessage[action.payload.newMessageId] = action.payload.messageData;

            const fakeMessage = {...state.data.listFakeMessage[action.payload.conversationId]};
            delete fakeMessage[action.payload.oldMessageId];

            state.data = {
                ...state.data,
                listMessage: {
                    ...state.data.listMessage,
                    [action.payload.conversationId]: newMessage
                },
                listFakeMessage: {
                    ...state.data.listMessage,
                    [action.payload.conversationId]: fakeMessage
                }
            }
        },
        updateFileProgressOnMessage(state, action) {
            state.data = {
                ...state.data,
                listMessage: {
                    ...state.data.listMessage,
                    [action.payload.conversationId]: {
                        ...state.data.listMessage[action.payload.conversationId],
                        [action.payload.messageId]: action.payload.messageData
                    }
                }
            }
        },
        setListMembers(state, action) {
            state.data = {
                ...state.data,
                listMembers: {
                    ...state.data.listMembers,
                    [action.payload.conversationId] : action.payload.data
                }
            }
        }
    },
    extraReducers: {}
});

export const { setListMessage, setTotalRecord, setNextCursor, setLoading, appendMessageToConversation, appendFakeMessageToConversation, updateNewMessageToConversation, updateFileProgressOnMessage, setListMembers } = listMessageSlice.actions;
export default listMessageSlice.reducer;