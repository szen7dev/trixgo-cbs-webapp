import { FC, FormEvent, useCallback, useState } from "react";

import { Field, Form, Formik } from "formik";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { useModal } from "services/hooks/useModal";

import styles from "../../../styles.module.css";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import CollapseHoriIcon from "assets/images/icon-collapse-hori.svg";
import CollapseVertiIcon from "assets/images/icon-collapse-verti.svg";
import DropdownSearchable from "components/common/DropdownSearch";
import {
  useQueryListDepartments,
  useQueryListDoctype,
  useFetchListArea,
} from "services/hooks/useHuman";
 
import { CONTRACT_TYPES, CONTRACT_SUB_TYPES, CONTRACT_TA, CONTRACT_COME_IN_STATUS } from "apis/localdb/index";

interface NewContractIncomeModalProps {
  defaultValues?: any;
  onFinish: (values: any) => Promise<boolean>;
  title?: string;
}

const IncomeFormModal: FC<NewContractIncomeModalProps>  =  ({ defaultValues,  onFinish,  title}) => {
  const [openManagementInfo, setOpenManagementInfo] = useState(false);
  const [openGeneralInfo, setOpenGeneralInfo] = useState(false);
  const [openAcceptancePayment, setOpenAcceptancePayment] = useState(false);
  const [openBudget, setOpenBudget] = useState(false);
  const [openGuarantee, setOpenGuarantee] = useState(false);

  const { closeModal } = useModal();

  const [searchFieldValue, setSearchFieldValue] = useState(
    defaultValues?.department?.name || ""
  );
  const { listDoctypes: listField } = useQueryListDoctype({
    limit: 10,
    type: 3,
    keyword: searchFieldValue,
  });

  const [searchDebtStatusValue, setSearchDebtStatusValue] = useState(
    defaultValues?.department?.name || ""
  );
  const { listDoctypes: listDebtStatus } = useQueryListDoctype({
    limit: 10,
    type: 16,
    keyword: searchDebtStatusValue,
  });

  const initialValues = {
    company: "",
    project: "",
    parent: "",
    level: "",
    admins: "",
    members: "",
    draft: 1,
    field: '',
    outIn: 1,
    status: 1,
    real: 1,
    debtStatus: '',
    type: 1,
    subType: 1,
    name: "",
    sign: "",
    storeSign: "",
    description: "",
    note: "",
    note1: "",
    date: null,
    startTime: null,
    endTime: null,
    buyerInfo: "",
    buyerBank: "",
    sellerInfo: "",
    sellerBank: "",
    packageName: "",
    lock: 1,
    value: 0,
    vatValue: 0,
    plus: 0,
    vatPlus: 0,
    advancePayment: 0,
    produce: 0,
    vatProduce: 0,
    plusProduce: 0,
    vatPlusProduce: 0,
    acceptance: 0,
    vatAcceptance: 0,
    plusAcceptance: 0,
    vatPlusAcceptance: 0,
    retainedValue: 0,
    advancePaymentDeduction: 0,
    otherDeduction: 0,
    recommendedPayment: 0,
    advancePaymentPaid: 0,
    amountPaid: 0,
    remainingPayment: 0,
    advancePaymentOverage: 0,
    finalValue: 0,
    budget: 0,
    budgetVAT: 0,
    forecastBudget: 0,
    forecastBudgetVAT: 0,
    managementFee: 0,
    subcontractFee: 0,
    expenses: 0,
    profit: 0,
    cgValue: 0,
    expiredCg: null,
    agValue: 0,
    expiredAg: null,
  };

  const handleSubmit = useCallback(
    async (values: any) => {
      const formatData = {
        ...values,
        
      };
      
      console.log('🚀 ~ formatData', formatData)
      const isSuccess = await onFinish(formatData);
      if (isSuccess) {
        closeModal();
      }
    },
    [onFinish, closeModal]
  );

  return (
    <main className="relative h-full">
      <header className="flex items-center justify-between px-3 h-[50px] bg-cbs-table-header">
        <p className="text-xl font-bold">Tạo mới/cập nhật</p>
        <img
          src={CloseIcon}
          alt="Close"
          className="cursor-pointer"
          onClick={() => closeModal()}
        />
      </header>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => {
          const { handleBlur, setFieldValue } = formik;
          return (
            <Form className="max-h-[690px] py-5 overflow-y-auto">
              <div>
                <div
                  className="flex items-center px-7 mb-8 select-none cursor-pointer"
                  onClick={() => setOpenManagementInfo(!openManagementInfo)}
                >
                  <div className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3">
                    <img
                      src={
                        openManagementInfo
                          ? CollapseVertiIcon
                          : CollapseHoriIcon
                      }
                      alt="Collapse"
                    />
                  </div>
                  <span className="text-xl font-bold">
                    Thông tin quản trị và phân loại
                  </span>
                </div>
                {openManagementInfo && (
                  <div className="grid grid-cols-2 gap-x-11 gap-y-5 pb-9 mb-7 h-full border-b mx-7">
                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Thuộc dự án (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("projectID", value.id)}
                        placeholder="Thuộc dự án..."
                        className="w-full pl-0 -mb-1"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={false}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        data={[
                          {
                            _id: 1,
                            content:
                              "Tư vấn quản lý dự án cụm 1 trường Tây Hồ Tây",
                          },
                          {
                            _id: 2,
                            content:
                              "Tư vấn quản lý dự án cụm 2 trường Tây Hồ Tây",
                          },
                          {
                            _id: 3,
                            content:
                              "Tư vấn quản lý dự án cụm 3 trường Tây Hồ Tây",
                          },
                        ]}                        
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại khác (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("subType", value.id)}
                        placeholder="Phân loại khác..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={false}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={CONTRACT_SUB_TYPES}
                        formatItem={{
                          id: "value",
                          text: "text",
                        }}
                        inlineSearch={true}
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại chính thức (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) =>setFieldValue("draft", value.id)}
                        placeholder="Phân loại chính thức..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={false}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Chính thức",
                          },
                          {
                            _id: 2,
                            content: "Nháp",
                          }
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại theo lĩnh vực (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("field", value.id)}
                        placeholder="Phân loại theo lĩnh vực..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={false}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        onSearchInputChange={debounce(
                          (value) => setSearchFieldValue(value),
                          500
                        )}
                        initialValue={initialValues?.field}
                        data={listField.map((item) => ({
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

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại vào ra (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("outin", value.id)}
                        placeholder="Phân loại vào ra..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={false}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Bán ra",
                          },
                          {
                            _id: 2,
                            content: "Bán ra",
                          },
                          {
                            _id: 3,
                            content: "Bán ra",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại theo chủ trì (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("chair", value.id)}
                        placeholder="Phân loại theo chủ trì..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={false}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Phan Văn Trường-PGI",
                          },
                          {
                            _id: 2,
                            content: "Phan Văn Trường-PGI",
                          },
                          {
                            _id: 3,
                            content: "Phan Văn Trường-PGI",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại trạng thái (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("status", value.id)}
                        placeholder="Phân loại trạng thái..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={false}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={CONTRACT_COME_IN_STATUS}
                        formatItem={{
                          id: "value",
                          text: "text",
                        }}
                        inlineSearch={true}
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại theo người phụ trách (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("personInCharge", value.id)}
                        placeholder="Phân loại theo người phụ trách..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={false}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Nguyễn Hữu Hiệp-PGI",
                          },
                          {
                            _id: 2,
                            content: "Nguyễn Hữu Hiệp-PGI",
                          },
                          {
                            _id: 3,
                            content: "Nguyễn Hữu Hiệp-PGI",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại NA (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) =>setFieldValue("real", value.id)}
                        placeholder="Phân loại NA..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={false}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={CONTRACT_TA}
                        formatItem={{
                          id: "value",
                          text: "text",
                        }}
                        inlineSearch={true}
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại theo trạng thái công nợ (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) =>setFieldValue("debtStatus", value.id)}
                        placeholder="Phân loại theo trạng thái công nợ..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={false}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        onSearchInputChange={debounce(
                          (value) => setSearchDebtStatusValue(value),
                          500
                        )}
                        initialValue={initialValues?.debtStatus}
                        data={listDebtStatus.map((item) => ({
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

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại theo hình thức hợp đồng (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) =>setFieldValue("type", value.id)}
                        placeholder="Phân loại theo hình thức hợp đồng..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={false}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={CONTRACT_TYPES}
                        formatItem={{
                          id: "value",
                          text: "text",
                        }}
                        inlineSearch={true}
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại theo kho (*)
                      </p>
                      <DropdownSearchable                      
                        onchangeValue={(value) =>setFieldValue("warehouse", value.id)}
                        placeholder="Phân loại theo kho..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={false}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <span>{item.text}</span>}
                        data={[
                          {
                            _id: 1,
                            content: "Kho công trình",
                          },
                          {
                            _id: 2,
                            content: "Kho công trình",
                          },
                          {
                            _id: 3,
                            content: "Kho công trình",
                          },
                        ]}
                        formatItem={{
                          id: "_id",
                          text: "content",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div
                className="flex items-center px-7 mb-8 cursor-pointer select-none"
                onClick={() => setOpenGeneralInfo(!openGeneralInfo)}
              >
                <div className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3">
                  <img
                    src={openGeneralInfo ? CollapseVertiIcon : CollapseHoriIcon}
                    alt="Collapse"
                  />
                </div>
                <span className="text-xl font-bold">Thông tin chung</span>
              </div>
              {openGeneralInfo && (
                <div className="grid grid-cols-2 gap-x-11 gap-y-5 pb-9 mb-7 border-b mx-7">
                  <div>
                    <p className="text-primary text-xs mb-2">
                      Tên hợp đồng (*)
                    </p>
                    <Field
                      type="text"
                      name="name"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Tên hợp đồng..."
                      // onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">Bên mua</p>
                    <DropdownSearchable
                      onchangeValue={(value:any) => setFieldValue("buyerInfo", value)}
                      placeholder="Bên mua..."
                      className="w-full pl-0 -mb-1 outline-none"
                      classNameInput="border border-primary-border rounded h-[32px]"
                      isMultiple={false}
                      allowClearValueSingleInput={false}
                      showTriangle={true}
                      maxWidthInput="max-w-none"
                      renderSelectedItem={(item) => <span>{item.text}</span>}
                      data={[
                        {
                          _id: 1,
                          content: "Công ty Cổ phần ABC",
                        },
                        {
                          _id: 2,
                          content: "Công ty Cổ phần ABC",
                        },
                        {
                          _id: 3,
                          content: "Công ty Cổ phần ABC",
                        },
                      ]}
                      formatItem={{
                        id: "_id",
                        text: "content",
                      }}
                      inlineSearch={true}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Mã hiệu (*)
                    </p>
                    <Field
                      type="text"
                      name="storeSign"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Mã hiệu..."
                      defaultValue="2906/2011/HDKT"
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Ngân hàng bên mua
                    </p>
                    <Field
                      type="text"
                      name="buyerBank"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Ngân hàng bên mua..."
                      defaultValue="102253566-VCB Chi nhánh Hà Nội"
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Mã hiệu nội bộ
                    </p>
                    <Field
                      type="text"
                      name="storeSign"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Mã hiệu nội bộ..."
                      defaultValue="2906/2011/HDKT"
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">Bên bán</p>
                    <DropdownSearchable
                      onchangeValue={(value:any) => setFieldValue("sellerInfo", value)}
                      placeholder="Bên bán..."
                      className="w-full pl-0 -mb-1 outline-none"
                      classNameInput="border border-primary-border rounded h-[32px]"
                      isMultiple={false}
                      allowClearValueSingleInput={false}
                      showTriangle={true}
                      maxWidthInput="max-w-none"
                      disableClass={cn(
                        "cursor-not-allowed rounded",
                        styles.disabledBg
                      )}
                      renderSelectedItem={(item) => <span>{item.text}</span>}
                      data={[
                        {
                          _id: 1,
                          content: "Công ty Cổ phần XYZ",
                        },
                        {
                          _id: 2,
                          content: "Công ty Cổ phần XYZ",
                        },
                        {
                          _id: 3,
                          content: "Công ty Cổ phần XYZ",
                        },
                      ]}
                      formatItem={{
                        id: "_id",
                        text: "content",
                      }}
                      inlineSearch={true}
                    />
                  </div>

                  <div>
                    <p className="text-primary text-xs mb-2">Mô tả</p>
                    <Field
                      type="text"
                      name="description"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Mô tả..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Ngân hàng bên bán
                    </p>
                    <Field
                      type="text"
                      name="sellerBank"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Ngân hàng bên bán..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">Ghi chú</p>
                    <Field
                      type="text"
                      name="note"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Ghi chú..."
                      defaultValue="Đã chính thức ký kết"
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Tên gói thầu
                    </p>
                    <Field
                      type="text"
                      name="packageName"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Tên gói thầu..."
                      defaultValue="Tư vấn quản lý dự án cụm 2 trường Tây Hồ Tây"
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Ngày ký (*)
                    </p>
                    <DayPickerInput
                        format="dd/MM/yyyy"
                        classNames={{ container: "w-full", overlayWrapper: '', overlay:'' }}
                        onDayChange={(day:any) => setFieldValue("date", day)}
                        inputProps={{
                          className: "pl-3 border border-primary-border w-full rounded w-full h-[32px] outline-none",
                          placeholder: "Thời hạn bảo lãnh hợp đồng",
                        }}
                      />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Ghi chú khác
                    </p>
                    <Field
                      type="text"
                      name="note1"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Ghi chú khác..."
                      defaultValue="Dự kiến khả thi"
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Bắt đầu thực hiện
                    </p>
                    <DayPickerInput
                        format="dd/MM/yyyy"
                        classNames={{ container: "w-full", overlayWrapper: '', overlay:'' }}
                        onDayChange={(day:any) => setFieldValue("startTime", day)}
                        inputProps={{
                          className: "pl-3 border border-primary-border w-full rounded w-full h-[32px] outline-none",
                          placeholder: "Thời hạn bảo lãnh hợp đồng",
                        }}
                      />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Khóa hợp đồng
                    </p>
                    <DropdownSearchable
                      onchangeValue={(value:any) => setFieldValue("lock", value)}
                      placeholder="Khóa hợp đồng..."
                      className="w-full pl-0 -mb-1 outline-none"
                      classNameInput="border border-primary-border rounded h-[32px]"
                      isMultiple={false}
                      allowClearValueSingleInput={false}
                      showTriangle={true}
                      maxWidthInput="max-w-none"
                      disableClass={cn(
                        "cursor-not-allowed rounded",
                        styles.disabledBg
                      )}
                      renderSelectedItem={(item) => <span>{item.text}</span>}
                      data={[
                        {
                          _id: 1,
                          content: "Open",
                        },
                        {
                          _id: 2,
                          content: "Khóa",
                        },
                        
                      ]}
                      formatItem={{
                        id: "_id",
                        text: "content",
                      }}
                      inlineSearch={true}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Kết thúc thực hiện
                    </p>
                    <DayPickerInput
                        format="dd/MM/yyyy"
                        classNames={{ container: "w-full", overlayWrapper: '', overlay:'' }}
                        onDayChange={(day:any) => setFieldValue("endTime", day)}
                        inputProps={{
                          className: "pl-3 border border-primary-border w-full rounded w-full h-[32px] outline-none",
                          placeholder: "Thời hạn bảo lãnh hợp đồng",
                        }}
                      />
                  </div>
                </div>
              )}

              <div
                className="grid grid-cols-2 px-7 gap-x-11 mb-8 cursor-pointer select-none"
                onClick={() => setOpenAcceptancePayment(!openAcceptancePayment)}
              >
                <div className="flex items-center">
                  <div className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3">
                    <img
                      src={
                        openAcceptancePayment
                          ? CollapseVertiIcon
                          : CollapseHoriIcon
                      }
                      alt="Collapse"
                    />
                  </div>
                  <span className="text-xl font-bold">
                    Nghiệm thu và thanh toán
                  </span>
                </div>
                {openAcceptancePayment && (
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xl">USD</p>
                    <div className="flex items-center">
                      <p className="text-primary-gray text-xs mr-5">
                        Tỷ giá USD
                      </p>
                      <input
                        type="text"
                        defaultValue="23.010"
                        className="w-[66px] h-8 outline-none text-right border-b border-primary-border text-primary"
                      />
                    </div>
                  </div>
                )}
              </div>
              {openAcceptancePayment && (
                <div className="pb-9 mb-7 h-full border-b mx-7">
                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      1 - Giá trị trước VAT
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="value"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="value"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      2 - Giá trị phần VAT
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="vatValue"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="vatValue"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      3 - Phát sinh trước VAT
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="plus"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="plus"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      4 - Phát sinh phần VAT
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="vatPlus"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="vatPlus"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      5 - Tạm ứng theo hợp đồng
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="advancePayment"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Tạm ứng theo hợp đồng..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="advancePayment"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Tạm ứng theo hợp đồng..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      6 - Sản lượng trước VAT
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="produce"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Sản lượng trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="produce"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Sản lượng trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      7 - Sản lượng VAT
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="vatProduce"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Sản lượng VAT ..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="vatProduce"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Sản lượng VAT ..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      8 - Sản lượng phát sinh trước VAT
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="plusProduce"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Sản lượng phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="plusProduce"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Sản lượng phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      9 - Sản lượng phát sinh phần VAT
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="vatPlusProduce"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Sản lượng phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="vatPlusProduce"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Sản lượng phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      10 - Nghiệm thu phát sinh trước VAT
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="acceptance"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Nghiệm thu phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="acceptance"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Nghiệm thu phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      11 - Giá trị nghiệm thu phần VAT
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="vatAcceptance"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phần VAT"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="vatAcceptance"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phần VAT"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      12 - Giá trị nghiệm thu phát sinh trước VAT
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="plusAcceptance"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phát sinh trước VAT"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="plusAcceptance"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phát sinh trước VAT"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      13 - Giá trị nghiệm thu phát sinh phần VAT
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="vatPlusAcceptance"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phát sinh phần VAT"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="vatPlusAcceptance"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phát sinh phần VAT"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      14 - Giá trị giữ lại
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="retainedValue"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị giữ lại..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="retainedValue"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị giữ lại..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      15 - Thu hồi tạm ứng
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="advancePaymentDeduction"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Thu hồi tạm ứng..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="advancePaymentDeduction"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Thu hồi tạm ứng..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      16 - Khấu trừ khác (nếu có)
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="otherDeduction"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Khấu trừ khác (nếu có)..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="otherDeduction"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Khấu trừ khác (nếu có)..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      17 - Đề nghị tạm ứng/thanh toán
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="recommendedPayment"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Đề nghị tạm ứng/thanh toán..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="recommendedPayment"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Đề nghị tạm ứng/thanh toán..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      18 - Đã giải ngân tạm ứng
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="advancePaymentPaid"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Đã giải ngân tạm ứng..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="advancePaymentPaid"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Đã giải ngân tạm ứng..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      19 - Đã giải ngân thanh toán
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="amountPaid"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Đã giải ngân thanh toán..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="amountPaid"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Đã giải ngân thanh toán..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      20 - Còn lại chưa giải ngân
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="remainingPayment"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Còn lại chưa giải ngân..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="remainingPayment"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Còn lại chưa giải ngân..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      21 - Dư ứng
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="advancePaymentOverage"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Dư ứng..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="advancePaymentOverage"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Dư ứng..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      22 - Giá trị quyết toán
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="vat"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị quyết toán..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="text"
                        name="vat"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị quyết toán..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              <div
                className="flex items-center px-7 mb-8 cursor-pointer select-none"
                onClick={() => setOpenBudget(!openBudget)}
              >
                <div className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3">
                  <img
                    src={openBudget ? CollapseVertiIcon : CollapseHoriIcon}
                    alt="Collapse"
                  />
                </div>
                <span className="text-xl font-bold">Ngân sách</span>
              </div>
              {openBudget && (
                <div className="grid grid-cols-2 gap-x-11 gap-y-5 pb-9 border-b mb-8 mx-7">
                  <div>
                    <p className="text-primary-gray text-xs mb-2">Ngân sách</p>
                    <Field
                      type="text"
                      name="budget"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Ngân sách..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Phí quản lý
                    </p>
                    <input
                      type="text"
                      name="managementFee"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Phí quản lý..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      VAT ngân sách
                    </p>
                    <input
                      type="text"
                      name="budgetVAT"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="VAT ngân sách..."
                      defaultValue="10.000.000"
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Tỷ lệ giao khoán
                    </p>
                    <input
                      type="text"
                      name="subcontractFee"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Tỷ lệ giao khoán..."
                      defaultValue="10.000.000"
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Dự báo ngân sách
                    </p>
                    <input
                      type="text"
                      name="forecastBudget"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Dự báo ngân sách..."
                      defaultValue="10.000.000"
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">Chi phí</p>
                    <input
                      type="text"
                      name="expenses"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Chi phí..."
                      defaultValue="10.000.000"
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">VAT dự báo</p>
                    <Field
                      type="text"
                      name="forecastBudgetVAT"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="VAT dự báo..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">Lợi nhuận</p>
                    <Field
                      type="text"
                      name="profit"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Lợi nhuận..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>
                </div>
              )}

              <div
                className="flex items-center px-7 mb-8 cursor-pointer select-none"
                onClick={() => setOpenGuarantee(!openGuarantee)}
              >
                <div className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3">
                  <img
                    src={openGuarantee ? CollapseVertiIcon : CollapseHoriIcon}
                    alt="Collapse"
                  />
                </div>
                <span className="text-xl font-bold">Bảo lãnh</span>
              </div>
              {openGuarantee && (
                <div className="grid grid-cols-2 gap-x-11 gap-y-5 pb-9 mb-7 mx-7">
                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Bảo lãnh hợp đồng
                    </p>
                    <Field
                      type="text"
                      name="cgValue"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Bảo lãnh hợp đồng..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Bảo lãnh tạm ứng
                    </p>
                    <input
                      type="text"
                      name="agValue"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Bảo lãnh tạm ứng..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Thời hạn bảo lãnh hợp đồng
                    </p>
                    <DayPickerInput
                        classNames={{ container: "w-full", overlayWrapper: '', overlay:'' }}
                        onDayChange={(day:any) => setFieldValue("expiredCg", day)}
                        inputProps={{
                          className: "pl-3 border border-primary-border w-full rounded w-full h-[32px] outline-none",
                          placeholder: "Thời hạn bảo lãnh hợp đồng",
                        }}
                      />
                    
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Thời hạn bảo lãnh tạm ứng
                    </p>
                    <DayPickerInput
                        format="dd/MM/yyyy"
                        classNames={{ container: "w-full", overlayWrapper: '', overlay:'' }}
                        onDayChange={(day:any) => setFieldValue("expiredAg", day)}
                        inputProps={{
                          className: "pl-3 border border-primary-border w-full rounded w-full h-[32px] outline-none",
                          placeholder: "Thời hạn bảo lãnh hợp đồng",
                        }}
                      />
                   
                  </div>
                </div>
              )}
              <footer className="absolute -pl-6 bottom-0 h-[60px] w-full border-t border-primary-border flex items-center justify-end">
                <button
                  type="submit"
                  className="text-primary-light bg-primary w-24 h-8 mr-8 rounded"
                >
                  Xác nhận
                </button>
              </footer>
            </Form>
          );
        }}
      </Formik>
    </main>
  );
};

export default IncomeFormModal;
