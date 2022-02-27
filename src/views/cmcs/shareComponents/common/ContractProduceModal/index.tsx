import { FC, FormEvent, useCallback, useEffect, useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import CollapseHoriIcon from "assets/images/icon-collapse-hori.svg";
import CollapseVertiIcon from "assets/images/icon-collapse-verti.svg";

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

const mappingData = (data: any) => {
  return {
    contractProductionID: data.contractProductionID,
    date: convertDateToString(data.date),
    name: data.name || '',
    sign: data.sign || '',
    description: data.description || '',

    produce: Number(data.produce) || 0,
    vatProduce: Number(data.vatProduce) || 0,
    plusProduce: Number(data.plusProduce) || 0,
    vatPlusProduce: Number(data.vatPlusProduce) || 0
  }
}

export const ContractProduceModal: FC<NewContractProduceModalProps> = ({ defaultValues, onFinish, title, idEdit = '', isEdit = false, contractID = '' }) => {
  const [openGeneralInfo, setOpenGeneralInfo] = useState(false);
  const [openRealizedOutput, setOpenRealizedOutput] = useState(false);

  const { closeModal } = useModal();
  const [initialValues, setInitialValues] = useState(mappingData({}));
  const { detailContract } = useDetailContractProduceMutation(idEdit);

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
          contractProductionID: detailContract._id
        }
      }

      const isSuccess = await onFinish({ ...mappingData(formatData), contractID }, isEdit);
      if (isSuccess) {
        closeModal();
      }
    },
    [onFinish, closeModal]
  );

  const formValidation = object().shape({
    date: string().required(MESSAGE_ERROR.required),
    name: string().required(MESSAGE_ERROR.required),
  });

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

      <Formik initialValues={initialValues} validationSchema={formValidation} enableReinitialize={true} onSubmit={handleSubmit}>
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
                      <ErrorMessage
                        name="date"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
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
                      />
                      <ErrorMessage
                        name="name"
                        component="span"
                        className="font-normal leading-7 text-sm text-negative"
                      />
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
                  <span className="text-xl font-bold">Sản lượng thực hiện</span>
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
                      1 - Sản lượng trước VAT
                    </p>
                    <div className="flex gap-x-2">
                      <Field
                        type="number"
                        name="produce"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Sản lượng trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="number"
                        name="produce"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Sản lượng trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      2 - Sản lượng phần VAT
                    </p>
                    <div className="flex gap-x-2">
                      <Field
                        type="number"
                        name="vatProduce"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Sản lượng trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="number"
                        name="vatProduce"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Sản lượng trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      3 - Sản lượng phát sinh trước VAT
                    </p>
                    <div className="flex gap-x-2">
                      <Field
                        type="number"
                        name="plusProduce"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Sản lượng trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="number"
                        name="plusProduce"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Sản lượng trước VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-primary-gray text-xs mb-2">
                      4 - Sản lượng phát sinh phần VAT
                    </p>
                    <div className="flex gap-x-2">
                      <Field
                        type="number"
                        name="vatPlusProduce"
                        className="pl-3 border border-primary-border rounded w-3/5 h-[32px] outline-none"
                        placeholder="Sản lượng phát sinh phần VAT..."
                        onBlur={(e: FormEvent<HTMLInputElement>) =>
                          handleBlur(e)
                        }
                      />
                      <Field
                        type="number"
                        name="vatPlusProduce"
                        className="pl-3 border border-primary-border rounded w-2/5 h-[32px] outline-none"
                        placeholder="Sản lượng phát sinh phần VAT..."
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
