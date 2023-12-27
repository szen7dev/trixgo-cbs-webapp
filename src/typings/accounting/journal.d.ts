import type { APIResponse, QueryParam } from './commons';

export interface DocumentProps extends Omit<DocumentInserPayload, 'parentID' | 'departmentID' | 'packageID' |'senderID' | 'receiverID' | 'propertyID' | 'fieldID' |'storageID'> {
    _id: string;
    voucher?: {
        _id: string;
        name: string;
        sign: string;
        type: number;
        date: string;
    }
    debit?: {
        _id: string;
        name: string;
        description: string;
    }
    credit?: {
        _id: string;
        name: string;
        description: string;
    }
    customerDebit?: {
        _id: string;
        name: string;
    }
    customerCredit?: {
        _id: string;
        name: string;
    }
    amount: number;
    contract?: {
        _id: string;
        name: string;
        sign: string;
    }
    goods?: {
        _id: string;
        name: string;
        unit: string;
    }
    warehouse?: {
        _id: string;
        name: string;
    }
    budgetWork?: {
        _id: string;
        name: string;
    }
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
        isParent?: string;
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