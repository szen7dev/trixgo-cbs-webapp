import React, { FC, useEffect, useState } from "react";
import { usePcmProjectBudget } from "services/hooks/pcm/usePcmProjectBudget";
import { useParams } from 'react-router-dom';

import {DropdownSearchableV2, RightClickMenuWrapper} from "shareComponents/common";
import MenuChildRow from './components/MenuChildRow';
// import BugetRowGroup from "./components/BudgetRowGroup";
import BugetRowGroupTemp from "./components/BudgetRowGroupTemp";
import { useProject } from 'services/hooks/items/useProject';
import { formatNumberMoney } from "utils/cmcs";
import { APP_ID } from 'apis/localdb';
import { useHistoryTraffics } from "services/hooks/auth/useAuth";
import categoryIcon from "assets/images/icons8-category-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import downloadIcon from "assets/images/icons8-download-64.svg";
import iconPencil from 'assets/images/icons8-pencil-96 1.png';
import nextIcon from "assets/images/icons-arrow-next.svg";
import chervUpIcon from "assets/images/icon-cherv-up.svg";

const ProjectBudgetPage: FC = () => {
	const [collapse, setCollapse] = useState(false);
	const [keyword, setKeyword] = useState("");
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
		projectID, keyword
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
	<main className="flex flex-col h-full overflow-hidden">
		<div className={"sticky top-0 z-10 " + (collapse?"hidden":"block")}>
			<div className={"flex items-center px-4 py-2"}>
				<div className={"flex items-center flex-1"}>
					<DropdownSearchableV2
						className={"mr-4 border border-primary-border rounded-lg mb-2"}
						placeholder={"Loại gói thầu"}
						prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
						isMultiple={true}
						disableSearch={true}
						data={[]}
					/>
					<DropdownSearchableV2
						className={"mr-4 border border-primary-border rounded-lg mb-2"}
						placeholder={"Hình thức"}
						prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
						isMultiple={true}
						disableSearch={true}
						data={[]}
					/>
					<DropdownSearchableV2
						className={"mr-4 border border-primary-border rounded-lg mb-2"}
						placeholder={"Loại hợp đồng"}
						prefixIcon={<img className={"mr-2"} src={contractIcon} alt={"icon"}/>}
						isMultiple={true}
						disableSearch={true}
						data={[]}
					/>
					<DropdownSearchableV2
						className={"mr-4 border border-primary-border rounded-lg mb-2"}
						placeholder={"Trạng thái"}
						prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
						isMultiple={true}
						disableSearch={true}
						data={[]}
					/>
				</div>
				<button className={"h-[32px] rounded bg-cbs-green text-white font-bold px-4"}>
					Tạo mới
				</button>
			</div>
			<div className={"flex items-center pb-2"}>
				<div className={"border-0.5 border-primary-border flex items-center"}>
					<button className={"px-4 py-2 bg-cbs-soft-blue border-r-0.5 border-primary-border text-primary"}>
						Ngân sách
					</button>
					<button className={"px-4 py-2 bg-white border-r-0.5 border-primary-border text-primary-gray"}>
						Bảo lãnh tạm ứng
					</button>
					<button className={"px-4 py-2 bg-white border-r-0.5 border-primary-border text-primary-gray"}>
						Bảo lãnh hợp đồng
					</button>
					<button className={"px-4 py-2 bg-white border-r-0.5 border-primary-border text-primary-gray"}>
						Kế hoạch chi
					</button>
					<button className={"px-4 py-2 bg-white border-r-0.5 border-primary-border text-primary-gray"}>
						Kế hoạch thu
					</button>
				</div>
				<button className={"flex items-center justify-center mx-3 ml-6"}>
					<img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
				</button>
				<button className={"flex items-center justify-center mx-3 ml-6"}>
					<img src={iconPencil} alt={"-----"} className={"w-[18px] h-[18px]"}/>
				</button>
				<div className={"flex-1 flex items-center justify-end"}>
					<span className={"text-primary-gray"}>1-50 trong số 2.358</span>
					<button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"} disabled={true}>
						<img src={nextIcon} alt={"----"} className={"rotate-180"}/>
					</button>
					<button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"}>
						<img src={nextIcon} alt={"----"}/>
					</button>
				</div>
			</div>
		</div>
		<div className="flex-1 overflow-y-auto">
			<table className="table-fixed border-collapse w-full overflow-auto border-0.5 border-primary-border">
				<thead className="bg-cbs-table-header h-[38px] border-0.5 border-primary-border">
				<tr className="font-semibold">
					{/* <th className="sticky top-0 bg-gray-300 px-1.5 z-10">
						<button className="inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setShow(!show)}>{show ? '+' : '-'}</button>
					</th> */}
					<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2 w-[38px]">TT</th>
					<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2 min-w-[200px] w-[300px]">Gói thầu/Hợp đồng</th>
					<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '122px' }}>Ngân sách</th>
					<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '122px' }}>Dự báo</th>
					<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '122px' }}>Ký hợp đồng</th>
					<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '122px' }}>Đã tạm ứng</th>
					<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '125px' }}>Sản lượng</th>
					<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '132px' }}>Nghiệm thu</th>
					<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '123px' }}>Đã thanh toán</th>
					<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '124px' }}>Còn lại phải trả</th>
					<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '246px' }}>
						<div className={"flex items-center"}>
							<div className={"flex-1"}>
								Ghi chú
							</div>
							<button
								onClick={() => setCollapse(!collapse)}
								className={"p-2 rounded bg-white flex items-center justify-center"}>
								<img src={chervUpIcon} alt={"----"} className={"transition-all " +(collapse?"rotate-180":"")}/>
							</button>
						</div>
					</th>
				</tr>
				</thead>
				<RightClickMenuWrapper
					contextMenu={<MenuChildRow />}
					customRenderTag={"tbody"}
					className="text-black"
				>
					<tr className="text-right">
						{/* <th className='bg-gray-300 px-1.5 relative'>
						<div className={classNames('absolute left-1/2 bg-cbs-subtext top-1/2 w-[1px] h-1/2', { hidden: show })} />
						<button className="relative inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setShow(!show)}>
							{show ? '+' : '-'}
						</button>
					</th> */}
						<th className='py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border text-center'></th>
						<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border text-left"></th>
						<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
							{formatNumberMoney(projectInfo.budget + projectInfo.vatBudget)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
							{formatNumberMoney(projectInfo.forecastBudget + projectInfo.vatForecastBudget)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
							{formatNumberMoney(
								projectInfo.contractValue + projectInfo.contractVatValue +
								projectInfo.contractPlus + projectInfo.contractVatPlus
							)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
							{formatNumberMoney(projectInfo.contractAdvancePaymentPaid)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
							{formatNumberMoney(projectInfo.contractProduce + projectInfo.contractVatProduce)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
							{formatNumberMoney(
								projectInfo.contractAcceptance + projectInfo.contractVatAcceptance +
								projectInfo.contractPlusAcceptance + projectInfo.contractVatPlusAcceptance
							)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
							{formatNumberMoney(projectInfo.contractAmountPaid)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
							{formatNumberMoney(projectInfo.contractRemainingPayment)}
						</th>
						<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border"></th>
					</tr>
					{listPcmProjectBudget.map((_item: any, index) =>
						<BugetRowGroupTemp row={_item} key={_item._id} index={index} show={show} />
					)}
				</RightClickMenuWrapper>
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
	</main>
	);
};

/**
 * ? Export rules:
 * ? export default must be capital syntax
 * ? export const must be camel case syntax
 */
 export default ProjectBudgetPage;
