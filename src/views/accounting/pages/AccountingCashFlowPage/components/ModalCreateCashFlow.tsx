import { FC, useState } from 'react';
import { toast } from "react-toastify";
import debounce from "lodash/debounce";

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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Hooks
 */
import { useCashFlowPlan } from 'services/hooks/financial/useCashFlow';
import { useFunda } from "services/hooks/items/useFunda";

interface ModalProps {
	toggle: () => void;
	onConfirm?: () => void;
	initialValues?: any; // Thêm dòng này
}

const ModalCreateCashFlow: FC<ModalProps> = ({ toggle, onConfirm, initialValues }) => {
	const [fundaKeyword, setFundaKeyword] = useState(
		initialValues?.fundaID || ""
	);

	const { list: listFunda } = useFunda({
		params: {
			keyword: fundaKeyword,
			limit: 50
		},
		isFetchList: true
	})

	const { insertAsync } = useCashFlowPlan({});

	const financialSchema = object().shape({
		name: string().required("Bạn cần nhập nội dung"),
	});

	const handleSubmit = async (values: any) => {
		try {
			const { error, data } = await insertAsync(values);

			if(error) {
                return toast.warn(data?.message);
            }

            if(data.length) {
                return data.map((item: any) => toast.warn(item.message));
            }

            toast.success('Tạo mới thành công', TOAST_DEFAULT_OPTIONS);
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

	return (
		<Formik
			initialValues={{ name: '', date: new Date(), fromDate: new Date(), toDate: new Date() }}
			validationSchema={financialSchema}
			onSubmit={handleSubmit}
		>
			{
				formik => {
					const { handleBlur, setFieldValue, values } = formik;

					return (
						<Form autoComplete="off"  className='relative' style={{height:"530px"}}>
							<div className="flex items-center px-6 py-2.5 justify-between bg-cbs-table-header">
								<Dialog.Title
									as="h3"
									className="text-lg leading-6 font-bold"
								>
									Tạo mới
								</Dialog.Title>
								<button className="p-2 rounded-3xl" type="button" onClick={toggle}>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>
							<div className="px-6 mt-2 pt-3.5 flex-1 overflow-y-auto text-x-small">
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
										Đơn vị cơ sở
									</div>
									<DropdownSearchable
										onchangeValue={(value: any) => formik.setFieldValue('fundaID', value.id)}
										onClearData={() => formik.setFieldValue('fundaID', '')}
										className={"    bg-cbs-gray w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"}
										placeholder="Đơn vị cơ sở"
										isMultiple={false}
										allowClearValueSingleInput={true}
										showTriangle={true}
										maxWidthInput="max-w-none"
										onSearchInputChange={debounce(
											(value) => setFundaKeyword(value),
											500
										)}
										initialValue={initialValues?.fundaID}
										data={listFunda.map((item: any) => ({
											label: item.name,
											value: item._id,
										}))}
										formatItem={{
											id: "value",
											text: "label",
										}}
										inlineSearch={true}
									/>
									<ErrorMessage
										name="fundaID"
										component="span"
										className="font-normal text-negative italic"
									/>
								</label>
								<div className='mt-4'>
									<p className="text-primary-gray text-[13px] mb-1">Từ ngày</p>
									<div className="rounded border px-2 py-1 bg-cbs-table-header">
									<DatePicker
										className="w-full h-6 outline-none"
										selected={values.fromDate ? new Date(values.fromDate) : null}
										placeholderText="Ngày/tháng/năm"
										name="fromDate"
										onChange={(fromDate: Date | null) => {
										setFieldValue("fromDate", fromDate);
										}}
										dateFormat="dd/MM/yyyy"
									/>
									</div>
								</div>
								<div className='mt-4'>
									<p className="text-primary-gray text-[13px] mb-1">Đến ngày</p>
									<div className="rounded border px-2 py-1 bg-cbs-table-header">
									<DatePicker
										className="w-full h-6 outline-none"
										selected={values.toDate ? new Date(values.toDate) : null}
										placeholderText="Ngày/tháng/năm"
										name="toDate"
										onChange={(toDate: Date | null) => {
										setFieldValue("toDate", toDate);
										}}
										dateFormat="dd/MM/yyyy"
									/>
									</div>
								</div>
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

export default ModalCreateCashFlow