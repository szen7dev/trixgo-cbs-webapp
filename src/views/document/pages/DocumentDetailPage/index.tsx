import React, { FC, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useUpload } from 'services/hooks/useUpload';
import { validateFiles } from 'validation/file';
import { read, utils } from 'xlsx';

import { APP_KEY } from 'utils/constants';
import { ModalCreateDocumentChild } from 'views/document/sharedComponents/common';
import { ModalConfirm } from "shareComponents/common";
import { ButtonIcon, ButtonMore } from 'shareComponents/common/Button'
import { useDocumentCustom, useListFilterDocument } from "services/hooks/document/useDocument";

import {
  // DropdownFilterButton,
  // ButtonCreate,
  GroupActionsPageDetail
} from "views/document/sharedComponents/common";

import "views/document/styles/document.css";
import { TableGeneralInformation } from "./components/TableGeneralInformation";
import { TableFileAttach } from "./components/TableFileAttach";
import { TableSubtextProfile } from "./components/TableSubtextProfile";

import iconMove from "assets/images/icons8-move-stock-96.svg";
import iconShareFolder from "assets/images/icons8-shared-folder-100_1.svg";
import iconUpload from "assets/images/icons8-upload-file-100 1.png";
import iconAdd from "assets/images/icon-add.svg";

import { useQueryDetailDocument } from "services/hooks/ppt/useDocument";
import { useQueryListDocumentChild } from "services/hooks/document/useDocumentChild";
import { useQueryListDocumentFile } from "services/hooks/document/useDocumentFile";

import { useModal } from "services/hooks/useModal";
import { useAuth } from "services/hooks/auth/useAuth";
import { ModalQRCode } from "shareComponents/common/ModalQRCode";

const DATE_FORMAT = "DD/MM/YYYY HH:mm";

