import { createSlice } from "@reduxjs/toolkit";
import { PCM_STATUS_TASK } from "apis/localdb";

const initialState: any = {
  data: {
    tabIndex: 1,
    tabActive: 2, // hiển thị data theo tab, 1 là phản hồi, 2 là chủ đề, 3 là file
    keyword: "",
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
      authorsID: [],
      companiesOfAssignee: [],
      assigneesID: [],
      isActive: "1",
    },

    queryFile: {
      companyOfAuthorsID: [],
      authorsID: [],
    },
    
    pcmMine: {
      companiesOfAuthor: [],
      authorsID: [],
      projectsID: [],
      status: [
        {
          label: `${PCM_STATUS_TASK[0]?.text}`,
          id: 1,
        },
        {
          label: `${PCM_STATUS_TASK[1]?.text}`,
          id: 2,
        },
        {
          label: `${PCM_STATUS_TASK[3]?.text}`,
          id: 4,
        },
        {
          label: `${PCM_STATUS_TASK[4]?.text}`,
          id: 5,
        },
        {
          label: `${PCM_STATUS_TASK[5]?.text}`,
          id: 6,
        }
      ],
      subtypes: [],
      fromDate: "",
      toDate: "",
      priority: "0",
      isExpired: "0"
    }
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
    setKeywordForRedux(state, action) {
      state.data.keyword = action.payload;
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
    setQueryFile(state, action) {
      state.data.queryFile = action.payload;
    },
    setQueryPcmMine(state, action) {
      state.data.pcmMine = {
        ...state.data.pcmMine,
        [action.payload.key] :  action.payload.data
      };
    },
    resetFilterDashboard(state, action) {
      state.data = {
        ...initialState.data,
        tabIndex: state.data.tabIndex,
        tabActive: state.data.tabActive,
      }
    },
  },
});

export const {
  setTabIndex,
  setKeywordForRedux,
  setKeywordForSubject,
  setKeywordForResponse,
  setShowModalResult,
  setTabActive,
  setQueryResponse,
  setQuerySubject,
  setKeywordForFile,
  setQueryFile,
  resetFilterDashboard,
  setQueryPcmMine
} = dashboardV2Slice.actions;
export default dashboardV2Slice.reducer;
