type APIResponse = {
    error?: boolean;
    status?: number;
}

type Company = {
    name: string;
    sign: string;
    _id: string;
}

type Department = {
    name: string;
    sign: string;
    _id: string;
}

type Position = {
    name: string;
    _id: string;
}

type Area = {
    name: string;
    _id: string;
    sign: string;
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
        projectType: string;
        buildingGrade: string;
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

export type Human = {
    company?: Company;
    position?: Position;
    department?: Department;
    area2?: Area;
    area1?: Area;
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

export interface HumanPayload {
    lastestID?: string | undefined,
    limit?: number;
    contactID?: string;
    populates?: {
        path?: string;
        select?: string;
    };
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
    modifyAt: string;
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
