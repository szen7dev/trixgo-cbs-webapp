import type { APIResponse, QueryParam } from './commons';
import {Author, Project} from "../ppt";
export interface HumanProps extends Omit<HumanInsertPayload, 'parentID' | 'departmentID' | 'packageID' |'senderID' | 'receiverID' | 'propertyID' | 'fieldID' |'storageID'> {
    _id: string;
    author?: Author;
    project: Project;
    name?: string;
    sign: string;
    image: string;
    phone: string;
    email: string;
    birthday: string;
    joinedDate: string;
    gender: number;
    support?: any;
    area?: any;
    area1?: any;
    area2?: any;
    contact?: any;
    contractType?: any;
    department?: any;
    workingStatus?: any;
    identity?: any;
    address?: any;
    taxid?: any;
    insuranceSign?: any;
    insuranceDate?: any;
    position?: any;
    contractDate?: any;
    linkUser?: any;
    note: string;
    // storage: {
    //     _id: string;
    //     name: string;
    // };
    createAt: string;
    updatedAt: string;
    userCreate?: Author;
    userUpdate?: Author;
    type?: number;
    parent: {
        _id: string;
        name: string;
        sign: string;
        phone: string;
    },
    amountHumanChild?:number;
    place: any;
    fromDate: any;
    toDate: any;
    joinedDate: any;
    dataSource: any;
    files: any;
    educationalBackground2: any;
    field2: any;
    certificateType: any;
    certificateName: any;
    certificateGrade: any;
}

interface HumanInsertPayload {
    "departmentID": string;
    "name": string;
    "sign": string;
    "storeSign": string;
    "approver": string;
    "date": string;
    "receivedDate": string;
    "style": string;
    "status": number;
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
export interface HumanInsertPayload extends HumanInsertPayload {
    "parentID": string;
}
export interface HumanInsertResponse extends APIResponse {
    data: HumanProps
}
export interface HumanUpdatePayload extends Omit<HumanInsertPayload, 'parentID'> {
    "HumanID": string;
}
export interface HumanUpdateResponse extends APIResponse {
    data: HumanProps & {
        property: string;
        sender: string;
        receiver: string;
        userUpdate: string;
    }
}
export interface HumanQueryPayload extends QueryParam {
    params?: {
        populates?: any;
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
        genders?: string[];
        statuss?: string[];
        departmentsID?: string[];
        supportsID?: string[];
        directions?: string[];
        contractsID?: string[];
        keyword?: string;
        storageID?: string;
        storagesID?: string[];
        isParent?: string;
        phone?: string;
    },
    isFetchList?: boolean;
}
export interface HumanQueryResponse extends APIResponse {
    data: {
        listRecords: HumanProps[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
        lastestID: string | null;
    }
}
export interface HumanExportResponse extends APIResponse {
    data: String
}