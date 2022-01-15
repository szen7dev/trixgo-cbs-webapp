import API from "../repository";

const ITEM_URL = "/api/item";

async function fetchList<T>(params: any): Promise<T> {
    const { data } = await API.get(
        `${ITEM_URL}/contracts`,
        {
            params: {
                select: "name date value vatValue plus vatPlus acceptance vatAcceptance plusAcceptance vatPlusAcceptance recommendedPayment advancePaymentPaid amountPaid remainingPayment status createAt",
                populates: {
                    "path": "project company",
                    "select": "name sign"
                },
                outin: 1,
                ...params,
            },
        }
    )
    return data
}

async function fetchDetailContract<T>(params: any): Promise<T> {    
    const { data } = await API.get(
        `${ITEM_URL}/contracts?contractID=${params.contactID}`
    )
    return data
}

async function requestCreateContract(formData: any): Promise<any> {
    const { data } = await API.post(
        `${ITEM_URL}/contracts`,
        {
            ...formData
        }
    )
    return data;
}

async function requestUpdateContract(formData: any): Promise<any> {
    const { data } = await API.put(
        `${ITEM_URL}/contracts`,
        {
            ...formData
        }
    )
    return data;
}

async function requestDeleteContract(contractID: string): Promise<any> {
    const { data } = await API.delete(
        `${ITEM_URL}/contracts?contractID=${contractID}`    )
    return data;
}

const ContractIncomeRepository = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchList: async (params:any): Promise<any> => fetchList<any>(params),
    fetchDetailContract: async (params: {
        contactID: string;
    }): Promise<any> => fetchDetailContract(params),
    requestCreateContract,
    requestUpdateContract,
    requestDeleteContract
};

export default ContractIncomeRepository
