import API from "../../repository";
import { ITEM_URL } from '../';

import { Contact } from 'typings/items';

interface PackageRepository {
    fetchListContact: (params: Contact.ContactQueryPayload) => Promise<Contact.ContactQueryResponse>;
}

export const packageRepository: PackageRepository = {
    fetchListContact: async (params) => fetchListContact(params),
}

async function fetchListContact(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/contacts`, {
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
