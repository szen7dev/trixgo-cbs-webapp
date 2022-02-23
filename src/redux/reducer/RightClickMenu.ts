import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {
        isRightClickMenuOpen: false,
        rightClickMenuContent: {
            content: null,
            x: 0,
            y: 0
        },
    }
};

const rightClickSlice = createSlice({
    name: 'right-click-menu',
    initialState,
    reducers: {
        openRightClick(state, action) {
            state.data = {
                ...state.data,
                isRightClickMenuOpen: true,
                rightClickMenuContent: action.payload,
            };
        },
        closeRightClick(state) {
            state.data = {
                ...state.data,
                isRightClickMenuOpen: false,
                rightClickMenuContent: {
                    content: null,
                    x: 0,
                    y: 0
                }
            }
        }
    }
});

export const { openRightClick , closeRightClick } = rightClickSlice.actions;
export default rightClickSlice.reducer;