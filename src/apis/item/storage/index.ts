/*=====DEFINE URL=====*/
import API from "../../repository";
import { ITEM_URL } from '../';

/*=====TYPING=====*/
import { Storage } from 'typings/items';

/*=====INTERFACE DEFINE=====*/
interface StorageRepository {
    addStorage: (params: any) => Promise<any>;
    updateStorage: (params: any) => Promise<any>;
    deleteStorage: (ids: Array<string>) => Promise<any>;
    fetchListStorage: (params: Storage.StorageQueryPayload) => Promise<Storage.StorageQueryResponse>;
    fetchDetailStorage: (storageID: string, params?: Storage.StorageQueryPayload) => Promise<Storage.StorageQueryDetailResponse>;
}

export const storageRepository: StorageRepository = {
    addStorage: (params: any) => addStorage(params),
    updateStorage: (params: any) => updateStorage(params),
    deleteStorage: (ids: Array<string>) => deleteStorage(ids),
    fetchListStorage: async (params) => fetchListStorage(params),
    fetchDetailStorage: async (storageID, params) => fetchListStorage(params),
}

/*=====APIS=====*/
// Get List|Info
async function fetchListStorage(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/storages`, {
        params: {
            select: 'name description modifyAt userUpdate amountChilds',
            populates: {
                path: 'parent userUpdate',
                select: 'name description bizfullname'
            },
            ...params
        }
    }
    )
    return data;
}

// Create
async function addStorage(params: any) {
    const { data } = await API.post(
        `${ITEM_URL}/storages`, params);

    return data;
}

// Update
async function updateStorage(params: any) {
    const { data } = await API.put(
        `${ITEM_URL}/storages`, params);

    return data;
}

// Delete
async function deleteStorage(ids: Array<string>) {
    const { data } = await API.delete(
        `${ITEM_URL}/storages`, {
            params: {
                doctypesID: ids
            }
        });

    return data;
}