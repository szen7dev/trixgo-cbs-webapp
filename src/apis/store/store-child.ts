import {
    fetchListStore,
    fetchListByProperty,
    insertStore,
    updateStore
} from './store-parent';

import type {
    QueryListStoreChildPayload,
    QueryStoreChildResponse,
    InsertStoreChildPayload,
    InsertStoreChildResponse,
    UpdateStoreChildPayload,
    UpdateStoreChildResponse
} from 'typings/store';

interface StoreChildRepository {
    fetchListStore: (params: QueryListStoreChildPayload) => Promise<QueryStoreChildResponse>;
    fetchListByProperty: (params: any) => Promise<any>;
    insertStore: (payload: InsertStoreChildPayload) => Promise<InsertStoreChildResponse>;
    updateStore: (payload: UpdateStoreChildPayload) => Promise<UpdateStoreChildResponse>;
}

export const storeChildRepository: StoreChildRepository = {
    fetchListStore: async (params) => {
        return fetchListStore(params)
    },
    fetchListByProperty: async (params) => {
        return fetchListByProperty(params)
    },
    insertStore: async (payload) => {
        return insertStore(payload)
    },
    updateStore: async (payload) => {
        return updateStore(payload)
    },
}
