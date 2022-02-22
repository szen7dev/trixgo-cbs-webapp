import API from "../../repository";
import { ITEM_URL } from '../';

import { Contact } from 'typings/items';

interface ContactRepository {
    fetchListContact: (params: Contact.ContactQueryPayload) => Promise<Contact.ContactQueryResponse>;
    fetchDetailContact: (contactID: string, params: Contact.ContactQueryPayload) => Promise<Contact.ContactQueryDetailResponse>;
}

export const contactRepository: ContactRepository = {
    fetchListContact: async (params) => fetchListContact(params),
    fetchDetailContact: async (contactID, params) => fetchListContact({ contactID, ...params })
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
    })
    return data;
}
