import API from "../../repository";
import { ITEM_URL } from '../';

import type { Doctype } from 'typings/items';

interface DoctypeRepository {
    fetchListDoctype: (params: Doctype.DoctypeQueryPayload) => Promise<Doctype.DoctypeQueryResponse>;
}

export const doctypeRepository: DoctypeRepository = {
    fetchListDoctype: async (params) => fetchListDoctype(params),
}

async function fetchListDoctype(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/doctypes`, {
        params: {
            select: 'name type company',
            populates: {
                path: 'company',
                select: 'sign name'
            },
            ...params
        }
    }
    )
    return data;
}