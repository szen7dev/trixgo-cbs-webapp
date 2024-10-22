import React, { UIEvent, FC, useState } from "react";
import { Formik, Form, Field } from "formik";
import Close from "assets/icons/Close";
import { useModal } from "services/hooks/useModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import type { InsertStoreParentPayload } from "typings/store";
interface CreateOrEditDialogProps {
//   outin: any,
//   type: any,
  title: string;
  defaultValues?: any;
//   fundaName: string;
//   projectName: string;
//   assigneeName: string;
//   warehouseName?: string;
//   customerName?: string;
//   contractName?: string;
  onSubmit?: (values: string) => void;
  reportID?: string;
}

const CreateOrEditDialog: FC<CreateOrEditDialogProps> = ({
  title,
  defaultValues,
  onSubmit,
  reportID,
}) => {

  const { closeModal } = useModal();

  const initialValues = {
    name: "",
    // date: null,
    // assignee: {},
    // outin: Number(outin),
    // type: Number(type),
    // funda: {},
    // project: {},
    // warehouse: {},
    // customer: {},
    // note: "",
    // status: "",
    ...defaultValues,
  };

  const handleSubmit = React.useCallback(
    (values) => {
      const formatData = {
        ...values,
      };
      if (reportID) {
        formatData.reportID = reportID;
      }
      onSubmit && onSubmit(formatData);
    },
    [reportID, onSubmit]
  );

  return (
    <div className="w-full overflow-scroll" style={{ height: "420px" }}>
      <div className="fixed top-0 w-full">
        <div
          className={"flex items-center border-b bg-cbs-table-header p-2"}
        >
          <div className={"flex-1 flex items-center"}>
            <p className={"text-lg ml-2"}>{title}</p>
          </div>
          <button
            onClick={() => closeModal()}
            className={
              "w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
            }
          >
            <Close />
          </button>
        </div>
      </div>

      {/* Content */}
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => {
          const { handleBlur, setFieldValue, values } = formik;

          return (
            <Form>
              <div className="px-5 pt-20 pb-4 flex flex-col space-y-2 overflow-scroll">
                <div>
                  <p className="text-[13px] text-primary-gray mb-1">
                    Nội dung (*)
                  </p>
                  <div className="rounded border px-2 py-1 bg-cbs-table-header">
                    <Field
                      type="text"
                      name="name"
                      placeholder="Nhập nội dung"
                      className="w-full h-6 outline-none"
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        handleBlur(e);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-primary-gray text-[13px] mb-1">Từ ngày</p>
                  <div className="rounded border px-2 py-1 bg-cbs-table-header">
                    <Field
                      type="text"
                      name="fromDate"
                      placeholder="YYYY-MM-DD"
                      className="w-full h-6 outline-none"
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        handleBlur(e);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-primary-gray text-[13px] mb-1">Đến ngày</p>
                  <div className="rounded border px-2 py-1 bg-cbs-table-header">
                    <Field
                      type="text"
                      name="toDate"
                      placeholder="YYYY-MM-DD"
                      className="w-full h-6 outline-none"
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        handleBlur(e);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-primary-gray text-[13px] mb-1">Ghi chú</p>
                  <div className="rounded border px-2 py-1 bg-cbs-table-header">
                    <Field
                      type="text"
                      name="note"
                      placeholder="Ghi chú..."
                      className="w-full h-6 outline-none"
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        handleBlur(e);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className={"fixed bottom-0 w-full bg-white"}>
                <div className="h-px w-full bg-gray-100 my-3" />
                <div className="flex px-3 w-full justify-end pb-2">
                  <button
                    type="submit"
                    className={
                      "bg-primary rounded h-[32px] w-[95px] text-white font-semibold"
                    }
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
  );
};

export default CreateOrEditDialog;