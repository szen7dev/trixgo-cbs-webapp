import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: ''
};

const demoSlice = createSlice({
    name: 'demo',
    initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload;
        },
    }
});

export const { setData } = demoSlice.actions;
export default demoSlice.reducer;