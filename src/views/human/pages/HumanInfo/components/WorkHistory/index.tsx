import { FC, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import className from "classnames";
import { APP_KEY } from 'utils/constants';

import toArray from "lodash/toArray";
import { HumanInfoHeader } from "views/human/shareComponents/common";
import { IFile, modifyUploadedFilesV2 } from "views/human/utils";
import ThreeDotIcon from "assets/images/icon-3dots.png";
import UploadFileIcon from "assets/images/icons8-upload-document.svg";
import PencilIcon from "assets/images/icons8-pencil.svg";
import DeleteIcon from "assets/images/icons8-remove.svg";
import PDFIcon from "assets/images/icons8-pdf.svg";
import { useOnClickOutside } from "services/hooks/useOnclickOutside";
import { useModal } from "services/hooks/useModal";
import { FormWorkHistory } from "./components";
import { useQueryContactDocument, useMutationContactDocument } from "services/hooks/useHuman";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import { useUpload } from "services/hooks/useUpload";
import useCustomReducer from "services/hooks/ppt/useCustomReducer";
import { uploadActions, uploadReducer } from "views/human/Reducers/Upload";
import { ContactFile } from "views/human/shareComponents/common";
import type { ContactDocument, FileProps, FilePropsUpload } from "typings/human";
interface PropWorkHistory {
	humanId: string;
	companyID: any;
}

const DATE_FORMAT = "DD/MM/YYYY";

export const WorkHistory: FC<PropWorkHistory> = (props) => {
	const { t: i18n } = useTranslation(["human"]);
	const ref = useRef<HTMLDivElement>(null);
	const { openModal, closeModal } = useModal();
	const inputRef = useRef<HTMLInputElement>(null);
	const { openDeleteConfirm } = useDeleteConfirm();
	const { humanId, companyID } = props;
	const { addFileToUpload } = useUpload({ appID: APP_KEY.HUMAN, companyID });

	const [openFileOption, setOpenFileOptionById] = useState("");
	const [
		uploads,
		{
			setUploadFile,
			removeUploadedFile,
			setUploadFileProgress,
			setIDFileUploaded,
			removeAllFiles
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
		refetchListContactDocument,
		totalRecord,
		listContactDocument,
	} = useQueryContactDocument(humanId, {
		type: 1,
	});

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
		(contactDocument: ContactDocument) => () => {
			openDeleteConfirm({
				deleteAction: async () => {
					const res = await deleteContractDocumentAsync(contactDocument._id);
					if (res.status === 200) {
						refetchListContactDocument();
						setOpenFileOptionById("");
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
		async (_fileUploads: IFile, contactDocumentID: string, companyID: string) => {
			// Upload files
			const listFileContractDocumentAsync = []
			for (const [key, { file }] of Object.entries(_fileUploads)) {
				const { _id } = await addFileToUpload({
					files: file,
					fileType: 2,
					companyID,
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
		(contactDocumentID: string, companyID: any) =>
			async (e: React.ChangeEvent<HTMLInputElement>) => {
				if (!e.target.files) return;
				const files = modifyUploadedFilesV2(e.target.files, contactDocumentID);
				setUploadFile(files, contactDocumentID);
				handleUploadFile(files, contactDocumentID, companyID);
				setOpenFileOptionById("");
			},
		[handleUploadFile, setUploadFile]
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
							<div className="w-1/4 flex flex-col">
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
										"progress" in d
											? d.file.name
											: d.file
												? d.file.name
												: d.name;
									const size =
										"progress" in d
											? d.file.size
											: d.file
												? d.file.size
												: d.size;
									const key = "progress" in d ? d.id : d._id;
									if (d.contactDocumentID === contactDocument._id) {
										return (
											<div
												key={key}
												className="flex justify-between items-center "
											>
												<div className="flex relative">
													<div>
														<img src={PDFIcon} alt="PDF" />
													</div>
													<div className="ml-2">
														<p>{name}</p>
														<p
															className="text-primary-gray"
															style={{ fontSize: 10, maxWidth: "80%" }}
														>
															{`${size}KB`}
														</p>
														<button
															type="button"
															className={className(
																"close-btn absolute top -top-3.5 -right-3.5 bg-white rounded-3xl h-6 w-6 flex justify-center items-center", {
																hidden: !d._id
															}
															)}
															onClick={() =>
																handleRemoveFileUpload(d, contactDocument._id)
															}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-4 w-4"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M6 18L18 6M6 6l12 12"
																/>
															</svg>
														</button>
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
												onChange={handleAttachFiles(contactDocument._id, contactDocument.company._id)}
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
						<span className="text-primary">{`Xem thêm (${totalRecord - listContactDocument.length
							})`}</span>
					</button>
				</div>
			) : (
				""
			)}
		</div>
	);
};
