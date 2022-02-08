import React, { FC, HTMLAttributes, useMemo } from 'react';
import { Link } from 'react-router-dom';

interface Props {
	data?: DataBlock2
}
function convertToInternationalCurrencySystem(value: number) {
	const { format } = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 2 })
	// Nine Zeroes for Billions
	return Math.abs(Number(value)) >= 1.0e+9

		? format(value / 1.0e+9) + "B"
		// Six Zeroes for Millions 
		: Math.abs(Number(value)) >= 1.0e+6

			? format(Number(value) / 1.0e+6) + "M"
			// Three Zeroes for Thousands
			: Math.abs(Number(value)) >= 1.0e+3

				? format(Number(value) / 1.0e+3) + "K"

				: Math.abs(Number(value));

}

const PortfolioBudgetAndContract: FC<HTMLAttributes<HTMLDivElement> & Props> = ({ data, ...props }) => {

	return <div {...props}>
		<div className='bg-white border-0.5 border-cbs-border h-full pb-4'>
			<div className="grid grid-cols-odd-2 px-3.5 gap-x-2">
				<Link to="/" className="col-span-2">
					<p className='text-x-small mt-5'>Ngân sách (100%)</p>
				</Link>
				<div className='bg-cbs-green mt-2 mr-2 h-3 w-full'></div>
				<div className="text-x-small w-max mt-2">{"$" + convertToInternationalCurrencySystem(data?.[0].budget || 0)}</div>
				<Link to="/" className="col-span-2">
					<p className='text-x-small mt-5'>Dự báo ({data?.[0].budget ? data?.[0].forecastBudget / data?.[0].budget : 100}%)</p>
				</Link>
				<div className='bg-cbs-purple mt-2 h-3' style={{ width: (data?.[0].budget ? data?.[0].forecastBudget / data?.[0].budget : 100) + "%" }}></div>
				<div className="text-x-small w-max mt-2">{"$" + convertToInternationalCurrencySystem(data?.[0].forecastBudget || 0)}</div>
				<Link to="/" className="col-span-2">
					<p className='text-x-small mt-5'>Đã ký hợp đồng ({data?.[0].budget ? data[0].contractValueContractPlusValueContractVatValue / data[0].budget : 100}%)</p>
				</Link>
				<div className='bg-cbs-primary mt-2 h-3' style={{ width: (data?.[0].budget ? data[0].contractValueContractPlusValueContractVatValue / data[0].budget : 100) + "%" }}></div>
				<div className="text-x-small w-max mt-2">{"$" + convertToInternationalCurrencySystem(data?.[0].contractValueContractPlusValueContractVatValue || 0)}</div>
				<Link to="/" className="col-span-2">
					<p className='text-x-small mt-5'>Đã giải ngân ({data?.[0].budget ? data[0].contractAmountPaid / data[0].budget : 100}%)</p>
				</Link>
				<div className='bg-cbs-schedule-nextweek mt-2 h-3' style={{ width: (data?.[0].budget ? data[0].contractAmountPaid / data[0].budget : 100) + "%" }}></div>
				<div className="text-x-small w-max mt-2">{"$" + convertToInternationalCurrencySystem(data?.[0].contractAmountPaid || 0)}</div>
			</div>
		</div>
	</div>
};

export default PortfolioBudgetAndContract;
