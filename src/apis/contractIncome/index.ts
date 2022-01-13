import API from "../repository";

const ITEM_URL = "/api/item";

async function fetchList<T>(params: any): Promise<T> {
    const { data } = await API.get(
        `${ITEM_URL}/contracts`,
        {
            params: {
                select: "name value vatValue plus vatPlus acceptance vatAcceptance plusAcceptance vatPlusAcceptance recommendedPayment advancePaymentPaid amountPaid remainingPayment status createAt",
                populates: {
                    "path": "company",
                    "select": "name sign"
                },
                outin: 1,
                ...params,
            },
        }
    )
    return data
}

const ContractIncomeRepository = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchList: async (params:any): Promise<any> => fetchList<any>(params),
};

export default ContractIncomeRepository
