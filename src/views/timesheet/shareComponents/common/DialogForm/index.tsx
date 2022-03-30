import React, { FC } from "react";
import { Formik, Form, Field } from "formik";
import debounce from "lodash/debounce";

import Close from "assets/icons/Close";
import {DropdownSearchable} from "shareComponents/common";

import { useModal } from "services/hooks/useModal";
import { useQueryListFriend } from "services/hooks/users/useFriend";
import { useQueryListDepartments } from "services/hooks/items/useDepartment";

import type { InsertTimeSheetParentPayload } from "typings/time-sheet";

const types = [
  {
    value: 1,
    label: "Chuyên gia",
  },
];

interface CreateOrEditDialogProps {
  title: string;
  defaultValues?: InsertTimeSheetParentPayload;
  projectName: string;
  assigneeName: string;
  onSubmit?: (values: string) => void;
  expertTimesheetID?: string;
}

const CreateOrEditDialog: FC<CreateOrEditDialogProps> = ({
  title,
  defaultValues,
  onSubmit,
  expertTimesheetID,
  assigneeName,
  projectName,
}) => {
  const [searchhDepartmentStr, setSearchDepartmentSrt] =
    React.useState(projectName);
  const [searchAssigneeStr, setSearchAssigneeStr] =
    React.useState(assigneeName);

  const { closeModal } = useModal();
  const { data: listFriend } = useQueryListFriend({
    keyword: searchAssigneeStr,
  });
  const { listDepartments } = useQueryListDepartments({
    keyword: searchhDepartmentStr,
  }, true);

  const initialValues = {
    name: "",
    assignee: {},
    type: "",
    project: {},
    note: "",
    ...defaultValues,
  };

  const handleSubmit = React.useCallback(
    (values) => {
      const formatData = {
        ...values,
        type: `${values.type}`,
      };
      if (expertTimesheetID) {
        formatData.expertTimesheetID = expertTimesheetID;
      }
      onSubmit && onSubmit(formatData);
    },
    [expertTimesheetID, onSubmit]
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
          const { handleBlur, setFieldValue } = formik;

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
                  <p className="text-[13px] text-primary-gray mb-1">
                    Người thực hiện
                  </p>
                  <DropdownSearchable
                    className={
                      "w-full flex-1 border rounded border-gray-200 py-1 px-3"
                    }
                    focusedClass={"border-b border-primary"}
                    maxWidthInput={"max-w-none"}
                    showTriangle
                    inlineSearch
                    allowClearValueSingleInput
                    renderSelectedItem={(item) => <span>{item.text}</span>}
                    data={listFriend}
                    initialValue={defaultValues?.assignee}
                    formatItem={{
                      id: "_id",
                      text: "fullname",
                    }}
                    onSearchInputChange={debounce(
                      (value) => setSearchAssigneeStr(value),
                      500
                    )}
                    onchangeValue={(value) =>
                      setFieldValue("assigneeID", value.id)
                    }
                  />
                </div>

                <div>
                  <p className="text-[13px] text-primary-gray mb-1">
                    Phân loại
                  </p>
                  <DropdownSearchable
                    showTriangle
                    inlineSearch
                    className={
                      "w-full flex-1 border rounded border-gray-200 py-1 px-3"
                    }
                    focusedClass={"border-b border-primary"}
                    maxWidthInput={"max-w-none"}
                    renderSelectedItem={(item) => <span>{item.text}</span>}
                    data={types}
                    initialValue={types.filter(
                      (elm) => elm.value === defaultValues?.type
                    )}
                    formatItem={{
                      id: "value",
                      text: "label",
                    }}
                    onchangeValue={(value) =>
                      setFieldValue("type", value.value)
                    }
                  />
                </div>

                <div>
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

export { default as SearchFormDialog} from './SearchForm';
export { default as AddNewTaskDialog} from './AddNewTaskDialog';
export default CreateOrEditDialog;
