import React, { FC, useCallback, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useModal } from "services/hooks/useModal";
import debounce from "lodash/debounce";
import { SearchInput, ModalContainer } from "shareComponents/common";
import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
import FolderIcon from "assets/images/icons8-folder.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import { CreateFnbProduct } from "./modal";
import moment from "moment";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { toast } from "react-toastify";
import { APP_ID } from "apis/localdb";
import { useFnbProduct } from 'services/hooks/fnb/useFnbProduct';
import PaginateV2 from "shareComponents/common/PaginateV2";
import { formatNumberMoney } from "utils/converter";
import CameraIcon from "assets/images/camera-icon.svg";

const TYPE_PRODUCT = [
	{ value: 1, text: "Thông thường" },
	{ value: 2, text: "Topping" },
]
export const FnBProductPage: FC = () => {
	const history = useHistory();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });
	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");

    const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFnbProduct({ params: { keyword: keyword }, isFetchList: true, isFetchInfo: false  });
	console.log({listWithPager});

	const getStateChecked = useCallback((id: string) => {
		return idsChecked.includes(id) ? true : false;
	}, [idsChecked]);

	const onClickCheckButton = (id: string) => {
		setIdsChecked([id]);
	};

	const getStateCheckedAll = useCallback(() => {
		return idsChecked.length == listWithPager.length;
	}, [idsChecked]);

	const onClickCheckAll = () => {
		if (idsChecked.length == listWithPager.length) {
			setIdsChecked([]);
		} else {
			const idsAll = listWithPager.map((e: any) => e._id);
			setIdsChecked(idsAll);
		}
	};

	const [modalCreateProject, setModalCreateProject] = useState<boolean>(false);
	const toggleModalCreateProject = () => setModalCreateProject(!modalCreateProject);

	const [initialValues, setInitialValues] = useState(null);
	const onConfirmCreateProject = () => refetch();

	useEffect(() => {
		if (isSuccess && !(hasPermission && dataUserAccess?.level == 0)) {
			toast.error("Không có quyền truy cập. Bạn không phải là quản trị viên!");
			history.push("/")
		}
	}, [hasPermission, dataUserAccess]);

	type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

	return (
		<main className="h-full overflow-auto">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<p className="text-lg">Danh sách thực đơn</p>
					<SearchInput
						classNameWrapper="ml-4"
						classNameInput="outline-none w-[296px]"
						onChange={debounce(
							(event: any) => setKeyword(event.target.value),
							500
						)}
					/>
					{/* <FinancialCashFlowFilterButton /> */}
					{(idsChecked && idsChecked.length) ? (
						<div className="flex items-center gap-2 border-l-2 border-primary-border px-4 ml-4">
							{/* <div className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray">
								<img src={DownloadIcon} alt="Download" />
							</div> */}
							{idsChecked.length == 1 ?
								<>
								<div
									className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray"
									onClick={() => {
										const item = listWithPager[pageIndex].find((e: any) => e._id == idsChecked[0]);
										setInitialValues({
											...item,
											startTime: item.startTime ? moment(item.startTime).format('MM/DD/YYYY') : '',
											expiredTime: item.expiredTime ? moment(item.expiredTime).format('MM/DD/YYYY') : '',
										});
										toggleModalCreateProject();
									}}
								>
									<img src={PencilIcon} alt="Pencil" />
								</div>
							</> : <></>
							}
						</div>
					) : <></>}
				</div>
				<div className="flex items-center">
					<button
						className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold mr-6"
						onClick={() => {
							setInitialValues(null);
							toggleModalCreateProject();
						}}
					>
						Tạo mới
					</button>
					<button className="w-10 h-10 rounded-full bg-cbs-gray flex items-center justify-center hover:bg-accent-light">
						<img src={Vertical3Dots} alt="3Dots" />
					</button>
				</div>
				<PaginateV2
                        ref={ref}
                        totalRecord={totalRecord}
                        totalPages={totalPage}
                        limit={20}
                        hasNextPage={hasNextPage}
                        isFetching={isLoading}
                        nextPageAction={() => {
                            fetchNextPage();
                            setPageIndex(oldState => oldState+1)
                        }}
                        prevPageAction={() => {
                            setPageIndex(oldState => oldState-1)
                        }}
                    />
			</header>

			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
				<thead className="bg-cbs-table-header h-10 border-b border-primary-border">
					<tr className="text-left text-sm text-primary-gray">
						<th className="pb-1 pt-1 text-center" style={{ width: "3.5%" }}>
							<div className="border-r-2 border-gray-300 flex items-center justify-center">
								<input
									className="form-check-input"
									type="checkbox"
									checked={getStateCheckedAll()}
									onChange={() => onClickCheckAll()}
								/>
							</div>
						</th>
						<th className="pb-1 pt-1 w-[250px]">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Tên thực đơn
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-[150px]">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Mã hiệu
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-[150px]">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Đơn vị tính
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Đơn giá
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Phân loại
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Ghi chú
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Hình ảnh
							</div>
						</th>

					</tr>
				</thead>
				{
					(listWithPager[pageIndex]??[]).map((item: any, i: any) => (
						<tr key={item._id} className="text-[14px]">
							<td className={"p-2 border-0.5 border-primary-border text-center"}>
								<input
									className="form-check-input"
									type="checkbox"
									checked={getStateChecked(item._id)}
									onChange={() => onClickCheckButton(item._id)}
								/>
							</td>
							<td className={"p-2 border-0.5 border-primary-border text-cbs-highlight-color"}>
								<Link to ={`/fnb/product/${item._id}`}>
									{item?.name}
								</Link>
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.sign}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.unit}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(item?.unitPrice||0)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{TYPE_PRODUCT[item.type-1]?.text}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.note}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								<div style={{display: "flex"}}>
									<img
										className="w-[75px] h-[75px] object-contain"
										src={"https://thpt-phamhongthai.edu.vn/wp-content/uploads/2022/07/hinh-nen-girl-xinh-full-hd-cho-laptop-va-may.jpg"}
										alt="Left side bar"
									/>
									<label className="ml-2">
										<div className="w-[30px] h-[30px] bg-secondary-gray rounded-full flex items-center justify-center">
											<img
											src={CameraIcon}
											alt="Camera"
											className="w-[15px] h-[13px]"
											/>
											<input type="file" name="signature" id="signature" className="hidden" accept="image/*" />
										</div>
									</label>
								</div>
							</td>
						</tr>
				))}

			</table>

			<ModalContainer isModalOpen={modalCreateProject} toggle={toggleModalCreateProject}>
				<div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light">
					<CreateFnbProduct
						modalType={initialValues ? "update" : "create"}
						show={modalCreateProject}
						toggle={toggleModalCreateProject}
						initialValues={initialValues ? initialValues : undefined}
						onConfirm={onConfirmCreateProject}
					/>
				</div>
			</ModalContainer>

		</main>
	);
};
