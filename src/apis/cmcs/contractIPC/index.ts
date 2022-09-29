import API from "../../repository";

const APP_CMCS = "/api/cmcs";
const HISTORY_TRAFFICS = "/api/analysis/history_traffics";

async function fetchList<T>(params: any): Promise<T> {
    const { data } = await API.get(
        `${APP_CMCS}/contract_ipcs`,
        {
            params: {
                select: "type name date sign note description acceptance vatAcceptance plusAcceptance vatPlusAcceptance retainedValue advancePaymentDeduction otherDeduction recommendedPayment timeForPayment amountPaid remainingPayment createAt",
                populates: {
                    "path": "project company",
                    "select": "name sign"
                },
                ...params,
            },
        }
    )
    return data
}

async function fetchDetailContract<T>(params: any): Promise<T> {
    const { data } = await API.get(
        `${APP_CMCS}/contract_ipcs?contractIpcID=${params.contractIpcID}`
    )
    return data
}

async function requestCreateContract(formData: any): Promise<any> {
    const { data } = await API.post(
        `${APP_CMCS}/contract_ipcs`,
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
        `${APP_CMCS}/contract_ipcs`,
        {
            ...formData
        }
    )
    return data;
}

async function requestDeleteContract(contractID: string): Promise<any> {
    const { data } = await API.delete(
        `${APP_CMCS}/contract_ipcs?contractIpcID=${contractID}`)
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
