import API from "../../repository";
import { convertObToUrl } from "utils";

import {
    CashBookInsertPayload,
    CashBookUpdatePayload,
    CashBookDeleteManyPayload,
    CashBookInfoParams,
    CashBookListParams,
    CashBookListResponse,
    CashBookInfoResponse
} from 'typings/financial/cashBook';

const CASH_BOOK_URL = "/api/fin/cash_books";

export const CashbookRepository = {
    insert: (payload: CashBookInsertPayload): Promise<CashBookInfoResponse> => insert(payload),
    update: (payload: CashBookUpdatePayload): Promise<CashBookInfoResponse> => update(payload),
    deleteMany: (params: CashBookDeleteManyPayload): Promise<any> => deleteMany(params),
    fetchList: (params: CashBookListParams): Promise<CashBookListResponse> => fetchList(params),
    fetchInfo: (params: CashBookInfoParams): Promise<CashBookInfoResponse> => fetchInfo(params),
};

async function insert(payload: CashBookInsertPayload): Promise<CashBookInfoResponse> {
    const { data } = await API.post(
        CASH_BOOK_URL, payload
    )
    return data
}

async function update(payload: CashBookUpdatePayload): Promise<CashBookInfoResponse> {
    const { data } = await API.put(
        CASH_BOOK_URL, payload
    )
    return data
}

async function deleteMany(params: CashBookDeleteManyPayload): Promise<any> {
    const { data } = await API.delete(
        CASH_BOOK_URL, {
            params
        }
    )
    return data
}

async function fetchList(params: CashBookListParams): Promise<CashBookListResponse> {
    const { data } = await API.get(
        `${CASH_BOOK_URL}?${convertObToUrl(params)}`
    )
    return data
}

async function fetchInfo(params: CashBookInfoParams): Promise<CashBookInfoResponse> {
    const { data } = await API.get(
        `${CASH_BOOK_URL}?${convertObToUrl(params)}`
    )
    return data
}