import type { QueryParam, APIResponse } from '../common';

export type BudgetSubmittal = {
    _id: string;
    name: string;
    sign: string;
    note: string;
    description: string;
    type: number;
    unit: string;
    work?: any;
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

export type BudgetSubmittalListParams = QueryParam & {
    type?: number;
    isMember?: number;
    contract?: string;
}

export type BudgetSubmittalListResponse = APIResponse & {
    data: {
        listRecords: BudgetSubmittal[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

export type BudgetSubmittalInfoParams = {
    budgetWorkID: string;
    select?: string;
    populates?: string;
}

export type BudgetSubmittalInfoResponse = APIResponse & {
    data: BudgetSubmittal;
}