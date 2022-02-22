import type { QueryParam, Company, APIResponse } from './commons';

export type Doctype = {
    _id: string;
    name: string;
    type: number;
    company?: Company
}

export type DoctypeQueryPayload = QueryParam & {
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
    type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;
    [record: string]: any;
}

export type DoctypeQueryResponse = APIResponse & {
    data: {
        listRecords: Doctype[];
        limit: number;
        totalRecord: number;
        totalPages: number;
        nextCursor: string | null;
    }
}

export type DoctypeQueryDetailResponse = APIResponse & {
    data: Doctype;
}
