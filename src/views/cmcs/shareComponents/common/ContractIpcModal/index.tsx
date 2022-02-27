import { FC, FormEvent, useCallback, useEffect, useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import CollapseHoriIcon from "assets/images/icon-collapse-hori.svg";
import CollapseVertiIcon from "assets/images/icon-collapse-verti.svg";
import { DropdownSearchable, Popover } from "shareComponents/common";

import moment from "moment";
import { DATE_FORMAT } from "apis/localdb/index";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {
  CONTRACT_IPC_TYPES
} from "apis/localdb/index";

import {
  convertDateToString,
  convertInitialValueDropdownForLocalDB,
  MESSAGE_ERROR
} from "utils/cmcs"
import { string, object } from 'yup';

import {
  useDetailContractIPCMutation,
} from "services/hooks/cmcs/useContractIPC";

interface NewContractIPCModalProps {
  defaultValues?: any;
  onFinish: (values: any, isEdit: boolean) => Promise<boolean>;
  title?: string;
  idEdit?: string;
  isEdit?: boolean;
  contractID?: string
}

const mappingData = (data: any, isDataPayLoad = false) => {
  return {
    contractIpcID: data.contractIpcID,
    type: isDataPayLoad ? data.type.value : convertInitialValueDropdownForLocalDB(CONTRACT_IPC_TYPES, data.type),
    date: convertDateToString(data.date),
    name: data.name || '',
    sign: data.sign || '',
    description: data.description || '',

    acceptance: Number(data.acceptance) || 0,
    vatAcceptance: Number(data.vatAcceptance) || 0,
    plusAcceptance: Number(data.plusAcceptance) || 0,
    vatPlusAcceptance: Number(data.vatPlusAcceptance) || 0,
    retainedValue: Number(data.retainedValue) || 0,
    advancePaymentDeduction: Number(data.advancePaymentDeduction) || 0,
    otherDeduction: Number(data.otherDeduction) || 0,
    recommendedPayment: Number(data.recommendedPayment) || 0,

    timeForPayment: convertDateToString(data.timeForPayment) || '',
    amountPaid: Number(data.amountPaid) || 0,
    remainingPayment: Number(data.remainingPayment) || 0,
  }
}

export const ContractIpcModal: FC<NewContractIPCModalProps> = ({ defaultValues, onFinish, title, idEdit = '', isEdit = false, contractID = '' }) => {
  const [openGeneralInfo, setOpenGeneralInfo] = useState(false);
  const [openRealizedOutput, setOpenRealizedOutput] = useState(false);
  const [openPaymentSatus, setOpenPaymentStatus] = useState(false);
  const [initialValues, setInitialValues] = useState(mappingData({}));

  const { closeModal } = useModal();

  const { detailContract } = useDetailContractIPCMutation(idEdit);

  useEffect(() => {
    setInitialValues(mappingData(detailContract))
  }, [idEdit, detailContract]);

  const handleSubmit = useCallback(
    async (values: any) => {
      let formatData = {
        ...values,
      }

      if (isEdit) {
        formatData = {
          ...values,
          contractIpcID: detailContract._id
        }
      }

      const isSuccess = await onFinish({ ...mappingData(formatData, true), contractID }, isEdit);
      if (isSuccess) {
        closeModal();
      }
    },
    [onFinish, closeModal]
  );

  const formValidation = object().shape({
    type: object().required(MESSAGE_ERROR.required),
    date: string().required(MESSAGE_ERROR.required),
    name: string().required(MESSAGE_ERROR.required),
  });

  return (
    <main className="relative text-left w-[900px] h-[800px] bg-primary-light ipc-form-modal">
      <header className="flex items-center justify-between px-3 h-[50px] bg-cbs-table-header">
        <p className="text-xl font-bold">{title}</p>
        <img
          src={CloseIcon}
          alt="Close"
          className="cursor-pointer"
          onClick={() => closeModal()}
        />
      </header>

      <Formik initialValues={initialValues} validationSchema={formValidation} enableReinitialize={true} onSubmit={handleSubmit}>
        {(formik) => {
          const { handleBlur, setFieldValue } = formik;

          const computeRemainingPayment = () => {
            const { recommendedPayment, amountPaid } = formik.values
            setFieldValue('remainingPayment', +recommendedPayment - +amountPaid)
          }
          const computeRecommendedPayment = () => {
            const { acceptance, vatAcceptance, plusAcceptance, vatPlusAcceptance, retainedValue,
              advancePaymentDeduction, otherDeduction } = formik.values
            const value = (+acceptance + +vatAcceptance + +plusAcceptance + +vatPlusAcceptance) - (+retainedValue + +advancePaymentDeduction + +otherDeduction)
            setFieldValue('recommendedPayment', value)
            computeRemainingPayment()
          }
          return (
            <Form className="max-h-[690px] py-5 overflow-y-auto">
              <div>
                <div
                  className="flex items-center px-7 mb-4 cursor-pointer select-none"
                  onClick={() => setOpenGeneralInfo(!openGeneralInfo)}
                >
                  <div className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3">
                    <img
                      src={
                        openGeneralInfo ? CollapseVertiIcon : CollapseHoriIcon
                      }
                      alt="Collapse"
                    />
                  </div>
                  <span className="text-xl font-bold">Thông tin chung</span>
                </div>
                {openGeneralInfo && (
                  <div className="pb-4 h-full mx-7">
                    <div className="mb-4">
                      <p className="text-primary text-xs mb-2">Phân loại (*)</p>
                      <DropdownSearchable
                        onchangeValue={(value: any) => setFieldValue("type", value)}
                        onClearData={() => setFieldValue("type", '')}
                        placeholder="Bên bán..."
                        className="w-2/5 pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={false}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item: any) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 whitespace-normal z-99" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
                        initialValue={initialValues?.type}
                        data={CONTRACT_IPC_TYPES.map(item => ({
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

                    <div className="mb-4">
                      <p className="text-primary-gray text-xs mb-2">
                        Ngày tháng (*)
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
                          placeholder: "Thời hạn bảo lãnh tạm ứng",
                        }}
                      />
                      <div>
                        <ErrorMessage
                          name="date"
                          component="span"
                          className="font-normal leading-7 text-sm text-negative"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-primary-gray text-xs mb-2">
                        Nội dung (*)
                      </p>
                      <Field
                        type="text"
                        name="name"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Nội dung..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /><div>
                        <ErrorMessage
                          name="name"
                          component="span"
                          className="font-normal leading-7 text-sm text-negative"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-primary text-xs mb-2">Mã hiệu</p>
                      <Field
                        type="text"
                        name="sign"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Mã hiệu..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <p className="text-primary-gray text-xs mb-2">Mô tả</p>
                      <Field
                        type="text"
                        name="description"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Mô tả..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mx-7 mb-4 w-2/3 flex justify-between gap-x-2">
                <div
                  className="flex items-center cursor-pointer select-none"
                  onClick={() => setOpenRealizedOutput(!openRealizedOutput)}
                >
                  <div className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3">
                    <img
                      src={
                        openRealizedOutput
                          ? CollapseVertiIcon
                          : CollapseHoriIcon
                      }
                      alt="Collapse"
                    />
                  </div>
                  <span className="text-xl font-bold">
                    Nghiệm thu hoàn thành (VND & USD)
                  </span>
                </div>
                {openRealizedOutput && (
                  <div className="flex items-center justify-end">
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
                )}
              </div>
              {openRealizedOutput && (
                <div className="mb-8 h-full mx-7 w-2/3">
                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      1 - Giá trị nghiệm thu trước VAT
                    </p>
                    <div className="flex gap-x-2">
                      <Field
                        type="number"
                        name="acceptance"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu trước VAT..."
                        onKeyUp={async (e: FormEvent<HTMLInputElement>) => {
                          await setFieldValue("acceptance", e.currentTarget.value);
                          computeRecommendedPayment()
                        }}
                      />
                      <Field
                        type="number"
                        name="acceptanceUsd"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }

                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      2 - Giá trị nghiệm thu phần VAT
                    </p>
                    <div className="flex gap-x-2">
                      <Field
                        type="number"
                        name="vatAcceptance"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phần VAT..."
                        onKeyUp={async (e: FormEvent<HTMLInputElement>) => {
                          await setFieldValue("vatAcceptance", e.currentTarget.value);
                          computeRecommendedPayment()
                        }}
                      />
                      <Field
                        type="number"
                        name="vatAcceptance"
                        className="pl-3 cursor-not-allowed border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phần VAT..."
                        disabled
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      3 - Giá trị nghiệm thu phát sinh trước VAT
                    </p>
                    <div className="flex gap-x-2">
                      <Field
                        type="number"
                        name="plusAcceptance"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                        onKeyUp={async (e: FormEvent<HTMLInputElement>) => {
                          await setFieldValue("plusAcceptance", e.currentTarget.value);
                          computeRecommendedPayment()
                        }}
                      />
                      <Field
                        type="number"
                        name="plusAcceptance"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phát sinh trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      4 - Giá trị nghiệm thu phát sinh phần VAT
                    </p>
                    <div className="flex gap-x-2">
                      <Field
                        type="number"
                        name="vatPlusAcceptance"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phát sinh phần VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                        onKeyUp={async (e: FormEvent<HTMLInputElement>) => {
                          await setFieldValue("vatPlusAcceptance", e.currentTarget.value);
                          computeRecommendedPayment()
                        }}
                      />
                      <Field
                        type="number"
                        name="vatPlusAcceptance"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Giá trị nghiệm thu phát sinh phần VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      5 - Giá trị giữ lại
                    </p>
                    <div className="flex gap-x-2">
                      <Field
                        type="number"
                        name="retainedValue"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Giá trị giữ lại..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                        onKeyUp={async (e: FormEvent<HTMLInputElement>) => {
                          await setFieldValue("retainedValue", e.currentTarget.value);
                          computeRecommendedPayment()
                        }}
                      />
                      <Field
                        type="number"
                        name="retainedValue"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Giá trị giữ lại..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      6 - Thu hồi tạm ứng
                    </p>
                    <div className="flex gap-x-2">
                      <Field
                        type="number"
                        name="advancePaymentDeduction"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Thu hồi tạm ứng..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                        onKeyUp={async (e: FormEvent<HTMLInputElement>) => {
                          await setFieldValue("advancePaymentDeduction", e.currentTarget.value);
                          computeRecommendedPayment()
                        }}
                      />
                      <Field
                        type="number"
                        name="advancePaymentDeduction"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Thu hồi tạm ứng..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      7 - Khấu trừ khác
                    </p>
                    <div className="flex gap-x-2">
                      <Field
                        type="number"
                        name="otherDeduction"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Khấu trừ khác..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                        onKeyUp={async (e: FormEvent<HTMLInputElement>) => {
                          await setFieldValue("otherDeduction", e.currentTarget.value);
                          computeRecommendedPayment()
                        }}
                      />
                      <Field
                        type="number"
                        name="otherDeduction"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Khấu trừ khác..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      8 - Đề nghị tạm ứng/thanh toán ((1+2+3+4)-(5+6+7))
                    </p>
                    <div className="flex gap-x-2">
                      <Field
                        type="number"
                        name="recommendedPayment"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Đề nghị tạm ứng/thanh toán..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="number"
                        name="recommendedPayment"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Đề nghị tạm ứng/thanh toán..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <div
                  className="flex items-center px-7 mb-4 cursor-pointer select-none"
                  onClick={() => setOpenPaymentStatus(!openPaymentSatus)}
                >
                  <div className="h-5 w-5 bg-lighter-gray flex items-center justify-center rounded-full mr-3">
                    <img
                      src={
                        openPaymentSatus ? CollapseVertiIcon : CollapseHoriIcon
                      }
                      alt="Collapse"
                    />
                  </div>
                  <span className="text-xl font-bold">
                    Tình trạng thanh toán
                  </span>
                </div>
                {openPaymentSatus && (
                  <div className="pb-4 h-full mx-7">
                    <div className="mb-4">
                      <p className="text-primary-gray text-xs mb-2">
                        Thời hạn thanh toán theo hợp đồng
                      </p>
                      <DayPickerInput
                        format={DATE_FORMAT}
                        value={
                          initialValues.timeForPayment &&
                          moment(initialValues.timeForPayment).format(DATE_FORMAT)
                        }
                        onDayChange={(day: any) => setFieldValue("timeForPayment", day)}
                        inputProps={{
                          className: "pl-3 border border-primary-border w-full rounded w-full h-[32px] outline-none",
                          placeholder: "Thời hạn bảo lãnh tạm ứng",
                        }}
                      />
                    </div>

                    <div className="mb-4">
                      <p className="text-primary-gray text-xs mb-2">
                        9 - Đã giải ngân
                      </p>
                      <Field
                        type="number"
                        name="amountPaid"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Đã giải ngân..."
                        onKeyUp={async (e: FormEvent<HTMLInputElement>) => {
                          await setFieldValue("amountPaid", e.currentTarget.value);
                          computeRemainingPayment();
                        }}
                      />
                    </div>

                    <div className="mb-4">
                      <p className="text-primary-gray text-xs mb-2">
                        10 - Còn lại chưa giải ngân (8-9)
                      </p>
                      <Field
                        type="number"
                        name="remainingPayment"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Còn lại chưa giải ngân..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
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
