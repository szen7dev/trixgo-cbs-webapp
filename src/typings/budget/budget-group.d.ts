import type { QueryParam, APIResponse } from '../common';

export type BudgetGroup = {
    _id: string;
    name: string;
    sign: string;
    note: string;
    description: string;
    type: number;
    amount: number;
    impleAmount: number;
    unit: string;
    unitPrice: number;
    forecastQuantity: number;
    forecastAmount: number;
    quantity: number;
    company: Company;
    date: string;
    item: string;
    budget: string;
    modifyAt?: string;
    createAt?: string;
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