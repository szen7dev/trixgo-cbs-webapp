import { FC, useEffect, useState } from "react";
import { usePcmProjectBudget } from "services/hooks/pcm/usePcmProjectBudget";
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { RightClickMenuWrapper } from "shareComponents/common";
import MenuChildRow from './components/MenuChildRow';
// import BugetRowGroup from "./components/BudgetRowGroup";
import BugetRowGroupTemp from "./components/BudgetRowGroupTemp";
import { useProject } from 'services/hooks/items/useProject';
import { formatNumberMoney } from "utils/cmcs";
import { APP_ID } from 'apis/localdb';
import { useHistoryTraffics } from "services/hooks/auth/useAuth";

const ProjectBudgetPage: FC = () => {
	 //_____Start history traffict
	 const payloadHistoryTraffic: any = {
		appID: APP_ID.PCM.id,
		menuID: APP_ID.PCM.menuPcmProject.budget.id,
		type: "1"
	  };
	const { createHistoryTraffics } = useHistoryTraffics();
	useEffect(() => {
		createHistoryTraffics({...payloadHistoryTraffic, type: 1});
	}, []);
	//_____End history traffict
	const { id: projectID } = useParams<{ id: string }>();
	const {
		listPcmProjectBudget,
		hasNextPage,
		fetchNextPage,
		totalRecord
	} = usePcmProjectBudget({
		projectID
	});

	const [show, setShow] = useState<boolean>(false);

	const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID,
			select: "budget vatBudget forecastBudget vatForecastBudget contractValue contractVatValue contractPlus contractVatPlus contractAdvancePaymentPaid contractProduce contractVatProduce contractAcceptance contractVatAcceptance contractPlusAcceptance contractVatPlusAcceptance contractAmountPaid contractRemainingPayment",
			populates: ""
		},
		isFetchInfo: true
	})

	useEffect(() => {
		document.title = "Dự án-Ngân sách"
	}, []);

	if(!projectInfo) {
		return <></>;
	}

	return (
		<div className="flex-1 overflow-y-auto pb-8">
			<table className='text-medium w-full border-separate border-spacing-0 text-center'>
				<thead className="text-left">
					<tr className="font-semibold">
						<th className="sticky top-0 bg-gray-300 px-1.5 z-10">
							<button className="inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setShow(!show)}>{show ? '+' : '-'}</button>
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							TT
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2" style={{ maxWidth: '240px' }}>Gói thầu/Hợp đồng</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2" style={{ maxWidth: '122px' }}>Ngân sách</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2" style={{ maxWidth: '122px' }}>Dự báo</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2" style={{ maxWidth: '122px' }}>Ký hợp đồng</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2" style={{ maxWidth: '122px' }}>Đã tạm ứng</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2" style={{ maxWidth: '125px' }}>Sản lượng</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2" style={{ maxWidth: '132px' }}>Nghiệm thu</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2" style={{ maxWidth: '123px' }}>Đã thanh toán</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2" style={{ maxWidth: '124px' }}>Còn lại phải trả</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2" style={{ maxWidth: '246px' }}>Ghi chú</th>
					</tr>
				</thead>
				<RightClickMenuWrapper
					contextMenu={<MenuChildRow />}
					customRenderTag={"tbody"}
					className="text-black"
				>
					<tr className="text-right">
						<th className='bg-gray-300 px-1.5 relative'>
							<div className={classNames('absolute left-1/2 bg-cbs-subtext top-1/2 w-[1px] h-1/2', { hidden: show })} />
							<button className="relative inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setShow(!show)}>
								{show ? '+' : '-'}
							</button>
						</th>
						<th className='py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-center'>A1</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-left"></th>
						<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
							{formatNumberMoney(projectInfo.budget + projectInfo.vatBudget)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
							{formatNumberMoney(projectInfo.forecastBudget + projectInfo.vatForecastBudget)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
							{formatNumberMoney(
								projectInfo.contractValue + projectInfo.contractVatValue +
								projectInfo.contractPlus + projectInfo.contractVatPlus
							)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
							{formatNumberMoney(projectInfo.contractAdvancePaymentPaid)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
							{formatNumberMoney(projectInfo.contractProduce + projectInfo.contractVatProduce)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
							{formatNumberMoney(
								projectInfo.contractAcceptance + projectInfo.contractVatAcceptance +
								projectInfo.contractPlusAcceptance + projectInfo.contractVatPlusAcceptance
							)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
							{formatNumberMoney(projectInfo.contractAmountPaid)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
							{formatNumberMoney(projectInfo.contractRemainingPayment)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5"></th>
					</tr>
					{
						listPcmProjectBudget.map((_item: any) => <BugetRowGroupTemp row={_item} key={_item._id} show={show} />)
					}
				</RightClickMenuWrapper>
				{/* <tfoot>
					<tr className="text-right">
						<th className="bg-gray-300 px-1.5 z-10">
						</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">
						</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2 text-left">Tổng</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2"></th>
					</tr>
				</tfoot> */}
			</table>
			{hasNextPage && (
                <div className="w-full flex justify-center my-5">
                  <button onClick={fetchNextPage}>
                    <span className="text-primary">
                      Xem thêm ({totalRecord - listPcmProjectBudget.length})
                    </span>
                  </button>
                </div>
			)}
		</div>
	);
};

/**
 * ? Export rules:
 * ? export default must be capital syntax
 * ? export const must be camel case syntax
 */
 export default ProjectBudgetPage;
