import API from "../../repository";
import { convertObToUrl } from "utils";

import {
    DeleteMultiContractPayload,
    InfoContractPayload,
    InfoContractResponse,
    InsertContractPayload,
    ListContractsPayload,
    ListContractsResponse,
    UpdateContractPayload
} from "typings/cmcs";

const ITEM_URL = "/api/item";

const ContractExpenseRepository = {
    fetchList: (params: ListContractsPayload): Promise<ListContractsResponse> => fetchList(params),
    fetchInfo: (params: InfoContractPayload): Promise<InfoContractResponse> => fetchInfo(params),
    insert,
    update,
    remove,
};

async function fetchList(params: ListContractsPayload): Promise<ListContractsResponse> {
    const { data } = await API.get(
        `${ITEM_URL}/contracts?${convertObToUrl({
            select: "name date sign expiredAg agValue note personInCharge value vatValue plus vatPlus acceptance vatAcceptance plusAcceptance vatPlusAcceptance recommendedPayment advancePaymentPaid amountPaid remainingPayment status createAt",
            populates: JSON.stringify({
                path: "project company personInCharge",
                select: "name sign"
            }),
            outin: 2,
            ...params
        })}`
    )
    return data
}

async function fetchInfo(params: InfoContractPayload): Promise<InfoContractResponse> {
    const { data } = await API.get(
        `${ITEM_URL}/contracts?${convertObToUrl({
            populates: JSON.stringify({
                path: "project field chair personInCharge debtStatus warehouse buyerInfo sellerInfo",
                select: "name sign description"
            }),
            ...params
        })}`
    )
    return data
}

async function insert(params: InsertContractPayload): Promise<any> {
    const { data } = await API.post(`${ITEM_URL}/contracts`, params)
    return data;
}

async function update(params: UpdateContractPayload): Promise<any> {
    const { data } = await API.put(`${ITEM_URL}/contracts`, params)
    return data;
}

async function remove(params: DeleteMultiContractPayload): Promise<any> {
    const { data } = await API.delete(`${ITEM_URL}/contracts`, {
        params
    })
    return data;
}

export default ContractExpenseRepository;