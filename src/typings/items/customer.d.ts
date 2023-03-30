import type { QueryParam, APIResponse } from './commons';

export interface Customer {
    _id: string;
    modifyAt: string;
    parent: {
        _id: string,
        name: string,
    };
    type: string;
    name: string;
    fullname: string;
    address: string;
    note: string;
    taxid: string | null;
    phone: string | null;
    description: string | null;
    funda: any,
    gender: number;
    birthday: string;
    nonResident: string;
    // purchasedValue: number | null | undefined;
    // purchasedOffValue: number | null | undefined;
    // totalLoyaltyPoints: number | null | undefined;
    // usedLoyaltyPoints: number | null | undefined;
    // remainLoyaltyPoints: number | null | undefined;

    purchasedValue: string | null;
    purchasedOffValue: string | null;
    totalLoyaltyPoints: string | null;
    usedLoyaltyPoints: string | null;
    remainLoyaltyPoints: string | null;
}

export type CustomerQueryPayload = QueryParam & {
    companyID?: string;
    contactID?: string;
    isListParentOrListChilds?: string;
    parentID?: string;
};

export type CustomerQueryResponse = APIResponse & {
    data: {
        listRecords: Customer[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}

export type CustomerQueryDetailResponse = APIResponse & {
    data: Customer
}

interface ModalProps {
    modalType: "create" | "update";
    initialValues?: {
        contactID: string,
        parent: string,
        type: string,
        name: string,
        address: string,
        taxid: string,
        phone: string,
        gender: number,
        description: string,
        birthday: string,
        note: string,
        nonResident: string,
        funda: any,
    }
    onConfirm?(): void
}
export interface CustomerExportResponse extends APIResponse {
    data: String
}