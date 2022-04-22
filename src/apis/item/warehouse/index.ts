/*=====DEFINE URL=====*/
import API from "../../repository";
import { ITEM_URL } from '..';

/*=====TYPING=====*/
import { Warehouse } from 'typings/items';

/*=====INTERFACE DEFINE=====*/
interface WarehouseRepository {
    addWarehouse: (params: any) => Promise<any>;
    updateWarehouse: (params: any) => Promise<any>;
    deleteWarehouse: (ids: Array<string>) => Promise<any>;
    fetchListWarehouse: (params: Warehouse.WarehouseQueryPayload) => Promise<Warehouse.WarehouseQueryResponse>;
    fetchDetailWarehouse: (WarehouseID: string, params?: Warehouse.WarehouseQueryPayload) => Promise<Warehouse.WarehouseQueryDetailResponse>;
}

export const WarehouseRepository: WarehouseRepository = {
    addWarehouse: (params: any) => addWarehouse(params),
    updateWarehouse: (params: any) => updateWarehouse(params),
    deleteWarehouse: (ids: Array<string>) => deleteWarehouse(ids),
    fetchListWarehouse: async (params) => fetchListWarehouse(params),
    fetchDetailWarehouse: async (WarehouseID, params) => fetchListWarehouse(params),
}

/*=====APIS=====*/
// Get List|Info
async function fetchListWarehouse(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/warehouses`, {
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
async function addWarehouse(params: any) {
    const { data } = await API.post(
        `${ITEM_URL}/warehouses`, params);
        
    return data;
}

// Update
async function updateWarehouse(params: any) {
    const { data } = await API.put(
        `${ITEM_URL}/warehouses`, params);

    return data;
}

// Delete
async function deleteWarehouse(ids: Array<string>) {
    const { data } = await API.delete(
        `${ITEM_URL}/warehouses`, {
            params: {
                WarehouseID: ids
            }
        });

    return data;
}