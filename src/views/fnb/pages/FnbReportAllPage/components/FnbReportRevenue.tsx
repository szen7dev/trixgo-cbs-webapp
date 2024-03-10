/*=====1.LIBRARY=====*/
import React, { FC, useCallback, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
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
import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';

/*=====7.OTHER=====*/
import { createLinkAndClick } from "utils";

export const FnbReportRevenue: FC = () => {
	useEffect(() => {
		document.title = "Seller";
	}, []);
	
	const history = useHistory();

	type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);

	const [inputFilter, setInputFilter] = useState({
		keyword: '',
		fromDate: new Date(new Date().getFullYear(), 0, 1),
		toDate: new Date(new Date().getFullYear(), 11, 31)
	})

	const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	})
	const { exportOrderAsync2 } = useFnbOrder({})
	const handleExportExcel = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportOrderAsync2({
			option: 1
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