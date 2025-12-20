export interface ReceiptRecord {
  _id: string;
  name: string;
  note: string;
  date: string;
  amount: number;
  forward: number;
  type: number;
  status: number;
  account: string;
  modifyAt: string;
  userUpdate?: {
    _id: string;
    fullname: string;
    phone: string;
  };
  customer?: {
    _id: string;
    name: string;
    phone: string;
  };
  subtype?: {
    _id: string;
    name: string;
  };
  funda?: {
    _id: string;
    name: string;
    phone: string;
  };
}

export interface DropdownOption {
  id: string;
  text: string;
}

export interface AccountInfo {
  name: string;
  description: string;
  company: string;
}

export interface Contact {
  _id: string;
  name: string;
  phone?: string;
}

export interface ContactsResponse {
  listRecords: Contact[];
  limit: number;
  totalRecord: number;
  totalPage: number;
  nextCursor: string | null;
}

export interface SubType {
  _id: string;
  name: string;
}

export interface SubTypesResponse {
  listRecords: SubType[];
  limit: number;
  totalRecord: number;
  totalPage: number;
  nextCursor: string | null;
}

export interface Funda {
  _id: string;
  name: string;
  phone?: string;
}

export interface FundasResponse {
  listRecords: Funda[];
  limit: number;
  totalRecord: number;
  totalPage: number;
  nextCursor: string | null;
}

export type ReceiptStatus = "Hoàn thành" | "Hủy" | "Khởi tạo";
