// Library
import React from "react";
import moment from "moment";
import { toast } from "react-toastify";

// Icons
import CopyIcon from "assets/images/icons8-copy-96.svg";

// Utils
import { getFileIcon } from "utils/file";

// Typings
import { FileProps } from "typings/common";

type Props = {
  //
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const OwnerUploadedFile = ({ ...rest }: Props): JSX.Element => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const file: FileProps = {
    _id: "1",
    author: { bizfullname: "123" },
    mimeType: "application/pdf",
    nameOrg: "123123123",
    createAt: "2022-03-01",
    description: "123123123",
  } as FileProps;
  return (
    <div {...rest}>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => {
          alert("upload file");
        }}
      />
      <div className="flex justify-between">
        <header className="text-x-large">File người thực hiện</header>
        <button className="h-10 w-10 flex justify-center items-center rounded-full" onClick={(e) => inputRef.current?.click()}>
          {/* <DotsVerticalIcon /> */}
          <img src="/images/common/icon-upload-file.png" alt="Icon upload file" />
        </button>
      </div>
      {/* <div className="flex w-full my-2" key={file._id}>
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
            // onKeyUp={handleUpdateDescriptionFile}
          />
        </div>
      </div> */}
    </div>
  );
};

export default OwnerUploadedFile;
