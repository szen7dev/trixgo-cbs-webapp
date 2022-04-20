import { User } from 'typings/user';
import type { QueryParam, APIResponse, Company } from '../common';

/**
 * SCHEMA
 */
export type Account = {
    _id: string;
    name: string;
    description: string;
    type: number;
    level: number;
    status: number;
    company: Company;
    userCreate: User;
}

/**
 * PAYLOAD INSERT
 */
export type AccountInsertPayload = {
    name: string;
    sign?: string;
    note?: string;
    openingBalance?: number;
    arising?: number;
    closingBalance?: number;
}

/**
 * PAYLOAD UPDATE
 */
export type AccountUpdatePayload = {
    accountID: string;
    name?: string;
    description?: string;
}

/**
 * PAYLOAD DELETE MANY
 */
export type AccountDeleteManyPayload = {
    accountsID: string[]
}

/**
 * PARAMS LIST
 */
export type AccountListParams = QueryParam & {
    parentID?: string;
    companyID?: string;
}

/**
 * RESPONSE LIST
 */
export type AccountListResponse = APIResponse & {
    data: {
        listRecords: Account[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

/**
 * PARAMS INFO
 */
export type AccountInfoParams = {
    accountID: string;
    select?: string;
    populates?: string;
}

/**
 * RESPONSE INFO
 */
export type AccountInfoResponse = APIResponse & {
    data: Account;
}