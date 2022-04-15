import type { QueryParam, APIResponse } from '../common';

export type BudgetItem = {
    _id: string;
    name: string;
    sign: string;
    note: string;
    unit: string;
    description: string;
    modifyAt: string;
    createAt: string;
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

export type BudgetItemListParams = QueryParam & {
    budgetID?: string;
}

export type BudgetItemListResponse = APIResponse & {
    data: {
        listRecords: BudgetItem[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

export type BudgetItemInfoParams = {
    budgetItemID: string;
    select?: string;
    populates?: string;
}

export type BudgetItemInfoResponse = APIResponse & {
    data: BudgetItem;
}