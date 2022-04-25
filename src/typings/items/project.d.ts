import type { QueryParam, Company, FileProps } from 'typings/common';
import { User } from 'typings/user';

/**
 * SCHEMA PROJECT
 */
export type Project = {
    _id: string;
    name: string;
    sign: string;
    description?: string;
    image?: string;
    company: Company;
    actualStartTime: string;
    actualFinishTime: string;
    numberFinishOfDocs: number;
    admins: string[];
    members: string[];
    pm: User;
    startTime: string;
    expiredTime: string;
    stage: number;
    assistant: User;
    completedMilestones: number;
    milestones: number;
    photos: Array<FileProps>,
    // Pre-calculate
    budget: number;
    vatBudget: number;
    forecastBudget: number;
    vatForecastBudget: number;
    contractValue: number;
    contractVatValue: number;
    contractPlus: number;
    contractVatPlus: number;
    contractAdvancePaymentPaid: number;
    contractProduce: number;
    contractVatProduce: number;
    contractAcceptance: number;
    contractVatAcceptance: number;
    contractPlusAcceptance: number;
    contractVatPlusAcceptance: number;
    contractAmountPaid: number;
    contractRemainingPayment: number;
    numberOfContact: number;
    numberOfMoms: number;
    numberOfDocs: number;
    numberOfDrawings: number;
    numberOfReports: number;
    numberOfIpcs: number;
    numberOfPackage: number;
    numberOfRfis: number;
    numberOfSubmitals: number;
    numberOfPunchLists: number;
    numberOfPhotos: number;
    numberOfInspections: number;
}

export type ProjectListPayload = QueryParam & {
    type: 1 | 2; // 1: "Phòng Ban", 2: "Dự án"
    companyID?: string;
}

export type ProjectListResponse = APIResponse & {
    data: {
        listRecords: Project[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

export type ProjectInfoPayload = QueryParam & {
    departmentID: string;
    select?: string;
    populates?: string
}

export type ProjectInfoResponse = APIResponse & {
    data: Project;
}

/**
 * PARAMS LIST PROJECT IS MEMBER
 */
 export type ProjectUserIsMemberParams = {
    type?: string;
    companyID?: string;
    isBudget?: string;
    limit?: string;
    lastestID?: string;
    keyword?: string;
    limit?: string;
    select?: string;
    populates?: string;
}
