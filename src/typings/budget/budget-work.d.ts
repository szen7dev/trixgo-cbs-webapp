import type { QueryParam, APIResponse } from '../common';

export type BudgetWork = {
    _id: string;
    name: string;
    sign: string;
    note: string;
    description: string;
    type: number;
    amount: number;
    impleAmount: number;
    forecastAmount: number;
    company: Company,
    date: string,
    modifyAt?: string;
    createAt?: string;
}

export type BudgetWorkListParams = QueryParam & {
    type?: number;
    isMember?: number;
    contract?: string;
}

export type BudgetWorkListResponse = APIResponse & {
    data: {
        listRecords: BudgetWork[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

export type BudgetWorkInfoParams = {
    budgetWorkID: string;
    select?: string;
    populates?: string;
}

export type BudgetWorkInfoResponse = APIResponse & {
    data: BudgetWork;
}