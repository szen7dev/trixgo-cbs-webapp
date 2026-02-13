import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { toast } from "react-toastify";

/**
 * Libraries
 */
import { Dialog } from '@headlessui/react';
import { Form, Formik, ErrorMessage } from 'formik';
import { string, object } from 'yup';

/**
 * Components, Utils
 */
import { DropdownSearchable } from "shareComponents/common";
import { TOAST_DEFAULT_OPTIONS } from 'utils/constants';
import { FINANCIAL_PLANNING_TYPES } from 'apis/localdb';

/**
 * Hooks
 */
import { useCashFlowPlan } from 'services/hooks/financial/useCashFlow';
import { CashFlowPlanRepository } from 'apis/financial';

interface ModalProps {
	cashFlowId: string;
	toggle: () => void;
	onConfirm?: () => void;
}

const ModalUpdateCashFlow: FC<ModalProps> = ({ cashFlowId, toggle, onConfirm }) => {
	const [initValues, setInitValues] = useState<{ [key: string]: any }>({});
	const { updateAsync } = useCashFlowPlan({});

	useEffect(() => {
		if(!cashFlowId) return;

		(async () => {
			const { error, data } = await CashFlowPlanRepository.fetchDetailCashFlowPlan({
				cashFlowID: cashFlowId
			})

			if(error) return;

			const { name, sign, type, note, outin, property, status } = data;
			setInitValues({ name, sign, type, note, outin, property, status });
		})();
	}, [cashFlowId])

	// useEffect(() => {
	// 	if(!cashFlowInfo || !cashFlowId) return;

	// 	const { name, sign, type, note, outin, property, status } = cashFlowInfo;
	// 	setInitValues({ name, sign, type, note, outin, property, status });
	// }, [cashFlowInfo, cashFlowId])

	const financialSchema = object().shape({
		name: string().required("Bạn cần nhập nội dung"),
	});

	const handleSubmit = async (values: any) => {
		try {
			const { error, data } = await updateAsync({
				cashFlowID: cashFlowId,
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
						<Form autoComplete="off"  className='h-[700px] relative'>
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
							<div className="px-6 mt-2 pt-3.5 flex-1 overflow-y-auto text-x-small"  style={{height:"530px"}}>
								<label className='block'>
									<div className='mb-1.5'>
										Nội dung (*)
									</div>
									<textarea
										rows={2}
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
										className="py-1.5 px-3 bg-cbs-gray w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
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
										Phân loại
									</div>
									<DropdownSearchable
										onchangeValue={(value: any) => formik.setFieldValue('type', value.id)}
										onClearData={() => formik.setFieldValue('type', '')}
										className={"bg-cbs-gray w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"}
										placeholder="Phân loại"
										isMultiple={false}
										allowClearValueSingleInput={true}
										showTriangle={true}
										maxWidthInput="max-w-none"
										data={FINANCIAL_PLANNING_TYPES.map(item => ({
											value: item.value,
											label: item.text
										}))}
										initialValue={{
											...initValues.type && {
												value: FINANCIAL_PLANNING_TYPES[initValues.type - 1]?.value,
												label: FINANCIAL_PLANNING_TYPES[initValues.type - 1]?.text
											}
										}}
										formatItem={{
											id: "value",
											text: "label",
										}}
										inlineSearch={true}
									/>
									<ErrorMessage
										name="type"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>
								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Ghi chú
									</div>
									<textarea
										rows={3}
										placeholder="Nhập ghi chú"
										className="py-1.5 px-3 bg-cbs-gray w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
										{...formik.getFieldProps('note')}
									/>
									<ErrorMessage
										name="note"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>
								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Mua vào, bán ra
									</div>
									<DropdownSearchable
										onchangeValue={(value: any) => formik.setFieldValue('outin', value.id)}
										onClearData={() => formik.setFieldValue('outin', '')}
										className={" bg-cbs-gray w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"}
										placeholder="Mua vào, bán ra"
										isMultiple={false}
										allowClearValueSingleInput={true}
										showTriangle={true}
										maxWidthInput="max-w-none"
										data={[
											{ value: 1, label: 'Bán ra' },
											{ value: 2, label: 'Mua vào' },
										]}
										initialValue={{
											...initValues.outin && {
												value: initValues.outin,
												label: initValues.outin === 1 ? 'Bán ra' : 'Mua vào'
											}
										}}
										formatItem={{
											id: "value",
											text: "label",
										}}
										inlineSearch={true}
									/>
									<ErrorMessage
										name="outin"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>
								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Tính chất
									</div>
									<DropdownSearchable
										onchangeValue={(value: any) => formik.setFieldValue('property', value.id)}
										onClearData={() => formik.setFieldValue('property', '')}
										className={"bg-cbs-gray w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"}
										placeholder="Tính chất"
										isMultiple={false}
										allowClearValueSingleInput={true}
										showTriangle={true}
										maxWidthInput="max-w-none"
										data={[
											{ value: 1, label: 'Sản lượng' },
											{ value: 2, label: 'Doanh thu' },
											{ value: 3, label: 'Dòng tiền' },
										]}
										initialValue={{
											...initValues.property && {
												value: initValues.property,
												label: initValues.property === 1
													? 'Sản lượng' 
													: initValues.property === 2
														? 'Doanh thu'
														: 'Dòng tiền'
											}
										}}
										formatItem={{
											id: "value",
											text: "label",
										}}
										inlineSearch={true}
									/>
									<ErrorMessage
										name="property"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>
								<label className='mt-4 block'>
									<div className='mb-1.5'>
										Trạng thái
									</div>
									<DropdownSearchable
										onchangeValue={(value: any) => formik.setFieldValue('status', value.id)}
										onClearData={() => formik.setFieldValue('status', '')}
										className={"bg-cbs-gray w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"}
										placeholder="Trạng thái"
										isMultiple={false}
										allowClearValueSingleInput={true}
										showTriangle={true}
										maxWidthInput="max-w-none"
										data={[
											{ value: 1, label: 'Chưa phê duyệt' },
											{ value: 2, label: 'Đã phê duyệt' },
										]}
										initialValue={{
											...initValues.status && {
												value: initValues.status,
												label: initValues.status === 1 ? 'Chưa phê duyệt' : 'Đã phê duyệt'
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
							</div>
							<div className="flex justify-end py-5 px-6 sticky bottom-0">
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

export default ModalUpdateCashFlow