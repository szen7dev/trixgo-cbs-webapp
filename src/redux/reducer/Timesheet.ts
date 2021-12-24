import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  data: {
    "123": [
      {
        collapsed: true,
        _id: "12",
        tt: "A",
        content: "Tổng hợp chi phí",
        done: false,
        totalHour: "30",
        amount: "7.500.000",
        childrens: [
          {
            _id: "121",
            tt: "1",
            content: "Triển khai công tác đánh giá nhân sụ thực hiện công việc",
            date: "25/12/2021",
            done: true,
            totalHour: "10",
            price: "250.000",
            amount: "2.5000.000",
            assignee: "1",
            description: "Xây dựng mẫu BoQ cho công tác preliminaries",
          },
          {
            _id: "122",
            tt: "2",
            content: "Triển khai công tác đánh giá nhân sụ thực hiện công việc",
            date: "25/12/2021",
            done: false,
            totalHour: "10",
            price: "250.000",
            amount: "2.5000.000",
            assignee: "1",
            description: "Xây dựng mẫu BoQ cho công tác preliminaries",
          },
          {
            _id: "123",
            tt: "3",
            content: "Triển khai công tác đánh giá nhân sụ thực hiện công việc",
            date: "25/12/2021",
            done: false,
            totalHour: "10",
            price: "250.000",
            amount: "2.5000.000",
            assignee: "1",
            description: "Xây dựng mẫu BoQ cho công tác preliminaries",
          },
        ],
      },
    ],
  },
};

const timesheetDetailSlice = createSlice({
  name: "timesheet-detail",
  initialState,
  reducers: {
    setTimesheetDetail(state, action) {
      state.data = {
        ...state.data,
        [action.payload._id]: action.payload.map((item: any) => {
          return {
            ...(item ?? {}),
            collapsed: true,
          };
        }),
      };
    },
    setMainRowCollapsed(state, action) {
      state.data = {
        ...state.data,
        [action.payload._id]: [
          ...state.data[action.payload._id].map((item: any) => {
            return {
              ...(item ?? {}),
              collapsed: action.payload.collapsed,
            };
          }),
        ],
      };
    },
    setChildRowCollapsed(state, action) {
      state.data = {
        ...state.data,
        [action.payload._id]: [
          ...state.data[action.payload._id].map((item: any) => {
            const index = state.data[action.payload._id].indexOf(item);
            if (index == action.payload.index) {
              return {
                ...(item ?? {}),
                collapsed: action.payload.collapsed,
              };
            }
            return {
              ...(item ?? {}),
            };
          }),
        ],
      };
    },
  },
  extraReducers: {},
});

export const { setTimesheetDetail, setMainRowCollapsed, setChildRowCollapsed } =
  timesheetDetailSlice.actions;
export default timesheetDetailSlice.reducer;
