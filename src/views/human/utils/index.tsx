export interface IFile {
    [key: string]: any;
}

export const modifyUploadedFilesV2 = (files: FileList, contactDocumentID: string): IFile => {
    let currentFileIndex = 0;
    const fileToUpload: IFile = {};
    for (let i = 0; i < files.length; i++) {
        currentFileIndex++;
        const id = Number(currentFileIndex);
        fileToUpload[id] = {
            id,
            file: files[i],
            progress: 0,
            contactDocumentID
        };
    }

    return fileToUpload;
};