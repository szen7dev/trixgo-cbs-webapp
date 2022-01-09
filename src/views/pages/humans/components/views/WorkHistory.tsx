import { FC, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

import HumanInfoHeader from "../layouts/HumanInfoHeader";
import ThreeDotIcon from "assets/images/icon-3dots.png";
import UploadFileIcon from "assets/images/icons8-upload-document.svg";
import PencilIcon from "assets/images/icons8-pencil.svg";
import DeleteIcon from "assets/images/icons8-remove.svg";
import PDFIcon from "assets/images/icons8-pdf.svg";
import { useOnClickOutside } from "services/hooks/useOnclickOutside";
import { useModal } from "services/hooks/useModal";
import { FormWorkHistory } from "../forms";
import {
  useQueryContactDocument,
  useMutationContactDocument,
} from "services/hooks/useHuman";

import type { ContactDocument } from "typings/human";

interface PropWorkHistory {
  humanId: string;
}

const DATE_FORMAT = "DD/MM/YYYY";

const WorkHistory: FC<PropWorkHistory> = (props) => {
  const { t: i18n } = useTranslation(["human"]);
  const ref = useRef<HTMLDivElement>(null);
  const { openModal, closeModal } = useModal();
  const inputRef = useRef<HTMLInputElement>(null);

  const { humanId } = props;

  const {
    createContactDocumentAsync,
    updateContractDocumentAsync,
    deleteContractDocumentAsync,
    updateFileContractDocumentAsync
  } = useMutationContactDocument();

  const {
    fetchNextPageContactDocument,
    refetchListContactDocument,
    totalRecord,
    listContactDocument,
  } = useQueryContactDocument(humanId, {
    type: 1,
  });

  const [openFileOption, setOpenFileOptionById] = useState("");

  useOnClickOutside(ref, () => setOpenFileOptionById(""));

  const handleFinishFormCreate = useCallback(
    async (values) => {
      const res = await createContactDocumentAsync({
        ...values,
        type: "1",
        contactID: humanId,
      });
      if (!res.error) {
        refetchListContactDocument();
        closeModal();
      }
      return null;
    },
    [
      closeModal,
      humanId,
      refetchListContactDocument,
      createContactDocumentAsync,
    ]
  );

  const handleClickAddNew = useCallback(() => {
    openModal(
      <div
        className={
          "inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"
        }
      >
        <FormWorkHistory
          title="Tạo mới lịch sử làm việc tại các đơn vị"
          onFinish={handleFinishFormCreate}
        />
      </div>
    );
  }, [openModal, handleFinishFormCreate]);

  const handleFinishFormUpdate = useCallback(
    async (values) => {
      const res = await updateContractDocumentAsync({
        ...values,
        contactID: humanId,
      });
      if (!res.error) {
        refetchListContactDocument();
        closeModal();
      }
      return null;
    },
    [
      closeModal,
      humanId,
      refetchListContactDocument,
      updateContractDocumentAsync,
    ]
  );

  const handleClickUpdate = useCallback(
    (contactDocument: ContactDocument) => () => {
      openModal(
        <div
          className={
            "inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"
          }
        >
          <FormWorkHistory
            title="Cập nhật lịch sử làm việc tại các đơn vị"
            onFinish={handleFinishFormUpdate}
            contactDocumentID={contactDocument._id}
            defaultValues={{
              fromDate: contactDocument.fromDate,
              toDate: contactDocument.toDate,
              workplace: contactDocument.workplace,
              reference: contactDocument.reference,
            }}
          />
        </div>
      );
    },
    [openModal, handleFinishFormUpdate]
  );

  const handleClickDeleteContactDocument = useCallback(
    (contactDocument: ContactDocument) => async () => {
      const res = await deleteContractDocumentAsync(contactDocument._id);
      if (res.status === 200) {
        refetchListContactDocument();
        setOpenFileOptionById("");
      }
    },
    [deleteContractDocumentAsync, refetchListContactDocument]
  );

  const handleClickUpload = useCallback(() => {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  }, []);

  const handleAttachFiles = useCallback(
    (contactDocumentID: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      // updateFileContractDocumentAsync({
      //   contactDocumentID,
      //   fileID
      // })
      console.log(e.target.files, contactDocumentID);
    },
    [updateFileContractDocumentAsync]
  );

  return (
    <div className="border-b-8 border-accent-light px-4 py-6">
      <HumanInfoHeader
        title={i18n("working-history")}
        onClickAddNew={handleClickAddNew}
      />
      <div className="text-[13px]">
        <div className="flex justify-between mt-4 text-primary-gray">
          <p style={{ width: "12.5%" }}>{i18n("from-date")}</p>
          <p style={{ width: "12.5%" }}>{i18n("to-date")}</p>
          <p className="w-1/4">{i18n("history-workplace")}</p>
          <p className="w-1/4">{i18n("reference-info")}</p>
          <p className="w-1/4">{i18n("attactment")}</p>
        </div>
        {listContactDocument.map((contactDocument) => {
          return (
            <div
              key={contactDocument._id}
              className="flex justify-start mt-4 relative"
            >
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
                </div>
              ))}
              <div className="absolute inset-y-0 right-0">
                <div
                  className="cursor-pointer hover:bg-cbs-gray w-[32px] h-[32px] flex justify-center items-center rounded-full"
                  onClick={() => setOpenFileOptionById(contactDocument._id)}
                >
                  <img
                    className="pointer-events-none"
                    src={ThreeDotIcon}
                    alt="Three Dot"
                  />
                </div>
                {openFileOption === contactDocument._id && (
                  <div
                    className="absolute right-0 mt-1 w-60 h-32 bg-primary-light rounded z-10"
                    style={{ border: "1px solid #cccccc" }}
                    ref={ref}
                  >
                    <div
                      className="flex items-center w-full h-1/3 hover:bg-accent-light px-8 cursor-pointer"
                      onClick={handleClickUpload}
                    >
                      <img
                        src={UploadFileIcon}
                        alt="Upload"
                        className="mr-5 pointer-events-none"
                      />
                      <span className="pointer-events-none">Upload file</span>
                      <input
                        ref={inputRef}
                        type="file"
                        name="files"
                        id="file"
                        // Validate input file
                        accept="*"
                        multiple
                        className="hidden"
                        onChange={handleAttachFiles(contactDocument._id)}
                      />
                    </div>
                    <div
                      className="flex items-center w-full h-1/3 hover:bg-accent-light px-8 cursor-pointer"
                      onClick={handleClickUpdate(contactDocument)}
                    >
                      <img
                        src={PencilIcon}
                        alt="Pencil"
                        className="mr-5 pointer-events-none"
                      />
                      <span className="pointer-events-none">Cập nhật</span>
                    </div>
                    <div
                      className="flex items-center w-full h-1/3 hover:bg-accent-light px-8 cursor-pointer"
                      onClick={handleClickDeleteContactDocument(
                        contactDocument
                      )}
                    >
                      <img
                        src={DeleteIcon}
                        alt="Delete"
                        className="mr-5 pointer-events-none"
                      />
                      <span className="pointer-events-none">Xóa</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {totalRecord && totalRecord - listContactDocument.length > 0 ? (
        <div className="w-full flex justify-center my-5">
          <button onClick={() => fetchNextPageContactDocument()}>
            <span className="text-primary">{`Xem thêm (${
              totalRecord - listContactDocument.length
            })`}</span>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default WorkHistory;
