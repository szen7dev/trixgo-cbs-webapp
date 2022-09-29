// Khai báo kiểu dữ liệu chung trả về từ tất cả các API
import { APIResponse } from "./apis/response";
import {QueryParam} from "./document/commons";

// Kiểu dữ liệu từ client truyền lên server để lấy data API
export type ListContractsPayload = {
  filter?: string; // Sau thay bằng Select (tương đương với kiểu Select)
  select?: string;
  populates?: string;
  limit?: number; // Sau bỏ => Khống chế ở Backend
  outin?: number;
  keyword?: string;
  projectID?: string;
  companyID?: string;
  lastestID?: string;
  contractID?: string;
  expenseID?: any;
};

export type ListByFilterContractsPayload = {
  lastestID?: string;
  projectsID?: string[];
  fromDate?: string;
  toDate?: string;
  buyerInfosID?: string[];
  sellerInfosID?: string[];
  statuss?: string[];
  ontimes?: string[];
  onbudgets?: string[];
  keyword?: string;
};

export type ListAccessByContractPayload = {
  keyword?: string;
  lastestID?: string;
  option?: 1|2;
}

// Kiểu dữ liệu của Danh sách/Info
export type Contract = {
  _id: string;
  name: string,
  sign: string,
  date: string,
  storeSign: string,
  description: string,
  company: string,
  sellerInfo: {
    _id: string,
    name: string,
  },
  project: {
    _id: string,
    name: string,
    sign: string
  },
  budget: number,
  vatBudget: number,
  value: number,
  vatValue: number,
  plus: number,
  vatPlus: number,
  advancePayment: number,
  produce: number,
  vatProduce: number,
  plusProduce: number,
  vatPlusProduce: number,
  acceptance: number,
  vatAcceptance: number,
  plusAcceptance: number,
  vatPlusAcceptance: number,
  advancePaymentPaid: number,
  amountPaid: number,
  remainingPayment: number,
  recommendedPayment: number,
  status: number
};

// Kiểu dữ liệu trả về
export type ListContractsResponse = APIResponse & {
  data: {
    listRecords: Array<Contract>;
    totalRecord: number;
    totalPage?: number;
    nextCursor: string;
  };
};

export type ListContractsByFilterResponse = APIResponse & {
  data: {
    listRecords: Array<Contract>;
    totalRecord: number;
    totalPage?: number;
    nextCursor: string;
  };
};

export type ListAccessByContractsResponse = APIResponse & {
  data: {
    listRecords: Array<{
      _id: string,
      company: {
        _id: string;
        name: string;
        sign: string;
        [key: string] : any;
      };
      name: string;
      sign: string|null;
      [key: string] : any;
    }>;
    totalRecord: number;
    totalPage?: number;
    nextCursor: string;
  };
};

export type InfoContractResponse = APIResponse & {
  data: Contract
};

// Kiểu dữ liệu Info
export type InfoContractPayload = {
  contractID: string;
  populates?: string;
  select?: string;
};

// Kiểu dữ liệu của Insert
export type InsertContractPayload = {
  company: string;
  project: string;
  parent: string;
  level: string;
  admins: string;
  members: string;
  draft: number;
  outIn: number;
  status: number;
  real: number;
  subType: number;
  type: number;
  name: string;
  sign: string;
  storeSign: string;
  description: string;
  note: string;
  notenumber: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  buyerInfo: string;
  buyerBank: string;
  sellerInfo: string;
  sellerBank: string;
  packageName: string;
  lock: number;
  value: number;
  vatValue: number;
  plus: number;
  vatPlus: number;
  advancePayment: number;
  produce: number;
  vatProduce: number;
  plusProduce: number;
  vatPlusProduce: number;
  acceptance: number;
  vatAcceptance: number;
  plusAcceptance: number;
  vatPlusAcceptance: number;
  retainedValue: number;
  advancePaymentDeduction: number;
  otherDeduction: number;
  recommendedPayment: number;
  advancePaymentPaid: number;
  amountPaid: number;
  remainingPayment: number;
  advancePaymentOverage: number;
  finalValue: number;
  budget: number;
  vatBudget: number;
  forecastBudget: number;
  forecastVatBudget: number;
  managementFee: number;
  subcontractFee: number;
  expenses: number;
  profit: number;
  cgValue: number;
  expiredCg: Date;
  agValue: number;
  expiredAg: Date;
};

// Kiểu dữ liệu của Update
export type UpdateContractPayload = {
  contractID: string;
  company: string;
  project: string;
  parent: string;
  level: string;
  admins: string;
  members: string;
  draft: number;
  outIn: number;
  status: number;
  real: number;
  subType: number;
  type: number;
  name: string;
  sign: string;
  storeSign: string;
  description: string;
  note: string;
  notenumber: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  buyerInfo: string;
  buyerBank: string;
  sellerInfo: string;
  sellerBank: string;
  packageName: string;
  lock: number;
  value: number;
  vatValue: number;
  plus: number;
  vatPlus: number;
  advancePayment: number;
  produce: number;
  vatProduce: number;
  plusProduce: number;
  vatPlusProduce: number;
  acceptance: number;
  vatAcceptance: number;
  plusAcceptance: number;
  vatPlusAcceptance: number;
  retainedValue: number;
  advancePaymentDeduction: number;
  otherDeduction: number;
  recommendedPayment: number;
  advancePaymentPaid: number;
  amountPaid: number;
  remainingPayment: number;
  advancePaymentOverage: number;
  finalValue: number;
  budget: number;
  vatBudget: number;
  forecastBudget: number;
  forecastVatBudget: number;
  managementFee: number;
  subcontractFee: number;
  expenses: number;
  profit: number;
  cgValue: number;
  expiredCg: Date;
  agValue: number;
  expiredAg: Date;
};

export type DeleteContractPayload = {
  contractID: string;
};

export type DeleteMultiContractPayload = {
  contractsID: Array<string>;
};

export interface CmcsListByFilterQueryPayload extends QueryParam {
  params?: ListByFilterContractsPayload,
  isFetchList?: boolean;
}

export interface CmcsListAccessByContractQueryPayload extends QueryParam {
  params?: ListAccessByContractPayload,
  isFetchList?: boolean;
}