import { FC, Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import moment from "moment";

import useCheckedList from 'services/hooks/ppt/useCheckedList';
import { useTask } from "services/hooks/useTask";
import { useAuth } from "services/hooks/auth/useAuth";

import XIcon from 'assets/icons/X';
import CaretDownIcon from "assets/images/icon-caret-down.png";
import DownloadIcon from "assets/images/icons8-download-48_2.png";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import PrintIcon from "assets/images/icons8-print-32.png";
import HumanAvatar from "assets/images/human-avatar.svg";
import { Link } from 'react-router-dom';

interface Props {
	open: boolean,
	onClose: (open: boolean) => unknown,
	dataPopup: any,
}
const ModalInformation: FC<Props> = ({ open, onClose, dataPopup }) => {
	const { user } = useAuth();
	const [data, setData] = useState<Array<number>>([])
	const { assigned, checked, checkboxRef, handleChangeCheckbox, handleCheckAll } = useCheckedList(data);
	const { companyPopup, typeStatusPopup, assigneePopup, projectPopup } = dataPopup;
	let { projectID } = dataPopup;
	let companyOfAssignee;
	if(projectPopup){
		projectID = projectPopup;
	}

	if(companyPopup){
		companyOfAssignee = companyPopup;
	}else{
		companyOfAssignee = user?.company?._id
	}

	useEffect(() => {
		const _data = Array.from({ length: 10 }).map((_, i) => i);
		setData(_data);
	}, [])

	// Việc quá hạn
	const {
		listTasks,
		totalRecord,
		nextPageListTask: fetchNextPage,
		refetchListTask,
        hasNextPage,
	} = useTask({
		params: {
			projectID, companyOfAssignee, isPassPermision: "1", typeStatus: typeStatusPopup, statusNe: "3",
			assigneeID: assigneePopup
		},
		isFetch: true
	});

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="fixed inset-y-0 right-0 overflow-hidden z-50" onClose={onClose}>
				<div className="absolute inset-0 overflow-hidden">
					<div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
						<Transition.Child
							as={Fragment}
							enter="transform transition ease-in-out duration-300 sm:duration-300"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transform transition ease-in-out duration-300 sm:duration-300"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="relative w-screen max-w-[680px]">
								<div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
									<div className="px-6 py-3 inline-flex justify-between items-center">
										<Dialog.Title className="text-2x-large text-gray-900 truncate max-w-lg">Thông tin trao đổi</Dialog.Title>
										<button
											type="button"
											className="rounded-md text-cbs-subtext hover:text-black focus:outline-none"
											onClick={() => onClose(false)}
										>
											<span className="sr-only">Close panel</span>
											<XIcon className="h-5 w-5" aria-hidden="true" />
										</button>
									</div>
									{/* Header */}
									<div className='px-6 pt-2'>
										<div className="flex mt-4 mb-3 pl-5 justify-between items-center">
											<div className="flex items-center">
												<input type="checkbox" className='cbs-checkbox' ref={checkboxRef} onClick={handleCheckAll} />
												<button>
													<img
														className="w-6 opacity-50"
														src={CaretDownIcon}
														alt="Dropdown"
													/>
												</button>
												<span className="text-primary-gray mx-3">|</span>
												<button>
													<img
														className="w-6 mx-1 opacity-70"
														src={DownloadIcon}
														alt="DownloadIcon"
													/>
												</button>
												<button>
													<img
														className="w-6 mx-1 opacity-80"
														src={SendEmailIcon}
														alt="SendEmailIcon"
													/>
												</button>
												<button>
													<img
														className="w-6 mx-1 opacity-70"
														src={PrintIcon}
														alt="PrintIcon"
													/>
												</button>
											</div>

											<div className="flex space-x-5">
												<div className="flex items-center">
													<div className="w-3 h-3 bg-red-500" />
													<span className="ml-1 text-primary-gray font-normal">
														Quá hạn
													</span>
												</div>
												<div className="flex items-center">
													<div className="w-3 h-3 bg-yellow-500" />
													<span className="ml-1 text-primary-gray font-normal">
														Tuần tới
													</span>
												</div>
												<div className="flex items-center">
													<div className="w-3 h-3 bg-green-500" />
													<span className="ml-1 text-primary-gray font-normal">
														{" "}
														{">7 ngày"}
													</span>
												</div>
											</div>
										</div>
									</div>

									<div className="px-6 pt-2 relative flex-1 overflow-y-auto">
										{/* Content */}
										{listTasks?.map((task: any, index) => {
											let colorActualFinishTime  = `red`;
											let textActualFinishTime  = `Quá hạn`;
											if(typeStatusPopup == 2){
												colorActualFinishTime  = `yellow`;
												textActualFinishTime  = `Tuần tới`;
											}

											if(typeStatusPopup == 3){
												colorActualFinishTime  = `green`;
												textActualFinishTime  = `>7 ngày`;
											}
											
											if(typeStatusPopup == 4){
												colorActualFinishTime  = `blue`;
												textActualFinishTime  = `Hoàn thành`;
											}

											return (
												<div key={index} className="my-4 pl-5">
													<div className="flex">
														<div>
															<input type="checkbox" value={task} checked={Boolean(assigned[task])} className='cbs-checkbox block self-start' onChange={handleChangeCheckbox} />
														</div>
														<div className="pl-2">
															<Link to={`/pcm/detail/${task._id}`}>
																{ task.project.sign }.{ task.name }
															</Link>
															<div className="flex justify-between items-center my-2">
																<div className="flex items-center">
																	{/* <img
																		src={HumanAvatar}
																		className="w-6 rounded-full"
																		alt="Avatar"
																	/> */}
																	<img
																		src={`${process.env.REACT_APP_URL_S3_USER}/${task.assignee.image}`}
																		alt="Thumbnail"
																		className="w-4 h-4 rounded-full"
																	/>
																	<span className="text-primary-gray ml-2">
																	{ task.assignee.bizfullname }
																	</span>
																</div>
																<div className="flex items-center">
																	<div className={`bg-${colorActualFinishTime}-100 rounded-xl px-2 py-1`}>
																		<span className={`text-[13px] text-${colorActualFinishTime}-500`}>
																			{textActualFinishTime}
																		</span>
																	</div>
																	<span className="text-[13px] ml-2"> {moment(task.actualFinishTime).format("DD/MM/YYYY")}</span>
																</div>
															</div>
														</div>
													</div>
													<div className="w-full h-px bg-gray-200" />
												</div>
											)
										})}
										{/* /End replace */}
										{hasNextPage && (
											<button
												className="text-primary text-[13px]"
												onClick={fetchNextPage}
											>
												{`Xem thêm (${
													Number(totalRecord) - listTasks.length
												})`}
											</button>
										)}
									</div>
									{/* Footer */}
									<div>
									</div>
								</div>
							</div>
							
						</Transition.Child>
					</div>
				</div>
				
			</Dialog>
		</Transition.Root>

	)
}

export default ModalInformation
