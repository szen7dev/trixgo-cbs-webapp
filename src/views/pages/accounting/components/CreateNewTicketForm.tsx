import React, { FC, useEffect, useState } from "react";
import DropdownSearchable from "../../../../components/common/DropdownSearch";
import DatePicker from "react-datepicker";

import DayPickerInput from "react-day-picker/DayPickerInput";
import debounce from "lodash/debounce";
import moment from "moment";
import { convertDateToString, formatNumberMoney } from "helpers/index"
import { MESSAGE_ERROR } from "helpers/constants"
import { string, object } from 'yup';

import CreateNewTicketTableAccount from "./CreateNewTicketTableAccount";
import { DATE_FORMAT, DATE_FORMAT_TIME, VOUCHER_TYPES, LIMIT_DROPDOWN } from "apis/localdb/index";
import { ErrorMessage, Field, FieldArray } from "formik";

import {
	useQueryListContact,
	useQueryListContract,
	useQueryListContractIPC
} from "services/hooks/useContractIncome";
import {
	useQueryListDoctype,
} from "services/hooks/useHuman";

const CreateNewTicketForm: FC<any> = ({ formik, initialValues }) => {
	const { handleBlur, setFieldValue, values } = formik;

	// const [listContractIPC, setListContractIPC] = useState([]);

	const [searchCustomerValue, setSearchCustomerValue] = useState(
		initialValues?.department?.name || ""
	);
	const { listContact: listCustomer } = useQueryListContact({
		limit: LIMIT_DROPDOWN,
		keyword: searchCustomerValue,
	});
	const [searchContractValue, setSearchContractValue] = useState(
		initialValues?.department?.name || ""
	);
	const { listContract } = useQueryListContract({
		limit: LIMIT_DROPDOWN,
		keyword: searchContractValue,
	});
	const [searchContractIPCValue, setSearchContractIPCValue] = useState(
		initialValues?.department?.name || ""
	);
	const { listContractIPC } = useQueryListContractIPC({
		limit: LIMIT_DROPDOWN,
		keyword: searchContractIPCValue,
		contractID: values.contract
	});

	const [searchSubTypeValue, setSearchSubTypeValue] = useState(
		initialValues?.subType?.name || ""
	);
	const { listDoctypes: listSubType } = useQueryListDoctype({
		limit: LIMIT_DROPDOWN,
		type: 2,
		keyword: searchSubTypeValue,
	});

	useEffect(() => {
		setFieldValue('ipc', '')
	}, [values.contract])

	return (
		<>
			<div className={"px-6 pb-2 border-b border-gray-800 income-form-modal"}>
				<div className={"flex py-1 border-b"}>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Loại phiếu (*)</div>
						<DropdownSearchable
							onchangeValue={(value) => setFieldValue("type", value.id)}
							className={"flex-1"}
							placeholder="Phân loại khác..."
							isMultiple={false}
							allowClearValueSingleInput={true}
							onClearData={() => setFieldValue("type", '')}
							showTriangle={true}
							maxWidthInput="max-w-none"
							initialValue={initialValues?.type}
							renderSelectedItem={(item) => <span>{item.text}</span>}
							data={VOUCHER_TYPES}
							formatItem={{
								id: "value",
								text: "text",
							}}
							inlineSearch={true}
						/>
						<ErrorMessage
							name="type"
							component="span"
							className="font-normal leading-7 text-sm text-negative"
						/>
					</div>
					<div className={"w-1/4 flex items-center"}>
						<div className={"w-1/3 flex items-center"}>
							<Field type="radio" id="vat-type-1" name="vat" value={1} className={"form-check-input mt-0"} onChange={() => setFieldValue('vat', 1)} />
							<label htmlFor="vat-type-1" className={"text-left ml-3"}>VAT mua vào</label>
						</div>
						<div className={"w-1/3 flex items-center"}>
							<Field type="radio" id={"vat-type-2"} name="vat" value={2} className={"form-check-input mt-0"} onChange={() => setFieldValue('vat', 2)} />
							<label htmlFor="vat-type-2" className={"text-left ml-3"}>VAT bán ra</label>
						</div>
						<div className={"w-1/3 flex items-center"}>
							<Field type="radio" id={"vat-type-3"} name="vat" value={0} className={"form-check-input mt-0"} onChange={() => setFieldValue('vat', 0)} />
							<label htmlFor="vat-type-3" className={"text-left ml-3"}>Hủy</label>
						</div>
					</div>
					<div className={"w-1/2 flex items-center"}>
						<div className={"w-1/4 flex items-center"}>
							<Field type="checkbox" id="ticket-type-1" name="advancePayment" className={"form-check-input mt-0"} />
							<label htmlFor="ticket-type-1" className={"text-left ml-3"}>Tạm ứng</label>
						</div>
						<div className={"w-1/4 flex items-center"}>
							<Field type="checkbox" id="ticket-type-2" name="forward" className={"form-check-input mt-0"} />
							<label htmlFor="ticket-type-2" className={"text-left ml-3"}>Kết chuyển cuối kỳ</label>
						</div>
						<div className={"w-1/4 flex items-center"}>
							<Field type="checkbox" id="ticket-type-3" name="returning" className={"form-check-input mt-0"} />
							<label htmlFor="ticket-type-3" className={"text-left ml-3"}>Xuất trả hàng mượn</label>
						</div>
						<div className={"w-1/4 flex items-center"}>
							<Field type="checkbox" id="ticket-type-4" name="cancel" className={"form-check-input mt-0"} />
							<label htmlFor="ticket-type-4" className={"text-left ml-3 text-red-600"}>Hủy phiếu</label>
						</div>
					</div>
				</div>
				<div className={"flex py-1 border-b"}>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Mã khách (*)</div>
						<DropdownSearchable
							onchangeValue={(value: any) => setFieldValue("customer", value.id)}
							className={"flex-1"}
							placeholder="Mã khách"
							isMultiple={false}
							allowClearValueSingleInput={true}
							onClearData={() => setFieldValue("customer", '')}
							showTriangle={true}
							maxWidthInput="max-w-none"
							renderSelectedItem={(item) => <span>{item.text}</span>}
							onSearchInputChange={debounce(
								(value) => setSearchCustomerValue(value),
								500
							)}
							initialValue={initialValues?.customer}
							data={listCustomer.map((item: any) => ({
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
							name="customer"
							component="span"
							className="font-normal leading-7 text-sm text-negative"
						/>
					</div>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Hợp đồng</div>
						<DropdownSearchable
							onchangeValue={(value: any) => setFieldValue("contract", value.id)}
							className={"flex-1"}
							placeholder="Mã khách"
							isMultiple={false}
							allowClearValueSingleInput={true}
							onClearData={() => setFieldValue("contract", '')}
							showTriangle={true}
							maxWidthInput="max-w-none"
							renderSelectedItem={(item) => <span>{item.text}</span>}
							onSearchInputChange={debounce(
								(value) => setSearchContractValue(value),
								500
							)}
							initialValue={initialValues?.contract}
							data={listContract.map((item: any) => ({
								label: item.name,
								value: item._id,
							}))}
							formatItem={{
								id: "value",
								text: "label",
							}}
							inlineSearch={true}
						/>
					</div>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Kỳ thanh toán</div>
						<DropdownSearchable
							onchangeValue={(value: any) => setFieldValue("ipc", value.id)}
							className={"flex-1"}
							placeholder="Mã khách"
							isMultiple={false}
							allowClearValueSingleInput={true}
							onClearData={() => setFieldValue("ipc", '')}
							showTriangle={true}
							maxWidthInput="max-w-none"
							renderSelectedItem={(item) => <span>{item.text}</span>}
							onSearchInputChange={debounce(
								(value) => setSearchContractValue(value),
								500
							)}
							initialValue={initialValues?.ipc}
							data={values.contract ? listContractIPC.map((item: any) => ({
								label: item.name,
								value: item._id,
							})) : []}
							formatItem={{
								id: "value",
								text: "label",
							}}
							inlineSearch={true}
						/>
					</div>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Phân loại khác</div>
						<DropdownSearchable
							onchangeValue={(value: any) => setFieldValue("subType", value.id)}
							className={"flex-1"}
							placeholder="Phân loại khác"
							isMultiple={false}
							allowClearValueSingleInput={true}
							onClearData={() => setFieldValue("subType", '')}
							showTriangle={true}
							maxWidthInput="max-w-none"
							renderSelectedItem={(item) => <span>{item.text}</span>}
							onSearchInputChange={debounce(
								(value) => setSearchSubTypeValue(value),
								500
							)}
							initialValue={initialValues?.subType}
							data={listSubType.map((item: any) => ({
								label: item.name,
								value: item._id,
							}))}
							formatItem={{
								id: "value",
								text: "label",
							}}
							inlineSearch={true}
						/>
					</div>
				</div>
				<div className={"flex py-1 border-b"}>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Ngày hạch toán (*)</div>
						<DatePicker
							wrapperClassName={"w-auto"}
							name="date"
							selected={values.date}
							showTimeSelect
							timeIntervals={30}
							customInput={
								<div className={"relative w-auto ml-2 min-h-fit"}>
									<Field
										readOnly
										placeholder={"Ngày hạch toán"}
										type="text"
										name="date"
										className="focus:outline-none placeholder:text-sm"
										value={
											values.date
												? moment(values.date).format(
													"DD/MM/YYYY hh:mm"
												)
												: ""
										}
									/>
								</div>
							}
							onChange={(date: Date | null) => {
								setFieldValue("date", date)
							}
							}
						/>
						<ErrorMessage
							name="date"
							component="span"
							className="font-normal leading-7 text-sm text-negative"
						/>
					</div>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Số hóa đơn</div>
						<Field type="text" name="signInvoice" className={"focus:outline-none placeholder:text-gray-500"} placeholder={"Số hóa đơn"} />
					</div>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Ngày hóa đơn</div>
						<DayPickerInput
							format={DATE_FORMAT}
							value={
								initialValues.dateInvoice &&
								moment(initialValues.dateInvoice).format(DATE_FORMAT)
							}
							onDayChange={(day: any) => setFieldValue("dateInvoice", day)}
							inputProps={{
								className: "focus:outline-none placeholder:text-gray-500",
								placeholder: "Ngày hóa đơn",
							}}
						/>
					</div>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Người nộp tiền</div>
						<Field type="text" name="receiver" className={"focus:outline-none"} placeholder={"Người nộp tiền"} />
					</div>
				</div>
				<div className={"flex py-1"}>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Nội dung (*)</div>
						<Field type="textarea" name="name" rows={2} className={"focus:outline-none flex-1"} placeholder={"Nội dung"} />
						<ErrorMessage
							name="name"
							component="span"
							className="font-normal leading-7 text-sm text-negative"
						/>
					</div>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Ghi chú</div>
						<Field type="textarea" name="note" rows={2} className={"focus:outline-none flex-1"} placeholder={"Ghi chú"} />
					</div>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Mã hiệu (*)</div>
						<Field type="text" name="sign" className={"focus:outline-none"} placeholder={"Mã hiệu"} />
						<ErrorMessage
							name="sign"
							component="span"
							className="font-normal leading-7 text-sm text-negative"
						/>
					</div>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Tỷ giá USD</div>
						<Field type="text" name="fcuExRate" className={"focus:outline-none"} placeholder={"Tỷ giá USD"} />
					</div>
				</div>
			</div>
			<CreateNewTicketTableAccount formik={formik} initialValues={initialValues} />

		</>
	)
}

export default CreateNewTicketForm;
