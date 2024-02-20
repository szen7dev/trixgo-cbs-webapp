type APIResponse = {
    error?: boolean;
    status?: number;
    data?: any;
}

type Populate = {
    path?: string;
    select?: string;
    populate?: Populate
}

type QueryParam = {
    limit?: number;
    lastestID?: string;
    keyword?: string;
    populates?: Populate;
}

type Company = {
    name?: string;
    sign?: string;
    _id?: string;
}

export type Position = {
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

export type EducationBackground = {
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

export type File = {
    name: string;
    nameOrg: string;
    size: number;
    _id: string;
    url: string;
    createAt: string;
    userCreate: {
        fullname: string;
    }
    author: {
        fullname: string;
    }
}

type WorkingStatus = {
    name: string;
    _id: string;
}

type linkUser = {
    fullname: string;
    _id: string;
}

type userCreate = {
    fullname: string;
    _id: string;
}

type userUpdate = {
    fullname: string;
    _id: string;
}

export type ContractType = {
    name: string;
    _id: string;
    sign?: string;
    project?: {
        projectType: number;
        buildingGrade: number;
    };
}

export type Field2 = {
    name: string;
    _id: string;
}

export type CertificateType = {
    name: string;
    _id: string;
}

export type CertificateName = {
    name: string;
    _id: string;
}

type CertificateGrade = {
    name: string;
    _id: string;
}

export type Department = {
    name: string;
    sign: string;
    _id: string;
    description?: string;
    members?: string[];
}

type documents = {
    name: string;
    _id: string;
    educationalBackground2: {
        name: tring
    }
}

export type Human = {
    type?: number;
    company?: Company;
    position?: Position;
    department?: Department;
    area2?: Area;
    area1?: Area;
    area?: Area;
    nestedParents?: Workplace[];
    nestedChilds?: Workplace[];
    workplace?: Workplace[];
    educationalBackground?: EducationBackground[];
    major?: Major[];
    other?: Other;
    workingStatus?: WorkingStatus;
    linkUser?: linkUser;
    userCreate?: userCreate;
    userUpdate?: userUpdate;
    contractType?: ContractType;
    _id?: string;
    image?: string;
    name?: string;
    createAt?: Date;
    phone?: string;
    sign?: string;
    note?: string;
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
    documents?: any;
    modifyAt?: any;
    bankAccount?: any;
    insuranceFee?: any;
    dataSource?: any;
    parent?: any;
    level?: any;
}

export interface HumanPayload extends QueryParam {
    contactID?: string;
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

export type DepartmentPayload = QueryParam & {
    type: 1 | 2; //  1: "Phòng Ban", 2: "Dự án" 
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

export type PositionPayload = QueryParam

export type PositionResponse = APIResponse & {
    data: {
        listRecords: Position[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}

export type Doctype = {
    _id: string;
    name: string;
    type: number;
    company?: Company
}

export type DoctypePayload = QueryParam & {
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
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
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

export type AreaPayload = QueryParam

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

export type CreateContactDocumentPayload = ContactDocument & {
    contactID: string
}

export type UpdateContactDocumentPayload = ContactDocument & {
    contactDocumentID: string
}

export type UpdateFileContactDocumentPayload = {
    contactDocumentID: string;
    filesID: array;
}

export type RemoveFileContactDocumentPayload = {
    contactDocumentID: string;
    fileRemoveID: string | number;
}

export type MutationContactDocument = {
    status?: number;
    error: boolean,
    data: ContactDocument
}

export interface Contract {
    _id: string;
    company: Company;
    name: string;
    description: string | null;
    sign: string | null
}

export type QueryContractPayload = QueryParam & {
    companyID: string;
}

export type QueryContractResponse = APIResponse & {
    data: {
        listRecords: Contract[],
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor?: string;
    }
}

interface FileProp {
    _id: number | string;
    url: string;
    name: string;
    size: number;
}

export interface FileProps {
    file?: FileProp
    _id: number | string;
    url: string;
    name: string;
    size: number;
};

export interface FilePropsUpload {
    _id: string;
    id: number;
    file: File;
    progress: number;
    cancelTokenSource: CancelTokenSource;
    proimise?: Interval;
};