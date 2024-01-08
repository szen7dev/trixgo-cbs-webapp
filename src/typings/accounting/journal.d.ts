import type { APIResponse, QueryParam } from './commons';

export interface DocumentProps extends Omit<DocumentInserPayload, 'parentID' | 'departmentID' | 'packageID' |'senderID' | 'receiverID' | 'propertyID' | 'fieldID' |'storageID'> {
    _id: string;
    date: string;
    sign: string;
    signInvoice: string;
    dateInvoice: string;
    commodity: string;
    revenue: string;
    tax: string;
    forward: number;
    cancel: number;
    quantity: number;
    unitprice: number;
    createAt: string;
    linkFunda?: {
        _id: string;
        name: string;
    }
    linkVoucher?: {
        _id: string;
        name: string;
    }
    funda?: {
        _id: string;
        name: string;
    }
    userCreate?: {
        _id: string;
        fullname: string;
    }
    userUpdate?: {
        _id: string;
        fullname: string;
    }
    voucher?: {
        _id: string;
        name: string;
        sign: string;
        signInvoice: string;
        type: number;
        date: string;
        dateInvoice: string;
        address: string;
    }
    customer?: {
        _id: string;
        name: string;
        sign: string;
        phone: string;
        taxid: string;
        address: string;
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
    subtype?: {
        _id: string;
        name: string;
        sign: string;
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