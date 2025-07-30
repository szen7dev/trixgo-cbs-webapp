import { QueryParams } from "./common";
import { APIResponse } from "./apis/response";
import { User } from "./user";
import { Funda } from "./items/funda";
import { Project } from "./items/project";
import { Warehouse } from "./items/warehouse";
import { Contact } from "./items/contact";
import { Goods } from "./items/goods";
import { Contract } from "./items/contract";
import { Doctype } from "./items/doctype";

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
  signatures?: any;
  admins: User[];
  members: User[];
  userCreate: User;
  userUpdate: User;
  state: 1;
  name: string;
  assignee: User;
  funda: Funda;
  channel: Doctype;
  project: Project;
  package: Project;
  toPackage: Project;
  warehouse: Warehouse;
  customer: Contact;
  contract: Contract;
  note: string;
  sign: string;
  link: Contract;
  createAt: string;
  modifyAt: string;
  date: string;
  toDate?: string;
  convertFactor: number;
  forward: number;
  budgetWork: strinstring | null;
  files: any;
  referrer: Contact;
  salesLeader: Contact;
  sales: Contact;
  seller: Contact;
  affiliate: Contact;
  customerCare: Contact;
  lot: Contact;
};

export type ListStorePayload = QueryParams & {
  lotID?: string;
};

export type QueryStoreParentResponse = APIResponse & {
  data: {
    listRecords: StoreChild[];
    limit: number;
    totalRecord: number;
    totalPage: number;
    nextCursor: string | null;
  };
};

export type QueryDetailStoreParentResponse = APIResponse & {
  data: StoreParent;
};

export type InsertStoreParentPayload = {
  funda: Funda;
  project: Project;
  package: Project;
  toPackage: Project;
  assignee: User;
  warehouse: Warehouse;
  contract: Contract;
  customer: Contact;
  referrer: Contact;
  salesLeader: Contact;
  sales: Contact;
  seller: Contact;
  affiliate: Contact;
  customerCare: Contact;
  lot: Contact;
  link: Contract;
  outin: number;
  type: number;
  name: string;
  note: string;
  sign: string;
  date: string;
  toDate?: string;
  convertFactor: number;
  status: number;
  forward: number;
};

export type InsertStoreParentResponse = {
  error: boolean;
  data: StoreParent & {
    assignee: string;
    project: string;
    warehouse: string;
    customer: string;
    message?: string;
  };
};

export type UpdateStoreParentPayload = {
  lotID: string;
  filesID?: string[];
  cashBookID?: string;
  members?: string[];
  membersRemove?: string[];
  admins?: string[];
  adminsRemove?: string[];
  isAddSignature?: boolean;
};

export type UpdateStoreParentResponse = InsertStoreParentResponse;

export type DeleteStoreParentPayload = {
  cashBookID: string;
};

export type DeleteStoreParentResponse = APIResponse & {
  data: StoreParent & {
    assignee: string;
    project: string;
    warehouse: string;
    customer: string;
  };
};

/**
 * CHILD/PRODUCT
 */
export type StoreChild = {
  _id: string;
  outin: number;
  type: number;
  quantity: number;
  weight: number;
  unitPrice: number;
  amount: number;
  status: number;
  forward: number;
  subtype: any | null;
  timeApproved: string | null;
  author: User;
  admins: User[];
  members: User[];
  state: 1;
  name: string;
  date: string;
  toDate?: string;
  parent?: StoreParent;
  assignee?: User;
  project?: Project;
  warehouse?: Warehouse;
  contract?: Contract;
  customer?: Contact;
  goods?: Goods;
  parentGoods?: Goods;
  account?: any;
  contra?: any;
  funda?: any;
  assets?: Goods;
  work: strinstring | null;
  budgetWork: strinstring | null;
  note?: string;
  sign?: string;
  createAt?: string | null;
  modifyAt?: string | null;
  userCreate?: any;
  userUpdate?: any | null;
  map?: any;
  checked: number;
  history: string;
};

export type QueryListStoreChildPayload = QueryParams & {
  parentID: string;
};

export type QueryStoreChildResponse = APIResponse & {
  data: {
    listRecords: StoreChild[];
    limit: number;
    totalRecord: number;
    totalPage: number;
    nextCursor: string | null;
  };
};

export type QueryDetailStoreChildResponse = APIResponse & {
  data: StoreChild;
};

export type InsertStoreChildPayload = {
  name: string;
  lotID: string;
};

export type InsertStoreChildResponse = {
  error: boolean;
  data: StoreChild & {
    assignee?: string;
    project: string;
  };
};

export type UpdateStoreChildPayload = {
  cashBookID: string;
  assigneeID?: string;
  projectID?: string;
  warehouseID?: string;
  contractID?: string;
  customerID?: string;
  name?: string;
  date?: string;
  toDate?: string;
  status?: string;
  forward?: string;
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
};

export type DeleteStoreChildPayload = {
  cashBookID: string;
};

export type DeleteStoreChildResponse = APIResponse & {
  data: StoreChild & {
    assignee: string;
    project: string;
    warehouse: string;
    customer: string;
  };
};

export type UpdateStoreChildResponse = InsertStoreChildResponse;