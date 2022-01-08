type APIResponse = {
    error?: boolean;
    status?: number;
}

type Company = {
    name: string;
    sign: string;
    _id: string;
}

type Position = {
    _id: string;
    name: string;
    description?: string;
    parent?: {
        _id: string;
        level: number;
        name: string;
    };
}

export type Area = {
    name: string;
    _id: string;
    sign: string;
    level: number;
    parent?: Area
}

type Workplace = {
    name: string;
    _id: string;
    sign: string;
}

type EducationBackground = {
    name: string;
    _id: string;
}

type Major = {
    name: string;
    _id: string;
}

type Other = {
    name: string;
    _id: string;
}

type Contact = {
    _id: string;
    name: string;
    sign: string;
}

type File = {
    name: string;
    size: number;
    _id: string;
    url: string;
    createAt: string;
    userCreate: {
        fullname: string;
    }
}

type WorkingStatus = {
    name: string;
    _id: string;
}

type ContractType = {
    name: string;
    _id: string;
    sign?: string;
    project?: {
        projectType: number;
        buildingGrade: number;
    };
}

/**
 * Lĩnh vực chuyên môn
 * Chuyên ngành đào tạo
*/
type Field2 = {
    name: string;
    _id: string;
}

type CertificateType = {
    name: string;
    _id: string;
}

type CertificateName = {
    name: string;
    _id: string;
}

type CertificateGrade = {
    name: string;
    _id: string;
}

export type Doctype = {
    _id: string;
    name: string;
    type: number;
}

export type Department = {
    name: string;
    sign: string;
    _id: string;
    description?: string;
}

export type Human = {
    type?: number;
    company?: Company;
    position?: Position;
    department?: Department;
    area2?: Area;
    area1?: Area;
    area?: Area;
    workplace?: Workplace[];
    educationalBackground?: EducationBackground[];
    major?: Major[];
    other?: Other;
    workingStatus?: WorkingStatus;
    contractType?: ContractType;
    _id?: string;
    image?: string;
    name?: string;
    createAt?: Date;
    phone?: string;
    sign?: string;
    email?: string;
    gender?: number;
    realStatus?: number;
    birthday?: string;
    identity?: string;
    address?: string;
    dateProvice?: string;
    description?: string;
    place?: string;
    taxid?: string;
    insuranceDate?: string;
    insuranceNumber?: string;
    insuranceStatus?: number;
    insuranceSign?: number;
    sallaryBasic?: number;
    sallarySubFactor?: string;
    sallaryFactor?: string;
    workStartDate?: string;
    contractSign?: string;
    dayOff?: string;
    contractDate?: string;
    contractValid?: string;
    contractExpire?: string;
    appointDate?: string;
    changeSallaryDate?: string;
    familyPolicy?: number;
    family?: string;
    signerIn?: string;
    signerOut?: string;
    insuanceDate?: string;
}

type Populate = {
    path?: string;
    select?: string;
    populate?: Populate
}

export interface HumanPayload {
    lastestID?: string | undefined,
    limit?: number;
    contactID?: string;
    populates?: Populate;
}

export type ListHumanResponse = APIResponse & {
    data?: {
        listRecords?: Human[];
        limit?: number;
        totalRecord?: number;
        totalPages?: number;
        nextCursor?: string;
    }
}

export type HumanInfo = APIResponse & {
    data: Human
}

export interface ContactDocument {
    company: Company;
    files: File[];
    field2: Field2;
    educationalBackground2: EducationBackground;
    certificateType: CertificateType;
    certificateName: CertificateName;
    _id: string;
    type: 1 | 2 | 3 | 4 | 5 | 6; // mô tả ở: ContactDocumentPayload
    fromDate: string;
    toDate: string;
    number: number;
    status: number;
    certificateGrade: number;
    userCreate: string;
    workplace: string;
    reference: string;
    modifyAt: string;listRecords
    createAt: string;
    position2: Position;
    contract: ContractType;
    project: string;
    client: string;
    sign: string;
    place: string;
    store: string;
    note: string;
    name: string;
    timeMobilize: number;
    factor: number;
}

