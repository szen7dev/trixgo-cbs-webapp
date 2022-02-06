import API from "../repository";

const APP_ACCOUNTING = "/api/accounting/voucher";
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

async function fetchDetailContract<T>(params: any): Promise<T> {
    const { data } = await API.get(
        `${APP_ACCOUNTING}/contract_ipcs?contractIpcID=${params.contractIpcID}`
    )
    return data
}

async function requestCreateContract(formData: any): Promise<any> {
    const { data } = await API.post(
        `${APP_ACCOUNTING}/contract_ipcs`,
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

async function requestUpdateContract(formData: any): Promise<any> {
    const { data } = await API.put(
        `${APP_ACCOUNTING}/contract_ipcs`,
        {
            ...formData
        }
    )
    return data;
}

async function requestDeleteContract(contractID: string): Promise<any> {
    const { data } = await API.delete(
        `${APP_ACCOUNTING}/contract_ipcs?contractIpcID=${contractID}`)
    return data;
}

const ContractIPCRepository = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchList: async (params: any): Promise<any> => fetchList<any>(params),
    fetchDetailContract: async (params: {
        contractIpcID: string;
    }): Promise<any> => fetchDetailContract(params),
    requestCreateContract,
    requestUpdateContract,
    requestDeleteContract,
    requestHistoryTraffics
};

export default ContractIPCRepository
