/*=====1.LIBRARY=====*/
import React, { FC, useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { FilterDateGroup } from "views/accounting/shareComponents/common";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import PaginateV2 from "shareComponents/common/PaginateV2";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { APP_ID } from "apis/localdb";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useFnbShift } from 'services/hooks/fnb/useFnbShift';

/*=====7.OTHER=====*/
// import { FNB_INTERNAL } from "apis/localdb";
import { createLinkAndClick } from "utils";

export const FnbReportSallary: FC = () => {
	useEffect(() => {
		document.title = "eShop";
	}, []);
	
	const history = useHistory();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.FNB.id });

	const [inputFilter, setInputFilter] = useState({
	keyword: '',
	fromDate: new Date(new Date().getFullYear(), 0, 1),
	toDate: new Date(new Date().getFullYear(), 11, 31)
	})

	useEffect(() => {
		if (isSuccess && !(hasPermission)) {
			toast.error("Bạn không có quyền truy cập chức năng này. Vui lòng liên hệ ban quản trị.");
			history.push("/")
		}
	}, [hasPermission]);
	
	/**
	 * LÀM VIỆC VỚI EXCEL
	 */
	const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	})
	const { exportExcelAsync, exportExcelAsync2 } = useFnbShift({})
	const handleExportExcel = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportExcelAsync({
			fromDate: inputFilter.fromDate,
			toDate: inputFilter.toDate,
		  });
	
		  if(error) {
			return toast.warn(data?.message);
		  }
	
		  data && createLinkAndClick(data, '_self');
		} catch (error: any) {
		  toast.error(error.message)
		} finally {
		  setStateExport({ isExporting: false });
		}
	}

	const handleOnChangeDate = useCallback((date, input) => {
	if (input) {
		setInputFilter((value) => ({ ...value, toDate: date }))
	} else {
		setInputFilter((value) => ({ ...value, fromDate: date }))
	}
	}, [])

	return (
		<main className="h-full overflow-auto">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<button onClick={history.goBack} className="mr-5">
                        <img src="/images/common/button_back.png" alt="Button Back" />
                    </button>
					<p className="text-lg mr-10">Bảng tính lương nhân viên đểm bán</p>
				</div>
				<FilterDateGroup fromDate={inputFilter.fromDate} endDate={inputFilter.toDate} onChangeDate={handleOnChangeDate} />
				<button onClick={handleExportExcel} title="Tải dữ liệu Excel">
					Tải dữ liệu Excel
				</button>
			</header>

			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
				{/* <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
					<tr className="text-left text-sm text-primary-gray text-[14px]">
						<th className="pb-1 pt-1 w-[50px] font-normal">
							<div className="pl-2">
								TT
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-1/4">
							<div className="pl-2">
								Điểm bán
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Doanh số
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Số giờ làm việc
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Ghi chú
							</div>
						</th>
					</tr>
				</thead> */}
				{/* {
					(listWithPager[pageIndex]??[]).map((item: any, i: any) => (
						<tr key={item._id} className="text-[14px]">
							<td className={"p-2 border-0.5 border-primary-border text-cente"}>{i+1}</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.mistake?.name}
								<p className=" text-[13px] text-gray-500"><i>Người ghi nhận: {item?.userCreate?.fullname}</i></p>
								<p className=" text-[13px] text-gray-500"><i>Thời gian: {moment(item.createAt).format('DD/MM/YYYY HH:mm')}</i></p>
							</td>
							<td className={"p-2 border-0.5 border-primary-border "}>
								{item?.executor?.fullname}
							</td>
							<td className={"p-2 border-0.5 border-primary-border "}>
								{item?.funda?.name}
							</td>

							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(item?.amount||0)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.note}
							</td>
						</tr>
					))
				} */}
			</table>
		</main>
	);
};