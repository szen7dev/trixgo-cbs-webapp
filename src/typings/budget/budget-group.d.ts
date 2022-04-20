import type { QueryParam, APIResponse } from '../common';

export type BudgetGroup = {
    _id: string;
    name: string;
    sign: string;
    note: string;
    description: string;
    type: number;
    unit: string;
    company: Company;
    date: string;
    item: string;
    budget: string;
    modifyAt?: string;
    createAt?: string;
    quantity: number;
    unitPrice: number;
    amount: number;
    vatAmount: number;
    vatUnitPrice: number;
    impleQuantity: number;
    impleUnitPrice: number;
    impleAmount: number;
    forecastQuantity: number;
    forecastUnitPrice: number;
    forecastVatUnitPrice: number;
    forecastAmount: number;
    forecastVatAmount: number;
}

export type BudgetGroupListParams = QueryParam & {
    type?: number;
    isMember?: number;
    contract?: string;
}

export type BudgetGroupListResponse = APIResponse & {
    data: {
        listRecords: BudgetGroup[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

export type BudgetGroupInfoParams = {
    budgetGroupID: string;
    select?: string;
    populates?: string;
}

export type BudgetGroupInfoResponse = APIResponse & {
    data: BudgetGroup;
}