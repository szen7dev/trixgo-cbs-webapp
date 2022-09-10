import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    data: {
        keywordInput: "",
        filterDropdown: {
            fromDate: "",
            toDate: "",
            datahubContactsID: [],
            departmentsID: [],
            types: [],
            directions: [],
            contractsID: [],
        }
    },
};

const cmcsHomeSlice = createSlice({
    name: "cmcs-home-slice",
    initialState,
    reducers: {
        setFilterDropdown (state, action) {
            state.data = {
                ...state.data,
                filterDropdown: {
                    ...state.data.filterDropdown,
                    [action.payload.keyFilter] :  action.payload.dataFilter
                }
            }
        },
        setKeyword (state, action) {
            state.data = {
                ...state.data,
                keywordInput: action.payload
            }
        }
    },
});

export const {
    setFilterDropdown,
    setKeyword
} = cmcsHomeSlice.actions;
export default cmcsHomeSlice.reducer;
