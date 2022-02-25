import { FC, HTMLAttributes } from "react";
import moment from "moment";

import pdfIcon from "assets/images/icons8-pdf-48 1.png";

import type { DocumentFileProps } from "typings/document/document-file";

const DATE_FORMAT = "DD/MM/YYYY";
interface TableFileAttachProps extends HTMLAttributes<HTMLTableElement> {
  fileAttachs: DocumentFileProps[];
}

export const TableFileAttach: FC<TableFileAttachProps> = ({
  fileAttachs,
  children,
  ...props
}) => {
  return (
    <>
      <table className="w-full mt-3" {...props}>
        <tbody>
          {fileAttachs.map((fileAttach, i) => (
            <tr key={fileAttach._id}>
              <td className="py-2">
                <div className="flex items-center">
                  <img
                    src={pdfIcon}
                    alt=""
                    className="h-6 w-6 px-1 box-content"
                  />
                  <span>{fileAttach?.file?.name || "-"}</span>
                </div>
              </td>
              <td className="py-2 align-middle">
                {fileAttach?.file?.author?.bizfullname || "-"}
              </td>
              <td className="py-2 align-middle">
                {(moment(fileAttach.createAt).isValid() &&
                  moment(fileAttach.createAt).format(DATE_FORMAT)) ||
                  "-"}
              </td>
              <td className="py-2 align-middle">
                {fileAttach?.file?.size / 1000 || 0} KB
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {children}
    </>
  );
};
