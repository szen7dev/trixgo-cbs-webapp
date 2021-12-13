import Axios from "axios";
import API from "../repository";
import { FilePayload, FileResponse, UploadPayload } from "typings/file";

const axiosS3 = Axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  headers: {
    "Accept": "application/json",
  },
});

const fileURL = "/api/files";

const FileRepository = {
    async generateLinkS3(payload: FilePayload): Promise<FileResponse> {
        const { data } = await API.post<FileResponse>(
            `${fileURL}/generate-link-s3`,
            payload
        );
        return data;
    },
    async uploadFileToS3(payload: UploadPayload): Promise<{ id: string }> {
        axiosS3.defaults.headers['Content-Type'] = payload.file.type;

        const { data } = await axiosS3.put<{ id: string }>(
            payload.url,
            payload.file,
            {
                onUploadProgress: function(progressEvent) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    payload.progress && payload.progress(percentCompleted);
                }
            }
        );
        return data;
    },
};

export default FileRepository;
