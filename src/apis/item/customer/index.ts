/*=====DEFINE URL=====*/
import API from "../../repository";
import { ITEM_URL } from '..';

/*=====TYPING=====*/
import { Customer } from 'typings/items';

/*=====INTERFACE DEFINE=====*/
interface CustomerRepository {
    addCustomer: (params: any) => Promise<any>;
    updateCustomer: (params: any) => Promise<any>;
    deleteCustomer: (ids: Array<string>) => Promise<any>;
    fetchListCustomer: (params: Customer.CustomerQueryPayload) => Promise<Customer.CustomerQueryResponse>;
    fetchDetailCustomer: (params: Customer.CustomerQueryPayload) => Promise<Customer.CustomerQueryDetailResponse>;
}

export const customerRepository: CustomerRepository = {
    addCustomer: (params: any) => addCustomer(params),
    updateCustomer: (params: any) => updateCustomer(params),
    deleteCustomer: (ids: Array<string>) => deleteCustomer(ids),
    fetchListCustomer: async (params) => fetchListCustomer(params),
    fetchDetailCustomer: async (params) => fetchListCustomer(params),
}

/*=====APIS=====*/
// Get List|Info
async function fetchListCustomer(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/contacts`, {
        params: {
            select: 'parent type name address taxid phone description modifyAt',
            populates: {
                path: 'parent userUpdate',
                select: 'name bizfullname'
            },
            limit: 20,
            ...params
        }
    }
    )
    return data;
}

// Create
async function addCustomer(params: any) {
    const { data } = await API.post(
        `${ITEM_URL}/contacts`, params);

    return data;
}

// Update
async function updateCustomer(params: any) {
    const { data } = await API.put(
        `${ITEM_URL}/contacts`, params);

    return data;
}

// Delete
async function deleteCustomer(ids: Array<string>) {
    const { data } = await API.delete(
        `${ITEM_URL}/contacts`, {
            params: {
                doctypesID: ids
            }
        });

    return data;
}