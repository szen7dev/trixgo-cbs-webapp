import { createSlice } from '@reduxjs/toolkit';
import { MediaProps } from 'typings/social';

const initialState: any = {
    data: []
};

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        setMedias(state, action) {
            state.data = {
                ...state.data,
                [action.payload._id]: action.payload.map((item: any) => {
                    return {
                        ...item??{},
                    }
                })
            };
        },
        addMedia(state, action) {
            state.data = [action.payload, ...state.data];
        },
        removeMedia(state, action) {
            state.data.filter((media: MediaProps) => media._id !== action.payload._id);
        }
    },
    extraReducers: {}
});

export const { setMedias, addMedia } = mediaSlice.actions;
export default mediaSlice.reducer;