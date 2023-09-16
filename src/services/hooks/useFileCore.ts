/**
 * Libraries
 */
import { useMutation } from "react-query";

/**
 * Types, APIs
 */
import FileRepository from "apis/upload";
import { FileUpdatePayload } from "typings/file";

type UseFileCore = {
    updateFileAsync: (payload: FileUpdatePayload) => Promise<any>,
    deleteFilesAsync: (payload: string[]) => Promise<any>,
};

type UseFileCoreParams = {
    params?: any
}

export const useFileCore = (props?: UseFileCoreParams) : UseFileCore => {
    const { mutateAsync: updateFileAsync } =
        useMutation((payload: FileUpdatePayload) =>
            FileRepository.updateFile(payload)
        );

    const { mutateAsync: deleteFilesAsync } = useMutation((payload: string[]) => FileRepository.deleteFiles(payload));

    return {
        updateFileAsync,
        deleteFilesAsync,
    };
};
