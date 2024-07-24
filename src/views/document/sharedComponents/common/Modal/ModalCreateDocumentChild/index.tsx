import { Dialog } from "@headlessui/react";
import moment from "moment";
import React, { Fragment, useContext, useState } from "react";
import cn from "classnames";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { Formik, Form, Field } from "formik";
import uniqBy from "lodash/uniqBy";
import debounce from "lodash/debounce";

import { ModalContext } from "views/document/contexts/modal";
import itemTag from "assets/images/icons8-price-tag.svg";
import { DropdownSearchable } from "shareComponents/common";
import { ModalContainer } from "shareComponents/common/ModalContainer";

import { useQueryListPackage } from "services/hooks/document/usePackage";
import { useDatahubContact } from "services/hooks/datahub/contact/useDatahubContact";
import { useQueryContact } from "services/hooks/items/useContact";
import { useQueryListDoctype } from "services/hooks/items/useDoctype";
import { useStorage } from "services/hooks/items/useStorage";
import { useQueryItemContract } from "services/hooks/items/useContract";
import { useQueryListCompany } from "services/hooks/useCompanies";
import { DIRECTION_TYPES, DOCUMENT_TYPES, DOCUMENT_TYPES_SORT } from "apis/localdb";
import { Document } from "typings/ppt";
import { useMutationDocumentChild }  from "services/hooks/document/useDocumentChild"
import { toast } from "react-toastify";

const fieldInputByRow = [
	{ title: "Số lượng", name: "amount", type: "text" },
	{ title: "Số lượng giao", name: "amountDelivery", type: "text" },
	{
		title: "Phản hồi",
		name: "requestResponse",
		type: "checkbox",
		checked: true,
	},
	{
		title: "Thời hạn",
		name: "expiredResponse",
		type: "datepicker",
	},
	{
		title: "Mã hiệu",
		name: "sign",
		type: "text",
	},
	{
		title: "Mã hiệu lưu",
		name: "storeSign",
		type: "text",
	},
	{
		title: "Người ký",
		name: "approver",
		type: "text",
	},
	{ title: "Giá trị", name: "value", type: "text" },
	{ title: "Nhận dạng", name: "style", type: "text" },
	{ title: "Tình trạng", name: "status", type: "text" },
	{ 
		title: "Ngày văn bản (*)", 
		name: "date", 
		type: "datepicker" 
	},
	{ 
		title: "Thời hạn phản hồi", 
		name: "deadline", 
		type: "datepicker" 
	},
	{
		title: "Ngày nhận",
		name: "receivedDate",
		type: "datepicker",
	},
];

const useInitialValues = (
	departmentID: string, companyID: string, keywordPackage?: string,
	keywordSender?: string, keywordReceiver?: string, keywordProperty?: string,
	keywordContract?: string, keywordStorage?: string, keywordDatahubContact?: string ) => {

	const { listPackage } = useQueryListPackage({ keyword: keywordPackage, departmentID });
	const { listContact: listContactSender } = useQueryContact({ companyID, keyword: keywordSender });
	const { listContact: listContactReceiver } = useQueryContact({ companyID, keyword: keywordReceiver });
	const { data: listDatahubContact } = useQueryListCompany({ keyword: keywordDatahubContact });
	const { listDoctypes: properties } = useQueryListDoctype({
		keyword: keywordProperty,
		type: 2,
		companyID,
		isShowParentAndChild: 1
	});
	const { list: listStorages } = useStorage({
		params: {
			companyID, keyword: keywordStorage
		},
		isFetchList: true
	});
	const { listContracts } = useQueryItemContract({ companyID, keyword: keywordContract });
	return {
		listPackage,
		listContactSender,
		listContactReceiver,
		fields: listDatahubContact,
		properties,
		listStorages,
		listContracts,
	};
};

type Props = {
	isShow: boolean;
	toggle: () => void;
	document: Document,
	refetchListChild: any
}

