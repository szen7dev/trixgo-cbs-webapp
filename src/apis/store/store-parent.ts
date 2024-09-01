import API from "../repository";
import { STORE_URL } from '.';
import { convertObToUrl } from "utils";

import type {
    ListTimeSheetPayload,
    QueryTimeSheetParentResponse,
    InsertTimeSheetParentPayload,
    InsertTimeSheetParentResponse,
    UpdateTimeSheetParentPayload,
    UpdateTimeSheetParentResponse,
    DeleteTimeSheetParentPayload,
    DeleteTimeSheetParentResponse,
    QueryDetailTimeSheetParentResponse
} from 'typings/store';

export async function fetchListTimeSheet<T>(params?: ListTimeSheetPayload): Promise<T> {
    const { data } = await API.get(
        `${STORE_URL}`, {
        params: {
            populates: {
                "path": "assignee project work userCreate userUpdate",
                "select": "_id fullname name"
            },
            ...params,
        }
    }
    )
    return data;
}

export async function insertTimeSheet<P, R>(payload: P): Promise<R> {
    const { data } = await API.post(`${STORE_URL}`, payload);
    return data;
}

export async function updateTimeSheet<P, R>(payload: P): Promise<R> {
    const { data } = await API.put(`${STORE_URL}`, payload);
    return data;
}

export async function deleteTimeSheet<P, R>(payload: P): Promise<R> {
    const { data } = await API.delete(`${STORE_URL}`, {
        data: payload
    });
    return data;
}

interface StoreParentRepository {
    fetchListTimeSheet: (params: ListTimeSheetPayload) => Promise<QueryTimeSheetParentResponse>;
    fetchDetailTimeSheet: (params: ListTimeSheetPayload) => Promise<QueryDetailTimeSheetParentResponse>;
    insertTimeSheet: (payload: InsertTimeSheetParentPayload) => Promise<InsertTimeSheetParentResponse>;
    updateTimeSheet: (payload: UpdateTimeSheetParentPayload) => Promise<UpdateTimeSheetParentResponse>;
    deleteTimeSheet: (payload: DeleteTimeSheetParentPayload) => Promise<DeleteTimeSheetParentResponse>;
}

export const storeParentRepository: StoreParentRepository = {
    fetchListTimeSheet: async (params) => {
        return fetchListTimeSheet(params)
    },
    fetchDetailTimeSheet: async (params) => {
        return fetchListTimeSheet(params)
    },
    insertTimeSheet: async (payload) => {
        return insertTimeSheet(payload)
    },
    updateTimeSheet: (payload) => {
        return updateTimeSheet(payload);
    },
    deleteTimeSheet: (payload) => {
        return deleteTimeSheet(payload);
    }
}