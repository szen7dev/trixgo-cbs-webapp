import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    tabIndex: 1,
    tabActive: 2, // hiển thị data theo tab, 1 là phản hồi, 2 là chủ đề, 3 là file
    keywordForSubject: "",
    showModalResult: false,
  },
};

const dashboardV2Slice = createSlice({
  name: "dashboard-v2-slice",
  initialState,
  reducers: {
    setTabIndex(state, action) {
      state.data.tabIndex = action.payload;
    },
    setTabActive(state, action) {
      state.data.tabActive = action.payload;
    },
    setKeywordForSubject(state, action) {
      state.data.keywordForSubject = action.payload;
    },
    setShowModalResult(state, action) {
      state.data.showModalResult = action.payload;
    },
  },
});

export const {
  setTabIndex,
  setKeywordForSubject,
  setShowModalResult,
  setTabActive,
} = dashboardV2Slice.actions;
export default dashboardV2Slice.reducer;
