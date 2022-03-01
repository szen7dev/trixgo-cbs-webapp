import {createSlice} from "@reduxjs/toolkit";

const initialState : {
        data: {
            listFolders: {
                _id: string
                includedConversations: string[],
                excludedConversations: string[],
                amountMissMessage: number,
                state: number,
                name: string
                author: string
                modifyAt: string
                createAt: string
                createdAt: string
                updatedAt: string
                __v: number
            }[];
            totalRecord: number;
            nextCursor: string|null;
            hasMoreData: boolean;
            currentSelectedFolders: {
                _id: string
                includedConversations: string[],
                excludedConversations: string[],
                amountMissMessage: number,
                state: number,
                name: string
                author: string
                modifyAt: string
                createAt: string
                createdAt: string
                updatedAt: string
                __v: number
            }|null
        }
    } = {
    data: {
        listFolders: [],
        totalRecord: 0,
        nextCursor: null,
        hasMoreData: false,
        currentSelectedFolders: null
    }
};

const listFoldersSlice = createSlice({
    name: 'list-folders',
    initialState,
    reducers: {
        setListFolders (state, action) {
            const {listRecords, nextCursor, totalRecord} = action.payload
            state.data = {
                ...state.data,
                listFolders: state.data.listFolders.concat(listRecords),
                nextCursor,
                totalRecord,
                hasMoreData: nextCursor !== null && nextCursor !== "" && nextCursor !== undefined
            }
        }
    },
    extraReducers: {}
});

export const { setListFolders } = listFoldersSlice.actions;
export default listFoldersSlice.reducer;