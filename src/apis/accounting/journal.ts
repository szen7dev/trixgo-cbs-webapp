import API from "../repository";

const ACCOUNTING_JOURNAL = "/api/accounting/journals";

interface JournalRepository {
    insert: (data: any) => Promise<any>;
    update: (data: any) => Promise<any>;
    fetchListJournal: (data: any) => Promise<any>;
    fetchFilterListData: (data: any) => Promise<any>;
    fetchListByProperty: (data: any) => Promise<any>;
    downloadTemplateExcel: (data: any) => Promise<any>;
    importFromExcel: (data: any) => Promise<any>;
    exportExcel: (data: any) => Promise<any>;
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
}

async function fetchListJournal(params : any) {
    const { data } = await API.get(`${ACCOUNTING_JOURNAL}`, {
        params: {
            // select: 'name sign author project date createAt description note store amount status storeSign publish datahubContact',
            populates: {
                "path": "voucher debit credit customerCredit customerDebit warehouse goods contract budgetWork funda",
                "select": "type name sign description unit date",
            },
            ...params,
        }
    })
    return data
}

async function fetchFilterListData(params : any) {
    const { data } = await API.get(`${ACCOUNTING_JOURNAL}/filter-document`, {
        params: {
            // select: 'name sign author project date createAt description note store amount status storeSign publish datahubContact',
            populates: {
                "path": "author sender storage project publish datahubContact funda",
                "select": "fullname bizfullname sign image name date"
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
    const { data: result } = await API.post(`${ACCOUNTING_JOURNAL}/insert-document`, data);
    return result
}

async function updateData(data: any) {
    const { data: result } = await API.put(`${ACCOUNTING_JOURNAL}/update-document`, data);
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
    const { data: result } = await API.post(`${ACCOUNTING_JOURNAL}/export-document`, data);
    return result
}