import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {}
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.data = {};
        },
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;