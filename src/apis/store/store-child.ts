import {
    fetchListStore,
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
    insertStore: (payload: InsertStoreChildPayload) => Promise<InsertStoreChildResponse>;
    updateStore: (payload: UpdateStoreChildPayload) => Promise<UpdateStoreChildResponse>;
}

export const storeChildRepository: StoreChildRepository = {
    fetchListStore: async (params) => {
        return fetchListStore(params)
    },
    insertStore: async (payload) => {
        return insertStore(payload)
    },
    updateStore: async (payload) => {
        return updateStore(payload)
    },
}
