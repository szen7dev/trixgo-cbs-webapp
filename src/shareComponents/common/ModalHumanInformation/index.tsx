import { FC, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import moment from "moment";
import { NavLink } from 'react-router-dom';
import { useQueryListTimeSheetParent } from "services/hooks/useTimeSheet";
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";
const DATE_FORMAT = "DD/MM/YYYY HH:mm";

interface Props {
	open: boolean,
	onClose: (open: boolean) => unknown,
	dataPopup: any,
}
export const ModalHumanInformation: FC<Props> = ({ open, onClose, dataPopup }) => {
	const { optionPopup, staffPopup, contactPopup, goodsPopup } = dataPopup;
	const [pageIndex, setPageIndex] = useState(0);
	const ref = useRef<RefPaginateHandle>(null);

	const {
		dataNotFilter,
		refetch,
		totalPages,
		totalRecord,
		fetchNextPage,
		fetchPrevPage,
		limit,
		loading,
		hasNextPage,
	  } = useQueryListTimeSheetParent({ humanID: staffPopup, sortOption: 2, type: 3, subtype: 2 });

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
									<div className='px-6 pt-2'>
										<div className="flex mt-4 mb-3 justify-between items-center">
											<span className="text-primary-gray text-[16px] font-bold">Danh sách nghỉ phép ({totalRecord})</span>
											<PaginateV2
												ref={ref}
												totalRecord={totalRecord}
												totalPages={totalPages}
												limit={limit}
												hasNextPage={hasNextPage}
												isFetching={loading}
												nextPageAction={() => {
													setPageIndex((oldState) => oldState + 1);
													fetchNextPage();
												}}
												prevPageAction={() => {
													setPageIndex((oldState) => oldState - 1);
													fetchPrevPage();
												}}
											/>
										</div>
									</div>

									<div className="relative flex-1 overflow-y-auto">
										{dataNotFilter[pageIndex] && dataNotFilter[pageIndex].map((item: any, index: any) => (
											<div className={"body-table table-row"} key={item._id}>
												<div
													className={
														"px-4 py-2 table-cell box-border border-b align-middle w-3"
													}
												>
													{Number(index + 1)}
												</div>
												<div
													className={
													"px-1 py-2 table-cell box-border border-b align-middle"
													}
												>
													{moment(item.date).format('DD/MM/YYYY')}
													<p>{item.name}</p>
													<p><i>{item?.assignee?.fullname}</i></p>
												</div>
												<div className={"px-2 py-2 table-cell box-border border-b w-2/6"}>
													{item.note}
												</div>
												<div
													className={
													"px-2 py-2 table-cell box-border border-b text-right"
													}
												>
													{item?.hours}
												</div>
												<div
													className={
													"px-1 py-2 table-cell box-border border-b align-middle"
													}
												>
													<NavLink  to={`/timesheet/home/${item?.parent?._id}`}>
														<p>{item?.parent?.name}</p>
													</NavLink>
													<p className={"mt-1 text-gray-500"}>
														<i>Tạo: {item?.userCreate?.fullname} {moment(item.createAt).format(DATE_FORMAT)}</i>
													</p>
												</div>
											</div>
										))}
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