import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {
        isDeleteConfirmOpen: false,
        deleteConfirmContent: {
            title: "Bạn có muốn xóa không?",
            message: "Dữ liệu của bạn sẽ bị xóa vĩnh viễn và bạn không thể khôi phục lại dữ liệu này",
            deleteAction: () => undefined
        }
    }
};

const deleteConfirmSlice = createSlice({
    name: 'delete-confirm',
    initialState,
    reducers: {
        openDeleteConfirmAction(state, action) {
            state.data = {
                ...state.data,
                isDeleteConfirmOpen: true,
                deleteConfirmContent: {
                    ...state.data.deleteConfirmContent,
                    ...action.payload
                },
            }
        },
        closeDeleteConfirmAction(state) {
            state.data = {
                ...state.data,
                isDeleteConfirmOpen: false,
                deleteConfirmContent: {
                    title: "Bạn có muốn xóa không?",
                    message: "Dữ liệu của bạn sẽ bị xóa vĩnh viễn và bạn không thể khôi phục lại dữ liệu này",
                    deleteAction: () => undefined
                }
            }
        }
    }
});

export const { openDeleteConfirmAction , closeDeleteConfirmAction } = deleteConfirmSlice.actions;
export default deleteConfirmSlice.reducer;