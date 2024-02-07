/*=====DEFINE URL=====*/
import API from "../../repository";
import { ITEM_URL } from '../';

/*=====TYPING=====*/
import type { Doctype } from 'typings/items';

/*=====INTERFACE DEFINE=====*/
interface DoctypeRepository {
    addDoctype: (params: any) => Promise<any>;
    updateDoctype: (params: any) => Promise<any>;
    deleteDoctype: (ids: Array<string>) => Promise<any>;
    fetchListDoctype: (params: Doctype.DoctypeListParams) => Promise<Doctype.DoctypeQueryResponse>;
    fetchDetailDoctype: (docTypeID: string, params?: Doctype.DoctypeListParams) => Promise<Doctype.DoctypeQueryDetailResponse>;
    importFromExcel: (data: any) => Promise<any>;
}

export const doctypeRepository: DoctypeRepository = {
    addDoctype: (params: any) => addDoctype(params),
    updateDoctype: (params: any) => updateDoctype(params),
    deleteDoctype: (ids: Array<string>) => deleteDoctype(ids),
    fetchListDoctype: async (params) => fetchListDoctype(params),
    fetchDetailDoctype: async (doctypeID, params) => fetchListDoctype({...params, doctypeID}),
    importFromExcel: params => importFromExcel(params), 
}

/*=====APIS=====*/
// Get List|Info
async function fetchListDoctype(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/doctypes`, {
        params: {
            populates: {
                path: 'company userCreate userUpdate linkItem',
                select: 'sign name fullname'
            },
            ...params
        }
    });

    return data;
}

// Create
async function addDoctype(params: any) {
    const { data } = await API.post(
        `${ITEM_URL}/doctypes`, params);

    return data;
}

// Update
async function updateDoctype(params: any) {
    const { data } = await API.put(
        `${ITEM_URL}/doctypes`, params);

    return data;
}

// Delete
async function deleteDoctype(ids: Array<string>) {
    const { data } = await API.delete(
        `${ITEM_URL}/doctypes`, {
            params: {
                doctypesID: ids
            }
        });

    return data;
}

// Import excel
async function importFromExcel(data: any) {
    const { data: result } = await API.post(`${ITEM_URL}/doctypes/import-from-excel`, data);
    return result;
}