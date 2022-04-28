import API from "../../repository";
import { convertObToUrl } from "utils";

// import {
//     DeleteMultiContractPayload,
//     InfoContractPayload,
//     InfoContractResponse,
//     InsertContractPayload,
//     ListContractsPayload,
//     ListContractsResponse,
//     UpdateContractPayload
// } from "typings/cmcs";

const ITEM_URL = "/api/cmcs";
const ContractExpenseRepository = {
    fetchList: (params: any): Promise<any> => fetchList(params),
    fetchInfo: (params: any): Promise<any> => fetchInfo(params),
    insert,
    update,
    remove,
};

async function fetchList(params: any): Promise<any> {
    const { data } = await API.get(
        `${ITEM_URL}/contract_expenses?${convertObToUrl({
            select: "name date subtype value note createAt",
            populates: JSON.stringify({
                path: "userCreate",
                select: "bizfullname"
            }),
            ...params
        })}`
    )
    return data
}

async function fetchInfo(params: any): Promise<any> {
    const { data } = await API.get(
        `${ITEM_URL}/contract_expenses?${convertObToUrl({
            populates: JSON.stringify({
                path: "project",
                select: "name sign description"
            }),
            ...params
        })}`
    )
    return data
}

async function insert(params: any): Promise<any> {
    const { data } = await API.post(`${ITEM_URL}/contract_expenses`, params)
    return data;
}

async function update(params: any): Promise<any> {
    const { data } = await API.put(`${ITEM_URL}/contract_expenses`, params)
    return data;
}

async function remove(params: any): Promise<any> {
    const { data } = await API.delete(`${ITEM_URL}/contract_expenses`, {
        params
    })
    return data;
}

export default ContractExpenseRepository;