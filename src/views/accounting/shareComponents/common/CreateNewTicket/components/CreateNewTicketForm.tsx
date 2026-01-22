import { FC, useEffect, useRef, useState } from "react";
import { DropdownSearchable, Popover } from "shareComponents/common";
import DatePicker from "react-datepicker";

import DayPickerInput from "react-day-picker/DayPickerInput";
import debounce from "lodash/debounce";
import moment from "moment";

import CreateNewTicketTableAccount from "./CreateNewTicketTableAccount";
import { DATE_FORMAT, VOUCHER_TYPES, LIMIT_DROPDOWN } from "apis/localdb/index";
import { ErrorMessage, Field } from "formik";
import { useFunda } from "services/hooks/items/useFunda";

import {
	useQueryListWarehouse,
	useQueryListContact,
	useQueryListContract,
	useQueryListContractIPC
} from "services/hooks/cmcs/useContractIncome";

import {
	useDoctype,
} from "services/hooks/items/useDoctype";

const CreateNewTicketForm: FC<any> = ({ formik, initialValues, isEdit }) => {
	const { setFieldValue, values } = formik;

	const [fundaKeyword, setFundaKeyword] = useState(
		initialValues?.funda || ""
	);

	const { list: listFunda } = useFunda({
		params: {
			keyword: fundaKeyword,
			limit: 50
		},
    	isFetchList: true
	})

	const [searchCustomerValue, setSearchCustomerValue] = useState(
		initialValues?.customer || ""
	);
	const { listContact: listCustomer } = useQueryListContact({
		limit: LIMIT_DROPDOWN,
		keyword: searchCustomerValue,
	});

	const [searchContractValue, setSearchContractValue] = useState(
		initialValues?.contract || ""
	);
	const { listContract } = useQueryListContract({
		limit: LIMIT_DROPDOWN,
		keyword: searchContractValue,
	});
	const [searchContractIPCValue, setSearchContractIPCValue] = useState(
		initialValues?.ipc || ""
	);
	// const { listContractIPC } = useQueryListContractIPC({
	// 	limit: LIMIT_DROPDOWN,
	// 	keyword: searchContractIPCValue,
	// 	contractID: values.contract.value || values.contractId
	// });

	const [searchSubTypeValue, setSearchSubTypeValue] = useState(
		initialValues?.subType || ""
	);
	const { list: listSubType } = useDoctype({
		params: {
			limit: LIMIT_DROPDOWN,
			type: 23,
			keyword: searchSubTypeValue,
			// isShowParentAndChild: 1
		 },
		isFetchList: true
	});

	const [searchWarehouseValue, setSearchWarehouseValue] = useState(
		initialValues?.warehouse || ""
	);
	const { listWarehouse } = useQueryListWarehouse({
		limit: LIMIT_DROPDOWN,
		keyword: searchWarehouseValue,
	})

	const contractId = useRef(values.contractId)

	useEffect(() => {
		if (contractId.current !== values.contract.value) {
			contractId.current = values.contract.value
			setFieldValue('ipc', {})
		}

	}, [values.contract.value])

	return (
		<>
			<div className={"px-6 pb-2 border-b border-gray-800 income-form-modal"}>
				<div className={"flex py-1 border-b"}>
					<div className={"w-1/8 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Phiếu (*)</div>
						<DropdownSearchable
							onchangeValue={(value) => setFieldValue("type", value)}
							className={"flex-1"}
							placeholder="Phiếu"
							isMultiple={false}
							allowClearValueSingleInput={true}
							onClearData={() => setFieldValue("type", '')}
							showTriangle={false}
							maxWidthInput="max-w-none"
							initialValue={initialValues?.type}
							renderSelectedItem={(item) => (
								<div
									style={{ maxWidth: '300px' }}
									className="flex items-center"
								>
									<p
										style={{
											textOverflow: "ellipsis",
											maxWidth: "100%",
											minWidth: 0,
											whiteSpace: "nowrap",
											overflow: "hidden",
											flex: "1 1 auto",
										}}
									>
										{item.text}
									</p>
								</div>
							)}
							data={VOUCHER_TYPES.map(item => ({
								value: item.value,
								label: item.text
							}))}
							formatItem={{
								id: "value",
								text: "label",
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
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Cơ sở (*)</div>
						<DropdownSearchable
							onchangeValue={(value: any) => setFieldValue("funda", value)}
							className={"flex-1"}
							placeholder="Cơ sở"
							isMultiple={false}
							allowClearValueSingleInput={true}
							onClearData={() => setFieldValue("funda", '')}
							showTriangle={false}
							maxWidthInput="max-w-none"
							renderSelectedItem={(item) => {
								return (
									<div className="flex">
										<Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 top-0 w-[330px] h-fit whitespace-normal" >
											<p className="text-1-line-clamp">{`${item.text}`}</p>
										</Popover>
									</div>
								)
							}}
							onSearchInputChange={debounce(
								(value) => setFundaKeyword(value),
								500
							)}
							initialValue={initialValues?.funda}
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
							name="funda"
							component="span"
							className="font-normal leading-7 text-sm text-negative"
						/>
					</div>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Xuất sang cơ sở nội bộ</div>
						<DropdownSearchable
							onchangeValue={(value: any) => setFieldValue("linkFunda", value)}
							className={"flex-1"}
							placeholder="Cơ sở nội bộ"
							isMultiple={false}
							allowClearValueSingleInput={true}
							onClearData={() => setFieldValue("linkFunda", '')}
							showTriangle={false}
							maxWidthInput="max-w-none"
							renderSelectedItem={(item) => {
								return (
									<div className="flex">
										<Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 top-0 w-[330px] h-fit whitespace-normal" >
											<p className="text-1-line-clamp">{`${item.text}`}</p>
										</Popover>
									</div>
								)
							}}
							onSearchInputChange={debounce(
								(value) => setFundaKeyword(value),
								500
							)}
							initialValue={initialValues?.linkFunda}
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
							name="linkFunda"
							component="span"
							className="font-normal leading-7 text-sm text-negative"
						/>
					</div>
					<div className={"w-1/8 flex items-center"}>
						<div className={"w-1/3 flex items-center"}>
							<Field type="radio" name="vat" value={1} className={"form-check-input mt-0"} onChange={() => setFieldValue('vat', 1)} />
							<label htmlFor="vat-type-1" className={"text-left ml-3"}>VAT vào</label>
						</div>
						<div className={"w-1/3 flex items-center"}>
							<Field type="radio" name="vat" value={2} className={"form-check-input mt-0"} onChange={() => setFieldValue('vat', 2)} />
							<label htmlFor="vat-type-2" className={"text-left ml-3"}>VAT ra</label>
						</div>
						<div className={"w-1/3 flex items-center"}>
							<Field type="radio" name="vat" value={0} className={"form-check-input mt-0"} onChange={() => setFieldValue('vat', 0)} />
							<label htmlFor="vat-type-3" className={"text-left ml-3"}>Không</label>
						</div>
					</div>
					<div className={"w-1/4 flex items-center"}>
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
							onchangeValue={(value: any) => {
								setFieldValue("customer", value)

								values.selectedJournals.map((_: any, index: number) => {
									setFieldValue(`selectedJournals.${index}.customerDebit`, value)
									setFieldValue(`selectedJournals.${index}.customerCredit`, value)
								})
							}}
							className={"flex-1"}
							placeholder="Mã khách"
							isMultiple={false}
							allowClearValueSingleInput={true}
							onClearData={() => setFieldValue("customer", '')}
							showTriangle={false}
							maxWidthInput="max-w-none"
							renderSelectedItem={(item) => {
								return (
									<div className="flex">
										<Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 top-0 w-[330px] h-fit whitespace-normal" >
											<p className="text-1-line-clamp">{`${item.text}`}</p>
										</Popover>
									</div>
								)
							}}
							onSearchInputChange={debounce(
								(value) => setSearchCustomerValue(value),
								500
							)}
							initialValue={initialValues?.customer}
							data={listCustomer.map((item: any) => ({
								label: `${item.name}-${item.phone}`,
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
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Kho bãi</div>
						<DropdownSearchable
							onchangeValue={(value: any) => {
								setFieldValue("warehouse", value)

								values.selectedJournals.map((_: any, index: number) => {
									setFieldValue(`selectedJournals.${index}.warehouse`, value)
								})
							}}
							className={"flex-1"}
							placeholder="Kho bãi"
							isMultiple={false}
							allowClearValueSingleInput={true}
							onClearData={() => setFieldValue("warehouse", '')}
							showTriangle={false}
							maxWidthInput="max-w-none"
							renderSelectedItem={(item) => {
								return (
									<div className="flex">
										<Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 top-0 w-[330px] h-fit whitespace-normal" >
											<p className="text-1-line-clamp">{`${item.text}`}</p>
										</Popover>
									</div>
								)
							}}
							onSearchInputChange={debounce(
								(value) => setSearchWarehouseValue(value),
								500
							)}
							initialValue={initialValues?.warehouse}
							data={listWarehouse.map((item: any) => ({
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
							name="warehouse"
							component="span"
							className="font-normal leading-7 text-sm text-negative"
						/>
					</div>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Khoản mục phí</div>
						<DropdownSearchable
							onchangeValue={(value: any) => {
								setFieldValue("subtype", value)

								values.selectedJournals.map((_: any, index: number) => {
									setFieldValue(`selectedJournals.${index}.subtype`, value)
								})
							}}
							className={"flex-1"}
							placeholder="Khoản mục phí"
							isMultiple={false}
							allowClearValueSingleInput={true}
							onClearData={() => setFieldValue("subtype", '')}
							showTriangle={false}
							maxWidthInput="max-w-none"
							renderSelectedItem={(item) => {
								return (
									<div className="flex">
										<Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 top-0 w-[330px] h-fit whitespace-normal" >
											<p className="text-1-line-clamp">{`${item.text}`}</p>
										</Popover>
									</div>
								)
							}}
							onSearchInputChange={debounce(
								(value) => setSearchSubTypeValue(value),
								500
							)}
							initialValue={initialValues?.subtype}
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
					<div className={"w-1/8 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Hợp đồng</div>
						<DropdownSearchable
							onchangeValue={(value: any) => {
								setFieldValue("contract", value)

								values.selectedJournals.map((_: any, index: number) => {
									setFieldValue(`selectedJournals.${index}.contract`, value)
								})
							}}
							className={"flex-1"}
							placeholder="Hợp đồng"
							isMultiple={false}
							allowClearValueSingleInput={true}
							onClearData={() => setFieldValue("contract", '')}
							showTriangle={false}
							maxWidthInput="max-w-none"
							renderSelectedItem={(item) => {
								return (
									<div className="flex">
										<Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 top-0 w-[330px] h-fit whitespace-normal" >
											<p className="text-1-line-clamp">{`${item.text}`}</p>
										</Popover>
									</div>
								)
							}}
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
					{/* <div className={"w-1/8 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Kỳ</div>
						<DropdownSearchable
							onchangeValue={(value: any) => setFieldValue("ipc", value)}
							className={"flex-1"}
							placeholder="Kỳ thanh toán"
							isMultiple={false}
							allowClearValueSingleInput={true}
							onClearData={() => setFieldValue("ipc", '')}
							showTriangle={false}
							maxWidthInput="max-w-none"
							renderSelectedItem={(item) => {
								return (
									<div className="flex">
										<Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 top-0 w-[330px] h-fit whitespace-normal" >
											<p className="text-1-line-clamp">{`${item.text}`}</p>
										</Popover>
									</div>
								)
							}}
							onSearchInputChange={debounce(
								(value) => setSearchContractIPCValue(value),
								500
							)}
							initialValue={initialValues?.ipc}
							data={values.contract.value ? listContractIPC.map((item: any) => ({
								label: item.name,
								value: item._id,
							})) : []}
							formatItem={{
								id: "value",
								text: "label",
							}}
							inlineSearch={true}
						/>
					</div> */}
				</div>
				<div className={"flex py-1 border-b"}>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Ngày hạch toán (*)</div>
						<DatePicker
							wrapperClassName={"w-auto"}
							name="date"
							showTimeSelect
							selected={(values.date && new Date(values.date)) || new Date()}
							timeIntervals={1}
							timeFormat="HH:mm"
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
													"DD/MM/YYYY HH:mm"
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
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Mã hiệu</div>
						<Field type="text" name="sign" className={"focus:outline-none"} placeholder={"Mã hiệu"} />
						<ErrorMessage
							name="sign"
							component="span"
							className="font-normal leading-7 text-sm text-negative"
						/>
					</div>
					<div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Hạn thanh toán</div>
						<DayPickerInput
							format={DATE_FORMAT}
							value={
								initialValues.paymentDeadline &&
								moment(initialValues.paymentDeadline).format(DATE_FORMAT)
							}
							onDayChange={(day: any) => setFieldValue("paymentDeadline", day)}
							inputProps={{
								className: "focus:outline-none placeholder:text-gray-500",
								placeholder: "Hạn thanh toán",
							}}
						/>
					</div>
					{/* <div className={"w-1/4 flex items-center"}>
						<div className={"text-left text-gray-500 flex items-center mr-2"}>Tỷ giá USD</div>
						<Field type="text" name="fcuExRate" className={"focus:outline-none"} placeholder={"Tỷ giá USD"} />
					</div> */}
				</div>
			</div>
			<CreateNewTicketTableAccount formik={formik} initialValues={initialValues} isEdit={isEdit} />
		</>
	)
}

export default CreateNewTicketForm;