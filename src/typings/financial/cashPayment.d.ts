import { Contact } from 'typings/items/contact';
import { User } from 'typings/user';
import type { QueryParam, APIResponse, Company } from '../common';

export type CashPayment = {
    _id: string;
    name: string;
    sign: string;
    note: string;
    date: string;
    active: number;
    amount: number;
    company: Company | string;
    customer: Contact;
    admins: User[];
    members: User[];
    userCreate: User;
    modifyAt: string;
    createAt: string;
    message?: string;
    map: any;
}

export type CashPaymentInsertPayload = {
    name: string;
    note?: string;
    amount?: number;
}

export type CashPaymentUpdatePayload = {
    CashPaymentID: string;
    name: string;
    note?: string;
    amount?: number;
}

export type CashPaymentDeleteManyPayload = {
    cashPaymentsID: string[]
}

export type CashPaymentListParams = QueryParam & {
    customerID?: string;
}

export type CashPaymentInfoParams = {
    cashPaymentID: string;
    select?: string;
    populates?: string;
}

export type CashPaymentInfoResponse = APIResponse & {
    data: CashPayment;
}

export type CashPaymentListResponse = APIResponse & {
    data: {
        listRecords: CashPayment[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

export type CashPaymentDownloadPayload = {
    option?: string;
}

export type CashPaymentImportPayload = {
    dataImport: string;
}

export type CashPaymentExportManyPayload = {
    name: string;
    sign?: string;
    note?: string;
    amount?: number;
}