export const DocumentDetailPage: FC = () => {
  const history = useHistory();
  const params = useParams<any>();
  const { user } = useAuth();
  const { t } = useTranslation(["document"]);
  const { openModal, closeModal } = useModal();

  const [isShow, setIsShow] = useState(false);
  const [isToggleModalQRCode, setIsToggleModalQRCode] = useState(false);
  const toggleModalQRCode = () => setIsToggleModalQRCode(!isToggleModalQRCode);
  const { onFetchDetailDocumentAsync, detailDocument } =
    useQueryDetailDocument();

  const docChildPayload = useQueryListDocumentChild({
    parentID: params.docID,
  });

  const {
    createDocumentFileMutateAsync,
    deleteDocumentFileMutateAsync,
    documentFiles,
    refetch,
    fetchNextPage: fetchNextPageDocumentFile,
    totalRecord: totalDocumentFile,
  } = useQueryListDocumentFile({
    documentID: params.docID,
  });

  const { addFileToUpload } = useUpload({
    appID: APP_KEY.DOCUMENT,
    companyID: user?.company._id,
    projectID: detailDocument?.project?._id,
    packageID: detailDocument?.package?._id,
  });

  React.useEffect(() => {
    if (!user || !Object.keys(detailDocument).length) return;

    if (!detailDocument.package?.members?.includes(user._id)) {
      history.push('/document/home');
      toast.error('Bạn không có quyền truy cập vào hồ sơ này');
    }
  }, [detailDocument])

  React.useEffect(() => {
    if (!params.docID) return;
    onFetchDetailDocumentAsync(params.docID);
  }, [onFetchDetailDocumentAsync, params.docID]);

  const toggleModalCreateDocumentChild = () => setIsShow(!isShow);

  const handleOpenModalConfirmDelete = (fileId: string) => {
    openModal(
      <div
        className={
          "inline-block w-[521px] h-[150px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
        }
      >
        <ModalConfirm
          title="Bạn có thực sự muốn xóa file không?"
          defaultText={false}
          onConfirm={handleDeleteFileAttach.bind(null, fileId)}
          onCancel={closeModal}
        />
      </div>
    );
  };

  const handleSetFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || !event.target.files.length) return;

      const validation = await validateFiles(event.target.files);
  		if(validation.error) return toast.warn(validation.message);

      const arrFileID: Array<string | undefined> = []

      // Upload files
      for (const [, file] of Object.entries(event.target.files)) {
        const { _id } = await addFileToUpload({
          files: file as any,
          fileType: 2,
          useCompress: true
        })
        arrFileID.push(_id)
      }

      const { error, data } = await createDocumentFileMutateAsync({
        documentID: params.docID,
        filesID: arrFileID,
      });

      if (error) {
        return toast.warning(data?.message);
      }

      toast.success('Thêm file thành công');
      refetch();
    } catch (error) {
      console.log({ error })
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  const handleDeleteFileAttach = async (fileId: string) => {
    if(!fileId) return toast.warn('Không tìm thấy file')

    try {
      const { error, data } = await deleteDocumentFileMutateAsync({ docFileID: fileId })

      if(error) {
        return toast.warn(data.message);
      }

      refetch();
      return toast.success('Xóa file thành công');
    } catch (error) {
      if(error instanceof Error) {
        return toast.error(error.message);
      }

      if(typeof error === 'string') {
        return toast.error(error);
      }
    } finally {
      closeModal();
    }
  }

  //_____Import, export excel
  const [dataImport, setDataImport] = useState([]);
  const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
      isExporting: false,
  });

  const { downloadTemplateImportExcelDocumentAsync, importDocumentFromExcelAsync, exportDocumentAsync } = useDocumentCustom({});

  /**
 * Xử lý import excel (đọc file)
 */
  const handleImport = ($event: any) => {
    const files = $event.target.files;
    if (files.length) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const wb = read(event.target.result);
            const sheets = wb.SheetNames;

            if (sheets.length) {
                const rows: any = utils.sheet_to_json(wb.Sheets[sheets[1]]); // Index=1 (tức Sheet số 2 từ trái sang)
                
                // Set data để Import
                setDataImport(rows)
            }
        }
        
        reader.readAsArrayBuffer(file);
    }

    // Đọc xong thì xóa value trong Input đi
    $event.target.value = null;
  }

  // Gọi tới API để đẩy data lên
  useEffect(() => {
      if(dataImport.length){
          const fetchData = async () => {
              const data = await importDocumentFromExcelAsync({ documentID: params.docID, dataImport: JSON.stringify(dataImport) });
              setDataImport([]);
              // refetchTaskInfo?.()

              if(!data.error){
                  return toast.success("Import thành công");
              }
              return toast.error(data.message);
          }

          fetchData();
      }
      
      console.log('=========DATA THAY ĐỔI RỒI==============')
  }, [dataImport])

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
        {/* <DropdownFilterButton /> */}
        <GroupActionsPageDetail className="flex items-center flex-1" onGenerateQRCode={toggleModalQRCode} detailDocument={detailDocument} refeshInfoDocument={onFetchDetailDocumentAsync}/>
        {/* <ButtonCreate onClick={toggleModal} /> */}
        {/* <ButtonMore /> */}
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
                {detailDocument?.project?.sign} {">"} {detailDocument?.package?.name} {">"}  {detailDocument?.parent?.name}
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
        <div className="bg-white pb-3 pt-5 px-3.5">
          <div className="flex flex-wrap">
            <h3 className="text-cbs-subtext text-x-large font-bold flex-1">
              Tài liệu đính kèm
            </h3>
            {/* <ButtonIcon
              title="Thêm"
              icon={() => (
                <img src={iconUpload} alt="" className="mr-2.5 h-6 w-6" />
              )}
            /> */}
            <label className="px-[10px] py-[5px] h-10 rounded-md bg-gray-100 flex justify-center items-center text-primary text-[13px] cursor-pointer">
              <img src={iconUpload} alt="" className="mr-2.5 h-6 w-6" /> Thêm file
              <input type="file" name="files" id="file" className="hidden" accept="*" multiple onChange={handleSetFiles} />
            </label>
          </div>
          <TableFileAttach fileAttachs={documentFiles} handleDeleteFileAttach={handleOpenModalConfirmDelete}>
            {Number(totalDocumentFile) - documentFiles.length > 0 && (
              <button
                className="text-primary text-[13px]"
                onClick={() => fetchNextPageDocumentFile()}
              >
                {`Xem thêm (${Number(totalDocumentFile) - documentFiles.length
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
        <div className="bg-white pb-3 pt-5 px-3.5">
          <div className="flex flex-wrap">
            <h3 className="text-cbs-subtext text-x-large font-bold flex-1">
              Hồ sơ văn bản con
            </h3>
            {/* <ButtonMore className="mr-6" /> */}
            <button className={"flex items-center justify-center mx-3 ml-3"}>
                  <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required hidden onChange={handleImport}
                  accept=".xlsx, .xlsm, .xls, .csv"/>
                  <label className="custom-file-label" htmlFor="inputGroupFile">Import excel tạo Hồ sơ</label>
              </button>
            <ButtonIcon
              title="Thêm"
              onClick={toggleModalCreateDocumentChild}
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
      <ModalCreateDocumentChild isShow={isShow} toggle={toggleModalCreateDocumentChild} document={detailDocument} refetchListChild={docChildPayload.refetchListDocumentChild} />

      <ModalQRCode
        value={{
          appID: APP_KEY.DOCUMENT,
          id: params.docID
        }}
        isToggle={isToggleModalQRCode}
        toggle={toggleModalQRCode}
      />
    </div>
  );
};

export default DocumentDetailPage;