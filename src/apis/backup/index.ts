import API from "../repository";

const URL_ADMIN = "/api/admin";

// typing
export type BackupItem = {
    /** Tên tệp, dạng `cbs_official-YYYYMMDD-HHMMSS.archive.gz` */
    name: string;
    /** Cỡ tệp, đơn vị byte */
    size: number;
    /** Thời điểm tệp được đẩy lên kho */
    at: string;
};

export type BackupListData = {
    /** Máy chủ đã được khai khoá kho sao lưu chưa. `false` KHÔNG phải lỗi — xem BE. */
    configured: boolean;
    bucket: string | null;
    items: BackupItem[];
    total: number;
    message?: string;
};

const BackupRepository = {
    async getList(): Promise<any> {
        const { data } = await API.get<any>(`${URL_ADMIN}/backups`);
        return data;
    },

    /**
     * Xin link tải có hạn cho MỘT bản sao lưu.
     *
     * Trả về link ký sẵn trỏ thẳng Spaces, KHÔNG phải nội dung tệp — bản sao lưu nặng ~1,1 GB
     * nên không đi qua máy chủ ứng dụng. Link sống 300 giây.
     */
    async getDownloadUrl(ten: string): Promise<any> {
        const { data } = await API.get<any>(
            `${URL_ADMIN}/backups/${encodeURIComponent(ten)}/url`
        );
        return data;
    },
};

export default BackupRepository;
