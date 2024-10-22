import API from "../repository";

const ACCOUNTING_REPORT = "/api/accounting/reports";

interface ReportRepository {
    insert: (data: any) => Promise<any>;
    update: (data: any) => Promise<any>;
    fetchListReport: (data: any) => Promise<any>;
    fetchListByProperty: (data: any) => Promise<any>;
    downloadTemplateExcel: (data: any) => Promise<any>;
    importFromExcel: (data: any) => Promise<any>;
    exportExcel: (data: any) => Promise<any>;
}

export const ReportRepository: ReportRepository = {
    insert: data => inserData(data),
    update: data => updateData(data),
    fetchListReport: params => fetchListReport(params),
    fetchListByProperty: params => fetchListByProperty(params),
    downloadTemplateExcel: params => downloadTemplateExcel(params), 
    importFromExcel: params => importFromExcel(params), 
    exportExcel: params => exportExcel(params), 
}

async function fetchListReport(params : any) {
    const { data } = await API.get(`${ACCOUNTING_REPORT}`, {
        params: {
            populates: {
                "path": "userCreate funda",
                "select": "name sign phone taxid address fullname",
            },
            ...params,
        }
    })
    return data
}

async function fetchListByProperty(params : any) {
    const { data } = await API.get(`${ACCOUNTING_REPORT}/get-list-by-property`, {
        params: {
            ...params,
        }
    })
    return data
}

async function inserData(data: any) {
    const { data: result } = await API.post(`${ACCOUNTING_REPORT}`, data);
    return result
}

async function updateData(data: any) {
    const { data: result } = await API.put(`${ACCOUNTING_REPORT}`, data);
    return result
}

async function downloadTemplateExcel(data: any) {
    const { data: result } = await API.post(`${ACCOUNTING_REPORT}/download-template-excel`, data);
    return result
}

async function importFromExcel(data: any) {
    const { data: result } = await API.post(`${ACCOUNTING_REPORT}/import-from-excel`, data);
    return result
}

async function exportExcel(data: any) {
    const { data: result } = await API.post(`${ACCOUNTING_REPORT}/export-voucher`, data);
    return result
}