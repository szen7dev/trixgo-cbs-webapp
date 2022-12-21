import { FC, HTMLAttributes } from "react";
import moment from "moment";

import pdfIcon from "assets/images/icons8-attach.svg";
import { formatNumberMoney } from "utils/converter";

import type { DocumentFileProps } from "typings/document/document-file";
interface TableFileAttachProps extends HTMLAttributes<HTMLTableElement> {
  fileAttachs: DocumentFileProps[];
  handleDeleteFileAttach: (fileId: string) => void;
}

export const TableFileAttach: FC<TableFileAttachProps> = ({
  fileAttachs,
  handleDeleteFileAttach,
  children,
  ...props
}) => {
  return (
    <>
      <table className="w-full mt-3" {...props}>
        <tbody>
          {fileAttachs.map((fileAttach) => (
            <tr key={fileAttach._id}>
              <td className="py-2">
                <div className="flex items-center">
                  <img
                    src={pdfIcon}
                    alt=""
                    className="h-6 w-6 px-1 box-content"
                  />
                  <a href={`${process.env.REACT_APP_URL_S3}${fileAttach?.file?.path}`} target="_blank" rel="noreferrer"> {fileAttach?.file?.nameOrg || "-"} </a>
                </div>
              </td>
              <td className="py-2 align-middle">
                {fileAttach?.file?.author?.bizfullname || "-"}
              </td>
              <td className="py-2 align-middle">
                {(moment(fileAttach.createAt).isValid() &&
                  moment(fileAttach.createAt).format('DD/MM/YYYY HH:mm')) ||
                  "-"}
              </td>
              <td className="py-2 align-middle">
                {formatNumberMoney(Number(fileAttach?.file?.size / 1024 || 0).toFixed(0))} KB
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {children}
    </>
  );
};