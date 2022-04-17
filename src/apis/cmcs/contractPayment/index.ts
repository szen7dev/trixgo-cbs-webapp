import API from "../../repository";
import { convertObToUrl } from "utils";

const APP_CMCS = "/api/cmcs";
const HISTORY_TRAFFICS = "/api/analysis/history_traffics";

const ContractIPCRepository = {
    fetchAmountContractValueGroupByDate: async (params: any): Promise<any> => fetchAmountContractValueGroupByDate<any>(params),
    fetchListContractPaynent: async (params: any): Promise<any> => fetchListContractPaynent<any>(params),
    fetchDetailContractPayment: async (params: {
        contractPaymentID: string;
    }): Promise<any> => fetchDetailContractPayment(params),
    requestCreateContractPayment,
    requestUpdateContractPayment,
    requestDeleteContractPayment,
    requestHistoryTraffics
};

async function fetchAmountContractValueGroupByDate<T>(params: any): Promise<T> {
    const { data } = await API.get(
        `${APP_CMCS}/contract_payments/get-amount-by-month?${convertObToUrl(params)}`,
    )
    return data
}

async function fetchListContractPaynent<T>(params: any): Promise<T> {
    const { data } = await API.get(
        `${APP_CMCS}/contract_payments`,
        {
            params: {
                select: "name sign description date value userCreate type",
                populates: {
                    "path": "ipc userCreate",
                    "select": "name sign bizfullname"
                },
                ...params,
            },
        }
    )
    return data
}

async function fetchDetailContractPayment<T>(params: any): Promise<T> {
    const { data } = await API.get(
        `${APP_CMCS}/contract_payments?contractPaymentID=${params.contractPaymentID}&populates=${JSON.stringify({ path: "ipc", select: "_id name"})}`
    )
    return data
}

async function requestCreateContractPayment(formData: any): Promise<any> {
    const { data } = await API.post(
        `${APP_CMCS}/contract_payments`,
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

async function requestUpdateContractPayment(formData: any): Promise<any> {
    const { data } = await API.put(
        `${APP_CMCS}/contract_payments`,
        {
            ...formData
        }
    )
    return data;
}

async function requestDeleteContractPayment(contractPaymentID: string): Promise<any> {
    const { data } = await API.delete(
        `${APP_CMCS}/contract_payments?contractPaymentID=${contractPaymentID}`)
    return data;
}

export default ContractIPCRepository
