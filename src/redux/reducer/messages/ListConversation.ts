import {createSlice} from '@reduxjs/toolkit';
import {ItemListConversation} from "typings/apis/messages/listConversation";
import moment from "moment";

const initialState : {data: {listConversation: {[key: string]: ItemListConversation}, totalRecord: number, nextCursor: string, hasMoreData: boolean, isLoading: boolean, amountMissMessage: number}} = {
    data: {
        listConversation: {},
        totalRecord: 0,
        nextCursor: "",
        hasMoreData: true,
        isLoading: false,
        amountMissMessage: 0
    }
};

const listConversationSlice = createSlice({
    name: 'list-conversation',
    initialState,
    reducers: {
        setListConversation(state, action) {
            const newConversationData = {...state.data.listConversation};
            (action.payload?.listRecords??[]).forEach((conversation: ItemListConversation) => {
                const isSavedMessages = conversation.members.length === 1;

                newConversationData[conversation._id] = {
                    ...conversation,
                    position: isSavedMessages ? 8640000000000000 : moment(conversation?.lastMessage?.createAt??conversation.modifyAt).toDate().getTime(),
                    isSaved: isSavedMessages,
                    isPin: isSavedMessages?true: conversation.isPin
                }
            });

            state.data = {
                ...state.data,
                listConversation: newConversationData,
                nextCursor: action.payload?.nextCursor,
                hasMoreData : action.payload?.nextCursor !== null && action.payload?.nextCursor !== undefined && action.payload?.nextCursor !== "",
                amountMissMessage: action.payload?.amountMissMessage
            };
        },
        setAmountMissMessage(state, action) {
            state.data.amountMissMessage = action.payload
        },
        // setListConversationPined(state, action) {
        //     const newConversationPinnedData = {...state.data.listConversationPined};
        //     (action.payload??[]).forEach((conversation: ItemListConversation) => {
        //         newConversationPinnedData[conversation._id] = {
        //             ...conversation,
        //             isPin: true
        //         }
        //     });
        //
        //     state.data = {
        //         ...state.data,
        //         listConversationPined: newConversationPinnedData
        //     };
        // },
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
        },
        updateSingleConversation(state, action) {
            const newConversationData = {...state.data.listConversation};
            const isSavedMessages = action.payload.conversationData.members.length === 1;
            action.payload.conversationData = {
                ...action.payload.conversationData,
                position: isSavedMessages ? 8640000000000000 : moment(action.payload.conversationData?.lastMessage?.createAt??action.payload.conversationData.modifyAt).toDate().getTime(),
                isSaved: isSavedMessages,
                isPin: isSavedMessages?true: action.payload.conversationData.isPin
            };

            newConversationData[action.payload.conversationData._id] = action.payload.conversationData;

            state.data = {
                ...state.data,
                listConversation: newConversationData
            };
        },
        updateFoldersToConversation (state, action) {
            const {conversationId, folders} = action.payload
            state.data = {
                ...state.data,
                listConversation: {
                    ...state.data.listConversation,
                    [conversationId]: {
                        ...state.data.listConversation[conversationId],
                        folders
                    }
                }
            }
        }
    },
    extraReducers: {}
});

export const { setListConversation, setTotalRecord, setNextCursor, setLoading, updateSingleConversation, setAmountMissMessage, updateFoldersToConversation } = listConversationSlice.actions;
export default listConversationSlice.reducer;