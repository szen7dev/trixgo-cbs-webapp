import {createSlice} from '@reduxjs/toolkit';
import {ItemMessage} from "typings/apis/messages/listMessage";
import {ItemMediaOfConversation, ItemMembersOfConversation} from "typings/apis/messages/listConversation";

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
        },
        listImages: {
            [key: string] : ItemMediaOfConversation[]
        },
        listLinks: {
            [key: string] : any[]
        },
        listFiles: {
            [key: string] : any[]
        },
        replyMessage: {
            [key: string] : ItemMessage;
        },
        listMessagePinned: {
            [key: string]: ItemMessage[]
        },
        listSelectedMessage: {
            [key: string]: {
                [key: string] : ItemMessage
            }
        },
        selectedState: {
            [key: string]: boolean
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
        listMembers: {},
        listImages: {},
        listFiles: {},
        listLinks: {},
        replyMessage: {},
        listMessagePinned: {},
        listSelectedMessage: {},
        selectedState: {}
    }
};

const listMessageSlice = createSlice({
    name: 'list-message',
    initialState,
    reducers: {
        setListMessage(state, action) {
            const newMessageData:{[key: string]: ItemMessage} = {};
            (action.payload.data.listRecords??[]).forEach((message: ItemMessage) => {
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
                },
                nextCursor: {
                    ...state.data.nextCursor,
                    [action.payload.conversationId]: action.payload.data.nextCursor
                },
                hasMoreData : {
                    ...state.data.hasMoreData,
                    [action.payload.conversationId]: action.payload.data.nextCursor !== null && action.payload.data.nextCursor !== undefined && action.payload.data.nextCursor !== ""
                },
            };
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
                        [action.payload.messageId] : {
                            ...action.payload.messageData,
                            isFake: true
                        }
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
                    ...state.data.listFakeMessage,
                    [action.payload.conversationId]: fakeMessage
                }
            }
        },
        updateFileProgressOnMessage(state, action) {
            state.data = {
                ...state.data,
                listFakeMessage: {
                    ...state.data.listFakeMessage,
                    [action.payload.conversationId]: {
                        ...state.data.listFakeMessage[action.payload.conversationId],
                        [action.payload.messageId]: {
                            ...state.data.listFakeMessage[action.payload.conversationId][action.payload.messageId],
                            fileProgress: {
                                ...state.data.listFakeMessage[action.payload.conversationId][action.payload.messageId].fileProgress,
                                [action.payload.fileId]: action.payload.progress
                            }
                        }
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
        },
        setListMedias(state, action) {
            switch (action.payload.type) {
                case 1:
                    state.data = {
                        ...state.data,
                        listImages: {
                            ...state.data.listImages,
                            [action.payload.conversationId] : action.payload.data
                        }
                    }
                    break;
                case 2:
                    state.data = {
                        ...state.data,
                        listFiles: {
                            ...state.data.listFiles,
                            [action.payload.conversationId] : action.payload.data
                        }
                    }
                    break;
                case 3:
                    state.data = {
                        ...state.data,
                        listLinks: {
                            ...state.data.listLinks,
                            [action.payload.conversationId] : action.payload.data
                        }
                    }
                    break;
            }
        },
        updateReminderData (state, action) {
            state.data  = {
                ...state.data,
                listMessage: {
                    ...state.data.listMessage,
                    [action.payload.conversationId]: {
                        ...state.data.listMessage[action.payload.conversationId],
                        [action.payload.messageId]: {
                            ...state.data.listMessage[action.payload.conversationId][action.payload.messageId],
                            reminder: action.payload.reminderData
                        }
                    }
                }
            }
        },
        setReplyMessage (state, action) {
            state.data = {
                ...state.data,
                replyMessage: {
                    ...state.data.replyMessage,
                    [action.payload.conversationId] : action.payload.messageData
                }
            }
        },
        removeReplyMessage (state, action) {
            const newReplyMessage = {...state.data.replyMessage};
            delete newReplyMessage[action.payload.conversationId];

            state.data = {
                ...state.data,
                replyMessage: newReplyMessage
            }
        },
        setShareMessage (state, action) {
            const newMessage = {...state.data.listMessage};
            action.payload.messagesShare.forEach((message: ItemMessage) => {
                newMessage[message.conversation][message._id] = message;
            });

            state.data = {
                ...state.data,
                listMessage: {
                    ...state.data.listMessage,
                    ...newMessage
                }
            }
        },
        setPinnedMessage (state, action) {
            state.data = {
                ...state.data,
                listMessagePinned: {
                    ...state.data.listMessagePinned,
                    [action.payload.conversationId]: action.payload.listMessagesPinned
                }
            }
        },
        setSelectedMessages (state, action) {
            const newMessageSelected : {[key: string] : ItemMessage} = {};
            action.payload.selectedMessages.forEach((message: ItemMessage) => {
                newMessageSelected[message._id] = message;
            })
            state.data = {
                ...state.data,
                listSelectedMessage: {
                    ...state.data.listSelectedMessage,
                    [action.payload.conversationId]: {
                        ...state.data.listSelectedMessage[action.payload.conversationId],
                        ...newMessageSelected
                    }
                },
                selectedState: {
                    ...state.data.selectedState,
                    [action.payload.conversationId]: true
                }
            }
        },
        removeAllSelectedMessage (state, action) {
            state.data = {
                ...state.data,
                listSelectedMessage: {
                    ...state.data.listSelectedMessage,
                    [action.payload.conversationId]: {}
                },
                selectedState: {
                    ...state.data.selectedState,
                    [action.payload.conversationId]: false
                }
            }
        },
        removeSelectedMessage (state, action) {
            const newSelectedMessage = {...state.data.listSelectedMessage[action.payload.conversationId]};
            delete newSelectedMessage[action.payload.messageId];

            state.data = {
                ...state.data,
                listSelectedMessage: {
                    ...state.data.listSelectedMessage,
                    [action.payload.conversationId]: newSelectedMessage
                },
                selectedState: {
                    ...state.data.selectedState,
                    [action.payload.conversationId]: Object.keys(newSelectedMessage).length > 0
                }
            }
        },
        setSelectedStateOn (state, action) {
            state.data = {
                ...state.data,
                selectedState: {
                    ...state.data.selectedState,
                    [action.payload.conversationId]: true
                }
            }
        },
        deleteMessageInConversations (state, action) {
            const newMessage = {...state.data.listMessage[action.payload.conversationId]};
            action.payload.messageData.forEach((item: ItemMessage) => {
                newMessage[item._id] = {
                    ...newMessage[item._id],
                    usersDelete: item.usersDelete
                };
            });
            state.data = {
                ...state.data,
                listMessage: {
                    ...state.data.listMessage,
                    [action.payload.conversationId]: newMessage
                },
            }
        },

        revokeMessageInConversation (state, action) {
            const newMessage = {...state.data.listMessage};
            (action.payload.messages??[]).forEach((item: ItemMessage) => {
                delete newMessage[item.conversation][item._id]
            });

            state.data = {
                ...state.data,
                listMessage: {
                    ...state.data.listMessage,
                    ...newMessage
                },
            }
        },

        updateSeenMessage (state, action) {
            const newMessage = {...state.data.listMessage[action.payload.conversationId]};
            action.payload.messsagesId.forEach((messageId: string) => {
                const usersSeen = newMessage[messageId].usersSeen??[];
                const newUsersSeen = usersSeen;
                usersSeen.forEach((user: string|{_id: string; bizfullname: string; fullname: string; image: string}) => {
                    if (typeof user === "string") {
                        newUsersSeen.push(action.payload.infoUserSeen._id);
                    } else {
                        newUsersSeen.push(action.payload.infoUserSeen)
                    }
                })
                newMessage[messageId] = {
                    ...newMessage[messageId],
                    usersSeen: newUsersSeen
                }
            })
            state.data = {
                ...state.data,
                listMessage: {
                    ...state.data.listMessage,
                    [action.payload.conversationId] : {
                        ...newMessage
                    }
                }
            }
        }
    },
    extraReducers: {}
});

export const {
    setListMessage,
    setLoading,
    appendMessageToConversation,
    appendFakeMessageToConversation,
    updateNewMessageToConversation,
    updateFileProgressOnMessage,
    setListMembers,
    setListMedias,
    updateReminderData,
    setReplyMessage,
    removeReplyMessage,
    setShareMessage,
    setPinnedMessage,
    setSelectedMessages,
    removeSelectedMessage,
    removeAllSelectedMessage,
    setSelectedStateOn,
    deleteMessageInConversations,
    revokeMessageInConversation,
    updateSeenMessage
} = listMessageSlice.actions;
export default listMessageSlice.reducer;