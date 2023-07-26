import API from "../../repository";
import { convertObToUrl } from "utils";

import {
    CashBookInsertPayload,
    CashBookUpdatePayload,
    CashBookDeleteManyPayload,
    CashBookInfoParams,
    CashBookListParams,
    CashBookListResponse,
    CashBookInfoResponse,
    CashBookAmountIncomeExpenseParams,
    CashBookAmountIncomeExpenseResponse,
    CashBookAmountByPropertyParams,
    CashBookAmountByPropertyResponse,
    CashBookDownloadPayload,
    CashBookImportPayload,
    CashBookExportManyPayload,
} from 'typings/financial/cashBook';

const CASH_BOOK_URL = "/api/fin/cash_books";

export const CashbookRepository = {
    insert: (payload: CashBookInsertPayload): Promise<CashBookInfoResponse> => insert(payload),
    update: (payload: CashBookUpdatePayload): Promise<CashBookInfoResponse> => update(payload),
    deleteMany: (params: CashBookDeleteManyPayload): Promise<any> => deleteMany(params),
    fetchList: (params: CashBookListParams): Promise<CashBookListResponse> => fetchList(params),
    fetchInfo: (params: CashBookInfoParams): Promise<CashBookInfoResponse> => fetchInfo(params),
    fetchAmountIncomeExpenseByParent:
        (params: CashBookAmountIncomeExpenseParams): Promise<CashBookAmountIncomeExpenseResponse> => fetchAmountIncomeExpenseByParent(params),
    fetchAmountByProperty:
        (params: CashBookAmountByPropertyParams): Promise<CashBookAmountByPropertyResponse> => fetchAmountByProperty(params),

     downloadTemplateExcel  : (payload: CashBookDownloadPayload)            : Promise<any> => downloadTemplateExcel(payload),
     importExcel            : (payload: CashBookImportPayload)              : Promise<any> => importExcel(payload),
     exportExcel            : (payload: CashBookExportManyPayload)          : Promise<any> => exportExcel(payload),
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
        `${CASH_BOOK_URL}?${convertObToUrl({
            populates: JSON.stringify({
                path: 'userCreate members account customer contract',
                select: '_id bizfullname image name description'
            }),
            ...params
        })}`
    )
    return data
}

async function fetchInfo(params: CashBookInfoParams): Promise<CashBookInfoResponse> {
    const { data } = await API.get(
        `${CASH_BOOK_URL}?${convertObToUrl(params)}`
    )
    return data
}

async function fetchAmountIncomeExpenseByParent(params: CashBookAmountIncomeExpenseParams): Promise<CashBookAmountIncomeExpenseResponse> {
    const { data } = await API.get(
        `${CASH_BOOK_URL}/get-amount-income-expense-by-parent?${convertObToUrl(params)}`
    )
    return data
}

async function fetchAmountByProperty(params: CashBookAmountByPropertyParams): Promise<CashBookAmountByPropertyResponse> {
    const { data } = await API.get(
        `${CASH_BOOK_URL}/get-amount-by-property?${convertObToUrl(params)}`
    )
    return data
}

async function downloadTemplateExcel(payload: any): Promise<any> {
    const { data } = await API.get<any>(
        `${CASH_BOOK_URL}/download-template-excel`, payload
    )
    return data
}

async function importExcel(payload: any): Promise<any> {
    const { data } = await API.post<any>(
        `${CASH_BOOK_URL}/import-from-excel`, payload
    )
    return data
}

async function exportExcel(payload: any): Promise<any> {
    const { data } = await API.get<any>(
        `${CASH_BOOK_URL}/export-excel`, payload
    )
    return data
}