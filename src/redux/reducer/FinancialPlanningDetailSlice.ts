import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
    data: {
        "123": [
            {
                collapsed: true,
                _id: "12",
                tt: "A1",
                content: "DÒNG TIỀN THU A1",
                duKienThu: "300.000.000.000",
                thucTheThu: "300.000.000.000",
                duKienChi: "300.000.000.000",
                thucTeChi: "300.000.000.000",
                childrens: [
                    {
                        _id: "121",
                        tt: "1",
                        content: "Thu phí Trixgo công ty DDH Hoàng Mai, Hà Nội",
                        ngayDuKien: "25/12/2021",
                        duKienThu: "300.000.000.000",
                        thucTheThu: "300.000.000.000",
                        duKienChi: "300.000.000.000",
                        thucTeChi: "300.000.000.000",
                        ngayThucTe: "25/12/2021",
                        hopDong: "quangtt",
                        ghiChu: "Xây dựng mẫu BoQ cho công tác preliminaries"
                    },
                    {
                        _id: "122",
                        tt: "2",
                        content: "Thu phí Trixgo công ty DDH Hoàng Mai, Hà Nội",
                        ngayDuKien: "25/12/2021",
                        duKienThu: "300.000.000.000",
                        thucTheThu: "300.000.000.000",
                        duKienChi: "300.000.000.000",
                        thucTeChi: "300.000.000.000",
                        ngayThucTe: "25/12/2021",
                        hopDong: "quangtt",
                        ghiChu: "Xây dựng mẫu BoQ cho công tác preliminaries"
                    },
                    {
                        _id: "123",
                        tt: "3",
                        content: "Thu phí Trixgo công ty DDH Hoàng Mai, Hà Nội",
                        ngayDuKien: "25/12/2021",
                        duKienThu: "300.000.000.000",
                        thucTheThu: "300.000.000.000",
                        duKienChi: "300.000.000.000",
                        thucTeChi: "300.000.000.000",
                        ngayThucTe: "25/12/2021",
                        hopDong: "quangtt",
                        ghiChu: "Xây dựng mẫu BoQ cho công tác preliminaries"
                    }
                ]
            }
        ]
    }
};

const financialPlanningDetailSlice = createSlice({
    name: 'financial-detail',
    initialState,
    reducers: {
        setFinancialPlanningDetail(state, action) {
            state.data = {
                ...state.data,
                [action.payload._id]: action.payload.map((item: any) => {
                    return {
                        ...item??{},
                        collapsed: true
                    }
                })
            };
        },
        setMainRowCollapsed(state, action) {
            state.data = {
                ...state.data,
                [action.payload._id]: [
                    ...state.data[action.payload._id].map((item: any) => {
                        return {
                            ...item??{},
                            collapsed: action.payload.collapsed
                        }
                    })
                ]
            };
        },

    },
    extraReducers: {}
});

export const { setFinancialPlanningDetail , setMainRowCollapsed } = financialPlanningDetailSlice.actions;
export default financialPlanningDetailSlice.reducer;
