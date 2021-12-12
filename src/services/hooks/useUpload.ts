import { useMutation } from "react-query";
import { toast } from "react-toastify";
import FileRepository from "apis/upload";
import { FilePayload, UploadPayload } from "typings/file";

interface GenerateLinkResponse{
    signedUrl: string,
    uri: string,
    fileName: string,
    type: string,
    file: FilePayload,
}

type useFile = {
    generateLinkS3: (payload: FilePayload) => Promise<GenerateLinkResponse | undefined>,
    uploadFileToS3: (payload: UploadPayload) => Promise<void>,
    addFileToUpload: (files: FilePayload[]) => Promise<void>,
};

export const useFile = (app?: string) : useFile => {
    const { mutateAsync: generateLinkS3Async } =
        useMutation((payload: FilePayload) =>
            FileRepository.generateLinkS3({
                name: payload.name,
                type: payload.type,
                size: `${payload.size}`,
                app
            })
        );

    const { mutateAsync: uploadFileToS3Async } =
        useMutation((payload: UploadPayload) =>
            FileRepository.uploadFileToS3(payload)
        );

    const generateLinkS3 = async (payload: FilePayload) => {
        try {
            const { data } = await generateLinkS3Async(payload);
            const { infoGenerateLink, infoFileAfterInsert } = data;
            console.log({ 'GENERATE_LINK': data });

            return {
                signedUrl: infoGenerateLink.data,
                uri: `${process.env.REACT_APP_URL_S3}{infoFileAfterInsert.name}`,
                fileName: infoFileAfterInsert.name,
                type: infoFileAfterInsert.type,
                file: payload
            }
        } catch (error: unknown) {
            console.error(error);
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const uploadFileToS3 = async (payload: UploadPayload) => {
        try {
            const response = await uploadFileToS3Async(payload);
            console.log({ 'UPLOAD_FILE_S3': response });
        } catch (error: unknown) {
            console.error(error);
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const addFileToUpload = async (files: FilePayload[]) => {
        let urlsPromise: Promise<GenerateLinkResponse | undefined>[] = [];

        if(!files.length) return;

        if(files.length === 1){
            const url = generateLinkS3(files[0]);
            urlsPromise = [url];
        } else{
            for (const file of files) {
                const url = generateLinkS3(file);
                urlsPromise = [...urlsPromise, url];
            }
        }

        // Generate link S3 -> get list link presigned upload -> upload S3 async
        const listURLPresigned = await Promise.all(urlsPromise);

        listURLPresigned.length && listURLPresigned.map((link: GenerateLinkResponse | undefined) => {
            if(link){
                const { signedUrl, file } = link;
                uploadFileToS3({ url: signedUrl, file });
            }
        })
    }

    return {
        generateLinkS3,
        uploadFileToS3,
        addFileToUpload
    };
};
