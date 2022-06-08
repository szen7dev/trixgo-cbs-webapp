import { Contract } from 'typings/cmcs';
import { Project } from 'typings/items/project';
import { User } from 'typings/user';
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
    contract: Contract;
    project: Project;
    sign: string;
    type: number;
    name: string;
    status: number;
    value: number;
    planValue: number;
    property: number;
    date: string;
    realValue: number;
    realDate: string;
    note: string;
    priority: number;
    outin: string | null;
    createAt: string;
    modifyAt: string;
    timeApproved: string;
    approver: User;
    admins: User[];
    members: User[];
    userCreate: User;
}

export type CashFlowPlanInfoPayload = {
    cashFlowID?: string;
    select?: string;
    populates?: string;
};

export type CashFlowPlanQueryPayload = QueryParam & {
    companyID?: string;
    cashFlowID?: string;
};

export type CashFlowPlanQueryResponse = APIResponse & {
    data: {
        listRecords: cashFlowPlan[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

export type CashFlowPlanQueryDetailResponse = APIResponse & {
    data: CashFlowPlan
}

interface ModalProps {
    modalType: "create" | "update";
    initialValues?: {
        cashFlowID?: string,
        parent?: string,
        type?: number;
        name?: string;
        note?: string;
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

export type CashFlowAmountByPropertyParams = {
    projectID?: string;
    option?: number;
    type?: number;
    property?: number;
    outin?: number;
    real?: number;
}

export type CashFlowCustomParams = {
    amountByProperty?: Partial<CashFlowAmountByPropertyParams>
}