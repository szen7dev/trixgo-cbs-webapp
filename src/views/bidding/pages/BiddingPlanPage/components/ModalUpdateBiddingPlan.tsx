import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { toast } from "react-toastify";

/**
 * Libraries
 */
import { Dialog } from '@headlessui/react';
import { Form, Formik, ErrorMessage } from 'formik';
import { string, object } from 'yup';
import debounce from "lodash/debounce";
import moment from 'moment';

/**
 * Components, Utils
 */
import { DropdownSearchable } from "shareComponents/common";
import { TOAST_DEFAULT_OPTIONS } from 'utils/constants';
import { BIDDING_PLAN_CONTRACT_TYPE, BIDDING_PLAN_FORM, BIDDING_PLAN_STATUS, FINANCIAL_PLANNING_TYPES } from 'apis/localdb';

/**
 * Hooks
 */
import { useBiddingPlan } from 'services/hooks/bidding/useBiddingPlan';
import { BiddingPlanRepository } from 'apis/bidding';
import { useQueryListCompany } from "services/hooks/useCompanies";

interface ModalProps {
	biddingPlanID: string;
	toggle: () => void;
	onConfirm?: () => void;
}

const ModalUpdateBiddingPlan: FC<ModalProps> = ({ biddingPlanID, toggle, onConfirm }) => {
	const [initValues, setInitValues] = useState<{ [key: string]: any }>({});
	const { updateAsync } = useBiddingPlan({});
	const [bidder, setBidder] = useState("");

	useEffect(() => {
		if(!biddingPlanID) return;

		(async () => {
			const { error, data } = await BiddingPlanRepository.fetchDetailBiddingPlan({
				planID: biddingPlanID
			})
			if(error) return;

			const { name, sign, type, packagePrice, startTime, finishTime, form, contractType, duration, status, bidder, note, percentOfCompletedPackage } = data;
			setInitValues({ name, sign, type, packagePrice, startTime, finishTime, form, contractType, duration, status, bidder, note, percentOfCompletedPackage });
		})();
	}, [biddingPlanID])

	const {
		data: listCompany,
		hasNextPage: hasNextPageCompany,
		fetchNextPage: fetchNextPageCompany
	  } = useQueryListCompany({ limit: 20, keyword: bidder });

	// useEffect(() => {
	// 	if(!cashFlowInfo || !biddingPlanID) return;

	// 	const { name, sign, type, note, outin, property, status } = cashFlowInfo;
	// 	setInitValues({ name, sign, type, note, outin, property, status });
	// }, [cashFlowInfo, biddingPlanID])

	const financialSchema = object().shape({
		name: string().required("Bạn cần nhập nội dung"),
	});

	const handleSubmit = async (values: any) => {
		try {
			console.log({ values })
			const { error, data } = await updateAsync({
				planID: biddingPlanID,
				...values
			});

			if(error) {
                return toast.warn(data?.message);
            }

            if(data.length) {
                return data.map((item: any) => toast.warn(item.message));
            }

            toast.success('Cập nhật thành công', TOAST_DEFAULT_OPTIONS);
			toggle();
			onConfirm && onConfirm();
		} catch (error) {
			if (typeof error === "string") {
                toast.error(error, TOAST_DEFAULT_OPTIONS);
            } else if (error instanceof Error) {
                toast.error(error.message, TOAST_DEFAULT_OPTIONS);
            }
		}
	};

	if(!initValues || !Object.keys(initValues).length) return <></>

	return (
		<Formik
			initialValues={initValues}
			validationSchema={financialSchema}
			enableReinitialize={true}
			onSubmit={handleSubmit}
		>
			{
				formik => {
					console.log({ formilk: initValues });
					return (
						<Form autoComplete="off">
							<div className="flex items-center px-6 py-2.5 justify-between bg-cbs-table-header">
								<Dialog.Title
									as="h3"
									className="text-lg leading-6 font-bold"
								>
									Cập nhật
								</Dialog.Title>
								<button className="p-2 rounded-3xl" type="button" onClick={toggle}>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div className="relative px-6 mt-2 pt-3.5 flex-1 md:h-[800px] text-x-small">
								<label className='block'>
									<div className='mb-1.5'>
										Nội dung (*)
									</div>
									<textarea
										rows={2}
										tabIndex={0}
										autoFocus={true}
										placeholder="Nhập nội dung"
										className="py-1.5 px-3 bg-cbs-gray w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('name')}
									/>
									<ErrorMessage
										name="name"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Mã hiệu
									</div>
									<input
										type="text"
										placeholder="Nhập mã hiệu"
										className="py-1.5 px-3  w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('sign')}
									/>
									<ErrorMessage
										name="sign"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Ngân dách dự kiến
									</div>
									<input
										type="number"
										placeholder="Nhập ngân dách dự kiến"
										className="py-1.5 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('packagePrice')}
									/>
									<ErrorMessage
										name="packagePrice"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Kế hoạch bắt đầu
									</div>
									<input
										type="date"
										placeholder="Nhập kế hoạch bắt đầu"
										className="py-1.5 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										// {...formik.getFieldProps('startTime')}
										name="startTime"
										onChange={debounce((e) => {
											const date = e.target.value;
											if(!date) return;
											setInitValues({ ...initValues, startTime: date })
										}, 700)}
										defaultValue={moment(initValues.startTime).format('YYYY-MM-DD')}
									/>
									<ErrorMessage
										name="startTime"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Kế hoạch kết thúc
									</div>
									<input
										type="date"
										placeholder="Nhập kế hoạch kết thúc"
										className="py-1.5 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										// {...formik.getFieldProps('finishTime')}
										name="finishTime"
										defaultValue={moment(initValues.finishTime).format('YYYY-MM-DD')}
										onChange={debounce((e) => {
											const date = e.target.value;
											if(!date) return;
											setInitValues({ ...initValues, finishTime: date })
										}, 700)}
									/>
									<ErrorMessage
										name="finishTime"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Hình thức
									</div>
									<DropdownSearchable
										onchangeValue={(value: any) => formik.setFieldValue('form', value.id)}
										onClearData={() => formik.setFieldValue('form', '')}
										className={"h-32 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"}
										placeholder="Hình thức"
										isMultiple={false}
										allowClearValueSingleInput={true}
										showTriangle={true}
										maxWidthInput="max-w-none"
										data={BIDDING_PLAN_FORM.map(item => ({
											value: item.value,
											label: item.text
										}))}
										initialValue={{
											...initValues.form && {
												value: BIDDING_PLAN_FORM[initValues.form - 1]?.value,
												label: BIDDING_PLAN_FORM[initValues.form - 1]?.text
											}
										}}
										formatItem={{
											id: "value",
											text: "label",
										}}
										inlineSearch={true}
									/>
									<ErrorMessage
										name="form"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Loại hợp đồng
									</div>
									<DropdownSearchable
										onchangeValue={(value: any) => formik.setFieldValue('contractType', value.id)}
										onClearData={() => formik.setFieldValue('contractType', '')}
										className={"h-32 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"}
										placeholder="Loại hợp đồng"
										isMultiple={false}
										allowClearValueSingleInput={true}
										showTriangle={true}
										maxWidthInput="max-w-none"
										data={BIDDING_PLAN_CONTRACT_TYPE.map(item => ({
											value: item.value,
											label: item.text
										}))}
										initialValue={{
											...initValues.contractType && {
												value: BIDDING_PLAN_CONTRACT_TYPE[initValues.contractType - 1]?.value,
												label: BIDDING_PLAN_CONTRACT_TYPE[initValues.contractType - 1]?.text
											}
										}}
										formatItem={{
											id: "value",
											text: "label",
										}}
										inlineSearch={true}
									/>
									<ErrorMessage
										name="contractType"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Thời gian thực hiện(Ngày)
									</div>
									<input
										type="number"
										placeholder="Nhập thời gian thực hiện(Ngày)"
										className="py-1.5 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('duration')}
									/>
									<ErrorMessage
										name="duration"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Đơn vị trúng thầu
									</div>
									<DropdownSearchable
										// onSearchInputChange={value => setBidder(value)}
										onSearchInputChange={debounce(
											(value) => setBidder(value),
											500
										)}
										onchangeValue={(value: any) => formik.setFieldValue('bidderID', value.id)}
										onClearData={() => formik.setFieldValue('bidderID', '')}
										className={"h-32 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"}
										placeholder="Đơn vị trúng thầu"
										isMultiple={false}
										allowClearValueSingleInput={true}
										showTriangle={true}
										maxWidthInput="max-w-none"
										data={listCompany.map(item => ({
											value: item._id,
											label: item.name
										}))}
										initialValue={{
											...initValues.bidder && {
												value: initValues.bidder._id,
												label:  initValues.bidder.name
											}
										}}
										formatItem={{
											id: "value",
											text: "label",
										}}
										inlineSearch={true}
									/>
									<ErrorMessage
										name="bidderID"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Trạng thái triển khai
									</div>
									<DropdownSearchable
										onchangeValue={(value: any) => formik.setFieldValue('status', value.id)}
										onClearData={() => formik.setFieldValue('status', '')}
										className={"h-32 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"}
										placeholder="Trạng thái triển khai"
										isMultiple={false}
										allowClearValueSingleInput={true}
										showTriangle={true}
										maxWidthInput="max-w-none"
										data={BIDDING_PLAN_STATUS.map(item => ({
											value: item.value,
											label: item.text
										}))}
										initialValue={{
											...initValues.status && {
												value: BIDDING_PLAN_STATUS[initValues.status - 1]?.value,
												label: BIDDING_PLAN_STATUS[initValues.status - 1]?.text
											}
										}}
										formatItem={{
											id: "value",
											text: "label",
										}}
										inlineSearch={true}
									/>
									<ErrorMessage
										name="status"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Phần trăm hoàn thành
									</div>
									<input
										type="number"
										placeholder="Nhập phần trăm hoàn thành"
										className="py-1.5 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('percentOfCompletedPackage')}
									/>
									<ErrorMessage
										name="percentOfCompletedPackage"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>

								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Ghi chú
									</div>
									<textarea
										rows={2}
										tabIndex={0}
										autoFocus={true}
										placeholder="Nhập nội dung"
										className="py-1.5 px-3 w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('note')}
									/>
									<ErrorMessage
										name="note"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>
							</div>
							<div className="flex justify-end pt-5 px-6 pb-6 mt-6">
								<div>
									<button type="submit" className="px-7 py-3.5 rounded-md bg-primary text-white font-bold text-sm leading-4">Xác nhận</button>
								</div>
							</div>
						</Form>
					)
				}
			}
		</Formik>
	)
}

export default ModalUpdateBiddingPlan