import API from "../repository";

import { FilePayload, FileResponse, UploadPayload } from "typings/file";

const fileURL = "/api/files";

const FileRepository = {
    async generateLinkS3(payload: FilePayload): Promise<FileResponse> {
        const { data } = await API.post<FileResponse>(
            `${fileURL}/generate-link-s3`,
            payload
        );
        return data;
    },
    async uploadFileToS3(payload: UploadPayload): Promise<{}> {
        const { data } = await API.put<{}>(
            payload.url,
            payload.file,
            {
                onUploadProgress: function(progressEvent) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    console.log({ percentCompleted })
                }
            }
        );
        return data;
    },
};

export default FileRepository;
