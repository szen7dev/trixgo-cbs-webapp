import React, { FC, HTMLAttributes } from "react";
import moment from "moment";

import type { UseQueryListDocumentChild } from "services/hooks/document/useDocumentChild";

interface TableSubtextProfileProps extends HTMLAttributes<HTMLTableElement> {
  docChildPayload: UseQueryListDocumentChild;
}
export const TableSubtextProfile: FC<TableSubtextProfileProps> = ({
  docChildPayload,
  ...props
}) => {
  const renderSeeMoreButton = React.useCallback(
    (_docChildPayload: UseQueryListDocumentChild) => {
      const condition =
        _docChildPayload.totalRecord &&
        _docChildPayload.totalRecord -
          _docChildPayload.listDocumentChild.length >
          0;
      return condition ? (
        <button
          className="text-primary text-[13px]"
          onClick={() => _docChildPayload.fetchNextPageDocumentChild()}
        >
          {`Xem thêm (${
            Number(_docChildPayload.totalRecord) -
            _docChildPayload.listDocumentChild.length
          })`}
        </button>
      ) : (
        <></>
      );
    },
    []
  );
  return (
    <>
      <table className="w-full text-black mt-3" {...props}>
        <thead>
          <tr className="text-left">
            <th className="font-normal text-cbs-subtext px-3 py-2.5">
              Nội dung
            </th>
            <th className="font-normal text-cbs-subtext px-3 py-2.5">
              Số hiệu
            </th>
            <th className="font-normal text-cbs-subtext px-3 py-2.5">
              Ngày tháng
            </th>
            <th className="font-normal text-cbs-subtext px-3 py-2.5">
              Chủ thể ban hành
            </th>
            <th className="font-normal text-cbs-subtext px-3 py-2.5">
              Ghi chú
            </th>
            <th className="font-normal text-cbs-subtext px-3 py-2.5">
              Địa chỉ lưu trữ
            </th>
          </tr>
        </thead>
        <tbody>
          {(docChildPayload?.listDocumentChild?.length) ? docChildPayload.listDocumentChild?.map((doc, i) => (
            <tr key={doc._id}>
              <td className="py-3 px-3">
                <a href={`/ppt/project/61c41cca87808f16744773ec/document/${doc._id}`} target="_blank" rel="noreferrer"> 
                  {doc.name || ''}
                 </a>
                </td>
              <td className="py-3 px-3">{doc.sign || ''}</td>
              <td className="py-3 px-3">{moment(doc.date).isValid() && moment(doc.date).format('DD/MM/YYYY') || ''}</td>
              <td className="py-3 px-3">{doc.sender?.name || ''}</td>
              <td className="py-3 px-3">{doc.note || ''}</td>
              <td className="py-3 px-3">{doc.storage?.name || ''}</td>
            </tr>
          )) : <></>}
          {renderSeeMoreButton(docChildPayload)}
        </tbody>
      </table>
    </>
  );
};