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
    fetchDetailCashFlowPlan: (params?: CashFlowPlan.CashFlowPlanQueryPayload) => Promise<CashFlowPlan.CashFlowPlanQueryDetailResponse>;
    fetchAmountByProperty: (params?: CashFlowPlan.CashFlowAmountByPropertyParams) => Promise<any>;
}

export const cashFlowPlanRepository: CashFlowPlanRepository = {
    addCashFlowPlan: (params) => addCashFlowPlan(params),
    updateCashFlowPlan: (params) => updateCashFlowPlan(params),
    deleteCashFlowPlan: (ids) => deleteCashFlowPlan(ids),
    fetchListCashFlowPlan: async (params) => fetchListCashFlowPlan(params),
    fetchDetailCashFlowPlan: async (params) => fetchListCashFlowPlan(params),
    fetchAmountByProperty: async (params) => getAmountByProperty(params),
}

/*=====APIS=====*/
// Get List|Info
async function fetchListCashFlowPlan(params: any) {
    const { data } = await API.get(
        `${FIN_URL}/cash_flow_plans`, {
        params: {
            select: '_id contract project parent type name sign date value planValue realDate realValue note priority outin status property approver timeApproved userCreate admins members createAt',
            populates: {
                path: 'parent contract project approver userCreate admins members',
                select: '_id name sign date priority sellerInfo bizfullname',
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
async function deleteCashFlowPlan(payload: any) {
    const { data } = await API.delete(
        `${FIN_URL}/cash_flow_plans`, {
            params: {
                cashFlowsID: payload
            }
        }
    );

    return data;
}

// Get amount by property
async function getAmountByProperty(params: any) {
    const { data } = await API.get(
        `${FIN_URL}/cash_flow_plans/get-amount-by-property`, {
            params
        });

    return data;
}