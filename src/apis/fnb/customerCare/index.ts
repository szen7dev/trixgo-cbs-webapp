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

const CUSTOMER_CARE_URL = "/api/fnb/customer_cares";

export const CustomerCareRepository = {
    insert: (payload: CashPaymentInsertPayload): Promise<any> => insert(payload),
    update: (payload: CashPaymentUpdatePayload): Promise<any> => update(payload),
    deleteMany: (params: CashPaymentDeleteManyPayload): Promise<any> => deleteMany(params),
    fetchList: (params: CashPaymentListParams): Promise<CashPaymentListResponse> => fetchList(params),
    fetchInfo: (params: CashPaymentInfoParams): Promise<any> => fetchInfo(params),
    fetchListByProperty: (params: any): Promise<any> => fetchListByProperty(params),
    downloadTemplateExcel  : (payload: CashPaymentDownloadPayload)            : Promise<any> => downloadTemplateExcel(payload),
    importExcel            : (payload: CashPaymentImportPayload)              : Promise<any> => importExcel(payload),
    exportExcel            : (payload: any)          : Promise<any> => exportExcel(payload),
};

async function insert(payload: CashPaymentInsertPayload): Promise<CashPaymentInfoResponse> {
    const { data } = await API.post(
        CUSTOMER_CARE_URL, payload
    )
    return data
}

async function update(payload: CashPaymentUpdatePayload): Promise<CashPaymentInfoResponse> {
    const { data } = await API.put(
        CUSTOMER_CARE_URL, payload
    )
    return data
}

async function deleteMany(params: CashPaymentDeleteManyPayload): Promise<any> {
    const { data } = await API.delete(
        CUSTOMER_CARE_URL, {
        params
    }
    )
    return data
}

async function fetchList(params: CashPaymentListParams): Promise<CashPaymentListResponse> {
    const { data } = await API.get(
        `${CUSTOMER_CARE_URL}?${convertObToUrl({
            ...params
        })}`
    )
    return data
}

async function fetchInfo(params: CashPaymentInfoParams): Promise<CashPaymentInfoResponse> {
    const { data } = await API.get(
        `${CUSTOMER_CARE_URL}?${convertObToUrl(params)}`
    )
    return data
}

async function fetchListByProperty(params : any) {
    const { data } = await API.get(`${CUSTOMER_CARE_URL}/get-list-by-property`, {
        params: {
            ...params,
        }
    })
    return data
}

async function downloadTemplateExcel(payload: any): Promise<any> {
    const { data } = await API.get<any>(
        `${CUSTOMER_CARE_URL}/download-template-excel?${convertObToUrl(payload)}`
    )
    return data
}

async function importExcel(payload: any): Promise<any> {
    const { data } = await API.post<any>(
        `${CUSTOMER_CARE_URL}/import-from-excel`, payload
    )
    return data
}

async function exportExcel(payload: any): Promise<any> {
    const { data } = await API.post<any>(
        `${CUSTOMER_CARE_URL}/export-excel?${convertObToUrl(payload)}`
    )
    return data
}