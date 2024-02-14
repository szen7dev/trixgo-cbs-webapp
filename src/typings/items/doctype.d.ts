import type { QueryParam, Company, APIResponse } from './commons';

export type Doctype = {
    _id: string;
    parent: string;
    linkItem: string;
    name: string;
    sign: string;
    description: string;
    unit: string;
    type: number;
    amount: number;
    alert: number;
    company?: Company
    modifyAt?: string;
    createAt?: string;
    salesChannel: number;
    userCreate: any;
    userUpdate: any;
}

export type DoctypeListParams = QueryParam & {
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
    // 19 - Chung các lỗi hay gặp
    // 20 - Công việc, Đánh giá chất lượng
    // 21 - NPS-Điểm số
    // 22 - NPS-Lý do
    type?: number;
    companyID?: string;
    projectID?: string;
    parentID?: string;
    [record: string]: any;
}

export type DoctypeQueryResponse = APIResponse & {
    data: {
        listRecords: Doctype[];
        limit: number;
        totalRecord: number;
        totalPage: number;
        nextCursor: string | null;
    }
}

export type DoctypeQueryDetailResponse = APIResponse & {
    data: Doctype;
}

interface ModalProps {
    modalType: "create" | "update";
    level?: 'parent' | 'child';
    initialValues?: {
        doctypeID: string;
        linkItem?: string;
        parent?: string;
        name: string;
        sign: string;
        unit: string;
        description: string;
        type: number;
        amount: number;
        alert: number;
        salesChannel: number;
    }
    onConfirm?(): void
}