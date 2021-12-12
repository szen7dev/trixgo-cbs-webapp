import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    data: []
};

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        setMedias(state, action) {
            state.data = action.payload;
        },
        addMedia(state, action) {
            state.data = [action.payload, ...state.data];
        }
    },
    extraReducers: {}
});

export const { setMedias, addMedia } = mediaSlice.actions;
export default mediaSlice.reducer;