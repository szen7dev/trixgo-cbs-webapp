import API from "../../repository";
import { convertObToUrl } from "utils";

import {
    CashPaymentInsertPayload,
    CashPaymentUpdatePayload,
    CashPaymentDeleteManyPayload,
    CashPaymentListParams,
    CashPaymentInfoParams,
    CashPaymentListResponse,
    CashPaymentInfoResponse,
    CashPaymentDownloadPayload,
    CashPaymentImportPayload,
    CashPaymentExportManyPayload,
} from 'typings/financial/cashPayment';

const CASH_PAYMENT_URL = "/api/fin/cash_payments";

export const CashPaymentRepository = {
    insert: (payload: CashPaymentInsertPayload): Promise<any> => insert(payload),
    update: (payload: CashPaymentUpdatePayload): Promise<any> => update(payload),
    deleteMany: (params: CashPaymentDeleteManyPayload): Promise<any> => deleteMany(params),
    fetchList: (params: CashPaymentListParams): Promise<CashPaymentListResponse> => fetchList(params),
    fetchInfo: (params: CashPaymentInfoParams): Promise<any> => fetchInfo(params),
    fetchAmountByProperty: (params: any): Promise<any> => fetchAmountByProperty(params),

     downloadTemplateExcel  : (payload: CashPaymentDownloadPayload)            : Promise<any> => downloadTemplateExcel(payload),
     importExcel            : (payload: CashPaymentImportPayload)              : Promise<any> => importExcel(payload),
     exportExcel            : (payload: CashPaymentExportManyPayload)          : Promise<any> => exportExcel(payload),
};

async function insert(payload: CashPaymentInsertPayload): Promise<CashPaymentInfoResponse> {
    const { data } = await API.post(
        CASH_PAYMENT_URL, payload
    )
    return data
}

async function update(payload: CashPaymentUpdatePayload): Promise<CashPaymentInfoResponse> {
    const { data } = await API.put(
        CASH_PAYMENT_URL, payload
    )
    return data
}

async function deleteMany(params: CashPaymentDeleteManyPayload): Promise<any> {
    const { data } = await API.delete(
        CASH_PAYMENT_URL, {
        params
    }
    )
    return data
}

async function fetchList(params: CashPaymentListParams): Promise<CashPaymentListResponse> {
    const { data } = await API.get(
        `${CASH_PAYMENT_URL}?${convertObToUrl({
            populates: JSON.stringify({
                path: 'userUpdate customer',
                select: '_id fullname image name note phone'
            }),
            ...params
        })}`
    )
    return data
}

async function fetchInfo(params: CashPaymentInfoParams): Promise<CashPaymentInfoResponse> {
    const { data } = await API.get(
        `${CASH_PAYMENT_URL}?${convertObToUrl(params)}`
    )
    return data
}

async function fetchAmountByProperty(params: any): Promise<any> {
    const { data } = await API.get(
        `${CASH_PAYMENT_URL}/get-amount-by-property?${convertObToUrl(params)}`
    )
    return data
}

async function downloadTemplateExcel(payload: any): Promise<any> {
    const { data } = await API.get<any>(
        `${CASH_PAYMENT_URL}/download-template-excel?${convertObToUrl(payload)}`
    )
    return data
}

async function importExcel(payload: any): Promise<any> {
    const { data } = await API.post<any>(
        `${CASH_PAYMENT_URL}/import-from-excel`, payload
    )
    return data
}

async function exportExcel(payload: any): Promise<any> {
    const { data } = await API.get<any>(
        `${CASH_PAYMENT_URL}/export-excel?${convertObToUrl(payload)}`
    )
    return data
}