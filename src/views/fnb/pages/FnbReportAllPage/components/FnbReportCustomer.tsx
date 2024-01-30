/*=====1.LIBRARY=====*/
import { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';

/*=====7.OTHER=====*/
import { FNB_INTERNAL } from "apis/localdb";
import { createLinkAndClick } from "utils";

export const FnbReportCustomer: FC = () => {
	const [getOrders, setOrders] = useState([])
	useEffect(() => {
		document.title = "Seller";
	}, []);
	const history = useHistory();

	/**
	 * LÀM VIỆC VỚI EXCEL
	 */
	const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	});
	const { exportOrderAsync2, exportOrderAsync3 } = useFnbOrder({});

	const handleExportExcel2 = async () => {
		try {
		  setStateExport({ isExporting: true });
		  const { error, data } = await exportOrderAsync2({
			option: 2
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
  
	const handleExportExcel = async () => {
	  try {
		setStateExport({ isExporting: true });
		const { error, data } = await exportOrderAsync3({
		  filterParams: {  
		  }
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
					<p className="text-lg mr-10">Danh sách khách hàng tiềm năng</p>
				</div>
				<button onClick={handleExportExcel2} title="Tải dữ liệu Excel">
					Tải số liệu khách hàng
				</button>
				{/* <button onClick={handleExportExcel} title="Tải dữ liệu Excel">
					Tải dữ liệu Excel
				</button> */}
			</header>

			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
				<thead className="bg-cbs-table-header h-10 border-b border-primary-border">
					<tr className="text-left text-sm text-primary-gray text-[14px]">
						<th className="pb-1 pt-1 w-[50px] font-normal">
							<div className="pl-2">
								TT
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-1/6">
							<div className="pl-2">
								Khách hàng
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-1/6">
							<div className="pl-2">
								Địa chỉ
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Điện thoại
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Giá trị đơn hàng
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Chiết khấu
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Giảm giá
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Giảm trừ tích điểm
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Thanh toán
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Tổng số đơn hàng
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Tổng số sản phẩm
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Ghi chú
							</div>
						</th>
					</tr>
				</thead>
			</table>
		</main>
	)
}