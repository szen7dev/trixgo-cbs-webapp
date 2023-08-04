import API from "../../repository";
import { convertObToUrl } from "utils";

const BUDGET_URL = "/api/budget/budget_works";

export const BudgetWorkRepository = {
    insert: (payload: any): Promise<any> => insert(payload),
    update: (payload: any): Promise<any> => update(payload),
    deleteMany: (params: any): Promise<any> => deleteMany(params),
    fetchList: (params: any): Promise<any> => fetchList(params),
    fetchInfo: (params: any): Promise<any> => fetchInfo(params),
    downloadTemplateExcel: (payload: any): Promise<any> => downloadTemplateExcel(payload),
    importExcel: (payload: any): Promise<any> => importExcel(payload),
    exportExcel: (payload: any): Promise<any> => exportExcel(payload),
};

async function insert(payload: any): Promise<any> {
    const { data } = await API.post(
        BUDGET_URL, payload
    )
    return data
}

async function update(payload: any): Promise<any> {
    const { data } = await API.put(
        BUDGET_URL, payload
    )
    return data
}

async function deleteMany(params: any): Promise<any> {
    const { data } = await API.delete(
        BUDGET_URL, {
            params
        }
    )
    return data
}

async function fetchList(params: any): Promise<any> {
    const { data } = await API.get(
        `${BUDGET_URL}?${convertObToUrl(params)}`
    )
    return data
}

async function fetchInfo(params: any): Promise<any> {
    const { data } = await API.get(
        `${BUDGET_URL}?${convertObToUrl(params)}`
    )
    return data
}

async function downloadTemplateExcel(payload: any): Promise<any> {
    const { data } = await API.get<any>(
        `${BUDGET_URL}/download-template-excel?${convertObToUrl(payload)}`
    )
    return data
}

async function importExcel(payload: any): Promise<any> {
    const { data } = await API.post<any>(
        `${BUDGET_URL}/import-excel`, payload
    )
    return data
}

async function exportExcel(payload: any): Promise<any> {
    const { data } = await API.get<any>(
        `${BUDGET_URL}/export-excel?${convertObToUrl(payload)}`
    )
    return data
}