import API from "../repository";
import { STORE_URL } from '.';
import { convertObToUrl } from "utils";

import type {
    ListStorePayload,
    QueryStoreChildResponse,
    InsertStoreChildPayload,
    InsertStoreChildResponse,
    UpdateStoreChildPayload,
    UpdateStoreChildResponse,
    DeleteStoreChildPayload,
    DeleteStoreChildResponse,
    QueryDetailStoreChildResponse
} from 'typings/store';

export async function fetchListStore<T>(params?: ListStorePayload): Promise<T> {
    const { data } = await API.get(
        `${STORE_URL}/order_products`, {
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
    const { data } = await API.get(`${STORE_URL}/order_products/get-list-by-property`, {
        params: {
            ...params,
        }
    })
    return data
}

export async function insertStore<P, R>(payload: P): Promise<R> {
    const { data } = await API.post(`${STORE_URL}/order_products`, payload);
    return data;
}

export async function updateStore<P, R>(payload: P): Promise<R> {
    const { data } = await API.put(`${STORE_URL}/order_products`, payload);
    return data;
}

export async function deleteStore<P, R>(payload: P): Promise<R> {
    const { data } = await API.delete(`${STORE_URL}/order_products`, {
        data: payload
    });
    return data;
}

async function exportByFilter<T>(params: any): Promise<T> {
    const { data } = await API.post<any>(
        `${STORE_URL}/order_products/export-excel-by-filter`, params
    );
    return data;
}

interface StoreChildRepository {
    fetchListStore: (params: ListStorePayload) => Promise<QueryStoreChildResponse>;
    fetchListByProperty: (params: any) => Promise<QueryStoreChildResponse>;
    fetchDetailStore: (params: ListStorePayload) => Promise<QueryDetailStoreChildResponse>;
    insertStore: (payload: InsertStoreChildPayload) => Promise<InsertStoreChildResponse>;
    updateStore: (payload: UpdateStoreChildPayload) => Promise<UpdateStoreChildResponse>;
    deleteStore: (payload: DeleteStoreChildPayload) => Promise<DeleteStoreChildResponse>;
    exportByFilter: (data: any) => Promise<any>;
}

export const storeChildRepository: StoreChildRepository = {
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
    exportByFilter: async (payload) => {
        return exportByFilter(payload)
    },
    updateStore: (payload) => {
        return updateStore(payload);
    },
    deleteStore: (payload) => {
        return deleteStore(payload);
    }
}