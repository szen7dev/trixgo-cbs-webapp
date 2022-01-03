import { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

import HumanInfoHeader from "../layouts/HumanInfoHeader";

import ThreeDotIcon from "assets/images/icon-3dots.png";
import UploadFileIcon from "assets/images/icons8-upload-document.svg";
import PencilIcon from "assets/images/icons8-pencil.svg";
import DeleteIcon from "assets/images/icons8-remove.svg";
import PDFIcon from "assets/images/icons8-pdf.svg";
import { useOnClickOutside } from "services/hooks/useOnclickOutside";

import type { ContactDocument } from "typings/human";

interface PropWorkHistory {
  loading: boolean;
  info: ContactDocument[];
  totalRecord: number;
  fetchNextPageDocument: () => void;
}

const DATE_FORMAT = "DD/MM/YYYY";

const WorkHistory: FC<PropWorkHistory> = (props) => {
  const { t: i18n } = useTranslation(["human"]);
  const ref = useRef<HTMLDivElement>(null);

  const { info, totalRecord, fetchNextPageDocument } = props;

  const [openFileOption, setOpenFileOption] = useState(false);

  useOnClickOutside(ref, () => setOpenFileOption(!openFileOption));

  return (
    <div className="border-b-8 border-accent-light px-4 py-6">
      <HumanInfoHeader title={i18n("working-history")} />
      <div className="text-[13px]">
        <div className="flex justify-between mt-4 text-primary-gray">
          <p style={{ width: "12.5%" }}>
            {i18n("from-date")}
          </p>
          <p style={{ width: "12.5%" }}>
            {i18n("to-date")}
          </p>
          <p className="w-1/4">
            {i18n("history-workplace")}
          </p>
          <p className="w-1/4">
            {i18n("reference-info")}
          </p>
          <p className="w-1/4">
            {i18n("attactment")}
          </p>
        </div>
        {info.map((contactDocument) => {
          return (
            <div key={contactDocument._id} className="flex justify-between mt-4">
              <p style={{ width: "12.5%" }}>
                {moment(contactDocument.fromDate).isValid() &&
                  moment(contactDocument.fromDate).format(DATE_FORMAT)}
              </p>
              <p style={{ width: "12.5%" }}>
                {moment(contactDocument.toDate).isValid() &&
                  moment(contactDocument.toDate).format(DATE_FORMAT)}
              </p>
              <p className="w-1/4 ">{contactDocument.workplace}</p>
              <p className="w-1/4 ">{contactDocument.reference}</p>
  
              {contactDocument.files.map((elm) => (
                <div
                  key={elm._id}
                  className="flex justify-between items-center w-1/4"
                >
                  <div className="flex">
                    <div>
                      <img src={PDFIcon} alt="PDF" />
                    </div>
                    <div className="ml-2">
                      <p>{elm.name}</p>
                      <p
                        className="text-primary-gray"
                        style={{ fontSize: 10, maxWidth: "80%" }}
                      >
                        {`${elm.size}B | ${elm.userCreate.fullname} | ${
                          moment(elm.createAt).isValid() &&
                          moment(elm.createAt).format(DATE_FORMAT)
                        }`}
                        {/* 268KB | Trần Thị Ngân-CPMI | 07/12/2021 15:38 */}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="cursor-pointer hover:bg-cbs-gray w-[32px] h-[32px] flex justify-center items-center rounded-full"
                      onClick={() => setOpenFileOption(!openFileOption)}>
                      <img
                        className="pointer-events-none"
                        src={ThreeDotIcon}
                        alt="Three Dot"
                      />
                    </div>
                    {openFileOption && (
                      <div
                        className="absolute right-0 mt-1 w-60 h-32 bg-primary-light rounded z-10"
                        style={{ border: "1px solid #cccccc" }}
                        ref={ref}
                      >
                        <div className="flex items-center w-full h-1/3 hover:bg-accent-light px-8 cursor-pointer">
                          <img
                            src={UploadFileIcon}
                            alt="Upload"
                            className="mr-5"
                          />
                          <span>Upload file</span>
                        </div>
                        <div className="flex items-center w-full h-1/3 hover:bg-accent-light px-8 cursor-pointer">
                          <img src={PencilIcon} alt="Pencil" className="mr-5" />
                          <span>Cập nhật</span>
                        </div>
                        <div className="flex items-center w-full h-1/3 hover:bg-accent-light px-8 cursor-pointer">
                          <img src={DeleteIcon} alt="Delete" className="mr-5" />
                          <span>Xóa</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
      {totalRecord && totalRecord - info.length > 0 ? (
        <div className="w-full flex justify-center my-5">
          <button onClick={() => fetchNextPageDocument()}>
            <span className="text-primary">{`Xem thêm (${
              totalRecord - info.length
            })`}</span>
          </button>
        </div>
      ): ''}
    </div>
  );
};

export default WorkHistory;
