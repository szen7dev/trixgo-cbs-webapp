import type { QueryParam, APIResponse } from '../common';

export type Budget = {
    _id: string;
    name: string;
    sign: string;
    description: string;
    type: number;
    company: Company,
    date: string,
    modifyAt?: string;
    createAt?: string;
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