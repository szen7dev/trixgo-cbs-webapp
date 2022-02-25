import React, { FC, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";

import { ModalContext } from "views/document/contexts/modal";

import {
  DropdownFilterButton,
  ButtonCreate,
  ButtonMore,
  ButtonIcon,
  GroupActions,
} from "views/document/sharedComponents/common";

import "views/document/styles/document.css";
import { TableGeneralInformation } from "./components/TableGeneralInformation";
import { TableJobs } from "./components/TableJobs";
import { TableFileAttach } from "./components/TableFileAttach";
import { TableSubtextProfile } from "./components/TableSubtextProfile";

import iconMove from "assets/images/icons8-move-stock-96.svg";
import iconShareFolder from "assets/images/icons8-shared-folder-100_1.svg";
import iconUpload from "assets/images/icons8-upload-file-100 1.png";
import iconAdd from "assets/images/icon-add.svg";

import { useQueryDetailDocument } from "services/hooks/ppt/useDocument";
import { useQueryListDocumentChild } from "services/hooks/document/useDocumentChild";
import { useQueryListDocumentFile } from "services/hooks/document/useDocumentFile";

const DATE_FORMAT = "DD/MM/YYYY HH:mm";
interface Props {
  test?: unknown;
}

export const DocumentDetailPage: FC<Props> = () => {
  const history = useHistory();
  const params = useParams<any>();
  const { t } = useTranslation(["document"]);

  const { toggleModal } = useContext(ModalContext);

  const { onFetchDetailDocumentAsync, detailDocument } =
    useQueryDetailDocument();

  const docChildPayload = useQueryListDocumentChild({
    parentID: params.docID,
  });

  const {
    documentFiles,
    fetchNextPage: fetchNextPageDocumentFile,
    totalRecord: totalDocumentFile,
  } = useQueryListDocumentFile({
    documentID: params.docID,
  });

  React.useEffect(() => {
    if (params.docID) {
      onFetchDetailDocumentAsync(params.docID);
    }
  }, [onFetchDetailDocumentAsync, params.docID]);

  //   console.log(detailDocument);
  return (
    <div className="flex flex-col overflow-hidden bg-cbs-gray h-full">
      <div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
        <button
          type="button"
          className="p-2 rounded-3xl mr-5"
          onClick={() => history.goBack()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <DropdownFilterButton />
        <GroupActions className="flex items-center flex-1" />

        <ButtonCreate onClick={toggleModal} />
        <ButtonMore />
      </div>
      <div className="text-cbs-subtext flex-1 overflow-y-auto pb-2">
        <div className="bg-white">
          <div className="pl-5 pr-4 py-3.5 border-b border-cbs-border">
            <h2
              className="text-black"
              style={{ fontSize: "27px", lineHeight: "31px" }}
            >
              {detailDocument.name}
            </h2>
            <div className="mt-3">
              <img
                src={iconShareFolder}
                className="h-6 w-6 inline mr-2.5"
                alt=""
              />
              <span className="mr-2.5">
                CHG.THT {">"} Tư vấn thiết kế 112 {">"} Hồ sơ thanh toán
              </span>
              <img src={iconMove} className="h-6 w-6 inline" alt="" />
            </div>
            <div className="flex justify-between flex-wrap mt-4">
              <div>
                Khởi tạo:{" "}
                <span className="text-black">
                  {t("nameWithTime", {
                    time:
                      moment(detailDocument.createAt).isValid() &&
                      moment(detailDocument.createAt).format(DATE_FORMAT),
                    user: {
                      name: detailDocument.author?.fullname,
                      sign: detailDocument.author?.sign,
                    },
                  })}
                </span>
              </div>
              <div>
                Cập nhật:{" "}
                <span className="text-black">
                  {t("nameWithTime", {
                    time:
                      moment(detailDocument.updatedAt).isValid() &&
                      moment(detailDocument.updatedAt).format(DATE_FORMAT),
                    user: {
                      name: detailDocument.userUpdate?.fullname,
                      sign: detailDocument.userUpdate?.sign,
                    },
                  })}
                </span>
              </div>
            </div>
          </div>
          {/* General Information */}
          <div className="px-3.5 pb-3 pt-5">
            <h3 className="text-cbs-subtext text-x-large font-bold flex-1">
              Thông tin chung
            </h3>
            <TableGeneralInformation docInfo={detailDocument} />
          </div>
        </div>
        {/* File attached */}
        <div className="bg-white mt-2.5 pb-3 pt-5 px-3.5">
          <div className="flex flex-wrap">
            <h3 className="text-cbs-subtext text-x-large font-bold flex-1">
              Tài liệu đính kèm
            </h3>
            <ButtonIcon
              title="Thêm"
              icon={() => (
                <img src={iconUpload} alt="" className="mr-2.5 h-6 w-6" />
              )}
            />
          </div>
          <TableFileAttach fileAttachs={documentFiles}>
            {Number(totalDocumentFile) - documentFiles.length > 0 && (
              <button
                className="text-primary text-[13px]"
                onClick={() => fetchNextPageDocumentFile()}
              >
                {`Xem thêm (${
                  Number(totalDocumentFile) - documentFiles.length
                })`}
              </button>
            )}
          </TableFileAttach>
        </div>

        {/* Job */}
        {/* <div className="bg-white mt-2.5 pb-3 pt-5 px-3.5">
          <div className="flex flex-wrap">
            <h3 className="text-cbs-subtext text-x-large font-bold flex-1">
              Công việc
            </h3>
            <ButtonMore className="mr-6" />
            <ButtonIcon
              title="Thêm"
              icon={() => (
                <img src={iconAdd} alt="" className="mr-2.5 h-6 w-6" />
              )}
            />
          </div>
          <TableJobs />
        </div> */}
        {/* Subtext Profile */}
        <div className="bg-white mt-2.5 pb-3 pt-5 px-3.5">
          <div className="flex flex-wrap">
            <h3 className="text-cbs-subtext text-x-large font-bold flex-1">
              Hồ sơ văn bản con
            </h3>
            <ButtonMore className="mr-6" />
            <ButtonIcon
              title="Thêm"
              icon={() => (
                <img src={iconAdd} alt="" className="mr-2.5 h-6 w-6" />
              )}
            />
          </div>
          <TableSubtextProfile docChildPayload={docChildPayload} />
        </div>
        {/* Discussion */}
        {/* <div className="bg-white mt-2.5 pb-3 pt-5 px-3.5">
          <div className="flex flex-wrap">
            <h3 className="text-cbs-subtext text-x-large font-bold">
              Thảo luận
            </h3>
          </div>
          <div className="py-4"></div>
        </div> */}
      </div>
    </div>
  );
};
