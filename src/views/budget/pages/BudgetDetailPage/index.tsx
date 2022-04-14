import { FC, useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames';

/**
 * Components, Utils
 */
import { RightClickMenuWrapper } from "shareComponents/common";
import { MenuChildRow, CreateBudget } from './components';
import { formatNumberMoney } from "utils/converter";

/**
 * Hooks
 */
import { useModal } from "services/hooks/useModal";
import { useBudget } from 'services/hooks/budget/useBudget';
import { useBudgetItem } from 'services/hooks/budget/useBudgetItem';

export const BudgetDetailPage: FC = () => {
	const { budgetID } = useParams<{ budgetID: string }>();

	const { openModal } = useModal();
	const {
		list: listBudgetItem,
		fetchNextPage,
		refetch,
		hasNextPage,
		totalRecord
	} = useBudgetItem({
		params: {
			budgetID
		},
		isFetchList: true
	})

	const { info: budgetInfo } = useBudget({
		params: {
			budgetID,
			select: "_id name"
		},
		isFetchInfo: true
	})

	const [show, setShow] = useState<boolean>(false);

	useEffect(() => {
		document.title = "Chi tiết ngân sách"
	}, []);

	const handleConfirm = () => refetch()

	return (
		<main className="h-full">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<Link to={`/budget/home`}>
						<img src="/images/common/button_back.png" alt="Button Back" />
					</Link>

					<p className="text-lg ml-2">{budgetInfo?.name}</p>
				</div>
				<div className="flex items-center">
					<button
						className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
						onClick={() =>
							openModal(
								<div
									className={
										"inline-block w-[521px] h-[750px] my-8 overflow-y-auto text-left align-middle transition-all transform bg-primary-light shadow-xl"
									}
								>
									<CreateBudget budgetID={budgetID} onConfirm={handleConfirm} />
								</div>
							)
						}
					>
						Tạo mới
					</button>
				</div>
			</header>

			<table className='text-medium w-full border-separate border-spacing-0 text-center'>
				<thead className="text-left">
					<tr className="font-semibold h-10">
						<th className="sticky top-0 bg-gray-300 px-1.5 z-10">
							{/* <button className="inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setShow(!show)}>{show ? '+' : '-'}</button> */}
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2 uppercase">
							TT
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2 uppercase" style={{ maxWidth: '240px' }}>
							Nội dung
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2 text-center uppercase" style={{ maxWidth: '122px' }} colSpan={4}>
							Ngân sách
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2 text-center uppercase" style={{ maxWidth: '122px' }} colSpan={3}>
							Thực hiện
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2 text-center uppercase" style={{ maxWidth: '122px' }} colSpan={3}>
							Dự kiến
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2 uppercase" style={{ maxWidth: '122px' }}>
							Ghi chú
						</th>
					</tr>
					<tr className="font-semibold h-6">
						<th className="sticky top-0 bg-gray-300 px-1.5 z-10"></th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2"></th>
						<th className="sticky top-0 bg- cbs-table-header border-0.5 border-cbs-border border-l-0 px-2" style={{ maxWidth: '240px' }}></th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Đơn vị tính
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Khối lượng
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Đơn giá
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Thành tiền
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Khối lượng
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Đơn giá
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Thành tiền
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Khối lượng
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Đơn giá
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Thành tiền
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2"></th>
					</tr>
				</thead>

				<RightClickMenuWrapper
					contextMenu={<MenuChildRow />}
					customRenderTag={"tbody"}
					className="text-black"
				>
					{(listBudgetItem && listBudgetItem.length) ? listBudgetItem.map(budgetItem => (
						<tr key={budgetItem._id} className="text-right">
							<th className='bg-gray-300 px-1.5 relative'>
								<div className={classNames('absolute left-1/2 bg-cbs-subtext top-1/2 w-[1px] h-1/2', { hidden: show })} />
								<button className="relative inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setShow(!show)}>
									{show ? '+' : '-'}
								</button>
							</th>
							<th className='py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-center'>A1</th>
							<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-left">
								{budgetItem.name}
							</th>
							<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
								{budgetItem.unit}
							</th>
							<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
								{formatNumberMoney(budgetItem.quantity)}
							</th>
							<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
								{formatNumberMoney(budgetItem.unitPrice)}
							</th>
							<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
								{formatNumberMoney(budgetItem.quantity * budgetItem.unitPrice)}
							</th>
							<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
								{formatNumberMoney(0)}
							</th>
							<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
								{formatNumberMoney(0)}
							</th>
							<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
								{formatNumberMoney(0)}
							</th>
							<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
								{formatNumberMoney(budgetItem.forecastQuantity)}
							</th>
							<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
								{formatNumberMoney(budgetItem.forecastAmount)}
							</th>
							<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
								{formatNumberMoney(budgetItem.forecastQuantity * budgetItem.forecastAmount)}
							</th>
							<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5">
								{budgetItem.note}
							</th>
						</tr>
					)) : <></>}

					{/* {(listBudgetItem && listBudgetItem.length)
						? listBudgetItem.map((_item: any) => <BugetRowGroupTemp row={_item} key={_item._id} show={show} />)
						: <></>
					} */}
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
                      Xem thêm ({totalRecord - listBudgetItem.length})
                    </span>
                  </button>
                </div>
			)}
		</main>
	);
};