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
import {
  useQueryContactDocument,
  useMutationContactDocument,
} from "services/hooks/useHuman";
import { FormCertificate } from "../forms";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";

import type { ContactDocument } from "typings/human";

const DATE_FORMAT = "DD/MM/YYYY";

export enum CONTACT_DOCUMENT_GRADES {
  "Hạng 1" = 1,
  "Hạng 2" = 2,
  "Hạng 3" = 3,
  "Hạng 4" = 4,
}
interface CertificateProps {
  humanId: string;
}

const Certificate: FC<CertificateProps> = (props) => {
  const { t: i18n } = useTranslation(["human"]);
  const ref = useRef<HTMLDivElement>(null);
  const { openModal, closeModal } = useModal();
  const { openDeleteConfirm } = useDeleteConfirm();

  const { humanId } = props;

  const {
    createContactDocumentAsync,
    updateContractDocumentAsync,
    deleteContractDocumentAsync,
  } = useMutationContactDocument();

  const {
    refetchListContactDocument,
    fetchNextPageContactDocument,
    totalRecord,
    listContactDocument,
  } = useQueryContactDocument(humanId, {
    type: 4,
  });

  const [openFileOption, setOpenFileOption] = useState("");

  useOnClickOutside(ref, () => setOpenFileOption(""));

  const handleFinishFormCreate = useCallback(
    async (values) => {
      const res = await createContactDocumentAsync({
        ...values,
        type: "4",
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
        <FormCertificate
          title="Tạo mới chứng chỉ, hồ sơ khác"
          onFinish={handleFinishFormCreate}
        />
      </div>
    );
  }, [handleFinishFormCreate, openModal]);

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
          <FormCertificate
            title="Cập nhật chứng chỉ, hồ sơ khác"
            onFinish={handleFinishFormUpdate}
            contactDocumentID={contactDocument._id}
            defaultValues={{
              name: contactDocument.name,
              place: contactDocument.place,
              sign: contactDocument.sign,
              fromDate: contactDocument.fromDate,
              toDate: contactDocument.toDate,
              certificateType: contactDocument?.certificateType?._id || '',
              certificateName: contactDocument?.certificateName?._id || '',
              certificateGrade: contactDocument?.certificateGrade,
              number: contactDocument.number,
              store: contactDocument.store,
              note: contactDocument.note,
            }}
          />
        </div>
      );
    },
    [openModal, handleFinishFormUpdate]
  );

  const handleClickDeleteContactDocument = useCallback(
    (contactDocument: ContactDocument) => () => {
      openDeleteConfirm({
        deleteAction: async () => {
          const res = await deleteContractDocumentAsync(contactDocument._id);
          if (res.status === 200) {
            refetchListContactDocument();
            setOpenFileOption("");
          }
        }
      })
    },
    [deleteContractDocumentAsync, openDeleteConfirm, refetchListContactDocument]
  );

  return (
    <div className="border-accent-light px-4 py-6">
      <HumanInfoHeader
        title={i18n("certificate")}
        onClickAddNew={handleClickAddNew}
      />
      <div className="text-[13px]">
        <div className="flex justify-between mt-4 text-primary-gray">
          <p style={{ width: "15%" }}>{i18n("place2")}</p>
          <p style={{ width: "10%" }}>{i18n("sign2")}</p>
          <p style={{ width: "10%" }}>{i18n("endDate")}</p>
          <p style={{ width: "13%" }}>
            {i18n("certificateType-certificateName-certificateGrade")}
          </p>
          <p style={{ width: "7%" }}>{i18n("number")}</p>
          <p style={{ width: "15%" }}>{i18n("store")}</p>
          <p style={{ width: "10%" }}>{i18n("note")}</p>
          <p className="w-1/5">{i18n("attactment")}</p>
        </div>

        {listContactDocument.map((contactDocument) => (
          <div
            key={contactDocument._id}
            className="flex justify-between mt-4 relative"
          >
            <div style={{ width: "15%" }}>
              <p style={{ maxWidth: "90%" }}>{contactDocument.name}</p>
              <p style={{ maxWidth: "90%" }}>{contactDocument.place}</p>
            </div>
            <p style={{ width: "10%" }}>
              {contactDocument.sign && (
                <span className="t-human-spread">{contactDocument.sign}</span>
              )}
              {contactDocument.fromDate && (
                <span>{contactDocument.fromDate}</span>
              )}
            </p>
            <p style={{ width: "10%" }}>
              {moment(contactDocument.toDate).isValid() &&
                moment(contactDocument.toDate).format(DATE_FORMAT)}
            </p>
            <div style={{ width: "13%" }}>
              <p style={{ maxWidth: "90%" }}>
                {contactDocument?.certificateType && (
                  <span className="t-human-spread">
                    {contactDocument.certificateType.name}
                  </span>
                )}
                {contactDocument?.certificateName && (
                  <span className="t-human-spread">
                    {contactDocument.certificateName.name}
                  </span>
                )}
                {/* cần kiểm tra value là gì và hiển thị theo type của CONTACT_DOCUMENT_GRADES */}
                {contactDocument?.certificateGrade && (
                  <span>
                    {CONTACT_DOCUMENT_GRADES[contactDocument.certificateGrade]}
                  </span>
                )}
              </p>
            </div>
            <p style={{ width: "7%" }}>{contactDocument.number}</p>
            <div style={{ width: "15%" }}>
              <p style={{ maxWidth: "90%" }}>{contactDocument.store}</p>
            </div>
            <p style={{ width: "10%" }}>{contactDocument.note}</p>

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
                onClick={() => setOpenFileOption(contactDocument._id)}
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
                  <div className="flex items-center w-full h-1/3 hover:bg-accent-light px-8 cursor-pointer">
                    <img src={UploadFileIcon} alt="Upload" className="mr-5" />
                    <span>Upload file</span>
                  </div>
                  <div
                    onClick={handleClickUpdate(contactDocument)}
                    className="flex items-center w-full h-1/3 hover:bg-accent-light px-8 cursor-pointer"
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
                    onClick={handleClickDeleteContactDocument(contactDocument)}
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
        ))}
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

export default Certificate;
