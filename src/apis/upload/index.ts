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

const fileURL = "/api/files";

const FileRepository = {
    async generateLinkS3(payload: GenerateLinkPayload): Promise<FileResponse> {
        const { data } = await API.post<FileResponse>(
            `${fileURL}/generate-link-s3`,
            payload
        );
        return data;
    },
    async uploadFileToS3(payload: UploadPayload): Promise<{ id: string }> {
        axiosS3.defaults.headers['Content-Type'] = payload.file.type;

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
