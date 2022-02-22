import {createSlice} from "@reduxjs/toolkit";
import {PopupSendFilesContent} from "typings/app";

const initialState : {
    data: {
        isShowPopupSendFiles: boolean,
        popSendFilesContent: PopupSendFilesContent,
    }
} = {
    data: {
        isShowPopupSendFiles: false,
        popSendFilesContent: {
            files: [],
            sendType: "image",
            defaultSendType: "image",
            conversationID: "",
            handleSendFile: (message: any, useCompress = true) => undefined
        }
    }
};

const popUpSendFileAndImageSlice = createSlice({
    name: 'pop-up-send-file-image',
    initialState,
    reducers: {
        openPopupSendFiles (state, action) {
            state.data = {
                ...state.data,
                isShowPopupSendFiles: true,
                popSendFilesContent: {
                    ...state.data.popSendFilesContent,
                    ...action.payload
                },
            }
        },

        closePopupSendFiles (state) {
            state.data = {
                ...state.data,
                isShowPopupSendFiles: false,
                popSendFilesContent: {
                    files: [],
                    sendType: "image",
                    defaultSendType: "image",
                    conversationID: "",
                    handleSendFile: (message, useCompress= true) => undefined
                },
            }
        },

        setSendType (state, action) {
            state.data = {
                ...state.data,
                popSendFilesContent: {
                    ...state.data.popSendFilesContent,
                    sendType: action.payload
                }
            }
        }
    },
    extraReducers: {}
});

export const { openPopupSendFiles, closePopupSendFiles, setSendType} = popUpSendFileAndImageSlice.actions;
export default popUpSendFileAndImageSlice.reducer;