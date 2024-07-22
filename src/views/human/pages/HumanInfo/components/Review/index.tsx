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
import {
  useQueryContactDocument,
  useMutationContactDocument,
} from "services/hooks/useHuman";
import { FormReview } from "./components";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import { ContactFile } from "views/human/shareComponents/common";
import useCustomReducer from "services/hooks/ppt/useCustomReducer";
import {
  uploadActions,
  uploadReducer,
} from "views/human/Reducers/Upload";
import { IFile, modifyUploadedFilesV2 } from "views/human/utils";
import { useUpload } from "services/hooks/useUpload";
import { validateFiles } from 'validation/file';

import type {
  ContactDocument,
  FileProps,
  FilePropsUpload,
} from "typings/human";

const DATE_FORMAT = "DD/MM/YYYY";
interface CertificateProps {
  humanId: string;
  companyID: any;
}

export const Review: FC<CertificateProps> = memo((props) => {
  const { t: i18n } = useTranslation(["human"]);
  const ref = useRef<HTMLDivElement>(null);
  const { openModal, closeModal } = useModal();
  const { openDeleteConfirm } = useDeleteConfirm();
  const inputRef = useRef<HTMLInputElement>(null);
  const { humanId, companyID } = props;

  const { addFileToUpload } = useUpload({
    appID: APP_KEY.HUMAN,
    companyID
  });

  const [
    uploads,
    {
      setUploadFile,
      removeUploadedFile,
      setUploadFileProgress,
      setIDFileUploaded,
      removeAllFiles,
    },
  ] = useCustomReducer(uploadReducer, { ...uploadActions }, {
    files: {},
  } as IFile);

  const {
    createContactDocumentAsync,
    updateContractDocumentAsync,
    deleteContractDocumentAsync,
    updateFileContractDocumentAsync,
    removeFileContractDocument,
  } = useMutationContactDocument();

  const {
    refetchListContactDocument,
    fetchNextPageContactDocument,
    totalRecord,
    listContactDocument,
  } = useQueryContactDocument(humanId, {
    type: 6, companyID
  })

  const [openFileOption, setOpenFileOption] = useState("");

  const handleFinishFormCreate = useCallback(
    async (values) => {
      const res = await createContactDocumentAsync({
        ...values,
        type: "6",
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
        <FormReview
          title="Tạo mới"
          onFinish={handleFinishFormCreate}
        />
      </div>
    );
  }, [handleFinishFormCreate, openModal]);

  const handleFinishFormUpdate = useCallback(
    async (values) => {
      console.log(values)
      const res = await updateContractDocumentAsync({
        ...values,
        contactID: humanId,
      });
      if (!res.error) {
        toast.success("Cập nhật thành công");
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
          <FormReview
            title="Cập nhật"
            onFinish={handleFinishFormUpdate}
            contactDocumentID={contactDocument._id}
            defaultValues={{
              name: contactDocument.name,
              fromDate: contactDocument.fromDate,
              note: contactDocument.note,
            }}
          />
        </div>
      );
    },
    [openModal, handleFinishFormUpdate]
  );

  const handleClickUpload = useCallback(() => {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  }, []);

  const handleRemoveFileUpload = useCallback(
    async (file: FileProps | FilePropsUpload, contactDocumentID: string) => {
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
    },
    [refetchListContactDocument, removeFileContractDocument, removeUploadedFile]
  );

  const handleUploadFile = useCallback(
    async (_fileUploads: IFile, contactDocumentID: string) => {
      // Upload files
      const listFileContractDocumentAsync = [];
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
      Promise.all(listFileContractDocumentAsync)
        .then(() => {

          removeAllFiles();
          refetchListContactDocument();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [
      addFileToUpload,
      refetchListContactDocument,
      removeAllFiles,
      setIDFileUploaded,
      setUploadFileProgress,
      updateFileContractDocumentAsync,
    ]
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
    <div className="border-accent-light px-4 py-6">
      <HumanInfoHeader
        title={'5-Đánh giá nhân sự'}
        onClickAddNew={handleClickAddNew}
      />
      <div className="text-[13px]">
        <div className="flex justify-between mt-4 text-primary-gray">
        <p style={{ width: "10%" }}>Ngày tháng</p>
          <p style={{ width: "40%" }}>Nội dung</p>
          <p style={{ width: "30%" }}>Ghi chú</p>
          <p style={{ width: "20%" }}>Tệp đính kèm</p>
        </div>

        {listContactDocument.map((contactDocument) => (
          <div
            key={contactDocument._id}
            className="flex justify-between mt-4 relative"
          >
            <div style={{ width: "10%" }}>{moment(contactDocument.fromDate).format(DATE_FORMAT)}</div>
            <p style={{ width: "40%" }}>
              {contactDocument.name && (
                <span >{contactDocument.name}</span>
              )}
            </p>
            <p style={{ width: "30%" }}>{contactDocument.note}</p>
            <div className="flex flex-col text-cbs-highlight-color" style={{ width: "20%" }}>
              {contactDocument.files.map((elm) => (
                <ContactFile
                  key={elm._id}
                  file={elm}
                  contactDocumentID={contactDocument._id}
                  onRemoveFileUpload={handleRemoveFileUpload}
                />
              ))}
              {toArray(uploads.files).map((d) => {
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
});

Review.displayName = 'Review'