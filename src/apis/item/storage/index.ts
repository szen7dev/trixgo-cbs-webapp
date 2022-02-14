import API from "../../repository";
import { ITEM_URL } from '../';

import { Storage } from 'typings/items';

interface StorageRepository {
    fetchListStorage: (params: Storage.StorageQueryPayload) => Promise<Storage.StorageQueryResponse>;
}

export const storageRepository: StorageRepository = {
    fetchListStorage: async (params) => fetchListStorage(params),
}

async function fetchListStorage(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/storages`, {
        params: {
            select: 'name description',
            ...params
        }
    }
    )
    return data;
}
