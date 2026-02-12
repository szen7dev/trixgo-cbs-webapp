// import { populates } from "views/messages/shareComponents/layouts/MessagesLayoutV2";
import API from "../repository";

const ACCOUNTING_VOUCHER = "/api/accounting/vouchers";

interface VoucherRepository {
    insert: (data: any) => Promise<any>;
    update: (data: any) => Promise<any>;
    fetchListVoucher: (data: any) => Promise<any>;
    fetchFilterListData: (data: any) => Promise<any>;
    fetchListByProperty: (data: any) => Promise<any>;
    downloadTemplateExcel: (data: any) => Promise<any>;
    importFromExcel: (data: any) => Promise<any>;
    exportExcel: (data: any) => Promise<any>;
}

export const VoucherRepository: VoucherRepository = {
    insert: data => inserData(data),
    update: data => updateData(data),
    fetchListVoucher: params => fetchListVoucher(params),
    fetchFilterListData: params => fetchFilterListData(params),
    fetchListByProperty: params => fetchListByProperty(params),
    downloadTemplateExcel: params => downloadTemplateExcel(params), 
    importFromExcel: params => importFromExcel(params), 
    exportExcel: params => exportExcel(params), 
}

async function fetchListVoucher(params : any) {
    const { data } = await API.get(`${ACCOUNTING_VOUCHER}`, {
        params: {
            populates: {
                // "path": "userCreate userUpdate customer contract funda subtype linkFunda linkVoucher referrer sales journals",
                "path": "userCreate userUpdate customer funda subtype linkFunda linkVoucher referrer sales files",
                "select": "name sign phone taxid address fullname path nameOrg",
                // "select": "name sign phone taxid address fullname goods quantity",
                // populate: {
                //     "path": "goods debit",
                //     "select": "name unit",
                //     // "model": "goods",
                // }
            },
            
            ...params,
        }
    })
    return data
}

async function fetchFilterListData(params : any) {
    const { data } = await API.get(`${ACCOUNTING_VOUCHER}/filter-voucher`, {
        params: {
            populates: {
                "path": "userCreate userUpdate customer funda subtype linkFunda linkVoucher referrer sales files",
                "select": "name sign phone taxid address fullname path nameOrg",
            },
            ...params,
        }
    })
    return data
}

async function fetchListByProperty(params : any) {
    const { data } = await API.get(`${ACCOUNTING_VOUCHER}/get-list-by-property`, {
        params: {
            ...params,
        }
    })
    return data
}

async function inserData(data: any) {
    const { data: result } = await API.post(`${ACCOUNTING_VOUCHER}/insert-voucher`, data);
    return result
}

async function updateData(data: any) {
    const { data: result } = await API.put(`${ACCOUNTING_VOUCHER}/update-voucher`, data);
    return result
}

async function downloadTemplateExcel(data: any) {
    const { data: result } = await API.post(`${ACCOUNTING_VOUCHER}/download-template-excel`, data);
    return result
}

async function importFromExcel(data: any) {
    const { data: result } = await API.post(`${ACCOUNTING_VOUCHER}/import-from-excel`, data);
    return result
}

async function exportExcel(data: any) {
    const { data: result } = await API.post(`${ACCOUNTING_VOUCHER}/export-voucher`, data);
    return result
}