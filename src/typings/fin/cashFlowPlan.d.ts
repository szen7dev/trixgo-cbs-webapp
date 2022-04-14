import { Contract } from 'typings/cmcs';
import type { QueryParam, APIResponse } from './commons';

export interface CashFlowPlan {
    _id: string;
    modifyAt: string;
    projectID: string;
    contactID: string;
    parent: {
        _id: string,
        name: string,
    };
    contract: Contract,
    sign: string;
    type: number;
    name: string;
    value: number;
    planValue: number;
    property: number;
    date: string;
    realValue: number;
    realDate: string;
    note: string;
    priority: number;
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
        cashFlowPlanID?: string,
        parent?: string,
        type?: number;
        name?: string;
        sign?: string;
        property?: number;
        planValue?: string;
        date?: string;
        realValue?: number | null;
        realDate?: string | null;
        note?: string | null;
        priority?: number | null;
        outin?: number | null;
    }
    onConfirm?(): void
}