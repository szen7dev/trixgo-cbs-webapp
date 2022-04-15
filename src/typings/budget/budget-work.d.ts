import type { QueryParam, APIResponse } from '../common';

export type BudgetWork = {
    _id: string;
    name: string;
    sign: string;
    note: string;
    description: string;
    type: number;
    unit: string;
    company: Company,
    date: string,
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