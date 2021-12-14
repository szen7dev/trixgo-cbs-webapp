/**
 * LIBRARIES
 */
import { useMutation } from "react-query";

/**
 * Types, APIs
 */
import FileRepository from "apis/upload";
import { UploadPayload, FileProps, AddFileUploadResponse } from "typings/file";

type GenerateLinkResponse = {
    signedUrl: string,
    fileName: string,
    file: File,
    result?: FileProps
}

export type UploadFileProps = {
    files: File,
    progress?: (percentCompleted: number) => void
}

type UseFile = {
    generateLinkS3: (payload: File) => Promise<GenerateLinkResponse>,
    uploadFileToS3: (payload: UploadPayload) => Promise<void>,
    addFileToUpload: ({ files, progress }: UploadFileProps) => Promise<AddFileUploadResponse>,
};

export const useFile = (app?: string) : UseFile => {
    const { mutateAsync: generateLinkS3Async } =
        useMutation((payload: File) =>
            FileRepository.generateLinkS3({
                name: payload.name,
                type: payload.type,
                size: payload.size as never,
                app
            })
        );

    const { mutateAsync: uploadFileToS3Async } =
        useMutation((payload: UploadPayload) =>
            FileRepository.uploadFileToS3(payload)
        );

    const generateLinkS3 = async (payload: File) => {
        try {
            const { data } = await generateLinkS3Async(payload);
            const { infoGenerateLink, infoFileAfterInsert } = data;
            // console.log({ 'GENERATE_LINK': data });

            return {
                signedUrl: infoGenerateLink.data,
                file: payload,
                fileName: infoFileAfterInsert.name,
                result: infoFileAfterInsert
            }
        } catch (error: unknown) {
            console.error(error);
            return { signedUrl: '', fileName: '', file: payload };
        }
    };

    const uploadFileToS3 = async (payload: UploadPayload) => {
        try {
            await uploadFileToS3Async(payload);
        } catch (error: unknown) {
            console.error(error);
        }
    };

    const addFileToUpload = async ({ files, progress }: UploadFileProps) => {
        // let urlsPromise: Promise<GenerateLinkResponse>[] = [];

        // if(!files.length) return;

        // if(files.length === 1){
        //     const infoUrl = generateLinkS3(files[0]);
        //     urlsPromise = [infoUrl];
        // } else{
        //     for (const file of files) {
        //         const infoUrl = generateLinkS3(file);
        //         urlsPromise = [...urlsPromise, infoUrl];
        //     }   
        // }

        // // Generate link S3 -> get list link presigned upload -> upload S3 async
        // const listURLPresigned = await Promise.all(urlsPromise);

        // listURLPresigned.length && listURLPresigned.map((link: GenerateLinkResponse) => {
        //     const { signedUrl, file } = link;
        //     uploadFileToS3({ signedUrl, file, progress });
        // })

        const { signedUrl, file, fileName, result } = await generateLinkS3(files);
        await uploadFileToS3({ signedUrl, file, progress });

        return { id: result?._id, name: fileName };
    }

    return {
        generateLinkS3,
        uploadFileToS3,
        addFileToUpload
    };
};
