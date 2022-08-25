import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  data: {
    tabIndex: 1,
    tabActive: 2, // hiển thị data theo tab, 1 là phản hồi, 2 là chủ đề, 3 là file
    keywordForResponse: "",
    keywordForSubject: "",
    keywordForFile: "",
    showModalResult: false,

    queryResponse: {
      companyOfAuthorsID: [],
      authorsID: [],
      projectsID: [],
      official: 0,
    },

    querySubject: {
      companiesOfAssignee: [],
      assigneesID: [],
      isParent: "1",
      isActive: "1",
    },
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
    setKeywordForResponse(state, action) {
      state.data.keywordForResponse = action.payload;
    },
    setKeywordForSubject(state, action) {
      state.data.keywordForSubject = action.payload;
    },
    setKeywordForFile(state, action) {
      state.data.keywordForFile = action.payload;
    },
    setShowModalResult(state, action) {
      state.data.showModalResult = action.payload;
    },
    setQueryResponse(state, action) {
      state.data.queryResponse = action.payload;
    },
    setQuerySubject(state, action) {
      state.data.querySubject = action.payload;
    },
  },
});

export const {
  setTabIndex,
  setKeywordForSubject,
  setKeywordForResponse,
  setShowModalResult,
  setTabActive,
  setQueryResponse,
  setQuerySubject,
  setKeywordForFile
} = dashboardV2Slice.actions;
export default dashboardV2Slice.reducer;
