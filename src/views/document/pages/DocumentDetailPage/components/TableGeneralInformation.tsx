import React, { FC, Fragment, HTMLAttributes } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

import { DIRECTION_TYPES, DOCUMENT_TYPES, DOCUMENT_TYPES_SORT } from "apis/localdb";

import type { Document } from "typings/ppt/Document";
import { number } from "yup";

const DATE_FORMAT = "DD/MM/YYYY";
interface TableGeneralInformationProps extends HTMLAttributes<HTMLDivElement> {
  docInfo: Document;
}
const finishs = [
  { _id: 1, name: "Đang triển khai" }, 
  { _id: 2, name: "Hoàn thành" }
];
export const TableGeneralInformation: FC<TableGeneralInformationProps> = ({
  docInfo,
  ...props
}) => {
  const { t } = useTranslation(["document"]);
  // console.log({ docInfo })
  const table = React.useMemo(
    () => [
      { title: "Mã hiệu", value: docInfo.sign },
      { 
        title: "Thời hạn hoàn thành",
        value:
        (moment(docInfo.deadline).isValid() &&
          moment(docInfo.deadline).format(DATE_FORMAT)) ||
        "",
      },
      { title: "Mã hiệu hồ sơ lưu", value: docInfo.storeSign },
      { title: "Gói thầu, hạng mục", value: docInfo.package?.name },
      {
        title: "Ngày hồ sơ/văn bản",
        value:
          (moment(docInfo.date).isValid() &&
            moment(docInfo.date).format(DATE_FORMAT)) ||
          "",
      },
      { title: "Hợp đồng", value: docInfo.contract?.name },
      {
        title: "Ngày nhận thực tế",
        value:
          (moment(docInfo.receivedDate).isValid() &&
            moment(docInfo.receivedDate).format(DATE_FORMAT)) ||
          "",
      },
      {
        title: "Hướng hồ sơ",
        value: DIRECTION_TYPES.filter(
          (elm) => elm.value === docInfo.direction
        )[0]?.text,
      },
      { title: "Nhận dạng", value: docInfo.style },
      { title: "Chủ thể nhận", value: docInfo.receiver?.name },
      { title: "Tình trạng", value: docInfo.status },
      { title: "Đơn vị ban hành", value: docInfo?.publish?.name },
      { title: "Số lượng", value: docInfo.amount },
      { title: "Phân loại khác", value: docInfo.property?.name },
      { title: "Số lượng giao", value: docInfo.amountDelivery || 0 },
      {
        title: "Tính chất văn bản",
        value:
        DOCUMENT_TYPES_SORT.filter((elm) => elm.value === docInfo.type)[0]?.text ||
          "",
      },
      {
        title: "Yêu cầu phản hồi",
        value: t("requestResponseWithTime", {
          requestResponse: docInfo.requestResponse ? "Có" : "Không",
          spead: "|",
          time:
            moment(docInfo.expiredResponse).isValid() &&
            moment(docInfo.expiredResponse).format(DATE_FORMAT),
        }),
      },
      { title: "Người ký", value: docInfo?.approver || "" },
      {
        title: "Tình trạng phản hồi",
        value: t("requestResponseWithTime", {
          requestResponse: docInfo.completeStatus
            ? "Đã phản hồi"
            : "Chưa phản hồi",
        }),
      },
      { title: "Giá trị", value: docInfo.value },
      { title: "Ghi chú", value: docInfo.note },
      { title: "Địa chỉ lưu trữ", value: docInfo.storage?.name },
    ],
    [docInfo]
  );
  return (
    <div className="document__detail-grid border-collapse mt-3 border-b border-cbs-border" {...props}>
      {table.map((t, index) => (
        <Fragment key={index}>
          <div
            style={{
              borderLeftWidth: index % 2 !== 0 ? 0 : 1,
              borderBottomWidth: 0
            }}
            className="px-4 py-2.5 border-cbs-border"
          >
            {t.title}
          </div>
          <div
            style={{
              borderLeftWidth: 0,
              borderBottomWidth: 0
            }}
            className="px-4 py-2.5 border-cbs-border text-black"
          >
            {t.value || ""}
          </div>
        </Fragment>
      ))}
    </div>
  );
};