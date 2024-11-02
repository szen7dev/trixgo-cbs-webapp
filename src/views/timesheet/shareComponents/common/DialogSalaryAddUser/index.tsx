import React, { FC, useState, UIEvent } from "react";
import { Formik, Form } from "formik";
import debounce from "lodash/debounce";
import Close from "assets/icons/Close";
import { useModal } from "services/hooks/useModal";
import "react-datepicker/dist/react-datepicker.css";
import { useUserSystem } from "services/hooks/users/useUserSystem";
import { DropdownSearchable } from "shareComponents/common";
import type { InsertTimeSheetParentPayload } from "typings/time-sheet";
import { useAuth } from 'services/hooks/auth/useAuth';
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
}) => {
  const [searchAssigneeStr, setSearchAssigneeStr] = useState();
  const { user } = useAuth();
  const { closeModal } = useModal();

  const handleScrollAssginee = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom && hasNextPageUsersSystem) {
      fetchNextPageUsersSystem();
    }
  }

  const {
    data: listUsersSystem,
    hasNextPage: hasNextPageUsersSystem,
    fetchNextPage: fetchNextPageUsersSystem
  } = useUserSystem({
    companyID: user?.company?._id,
    keyword: searchAssigneeStr
  }, true);

  const initialValues = {
    ...defaultValues,
  };

  const handleSubmit = React.useCallback(
    (values) => {
      const formatData = {
        ...values,
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
                <div className="px-5 pt-20 pb-4 flex flex-col space-y-4">
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
                        data={listUsersSystem}
                        onScroll={handleScrollAssginee}
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
                    <div className={"fixed bottom-0 bg-white"}>
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
                </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default CreateOrEditDialog;