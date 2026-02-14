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
    exportExcel: (params: any) => Promise<any>;
}

export const cashFlowPlanRepository: CashFlowPlanRepository = {
    addCashFlowPlan: (params) => addCashFlowPlan(params),
    updateCashFlowPlan: (params) => updateCashFlowPlan(params),
    deleteCashFlowPlan: (ids) => deleteCashFlowPlan(ids),
    fetchListCashFlowPlan: async (params) => fetchListCashFlowPlan(params),
    fetchDetailCashFlowPlan: async (params) => fetchListCashFlowPlan(params),
    fetchAmountByProperty: async (params) => getAmountByProperty(params),
    exportExcel: async (params) => exportExcel(params),
}

/*=====APIS=====*/
// Get List|Info
async function fetchListCashFlowPlan(params: any) {
    const { data } = await API.get(
        `${FIN_URL}/cash_flow_plans`, {
        params: {
            select: '_id funda parent subtype parentSubtype userCreate createAt name status note revenue expense actualRevenue actualExpense fromDate toDate',
            populates: {
                path: 'funda parent subtype parentSubtype userCreate',
                select: '_id name fullname',
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


async function exportExcel(params: any) {
    // const { data: result } = await API.post(`${ACCOUNTING_REPORT}/export-excel`, data);
     const { data } = await API.post(
        `${FIN_URL}/cash_flow_plans/export-excel`, params);
    return data
}