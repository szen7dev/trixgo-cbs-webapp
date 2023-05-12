/*=====1.LIBRARY=====*/
import React, { FC, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import PaginateV2 from "shareComponents/common/PaginateV2";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { APP_ID } from "apis/localdb";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";

/*=====7.OTHER=====*/

export const FnbReportAllPage: FC = () => {
	useEffect(() => {
		document.title = "FnB";
	}, []);
	
	const history = useHistory();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.FNB.id });

	useEffect(() => {
		if (isSuccess && !(hasPermission)) {
			toast.error("Bạn không có quyền truy cập chức năng này. Vui lòng liên hệ ban quản trị.");
			history.push("/")
		}
	}, [hasPermission]);

	type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);

	return (
		<main className="h-full overflow-auto">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<button onClick={history.goBack}>
                        <img src="/images/common/button_back.png" alt="Button Back" />
                    </button>
				</div>
			</header>

			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
				<tr className="text-[14px]">
					<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border text-center w-10"}>1</td>
					<td className={"p-2 border-0.5 border-primary-border text-cbs-highlight-color w-1/4"}>
						<Link to ={`/fnb/reports/type/1`}>
							Danh sách lỗi nhân viên
						</Link>
					</td>
					<td className={"p-2 border-0.5 border-primary-border w-2/4"}>
						Để quản lý biết là đã mắc lỗi nhiều lần hay chưa và gán phạt, bao gồm người gán lỗi, ngày gán lỗi, người mắc lỗi, giá trị phạt
					</td>
					<td className={"p-2 border-0.5 border-primary-border"}>
						Vào xem chi tiết để tải báo cáo
					</td>
				</tr>
				{/* <tr className="text-[14px]">
					<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border text-center w-10"}>2</td>
					<td className={"p-2 border-0.5 border-primary-border text-cbs-highlight-color w-1/4"}>
						<Link to ={`/fnb/reports/type/3`}>
							Khách hàng tiềm năng
						</Link>
					</td>
					<td className={"p-2 border-0.5 border-primary-border w-2/4"}>
						Thống kê khách hàng tiềm năng để đưa ra chính sách Chăm sóc cho phù hợp/NPS
					</td>
					<td className={"p-2 border-0.5 border-primary-border"}>
						Vào xem chi tiết để tải báo cáo
					</td>
				</tr> */}
				<tr className="text-[14px]">
					<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border text-center w-10"}>2</td>
					<td className={"p-2 border-0.5 border-primary-border text-cbs-highlight-color w-1/4"}>
						<Link to ={`/fnb/reports/type/4`}>
							Bảng tính lương nhân viên
						</Link>
					</td>
					<td className={"p-2 border-0.5 border-primary-border w-2/4"}>
						Bảng tổng hợp lương nhân viên
					</td>
					<td className={"p-2 border-0.5 border-primary-border"}>
						Vào xem chi tiết để tải báo cáo
					</td>
				</tr>
				<tr className="text-[14px]">
					<td className={"p-2 border-t-0.5 border-b-0.5 border-primary-border text-center w-10"}>3</td>
					<td className={"p-2 border-0.5 border-primary-border text-cbs-highlight-color w-1/4"}>
						<Link to ={`/fnb/reports/type/5`}>
							Báo cáo doanh số
						</Link>
					</td>
					<td className={"p-2 border-0.5 border-primary-border w-2/4"}>
						Báo cáo doanh số theo từng điểm bán
					</td>
					<td className={"p-2 border-0.5 border-primary-border"}>
						Vào xem chi tiết để tải báo cáo
					</td>
				</tr>
			</table>
		</main>
	);
};