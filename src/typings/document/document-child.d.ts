import type { APIResponse } from './commons';

export interface DocumentProps extends Omit<DocumentChildInserPayload, 'parentID' | 'departmentID' | 'packageID' |'senderID' | 'receiverID' | 'propertyID' | 'fieldID' |'storageID'> {
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

export interface DocumentChildInserPayload {
    "parentID": string;
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

export interface DocumentChildInserResponse extends APIResponse {
    data: DocumentProps
}

export interface DocumentChildUpdatePayload extends Omit<DocumentChildInserPayload, 'parentID'> {
    "documentID": string;
}

export interface DocumentChildUpdateResponse extends APIResponse {
    data: DocumentProps & {
        property: string;
        sender: string;
        receiver: string;
        userUpdate: string;
    }
}