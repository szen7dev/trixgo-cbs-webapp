import type { APIResponse, QueryParam } from './commons';
import {Author, Project} from "../ppt";

export type { Document } from 'typings/ppt/Document';

export interface DocumentProps extends Omit<DocumentInserPayload, 'parentID' | 'departmentID' | 'packageID' |'senderID' | 'receiverID' | 'propertyID' | 'fieldID' |'storageID'> {
    _id: string;
    author?: Author;
    project: Project;
    name?: string;
    sign: string;
    image: string;
    sender?: {
        _id: string;
        name: string;
    };
    receiver?: {
        _id: string;
        name: string;
    };
    date?: string;
    receivedDate?: string;
    style?: string;
    direction?: number;
    storeSign?: {
        _id: string;
        name: string;
    };
    amount: number;
    status: string;
    note: string;
    storage: {
        _id: string;
        name: string;
    };
    createAt: string;
    updatedAt: string;
    userCreate?: Author;
    userUpdate?: Author;
    package?: {
        _id: string;
        name: string;
        sign: string;
        members: string[];
    };
    contract?: {
        _id: string;
        name: string;
    };
    field?: {
        _id: string;
        name: string;
    };
    datahubContact?: {
        _id: string;
        name: string;
    };
    property: {
        _id: string;
        name: string;
    },
    type?: number;
    amountDelivery?: number;
    requestResponse?: boolean;
    completeStatus?: number;
    expiredResponse?: string;
    approver?: string;
    value?: string;
    parent: {
        _id: string;
        name: string;
        sign: string;
    },
    amountDocumentChild?:number
}

interface DocumentInserPayload {
    "departmentID": string;
    "name": string;
    "sign": string;
    "storeSign": string;
    "approver": string;
    "date": string;
    "receivedDate": string;
    "style": string;
    "status": string;
    "amount": number;
    "amountDelivery": number;
    "requestResponse": number;
    "expiredResponse": string;
    "direction": number;
    "packageID": string;
    "senderID": string;
    "receiverID": string;
    "propertyID": string;
    "fieldID": string;
    "type": number;
    "storageID": string;
    "note": string;
    "description": string;
    "value": number;
    "completeStatus": number;
}
export interface DocumentInserPayload extends DocumentInserPayload {
    "parentID": string;
}

export interface DocumentInserResponse extends APIResponse {
    data: DocumentProps
}

export interface DocumentUpdatePayload extends Omit<DocumentInserPayload, 'parentID'> {
    "documentID": string;
}

export interface DocumentUpdateResponse extends APIResponse {
    data: DocumentProps & {
        property: string;
        sender: string;
        receiver: string;
        userUpdate: string;
    }
}

export interface DocumentQueryPayload extends QueryParam {
    params?: {
        datahubContact?: string;
        type?: string;
        contract?: string;
        fromDate?: string;
        toDate?: string;
        limit?: number|string;
        datahubContactID?: string;
        departmentID?: string;
        direction?: string;
        contractID?: string;
        datahubContactsID?: string[];
        types?: string[];
        departmentsID?: string[];
        directions?: string[];
        contractsID?: string[];
        keyword?: string;
        storageID?: string;
        storagesID?: string[];
    },
    isFetchList?: boolean;
}

export interface DocumentQueryResponse extends APIResponse {
    data: {
        listRecords: DocumentProps[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

export interface DocumentExportResponse extends APIResponse {
    data: String
}