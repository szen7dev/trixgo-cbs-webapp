/*=====DEFINE URL=====*/
import API from "../../repository";
import { ITEM_URL } from '..';

/*=====TYPING=====*/
import { Goods } from 'typings/items';
import type {
    GoodsQueryDetailResponse
} from 'typings/items/goods';

/*=====INTERFACE DEFINE=====*/
interface GoodsRepository {
    addGoods: (params: any) => Promise<any>;
    updateGoods: (params: any) => Promise<any>;
    deleteGoods: (ids: Array<string>) => Promise<any>;
    fetchListGoods: (params: Goods.GoodsQueryPayload) => Promise<Goods.GoodsQueryResponse>;
    fetchDetailGoods: (GoodsID: string, params?: Goods.GoodsQueryPayload) => Promise<Goods.GoodsQueryDetailResponse>;
    downloadTemplateExcel: (data: any) => Promise<GoodsQueryDetailResponse>;
    importExcel: (data: any) => Promise<GoodsQueryDetailResponse>;
    exportExcel: (data: any) => Promise<GoodsQueryDetailResponse>;
}

export const GoodsRepository: GoodsRepository = {
    addGoods: (params: any) => addGoods(params),
    updateGoods: (params: any) => updateGoods(params),
    deleteGoods: (ids: Array<string>) => deleteGoods(ids),
    fetchListGoods: async (params) => fetchListGoods(params),
    fetchDetailGoods: async (GoodsID, params) => fetchListGoods(params),
    downloadTemplateExcel: params => downloadTemplateExcel(params), 
    importExcel: params => importExcel(params), 
    exportExcel: params => exportExcel(params), 
}

/*=====APIS=====*/
// Get List|Info
async function fetchListGoods(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/goods`, {
        params: {
            // select: 'name description modifyAt userUpdate amountChilds',
            populates: {
                path: 'parent userUpdate convert images',
                // select: 'name unit description fullname author createAt path',
                populate: {
					path: 'author',
					select: 'fullname bizfullname image'
				}
            },
            ...params
        }
    }
    )
    return data;
}

// Create
async function addGoods(params: any) {
    const { data } = await API.post(
        `${ITEM_URL}/goods`, params);
        
    return data;
}

// Update
async function updateGoods(params: any) {
    const { data } = await API.put(
        `${ITEM_URL}/goods`, params);

    return data;
}

// Delete
async function deleteGoods(ids: Array<string>) {
    const { data } = await API.delete(
        `${ITEM_URL}/goods`, {
            params: {
                goodsID: ids
            }
        });

    return data;
}

// Tải mẫu excel
async function downloadTemplateExcel(data: any) {
    const { data: result } = await API.get(`${ITEM_URL}/goods/download-template-excel`, data);
    return result;
}
    
// Import excel
async function importExcel(data: any) {
    const { data: result } = await API.post(`${ITEM_URL}/goods/import-from-excel`, data);
    return result;
}

// Export excel
async function exportExcel(data: any) {
    const { data: result } = await API.get(`${ITEM_URL}/goods/export-excel`, data);
    return result;
}