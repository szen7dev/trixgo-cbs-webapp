import React, { FC, Fragment, HTMLAttributes } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

import { DIRECTION_TYPES, DOCUMENT_TYPES } from "apis/localdb";

import type { Document } from "typings/ppt/Document";

const DATE_FORMAT = "DD/MM/YYYY";
interface TableGeneralInformationProps extends HTMLAttributes<HTMLDivElement> {
  docInfo: Document;
}
export const TableGeneralInformation: FC<TableGeneralInformationProps> = ({
  docInfo,
  ...props
}) => {
  const { t } = useTranslation(["document"]);

  const table = React.useMemo(
    () => [
      { title: "Mã hiệu", value: docInfo.sign },
      { title: "Cá nhân ban hành", value: docInfo.sender?.name },
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
      { title: "Đơn vị ban hành", value: docInfo.datahubContact?.name },
      { title: "Số lượng", value: docInfo.amount },
      { title: "Tính chất văn bản", value: docInfo.property?.name },
      { title: "Số lượng giao", value: docInfo.amountDelivery || 0 },
      {
        title: "Phân loại khác",
        value:
          DOCUMENT_TYPES.filter((elm) => elm.value === docInfo.type)[0]?.text ||
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
        title: "Tình trạng hoàn thành",
        value: t("requestResponseWithTime", {
          requestResponse: docInfo.completeStatus
            ? "Đã hoàn thành"
            : "chưa hoàn thành",
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