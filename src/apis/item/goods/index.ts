/*=====DEFINE URL=====*/
import API from "../../repository";
import { ITEM_URL } from '..';

/*=====TYPING=====*/
import { Goods } from 'typings/items';

/*=====INTERFACE DEFINE=====*/
interface GoodsRepository {
    addGoods: (params: any) => Promise<any>;
    updateGoods: (params: any) => Promise<any>;
    deleteGoods: (ids: Array<string>) => Promise<any>;
    fetchListGoods: (params: Goods.GoodsQueryPayload) => Promise<Goods.GoodsQueryResponse>;
    fetchDetailGoods: (GoodsID: string, params?: Goods.GoodsQueryPayload) => Promise<Goods.GoodsQueryDetailResponse>;
}

export const GoodsRepository: GoodsRepository = {
    addGoods: (params: any) => addGoods(params),
    updateGoods: (params: any) => updateGoods(params),
    deleteGoods: (ids: Array<string>) => deleteGoods(ids),
    fetchListGoods: async (params) => fetchListGoods(params),
    fetchDetailGoods: async (GoodsID, params) => fetchListGoods(params),
}

/*=====APIS=====*/
// Get List|Info
async function fetchListGoods(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/goods`, {
        params: {
            // select: 'name description modifyAt userUpdate amountChilds',
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