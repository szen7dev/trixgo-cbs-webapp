/*=====1.LIBRARY=====*/
import React, { FC, useCallback, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import moment from "moment";
import { formatNumberMoney } from "utils/converter";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TriangleDown from "assets/icons/TriangleDown";
import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
import iconSelectTime from "assets/images/icons8-omnichannel-96 1.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput, ModalContainer } from "shareComponents/common";
import PaginateV2 from "shareComponents/common/PaginateV2";
// import { CreateFnbProductQoutas } from "./modal";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { APP_ID } from "apis/localdb";
import { useModal } from "services/hooks/useModal";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useFnbProduct } from 'services/hooks/fnb/useFnbProduct';
import { useFnbQuota } from 'services/hooks/fnb/useFnbQuota';
import { useFunda } from 'services/hooks/items/useFunda';

/*=====7.OTHER=====*/
import { FNB_INTERNAL } from "apis/localdb";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import { values } from "lodash";
import { FormControl, InputLabel, MenuItem, NativeSelect, Select, SelectChangeEvent, styled, ToggleButton, ToggleButtonGroup } from "@mui/material";

const TYPE_PRODUCT = [
	{ value: 1, text: "Thông thường" },
	{ value: 2, text: "Topping" },
]

export const FnbStorePage: FC = () => {
	useEffect(() => {
		document.title = "Trixgo | FnB";
	}, []);

	const history = useHistory();
	const { productID } = useParams<{ productID: string }>();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });

	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");
	const { info: infoProduct } = useFnbProduct({ params: { productID }, isFetchList: false, isFetchInfo: true });
	// console.log({ infoProduct });

	/**
	 * List mẩu tin
	 */
	const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFunda({
		params: {
			keyword: keyword,
			limit: 30,
			// productID, 
			// populates: JSON.stringify({
			// 	path: 'goods', select: "name unit"
			// }) 
		},
		isFetchList: true,
		isFetchInfo: false
	});
	// console.log({listWithPager});

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

	const SelectYear = () => {
		return (
			<div className="selectInput flex border-0.5 rounded-md" style={{ maxHeight: "30px" }}>
				<img src={iconSelectTime} alt="" className="absolute w-[30px] h-[30px]" style={{ padding: "1px" }} />
				<FormControl
					sx={{ minWidth: 120, maxHeight: "30px", padding: "0", border: "0", outline: "none" }}
					className="relative"
				>
					<NativeSelect
						defaultValue={0}
						disableUnderline
						inputProps={{
							name: 'time',
							id: 'selectInput',
						}}
						sx={{ maxHeight: "30px", fontSize: "14px", color: "#666666" }}
						className="text-[14px] text-primary-gray"
					>
						<option value={0} className="my-2 py-2 text-[14px] text-primary-gray" style={{ lineHeight: "30px" }}>Tất cả</option>
						<option value={10} className="my-2 py-2 text-[14px] text-primary-gray">Năm 2022</option>
						<option value={20} className="my-2 py-2 text-[14px] text-primary-gray">Năm 2022</option>
						<option value={30} className="my-2 py-2 text-[14px] text-primary-gray">Năm 2022</option>
					</NativeSelect>
				</FormControl>
			</div>
		);
	}

	const CustomToggleButton = styled(ToggleButton)(() => ({
		border: "0.5px solid #CCCCCC !important",
		borderRadius: "5px !important",
		'&.Mui-selected, &.Mui-selected:hover': {
			color: 'white',
			backgroundColor: "#4781CF",
		},
	}));
	const SelectMonth = () => {
		const [month, setMonth] = React.useState<string | null>('left');

		const handleMonth = (
			event: React.MouseEvent<HTMLElement>,
			newMonth: string | null,
		) => {
			setMonth(newMonth);
		};
		return (
			<div className="selectInput flex " style={{ maxHeight: "30px" }}>
				<ToggleButtonGroup
					value={month}
					exclusive
					onChange={handleMonth}
					aria-label="text alignment"
					sx={{
						display: "flex",
						gap: "0.5rem",
						border: "0",
						borderRadius: "0",
						marginLeft: "10px",
					}}
				>
					<CustomToggleButton value="T1">
						<span>T1</span>
					</CustomToggleButton>
					<CustomToggleButton value="T2" >
						<span>T2</span>
					</CustomToggleButton>
					<CustomToggleButton value="T3">
						<span>T3</span>
					</CustomToggleButton>
					<CustomToggleButton value="T4" >
						<span>T4</span>
					</CustomToggleButton>
					<CustomToggleButton value="T5" >
						<span>T5</span>
					</CustomToggleButton>
					<CustomToggleButton value="T6" >
						<span>T6</span>
					</CustomToggleButton>
					<CustomToggleButton value="T7">
						<span>T7</span>
					</CustomToggleButton>
					<CustomToggleButton value="T8" >
						<span>T8</span>
					</CustomToggleButton>
					<CustomToggleButton value="T9">
						<span>T9</span>
					</CustomToggleButton>
					<CustomToggleButton value="T10" >
						<span>T10</span>
					</CustomToggleButton>
					<CustomToggleButton value="T11" >
						<span>T11</span>
					</CustomToggleButton>
					<CustomToggleButton value="T12" >
						<span>T12</span>
					</CustomToggleButton>
				</ToggleButtonGroup>
			</div>
		);
	}

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
			<header className="mt-1 sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] pl-3 pr-6 border-0.5 border-primary-border rounded-t-2xl" style={{borderRadius:"15px 15px 0px 0px",}}>
				<div className="flex items-center gap-2">
					<div className="flex items-center">
						{/* <button onClick={history.goBack}>
							<img src="/images/common/button_back.png" alt="Button Back" />
						</button> */}
						<p className="text-lg">{infoProduct?.name}</p>
						<SearchInput
							classNameWrapper="ml-4"
							classNameInput="outline-none w-[296px]"
							onChange={debounce(
								(event: any) => setKeyword(event.target.value),
								500
							)}
						/>
					</div>
					<SelectYear />
					<SelectMonth />
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
						setPageIndex(oldState => oldState + 1)
					}}
					prevPageAction={() => {
						setPageIndex(oldState => oldState - 1)
					}}
				/>
			</header>

			<table className="table-fixed border-collapse w-full overflow-auto  border-primary-border">
				<thead className="h-10 border-b border-primary-border">
					<tr className="text-left text-sm text-primary-gray font-bold">
						<th className="pb-1 pt-1 text-center font-bold" style={{ width: "3.5%" }}>TT</th>
						<th className="pb-1 pt-1" >
							<div className=" pl-2 " style={{ maxWidth: "300px" }}>
								Điểm bán
							</div>
						</th>
						<th className="pb-1 pt-1 ">
							<div className="  pl-2">
								Doanh số
							</div>
						</th>
						<th className="pb-1 pt-1 ">
							<div className="  pl-2">
								Nhập kho
							</div>
						</th>
						<th className="pb-1 pt-1 ">
							<div className=" pl-2">
								Tỷ lệ %
							</div>
						</th>
						<th className="pb-1 pt-1 w-[200px]">
							<div className=" pl-2">
								Đánh giá
							</div>
						</th>
						<th className="pb-1 pt-1 ">
							<div className=" pl-2">
								Ghi chú
							</div>
						</th>
					</tr>
				</thead>

				{
					(listWithPager[pageIndex] ?? []).map((item: any, i: any) => (
						<tr key={item._id} className="text-[14px]">
							<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border text-center"}>{Number(i + 1)}</td>
							<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border"}>
								{item?.name}
							</td>
							<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border text-cbs-highlight-color"}>
								{formatNumberMoney(0 || 0)}
								<Link to={`/fnb/store/${item._id}/import`}>
									<p><i>Xem chi tiết</i></p>
								</Link>
							</td>
							<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border"}>
								{formatNumberMoney(0 || 0)}
								<Link to={`/fnb/store/${item._id}/export`}>
									<p><i>Xem chi tiết</i></p>
								</Link>
							</td>
							<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border"}>
								{formatNumberMoney(0 || 0)}
							</td>
							<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border"}>
								<span className="text-cbs-down-text">Rủi ro, vượt kiểm soát</span>
								<span className="text-cbs-completed">Rủi ro, vượt kiểm soát</span>
							</td>
							<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border"}>
								{item?.description}
							</td>
						</tr>
					))
				}
			</table>
		</main>
	);
};