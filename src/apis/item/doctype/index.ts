import API from "../../repository";
import { ITEM_URL } from '../';

import type { Doctype } from 'typings/items';

interface DoctypeRepository {
    addDoctype: (params: any) => Promise<any>;
    updateDoctype: (params: any) => Promise<any>;
    deleteDoctype: (ids: Array<string>) => Promise<any>;
    fetchListDoctype: (params: Doctype.DoctypeQueryPayload) => Promise<Doctype.DoctypeQueryResponse>;
    fetchDetailDoctype: (docTypeID: string, params?: Doctype.DoctypeQueryPayload) => Promise<Doctype.DoctypeQueryDetailResponse>;
}

export const doctypeRepository: DoctypeRepository = {
    addDoctype: (params: any) => addDoctype(params),
    updateDoctype: (params: any) => updateDoctype(params),
    deleteDoctype: (ids: Array<string>) => deleteDoctype(ids),
    fetchListDoctype: async (params) => fetchListDoctype(params),
    fetchDetailDoctype: async (doctypeID, params) => fetchListDoctype({...params, doctypeID}),
}

async function fetchListDoctype(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/doctypes`, {
        params: {
            populates: {
                path: 'company',
                select: 'sign name'
            },
            ...params
        }
    });

    return data;
}

async function addDoctype(params: any) {
    const { data } = await API.post(
        `${ITEM_URL}/doctypes`, params);

    return data;
}

async function updateDoctype(params: any) {
    const { data } = await API.put(
        `${ITEM_URL}/doctypes`, params);

    return data;
}

async function deleteDoctype(ids: Array<string>) {
    const { data } = await API.delete(
        `${ITEM_URL}/doctypes`, {
            params: {
                doctypesID: ids
            }
        });

    return data;
}