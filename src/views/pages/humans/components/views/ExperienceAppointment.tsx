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
import { FormExperienceAppointment } from "../forms";

import type { Human, ContactDocument } from "typings/human";

const DATE_FORMAT = "DD/MM/YYYY";

enum PROJECT_TYPES {
  "Quan trọng quốc gia" = 1,
  "Loại A" = 2,
  "Loại B" = 3,
  "Loại C" = 4,
}

enum BUILDING_TYPES {
  "Công trình dân dụng" = 1,
  "Công trình công nghiệp" = 2,
  "Công trình giao thông" = 3,
  "Công trình nông nghiệp và phát triển nông thôn" = 4,
  "Công trình hạ tầng kỹ thuật" = 5,
  "Công trình quốc phòng, an ninh" = 6,
}

interface WorkExperienceProps {
  humanId: string;
  humanInfo: Human;
}

const ExperienceAppointment: FC<WorkExperienceProps> = (props) => {
  const { t: i18n } = useTranslation(["human"]);
  const ref = useRef<HTMLDivElement>(null);
  const { openModal, closeModal } = useModal();

  const { humanId, humanInfo } = props;

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
    type: 3,
  });

  const [openFileOption, setOpenFileOption] = useState("");

  useOnClickOutside(ref, () => setOpenFileOption(""));

  const handleFinishFormCreate = useCallback(
    async (values) => {
      const res = await createContactDocumentAsync({
        ...values,
        type: "3",
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

  const handleClickAddNew = useCallback(
    (companyID: string) => () => {
      openModal(
        <div
          className={
            "inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"
          }
        >
          <FormExperienceAppointment
            title="Tạo mới kinh nghiệm theo quyết định bổ nhiệm"
            onFinish={handleFinishFormCreate}
            companyID={companyID}
          />
        </div>
      );
    },
    [handleFinishFormCreate, openModal]
  );

  const handleFinishFormUpdate = useCallback(
    async (values) => {
      const res = await updateContractDocumentAsync({
        ...values,
        type: "3",
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
    (companyID: string, contactDocument: ContactDocument) => () => {
      openModal(
        <div
          className={
            "inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"
          }
        >
          <FormExperienceAppointment
            title="Cập nhật kinh nghiệm theo quyết định bổ nhiệm"
            onFinish={handleFinishFormUpdate}
            companyID={companyID}
            contactDocumentID={contactDocument._id}
            defaultValues={{
              name: contactDocument.name,
              sign: contactDocument.sign,
              toDate: contactDocument.toDate,
              position2: contactDocument.position2?._id,
              contract: contactDocument.contract?._id,
              factor: contactDocument.factor,
              timeMobilize: contactDocument.timeMobilize,
            }}
          />
        </div>
      );
    },
    [openModal, handleFinishFormUpdate]
  );

  const handleClickDeleteContactDocument = useCallback((contactDocument: ContactDocument) => async () => {
    const res = await deleteContractDocumentAsync(contactDocument._id);
    if (res.status === 200) {
      refetchListContactDocument();
      setOpenFileOption('')
    }
  }, [deleteContractDocumentAsync, refetchListContactDocument]);

  return (
    <div className="border-b-8 border-accent-light px-4 py-6">
      <HumanInfoHeader
        title={i18n("experience-appointment")}
        onClickAddNew={handleClickAddNew(humanInfo.company?._id || "")}
      />
      <div className="text-[13px]">
        <div className="flex justify-between mt-4 text-primary-gray">
          <p className="w-1/5">{i18n("experience-appointment-name")}</p>
          <p style={{ width: "13%" }}>{i18n("experience-appointment-sign")}</p>
          <p style={{ width: "15%" }}>{i18n("position2")}</p>
          <p className="w-1/5 ">
            {i18n("experience-appointment-project-type")}
          </p>
          <p style={{ width: "12%" }}>
            {i18n("experience-appointment-project-type")}
          </p>
          <p className="w-1/5">{i18n("attactment")}</p>
        </div>

        {listContactDocument.map((contactDocument) => (
          <div
            key={contactDocument._id}
            className="flex justify-start mt-4 relative"
          >
            <div className="w-1/5">
              <p style={{ maxWidth: "80%" }}>{contactDocument.name}</p>
            </div>
            <p style={{ width: "13%" }}>
              {contactDocument.sign && (
                <span className="t-human-spread">{contactDocument.sign}</span>
              )}
              <span>
                {moment(contactDocument.toDate).isValid() &&
                  moment(contactDocument.toDate).format(DATE_FORMAT)}
              </span>
            </p>
            <p style={{ width: "15%" }}>{contactDocument?.position2?.name}</p>
            <p className="w-1/5">
              {contactDocument.contract?.sign && (
                <span className="t-human-spread">
                  {contactDocument.contract.sign}
                </span>
              )}
              {contactDocument.contract?.project?.projectType && (
                <span className="t-human-spread">
                  {PROJECT_TYPES[contactDocument.contract.project.projectType]}
                </span>
              )}
              {contactDocument.contract?.project?.buildingGrade && (
                <span>
                  {
                    BUILDING_TYPES[
                      contactDocument.contract.project.buildingGrade
                    ]
                  }
                </span>
              )}
            </p>
            <p style={{ width: "12%" }}>
              <span>{contactDocument.timeMobilize}</span>
              <span>{contactDocument.factor}</span>
            </p>

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
                    className="flex items-center w-full h-1/3 hover:bg-accent-light px-8 cursor-pointer"
                    onClick={handleClickUpdate(
                      humanInfo.company?._id || "",
                      contactDocument
                    )}
                  >
                    <img src={PencilIcon} alt="Pencil" className="mr-5" />
                    <span>Cập nhật</span>
                  </div>
                  <div 
                    className="flex items-center w-full h-1/3 hover:bg-accent-light px-8 cursor-pointer"
                    onClick={handleClickDeleteContactDocument(contactDocument)}
                  >
                    <img src={DeleteIcon} alt="Delete" className="mr-5 pointer-events-none" />
                    <span className='pointer-events-none'>Xóa</span>
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

export default ExperienceAppointment;
