import {createSlice} from '@reduxjs/toolkit';
import {ItemListConversation} from "typings/apis/messages/listConversation";
import moment from "moment";

const initialState : {data: {listConversation: {[key: string]: ItemListConversation}, totalRecord: number, nextCursor: string, hasMoreData: boolean, isLoading: boolean}} = {
    data: {
        listConversation: {},
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
        setListConversation(state, action) {
            const newConversationData = {...state.data.listConversation};
            (action.payload??[]).forEach((conversation: ItemListConversation) => {
                const isSavedMessages = conversation.members.length === 1&&conversation.authors[0]===conversation.members[0]["_id"];

                newConversationData[conversation._id] = {
                    ...conversation,
                    position: moment(conversation?.lastMessage?.updatedAt??conversation.updatedAt).toDate().getTime(),
                    isSaved: isSavedMessages,
                    isPin: isSavedMessages?true: conversation.isPin
                }
            });

            state.data = {
                ...state.data,
                listConversation: newConversationData
            };
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
        }
    },
    extraReducers: {}
});

export const { setListConversation, setTotalRecord, setNextCursor, setLoading } = listConversationSlice.actions;
export default listConversationSlice.reducer;