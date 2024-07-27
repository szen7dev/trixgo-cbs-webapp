/*=====1.LIBRARY=====*/
import React, { FC, useCallback, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { FilterDateGroup } from "views/accounting/shareComponents/common";

/*=====4.PAGES/COMPONENTS=====*/
import PaginateV2 from "shareComponents/common/PaginateV2";

/*=====6.HOOKS/APIS=====*/
// import { APP_ID } from "apis/localdb";
// import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';

/*=====7.OTHER=====*/
import { createLinkAndClick } from "utils";

type PaginateHandle = React.ElementRef<typeof PaginateV2>;

export const FnbReportRevenue: FC = () => {
	useEffect(() => {
		document.title = "Seller";
	}, []);

	const history = useHistory();

	const ref = React.useRef<PaginateHandle>(null);

	const today = new Date();
	const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
	const currentMonth = today.getMonth()

	const [inputFilter, setInputFilter] = useState({
		fromDate: new Date(today.getFullYear(), currentMonth, 1),
		toDate: lastDayOfMonth
	})

	const [, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	})
	const { exportOrderAsync2 } = useFnbOrder({})

	const handleExportExcel = async () => {
		try {
			setStateExport({ isExporting: true });
			const { error, data } = await exportOrderAsync2({
				option: 1,
				fromDate: inputFilter.fromDate,
				toDate: inputFilter.toDate,
			});

			if (error) {
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
					<p className="text-lg mr-10">Báo cáo doanh số</p>
				</div>
				<FilterDateGroup fromDate={inputFilter.fromDate} endDate={inputFilter.toDate} onChangeDate={handleOnChangeDate} />
				<button onClick={handleExportExcel} title="Tải dữ liệu Excel">
					Tải dữ liệu Excel
				</button>
			</header>
		</main>
	);
};