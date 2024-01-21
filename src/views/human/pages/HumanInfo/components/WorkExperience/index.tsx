import { FC, useRef, useState, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import toArray from "lodash/toArray";
import className from "classnames";
import { toast } from "react-toastify";
import { APP_KEY } from 'utils/constants';

import { HumanInfoHeader } from "views/human/shareComponents/common";
import ThreeDotIcon from "assets/images/icon-3dots.png";
import UploadFileIcon from "assets/images/icons8-upload-document.svg";
import PencilIcon from "assets/images/icons8-pencil.svg";
import fileIcon from "assets/images/icons8-attach-48.svg";
import { useModal } from "services/hooks/useModal";
import { useQueryContactDocument, useMutationContactDocument } from "services/hooks/useHuman";
import { FormWorkExperience } from "./components";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import { ContactFile } from "views/human/shareComponents/common";
import useCustomReducer from "services/hooks/ppt/useCustomReducer";
import { uploadActions, uploadReducer } from "views/human/Reducers/Upload";
import { IFile, modifyUploadedFilesV2 } from "views/human/utils";
import { useUpload } from "services/hooks/useUpload";
import { validateFiles } from 'validation/file';

import style from 'views/human/styles/style.module.css'

import type { ContactDocument, Human, FileProps, FilePropsUpload } from "typings/human";
interface WorkExperienceProps {
  humanId: string;
  humanInfo: Human;
  companyID: any;
}

const DATE_FORMAT = "DD/MM/YYYY";

export const WorkExperience: FC<WorkExperienceProps> = memo((props) => {
  const { t: i18n } = useTranslation(["human"]);
  const ref = useRef<HTMLDivElement>(null);
  const { openModal, closeModal } = useModal();
  const { openDeleteConfirm } = useDeleteConfirm();
  const inputRef = useRef<HTMLInputElement>(null);

  const { humanId, humanInfo, companyID } = props;
  const { addFileToUpload } = useUpload({ appID: APP_KEY.HUMAN, companyID });
  const [
    uploads,
    {
      setUploadFile,
      removeUploadedFile,
      setUploadFileProgress,
      setIDFileUploaded,
      removeAllFiles,
    },
  ] = useCustomReducer(
    uploadReducer,
    uploadActions,
    {
      files: {},
    } as IFile
  );

  const {
    createContactDocumentAsync,
    updateContractDocumentAsync,
    deleteContractDocumentAsync,
    updateFileContractDocumentAsync,
    removeFileContractDocument,
  } = useMutationContactDocument();

  const {
    fetchNextPageContactDocument,
    totalRecord,
    listContactDocument,
    refetchListContactDocument,
  } = useQueryContactDocument(humanId, {
    type: 2, companyID
  });

  const [openFileOption, setOpenFileOption] = useState("");

  const handleFinishFormCreate = useCallback(
    async (values) => {
      const res = await createContactDocumentAsync({
        ...values,
        type: "2",
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
    (companyID?: string) => () => {
      openModal(
        <div
          className={
            "inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"
          }
        >
          <FormWorkExperience
            companyID={companyID || ""}
            onFinish={handleFinishFormCreate}
            title="Tạo mới kinh nghiệm thực tế tham gia các dự án"
          />
        </div>
      );
    },
    [openModal, handleFinishFormCreate]
  );

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
    (contactDocument: ContactDocument, companyID?: string) => () => {
      openModal(
        <div
          className={
            "inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"
          }
        >
          <FormWorkExperience
            title="Cập nhật kinh nghiệm thực tế tham gia các dự án"
            onFinish={handleFinishFormUpdate}
            contactDocumentID={contactDocument._id}
            companyID={companyID || ""}
            defaultValues={{
              fromDate: contactDocument.fromDate,
              toDate: contactDocument.toDate,
              field2: contactDocument?.field2,
              position2: contactDocument?.position2,
              contract: contactDocument?.contract,
              project: contactDocument.project,
              client: contactDocument.client,
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
        },
      });
    },
    [deleteContractDocumentAsync, openDeleteConfirm, refetchListContactDocument]
  );

  const handleClickUpload = useCallback(() => {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  }, []);

  const handleRemoveFileUpload = useCallback(async (
    file: FileProps | FilePropsUpload,
    contactDocumentID: string
  ) => {
    if (file._id) {
      await removeFileContractDocument({
        contactDocumentID,
        fileRemoveID: file._id,
      });
      refetchListContactDocument();
    }
    if ("id" in file) {
      removeUploadedFile(file.id);
    } else {
      removeUploadedFile(file._id);
    }
  }, [refetchListContactDocument, removeFileContractDocument, removeUploadedFile]);

  const handleUploadFile = useCallback(
    async (_fileUploads: IFile, contactDocumentID: string) => {
      // Upload files
      const listFileContractDocumentAsync = []
      for (const [key, { file }] of Object.entries(_fileUploads)) {
        const { _id } = await addFileToUpload({
          files: file,
          fileType: 2,
          progress: (percentCompleted) => {
            setUploadFileProgress(key, percentCompleted);
          },
        });
        if (_id) {
          listFileContractDocumentAsync.push(
            updateFileContractDocumentAsync({
              contactDocumentID,
              filesID: [_id],
            })
          );
          setIDFileUploaded(key, _id, contactDocumentID);
        }
      }
      Promise.all(listFileContractDocumentAsync).then(() => {
        removeAllFiles();
        refetchListContactDocument();
      }).catch(err => {
        console.error(err);
      })
    },
    [addFileToUpload, refetchListContactDocument, removeAllFiles, setIDFileUploaded, setUploadFileProgress, updateFileContractDocumentAsync]
  );

  const handleAttachFiles = useCallback(
    (contactDocumentID: string) =>
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const { error, message } = await validateFiles(e.target.files);
    		if(error) return toast.warn(message);

        const files = modifyUploadedFilesV2(e.target.files, contactDocumentID);
        setUploadFile(files);

        handleUploadFile(files, contactDocumentID);
        setOpenFileOption("");
      },
    [handleUploadFile, setUploadFile]
  );

  return (
    <div className="border-b-8 border-accent-light px-4 py-6">
      <HumanInfoHeader
        title={i18n("work-experience")}
        onClickAddNew={handleClickAddNew(humanInfo.company?._id)}
      />
      <div className="text-[13px]">
        <div className="flex justify-between mt-4 text-primary-gray">
          <p style={{ width: "10%" }}>{i18n("from-date")}</p>
          <p style={{ width: "10%" }}>{i18n("to-date")}</p>
          <p className="w-1/5 ">{i18n("field2")}</p>
          <p className="w-1/5 ">{i18n("contract-project-client")}</p>
          <p className="w-1/5 ">{i18n("position2")}</p>
          <p className="w-1/5 ">{i18n("attactment")}</p>
        </div>

        {listContactDocument.map((contactDocument) => (
          <div
            className="flex justify-start mt-4 relative"
            key={contactDocument._id}
          >
            <p style={{ width: "10%" }}>
              {moment(contactDocument.fromDate).isValid() &&
                moment(contactDocument.fromDate).format(DATE_FORMAT)}
            </p>
            <p style={{ width: "10%" }}>
              {moment(contactDocument.toDate).isValid() &&
                moment(contactDocument.toDate).format(DATE_FORMAT)}
            </p>
            <p className="w-1/5">{contactDocument?.field2?.name}</p>
            <div className="w-1/5">
              <p style={{ maxWidth: "80%" }}>
                {contactDocument.contract && (
                  <span className={style['t-human-spread']}>
                    {contactDocument.contract.name}
                  </span>
                )}
                {contactDocument.project && (
                  <span className={style['t-human-spread']}>
                    {contactDocument.project}
                  </span>
                )}
                {contactDocument.client && (
                  <span className={style['t-human-spread']}>
                    {contactDocument.client}
                  </span>
                )}
              </p>
            </div>
            <p className="w-1/5">{contactDocument?.position2?.name}</p>
            <div className="w-1/5 flex flex-col text-cbs-highlight-color">
              {contactDocument.files.map((elm) => (
                <ContactFile
                  key={elm._id}
                  file={elm}
                  contactDocumentID={contactDocument._id}
                  onRemoveFileUpload={handleRemoveFileUpload}
                />
              ))}
              {toArray(uploads.files).map((d) => {
                // {/* {toArray().map((d: any) => { */}
                const name =
                  "progress" in d ? d.file.name : d.file ? d.file.name : d.name;
                const size =
                  "progress" in d ? d.file.size : d.file ? d.file.size : d.size;
                const key = "progress" in d ? d.id : d._id;
                if (d.contactDocumentID === contactDocument._id) {
                  return (
                    <div
                      key={key}
                      className="flex justify-between items-center "
                    >
                      <div className="flex relative">
                        <div>
                          <img src={fileIcon} alt="PDF" />
                        </div>
                        <div className="ml-2">
                          <p>{name}</p>
                          <p
                            className="text-primary-gray"
                            style={{ fontSize: 10, maxWidth: "80%" }}
                          >
                            {`${Number(size / 1048576).toFixed(2)} MB`}
                          </p>
                        </div>
                        <div
                          className={className(
                            "relative w-[32px] h-[32px] border rounded-full border-blue-600",
                            {
                              hidden: "progress" in d && d.progress === 100,
                            }
                          )}
                        >
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                            className={className("text-primary")}
                          >
                            {d.progress + "%"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
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
                    onClick={handleClickUpdate(
                      contactDocument,
                      humanInfo.company?._id
                    )}
                  >
                    <img
                      src={PencilIcon}
                      alt="Pencil"
                      className="mr-5 pointer-events-none"
                    />
                    <span className="pointer-events-none">Cập nhật</span>
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
            <span className="text-primary">{`Xem thêm (${totalRecord - listContactDocument.length
              })`}</span>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
});

WorkExperience.displayName = 'WorkExperience'