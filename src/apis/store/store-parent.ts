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
        `${STORE_URL}/orders`, {
        params: {
            populates: {
                "path": "parent assignee project warehouse account customer contract goods assets work userCreate userUpdate",
                "select": "_id fullname name sign phone unit date"
            },
            ...params,
        }
    }
    )
    return data;
}

export async function fetchListByProperty(params : any) {
    const { data } = await API.get(`${STORE_URL}/orders/get-list-by-property`, {
        params: {
            ...params,
        }
    })
    return data
}

export async function insertStore<P, R>(payload: P): Promise<R> {
    const { data } = await API.post(`${STORE_URL}/orders`, payload);
    return data;
}

export async function updateStore<P, R>(payload: P): Promise<R> {
    const { data } = await API.put(`${STORE_URL}/orders`, payload);
    return data;
}

export async function deleteStore<P, R>(payload: P): Promise<R> {
    const { data } = await API.delete(`${STORE_URL}/orders`, {
        data: payload
    });
    return data;
}

interface StoreParentRepository {
    fetchListStore: (params: ListStorePayload) => Promise<QueryStoreParentResponse>;
    fetchListByProperty: (params: any) => Promise<QueryStoreParentResponse>;
    fetchDetailStore: (params: ListStorePayload) => Promise<QueryDetailStoreParentResponse>;
    insertStore: (payload: InsertStoreParentPayload) => Promise<InsertStoreParentResponse>;
    updateStore: (payload: UpdateStoreParentPayload) => Promise<UpdateStoreParentResponse>;
    deleteStore: (payload: DeleteStoreParentPayload) => Promise<DeleteStoreParentResponse>;
}

export const storeParentRepository: StoreParentRepository = {
    fetchListStore: async (params) => {
        return fetchListStore(params)
    },
    fetchListByProperty: async (params) => {
        return fetchListByProperty(params)
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