import {createSlice} from "@reduxjs/toolkit";

const initialState : {
        data: {
            isCreateUpdateFolder: boolean,
            folder: {
                _id: string
                includedConversations: string[],
                excludedConversations: string[],
                amountMissMessage: number,
                state: number,
                name: string
                author: string
                modifyAt: string
                createAt: string
                createdAt: string
                updatedAt: string
                __v: number
            }|null
        }
    } = {
    data: {
        isCreateUpdateFolder: false,
        folder: null
    }
};

const createUpdateFolderSlice = createSlice({
    name: 'create-update-folder',
    initialState,
    reducers: {
        openCreateUpdateFolder (state, action) {
            state.data = {
                ...state.data,
                isCreateUpdateFolder: true,
                folder: action.payload.folder??null
            }
        },
        dismissCreateUpdateFolder (state, action) {
            state.data = {
                ...state.data,
                isCreateUpdateFolder: false,
                folder: null
            }
        }
    },
    extraReducers: {}
});

export const { openCreateUpdateFolder, dismissCreateUpdateFolder } = createUpdateFolderSlice.actions;
export default createUpdateFolderSlice.reducer;