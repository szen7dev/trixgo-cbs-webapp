import { FC, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import { DataBlock2 } from 'typings/ppt/department';
import { convertToInternationalCurrencySystem } from 'utils/ppt';
interface Props {
	data?: DataBlock2
}
const DEFAULT_VALUE_MAX_FOR_SHOW_UI_PERCENT = 104;
const PortfolioBudgetAndContract: FC<HTMLAttributes<HTMLDivElement> & Props> = ({ data, ...props }) => {
	/**
	 * Thông tin NGÂN_SÁCH
	 */
	const totalBudget 		= data?.length && (data?.[0].budget || 0) + (data?.[0].vatBudget || 0) || 0; //TODO update: budget+vatBudget
	const percentBudget		= totalBudget == 0 ? 0 : 100; // nếu không có ngân sách -> thanh % sẽ tính là 0đ (vì cột ngân sách làm chuẩn)
	/**
	 * Thông tin DỰ_BÁO
	 */
	const totalForecastBudget =  data?.length && (data?.[0].forecastBudget || 0) + (data?.[0].vatForecastBudget || 0) || 0; //TODO update: forecastBudget+vatForecastBudget
	const getPercentForecastBudget = (_totalBudget: number, _totalForecastBudget: number): number => {
		if (_totalBudget == 0)
			return 0;
		else {
			return Math.ceil((_totalForecastBudget / _totalBudget) * 100);
		}
	}
	const percentForecastBudget = getPercentForecastBudget(totalBudget, totalForecastBudget);
	/**
	 * Thông tin ĐÃ_KÝ_HỢP_ĐỒNG
	 */
	const totalcontractValueContractPlusValueContractVatValue =  data?.length && (data?.[0].contractValue || 0) + (data?.[0].contractVatValue || 0) + (data?.[0].contractPlus || 0) + (data?.[0].contractVatPlus || 0) || 0; //TODO update: contractValue+contractVatValue+contractPlus+contractVatPlus
	const getContractValueContractPlusValueContractVatValue = (_totalBudget: number, _totalcontractValueContractPlusValueContractVatValue: number): number => {
		if (_totalBudget == 0)
			return 0;
		else {
			return Math.ceil((_totalcontractValueContractPlusValueContractVatValue / _totalBudget) * 100);
		}
	}
	const percentContractValueContractPlusValueContractVatValue = getContractValueContractPlusValueContractVatValue(totalBudget, totalcontractValueContractPlusValueContractVatValue);
	/**
	 * Thông tin ĐÃ_GIẢI_NGÂN
	 */
	const totalcontractAmountPaid =  data?.length && data?.[0].contractAmountPaid || 0; //TODO update: contractAdvancePaymentPaid+contractAmountPaid
	const getcontractAmountPaid = (_totalBudget: number, _totalcontractAmountPaid: number): number => {
		if (_totalBudget == 0)
			return 0;
		else {
			return Math.ceil((_totalcontractAmountPaid / _totalBudget) * 100);
		}
	}
	const percentcontractAmountPaid = getcontractAmountPaid(totalBudget, totalcontractAmountPaid);

	return <div {...props}>
		<div className='bg-white border-0.5 border-cbs-border h-full pb-4'>
			<div className="grid grid-cols-odd-2 px-3.5 gap-x-2">
				{/* Ngân sách */}
				<Link to="/" className="col-span-2">
					<p className='text-x-small mt-5'>Ngân sách ({ percentBudget } %)</p>
				</Link>
				<div className='bg-cbs-green mt-2 mr-2 h-3 w-full' style={{ width:  percentBudget + "%" }}></div>

				<div className="text-x-small w-max mt-2">{"đ " + convertToInternationalCurrencySystem(totalBudget)}</div>
				{/* >Dự báo */}
				<Link to="/" className="col-span-2">
					<p className='text-x-small mt-5'>Dự báo ({ percentForecastBudget }%)</p>
				</Link>
				<div className='bg-cbs-purple mt-2 h-3' style={{ width: (percentForecastBudget > 100 ? DEFAULT_VALUE_MAX_FOR_SHOW_UI_PERCENT : percentForecastBudget) + "%" }}></div>
				<div className="text-x-small w-max mt-2">{"đ " + convertToInternationalCurrencySystem(totalForecastBudget)}</div>
				
				{/* >Đã ký hợp đồng */}
				<Link to="/" className="col-span-2">
					<p className='text-x-small mt-5'>Đã ký hợp đồng ({ percentContractValueContractPlusValueContractVatValue }%)</p>
				</Link>
				<div className='bg-cbs-primary mt-2 h-3' style={{ width: ( percentContractValueContractPlusValueContractVatValue > 100 ? DEFAULT_VALUE_MAX_FOR_SHOW_UI_PERCENT : percentContractValueContractPlusValueContractVatValue) + "%" }}></div>
				<div className="text-x-small w-max mt-2">{"đ " + convertToInternationalCurrencySystem(totalcontractValueContractPlusValueContractVatValue)}</div>
				
				{/* >Đã giải ngân */}
				<Link to="/" className="col-span-2">
					<p className='text-x-small mt-5'>Đã giải ngân ({ percentcontractAmountPaid }%)</p>
				</Link>
				<div className='bg-cbs-schedule-nextweek mt-2 h-3' style={{ width: ( percentcontractAmountPaid > 100 ? DEFAULT_VALUE_MAX_FOR_SHOW_UI_PERCENT : percentcontractAmountPaid) + "%" }}></div>
				<div className="text-x-small w-max mt-2">{"đ " + convertToInternationalCurrencySystem(totalcontractAmountPaid)}</div>
			</div>
		</div>
	</div>
};

export default PortfolioBudgetAndContract;
