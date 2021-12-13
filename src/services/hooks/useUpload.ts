/**
 * LIBRARIES
 */
import { useMutation } from "react-query";
import { toast } from "react-toastify";

/**
 * Types, APIs
 */
import FileRepository from "apis/upload";
import { FilePayload, UploadPayload, FileProps } from "typings/file";

interface GenerateLinkResponse{
    signedUrl: string,
    file: FilePayload,
    result?: FileProps
}

type UploadFileProps = {
    files: FilePayload[],
    progressUpload?: (percentCompleted: number) => void
}

type UseFile = {
    generateLinkS3: (payload: FilePayload) => Promise<GenerateLinkResponse>,
    uploadFileToS3: (payload: UploadPayload) => Promise<void>,
    addFileToUpload: ({ files, progressUpload }: UploadFileProps) => Promise<(string | undefined)[] | undefined>,
};

export const useFile = (app?: string) : UseFile => {
    const { mutateAsync: generateLinkS3Async } =
        useMutation((payload: FilePayload) =>
            FileRepository.generateLinkS3({
                name: payload.name,
                type: payload.type,
                size: payload.size,
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
                file: payload,
                result: infoFileAfterInsert
            }
        } catch (error: unknown) {
            console.error(error);
            return { signedUrl: '', file: payload };
        }
    };

    const uploadFileToS3 = async (payload: UploadPayload) => {
        try {
            await uploadFileToS3Async(payload);
        } catch (error: unknown) {
            console.error(error);
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const addFileToUpload = async ({ files, progressUpload }: UploadFileProps) => {
        let urlsPromise: Promise<GenerateLinkResponse>[] = [];

        if(!files.length) return;

        if(files.length === 1){
            const infoUrl = generateLinkS3(files[0]);
            urlsPromise = [infoUrl];
        } else{
            for (const file of files) {
                const infoUrl = generateLinkS3(file);
                urlsPromise = [...urlsPromise, infoUrl];
            }   
        }

        // Generate link S3 -> get list link presigned upload -> upload S3 async
        const listURLPresigned = await Promise.all(urlsPromise);

        listURLPresigned.length && listURLPresigned.map((link: GenerateLinkResponse) => {
            if(link){
                const { signedUrl, file } = link;
                uploadFileToS3({ url: signedUrl, file, progress: progressUpload });
            }
        })

        return listURLPresigned.map(file => file.result?._id);
    }

    return {
        generateLinkS3,
        uploadFileToS3,
        addFileToUpload
    };
};
