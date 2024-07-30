import React, { FC, useState } from "react";
import { Formik, Form, Field } from "formik";

import Close from "assets/icons/Close";
import { useModal } from "services/hooks/useModal";
import { useQueryListDepartments } from "services/hooks/items/useDepartment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import type { InsertTimeSheetParentPayload } from "typings/time-sheet";

interface CreateOrEditDialogProps {
  title: string;
  defaultValues?: InsertTimeSheetParentPayload;
  projectName: string;
  assigneeName: string;
  onSubmit?: (values: string) => void;
  expertSalaryID?: string;
}

const CreateOrEditDialog: FC<CreateOrEditDialogProps> = ({
  title,
  defaultValues,
  onSubmit,
  expertSalaryID,
  projectName,
}) => {
  const [searchhDepartmentStr, setSearchDepartmentSrt] = useState(projectName);

  const { closeModal } = useModal();

  // const { listDepartments } = useQueryListDepartments({
  //   keyword: searchhDepartmentStr,
  // }, true);

  const initialValues = {
    name: "",
    assignee: {},
    type: "",
    project: {},
    convertFactor: "",
    note: "",
    date: null,
    ...defaultValues,
  };

  const handleSubmit = React.useCallback(
    (values) => {
      const formatData = {
        ...values,
        type: `${values.type}`,
      };
      if (expertSalaryID) {
        formatData.expertSalaryID = expertSalaryID;
      }
      onSubmit && onSubmit(formatData);
    },
    [expertSalaryID, onSubmit]
  );

  return (
    <div className="w-full h-[540px] overflow-scroll">
      <div className="fixed top-0 w-full">
        <div
          className={"flex items-center mb-3 border-b bg-cbs-table-header p-2"}
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
              <div className="px-5 pt-20 pb-4 flex flex-col space-y-4 overflow-scroll">
                <div>
                  <p className="text-[13px] text-primary-gray mb-1">
                    Nội dung (*)
                  </p>
                  <div className="rounded border px-2 py-1 bg-cbs-table-header">
                    <Field
                      type="text"
                      name="name"
                      placeholder="Nhập nội dung..."
                      className="w-full h-6 outline-none"
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        handleBlur(e);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-primary-gray text-[13px] mb-1">Hệ số chuyển đổi KPI sang giá trị</p>
                  <div className="rounded border px-2 py-1 bg-cbs-table-header">
                    <Field
                      type="text"
                      name="convertFactor"
                      placeholder="Nhập giá trị"
                      className="w-full h-6 outline-none"
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        handleBlur(e);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-primary-gray text-[13px] mb-1">Ngày tháng ghi nhận lương</p>
                  <div className="rounded border px-2 py-1 bg-cbs-table-header">
                    <DatePicker
                      className="w-full h-6 outline-none"
                      selected={values.date ? new Date(values.date) : null}
                      placeholderText="Ngày/tháng/năm"
                      name="date"
                      onChange={(date: Date | null) => {
                        setFieldValue("date", date);
                      }}
                      dateFormat="dd/MM/yyyy"
                    />
                    {/* <Field
                      type="text"
                      name="date"
                      placeholder="Nhập định dạng YYYY-MM-DD"
                      className="w-full h-6 outline-none"
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        handleBlur(e);
                      }}
                    /> */}
                  </div>
                </div>

                {/* <div>
                  <p className="text-[13px] text-primary-gray mb-1">
                    Dự án, phòng ban
                  </p>
                  <DropdownSearchable
                    className={
                      "w-full flex-1 border rounded border-gray-200 py-1 px-3"
                    }
                    focusedClass={"border-b border-primary"}
                    maxWidthInput={"max-w-none"}
                    inlineSearch
                    showTriangle
                    allowClearValueSingleInput
                    renderSelectedItem={(item) => <span>{item.text}</span>}
                    data={listDepartments.map((department) => ({
                      _id: department._id,
                      name: `${department.sign}.${department.name}`,
                    }))}
                    initialValue={defaultValues?.project}
                    formatItem={{
                      id: "_id",
                      text: "name",
                    }}
                    onSearchInputChange={debounce(
                      (value) => setSearchDepartmentSrt(value),
                      1000
                    )}
                    onchangeValue={(value) =>
                      setFieldValue("projectID", value.id)
                    }
                  />
                </div> */}

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