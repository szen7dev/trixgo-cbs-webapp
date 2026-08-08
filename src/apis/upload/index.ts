import Axios from "axios";
import API from "../repository";
import { GenerateLinkPayload, FileResponse, UploadPayload, FileUpdatePayload } from "typings/file";

const BASE_URL = process.env.REACT_APP_ENV === 'development'
  ? process.env.REACT_APP_API_DOMAIN_LOCAL
  : process.env.REACT_APP_API_DOMAIN_STAGING

const axiosS3 = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Accept": "application/json",
  },
});

/**
 * Instance riêng cho phiên đọc file: cần withCredentials để trình duyệt nhận cookie,
 * và cố tình không dùng interceptor chung để lỗi phiên không bắn toast cho người dùng.
 */
const axiosFileSession = Axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const fileURL = "/api/files";

const FileRepository = {
    async generateLinkS3(payload: GenerateLinkPayload): Promise<FileResponse> {
        const { data } = await API.post<FileResponse>(
            `${fileURL}/generate-link-s3`,
            payload
        );
        return data;
    },
    /**
     * Đổi token đăng nhập lấy cookie đọc file (HttpOnly, domain .trixgo.com).
     * Thẻ <img>/<a download> không gắn được header Authorization nên phải đi bằng cookie.
     */
    async createFileSession(): Promise<void> {
        const token = localStorage.getItem("token");
        if (!token) return;

        await axiosFileSession.post(
            `${fileURL}/session`,
            null,
            { headers: { Authorization: `Bearer ${JSON.parse(token)}` } }
        );
    },
    async destroyFileSession(): Promise<void> {
        await axiosFileSession.delete(`${fileURL}/session`);
    },
    async uploadFileToS3(payload: UploadPayload): Promise<{ id: string }> {
        axiosS3.defaults.headers['Content-Type'] = payload.file.type;
        // Không gửi x-amz-acl: link ký từ BE không còn kèm ACL, gửi thừa header sẽ lệch chữ ký (403)
        delete axiosS3.defaults.headers['x-amz-acl'];

        const { data } = await axiosS3.put<{ id: string }>(
            payload.signedUrl,
            payload.file,
            {
                onUploadProgress: function(progressEvent) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    payload.progress && payload.progress(percentCompleted, payload._id??"");
                },
                cancelToken: payload?.source?.token
            }
        );
        return data;
    },
    async updateFile(payload: FileUpdatePayload): Promise<any> {
        const { data } = await API.put<any>(
            fileURL,
            payload
        );
        return data;
    },
    async deleteFiles(payload: string[]): Promise<any> {
        const pairs = payload.map(function (value) { return "ids[]=" + encodeURIComponent(value) });
        const { data } = await API.delete<any>(`${fileURL}?${pairs.join('&')}`);
        return data;
    }
};

export default FileRepository;
