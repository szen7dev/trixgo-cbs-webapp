import API from "../repository";
import { STORE_URL } from '.';
import { convertObToUrl } from "utils";

import type {
    ListStorePayload,
    QueryStoreParentResponse,
    InsertStoreParentPayload,
    InsertStoreParentResponse,
    UpdateStoreParentPayload,
    UpdateStoreParentResponse,
    DeleteStoreParentPayload,
    DeleteStoreParentResponse,
    QueryDetailStoreParentResponse
} from 'typings/store';

export async function fetchListStore<T>(params?: ListStorePayload): Promise<T> {
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

export async function insertStore<P, R>(payload: P): Promise<R> {
    const { data } = await API.post(`${STORE_URL}`, payload);
    return data;
}

export async function updateStore<P, R>(payload: P): Promise<R> {
    const { data } = await API.put(`${STORE_URL}`, payload);
    return data;
}

export async function deleteStore<P, R>(payload: P): Promise<R> {
    const { data } = await API.delete(`${STORE_URL}`, {
        data: payload
    });
    return data;
}

interface StoreParentRepository {
    fetchListStore: (params: ListStorePayload) => Promise<QueryStoreParentResponse>;
    fetchDetailStore: (params: ListStorePayload) => Promise<QueryDetailStoreParentResponse>;
    insertStore: (payload: InsertStoreParentPayload) => Promise<InsertStoreParentResponse>;
    updateStore: (payload: UpdateStoreParentPayload) => Promise<UpdateStoreParentResponse>;
    deleteStore: (payload: DeleteStoreParentPayload) => Promise<DeleteStoreParentResponse>;
}

export const storeParentRepository: StoreParentRepository = {
    fetchListStore: async (params) => {
        return fetchListStore(params)
    },
    fetchDetailStore: async (params) => {
        return fetchListStore(params)
    },
    insertStore: async (payload) => {
        return insertStore(payload)
    },
    updateStore: (payload) => {
        return updateStore(payload);
    },
    deleteStore: (payload) => {
        return deleteStore(payload);
    }
}