import React, { FC, Fragment, useState } from 'react'
import { Form, Formik } from 'formik';
import { Dialog } from '@headlessui/react';
import { object, number, date } from 'yup'

import { CustomFieldFormik, CustomDatePickerFormik } from 'views/datahub/sharedComponents/common';
import DatahubRepository from 'apis/datahub';
// import CustomDatePickerFormik from 'views/datahub/sharedComponents/common/CustomForm/CustomDatePickerFormik';

import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';

import useDatahubFinancial from 'services/hooks/datahub/financial/useFinancial';
import { DatahubFinancialBody } from 'typings/datahub/financial';

type Props = {
	datahubFinreportID?: string;
	contractor: string;

	toggle: () => void
}

const DatahubFinancialSchema = object().shape({
	asset: number(),
	liabilitiy: number(),
	netWorth: number(),
	currentAsset: number(),
	shortTermLiabilitiy: number(),
	workingCapital: number(),
	grossRevenue: number().required('Required'),
	grossConstructionRevenue: number().required('Required'),
	grossProfit: number().required('Required'),
	fiscalYear: date().required('Required'),
});

const ModalCreateFinancial: FC<Props> = (props) => {
	const [initialValues, setInitialValues] = useState({
		fiscalYear: null as Date | null,
		asset: 0,
		liabilitiy: 0,
		netWorth: 0,
		currentAsset: 0,
		shortTermLiabilitiy: 0,
		workingCapital: 0,
		grossRevenue: 0,
		grossConstructionRevenue: 0,
		grossProfit: 0,
		grossProfitAfterTax: 0,
	})
	useDatahubFinancial({
		contractorID: props.contractor,
		datahubFinreportID: props.datahubFinreportID
	}, {
		onSuccess(data) {
			if ('error' in data && !data.error) {
				const { fiscalYear, ...rest } = data.data;
				const date = new Date();
				date.setFullYear(fiscalYear);
				setInitialValues({ fiscalYear: date, ...rest })
			}
		}
	});

	const queryClient = useQueryClient();
	const handleSubmit = async (values: typeof initialValues) => {
		const body: DatahubFinancialBody = {
			fiscalYear: values.fiscalYear?.getFullYear(),
			asset: Number(values.asset),
			liabilitiy: Number(values.liabilitiy),
			netWorth: Number(values.netWorth),
			currentAsset: Number(values.currentAsset),
			shortTermLiabilitiy: Number(values.shortTermLiabilitiy),
			workingCapital: Number(values.workingCapital),
			grossRevenue: Number(values.grossRevenue),
			grossConstructionRevenue: Number(values.grossConstructionRevenue),
			grossProfit: Number(values.grossProfit),
			grossProfitAfterTax: Number(values.grossProfitAfterTax),
			contractor: props.contractor,
			datahubFinreportID: undefined
		}

		if (props.datahubFinreportID) {
			body.datahubFinreportID = props.datahubFinreportID;
			const data = await DatahubRepository.updateDatahubFinancial(body);

			if ('code' in data) return;
			toast.info("Update financial report successfully");
		} else {
			const data = await DatahubRepository.createDatahubFinancial(body);

			if ('code' in data) return;
			toast.success("Create financial report successfully");
		}
		queryClient.removeQueries(['datahub_financials'], { inactive: true })
		queryClient.refetchQueries(['datahub_financials'], { active: true })
		props.toggle();
	}
	return (
		<Fragment>
			<div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
				<Dialog.Title as="h3" className="text-lg leading-6 font-bold">
					{
						props.datahubFinreportID ? "Cập nhật" : "Tạo mới"
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
				validationSchema={DatahubFinancialSchema}
				enableReinitialize
			>
				{({ isSubmitting }) => (
					<Form>
						<div className="px-5 pb-4 overflow-x-auto min-h-[500px]">
							<div className="whitespace-nowrap space-y-4 py-5">
								<CustomDatePickerFormik name='fiscalYear' title='Năm tài chính' required showYearPicker dateFormat="yyyy" />
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
									disabled={isSubmitting}
									className="px-4 py-2 rounded-md bg-primary text-white text-small leading-5 disabled:opacity-30 disabled:cursor-not-allowed"
								>
									Xác nhận
								</button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</Fragment>
	)
}

export default ModalCreateFinancial