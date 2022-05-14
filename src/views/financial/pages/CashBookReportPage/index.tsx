import { FC, useEffect, useState } from 'react';

/**
 * Components, Utils
 */
import FinancialRowGroup from './components/FinancialRowGroup';
import { Loader } from 'shareComponents/common';

/**
 * Hooks
 */
import { useAppMenu } from "services/hooks/apps/useAppMenu";
import { useCashBookCustom } from "services/hooks/financial/useCashBook";
import { convertCurrency } from 'utils/converter';
import { CashBookAmountByProperty } from 'typings/financial/cashBook';

interface Report {
	company: {
		_id: string;
		name: string;
		sign: string;
		image: string;
		amountCashCompany: number;
		amountBankDepositsCompany: number;
	};
	cashBooks: CashBookAmountByProperty[];
}

function useForceUpdate() {
	const [value, setValue] = useState(0);
	return { forceUpdate: () => setValue(value => value + 1), value }; // update the state to force render
}

export const CashBookReportPage: FC = () => {
	const { forceUpdate, value } = useForceUpdate();
	const [show, setShow] = useState(true);
	const [money, setMoney] = useState({
		amountCash: 0,
		amountBankDeposits: 0
	});

	const [dataReport, setDataReport] = useState<Report[]>([]);

	const { listCompany, isLoadingListCompany } = useAppMenu({
		paramsFetchListCompany: {
			menuID: "623f2465e998e94feda0cdaa",
			appID: "5dfe4bc751dc622100bb9d8a",
		},
		isFetchListCompany: true
	})

	const { amountByProperty, isLoadingAmountByProperty } = useCashBookCustom({
		paramsAmountByProperty: {
			option: "1",
		},
		isFetchAmountByProperty: true
	})

	useEffect(() => {
		if(!listCompany || !amountByProperty) return;

		let amountCash = 0;
		let amountBankDeposits = 0;

		const dataReport = listCompany.map(({ _id: { company } }) => {
			const cashBooks = amountByProperty.filter(item => item._id?.company === company?._id);
			let amountCashCompany = 0;
			let amountBankDepositsCompany = 0;

			amountByProperty.map(item => {
				if(item?._id?.company === company._id) {
					// if(item?._id?.company === "6046b089b55525368b1101cb") {
					// }
					console.log({
						account: item?._id?.account?.name,
						item
					})

					if(item?._id?.account?.name?.includes('111')) {
						amountCashCompany += item.income - item.expense;
					}

					if(item?._id?.account?.name?.includes('112')) {
						amountBankDepositsCompany += item.income - item.expense;
					}
				}
			})

			amountCash += amountCashCompany;
			amountBankDeposits += amountBankDepositsCompany;

			const infoCompany = {
				...company,
				amountCashCompany,
				amountBankDepositsCompany
			}

			return { company: infoCompany, cashBooks };
		})
		// console.log('=======');
		// console.log({ dataReport });

		setMoney({ amountCash, amountBankDeposits });
		setDataReport(dataReport);
	}, [listCompany, amountByProperty])

	const handleToggle = (v: boolean) => {
		if (v === show) {
			forceUpdate();
		} else {
			setShow(v)
		}
	}

	if(isLoadingListCompany || isLoadingAmountByProperty) return <Loader className="border-primary" />

	return (
		<div className='flex-1 overflow-y-auto'>
			<table className='text-small border-separate border-spacing-0 text-center'>
				<thead className="text-left">
					<tr>
						<th className="sticky top-0 bg-gray-300 px-1.5 z-10">
							<button className="block text-white rounded bg-gray-600 w-5 h-5" onClick={handleToggle.bind(null, true)}>1</button>
							<button className="block mt-0.5 text-white rounded bg-gray-600 w-5 h-5" onClick={handleToggle.bind(null, false)}>2</button>
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2">
							TT
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '240px' }}>Công ty/Phân vùng</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '122px' }}>Tiền mặt</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 font-normal px-2" style={{ minWidth: '122px' }}>Tiền gửi ngân hàng</th>
					</tr>
				</thead>
				{(dataReport && dataReport.length) ?
					dataReport.map((_item, index) =>
						<FinancialRowGroup
							key={index}
							index={index}
							show={show}
							forceUpdateValue={value}
							company={_item.company}
							cashBooks={_item.cashBooks}
						/>
					) : <></>
				}
				<tfoot>
					<tr className="text-right">
						<th className="bg-gray-300 px-1.5 z-10">
						</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">
						</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2 text-left">Tổng</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">
							{convertCurrency(money.amountCash)}
						</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">
							{convertCurrency(money.amountBankDeposits)}
						</th>
					</tr>
				</tfoot>
			</table>
		</div>
	)
}