export type ContactDocumentResponse = APIResponse & {
    data: {
        listRecords: ContactDocument[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}

export type ContactDocumentPayload = HumanPayload & {
    // * Hồ sơ chi tiết nhân sự (phân các loại)
    // * 1. Lịch sử làm việc ở các đơn vị
    // * 2. Kinh nghiệm thực tế tham gia tại các Dự án
    // * 3. Lịch sử làm việc theo các Quyết định bổ nhiệm tại các hợp đồng (Chức vụ)
    // * 4. Trình độ học vấn + Chuyên ngành đào tạo
    // * 5. Bằng cấp chứng chỉ
    // * 6. Khác (Bảo hiểm xã hội, tài sản giao nhận, lịch sử tuyển dụng, quá trình làm việc, công tác)
    type: 1 | 2 | 3 | 4 | 5 | 6;
}

export type DepartmentPayload = {
    limit: number;
    lastestID: string;
    type: 1 | 2; //  1: "Phòng Ban", 2: "Dự án" 
    keyword?: string;
}

export type DepartmentResponse = APIResponse & {
    data: {
        listRecords: Department[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}

export type PositionPayload = {
    limit: number;
    lastestID: string;
    keyword?: string; // for search query
}

export type PositionResponse = APIResponse & {
    data: {
        listRecords: Position[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}

export type DoctypePayload = {
    // 1 - Văn Bản Lĩnh vực hồ sơ
    // 2 - Văn Bản Tính chất hồ sơ
    // 3 - Lĩnh vực kinh doanh
    // 4 - Khách hàng phân loại
    // 5 - Công việc, Phân loại khác
    // 6 - Nhân sự, Trình độ
    // 7 - Nhân sự, Chuyên ngành
    // 8 - Nhận sự, Loại HDLD
    // 9 - Nhân sự tình trạng làm việc
    // 10 - Nhân sự Thâm niên
    // 11 - CRM, Phân loại lao động
    // 12 - CRM - Hồ sơ chi tiết của giai đoạn
    // 13 - Nhân sự, chúc vụ
    // 14 - Nhân sự loại chứng chỉ
    // 15 - Nhân sự, Nội dung chứng chỉ
    // 16 - Hợp đồng phân loại công nợ
    // 17 - Hợp đồng nguyên nhân phát sinh
    // 18 - Chung - Nguyên nhân thất bại
    // 20 - Chung các lỗi hay gặp
    // 21 - Công việc, Đánh giá chất lượng
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19| 20 | 21;
    limit: number;
    lastestID: string;
}

export type DoctypeResponse = APIResponse & {
    data: {
        listRecords: Doctype[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}

export type AreaPayload = {
    limit: number;
    lastestID: string;
    keyword?: string;
}

export type AreaResponse = APIResponse & {
    data: {
        listRecords: Area[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}

export interface MutationContactPayload {
    type: string;
    gender: string;
    realStatus: string;
    insuranceStatus: string;
    familyPolicy: string;
    appointDate: string;
    birthday: string;
    changeSallaryDate: string;
    contractDate: string;
    contractExpire: string;
    contractValid: string;
    dateProvice: string;
    dayOff: string;
    insuranceDate: string;
    workStartDate: string;
    department: string;
}

export type CreateContactResponse = APIResponse;

// "use strict";

// const DATABASE_MIDDLEWARE   = require('../../../tools/db/database.middleware');
// const Schema                = require('mongoose').Schema;

/**
 * Hồ sơ chi tiết nhân sự (phân các loại)
 * 1. Lịch sử làm việc ở các đơn vị
 * 2. Kinh nghiệm thực tế tham gia tại các Dự án
 * 3. Lịch sử làm việc theo các Quyết định bổ nhiệm tại các hợp đồng (Chức vụ)
 * 4. Trình độ học vấn + Chuyên ngành đào tạo
 * 5. Bằng cấp chứng chỉ
 * 6. Khác (Bảo hiểm xã hội, tài sản giao nhận, lịch sử tuyển dụng, quá trình làm việc, công tác)
 */
// module.exports  = DATABASE_MIDDLEWARE("contact_document", {
//     // Công ty
//     company: {
//         type: Schema.Types.ObjectId,
//         ref : "company"
//     },
//     // Nhân sự
//     contact: {
//         type: Schema.Types.ObjectId,
//         ref : "contact"
//     },
//     //_________Phân loại (1-6)
//     type: { type: Number, default: 1 },
//     //_________Từ ngày/Ngày cấp
//     fromDate: { type: Date, default: null },
//     //_________Đến ngày/Ngày hết hạn
//     toDate: { type: Date, default: null },
//     //_________Đơn vị công tác
//     workplace: String,
//     //_________Người tham chiếu
//     reference: String,
//     /**
//      * Lĩnh vực chuyên môn
//      * Chuyên ngành đào tạo
//      */
//     field2: {
//         type: Schema.Types.ObjectId,
//         ref : "doctype"
//     },
//     //_________Gói thầu/Hạng mục tham gia
//     item: String,
//     //_________Dự án tham gia
//     project: String,
//     //_________Thuộc chủ đầu tư
//     client: String,
//     //_________Vị trí đảm nhận/Chức vụ tham gia (/item/doctypes/?tab=13)
//     position2: {
//         type: Schema.Types.ObjectId,
//         ref : "doctype"
//     },
//     // Thuộc hợp đồngcontactDocument
//     contract: {
//         type: Schema.Types.ObjectId,
//         ref : "contract"
//     },
//     /**
//      * BẰNG CẤP CHỨNG CHỈ
//      */
//     //_________Nơi cấp
//     place: String,
//     //_________Nội dung
//     name: String,
//     //_________Ký hiệu
//     sign: String,
//     //_________Ghi chú
//     note: String,
//     //_________Mô tả
//     description: String,
//     //_________Số lượng
//     number: { type: Number, default: 0 },
//     //_________Ví trí lưu trữ
//     store: String,
//     //_________Trạng thái/Hiệu lực (1/2)
//     status: { type: Number, default: 1 },
//     //_________Trình độ học vấn
//     educationalBackground2: {
//         type: Schema.Types.ObjectId,
//         ref : "doctype"
//     },
//     //_________Loại chứng chỉ
//     certificateType: {
//         type: Schema.Types.ObjectId,
//         ref : "doctype"
//     },
//     //_________Nội dung lĩnh vực chứng chỉ
//     certificateName: {
//         type: Schema.Types.ObjectId,
//         ref : "doctype"
//     },
//     //_________Hạng chứng chỉ (1/2/3/4-Nếu)
//     certificateGrade: { type: Number, default: 0 },
//     // Thời gian quy động
//     timeMobilize : {
//         type: Number,
//         default: 0
//     },
//     // Hệ số
//     factor : {
//         type: Number,
//         default: 0
//     },
//     //_________Tài liệu đính kèm
//     files: [{
//         type: Schema.Types.ObjectId,
//         ref : "file_core"
//     }],
//     /**
//      * THÔNG TIN NGƯỜI TẠO/CẬP NHẬT
//      */
//     userCreate: {
//         type: Schema.Types.ObjectId,
//         ref : 'user'
//     },
//     userUpdate: {
//         type: Schema.Types.ObjectId,
//         ref : 'user'
//     }
// });
