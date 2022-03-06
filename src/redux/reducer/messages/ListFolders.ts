import {createSlice} from "@reduxjs/toolkit";
import {FolderConversationItem} from "typings/apis/messages/listConversation";

const initialState : {
        data: {
            listFolders: {
                [key: string]: {
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
                }
            };
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
        listFolders: {},
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
            const newRecords : {
                [key: string]: FolderConversationItem
            } = {};
            listRecords.forEach((folder: FolderConversationItem) => {
                newRecords[folder._id] = folder;
            })
            state.data = {
                ...state.data,
                listFolders: {
                    ...state.data.listFolders,
                    ...newRecords
                },
                nextCursor,
                totalRecord,
                hasMoreData: nextCursor !== null && nextCursor !== "" && nextCursor !== undefined
            }
        },
        updateSingleFolder (state, action) {
            const {folderId, folderData} = action.payload
            state.data = {
                ...state.data,
                listFolders: {
                    ...state.data.listFolders,
                    [folderId]: folderData
                }
            }
        },
        addSingleFolder (state, action) {
            const {folderId, folderData} = action.payload
            state.data = {
                ...state.data,
                listFolders: {
                    [folderId]: folderData,
                    ...state.data.listFolders,
                },
                totalRecord: state.data.totalRecord++
            }
        },
        deleteSingleFolder (state, action) {
            const {folderId} = action.payload;
            const oldList = {...state.data.listFolders};
            delete oldList[folderId];
            state.data = {
                ...state.data,
                listFolders: {
                    ...oldList,
                },
                totalRecord: state.data.totalRecord--
            }
        },
        setCurrentSelectedFolders (state, action) {
            state.data = {
                ...state.data,
                currentSelectedFolders: action.payload.currentSelectedFolders
            }
        }
    },
    extraReducers: {}
});

export const { setListFolders, updateSingleFolder, addSingleFolder, deleteSingleFolder, setCurrentSelectedFolders } = listFoldersSlice.actions;
export default listFoldersSlice.reducer;