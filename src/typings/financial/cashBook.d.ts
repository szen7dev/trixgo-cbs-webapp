import { Contract } from 'typings/cmcs';
import { Account } from 'typings/items/account';
import { Contact } from 'typings/items/contact';
import { User } from 'typings/user';
import type { QueryParam, APIResponse } from '../common';

/**
 * SCHEMA
 */
export type CashBook = {
    _id: string;
    name: string;
    sign: string;
    note: string;
    date: string;
    income: number;
    expense: number;
    previousInventory?: number;
    openingBalance: number;
    arising: number;
    closingBalance: number;
    contract: Contract;
    customer: Contact;
    account: Account;
    members: User[];
    userCreate: User;
    modifyAt: string;
    createAt: string;
    message?: string
}

/**
 * PAYLOAD INSERT
 */
export type CashBookInsertPayload = {
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
export type CashBookUpdatePayload = {
    cashBookID: string;
    name?: string;
    sign?: string;
    note?: string;
}

/**
 * PAYLOAD DELETE MANY
 */
export type CashBookDeleteManyPayload = {
    cashBooksID: string[]
}

/**
 * PARAMS LIST
 */
export type CashBookListParams = QueryParam & {
    parentID?: string;
    accountID?: string;
    customerID?: string;
    contractID?: string;
}

/**
 * RESPONSE LIST
 */
export type CashBookListResponse = APIResponse & {
    data: {
        listRecords: CashBook[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

/**
 * PARAMS INFO
 */
export type CashBookInfoParams = {
    cashBookID: string;
    select?: string;
    populates?: string;
}

/**
 * RESPONSE INFO
 */
export type CashBookInfoResponse = APIResponse & {
    data: CashBook;
}