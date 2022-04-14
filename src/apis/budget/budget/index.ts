import API from "../../repository";
import { convertObToUrl } from "utils";

const BUDGET_URL = "/api/budget";

export const BudgetRepository = {
    insert: (payload: any): Promise<any> => insert(payload),
    update: (payload: any): Promise<any> => update(payload),
    deleteMany: (params: any): Promise<any> => deleteMany(params),
    fetchList: (params: any): Promise<any> => fetchList(params),
    fetchInfo: (params: any): Promise<any> => fetchInfo(params),
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
        `${BUDGET_URL}?${convertObToUrl({
            ...params
        })}`
    )
    return data
}

async function fetchInfo(params: any): Promise<any> {
    const { data } = await API.get(
        `${BUDGET_URL}?${convertObToUrl({
            // populates: JSON.stringify({
            //     path: "members photos",
            //     select: "fullname bizfullname name sign image nameOrg path size author",
            //     populate: {
            //         path: "author",
            //         select: "_id bizfullname image"
            //     }
            // }),
            ...params
        })}`
    )
    return data
}