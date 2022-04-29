import { FC, FormEvent, useCallback, useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import CollapseHoriIcon from "assets/images/icon-collapse-hori.svg";
import CollapseVertiIcon from "assets/images/icon-collapse-verti.svg";
import { DropdownSearchable, Popover } from "shareComponents/common";
import { useContractSpending } from "services/hooks/cmcs/useContractSpending";

import moment from "moment";
import { DATE_FORMAT } from "apis/localdb/index";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {
  convertDateToString,
  MESSAGE_ERROR
} from "utils/cmcs"
import { string, object } from 'yup';

import {
  useDetailContractProduceMutation,
} from "services/hooks/cmcs/useContractProduce";

interface NewContractProduceModalProps {
  defaultValues?: any;
  onFinish: (values: any, isEdit: boolean) => Promise<boolean>;
  title?: string;
  idEdit?: string;
  isEdit?: boolean;
  contractID?: string
}

const CONTRACT_EXPENSE_SUB_TYPES = [
  { _id: 1, name: 'Chi phí trực tiếp' },
  { _id: 2, name: 'Chi phí quản lý' },
]

const mappingData = (data: any) => {
  return {
    name: data.name || '',
    date: data.date || '',
    subtype: data.subtype || '',
    subtypeValue: CONTRACT_EXPENSE_SUB_TYPES[+data.subtype-1]?.name || "Chọn phân loại",
    value: Number(data.value) || 0,
    note: data.note || '',
    expenseID: data.expenseID || '',
  }
}

export const ContractExpenseModal: FC<NewContractProduceModalProps> = ({ defaultValues, onFinish, title, idEdit = '', isEdit = false, contractID = '' }) => {
  const [openGeneralInfo, setOpenGeneralInfo] = useState(false);
  const [openRealizedOutput, setOpenRealizedOutput] = useState(false);
  const { closeModal } = useModal();
  const [initialValues, setInitialValues] = useState(mappingData({}));
  const { info } = useContractSpending({ params: { expenseID: idEdit }, isFetchList: false, isFetchInfo: true })

  useEffect(() => {
    if(!idEdit || !info)
      return;
    setInitialValues(mappingData(info))
  }, [idEdit, info]);

  const handleSubmit = useCallback(
    async (values: any) => {
      let formatData = {
        ...values,
      }
      if (isEdit) {
        formatData = {
          ...values,
          expenseID: idEdit
        }
      }
      const isSuccess = await onFinish({ ...mappingData(formatData), contractID }, isEdit);
      if (isSuccess) {
        closeModal();
      }
    },
    [onFinish, closeModal]
  );

  // const formValidation = object().shape({
  //   date: string().required(MESSAGE_ERROR.required),
  //   name: string().required(MESSAGE_ERROR.required),
  // });
 
  return (
    <main className="relative w-[900px] h-[800px] bg-primary-light ipc-form-modal">
      <header className="flex items-center justify-between px-3 h-[50px] bg-cbs-table-header">
        <p className="text-xl font-bold">{title}</p>
        <img
          src={CloseIcon}
          alt="Close"
          className="cursor-pointer"
          onClick={() => closeModal()}
        />
      </header>

      {/* <Formik initialValues={initialValues} validationSchema={formValidation} enableReinitialize={true} onSubmit={handleSubmit}> */}
      <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
        {(formik) => {
          const { handleBlur, setFieldValue } = formik;

          return (
            <Form className="max-h-[690px] py-5 text-left overflow-y-auto">
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
                      <p className="text-primary-gray text-xs mb-2">
                       Phân loại (*)
                      </p>
                      <DropdownSearchable
                        onchangeValue={(value: any) => 
                          setFieldValue("subtype", value?.value)
                        }
                        onClearData={() => 
                          setFieldValue("subtype", '')
                        }
                        placeholder="Phân loại..."
                        className="w-2/5 pl-0 -mb-1 outline-none"
                        classNameInput="border border-primary-border rounded h-[32px]"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={true}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item: any) => <Popover onMouseEnterTooltip={false} tooltip={`${item.text}`} classTooltip="left-0 whitespace-normal z-99" >
                          <p className="text-1-line-clamp">{`${item.text}`}</p>
                        </Popover>}
                        initialValue={{
                          value: initialValues?.subtype,
                          label: initialValues?.subtypeValue
                        }}
                        data={CONTRACT_EXPENSE_SUB_TYPES.map((item: any) => ({
                          value: item._id,
                          label: item.name
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
                          placeholder: "Ngày tháng",
                        }}
                      />
                      <ErrorMessage
                        name="name"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
                    </div>

                    <div className="mb-4">
                      <p className="text-primary-gray text-xs mb-2">Nội dung</p>
                      <Field
                        type="text"
                        name="name"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Nội dung..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <p className="text-primary-gray text-xs mb-2">Ghi chú</p>
                      <Field
                        type="text"
                        name="note"
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
                  <span className="text-xl font-bold">Chi phí</span>
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
                <div className="pb-9 mb-7 h-full mx-7 w-2/3">
                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      Giá trị đã chi
                    </p>
                    <div className="flex gap-x-2">
                      <Field
                        type="number"
                        name="value"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Giá trị đã chi..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="number"
                        name="value"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Giá trị đã chi..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
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
