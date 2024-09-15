import { QueryParams } from "./common";
import { APIResponse } from "./apis/response";
import { User } from "./user";
import { Project } from "./items/project";
import { Warehouse } from "./items/warehouse";
import { Contact } from "./items/contact";
import { Goods } from "./items/goods";

export type StoreParent = {
    _id: string;
    outin: number;
    type: number;
    quantity: number;
    unitPrice: number;
    amount: number;
    status: number;
    timeApproved: string | null;
    author: User;
    admins: User[];
    members: User[];
    userCreate: User;
    userUpdate: User;
    state: 1;
    name: string;
    assignee: User;
    project: Project;
    warehouse: Warehouse;
    customer: Contact;
    note: string;
    sign: string;
    createAt: string;
    modifyAt: string;
    date: string;
    convertFactor: number;
}

export type ListStorePayload = QueryParams & {
    cashBookID?: string;
};

export type QueryStoreParentResponse = APIResponse & {
    data: {
        listRecords: StoreParent[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    };
}

export type QueryDetailStoreParentResponse = APIResponse & {
    data: StoreParent;
}

export type InsertStoreParentPayload = {
    project: Project;
    assignee: User;
    warehouse: Warehouse;
    customer: Contact;
    outin: number;
    type: number;
    name: string;
    note: string;
    sign: string;
    date: string;
    convertFactor: number;
}

export type InsertStoreParentResponse = {
    error: boolean;
    data: StoreParent & {
        assignee: string;
        project: string;
        warehouse: string;
        customer: string;
        message?: string;
    }
}

export type UpdateStoreParentPayload = {
    cashBookID: string;
    members?: string[];
    membersRemove?: string[];
    admins?: string[];
    adminsRemove?: string[];
}

export type UpdateStoreParentResponse = InsertStoreParentResponse;

export type DeleteStoreParentPayload = {
    cashBookID: string;
}

export type DeleteStoreParentResponse = APIResponse & {
    data: StoreParent & {
        assignee: string;
        project: string;
        warehouse: string;
        customer: string;
    }
}

/**
 * CHILD/PRODUCT
 */
export type StoreChild = {
    _id: string;
    outin: number;
    type: number;
    quantity: number;
    unitPrice: number;
    amount: number;
    status: number;
    subtype: any | null
    timeApproved: string | null;
    author: User;
    admins: User[];
    members: User[];
    state: 1;
    name: string;
    date: string;
    parent?: StoreParent;
    assignee?: User
    project?: Project
    warehouse?: Warehouse
    customer?: Contact
    goods?: Goods
    assets?: Goods
    work: strinstring | null
    note?: string
    sign?: string
    createAt?: string | null
    modifyAt?: string | null
    userCreate?: any
    userUpdate?: any | null
    map?: any
}

export type QueryListStoreChildPayload = QueryParams & {
    parentID: string;
}

export type QueryStoreChildResponse = APIResponse & {
    data: {
        listRecords: StoreChild[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    };
}

export type QueryStoreChildResponse = APIResponse & {
    data: {
        listRecords: StoreChild[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    };
}

export type QueryDetailStoreChildResponse = APIResponse & {
    data: StoreChild;
}

export type InsertStoreChildPayload = {
    name: string;
    orderID: string;
}

export type InsertStoreChildResponse = {
    error: boolean;
    data: StoreChild & {
        assignee?: string;
        project: string;
    }
}

export type UpdateStoreChildPayload = {
    cashBookID: string;
    assigneeID?: string;
    projectID?: string;
    warehouseID?: string;
    customerID?: string;
    name?: string;
    date?: string;
    status?: string;
    quantity?: string;
    unitPrice?: string;
    amount?: string;
    assignee?: string;
    note?: string;
    sign?: string;
    members?: string[];
    membersRemove?: string[];
    admins?: string[];
    adminsRemove?: string[];
}

export type DeleteStoreChildPayload = {
    cashBookID: string;
}

export type DeleteStoreChildResponse = APIResponse & {
    data: StoreChild & {
        assignee: string;
        project: string;
        warehouse: string;
        customer: string;
    }
}

export type UpdateStoreChildResponse = InsertStoreChildResponse;