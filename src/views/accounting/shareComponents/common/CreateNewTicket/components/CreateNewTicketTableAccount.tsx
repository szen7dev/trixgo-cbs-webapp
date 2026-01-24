import { FC, FormEvent, useState } from "react";
import { DropdownSearchable, Popover } from "shareComponents/common";
import Copy from 'assets/images/icons8-copy-96.png';
import { ErrorMessage, Field, FieldArray } from "formik";
import debounce from "lodash/debounce";
import { LIMIT_DROPDOWN } from "apis/localdb/index";
import {
	useQueryListWarehouse,
	useQueryListContact,
	useQueryListContract,
	useQueryListAccount,
	useQueryListGood
} from "services/hooks/cmcs/useContractIncome";
import {
	useDoctype,
} from "services/hooks/items/useDoctype";

type Props = {
	formik: any,
	initialValues: any,
	isEdit: boolean,
}

const CreateNewTicketTableAccount: FC<Props> = ({ formik, initialValues, isEdit }) => {
	const { customer, warehouse, contract, subtype } = formik.values;
	const { setFieldValue, values } = formik;

	const [searchWarehouseValue, setSearchWarehouseValue] = useState(
		initialValues?.warehouse || ""
	);
	const { listWarehouse } = useQueryListWarehouse({
		limit: LIMIT_DROPDOWN,
		keyword: searchWarehouseValue,
	});
	const [searchCustomerDebitValue, setSearchCustomerDebitValue] = useState(
		initialValues?.customerDebit || ""
	);
	const { listContact: listCustomerDebit } = useQueryListContact({
		limit: LIMIT_DROPDOWN,
		keyword: searchCustomerDebitValue,
	});
	const [searchDebitValue, setSearchDebitValue] = useState(
		initialValues?.debit || ""
	);
	const { listAccount: listDebit } = useQueryListAccount({
		limit: LIMIT_DROPDOWN,
		keyword: searchDebitValue,
		option: 1,
	});
	const [searchCreditValue, setSearchCreditValue] = useState(
		initialValues?.credit || ""
	);
	const { listAccount: listCredit } = useQueryListAccount({
		limit: LIMIT_DROPDOWN,
		keyword: searchCreditValue,
		option: 1,
	});
	const [searchGoodValue, setSearchGoodValue] = useState(
		initialValues?.goods || ""
	);
	const { listGood } = useQueryListGood({
		limit: LIMIT_DROPDOWN,
		keyword: searchGoodValue,
	});

	const [searchSubTypeValue, setSearchSubTypeValue] = useState(
		initialValues?.subType || ""
	);
	const { list: listSubType } = useDoctype({
		params: {
			limit: LIMIT_DROPDOWN,
			type: 23,
			keyword: searchSubTypeValue,
		 },
		isFetchList: true
	});

	const computeAmount = (item: any, index = 0) => {
		setFieldValue(`selectedJournals.${index}.amount`, (+item.unitprice || 1) * (+item.quantity || 1))
	}

	return (
		<div className={"px-1 mt-1 new-ticket-table"}>
			<FieldArray name="selectedJournals">
				{({ insert, remove, push }) => (
					<>
						<div className={"relative table border-collapse w-full text-center"}>
							<div className={"sticky header flex table-row"}>
								<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
									TK nợ
								</div>
								<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
									TK có
								</div>
								<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
									Mã khách nợ (*)
								</div>
								<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
									Mã khách có (*)
								</div>
								<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
									Sản phẩm/Hàng hóa
								</div>
								<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
									Kho bãi
								</div>
								<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
									Tồn kho
								</div>
								<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
									Số lượng (*)
								</div>
								<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
									Đơn giá (*)
								</div>
								<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
									Thành tiền (*)
								</div>
								<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
									Khoản mục phí
								</div>
								<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
									Hàng tặng
								</div>
								<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
									Ghi chú
								</div>
								<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}></div>
							</div>
							{values.selectedJournals.length > 0 &&
								values.selectedJournals.map((item: any, index: any) => (
									<div key={index} className={"flex table-row"}>
										<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
											<DropdownSearchable
												classNameInput={"border-b border-gray-300 rounded-none"}
												className={"w-[125px]"}
												id="ticket-type" placeholder="TK nợ"
												allowClearValueSingleInput={true}
												onchangeValue={(value: any) => setFieldValue(`selectedJournals.${index}.debit`, value)}
												onClearData={() => setFieldValue(`selectedJournals.${index}.debit`, '')}
												showTriangle={false}
												renderSelectedItem={(item) =>
													<Popover onMouseEnterTooltip={false} tooltip={`${item.text} - ${item.description}`} classTooltip="left-0  whitespace-normal" >
														<p className="text-2-line-clamp">{`${item.text} - ${item.description}`}</p>
													</Popover>
												}
												onSearchInputChange={debounce(
													(value) => setSearchDebitValue(value),
													500
												)}
												initialValue={item.debit}
												data={listDebit.map((item: any) => ({
													label: `${item.name} - ${item.description}`,
													value: item._id,
												}))}
												formatItem={{
													id: "value",
													text: "label",
												}}
												inlineSearch={true}
											/>
											<ErrorMessage
												name={`selectedJournals.${index}.debit`}
												component="span"
												className="font-normal leading-7 text-sm text-negative"
											/>
										</div>
										<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
											<DropdownSearchable
												classNameInput={"border-b border-gray-300 rounded-none"}
												className={"w-[125px]"}
												id="ticket-type" placeholder="TK có"
												allowClearValueSingleInput={true}
												onchangeValue={(value: any) => setFieldValue(`selectedJournals.${index}.credit`, value)}
												onClearData={() => setFieldValue(`selectedJournals.${index}.credit`, '')}
												showTriangle={false}
												renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text} - ${item.description}`} classTooltip="left-0 w-[330px] whitespace-normal" >
													<p className="text-2-line-clamp">{`${item.text} - ${item.description}`}</p>
												</Popover>}
												onSearchInputChange={debounce(
													(value) => setSearchCreditValue(value),
													500
												)}
												initialValue={item.credit}
												data={listCredit.map((item: any) => ({
													label: `${item.name} - ${item.description}`,
													value: item._id,
												}))}
												formatItem={{
													id: "value",
													text: "label",
												}}
												inlineSearch={true}
											/>
											<ErrorMessage
												name={`selectedJournals.${index}.credit`}
												component="span"
												className="font-normal leading-7 text-sm text-negative"
											/>
										</div>
										<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
											<DropdownSearchable
												classNameInput={"border-b border-gray-300 rounded-none"}
												className={"w-[125px]"}
												id="ticket-type" placeholder="Mã khách nợ"
												showTriangle={false}
												allowClearValueSingleInput={true}
												onchangeValue={(value: any) => setFieldValue(`selectedJournals.${index}.customerDebit`, value)}
												onClearData={() => setFieldValue(`selectedJournals.${index}.customerDebit`, '')}
												renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-[330px] whitespace-normal" >
													<p className="text-2-line-clamp">{`${item.text}`}</p>
												</Popover>}
												onSearchInputChange={debounce(
													(value) => setSearchCustomerDebitValue(value),
													500
												)}
												valueControlled={
													isEdit ? (
														(initialValues.customer?._id !== customer.value)
															? customer
															: initialValues.selectedJournals?.[index]?.customer
													) : customer
												}
												initialValue={item.customerDebit}
												data={listCustomerDebit.map((item: any) => ({
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
												name={`selectedJournals.${index}.customerDebit`}
												component="span"
												className="font-normal leading-7 text-sm text-negative"
											/>
										</div>
										<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
											<DropdownSearchable
												classNameInput={"border-b border-gray-300 rounded-none"}
												className={"w-[125px]"}
												id="ticket-type" placeholder="Mã khách có"
												showTriangle={false}
												allowClearValueSingleInput={true}
												onchangeValue={(value: any) => setFieldValue(`selectedJournals.${index}.customerCredit`, value)}
												onClearData={() => setFieldValue(`selectedJournals.${index}.customerCredit`, '')}
												renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-[330px] whitespace-normal" >
													<p className="text-2-line-clamp">{`${item.text}`}</p>
												</Popover>}
												onSearchInputChange={debounce(
													(value) => setSearchCustomerDebitValue(value),
													500
												)}
												valueControlled={
													isEdit ? (
														(initialValues.customer?._id !== customer.value)
															? customer
															: initialValues.selectedJournals?.[index]?.customer
													) : customer
												}
												initialValue={item.customerCredit}
												data={listCustomerDebit.map((item: any) => ({
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
												name={`selectedJournals.${index}.customerCredit`}
												component="span"
												className="font-normal leading-7 text-sm text-negative"
											/>
										</div>
										<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
											<DropdownSearchable
												classNameInput={"border-b border-gray-300 rounded-none"}
												className={"w-[125px]"}
												id="ticket-type" placeholder="Sản phẩm/Hàng hóa"
												showTriangle={false}
												allowClearValueSingleInput={true}
												onchangeValue={(value: any) => setFieldValue(`selectedJournals.${index}.goods`, value)}
												onClearData={() => setFieldValue(`selectedJournals.${index}.goods`, '')}
												renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-[330px] whitespace-normal" >
													<p className="text-2-line-clamp">{`${item.text}`}</p>
												</Popover>}
												onSearchInputChange={debounce(
													(value) => setSearchGoodValue(value),
													500
												)}
												initialValue={item.goods}
												data={listGood.map((item: any) => ({
													label: `${item.name}-${item.unit}`,
													value: item._id,
												}))}
												formatItem={{
													id: "value",
													text: "label",
												}}
												inlineSearch={true}
											/>
										</div>
										<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
											<DropdownSearchable
												classNameInput={"border-b border-gray-300 rounded-none"}
												className={"w-[125px]"}
												id="ticket-type" placeholder="Kho bãi"
												onchangeValue={(value: any) => setFieldValue(`selectedJournals.${index}.warehouse`, value)}
												onClearData={() => setFieldValue(`selectedJournals.${index}.warehouse`, '')}
												showTriangle={false}
												allowClearValueSingleInput={true}
												renderSelectedItem={(item) => (
													<Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-[330px] whitespace-normal" >
														<p className="text-2-line-clamp">{`${item.text}`}</p>
													</Popover>
												)}
												onSearchInputChange={debounce(
													(value) => setSearchWarehouseValue(value),
													500
												)}
												valueControlled={
													isEdit ? (
														(initialValues.warehouse?._id !== warehouse.value)
															? warehouse
															: initialValues.selectedJournals?.[index]?.warehouse
													) : warehouse
												}
												initialValue={item.warehouse}
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
										</div>
										<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>

										</div>
										<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
											<Field
												step="any"
												name={`selectedJournals.${index}.quantity`}
												type="number"
												min={0}
												className={"focus:outline-none border-b w-[80px] border-gray-300"}
												placeholder={"Số lượng"}
												onKeyUp={async (e: FormEvent<HTMLInputElement>) => {
													await setFieldValue(`selectedJournals.${index}.quantity`, +e.currentTarget.value);
													computeAmount(item, index)
												}} />
										</div>
										<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
											<Field
												step="any"
												name={`selectedJournals.${index}.unitprice`}
												type="number"
												min={0}
												className={"focus:outline-none border-b w-[80px] border-gray-300"}
												placeholder={"Đơn giá"}
												onKeyUp={async (e: FormEvent<HTMLInputElement>) => {
													await setFieldValue(`selectedJournals.${index}.unitprice`, +e.currentTarget.value);
													computeAmount(item, index)
												}} />
										</div>
										<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
											<Field step="any" readOnly name={`selectedJournals.${index}.amount`} type="number" min={0} className={"focus:outline-none border-b w-[80px] border-gray-300"} placeholder={"Thành tiền"} />
										</div>
										<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
											<DropdownSearchable
												classNameInput={"border-b border-gray-300 rounded-none"}
												className={"w-[150px]"}
												id="ticket-type" placeholder="Khoản mục phí"
												showTriangle={false}
												allowClearValueSingleInput={true}
												onchangeValue={(value: any) => setFieldValue(`selectedJournals.${index}.subtype`, value)}
												onClearData={() => setFieldValue(`selectedJournals.${index}.subtype`, '')}
												renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-[330px] whitespace-normal" >
													<p className="text-2-line-clamp">{`${item.text}`}</p>
												</Popover>}
												onSearchInputChange={debounce(
													(value) => setSearchSubTypeValue(value),
													500
												)}
												valueControlled={
													isEdit ? (
														(initialValues.subtype?._id !== subtype.value)
															? subtype
															: initialValues.selectedJournals?.[index]?.subtype
													) : subtype
												}
												initialValue={item.subtype}
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
										<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
											<Field name={`selectedJournals.${index}.isPaid`} className={"focus:outline-none w-100 border-b w-[40px] border-gray-300"} placeholder={"0, 1"} />
										</div>

										<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle"}>
											<Field name={`selectedJournals.${index}.note`} rows={1} className={"focus:outline-none border-b border-gray-300"} placeholder={"Ghi chú"} />
										</div>
										<div className={"px-2 py-2 table-cell box-border border border-gray-300 align-middle flex items-center"}>
											<div onClick={() => insert(index, { ...item, journalID: '' })} className={"cursor-pointer"}>
												<img alt={"Icon"} src={Copy} />
											</div>
											<span
												onClick={() => {
													values.deletedJournals.push(item)
													remove(index)
												}}
												className="cursor-pointer">
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
													<rect width="24" height="24" fill="url(#pattern0)" />
													<defs>
														<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
															<use xlinkHref="#image0_6604_439" transform="scale(0.0078125)" />
														</pattern>
														<image id="image0_6604_439" width="128" height="128" xlinkHref="data:image/png;base64,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" />
													</defs>
												</svg>
											</span>
										</div>

									</div>
								))}
						</div>

						<div className={"flex mt-3"}>
							<button type="button" className={"btn btn-success"} onClick={() => push({
								debit: '',
								credit: '',
								customerDebit: customer,
								customerCredit: customer,
								goods: '',
								warehouse: warehouse,
								subtype: subtype,
								inventory: '',
								quantity: '',
								unitprice: '',
								amount: '',
								contract: contract,
								budgetWork: '',
								job: '',
								note: '',
								updown: '',
								isPaid: '',

							})}>
								+ Thêm bút toán
							</button>
						</div>
					</>
				)}
			</FieldArray>
		</div >
	)
}

export default CreateNewTicketTableAccount