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

/*=====4.PAGES/COMPONENTS=====*/
import PaginateV2 from "shareComponents/common/PaginateV2";
import { ModalZoomView } from "shareComponents/common";

/*=====5.TYPINGS=====*/
import { ImageProps } from "typings/common";

/*=====6.HOOKS/APIS=====*/
import { APP_ID } from "apis/localdb";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';

/*=====7.OTHER=====*/
import { FNB_INTERNAL } from "apis/localdb";
import { createLinkAndClick } from "utils";

export const FnbReportRevenue: FC = () => {
	useEffect(() => {
		document.title = "eShop";
	}, []);
	
	const history = useHistory();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.FNB.id });

	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");

	const [isShowImageFullScreen, setIsShowImageFullScreen] = useState(false);

	const [defaultState, setDefaultState] = useState({
	    mediaID: '',
	    images: [] as ImageProps[],
	    index: 0,
	    createAt: ""
  	});

	useEffect(() => {
		if (isSuccess && !(hasPermission)) {
			toast.error("Bạn không có quyền truy cập chức năng này. Vui lòng liên hệ ban quản trị.");
			history.push("/")
		}
	}, [hasPermission]);

	type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

	/**
	 * LÀM VIỆC VỚI EXCEL
	 */
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
	const handleExportExcel1 = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportOrderAsync2({
			option: 2,
			month: 1,
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
	const handleExportExcel2 = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportOrderAsync2({
			option: 2,
			month: 2,
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
	const handleExportExcel3 = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportOrderAsync2({
			option: 2,
			month: 3,
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
	const handleExportExcel4 = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportOrderAsync2({
			option: 2,
			month: 4,
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
	const handleExportExcel5 = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportOrderAsync2({
			option: 2,
			month: 5,
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
	const handleExportExcel6 = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportOrderAsync2({
			option: 2,
			month: 6,
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
	const handleExportExcel7 = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportOrderAsync2({
			option: 2,
			month: 7,
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
	const handleExportExcel8 = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportOrderAsync2({
			option: 2,
			month: 8,
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
	const handleExportExcel9 = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportOrderAsync2({
			option: 2,
			month: 9,
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
	const handleExportExcel10 = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportOrderAsync2({
			option: 2,
			month: 10,
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
	const handleExportExcel11 = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportOrderAsync2({
			option: 2,
			month: 11,
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
	const handleExportExcel12 = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportOrderAsync2({
			option: 2,
			month: 12,
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

	return (
		<main className="h-full overflow-auto">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<button onClick={history.goBack} className="mr-5">
                        <img src="/images/common/button_back.png" alt="Button Back" />
                    </button>
					<p className="text-lg mr-10">Báo cáo doanh số</p>
				</div>
				<button onClick={handleExportExcel} title="Tải dữ liệu Excel">
					Tải dữ liệu Excel
				</button>
			</header>

			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
				<thead className="bg-cbs-table-header h-10 border-b border-primary-border">
					<tr className="text-left text-sm text-primary-gray text-[14px]">
						<th className="pb-1 pt-1 w-[50px] font-normal">
							<div className="pl-2">
								TT
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-1/4">
							<div className="pl-2">
								Báo cáo
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Tải
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr className="text-[14px]">
						<td className={"p-2 border-0.5 border-primary-border text-cente"}>1</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							Tháng 1
						</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							<button onClick={handleExportExcel1} title="Tải dữ liệu Excel">
								Tải dữ liệu Excel
							</button>
						</td>
					</tr>
					<tr className="text-[14px]">
						<td className={"p-2 border-0.5 border-primary-border text-cente"}>2</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							Tháng 2
						</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							<button onClick={handleExportExcel2} title="Tải dữ liệu Excel">
								Tải dữ liệu Excel
							</button>
						</td>
					</tr>
					<tr className="text-[14px]">
						<td className={"p-2 border-0.5 border-primary-border text-cente"}>3</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							Tháng 3
						</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							<button onClick={handleExportExcel3} title="Tải dữ liệu Excel">
								Tải dữ liệu Excel
							</button>
						</td>
					</tr>
					<tr className="text-[14px]">
						<td className={"p-2 border-0.5 border-primary-border text-cente"}>4</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							Tháng 4
						</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							<button onClick={handleExportExcel4} title="Tải dữ liệu Excel">
								Tải dữ liệu Excel
							</button>
						</td>
					</tr>
					<tr className="text-[14px]">
						<td className={"p-2 border-0.5 border-primary-border text-cente"}>5</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							Tháng 5
						</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							<button onClick={handleExportExcel5} title="Tải dữ liệu Excel">
								Tải dữ liệu Excel
							</button>
						</td>
					</tr>
					<tr className="text-[14px]">
						<td className={"p-2 border-0.5 border-primary-border text-cente"}>6</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							Tháng 6
						</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							<button onClick={handleExportExcel6} title="Tải dữ liệu Excel">
								Tải dữ liệu Excel
							</button>
						</td>
					</tr>
					<tr className="text-[14px]">
						<td className={"p-2 border-0.5 border-primary-border text-cente"}>7</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							Tháng 7
						</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							<button onClick={handleExportExcel7} title="Tải dữ liệu Excel">
								Tải dữ liệu Excel
							</button>
						</td>
					</tr>
					<tr className="text-[14px]">
						<td className={"p-2 border-0.5 border-primary-border text-cente"}>8</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							Tháng 8
						</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							<button onClick={handleExportExcel8} title="Tải dữ liệu Excel">
								Tải dữ liệu Excel
							</button>
						</td>
					</tr>
					<tr className="text-[14px]">
						<td className={"p-2 border-0.5 border-primary-border text-cente"}>9</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							Tháng 9
						</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							<button onClick={handleExportExcel9} title="Tải dữ liệu Excel">
								Tải dữ liệu Excel
							</button>
						</td>
					</tr>
					<tr className="text-[14px]">
						<td className={"p-2 border-0.5 border-primary-border text-cente"}>10</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							Tháng 10
						</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							<button onClick={handleExportExcel10} title="Tải dữ liệu Excel">
								Tải dữ liệu Excel
							</button>
						</td>
					</tr>
					<tr className="text-[14px]">
						<td className={"p-2 border-0.5 border-primary-border text-cente"}>11</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							Tháng 11
						</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							<button onClick={handleExportExcel11} title="Tải dữ liệu Excel">
								Tải dữ liệu Excel
							</button>
						</td>
					</tr>
					<tr className="text-[14px]">
						<td className={"p-2 border-0.5 border-primary-border text-cente"}>12</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							Tháng 12
						</td>
						<td className={"p-2 border-0.5 border-primary-border"}>
							<button onClick={handleExportExcel12} title="Tải dữ liệu Excel">
								Tải dữ liệu Excel
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</main>
	);
};