export const ModalCreateDocumentChild: React.FC<Props> = ({ isShow, toggle, document, refetchListChild }) => {
	const { state } = useContext(ModalContext);
	const { insertDocumentChildAsync } = useMutationDocumentChild();
	const  [ keywordPackage, setKeywordPackage	    ] = useState("");
	const  [ keywordSender,  setKeywordSender 		] = useState("");
	const  [ keywordReceiver,  setKeywordReceiver   ] = useState("");
	const  [ keywordProperty,  setKeywordProperty ]   = useState("");
	const  [ keywordContract,  setKeywordContract ]   = useState("");
	const  [ keywordStorage,  setKeywordStorage ]     = useState("");
	const  [ keywordDatahubContact,  setKeywordDatahubContact ]       = useState("");

	const {
		fields,
		listContactSender,
		listContactReceiver,
		listPackage,
		listContracts,
		listStorages,
		properties,
	} = useInitialValues(
		document.project?._id,
		document.project?.company, // companyID
		keywordPackage,
		keywordSender,
		keywordReceiver,
		keywordProperty,
		keywordContract,
		keywordStorage,
		keywordDatahubContact
	);

	const initialValues = {
		departmentID: document?.project?._id,
		parentID: document?._id
	}

	const listFormFieldsDropdown = React.useMemo((): {
		title: string;
		name: string;
		data: any[];
	}[] => {
		return [
			{ title: "Gói thầu (*)", data: listPackage, name: "package" },
			{
				title: "Hướng (*)",
				data: DIRECTION_TYPES.map((elm) => ({
					_id: elm.value,
					name: elm.text,
				})),
				name: "direction",
			},
			{ title: "Nhận", data: listContactReceiver, name: "receiver" },
			{ title: "Phân loại", data: properties, name: "property" },
			{
				title: "Tính chất (*)",
				data: DOCUMENT_TYPES_SORT.map((elm) => ({
					_id: elm.value,
					name: elm.text,
				})),
				name: "type",
			},
			{ title: "Hợp đồng", data: listContracts, name: "contract" },
			{ title: "Lưu trữ", data: listStorages, name: "storage" },
		];
	}, [listContactSender, listContactReceiver , listContracts, listPackage, listStorages, properties]);

	const handleSubmit = async(values: any) => {
		console.log({ values })
		const formatValues = {
			...values
		};

		if (moment(values.date).isValid()) {
			formatValues.date = moment(values.date).toJSON();
		}
		if (moment(values.expiredResponse).isValid()) {
			formatValues.expiredResponse = moment(values.expiredResponse).toJSON();
		}
		if (moment(values.deadline).isValid()) {
			formatValues.deadline = moment(values.deadline).toJSON();
		}
		if (moment(values.receivedDate).isValid()) {
			formatValues.receivedDate = moment(values.receivedDate).toJSON();
		}

		if (values.completeStatus == true) {
			formatValues.completeStatus = 1
		} else{
			formatValues.completeStatus = 0
		}

		if(values.amount){
			formatValues.amount = +values.amount;
		}

		if(values.amountDelivery){
			formatValues.amountDelivery = +values.amountDelivery;
		}

		if(values.amountDelivery){
			formatValues.amountDelivery = +values.amountDelivery;
		}

		if(values.value){
			formatValues.value = +values.value;
		}

		if(values.projectID){
			formatValues.departmentID = values.projectID;
		}

		if(values.storage){
			formatValues.storageID = values.storage;
		}

		if(values.package){
			formatValues.packageID = values.package;
		}

		if(values.receiver){
			formatValues.receiverID = values.receiver;
		}

		if(values.property){
			formatValues.propertyID = values.property;
		}

		if(values.field){
			formatValues.publishID = values.field;
		}

		if(values.contract){
			formatValues.contractID = values.contract;
		}
		
		if(!formatValues.package)
			return toast.warning("Vui lòng chọn gói thầu")

		if(!formatValues.direction)
			return toast.warning("Vui lòng chọn hướng hồ sơ")

		if(!formatValues.type)
			return toast.warning("Vui lòng chọn tính chất")

		// if(!formatValues.property)
		// 	return toast.warning("Vui lòng chọn phân loại")

		// if(!formatValues.sign)
		// 	return toast.warning("Vui lòng nhập mã hiệu")

		if(!formatValues.name)
			return toast.warning("Vui lòng nhập tiêu đề");

		try {
			const infoAfterInsert = await insertDocumentChildAsync(formatValues)
			if(!infoAfterInsert.error){
				toast.success("Thêm văn bản con thành công");
				refetchListChild();
				toggle()
			}
		} catch (error: unknown) {
			console.error(error);
		}
	};

	return (
		<ModalContainer isModalOpen={isShow} toggle={toggle}>
			<div
				className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white"
				style={{ maxWidth: "1569px" }}
			>
				<div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
					<Dialog.Title as="h3" className="text-lg leading-6 font-bold">
						Thêm hồ sơ văn bản con
					</Dialog.Title>
					<button
						type="button"
						onClick={toggle}
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
					{(formik) => {
						const { handleBlur, setFieldValue } = formik;
						return (
							<Form>
								<div className="px-5 pb-4 overflow-x-auto">
									<div className="document__profile-create whitespace-nowrap">
										{/* Fisrt row */}
										{listFormFieldsDropdown.map((item) => {
											const initialValue = (() => {
												const data = state.initialValues[item.name];
												if (data) {
													return data;
												}
												return {};
											})();
											const listUniqById = uniqBy(
												[...item.data].concat(initialValue),
												"_id"
											).filter(elm => elm._id);

											const fnKeyword = (value: string) => {
												if(item.name == "package"){
													return setKeywordPackage(value);
												}

												if(item.name == "receiver"){
													return setKeywordReceiver(value);
												}

												if(item.name == "property"){
													return setKeywordProperty(value);
												}

												if(item.name == "contract"){
													return setKeywordContract(value);
												}

												if(item.name == "storage"){
													return setKeywordStorage(value);
												}
											}
											
											return (
												<Fragment key={item.title}>
													<div className="py-1.5 h-[30px] box-content">
														<p className="py-1.5">{item.title}</p>
													</div>
													<div
														key={item.title + 1}
														className="py-0.5 h-[30px] box-content px-2"
													>
														<DropdownSearchable
															placeholder={item.title}
															className={"w-full flex-1"}
															showTriangle={false}
															maxWidthInput={"max-w-none"}
															isMultiple={false}
															allowClearValueSingleInput={true}
															renderSelectedItem={(item) => (
																<div style={{ width: 150 }} className={"flex items-center"} >
																	<img alt={"tag icon"} src={itemTag} />
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
																		{item.sign}{item?.sign ? ".": ""}{item.text}
																	</p>
																</div>
															)}
															onchangeValue={(value) =>
																setFieldValue(item.name, value._id)
															}
															onSearchInputChange={debounce(
																(value) => 
																	fnKeyword(value),
																500
															)}
															initialValue={
																['direction', 'type', 'finish'].includes(item.name)
																	? item.data.find((elm) => {
																		return elm._id === state?.initialValues[item.name];
																	})
																	: state?.initialValues[item.name]
															}
															data={listUniqById}
															formatItem={{
																id: "_id",
																text: "name",
																sign: "sign",
															}}
															inlineSearch={true}
														/>
													</div>
												</Fragment>
											);
										})}
										{fieldInputByRow.map((item) => {
											if (item.type === "text") {
												return (
													<Fragment key={item.title}>
														<div className="py-1.5 h-[30px] box-content">
															<p className="py-1.5">{item.title}</p>
														</div>
														<div className="text-black py-1.5 h-[30px] box-content px-2">
															<div className="py-1.5">
																<Field
																	name={item.name}
																	type="text"
																	className="w-full"
																	placeholder="Nhập thông tin"
																	onBlur={(
																		e: React.FormEvent<HTMLInputElement>
																	) => {
																		handleBlur(e);
																	}}
																/>
															</div>
														</div>
													</Fragment>
												);
											}
											if (item.type === "datepicker") {
												return (
													<Fragment key={item.title}>
														<div className="py-1.5 h-[30px] box-content">
															<p className="py-1.5">{item.title}</p>
														</div>
														<div className="text-black py-1.5 h-[30px] box-content px-2">
															<div className="py-1.5">
																<DayPickerInput
																	onDayChange={(day) =>
																		setFieldValue(item.name, day)
																	}
																	value={
																		state?.initialValues[item.name] &&
																		moment(
																			state?.initialValues[item.name]
																		).format("DD/MM/YYYY")
																	}
																	inputProps={{
																		className: "w-full",
																		placeholder: "Ngày tháng...",
																		// dateFormat: "dd/MM/yyyy",
																	}}
																/>
															</div>
														</div>
													</Fragment>
												);
											}
											if (item.type === "checkbox") {
												return (
													<Fragment key={item.title}>
														<div className="py-1.5 h-[30px] box-content">
															<p className="py-1.5">{item.title}</p>
														</div>
														<div className="text-black py-1.5 h-[30px] box-content px-2">
															<div className="py-1.5">
																<Field
																	name={item.name}
																	type="checkbox"
																	checked={item.checked}
																	// className="w-full"
																	onBlur={(
																		e: React.FormEvent<HTMLInputElement>
																	) => {
																		handleBlur(e);
																	}}
																/>
															</div>
														</div>
													</Fragment>
												);
											}
											return <div key="default" />;
										})}
										<label
											htmlFor="title"
											className="py-1.5 h-[30px] box-content"
										>
											<p className="py-1.5">Tiêu đề (*)</p>
										</label>
									
										<Field
											onBlur={(e: React.FormEvent<HTMLInputElement>) => {
												handleBlur(e);
											}}
											type="text"
											name="name"
											placeholder="Tiêu đề"
											className="col-span-3 focus:outline-none py-1.5 h-[30px] box-content px-2"
										/>
									
										<label
											htmlFor="status"
											className="py-1.5 h-[30px] box-content"
										>
											<p className="py-1.5">Tình trạng phản hồi</p>
										</label>
										<div className="text-black py-1.5 h-[30px] box-content px-2">
											<div className="py-1.5">
												<Field
													onBlur={(e: React.FormEvent<HTMLInputElement>) => {
														handleBlur(e);
													}}
													type="checkbox"
													name="completeStatus"
												/>
											</div>
										</div>

										<div className="py-1.5 h-[30px] box-content">
											<p className="py-1.5">Đơn vị ban hành (*)</p>
										</div>
										<div className="py-0.5 h-[30px] box-content px-2">
											<DropdownSearchable
												placeholder={"Đơn vị ban hành (*)"}
												className={"w-full flex-1"}
												showTriangle={false}
												maxWidthInput={"max-w-none"}
												isMultiple={false}
												allowClearValueSingleInput={true}
												renderSelectedItem={(item) => (
													<div style={{ width: 150 }} className={"flex items-center"} >
														<img alt={"tag icon"} src={itemTag} />
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
															{item.sign}{item?.sign ? ".": ""}{item.text}
														</p>
													</div>
												)}
												onchangeValue={(value) =>
													setFieldValue("field", value._id)
												}
												onSearchInputChange={
													debounce(
														(value) => (
															setKeywordDatahubContact(value)               
														),
													500
												)}
												// initialValue={{
												// 	value: state?.initialValues['field'],
												// }}
												data={uniqBy([...fields, state?.initialValues['field'] || {}].filter(elm => {
													if (elm._id) {
														return elm;
													}
												}), '_id')}
												formatItem={{
													id: "_id",
													text: "name",
												}}
												inlineSearch={true}
											/>
										</div>
										<label
											htmlFor="description"
											className="py-1.5 h-[30px] box-content"
										>
											<p className="py-1.5">Mô tả</p>
										</label>
										<Field
											type="text"
											onBlur={(e: React.FormEvent<HTMLInputElement>) => {
												handleBlur(e);
											}}
											name="description"
											placeholder="Mô tả"
											className="col-span-7 focus:outline-none py-1.5 h-[30px] box-content"
										/>
										<div className="border-opacity-50 py-1 col-span-8">
											<p className="py-1.5">Ghi chú</p>
											<Field
												onBlur={(e: React.FormEvent<HTMLInputElement>) => {
													handleBlur(e);
												}}
												name="note"
											>
												{({
													field, // { name, value, onChange, onBlur }
												}: // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
													// meta,
													any) => (
													<div>
														<textarea
															rows={10}
															placeholder="Biên soạn nội dung"
															className="w-full focus:outline-none resize-none lex-grow py-2"
															// {...formik.getFieldProps('content')}
															{...field}
														/>
													</div>
												)}
											</Field>
										</div>
										{/* File uploaded */}
										{Array.from({ length: 0 }).map((_, index) => (
											<div
												key={index}
												className="col-span-8 py-1 pl-2 pr-1 max-w-md flex mb-3"
												style={{ backgroundColor: "#EDEBEB" }}
											>
												<a
													className={cn(
														"font-bold whitespace-nowrap flex overflow-hidden",
														{ "text-cbs-primary": index === 0 }
													)}
													href="/"
													target="_blank"
													rel="noreferrer"
												>
													<div className="document__line-min inline-block mr-1.5 py-1 align-bottom">
														Screen Shot 2021-12-22 at 10.15.22.png
													</div>
													<div
														className="inline-block py-1"
														style={{ color: "#777" }}
													>
														(725K)
													</div>
												</a>
												{index !== 0 ? (
													<div className="inline-block w-[124px] min-w-[124px] bg-white border border-cbs-primary p-0.5 h-3 ml-3 my-2">
														<div
															className="bg-cbs-primary h-full"
															style={{ width: 30 + "%" }}
														></div>
													</div>
												) : null}
												<button type="button" className="ml-auto p-1">
													<svg
														aria-label="Xóa tệp đính kèm"
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
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
										))}
									</div>
								</div>
								<div className="flex justify-between pt-3 px-6 pb-3.5 border-t border-cbs-border">
									<div className="flex items-center">
										{/* <label className="w-6 h-6 rounded-md flex justify-center items-center cursor-pointer mr-8">
											<img src={iconAttach} alt="" />
											<input
												type="file"
												name="files"
												id="file"
												className="hidden"
												accept="*"
												multiple
												onChange={(event) => false}
											/>
										</label> */}
										{/* <label>
											<input
												type="checkbox"
												value="send-mail"
												className="h-4 w-4 align-middle mr-5"
											/>
											<span className="select-none align-middle ">
												Thông báo email
											</span>
										</label> */}
									</div>
									<div className="mr-1.5">
										<button
											type="submit"
											className="px-3 py-1.5 rounded-md bg-primary text-white text-large leading-5"
										>
											Xác nhận
										</button>
									</div>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</ModalContainer>
	);
};