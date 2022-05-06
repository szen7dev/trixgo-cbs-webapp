import type {
    QueryParam,
    APIResponse,
    Company,
    Field2,
    File,
    EducationBackground,
    CertificateType,
    CertificateName,
    Position,
    ContractType
} from './commons';
import { User } from 'typings/user';

/**
 * SCHEMA
 */
export interface Contact {
    _id: string;
    type: 1 | 2 | 3 | 4 | 5 | 6; // mô tả ở: ContactDocumentPayload
    company?: Company | string;
    files?: File[] | string[];
    field2?: Field2 | string;
    educationalBackground2?: EducationBackground | string;
    certificateType?: CertificateType | string;
    certificateName?: CertificateName | string;
    fromDate?: string;
    toDate?: string;
    number?: number;
    status?: number;
    certificateGrade?: number;
    userCreate?: string;
    workplace?: string;
    reference?: string;
    modifyAt?: string;
    createAt?: string;
    position2?: Position | string;
    contract?: ContractType | string;
    project?: string;
    client?: string;
    sign?: string;
    place?: string;
    store?: string;
    note?: string;
    name?: string;
    timeMobilize?: number;
    factor?: number;
}

/**
 * PARAMS LIST
 */
 export type ContactListParams = QueryParam & {
    // * Hồ sơ chi tiết nhân sự (phân các loại)
    // * 1. Lịch sử làm việc ở các đơn vị
    // * 2. Kinh nghiệm thực tế tham gia tại các Dự án
    // * 3. Lịch sử làm việc theo các Quyết định bổ nhiệm tại các hợp đồng (Chức vụ)
    // * 4. Trình độ học vấn + Chuyên ngành đào tạo
    // * 5. Bằng cấp chứng chỉ
    // * 6. Khác (Bảo hiểm xã hội, tài sản giao nhận, lịch sử tuyển dụng, quá trình làm việc, công tác)
    type?: 1 | 2 | 3 | 4 | 5 | 6;
    companyID?: string;
    [record: string]: any;
}

/**
 * RESPONSE LIST
 */
export type ContactListResponse = APIResponse & {
    data: {
        listRecords: Contact[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

/**
 * PARAMS INFO
 */
export type ContactInfoParams = Partial<{
    contactID: string;
    select?: string;
    populates?: string;
}>

/**
 * RESPONSE INFO
 */
export type ContactInfoResponse = APIResponse & {
    data: Contact;
}