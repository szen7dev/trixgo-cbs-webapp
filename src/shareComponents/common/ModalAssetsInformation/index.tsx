import { FC, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import moment from "moment";
import { NavLink } from 'react-router-dom';
import {
	useQueryListStoreChild,
  } from "services/hooks/useStoreProduct";
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";
import { formatNumberMoney } from "utils/cmcs";
const DATE_FORMAT = "DD/MM/YYYY HH:mm";

interface Props {
	open: boolean,
	onClose: (open: boolean) => unknown,
	dataPopup: any,
}
export const ModalAssetsInformation: FC<Props> = ({ open, onClose, dataPopup }) => {
	const { optionPopup, staffPopup, contactPopup, goodsPopup, assetsPopup } = dataPopup;
	const [pageIndex, setPageIndex] = useState(0);
	const ref = useRef<RefPaginateHandle>(null);

	const {
	dataNotFilter,
	loading,
	totalPages,
	totalRecord,
	limit,
	hasNextPage,
	fetchNextPage,
	fetchPrevPage,
	refetch,
	} = useQueryListStoreChild({
		option: 1,
		limit: 50,
		assetsID: assetsPopup,
		sortKey: JSON.stringify(['date__-1', 'createAt__-1']),
	})

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
								<div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll  px-4">
									<div className='pt-2'>
										<div className="flex mt-4 mb-3 justify-between items-center">
											<span className="text-primary-gray text-[16px] font-bold">Báo cáo Sửa chữa thiết bị ({totalRecord})</span>
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
										<div className={"body-table table-row"}>
											<div
												className={
												"px-1 py-2 table-cell box-border border-b align-middle"
												}
											>
												Ngày
											</div>
											<div className={"px-2 py-2 table-cell box-border border-b w-2/6"}>
												Nội dung
											</div>
											<div
												className={
												"px-2 py-2 table-cell box-border border-b"
												}
											>
												Khối lượng
											</div>
											<div
												className={
												"px-2 py-2 table-cell box-border border-b"
												}
											>
												Đơn giá
											</div>
											<div
												className={
												"px-2 py-2 table-cell box-border border-b"
												}
											>
												Thành tiền
											</div>
										</div>
										{dataNotFilter[pageIndex] && dataNotFilter[pageIndex].map((item: any, index: any) => (
											<div className={"body-table table-row"} key={item._id}>
												<div
													className={
													"px-1 py-2 table-cell box-border border-b align-middle"
													}
												>
													{moment(item.date).format('DD/MM/YYYY')}
												</div>
												<div className={"px-2 py-2 table-cell box-border border-b w-2/6"}>
													<p>{item.name} - <p>{item.note}</p></p>
													<p className='text-cbs-highlight-color'><i>{item?.goods?.name}</i></p>
													<p className='text-primary-gray'><i>Mã khách: {item?.customer?.name}</i></p>
													<NavLink className="text-primary" to={`/store/home/${item?.parent?._id}`}>
														<p className="text-primary-gray"><i>Phiếu: {item?.parent?.name}</i></p>
													</NavLink>
												</div>
												<div
													className={
													"px-2 py-2 table-cell box-border border-b text-right"
													}
												>
													{formatNumberMoney(item?.quantity)}
												</div>
												<div
													className={
													"px-2 py-2 table-cell box-border border-b text-right"
													}
												>
													{formatNumberMoney(item?.unitPrice)}
												</div>
												<div
													className={
													"px-2 py-2 table-cell box-border border-b text-right"
													}
												>
													{formatNumberMoney(item?.amount)}
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