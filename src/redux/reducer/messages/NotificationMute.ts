import {createSlice} from "@reduxjs/toolkit";
import {ItemListConversation} from "typings/apis/messages/listConversation";

const initialState : {
        data: {
            isOpenNotificationMute: boolean,
            conversation: ItemListConversation|null,
            handleClose: () => void;
        }
    } = {
    data: {
        isOpenNotificationMute: false,
        conversation: null,
        handleClose: () => undefined
    }
};

const notificationMuteSlice = createSlice({
    name: 'notification-mute',
    initialState,
    reducers: {
        openNotificationMute (state, action) {
            state.data = {
                ...state.data,
                isOpenNotificationMute: true,
                conversation: action.payload.conversation,
                handleClose: action.payload.handleClose
            }
        },
        dismissNotificationMute (state) {
            state.data = {
                ...state.data,
                isOpenNotificationMute: false,
                conversation: null,
                handleClose: () => undefined
            }
        }
    },
    extraReducers: {}
});

export const { openNotificationMute, dismissNotificationMute } = notificationMuteSlice.actions;
export default notificationMuteSlice.reducer;