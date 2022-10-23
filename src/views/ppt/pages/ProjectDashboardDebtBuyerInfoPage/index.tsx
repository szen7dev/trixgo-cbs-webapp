import React, { FC, useEffect, useState } from "react";
import { useParams, Link, useHistory } from 'react-router-dom';
import iconBack from "assets/images/icon-back-gray.svg";
import {formatNumberMoney} from "utils/cmcs";

// Hook
import { UseContractIPCListWithPager } from 'services/hooks/cmcs/useContractIPC';
import { useProject } from 'services/hooks/items/useProject';
import PaginateV2 from "shareComponents/common/PaginateV2";
import moment from "moment";
import { CONTRACT_COME_IN_STATUS } from "apis/localdb";
const getStatusValue = (value: number) => {
	return CONTRACT_COME_IN_STATUS.find(item => item.value === value)?.text;
}
const ProjectDashboardDebtBuyerInfoPage: FC = () => {
	type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

	const { id: projectID, buyerInfoID } = useParams<{ id: string, buyerInfoID: string }>();
    const history = useHistory();
	const {
        listContractIPCWithPager,
        totalRecord,
        totalPage,
        nextCursor,
        refetch,
        fetchNextPage,
        hasNextPage,
        isLoading
    } = UseContractIPCListWithPager(true, { outin: 2, projectID, sellerInfo: buyerInfoID, option: 1 }, "", 20)
	
	useEffect(() => {
		document.title = `Công nợ công ty`
	}, []);
	
	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className={"sticky top-0 bg-white z-10"}>
				<div className={"header-table flex w-full top-0 bg-white pb-2"}>
					<button
                        onClick={history.goBack}
                        className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[30px] max-h-[30px] min-w-[30px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}>
                        <img src={iconBack} alt={"----"} className={"w-[18px]"}/>
                    </button>
					<div className="flex-1 flex items-center text-[15px] ml-2">
						<p className="text-lg text-primary-gray">
							Công nợ công ty
						</p>
					</div>
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
			</div>
			<div className="flex-1 overflow-y-auto">
				<table className="text-black text-medium border-collapse space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
					<thead className="">
						<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
							<th className="px-3 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border w-1">
								TT
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Hợp đồng
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Số hiệu, ngày ký
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Kỳ thực hiện
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Giá trị đề nghị
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Thời hạn
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Đã thanh toán
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Còn lại
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Bên bán
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Bên mua
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
								Trạng thái
							</th>
						</tr>	
					</thead>
					<tbody className="">
					{
                        (listContractIPCWithPager[pageIndex]??[]).map((item: any, i: number) => (
                            <tr key={i}>
                                <td className={"border-0.5 border-primary-border p-2"}>
                                    {i+1}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2"}>
                                    {item?.contract.name}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2"}>
									{item?.contract.sign}
                                    <p>
                                        <i className="text-primary-gray">{
                                            moment(item?.contract.date).format("L")
                                        }</i>
                                    </p>
                                </td>
                                <td className={"border-0.5 border-primary-border p-2"}>
									{item?.name}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2 text-right"}>
									{formatNumberMoney(item?.recommendedPayment)}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2 text-right"}>
									{moment(item?.timeForPayment).format("L")}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2 text-right"}>
									{formatNumberMoney(item?.amountPaid)}
                                </td>
								<td className={"border-0.5 border-primary-border p-2 text-right"}>
									{formatNumberMoney(item?.remainingPayment)}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2"}>
									{item?.buyerInfo?.name}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2"}>
									{item?.sellerInfo?.name}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2"}>
									{getStatusValue(item?.contract.status)}
                                </td>
                            </tr>
                        ))
                    }
					</tbody>
				</table>
				{/* <ModalInformation open={visibleDrawer} onClose={toggleVisible} dataPopup={{ companyPopup, typeStatusPopup, projectID }}/> */}
			</div>
		</div >
	);
};

export default ProjectDashboardDebtBuyerInfoPage;