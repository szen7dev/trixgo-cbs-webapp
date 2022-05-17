import { Contract } from 'typings/cmcs';
import { Project } from 'typings/items/project';
import { User } from 'typings/user';
import type { QueryParam, APIResponse } from './commons';

export interface BiddingPlan {
    _id: string;
    field: string;
    area: string;
    client: string;
    project: string;
    contract: Contract;
    project: Project;
    admins: User[];
    members: User[];
    parent: string;
    type: number;
    description: string;
    packagePrice: number;
    sign: string;
    note: string;
    status: number;
    percentOfCompletedPackage: number;
    startTime: string;
    finishTime: string;
    actualStartTime: string;
    actualFinishTime: string;
    closingTime: string;
    form: number;
    contractType: number;
    duration: number;
    progress: number,
    bidder: string,
    tenderPrice: number;
    vatTenderPrice: number;
    contract: string;
    userCreate: string;
    userUpdate: string;
}

export type BiddingPlanInfoPayload = {
    biddingPlanID?: string;
    select?: string;
    populates?: string;
};

export type BiddingPlanQueryPayload = QueryParam & {
    projectID?: string;
    biddingPlanID?: string;
};

export type BiddingPlanQueryResponse = APIResponse & {
    data: {
        listRecords: BiddingPlan[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

export type BiddingPlanQueryDetailResponse = APIResponse & {
    data: BiddingPlan
}

interface ModalProps {
    modalType: "create" | "update";
    initialValues?: {
        biddingPlanID?: string,
        name?: string,
        sign?: string;
        packagePrice?: number;
        startTime?: string;
        finishTime?: string;
        from?: number;
        contractType?: number;
        duration?: number;
        bidder?: string;
        status?: number;
        prioripercentOfCompletedPackagety?: number;
        note?: string;
    }
    onConfirm?(): void
}