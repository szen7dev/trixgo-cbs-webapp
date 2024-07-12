import React from "react";
import moment from "moment";

import fileIcon from "assets/images/icons8-attach-48.svg";
import type { File } from 'typings/human';

type DataRemove = {
  _id: string;
  url: string;
  name: string;
  size: number;
};

interface ContactProps {
  file: File;
  contactDocumentID: string;
  onRemoveFileUpload: (data: DataRemove, contactDocumentID: string) => void;
}

export const ContactFile: React.FC<ContactProps> = ({
  file,
  // contactDocumentID,
  // onRemoveFileUpload,
  children,
}) => {
  const handleDownloadFile = React.useCallback((_file) => () => {
    const path = `${process.env.REACT_APP_URL_S3}${_file.path}`
    window.open(path)
  }, []);
  
  return (
    <div key={file._id} className="flex justify-between items-center ">
      <div className="flex relative">
        <div>
          <img src={fileIcon} alt="Attach" />
        </div>
        <div className="ml-2 cursor-pointer" onClick={handleDownloadFile(file)}>
          <p className="underline">{file.nameOrg}</p>
          <p
            className="text-primary-gray"
            style={{ fontSize: 10, maxWidth: "80%" }}
          >
            {`${Number(file.size / 1048576).toFixed(2)}MB | ${file?.author?.fullname || ''} | ${
              moment(file.createAt).isValid() &&
              moment(file.createAt).format('DD/MM/YYYY HH:mm')
            }`}
          </p>
          {children}
        </div>
      </div>
    </div>
  )
}