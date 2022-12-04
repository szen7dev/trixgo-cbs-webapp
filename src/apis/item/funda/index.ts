/*=====DEFINE URL=====*/
import API from "../../repository";
import { ITEM_URL } from '..';

/*=====TYPING=====*/
import { Funda } from 'typings/items';

/*=====INTERFACE DEFINE=====*/
interface FundaRepository {
    addFunda: (params: any) => Promise<any>;
    updateFunda: (params: any) => Promise<any>;
    deleteFunda: (ids: Array<string>) => Promise<any>;
    fetchListFunda: (params: Funda.FundaQueryPayload) => Promise<Funda.FundaQueryResponse>;
    fetchDetailFunda: (FundaID: string, params?: Funda.FundaQueryPayload) => Promise<Funda.FundaQueryDetailResponse>;
}

export const FundaRepository: FundaRepository = {
    addFunda: (params: any) => addFunda(params),
    updateFunda: (params: any) => updateFunda(params),
    deleteFunda: (ids: Array<string>) => deleteFunda(ids),
    fetchListFunda: async (params) => fetchListFunda(params),
    fetchDetailFunda: async (FundaID, params) => fetchListFunda(params),
}

/*=====APIS=====*/
// Get List|Info
async function fetchListFunda(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/fundas`, {
        params: {
            // select: 'name description modifyAt userUpdate amountChilds sign',
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
async function addFunda(params: any) {
    const { data } = await API.post(
        `${ITEM_URL}/fundas`, params);

    return data;
}

// Update
async function updateFunda(params: any) {
    const { data } = await API.put(
        `${ITEM_URL}/fundas`, params);

    return data;
}

// Delete
async function deleteFunda(ids: Array<string>) {
    const { data } = await API.delete(
        `${ITEM_URL}/fundas`, {
        params: {
            FundaID: ids
        }
    });

    return data;
}