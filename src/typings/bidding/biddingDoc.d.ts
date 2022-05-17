import { Contract } from 'typings/cmcs';
import { Project } from 'typings/items/project';
import { User } from 'typings/user';
import type { QueryParam, APIResponse } from './commons';

export interface BiddingDoc {
    _id: string;
    field: string;
    area: string;
    client: string;
    project: Project;
    contract: Contract;
    plan: string;
    admins: User[];
    members: User[];
    parent: string;
    name: string;
    sign: string;
    note: string;
    releaseTime: string;
    closingTime: string;
    amount: number;
    factor3: number;
    factor1: number;
    factor2: number;
    factor4: number;
    factor5: number;
    vat: number;
    vatValue: number;
    bidder: string;
    tenderPrice: number;
    vatTenderPrice: number;
    companyOfAssignee: string;
    assignee: string;
    timeApproved: string,
    agreeStatus: number,
    bidPrice: number;
    bidPrice: number;
    bidPriceDiscount: number;
    bidPriceAdjustment: number;
    bidOpeners: string;
    openedUsers: string;
    openedStatus: string;
    userCreate: string;
    userUpdate: string;
}

export type BiddingDocInfoPayload = {
    biddingDocID?: string;
    select?: string;
    populates?: string;
};

export type BiddingDocQueryPayload = QueryParam & {
    planID?: string;
    biddingDocID?: string;
};

export type BiddingDocQueryResponse = APIResponse & {
    data: {
        listRecords: BiddingDoc[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

export type BiddingDocQueryDetailResponse = APIResponse & {
    data: BiddingDoc
}

interface ModalProps {
    modalType: "create" | "update";
    initialValues?: {
        biddingDocID?: string,
        name?: string,
        sign?: string;
        note?: string;

        releaseTime?: string;
        closingTime?: string;
        amount?: string;
        factor1?: number;
        factor2?: number;
        factor3?: number;
        factor4?: number;
        factor5?: number;
        vat?: number;
    }
    onConfirm?(): void
}