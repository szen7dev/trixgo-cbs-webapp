import type { QueryParam, APIResponse } from '../common';

export type Budget = {
    _id: string;
    name: string;
    sign: string;
    note: string;
    description: string;
    type: number;
    revenue: number;
    vatRevenue: number;
    forecastRevenue: number;
    forecastVatRevenue: number;
    finalRevenue: number;
    finalVatRevenue: number;
    budget: number;
    vatBudget: number;
    finalBudget: number;
    finalVatBudget: number;
    forecastBudget: number;
    forecastVatBudget: number;
    company: Company,
    date: string,
    modifyAt?: string;
    createAt?: string;
    files: any;
}

export type BudgetListParams = QueryParam & {
    type?: number;
    isMember?: number;
    contract?: string;
}

export type BudgetListResponse = APIResponse & {
    data: {
        listRecords: Budget[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

export type BudgetInfoParams = {
    budgetID: string;
    select?: string;
    populates?: string;
}

export type BudgetInfoResponse = APIResponse & {
    data: Budget;
}

interface ModalProps {
    modalType: "create" | "update";
    initialValues?: {
        budgetId: string,
        name: string,
        description: string
    }
    onConfirm?(): void
}