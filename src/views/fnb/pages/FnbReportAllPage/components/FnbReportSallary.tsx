/*=====1.LIBRARY=====*/
import { FC, useCallback, useState, useEffect } from "react";
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
		document.title = "Seller";
	}, []);
	
	const history = useHistory();
	const { hasPermission, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.FNB.id });

	const today = new Date();
	const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
	const currentMonth = new Date().getMonth()
	const [inputFilter, setInputFilter] = useState({
	  fromDate: new Date(new Date().getFullYear(), currentMonth, 1),
	  toDate: lastDayOfMonth
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
		</main>
	)
}