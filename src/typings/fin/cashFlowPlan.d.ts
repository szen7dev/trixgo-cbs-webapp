import type { QueryParam, APIResponse } from './commons';

export interface CashFlowPlan {
    _id: string;
    modifyAt: string;
    parent: {
        _id: string,
        name: string,
    };
    type: string;
    name: string;
    planValue: string;
    date: string;
    realValue: string | null;
    realDate: string | null;
    note: string | null;
    priority: string | null;
    outin: string | null;
}

export type CashFlowPlanQueryPayload = QueryParam & {
    companyID?: string;
    cashFlowPlanID?: string;
};

export type CashFlowPlanQueryResponse = APIResponse & {
    data: {
        listRecords: cashFlowPlan[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}

export type CashFlowPlanQueryDetailResponse = APIResponse & {
    data: CashFlowPlan
}

interface ModalProps {
    modalType: "create" | "update";
    initialValues?: {
        cashFlowPlanID: string,
        parent: string,
        type: string;
        name: string;
        planValue: string;
        date: string;
        realValue: string | null;
        realDate: string | null;
        note: string | null;
        priority: string | null;
        outin: string | null;
    }
    onConfirm?(): void
}