import "react-day-picker/lib/style.css";
import { FC, FormEvent, useCallback, useEffect, useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { useModal } from "services/hooks/useModal";

import styles from 'views/cmcs/styles/styles.module.css';

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import CollapseHoriIcon from "assets/images/icon-collapse-hori.svg";
import CollapseVertiIcon from "assets/images/icon-collapse-verti.svg";
import { DropdownSearchable, Popover } from "shareComponents/common";

import {
  convertDateToString,
  convertInitialValueDropdown,
  convertInitialValueDropdownForLocalDB,
  MESSAGE_ERROR
} from "utils/cmcs"
import { string, object } from 'yup';

import {
  useQueryListDoctype,
} from "services/hooks/useHuman";
import {
  useQueryListContact,
  useQueryListWarehouse,
  useQueryListProject,
  useDetailContractMutation
} from "services/hooks/cmcs/useContractIncome";

import {
  CONTRACT_TYPES, CONTRACT_DRAFT, CONTRACT_OUTIN, CONTRACT_SUB_TYPES, CONTRACT_TA,
  CONTRACT_COME_IN_STATUS, CONTRACT_LOCK, LIMIT_DROPDOWN, DATE_FORMAT, CONTRACT_ONTIME, CONTRACT_ONBUDGET
} from "apis/localdb/index";

interface NewContractIncomeModalProps {
  defaultValues?: any;
  onFinish: (values: any, isEdit: boolean) => Promise<boolean>;
  title?: string;
  idEdit?: string;
  isEdit?: boolean;
  outin?: number;
}

const mappingData = (data: any, isDataPayLoad = false) => {
  return {
    contractID: data.contractID,
    projectID: isDataPayLoad ? data?.projectID?.value : convertInitialValueDropdown(data?.project, '_id', 'sign', '.', 'name'),
    subType: isDataPayLoad ? data?.subType?.value : convertInitialValueDropdownForLocalDB(CONTRACT_TYPES, data?.subType),
    draft: isDataPayLoad ? data?.draft?.value : convertInitialValueDropdownForLocalDB(CONTRACT_DRAFT, data?.draft),
    field: isDataPayLoad ? data?.field?.value : convertInitialValueDropdown(data?.field || ''),
    outin: isDataPayLoad ? data?.outin?.value : convertInitialValueDropdownForLocalDB(CONTRACT_OUTIN, data?.outin),
    chair: isDataPayLoad ? data?.chair?.value : convertInitialValueDropdown(data?.chair || ''),
    status: isDataPayLoad ? data?.status?.value : convertInitialValueDropdownForLocalDB(CONTRACT_COME_IN_STATUS, data?.status),
    personInCharge: isDataPayLoad ? data?.personInCharge?.value : convertInitialValueDropdown(data?.personInCharge || ''),
    real: isDataPayLoad ? data?.real?.value : convertInitialValueDropdownForLocalDB(CONTRACT_TA, data?.real),
    debtStatus: isDataPayLoad ? data?.debtStatus?.value : convertInitialValueDropdown(data?.debtStatus || ''),
    type: isDataPayLoad ? data?.type?.value : convertInitialValueDropdownForLocalDB(CONTRACT_TYPES, data?.type),
    warehouse: isDataPayLoad ? data?.warehouse?.value : convertInitialValueDropdown(data?.warehouse || ''),
    ontime: isDataPayLoad ? data?.ontime?.value : convertInitialValueDropdownForLocalDB(CONTRACT_ONTIME, data?.ontime),
    onbudget: isDataPayLoad ? data?.onbudget?.value : convertInitialValueDropdownForLocalDB(CONTRACT_ONBUDGET, data?.onbudget),

    name: data.name,
    buyerInfo: isDataPayLoad ? data?.buyerInfo?.value : convertInitialValueDropdown(data?.buyerInfo || ''),
    sign: data.sign,
    buyerBank: data.buyerBank,
    storeSign: data.storeSign,
    sellerInfo: isDataPayLoad ? data?.sellerInfo?.value : convertInitialValueDropdown(data?.sellerInfo || ''),
    description: data.description,
    sellerBank: data.sellerBank,
    note: data.note,
    packageName: data.packageName,
    date: convertDateToString(data.date),
    note1: data.note1,
    startTime: convertDateToString(data.date),
    lock: isDataPayLoad ? data?.lock?.value : convertInitialValueDropdownForLocalDB(CONTRACT_LOCK, data?.lock),
    endTime: convertDateToString(data.endTime),
    value: Number(data.value) || 0,
    vatValue: Number(data.vatValue) || 0,
    plus: Number(data.plus) || 0,
    vatPlus: Number(data.vatPlus) || 0,
    advancePayment: Number(data.advancePayment) || 0,
    produce: Number(data.produce) || 0,
    vatProduce: Number(data.vatProduce) || 0,
    plusProduce: Number(data.plusProduce) || 0,
    vatPlusProduce: Number(data.vatPlusProduce) || 0,
    remainingProduce: Number(data.remainingProduce) || 0,
    acceptance: Number(data.acceptance) || 0,
    vatAcceptance: Number(data.vatAcceptance) || 0,
    plusAcceptance: Number(data.plusAcceptance) || 0,
    vatPlusAcceptance: Number(data.vatPlusAcceptance) || 0,
    retainedValue: Number(data.retainedValue) || 0,
    advancePaymentDeduction: Number(data.advancePaymentDeduction) || 0,
    otherDeduction: Number(data.otherDeduction) || 0,
    recommendedPayment: Number(data.recommendedPayment) || 0,
    advancePaymentPaid: Number(data.advancePaymentPaid) || 0,
    amountPaid: Number(data.amountPaid) || 0,
    remainingPayment: Number(data.remainingPayment) || 0,
    advancePaymentOverage: Number(data.advancePaymentOverage) || 0,
    vat: Number(data.vat) || 0,

    budget: Number(data.budget) || 0,
    managementFee: Number(data.managementFee) || 0,
    vatBudget: Number(data.vatBudget) || 0,
    subcontractFee: Number(data.subcontractFee) || 0,
    forecastBudget: Number(data.forecastBudget) || 0,
    expenses: Number(data.expenses) || 0,
    forecastVatBudget: Number(data.forecastVatBudget) || 0,
    profit: Number(data.profit) || 0,

    cgValue: Number(data.cgValue) || 0,
    agValue: Number(data.agValue) || 0,
    insuranceValue: Number(data.insuranceValue) || 0,

    expiredCg: convertDateToString(data.expiredCg),
    expiredAg: convertDateToString(data.expiredAg),
    expiredInsurance: convertDateToString(data.expiredInsurance),

    alertAg: Number(data.alertAg) || 0,
    alertCg: Number(data.alertCg) || 0,
    alertInsurance: Number(data.alertInsurance) || 0,

    dependentUnit: isDataPayLoad ? data?.dependentUnit?.value : convertInitialValueDropdown(data?.dependentUnit || ''),
  }
}

export const IncomeFormModal: FC<NewContractIncomeModalProps> = ({ defaultValues, onFinish, title, idEdit = '', isEdit = false, outin = 1 }) => {
  const [openManagementInfo, setOpenManagementInfo] = useState(false);
  const [openGeneralInfo, setOpenGeneralInfo] = useState(false);
  const [openAcceptancePayment, setOpenAcceptancePayment] = useState(false);
  const [openBudget, setOpenBudget] = useState(false);
  const [openGuarantee, setOpenGuarantee] = useState(false);
  const { detailContract } = useDetailContractMutation(idEdit);

  useEffect(() => {

  setInitialValues(mappingData(detailContract))

  }, [idEdit, detailContract]);

  const [initialValues, setInitialValues] = useState(mappingData({}));

  const { closeModal } = useModal();

  const [searchProjectValue, setSearchProjectValue] = useState(
    defaultValues?.department?.name || ""
  );
  const { listProject } = useQueryListProject({
    limit: LIMIT_DROPDOWN,
    type: 2,
    keyword: searchProjectValue,
  });

  const [searchFieldValue, setSearchFieldValue] = useState(
    defaultValues?.department?.name || ""
  );
  const { listDoctypes: listField } = useQueryListDoctype({
    limit: LIMIT_DROPDOWN,
    type: 3,
    keyword: searchFieldValue,
  });

  const [searchDebtStatusValue, setSearchDebtStatusValue] = useState(
    defaultValues?.department?.name || ""
  );
  const { listDoctypes: listDebtStatus } = useQueryListDoctype({
    limit: LIMIT_DROPDOWN,
    type: 16,
    keyword: searchDebtStatusValue,
  });

  const [searchChairValue, setSearchChairValue] = useState(
    defaultValues?.department?.name || ""
  );
  const { listContact: listChair } = useQueryListContact({
    limit: LIMIT_DROPDOWN,
    keyword: searchChairValue,
  });

  const [searchPersonInChargeValue, setSearchPersonInChargeValue] = useState(
    defaultValues?.department?.name || ""
  );

  const { listContact: listPersonInCharge } = useQueryListContact({
    limit: LIMIT_DROPDOWN,
    keyword: searchPersonInChargeValue,
  });

  const [searchWarehouseValue, setSearchWarehouseValue] = useState(
    defaultValues?.department?.name || ""
  );
  const { listWarehouse } = useQueryListWarehouse({
    limit: LIMIT_DROPDOWN,
    keyword: searchWarehouseValue,
  });

  const [searchBuyerInfoValue, setSearchBuyerInfoValue] = useState(
    defaultValues?.department?.name || ""
  );
  const { listContact: listBuyerInfo } = useQueryListContact({
    limit: LIMIT_DROPDOWN,
    keyword: searchBuyerInfoValue,
  });

  const [searchSellerInfoValue, setSearchSellerInfoValue] = useState(
    defaultValues?.department?.name || ""
  );
  const { listContact: listSellerInfo } = useQueryListContact({
    limit: LIMIT_DROPDOWN,
    keyword: searchSellerInfoValue,
  });

  const [searchDependentUnit, setSearchDependentUnit] = useState(
    defaultValues?.department?.name || ""
  );
  
  const { listContact: listDependentUnit } = useQueryListContact({
    limit: LIMIT_DROPDOWN,
    keyword: searchDependentUnit,
  });

  const handleSubmit = useCallback(
    async (values: any) => {
      let formatData = {
        ...values,
      }
      if (isEdit) {
        formatData = {
          ...values,
          contractID: detailContract._id
        }
      }
      const isSuccess = await onFinish(mappingData(formatData, true), isEdit);
      if (isSuccess) {
        closeModal();
      }
    },
    [onFinish, closeModal]
  );

  const formValidation = object().shape({
    projectID: object().required(MESSAGE_ERROR.required),
    subType: object().required(MESSAGE_ERROR.required),
    draft: object().required(MESSAGE_ERROR.required),
    field: object().required(MESSAGE_ERROR.required),
    outin: object().required(MESSAGE_ERROR.required),
    chair: object().required(MESSAGE_ERROR.required),
    status: object().required(MESSAGE_ERROR.required),
    personInCharge: object().required(MESSAGE_ERROR.required),
    dependentUnit: object().required(MESSAGE_ERROR.required),
    real: object().required(MESSAGE_ERROR.required),
    type: object().required(MESSAGE_ERROR.required),
    date: string().required(MESSAGE_ERROR.required),
    name: string().required(MESSAGE_ERROR.required),
    sign: string().required(MESSAGE_ERROR.required),
    buyerInfo: object().required(MESSAGE_ERROR.required),
    sellerInfo: object().required(MESSAGE_ERROR.required),
  })
  return (
    <main className="relative  w-[900px] h-[800px] bg-primary-light income-form-modal">
      <header className="flex items-center justify-between px-3 h-[50px] bg-cbs-table-header">
        <p className="text-xl font-bold">{title}</p>
        <img
          src={CloseIcon}
          alt="Close"
          className="cursor-pointer"
          onClick={() => closeModal()}
        />
      </header>
      
      <Formik initialValues={initialValues}  enableReinitialize={true} validationSchema={formValidation} onSubmit={handleSubmit}>
        {(formik) => {
          const { handleBlur, setFieldValue } = formik;
          return (
            <Form className="max-h-[690px] py-5 overflow-y-auto  overflow-x-inherit text-left">
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
                    Thông tin phân loại
                  </span>
                </div>
                {openManagementInfo && (
                  <div className="grid grid-cols-2 gap-x-11 gap-y-5 pb-9 mb-7 h-full border-b mx-7">
                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Thuộc dự án (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("projectID", value)}
                        placeholder="Thuộc dự án..."
                        className="w-full pl-0 -mb-1"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        onClearData={() => setFieldValue("projectID", '')}
                        onSearchInputChange={debounce(
                          (value) => setSearchProjectValue(value),
                          500
                        )}
                        initialValue={initialValues?.projectID }
                        renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
                        data={listProject.map((item: any) => ({
                          label: item.sign + "." + item.name,
                          value: item._id,
                        }))}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                      <ErrorMessage
                        name="projectID"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại khác (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("subType", value)}
                        placeholder="Phân loại khác..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        onClearData={() => setFieldValue("subType", '')}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        initialValue={initialValues?.subType}
                        renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
                        data={CONTRACT_TYPES.map(item => ({
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
                        name="subType"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại chính thức (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("draft", value)}
                        placeholder="Phân loại chính thức..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        onClearData={() => setFieldValue("draft", '')}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        initialValue={initialValues?.draft}
                        renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
                        data={CONTRACT_DRAFT.map(item => ({
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
                        name="draft"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại theo lĩnh vực (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("field", value)}
                        placeholder="Phân loại theo lĩnh vực..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        onClearData={() => setFieldValue("field", '')}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
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
                      <ErrorMessage
                        name="field"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại vào ra (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("outin", value)}
                        placeholder="Phân loại vào ra..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        onClearData={() => setFieldValue("outin", '')}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        // disabled={true}
                        renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
                        initialValue={initialValues?.outin}
                        data={CONTRACT_OUTIN.map(item => ({
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
                        name="outin"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại theo đơn vị (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("dependentUnit", value)}
                        placeholder="Phân loại theo đơn vị..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        onClearData={() => setFieldValue("dependentUnit", '')}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
                        onSearchInputChange={debounce(
                          (value) => setSearchDependentUnit(value),
                          500
                        )}
                        initialValue={initialValues?.dependentUnit}
                        data={listDependentUnit.map((item: any) => ({
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
                        name="dependentUnit"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại trạng thái (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("status", value)}
                        placeholder="Phân loại trạng thái..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        onClearData={() => setFieldValue("status", '')}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
                        initialValue={initialValues?.status}
                        data={CONTRACT_COME_IN_STATUS.map(item => ({
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
                        name="status"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại theo phụ trách (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("personInCharge", value)}
                        placeholder="Phân loại theo phụ trách..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        onClearData={() => setFieldValue("personInCharge", '')}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
                        onSearchInputChange={debounce(
                          (value) => setSearchPersonInChargeValue(value),
                          500
                        )}
                        initialValue={initialValues?.personInCharge}
                        data={listPersonInCharge.map((item: any) => ({
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
                        name="personInCharge"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại NA (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("real", value)}
                        placeholder="Phân loại NA..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        onClearData={() => setFieldValue("real", '')}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
                        initialValue={initialValues?.real}
                        data={CONTRACT_TA.map(item => ({
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
                        name="real"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại theo chủ trì (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("chair", value)}
                        placeholder="Phân loại theo chủ trì..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        onClearData={() => setFieldValue("chair", '')}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
                        onSearchInputChange={debounce(
                          (value) => setSearchChairValue(value),
                          500
                        )}
                        initialValue={initialValues?.chair}
                        data={listChair.map((item: any) => ({
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
                        name="chair"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại theo hình thức hợp đồng (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("type", value)}
                        placeholder="Phân loại theo hình thức hợp đồng..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        onClearData={() => setFieldValue("type", '')}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
                        initialValue={initialValues?.type}
                        data={CONTRACT_TYPES.map(item => ({
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

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại theo kho
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("warehouse", value)}
                        placeholder="Phân loại theo kho..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        onClearData={() => setFieldValue("warehouse", '')}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
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
                    
                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Phân loại theo trạng thái công nợ
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("debtStatus", value)}
                        placeholder="Phân loại theo trạng thái công nợ..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        onClearData={() => setFieldValue("debtStatus", '')}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
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
                      <ErrorMessage
                        name="debtStatus"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Ontime
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("ontime", value)}
                        placeholder="Ontime..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        onClearData={() => setFieldValue("ontime", '')}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
                        // onSearchInputChange={debounce(
                        //   (value) => setSearchDebtStatusValue(value),
                        //   500
                        // )}
                        initialValue={initialValues?.ontime}
                        data={CONTRACT_ONTIME.map(item => ({
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
                        name="debtStatus"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-primary-gray mb-2">
                        Onbudget
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("onbudget", value)}
                        placeholder="Onbudget..."
                        className="w-full pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        onClearData={() => setFieldValue("onbudget", '')}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        disableClass={cn(
                          "cursor-not-allowed rounded",
                          styles.disabledBg
                        )}
                        renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
                        // onSearchInputChange={debounce(
                        //   (value) => setSearchDebtStatusValue(value),
                        //   500
                        // )}
                        initialValue={initialValues?.onbudget}
                        data={CONTRACT_ONBUDGET.map(item => ({
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
                        name="debtStatus"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
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
                    <p className="text-primary-gray text-xs mb-2">
                      Tên hợp đồng (*)
                    </p>
                    <Field
                      type="text"
                      name="name"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Tên hợp đồng..."
                    // onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                    <ErrorMessage
                      name="name"
                      component="span"
                      className="font-normal leading-7 text-sm text-negative"
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">Bên mua (*)</p>
                    <DropdownSearchable
                      onchangeValue={(value: any) => setFieldValue("buyerInfo", value)}
                      placeholder="Bên mua..."
                      className="w-full pl-0 -mb-1 outline-none"
                      classNameInput="border border-primary-border rounded h-[32px]"
                      isMultiple={false}
                      allowClearValueSingleInput={true}
                      onClearData={() => setFieldValue("buyerInfo", '')}
                      showTriangle={true}
                      maxWidthInput="max-w-none"
                      renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                        <p className="text-1-line-clamp">{`${item.text}`}</p>
                      </Popover>}
                      onSearchInputChange={debounce(
                        (value) => setSearchBuyerInfoValue(value),
                        500
                      )}
                      initialValue={initialValues?.buyerInfo}
                      data={listBuyerInfo.map((item: any) => ({
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
                        name="projectID"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Mã hiệu (*)
                    </p>
                    <Field
                      type="text"
                      name="sign"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Mã hiệu..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                    <ErrorMessage
                      name="sign"
                      component="span"
                      className="font-normal leading-7 text-sm text-negative"
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
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">Bên bán (*)</p>
                    <DropdownSearchable
                      onchangeValue={(value: any) => setFieldValue("sellerInfo", value)}
                      placeholder="Bên bán..."
                      className="w-full pl-0 -mb-1 outline-none"
                      classNameInput="border border-primary-border rounded h-[32px]"
                      isMultiple={false}
                      allowClearValueSingleInput={true}
                      onClearData={() => setFieldValue("sellerInfo", '')}
                      showTriangle={true}
                      maxWidthInput="max-w-none"
                      disableClass={cn(
                        "cursor-not-allowed rounded",
                        styles.disabledBg
                      )}
                      renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                        <p className="text-1-line-clamp">{`${item.text}`}</p>
                      </Popover>}
                      onSearchInputChange={debounce(
                        (value) => setSearchSellerInfoValue(value),
                        500
                      )}
                      initialValue={initialValues?.sellerInfo}
                      data={listSellerInfo.map((item: any) => ({
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
                        name="projectID"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">Mô tả</p>
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
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Ngày ký (*)
                    </p>
                    <DayPickerInput
                      format={DATE_FORMAT}
                      value={
                        initialValues.date &&
                        moment(initialValues.date).format(DATE_FORMAT)
                      }
                      onDayChange={(day: any) => setFieldValue("date", day)}
                      inputProps={{
                        className: "pl-3 border border-primary-border w-full rounded w-full h-[32px] outline-none",
                        placeholder: "Ngày ký",
                      }}
                    />
                    <ErrorMessage
                        name="projectID"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
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
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Bắt đầu thực hiện
                    </p>
                    <DayPickerInput
                      format={DATE_FORMAT}
                      value={
                        initialValues.startTime &&
                        moment(initialValues.startTime).format(DATE_FORMAT)
                      }
                      onDayChange={(day: any) => setFieldValue("startTime", day)}
                      inputProps={{
                        className: "pl-3 border border-primary-border w-full rounded w-full h-[32px] outline-none",
                        placeholder: "Bắt đầu thực hiện",
                      }}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Khóa hợp đồng
                    </p>
                    <DropdownSearchable
                      onchangeValue={(value: any) => setFieldValue("lock", value)}
                      placeholder="Khóa hợp đồng..."
                      className="w-full pl-0 -mb-1 outline-none"
                      classNameInput="border border-primary-border rounded h-[32px]"
                      isMultiple={false}
                      allowClearValueSingleInput={true}
                      onClearData={() => setFieldValue("lock", '')}
                      showTriangle={true}
                      maxWidthInput="max-w-none"
                      disableClass={cn(
                        "cursor-not-allowed rounded",
                        styles.disabledBg
                      )}
                      renderSelectedItem={(item) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 w-fit whitespace-normal" >
                        <p className="text-1-line-clamp">{`${item.text}`}</p>
                      </Popover>}
                      initialValue={initialValues?.lock}
                      data={CONTRACT_LOCK.map(item => ({
                        value: item.value,
                        label: item.text
                      }))}
                      formatItem={{
                        id: "value",
                        text: "label",
                      }}
                      inlineSearch={true}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Kết thúc thực hiện
                    </p>
                    <DayPickerInput
                      format={DATE_FORMAT}
                      value={
                        initialValues.endTime &&
                        moment(initialValues.endTime).format(DATE_FORMAT)
                      }
                      onDayChange={(day: any) => setFieldValue("endTime", day)}
                      inputProps={{
                        className: "pl-3 border border-primary-border w-full rounded w-full h-[32px] outline-none",
                        placeholder: "Kết thúc thực hiện",
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
                    Giá trị
                  </span>
                </div>
                {/* {openAcceptancePayment && (
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-xl">USD</p>
                    <div className="flex items-center">
                      <p className="text-primary-gray text-xs mr-5">
                        Tỷ giá USD
                      </p>
                      <Field
                        type="text"
                        value="23.010"
                        className="w-[66px] h-8 outline-none text-right border-b border-primary-border text-primary"
                      />
                    </div>
                  </div>
                )} */}
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
                      {/* <Field
                        type="text"
                        name="value"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e)
                        }
                        }
                      />
                      {/* <Field
                        type="text"
                        name="vatValue"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="plus"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="vatPlus"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="advancePayment"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Tạm ứng theo hợp đồng..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="produce"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Sản lượng trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="vatProduce"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Sản lượng VAT ..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="plusProduce"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Sản lượng phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="vatPlusProduce"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Sản lượng phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      Sản lượng còn lại chưa thực hiện
                    </p>
                    <div className="grid grid-cols-2 gap-x-11">
                      <Field
                        type="text"
                        name="remainingProduce"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Sản lượng còn lại chưa thực hiện..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      {/* <Field
                        type="text"
                        name="remainingProduce"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Sản lượng còn lại chưa thực hiện..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="acceptance"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Nghiệm thu phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="vatAcceptance"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phần VAT"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="plusAcceptance"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phát sinh trước VAT"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="vatPlusAcceptance"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phát sinh phần VAT"
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="retainedValue"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị giữ lại..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="advancePaymentDeduction"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Thu hồi tạm ứng..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="otherDeduction"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Khấu trừ khác (nếu có)..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="recommendedPayment"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Đề nghị tạm ứng/thanh toán..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="advancePaymentPaid"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Đã giải ngân tạm ứng..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="amountPaid"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Đã giải ngân thanh toán..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="remainingPayment"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Còn lại chưa giải ngân..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="advancePaymentOverage"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Dư ứng..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                      {/* <Field
                        type="text"
                        name="vat"
                        className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                        placeholder="Giá trị quyết toán..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
                    <Field
                      type="text"
                      name="vatBudget"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="VAT ngân sách..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Tỷ lệ giao khoán
                    </p>
                    <Field
                      type="text"
                      name="subcontractFee"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Tỷ lệ giao khoán..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Dự báo ngân sách
                    </p>
                    <Field
                      type="text"
                      name="forecastBudget"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Dự báo ngân sách..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">Chi phí</p>
                    <Field
                      type="text"
                      name="expenses"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Chi phí..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">VAT dự báo</p>
                    <Field
                      type="text"
                      name="forecastVatBudget"
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
                <div className="grid grid-cols-3 gap-x-11 gap-y-5 pb-9 mb-7 mx-7">
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
                    <Field
                      type="text"
                      name="agValue"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Bảo lãnh tạm ứng..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Bảo lãnh bảo hành
                    </p>
                    <Field
                      type="text"
                      name="insuranceValue"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Bảo lãnh bảo hành..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>
                
                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Thời hạn bảo lãnh hợp đồng
                    </p>
                    <DayPickerInput
                      format={DATE_FORMAT}
                      value={
                        initialValues.expiredCg &&
                        moment(initialValues.expiredCg).format(DATE_FORMAT)
                      }
                      onDayChange={(day: any) => setFieldValue("expiredCg", day)}
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
                      format={DATE_FORMAT}
                      value={
                        initialValues.expiredAg &&
                        moment(initialValues.expiredAg).format(DATE_FORMAT)
                      }
                      onDayChange={(day: any) => setFieldValue("expiredAg", day)}
                      inputProps={{
                        className: "pl-3 border border-primary-border w-full rounded w-full h-[32px] outline-none",
                        placeholder: "Thời hạn bảo lãnh tạm ứng",
                      }}
                    />

                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Thời hạn bảo lãnh bảo hành
                    </p>
                    <DayPickerInput
                      format={DATE_FORMAT}
                      value={
                        initialValues.expiredInsurance &&
                        moment(initialValues.expiredInsurance).format(DATE_FORMAT)
                      }
                      onDayChange={(day: any) => setFieldValue("expiredInsurance", day)}
                      inputProps={{
                        className: "pl-3 border border-primary-border w-full rounded w-full h-[32px] outline-none",
                        placeholder: "Thời hạn bảo lãnh bảo hành",
                      }}
                    />

                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Thông báo trước thời hạn(Hợp đồng)
                    </p>
                    <Field
                      type="number"
                      name="alertAg"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Thông báo trước thời hạn..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Thông báo trước thời hạn(Tạm ứng)
                    </p>
                    <Field
                      type="number"
                      name="alertCg"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Thông báo trước thời hạn..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>

                  <div>
                    <p className="text-primary-gray text-xs mb-2">
                      Thông báo trước thời hạn(Bảo hành)
                    </p>
                    <Field
                      type="number"
                      name="alertInsurance"
                      className="pl-3 border border-primary-border rounded w-full h-[32px] outline-none"
                      placeholder="Thông báo trước thời hạn..."
                      onBlur={(e: FormEvent<HTMLInputElement>) => handleBlur(e)}
                    />
                  </div>
                </div>
              )}
              <footer className="absolute -pl-6 bottom-0 h-[60px] w-full border-t border-primary-border flex items-center justify-end">
                <button
                  type="submit"
                  className="text-primary-light bg-primary w-24 h-8 mr-8 rounded"
                  disabled={!formik.isValid}
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