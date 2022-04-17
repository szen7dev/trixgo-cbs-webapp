/*=====DEFINE URL=====*/
import API from "../../repository";
import { FIN_URL } from '..';

/*=====TYPING=====*/
import CashFlowPlan from 'typings/financial/cashFlowPlan';

/*=====INTERFACE DEFINE=====*/
interface CashFlowPlanRepository {
    addCashFlowPlan: (params: any) => Promise<any>;
    updateCashFlowPlan: (params: any) => Promise<any>;
    deleteCashFlowPlan: (ids: Array<string>) => Promise<any>;
    fetchListCashFlowPlan: (params: CashFlowPlan.CashFlowPlanQueryPayload) => Promise<CashFlowPlan.CashFlowPlanQueryResponse>;
    fetchDetailCashFlowPlan: (storageID: string, params?: CashFlowPlan.CashFlowPlanQueryPayload) => Promise<CashFlowPlan.CashFlowPlanQueryDetailResponse>;
}

export const cashFlowPlanRepository: CashFlowPlanRepository = {
    addCashFlowPlan: (params: any) => addCashFlowPlan(params),
    updateCashFlowPlan: (params: any) => updateCashFlowPlan(params),
    deleteCashFlowPlan: (ids: Array<string>) => deleteCashFlowPlan(ids),
    fetchListCashFlowPlan: async (params) => fetchListCashFlowPlan(params),
    fetchDetailCashFlowPlan: async (params) => fetchListCashFlowPlan(params),
}

/*=====APIS=====*/
// Get List|Info
async function fetchListCashFlowPlan(params: any) {
    const { data } = await API.get(
        `${FIN_URL}/cash_flow_plans`, {
        params: {
            select: 'contract parent type name sign date value planValue realDate realValue note priority outin',
            populates: {
                path: 'parent contract',
                select: '_id name sign date priority sellerInfo',
                populate: {
                    path: 'sellerInfo',
                    select: '_id name'
                }
            },
            limit: 20,
            ...params
        }
    }
    )
    return data;
}

// Create
async function addCashFlowPlan(params: any) {
    const { data } = await API.post(
        `${FIN_URL}/cash_flow_plans`, params);

    return data;
}

// Update
async function updateCashFlowPlan(params: any) {
    const { data } = await API.put(
        `${FIN_URL}/cash_flow_plans`, params);

    return data;
}

// Delete
async function deleteCashFlowPlan(params: any) {
    const { data } = await API.delete(
        `${FIN_URL}/cash_flow_plans`, { params }
    );

    return data;
}