import API from "../repository";

const ACCOUNTING_JOURNAL = "/api/accounting/journals"; ///api/accounting/journals/export-excel

interface JournalRepository {
    insert: (data: any) => Promise<any>;
    update: (data: any) => Promise<any>;
    fetchListJournal: (data: any) => Promise<any>;
    fetchFilterListData: (data: any) => Promise<any>;
    fetchListByProperty: (data: any) => Promise<any>;
    downloadTemplateExcel: (data: any) => Promise<any>;
    importFromExcel: (data: any) => Promise<any>;
    exportExcel: (data: any) => Promise<any>;
    analysePrimeCost: (data: any) => Promise<any>;
}

export const JournalRepository: JournalRepository = {
    insert: data => inserData(data),
    update: data => updateData(data),
    fetchListJournal: params => fetchListJournal(params),
    fetchFilterListData: params => fetchFilterListData(params),
    fetchListByProperty: params => fetchListByProperty(params),
    downloadTemplateExcel: params => downloadTemplateExcel(params), 
    importFromExcel: params => importFromExcel(params), 
    exportExcel: params => exportExcel(params), 
    analysePrimeCost: params => analysePrimeCost(params), 
}

async function fetchListJournal(params : any) {
    const { data } = await API.get(`${ACCOUNTING_JOURNAL}`, {
        params: {
            populates: {
                "path": "voucher debit credit customerCredit customerDebit warehouse goods contract budgetWork funda subtype",
                "select": "type name sign description unit date taxid address modifyAt",
            },
            ...params,
        }
    })
    return data
}

async function fetchFilterListData(params : any) {
    const { data } = await API.get(`${ACCOUNTING_JOURNAL}/filter-document`, {
        params: {
            populates: {
                "path": "voucher debit credit customerCredit customerDebit warehouse goods contract budgetWork funda subtype",
                "select": "fullname bizfullname sign image name date taxid address modifyAt"
            },
            ...params,
        }
    })
    return data
}

async function fetchListByProperty(params : any) {
    const { data } = await API.get(`${ACCOUNTING_JOURNAL}/get-list-by-property`, {
        params: {
            ...params,
        }
    })
    return data
}

async function inserData(data: any) {
    const { data: result } = await API.post(`${ACCOUNTING_JOURNAL}/insert-excel`, data);
    return result
}

async function updateData(data: any) {
    const { data: result } = await API.put(`${ACCOUNTING_JOURNAL}/update-excel`, data);
    return result
}

async function downloadTemplateExcel(data: any) {
    const { data: result } = await API.post(`${ACCOUNTING_JOURNAL}/download-template-excel`, data);
    return result
}

async function importFromExcel(data: any) {
    const { data: result } = await API.post(`${ACCOUNTING_JOURNAL}/import-from-excel`, data);
    return result
}

async function exportExcel(data: any) {
    const { data: result } = await API.post(`${ACCOUNTING_JOURNAL}/export-excel`, data);
    return result
}

async function analysePrimeCost(data: any) {
    const { data: result } = await API.post(`${ACCOUNTING_JOURNAL}/analyse-prime-cost`, data);
    return result
}