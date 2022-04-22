/*=====DEFINE URL=====*/
import API from "../../repository";
import { ITEM_URL } from '../';

/*=====TYPING=====*/
import { Account } from 'typings/items';

/*=====INTERFACE DEFINE=====*/
interface AccountRepository {
    addAccount: (params: any) => Promise<any>;
    updateAccount: (params: any) => Promise<any>;
    deleteAccount: (ids: Array<string>) => Promise<any>;
    fetchListAccount: (params: Account.AccountQueryPayload) => Promise<Account.AccountQueryResponse>;
    fetchDetailAccount: (AccountID: string, params?: Account.AccountQueryPayload) => Promise<Account.AccountQueryDetailResponse>;
}

export const AccountRepository: AccountRepository = {
    addAccount: (params: any) => addAccount(params),
    updateAccount: (params: any) => updateAccount(params),
    deleteAccount: (ids: Array<string>) => deleteAccount(ids),
    fetchListAccount: async (params) => fetchListAccount(params),
    fetchDetailAccount: async (AccountID, params) => fetchListAccount(params),
}

/*=====APIS=====*/
// Get List|Info
async function fetchListAccount(params: any) {
    const { data } = await API.get(
        `${ITEM_URL}/accounts`, {
        params: {
            select: 'name description modifyAt userUpdate amountChilds',
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
async function addAccount(params: any) {
    const { data } = await API.post(
        `${ITEM_URL}/accounts`, params);

    return data;
}

// Update
async function updateAccount(params: any) {
    const { data } = await API.put(
        `${ITEM_URL}/accounts`, params);

    return data;
}

// Delete
async function deleteAccount(ids: Array<string>) {
    const { data } = await API.delete(
        `${ITEM_URL}/accounts`, {
            params: {
                accountID: ids
            }
        });

    return data;
}