import { FC, HTMLAttributes, useState } from "react";
import moment from "moment";

import pdfIcon from "assets/images/icons8-attach.svg";
import { formatNumberMoney } from "utils/converter";
import { toast } from "react-toastify";

import type { DocumentFileProps } from "typings/document/document-file";
import { useQueryListDocumentFile } from "services/hooks/document/useDocumentFile";
interface TableFileAttachProps extends HTMLAttributes<HTMLTableElement> {
  fileAttachs: DocumentFileProps[];
  handleDeleteFileAttach: (fileId: string) => void;
  documentID: string,
}

export const TableFileAttach: FC<TableFileAttachProps> = ({
  fileAttachs,
  handleDeleteFileAttach,
  children,
  documentID,
  ...props
}) => {
  const {
    updateDocumentFileMutateAsync,
    refetch,
  } = useQueryListDocumentFile({
    documentID,
  });

  const handleUpdateOfficial = async (event: any) => {
    try {
      let official = 1;
      if (event.target.checked) {
        official = 2;
      }else{
        official = 1;
      }
      const { error, data } = await updateDocumentFileMutateAsync({
        docFileID: event.target.value,
        official
      });

      if (error) {
        return toast.warning(data?.message);
      }

      toast.success('Cập nhật thành công');
      refetch();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <>
      <table className="w-full mt-3" {...props}>
        <tbody>
          {fileAttachs.map((fileAttach: any) => (
            <tr key={fileAttach._id}>
              <td className="py-2">
                <div className="flex items-center">
                  <img
                    src={pdfIcon}
                    alt=""
                    className="h-6 w-6 px-1 box-content"
                  />
                  <a className="text-primary" href={`${process.env.REACT_APP_URL_S3}${fileAttach?.file?.path}`} target="_blank" rel="noreferrer"> {fileAttach?.file?.nameOrg || "-"} </a>
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
              <td className="py-2 align-middle">
                    <input
                        className="form-check-input mr-3"
                        type="checkbox"
                        id="official"
                        value={fileAttach?._id}
                        checked={fileAttach?.official == 2}
                        onChange={handleUpdateOfficial}
                    />
                    Chính thức
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {children}
    </>
  );
};