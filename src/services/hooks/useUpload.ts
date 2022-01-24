/**
 * LIBRARIES
 */
import { useMutation } from "react-query";
import Compressor from 'compressorjs';

/**
 * Types, APIs
 */
import FileRepository from "apis/upload";
import { UploadPayload, FileProps, AddFileUploadResponse } from "typings/file";

export type GenerateLinkResponse = {
    signedUrl: string,
    fileName: string,
    file: File,
    result?: FileProps
}

export type CompressConfig = {
    useCompress: boolean;
    quality?: number;
}

export type UploadFileProps = {
    files: File & File[],
    progress?: (percentCompleted: number) => void,
    compressConfig?: CompressConfig;
}

type UseUpload = {
    generateLinkS3: (payload: File) => Promise<GenerateLinkResponse>,
    uploadFileToS3: (payload: UploadPayload) => Promise<void>,
    addFileToUpload: ({ files, progress, compressConfig }: UploadFileProps) => Promise<AddFileUploadResponse>,
    addMultiFileToUpload: ({ files, progress }: UploadFileProps) => Promise<GenerateLinkResponse[] | undefined>,
};

export const useUpload = (app?: string) : UseUpload => {
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

    const addMultiFileToUpload = async ({
        files,
        progress
    }: UploadFileProps) => {
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
            const { signedUrl, file } = link;
            uploadFileToS3({ signedUrl, file, progress });
        })

        return listURLPresigned;
    }

    const addFileToUpload = async ({
           files,
           progress,
           compressConfig = {
               useCompress: true,
               quality: 0.8
           },
       }: UploadFileProps) => {
        const { signedUrl, file, fileName, result } = await generateLinkS3(files);

        // Handle images
        if (file.type.includes("image/") && compressConfig?.useCompress) {
            new Compressor(file, {
                quality: compressConfig.quality,

                // The compression process is asynchronous,
                // which means you have to access the `result` in the `success` hook function.
                success(result) {
                    const compressFile = blobToFile(result, file.name);
                    console.log('Sending in compress mode with quality: ' + compressConfig.quality);
                    uploadFileToS3({signedUrl, file: compressFile, progress});
                },
                error(err) {
                    console.log(err.message);
                },
            });
        } else {
            console.log('Sending in HD mode');
            await uploadFileToS3({signedUrl, file, progress});
        }

        return { _id: result?._id, name: fileName };
    }

    const blobToFile = (theBlob: Blob, fileName: string): File => {
        const b: any = theBlob;
        // A Blob() is almost a File() - it's just missing the two properties below which we will add
        b._lastModifiedDate = new Date();
        b._name = fileName;

        // Cast to a File() type
        return <File>theBlob;
    }

    return {
        generateLinkS3,
        uploadFileToS3,
        addFileToUpload,
        addMultiFileToUpload
    };
};
