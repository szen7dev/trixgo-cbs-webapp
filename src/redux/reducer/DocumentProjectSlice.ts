import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    data: {
        keywordInput: "",
        filterDropdown: {
            fromDate: "",
            toDate: "",
            datahubContactsID: [],
            types: [],
            directions: [],
            contractsID: [],
            storagesID: [],
        }
    },
};

const documentProjectSlice = createSlice({
    name: "document-project-slice",
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
        },
        resetAllFilterAndKeyword (state, action) {
            state.data = {
                keywordInput: "",
                filterDropdown: {
                    fromDate: "",
                    toDate: "",
                    datahubContactsID: [],
                    departmentsID: [],
                    types: [],
                    directions: [],
                    contractsID: [],
                    storagesID: [],
                }
            }
        }
    },
});

export const {
    setFilterDropdown,
    setKeyword,
    resetAllFilterAndKeyword
} = documentProjectSlice.actions;
export default documentProjectSlice.reducer;
