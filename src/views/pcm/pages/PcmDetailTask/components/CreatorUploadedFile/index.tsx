// Library
import React, { useState } from "react";
import moment from "moment";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

// Icons
import CopyIcon from "assets/images/icons8-copy-96.svg";

// Utils
import { getFileIcon } from "utils/file";

// Typings
import { FileProps } from "typings/common";
import { useTask } from "services/hooks/useTask";
import { useUpload } from "services/hooks/useUpload";
import { APP_ID } from "apis/localdb";
import { User } from "typings/user";
import FileRepository from "apis/upload";
import { FileUpdatePayload } from "typings/file";

type Props = {
  author: User | null,
  authorAttachs: any[],
  taskID: string,
  companyID: string,
  projectID: string,
  groupID: string,
  hasPermission: boolean
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const CreatorUploadedFile = ({ taskID, companyID, projectID, groupID, authorAttachs, author, hasPermission, ...rest }: Props): JSX.Element => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileProps[]>(authorAttachs);

  const { mutateAsync: updateFileAsync } =
		useMutation((payload: FileUpdatePayload) =>
			FileRepository.updateFile(payload)
		);

  const { addFileToUpload } = useUpload({
    appID: APP_ID.PCM.id,
    companyID,
    projectID,
    groupID
  });
  const { updateTaskAsync } = useTask({});

  const handleUpdateDescriptionFile = debounce(async (e: any) => {
    if(!hasPermission) return;

		await updateFileAsync({
			fileID: e.target.dataset.fileid,
			description: e.target.value
		});

		toast.success('Cập nhật ghi chú thành công', { autoClose: 2000 });
	}, 1000)

  const handleChangeInputFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!hasPermission) return;
    try {
      const files = event.target.files;
      const filesID: string[] = [];
      const newFiles: any[] = [];

      if(!files || !files.length) return;

      for (const [, file] of Object.entries(files)) {
        const { _id, nameOrg, path, mimeType, createAt } = await addFileToUpload({
          files: file as any,
          fileType: 2,
        });
        _id && (filesID[filesID.length] = _id);

        newFiles[newFiles.length] = {
          _id,
          nameOrg,
          mimeType,
          path,
          createAt,
          author
        }
      }

      const { error, data } = await updateTaskAsync({
        taskID,
        authorAttachs: filesID
      })

      if(error) {
        return toast.warn(data?.message || 'Thêm file thất bại')
      }

      if(newFiles.length) {
        setFiles(previous => ([
          ...previous,
          ...newFiles
        ]))
      }

      toast.success('Thêm file thành công');
    } catch (error) {
      console.error(error);
      if(error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return (
    <div {...rest}>
      <input
        type="file"
        ref={inputRef}
        multiple
        className="hidden"
        onChange={handleChangeInputFile}
      />
      <div className="flex justify-between">
        <header className="text-x-large">File người giao việc</header>
        {hasPermission && (
          <button className="h-10 w-10 flex justify-center items-center rounded-full" onClick={(e) => inputRef.current?.click()}>
            <img src="/images/common/icon-upload-file.png" alt="Icon upload file" />
          </button>
        )}
      </div>
      {(files && files.length) ? files.map(file => (
        <div className="flex w-full my-2" key={file._id}>
          <div className="w-full bg-gray-100 p-2 rounded-sm border border-slate-400">
            <div>
              <div className="flex">
                <div>
                  <img src={getFileIcon(file?.mimeType)} className="w-8" alt="PDF" />
                </div>
                <div className="ml-3 w-full">
                  <div className="flex">
                    <a href={`${process.env.REACT_APP_URL_S3}${file.path}`} target="__blank" className="w-5/6 break-all text-cbs-highlight-color">
                      {file.nameOrg}
                    </a>
                    <button
                      className="w-1/6 flex justify-end"
                      onClick={() => {
                        // This will work only on Desktop
                        navigator.clipboard.writeText(`${process.env.REACT_APP_URL_S3}${file.path}`);
                        toast.success("Copy link download thành công", { autoClose: 2000 });
                      }}
                    >
                      <img src={CopyIcon} className="w-[24px] h-[24px]" alt="Copy" />
                    </button>
                  </div>

                  <div className="flex w-full mt-2 indeterminate:">
                    <span className="w-[70%] text-[13px] text-primary-gray">{file.author?.bizfullname}</span>
                    <span className="text-right w-[30%] text-[13px] text-primary-gray">{moment(file.createAt).format("HH:mm DD/M/YYYY")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-3/8 px-3 pt-3">
            <textarea
              className="h-full resize-none focus:ring-2 focus:outline-none focus:ring-offset-1 rounded-cbs-sm"
              placeholder="Nhập nội dung ghi chú cho file"
              defaultValue={file.description}
              data-fileid={file._id}
              onKeyUp={handleUpdateDescriptionFile}
              disabled={!hasPermission}
            />
          </div>
        </div>
      )) : <></>}
    </div>
  );
};