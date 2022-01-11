import React from "react";
import moment from "moment";
import className from "classnames";

import PDFIcon from "assets/images/icons8-pdf.svg";

const DATE_FORMAT = "DD/MM/YYYY";

type DataRemove = {
  _id: string;
  url: string;
  name: string;
  size: number;
};

interface ContactProps {
  file: {
    id?: string;
    _id: string;
    name: string;
    url: string;
    createAt: string;
    userCreate: {
      fullname: string;
    };
    size: number;
  };
  contactDocumentID: string;
  onRemoveFileUpload: (data: DataRemove, contactDocumentID: string) => void;
}

const ContactFile: React.FC<ContactProps> = ({
  file,
  contactDocumentID,
  onRemoveFileUpload,
  children,
}) => {
  return (
    <div key={file._id} className="flex justify-between items-center ">
      <div className="flex relative">
        <div>
          <img src={PDFIcon} alt="PDF" />
        </div>
        <div className="ml-2">
          <p>{file.name}</p>
          <p
            className="text-primary-gray"
            style={{ fontSize: 10, maxWidth: "80%" }}
          >
            {`${file.size}KB | ${file.userCreate.fullname} | ${
              moment(file.createAt).isValid() &&
              moment(file.createAt).format(DATE_FORMAT)
            }`}
          </p>
          {children}
          <button
            type="button"
            className={className(
              "close-btn absolute top -top-3.5 right-6 bg-white rounded-3xl h-6 w-6 flex justify-center items-center"
            )}
            onClick={() =>
              onRemoveFileUpload(
                {
                  _id: file._id,
                  url: file.url,
                  name: file.name,
                  size: file.size,
                },
                contactDocumentID
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactFile;
