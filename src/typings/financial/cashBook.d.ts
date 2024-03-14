import { Contract } from 'typings/cmcs';
import { Account } from 'typings/items/account';
import { Contact } from 'typings/items/contact';
import { User } from 'typings/user';
import type { QueryParam, APIResponse, Company } from '../common';

/**
 * SCHEMA
 */
export type CashBook = {
    _id: string;
    name: string;
    sign: string;
    note: string;
    date: string;
    active: number;
    income: number;
    expense: number;
    previousInventory?: number;
    openingBalance: number;
    arising: number;
    closingBalance: number;
    company: Company | string;
    contract: Contract;
    customer: Contact;
    account: Account;
    admins: User[];
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

/**
 * PARAMS AMOUNT INCOME EXPENSE BY PARENT
 */
export type CashBookAmountIncomeExpenseParams = APIResponse & {
    parentID: string;
}

/**
 * RESPONSE AMOUNT INCOME EXPENSE BY PARENT
 */
export type CashBookAmountIncomeExpenseResponse = APIResponse & {
    data: {
        income: number;
        expense: number;
    };
}

/**
 * SCHEMA AMOUNT BY PROPERTY
 */
export interface CashBookAmountByProperty {
    _id: {
        account?: {
            _id: string;
            name: string;
            description: string;
        },
        company?: string;
    },
    income: number;
    expense: number;
    date: string
}

/**
 * PARAMS AMOUNT BY PROPERTY
 */
export type CashBookAmountByPropertyParams = {
    option?: string;
    parentID?: string;
    year?: string
}

/**
 * RESPONSE AMOUNT BY PROPERTY
 */
export type CashBookAmountByPropertyResponse = APIResponse & {
    data: CashBookAmountByProperty[];
}

/**
 * EXCEL
 */
export type CashBookDownloadPayload = {
    parentID?: string;
    option?: string;
}

export type CashBookImportPayload = {
    option?: string;
    parentID?: string;
    dataImport: string;
}

export type CashBookExportManyPayload = {
    parentID?: string;
    option?: string;
    fromDate?: any;
    toDate?: any;
}