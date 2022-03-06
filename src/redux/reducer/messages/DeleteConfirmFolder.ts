import {createSlice} from "@reduxjs/toolkit";

const initialState : {
        data: {
            isOpenDeleteConfirmFolder: boolean,
            folderId: string
        }
    } = {
    data: {
        isOpenDeleteConfirmFolder: false,
        folderId: ""
    }
};

const deleteConfirmFolderSlice = createSlice({
    name: 'delete-confirm-folder',
    initialState,
    reducers: {
        openDeleteConfirmFolder (state, action) {
            state.data = {
                ...state.data,
                isOpenDeleteConfirmFolder: true,
                folderId: action.payload.folderId
            }
        },
        dismissDeleteConfirmFolder (state) {
            state.data = {
                ...state.data,
                isOpenDeleteConfirmFolder: false,
                folderId: ""
            }
        }
    },
    extraReducers: {}
});

export const { openDeleteConfirmFolder, dismissDeleteConfirmFolder } = deleteConfirmFolderSlice.actions;
export default deleteConfirmFolderSlice.reducer;