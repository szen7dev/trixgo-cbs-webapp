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
  UseContractIPCList,
} from "services/hooks/cmcs/useContractIPC";

import {
  useDetailContractPaymentMutation,
  useCreateContractPaymentMutation,
  useUpdateContractPaymentMutation
} from "services/hooks/cmcs/useContractPayment";

import { toast } from "react-toastify";
interface NewContractIPCModalProps {
  defaultValues?: any;
  onFinish: (values: any, isEdit: boolean) => Promise<boolean>;
  title?: string;
  idEdit?: string;
  isEdit?: boolean;
  contractID?: string;
  refetchList?:any
}

const mappingData = (data: any, isDataPayLoad = false) => {
  return {
    contractPaymentID: data?._id,
    ipc: data?.ipc,
    ipcID: data?.ipc?._id,
    date: convertDateToString(data?.date),
    name: data?.name || '',
    sign: data?.sign || '',
    description: data?.description || '',
    value: Number(data?.value) || 0,
  }
}

export const ContractPaymentModal: FC<NewContractIPCModalProps> = ({ defaultValues, onFinish, title, idEdit = '', isEdit = false, contractID = '', refetchList }) => {
  const [openGeneralInfo, setOpenGeneralInfo] = useState(false);
  const [openRealizedOutput, setOpenRealizedOutput] = useState(false);
  const [initialValues, setInitialValues] = useState(mappingData({}));
  const { closeModal } = useModal();

  const { detailContractPayment } = useDetailContractPaymentMutation(idEdit);
  const { listContractIPC } = UseContractIPCList('', contractID, 20);
  const  { createContractPaymentMutateAsync } = useCreateContractPaymentMutation();
  const  { updateContractPaymentMutateAsync } = useUpdateContractPaymentMutation();

  useEffect(() => {
    setInitialValues(mappingData(detailContractPayment))
  }, [idEdit, detailContractPayment]);

  const handleSubmit = async (values: any) => {
      const { contractPaymentID,ipcID, ipc, name, sign, description, date, value } = values;
      if(!ipcID || !name || !date)
        return toast.error("Vui lòng nhập những nội dung bắt buộc (*)");
      if(contractPaymentID){
        const infoAfterUpdate = await updateContractPaymentMutateAsync({ contractPaymentID, ipc: ipcID, name, sign, description, date, value: +value });
        if(!infoAfterUpdate.error){
          closeModal();
          refetchList();
          return toast.success("Cập nhật thành công");
        }else{
          return toast.error(infoAfterUpdate.message);
        }
      }else{
        const infoAfterInsert = await createContractPaymentMutateAsync({ contractID, ipc: ipcID, name, sign, description, date, value: +value });
        if(!infoAfterInsert.error){
          closeModal();
          refetchList();
          return toast.success("Thêm thành công");
        }else{
          return toast.error(infoAfterInsert.message);
        }
      }
  }

  const formValidation = object().shape({
    ipc: string().required(MESSAGE_ERROR.required),
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

      <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize >
        {(formik) => {
          const { handleBlur, setFieldValue } = formik;
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
                      <p className="text-primary-gray text-xs mb-2">Thuộc kỳ thanh toán (*)</p>
                      <DropdownSearchable
                        onchangeValue={(value: any) => 
                          setFieldValue("ipcID", value?.value)
                        }
                        onClearData={() => 
                          setFieldValue("ipcID", '')
                        }
                        placeholder="Thuộc kỳ thanh toán..."
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
                          value: initialValues?.ipc?._id,
                          label: initialValues?.ipc?.name || "Chọn kỳ thanh toán"
                        }}
                        data={listContractIPC.map((item: any) => ({
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
                      <p className="text-primary-gray text-xs mb-2">Nội dung (*)</p>
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
                      <p className="text-primary-gray text-xs mb-2">Mã hiệu</p>
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
                   Giá trị giải ngân
                  </span>
                </div>
                {/* {openRealizedOutput && (
                  <div className="flex items-center justify-end">
                    <div className="flex items-center">
                      <p className="text-primary-gray text-xs mr-5">
                        Tỷ giá USD
                      </p>
                      <Field
                        type="text"
                        value="23.010"
                        className="w-[66px] h-8 outline-none text-right border-b border-primary-border text-primary-gray"
                      />
                    </div>
                  </div>
                )} */}
              </div>
              {openRealizedOutput && (
                <div className="mb-8 h-full mx-7 w-2/3">
                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      1 - Giá trị giải ngân
                    </p>
                    <div className="flex gap-x-2">
                      <Field
                        type="number"
                        name="value"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Giá trị giải ngân..."
                        onKeyUp={async (e: FormEvent<HTMLInputElement>) => {
                          await setFieldValue("value", e.currentTarget.value);
                        }}
                      />
                      {/* <Field
                        type="number"
                        name="valueUsd"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Giá trị giải ngân..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      /> */}
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
