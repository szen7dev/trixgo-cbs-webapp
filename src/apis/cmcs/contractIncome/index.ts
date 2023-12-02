import API from "../../repository";

const ITEM_URL = "/api/item";

async function fetchListIsMember<T>(params: any): Promise<T> {
    const { data } = await API.get(
        `${ITEM_URL}/list-contract-is-members`,
        {
            params: {
                select: "name date sign expiredAg agValue note personInCharge value vatValue plus vatPlus produce vatProduce plusProduce vatPlusProduce acceptance vatAcceptance plusAcceptance vatPlusAcceptance recommendedPayment advancePaymentPaid amountPaid remainingPayment status createAt dependentUnit",
                populates: {
                    "path": "project company personInCharge",
                    "select": "name sign"
                },
                ...params,
            },
        }
    )
    return data
}

async function fetchList<T>(params: any): Promise<T> {
    const { data } = await API.get(
        `${ITEM_URL}/contracts`,
        {
            params: {
                select: "name date sign expiredAg agValue note personInCharge value vatValue plus vatPlus produce vatProduce plusProduce vatPlusProduce acceptance vatAcceptance plusAcceptance vatPlusAcceptance recommendedPayment advancePaymentPaid amountPaid remainingPayment status createAt dependentUnit",
                populates: {
                    "path": "project company personInCharge",
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
        `${ITEM_URL}/contracts?contractID=${params.contactID}`, {
        params: {
            populates: {
                "path": "project field chair personInCharge debtStatus warehouse buyerInfo sellerInfo dependentUnit",
                "select": "name sign description"
            },
        },
    }
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
        `${ITEM_URL}/contracts?contractID=${contractID}`)
    return data;
}

async function exportContract<T>(params: any): Promise<T> {
    const { data } = await API.post<any>(
        `${ITEM_URL}/contracts/export`, params
    );
    return data;
}

async function importContract(data: any) {
    const { data: result } = await API.post(`${ITEM_URL}/contracts/import-from-excel`, data);
    return result;
}

const ContractIncomeRepository = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchListIsMember: async (params: any): Promise<any> => fetchListIsMember<any>(params),
    fetchList: async (params: any): Promise<any> => fetchList<any>(params),
    fetchDetailContract: async (params: {
        contactID: string;
    }): Promise<any> => fetchDetailContract(params),
    requestCreateContract,
    requestUpdateContract,
    requestDeleteContract,
    exportContract,
    importContract
};

export default ContractIncomeRepository