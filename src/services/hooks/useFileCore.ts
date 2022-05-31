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
};

type UseFileCoreParams = {
    params?: any
}

export const useFileCore = (props?: UseFileCoreParams) : UseFileCore => {

    const { mutateAsync: updateFileAsync } =
        useMutation((payload: FileUpdatePayload) =>
            FileRepository.updateFile(payload)
        );

    return {
        updateFileAsync
    };
};
