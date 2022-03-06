import React, { FC, Fragment } from 'react'
import { Form, Formik } from 'formik';
import { Dialog } from '@headlessui/react'

import { ModalContainer } from 'shareComponents/common'
import { CustomFieldFormik } from 'views/datahub/sharedComponents/common';
import CustomDatePickerFormik from 'views/datahub/sharedComponents/common/CustomForm/CustomDatePickerFormik';

import "react-datepicker/dist/react-datepicker.css";

type Props = {
	type: 'create' | 'edit'

	toggle: () => void
}

const ModalCreateFinancial: FC<Props> = (props) => {
	const initialValues = {
		year: null as Date | null,
		asset: '',
		liabilitiy: '',
		netWorth: '',
		currentAsset: '',
		shortTermLiabilitiy: '',
		workingCapital: '',
		grossRevenue: '',
		grossConstructionRevenue: '',
		grossProfit: '',
		grossProfitAfterTax: '',
	}
	const handleSubmit = (values: typeof initialValues) => {
		console.log(values);
	}
	return (
		<Fragment>
			<div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
				<Dialog.Title as="h3" className="text-lg leading-6 font-bold">
					{
						props.type === 'create' ? "Tạo mới" : "Cập nhật"
					}
				</Dialog.Title>
				<button
					type="button"
					onClick={props.toggle}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
			>
				<Form>
					<div className="px-5 pb-4 overflow-x-auto min-h-[500px]">
						<div className="whitespace-nowrap space-y-4 py-5">
							<CustomDatePickerFormik name='year' title='Năm tài chính' required showYearPicker dateFormat="yyyy" />
							<CustomFieldFormik name='asset' title='Tổng tài sản' />
							<CustomFieldFormik name='liabilitiy' title='Tổng nợ' />
							<CustomFieldFormik name='netWorth' title='Giá trị tài sản ròng' />
							<CustomFieldFormik name='currentAsset' title='Tài sản ngắn hạn' />
							<CustomFieldFormik name='shortTermLiabilitiy' title='Nợ ngắn hạn' />
							<CustomFieldFormik name='workingCapital' title='Vốn lưu động' />
							<CustomFieldFormik name='grossRevenue' title='Tổng doanh thu' required />
							<CustomFieldFormik name='grossConstructionRevenue' title='Tổng doanh thu trong lĩnh vực xây dựng' required />
							<CustomFieldFormik name='grossProfit' title='Lợi nhuận trước thuế' required />
							<CustomFieldFormik name='grossProfitAfterTax' title='Lợi nhuận sau thuế' />
						</div>
					</div>
					<div className="flex justify-end py-2 px-6 border-t border-cbs-border">
						<div className="mr-1.5">
							<button
								type="submit"
								className="px-4 py-2 rounded-md bg-primary text-white text-small leading-5"
							>
								Xác nhận
							</button>
						</div>
					</div>
				</Form>
			</Formik>
		</Fragment>
	)
}

export default ModalCreateFinancial