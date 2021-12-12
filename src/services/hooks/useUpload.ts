import { useMutation } from "react-query";
import { toast } from "react-toastify";
import FileRepository from "apis/upload";
import { FilePayload, UploadPayload } from "typings/file";

type UseSocial = {
    generateLinkS3: (payload: FilePayload) => Promise<void>,
    uploadFileToS3: (payload: UploadPayload) => Promise<void>,
};

export const useSocial = () : UseSocial => {
    const { mutateAsync: generateLinks3Async } =
        useMutation((payload: FilePayload) =>
            FileRepository.generateLinkS3(payload)
        );

    const { mutateAsync: uploadFileToS3Async } =
        useMutation((payload: UploadPayload) =>
            FileRepository.uploadFileToS3(payload)
        );

    const generateLinkS3 = async (payload: FilePayload) => {
        try {
            const { error, data, message } = await generateLinks3Async(payload);
            console.log({ error, data, message });

            if (!error) {
                toast.success('Xóa bài viết thành công');
            } else {
                toast.error(message);
            }
        } catch (error: unknown) {
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
            console.log(response);
        } catch (error: unknown) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    return {
        generateLinkS3,
        uploadFileToS3
    };
};
