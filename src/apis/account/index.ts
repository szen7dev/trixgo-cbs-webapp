import API from "../repository";
import { convertObToUrl } from "utils";

import {
    AccountInfoParams,
    AccountListParams,
    AccountInfoResponse,
    AccountListResponse,
} from 'typings/items/account';

const ACCOUNT_URL = "/api/item/accounts";

export const AccountRepository = {
    fetchList: (params: AccountListParams): Promise<AccountListResponse> => fetchList(params),
    fetchInfo: (params: AccountInfoParams): Promise<AccountInfoResponse> => fetchInfo(params),
};

async function fetchList(params: AccountListParams): Promise<AccountListResponse> {
    const { data } = await API.get(
        `${ACCOUNT_URL}?${convertObToUrl({
            populates: JSON.stringify({
                path: 'userCreate members',
                select: '_id bizfullname image'
            }),
            ...params
        })}`
    )
    return data
}

async function fetchInfo(params: AccountInfoParams): Promise<AccountInfoResponse> {
    const { data } = await API.get(
        `${ACCOUNT_URL}?${convertObToUrl(params)}`
    )
    return data
}