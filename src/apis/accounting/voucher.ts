import API from "../repository";

const APP_ACCOUNTING = "/api/accounting/vouchers";
const APP_ACCOUNTING_JOURNAL = "/api/accounting/journals";
const HISTORY_TRAFFICS = "/api/analysis/history_traffics";

async function fetchList<T>(params: any): Promise<T> {
    const { data } = await API.get(
        `${APP_ACCOUNTING}`,
        {
            params: {
                select: "name date type createAt sign amount note",
                populates: {
                    "path": "customer userCreate company contract",
                    "select": "name sign bizfullname"
                },
                ...params,
            },
        }
    )
    return data
}

async function fetchListJournalDetail<T>(params: any): Promise<T> {
    const { data } = await API.get(
        `${APP_ACCOUNTING_JOURNAL}`,
        {
            params: {
                populates: {
                    "path": "debit credit customerCredit customerDebit warehouse goods contract budgetWork",
                    "select": "name description unit",
                },
                ...params,
            },
        }
    )
    return data
}

async function fetchDetailAccountingVoucher<T>(params: any): Promise<T> {
    const { data } = await API.get(
        `${APP_ACCOUNTING}/${params.id}`
    )
    return data
}

async function requestCreateAccountingVoucher(formData: any): Promise<any> {
    const { data } = await API.post(
        `${APP_ACCOUNTING}`,
        {
            ...formData
        }
    )
    return data;
}

async function requestHistoryTraffics(parame: any): Promise<any> {
    const { data } = await API.post(
        `${HISTORY_TRAFFICS}`,
        {
            ...parame
        }
    )
    return data;
}

async function requestUpdateAccountingVoucher(formData: any): Promise<any> {
    const { data } = await API.put(
        `${APP_ACCOUNTING}`,
        {
            ...formData
        }
    )
    return data;
}

async function requestDeleteAccountingVoucher(voucherID: string): Promise<any> {
    const { data } = await API.delete(
        `${APP_ACCOUNTING}/remove?voucherID=${voucherID}`)
    return data;
}

const AccountingVoucherIPCRepository = {
    fetchList: async (params: any): Promise<any> => fetchList<any>(params),
    fetchListJournalDetail: async (params: any): Promise<any> => fetchListJournalDetail<any>(params),
    fetchDetailAccountingVoucher: async (params: {
        id: string;
    }): Promise<any> => fetchDetailAccountingVoucher(params),
    requestCreateAccountingVoucher,
    requestUpdateAccountingVoucher,
    requestDeleteAccountingVoucher,
    requestHistoryTraffics
};

export default AccountingVoucherIPCRepository