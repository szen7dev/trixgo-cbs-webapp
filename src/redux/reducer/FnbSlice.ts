import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    data: {
        keywordHomeFnb: "",
        keyword: "",
        showModalResult: false,
        queryFnb: {
            fundasID: [],
            shiftTypes: [],
            salesChannels: [],
            fromDate: "",
            toDate: "",
            status: [],
            isMistake: 0
        },
    },
};

const fnbSlice = createSlice({
    name: "fnb-slice",
    initialState,
    reducers: {
        setKeywordHomeFnb(state, action) {
            state.data.keywordHomeFnb = action.payload;
        },
        setKeywordForFnb(state, action) {
            state.data.keyword = action.payload;
        },
        setShowModalFnbResult(state, action) {
            state.data.showModalResult = action.payload;
        },
        setQueryFnb(state, action) {
            state.data.queryFnb = action.payload;
        },
        resetQueryFnb(state) {
            state.data = initialState.data;
        },
    },
});

export const {
    setKeywordHomeFnb,
    setKeywordForFnb,
    setShowModalFnbResult,
    setQueryFnb,
    resetQueryFnb
} = fnbSlice.actions;
export default fnbSlice.reducer;
