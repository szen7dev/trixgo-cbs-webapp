import API from "../../repository";
import { ITEM_URL } from '../';

import { Contact } from 'typings/items';

export const contactRepository = {
    fetchList: (params: Contact.ContactListParams): Promise<Contact.ContactListResponse> => fetchListAndInfo(params),
    fetchInfo: (params: Contact.ContactInfoParams) => fetchListAndInfo(params)
}

async function fetchListAndInfo(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/contacts`, {
        params: {
            select: 'name type company phone email birthday modifyAt',
            populates: {
                path: 'company position',
                select: 'sign name'
            },
            ...params
        }
    })
    return data;
}
