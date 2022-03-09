import React, { FC, LegacyRef } from "react";
import moment from "moment";
import classNames from "classnames";
import _ from "lodash";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

import HumanAvatar from "assets/images/human-avatar.svg";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import PDFIcon from "assets/images/icons8-pdf-48 1.png";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import IconDownload from "assets/images/icons8-download-48_3.svg";
import TestImage from "assets/images/home-slide-img1.jpg";
import { ResponseProps } from "typings/task";
import { FileUpdatePayload } from "typings/file";
import TaskRepository from "apis/task";
import FileRepository from "apis/upload";
import { ImageProps } from "typings/media";

type Props = {
	expanded?: boolean;
	isHighlight?: boolean;
	response: ResponseProps;
	onClickImage?: (images: ImageProps[], index: number) => void;
	divRef?: LegacyRef<HTMLDivElement> | undefined;
	refetchListResponseMarked?: () => void;
	setAmountMarkedResponse?: React.Dispatch<React.SetStateAction<number>>;
};

export const RelatedResponseItem: FC<Props> = ({ expanded, isHighlight, response, divRef, onClickImage, refetchListResponseMarked, setAmountMarkedResponse }) => {
	const { mutateAsync: updateMarkResponseAsync } =
		useMutation((payload: { commentID: string, taskID: string, official: boolean }) =>
			TaskRepository.updateMarkResponse(payload)
		);

	const { mutateAsync: updateFileAsync } =
		useMutation((payload: FileUpdatePayload) =>
			FileRepository.updateFile(payload)
		);

	const handleMarkChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		await updateMarkResponseAsync({
			commentID: response._id,
			taskID: response.task._id,
			official: e.target.checked
		})

		if(e.target.checked) {
			setAmountMarkedResponse && setAmountMarkedResponse((previousValue: any) => previousValue + 1);
		} else{
			setAmountMarkedResponse && setAmountMarkedResponse((previousValue: any) => previousValue - 1);
		}

		refetchListResponseMarked && refetchListResponseMarked();
	}

	const handleUpdateDescriptionFile = _.debounce(async (e: any) => {
		await updateFileAsync({
			fileID: e.target.dataset.fileid,
			description: e.target.value
		});

		toast.success('Cập nhật ghi chú thành công', { autoClose: 2000 });
	}, 1000)

	return (
		<>
			<div className={
				classNames("flex",
					isHighlight
						? 'bg-blue-500 shadow-lg bg-opacity-50 scale-110 p-3 transition ease-in-out delay-150 duration-300'
						: 'animate-[wiggle_1s_ease-in-out_infinite]'
				)
			} ref={divRef}>
				<img src={response.author?.image ? `${process.env.REACT_APP_URL_S3_USER}/${response.author?.image}` : HumanAvatar} alt="Avatar" className="w-[44px] h-[44px]" />
				<div className="w-full ml-5">
					<div className="flex justify-between">
						<div>
							<p className="text-[14px]">{response.author?.bizfullname}</p>
							{expanded && (
								<p className="text-[13px] text-primary-gray pb-5">
									{response.author?.position?.name}
								</p>
							)}
						</div>
						<div className="flex items-center space-x-3">
							<span className="text-[13px] text-primary-gray">
								{moment(response.createAt).format('HH:mm DD/MM/YYYY')} ({moment(response.createAt).fromNow()})
							</span>
							<input type="checkbox" defaultChecked={response.official} onChange={handleMarkChange} />
							<button
								className={`${expanded ? "h-10 bg-lighter-gray" : "pl-3"
									} text-[13px] w-10 flex justify-center items-center rounded-full`}
							>
								<DotsVerticalIcon />
							</button>
						</div>
					</div>

					{/* Content */}
					<div className={`${expanded ? "" : "max-w-[632px] truncate"}`}>
						<span 
							className="text-[13px]"
                            dangerouslySetInnerHTML={{
                              __html: response.content
                            }}>
						</span>
					</div>

					{/* File */}
					{expanded && (
						<div>
							{(response.files && response.files.length) ? response.files.map(file => (
								<div className="flex w-full my-2" key={file._id}>
									<div className="w-full bg-gray-100 p-2 rounded-sm border border-slate-400">
										<a href={`${process.env.REACT_APP_URL_S3}${file.path}`} target="__blank">
											<div className="flex">
												<div>
													<img src={PDFIcon} className="w-8" alt="PDF" />
												</div>
												<div className="ml-3 w-full">
													<div className="flex">
														<span className="w-5/6 break-all">
															{file.nameOrg}
														</span>
														<div className="w-1/6 flex justify-end">
															<img
																src={CopyIcon}
																className="w-[24px] h-[24px]"
																alt="Copy"
															/>
														</div>
													</div>

													<div className="flex w-full mt-2 indeterminate:">
														<span className="w-[70%] text-[13px] text-primary-gray">
															{file.author?.bizfullname}
														</span>
														<span className="text-right w-[30%] text-[13px] text-primary-gray">
															{moment(file.createAt).format('HH:mm DD/M/YYYY')}
														</span>
													</div>
												</div>
											</div>
										</a>
									</div>
									<div className="w-2/8 px-3 pt-3">
										<textarea
											className="h-full focus:outline-none"
											placeholder="Nhập nội dung ghi chú cho file"
											defaultValue={file.description}
											data-fileid={file._id}
											onKeyUp={handleUpdateDescriptionFile}
										/>
									</div>
									<div className="w-1/8 flex flex-col items-center justify-between">
										<input
											type="checkbox"
											className="cbs-checkbox-2 w-3.5 h-3.5 checked:bg-cbs-completed checked:border-cbs-completed rounded-[3px] border-[1px] border-primary-border focus:ring-2 focus-visible:outline-none focus:ring-cbs-completed focus:ring-opacity-30" />
										<div className="rounded-full p-2 border-2">
											<a href={`${process.env.REACT_APP_URL_S3}${file.path}`} target="__blank">
												<img src={IconDownload} alt="Avatar" className="w-6" />
											</a>
										</div>
									</div>
								</div>
							)) : ''}

							<div className="flex w-full space-x-2 mt-5 mb-2">
								{(response.images && response.images.length) ? response.images.map((file, index) => {
									if (index < 2) {
										return (
											<button className="w-1/3" key={file._id} onClick={() => onClickImage && onClickImage(response.images || [], index)}>
												<img src={file.path ? `${process.env.REACT_APP_URL_S3}${file.path}` : TestImage} className="w-full" alt="test" />
											</button>
										)
									}

									if (index === 3) {
										return (
											<div className="w-1/3 relative bg-black flex items-center justify-center" key={file._id}>
												<img
													src={file.path ? `${process.env.REACT_APP_URL_S3}${file.path}` : TestImage}
													className="absolute top-0 left-0 w-full h-full z-0 object-cover opacity-40"
													alt="test"
												/>
												<div className="relative z-6">
													<p className="text-4x-large text-white">+{response.images && response.images.length - 3}</p>
												</div>
											</div>
										)
									}
								}) : ''}
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="w-full h-px mb-5 mt-1 bg-gray-200" />
		</>
	);
};

RelatedResponseItem.defaultProps = {
	expanded: true,
	isHighlight: false
};