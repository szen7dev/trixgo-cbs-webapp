/**
 * LIBRARIES
 */
import { useMutation } from "react-query";
import MimeType from "mimetype";
import imageCompression from 'browser-image-compression';

/**
 * Types, APIs
 */
import FileRepository from "apis/upload";
import { UploadPayload, FileProps, AddFileUploadResponse, GenerateLinkPayload } from "typings/file";
import { blobToFile } from "utils/converter";

export type GenerateLinkResponse = {
    signedUrl: string,
    fileName: string,
    file: File,
    result?: FileProps
}
export type OptionsCompress = {
    maxSizeMB: number,          // (default: Number.POSITIVE_INFINITY)
    maxWidthOrHeight: number,   // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
                                // but, automatically reduce the size to smaller than the maximum Canvas size supported by each browser.
                                // Please check the Caveat part for details.
    onProgress?: (progress: number) => void,       // optional, a function takes one progress argument (percentage from 0 to 100)
    useWebWorker?: boolean,      // optional, use multi-thread web worker, fallback to run in main-thread (default: true)

    // following options are for advanced users
    maxIteration?: number,       // optional, max number of iteration to compress the image (default: 10)
    exifOrientation?: number,    // optional, see https://stackoverflow.com/a/32490603/10395024
    fileType?: string,           // optional, fileType override
    initialQuality?: number      // optional, initial quality value between 0 and 1 (default: 1)
}
//
// export type CompressConfig = {
//     useCompress: boolean;
//     // quality?: number;
//     options?: OptionsCompress;
// }

export type UploadFileProps = {
    files: File & File[],
    fileType: number,
    progress?: (percentCompleted: number, _id?: string) => void,
    source?: any,
    useCompress?: boolean;
    compressConfig?: OptionsCompress;
    appID?: string;
    companyID?: string;
}

type FileGenerateLink = {
    file: File;
    fileType: number;
}

type UseUpload = {
    generateLinkS3: ({ file, fileType }: FileGenerateLink) => Promise<GenerateLinkResponse>,
    uploadFileToS3: (payload: UploadPayload) => Promise<void>,
    addFileToUpload: ({ files, fileType, progress, useCompress, compressConfig, appID, companyID }: UploadFileProps) => Promise<AddFileUploadResponse>,
    addMultiFileToUpload: ({ files, progress }: UploadFileProps) => Promise<GenerateLinkResponse[] | undefined>,
};

export const useUpload = ({
    appID,
    companyID,
    projectID,
    groupID,
    packageID,
    conversationID,
    typeUpload
}: GenerateLinkPayload) : UseUpload => {

    const { mutateAsync: generateLinkS3Async } =
        useMutation(({ file, fileType }: FileGenerateLink) =>
            FileRepository.generateLinkS3({
                name: file.name,
                mimeType: file.type || MimeType.lookup(file.name),
                size: file.size as never,
                type: fileType,
                appID,
                companyID,
                projectID,
                groupID,
                packageID,
                conversationID,
                typeUpload
            })
        );

    const { mutateAsync: uploadFileToS3Async } =
        useMutation((payload: UploadPayload) =>
            FileRepository.uploadFileToS3(payload)
        );

    const generateLinkS3 = async ({ file, fileType }: FileGenerateLink) => {
        try {
            console.log({ generateLinkS3: file, fileType })
            const { data } = await generateLinkS3Async({ file, fileType });
            const { infoGenerateLink, infoFileAfterInsert } = data;

            return {
                signedUrl: infoGenerateLink.data,
                file,
                fileName: infoFileAfterInsert.name,
                result: infoFileAfterInsert
            }
        } catch (error: unknown) {
            console.error(error);
            return { signedUrl: '', fileName: '', file };
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
        fileType,
        progress
    }: UploadFileProps) => {
        let urlsPromise: Promise<GenerateLinkResponse>[] = [];

        if(!files.length) return;

        if(files.length === 1){
            const infoUrl = generateLinkS3({ file: files[0], fileType });
            urlsPromise = [infoUrl];
        } else{
            for (const file of files) {
                const infoUrl = generateLinkS3({ file, fileType });
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
           fileType,
           progress,
           useCompress,
           source,
           compressConfig = {
               maxSizeMB: 1,
               maxWidthOrHeight: 1920,
               useWebWorker: true
           },
       }: UploadFileProps) => {

        if (files.type === "") {
            const blob = new Blob([files], { type: MimeType.lookup(files.name) });
            const newFile: any = blobToFile(blob, files.name);
            files = newFile;
        }

        const { signedUrl, file, fileName, result } = await generateLinkS3({ file: files, fileType });

        // Handle images
        if (file.type.includes("image/") && useCompress && files.type !== 'image/gif') {
            // new Compressor(file, {
            //     quality: compressConfig.quality??0.8,
            //     maxWidth: 1200,
            //
            //     // The compression process is asynchronous,
            //     // which means you have to access the `result` in the `success` hook function.
            //     success(result) {
            //         const compressFile = blobToFile(result, file.name);
            //         console.log('Sending in compress mode with quality: ' + compressConfig.quality??0.8);
            //         uploadFileToS3({ signedUrl, file: compressFile, progress });
            //     },
            //     error(err) {
            //         console.log(err.message);
            //     },
            // });
            try {
                const compressedFile = await imageCompression(file, compressConfig);
                const compressFile = convertBlobToFile(compressedFile, file.name);
                // console.log(`compressedFile size ${compressedFile.size / 1024 } KB`); // smaller than maxSizeMB
                // console.log('Sending in COMPRESS mode');

                await uploadFileToS3({ signedUrl, file: compressFile, progress, _id: result?._id, source });
            } catch (error) {
                // console.log("Can not compress file. Sending in HD mode")
                await uploadFileToS3({ signedUrl, file, progress, _id: result?._id, source });
            }
        } else {
            // console.log('Sending in HD mode');
            await uploadFileToS3({ signedUrl, file, progress, _id: result?._id, source });
        }

        return { _id: result?._id, name: fileName, nameOrg: result?.nameOrg };
    }

    const convertBlobToFile = (theBlob: Blob, fileName: string): File => {
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
