import type { APIResponse, QueryParam } from './commons';

export type { Document } from 'typings/ppt/Document';

export interface DocumentProps extends Omit<DocumentInserPayload, 'parentID' | 'departmentID' | 'packageID' |'senderID' | 'receiverID' | 'propertyID' | 'fieldID' |'storageID'> {
    _id: string;
    parent: string;
    package: string;
    receiver: string;
    field: string;
    storage: string;
    modifyAt: string;
    createAt: string;
    createdAt: string;
    updatedAt: string;

    property?: string;
    sender?: string;
    receiver?: string;
    userUpdate?: string;
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