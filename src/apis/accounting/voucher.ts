import API from "../repository";

const APP_ACCOUNTING = "/api/accounting/voucher";
const APP_ACCOUNTING_JOURNAL = "/api/accounting/journal";
const HISTORY_TRAFFICS = "/api/analysis/history_traffics";

async function fetchList<T>(params: any): Promise<T> {
    const { data } = await API.get(
        `${APP_ACCOUNTING}/list-voucher`,
        {
            params: {
                select: "name date type createAt sign amount note",
                populates: {
                    "path": "customer userCreate company",
                    "select": "name sign"
                },
                type: 1,
                fundaID: '5e846addd7e3490be59ae8d5',
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
                    "path": "debit credit customerCredit customerDebit warehouse goods contract",
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
        `${APP_ACCOUNTING}/insertFull`,
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
    const { data } = await API.post(
        `${APP_ACCOUNTING}/update`,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
