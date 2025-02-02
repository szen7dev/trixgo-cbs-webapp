import React, { UIEvent, FC, useState } from "react";
import { Formik, Form, Field } from "formik";
import debounce from "lodash/debounce";
import Close from "assets/icons/Close";
import { DropdownSearchable } from "shareComponents/common";
import { useModal } from "services/hooks/useModal";
import { useQueryListDepartments } from "services/hooks/items/useDepartment";
import { useUserSystem } from "services/hooks/users/useUserSystem";
import { TIMESHEET_TYPES } from "apis/localdb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LIMIT_DROPDOWN } from "apis/localdb/index";
import {
	useQueryListWarehouse,
	useQueryListContact,
	// useQueryListContract,
	// useQueryListBudgetWork,
	// useQueryListAccount,
	// useQueryListGood
} from "services/hooks/cmcs/useContractIncome";
import {
  useQueryListStoreParent,
} from "services/hooks/useStore";
import { useDocumentPackage } from "services/hooks/document/useDocumentPackage";
import type { InsertStoreParentPayload } from "typings/store";
interface CreateOrEditDialogProps {
  outin: any,
  type: any,
  title: string;
  defaultValues?: InsertStoreParentPayload;
  fundaName: string;
  projectName: string;
  assigneeName: string;
  warehouseName?: string;
  contractName?: string;
  customerName?: string;
  onSubmit?: (values: string) => void;
  orderID?: string;
}

const CreateOrEditDialog: FC<CreateOrEditDialogProps> = ({
  outin,
  type,
  title,
  defaultValues,
  onSubmit,
  orderID,
  projectName,
  warehouseName,
  customerName,
}) => {
  const [departmentKeyword, setDepartmentKeyword] = useState(projectName);
  const [warehouseKeyword, setWarehouseKeyword] = useState(warehouseName);
  const [contactKeyword, setContactKeyword] = useState(customerName);
  const [packageKeyword, setPackageKeyword] = useState("");
  const [keyword, setKeyword] = useState("");

  const { closeModal } = useModal();

  const { listDepartments } = useQueryListDepartments({
    keyword: departmentKeyword,
  }, true);

  const { listWarehouse } = useQueryListWarehouse({
		limit: LIMIT_DROPDOWN,
		keyword: warehouseKeyword,
	});

  const { listContact } = useQueryListContact({
		limit: LIMIT_DROPDOWN,
		keyword: contactKeyword,
	})

  const {
		data: listDocumentPackage,
	} = useDocumentPackage({
		isShowAll: "1",
		keyword: packageKeyword
	}, true, false)

  const {
    data,
  } = useQueryListStoreParent({
    keyword, 
    outin: 2, 
    type, 
  })

  const initialValues = {
    name: "",
    date: null,
    assignee: {},
    outin: Number(outin),
    type: Number(type),
    funda: {},
    project: {},
    package: {},
    toPackage: {},
    warehouse: {},
    customer: {},
    link: {},
    note: "",
    status: "",
    forward: "",
    ...defaultValues,
  };

  const handleSubmit = React.useCallback(
    (values) => {
      const formatData = {
        ...values,
        active: `${values.active}`,
      };
      if (orderID) {
        formatData.orderID = orderID;
      }
      onSubmit && onSubmit(formatData);
    },
    [orderID, onSubmit]
  );

  return (
    <div className="w-full overflow-scroll" style={{ height: "1000px" }}>
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
                    Link tới phiếu/lô (áp dụng cho xuất đích danh)
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
                    data={data.map((item: any) => ({
                      _id: item._id,
                      name: `${item.sign}.${item.name}`,
                    }))}
                    initialValue={defaultValues?.link}
                    formatItem={{
                      id: "_id",
                      text: "name",
                    }}
                    onSearchInputChange={debounce(
                      (value) => setKeyword(value),
                      1000
                    )}
                    onchangeValue={(value) =>
                      setFieldValue("linkID", value.id)
                    }
                  />
                </div>
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
                  <p className="text-primary-gray text-[13px] mb-1">Ngày</p>
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
                  </div>
                </div>
                <div>
                  <p className="text-primary-gray text-[13px] mb-1">Số hiệu</p>
                  <div className="rounded border px-2 py-1 bg-cbs-table-header">
                    <Field
                      type="text"
                      name="sign"
                      placeholder="Số hiệu..."
                      className="w-full h-6 outline-none"
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        handleBlur(e);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[13px] text-primary-gray mb-1">
                    Dự án, phòng ban (*)
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
                    data={listDepartments.map((item: any) => ({
                      _id: item._id,
                      name: `${item.sign}.${item.name}`,
                    }))}
                    initialValue={defaultValues?.project}
                    formatItem={{
                      id: "_id",
                      text: "name",
                    }}
                    onSearchInputChange={debounce(
                      (value) => setDepartmentKeyword(value),
                      1000
                    )}
                    onchangeValue={(value) =>
                      setFieldValue("projectID", value.id)
                    }
                  />
                </div>
                <div>
                  <p className="text-[13px] text-primary-gray mb-1">
                    Kho bãi (*)
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
                    data={listWarehouse.map((item: any) => ({
                      _id: item._id,
                      name: `${item.sign}.${item.name}`,
                    }))}
                    // onScroll={handleScrollAssginee}
                    initialValue={defaultValues?.warehouse}
                    formatItem={{
                      id: "_id",
                      text: "name",
                    }}
                    onSearchInputChange={debounce(
                      (value) => setWarehouseKeyword(value),
                      500
                    )}
                    onchangeValue={(value) =>
                      setFieldValue("warehouseID", value.id)
                    }
                  />
                </div>
                <div>
                  <p className="text-[13px] text-primary-gray mb-1">
                    Mã khách (*)
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
                    data={listContact.map((item: any) => ({
                      _id: item._id,
                      name: `${item.sign}.${item.name}`,
                    }))}
                    initialValue={defaultValues?.customer}
                    formatItem={{
                      id: "_id",
                      text: "name",
                    }}
                    onSearchInputChange={debounce(
                      (value) => setContactKeyword(value),
                      1000
                    )}
                    onchangeValue={(value) =>
                      setFieldValue("customerID", value.id)
                    }
                  />
                </div>
                <div>
                  <p className="text-[13px] text-primary-gray mb-1">
                    Gói thầu giao (chỉ áp dụng cho giao dự án)
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
                    data={listDocumentPackage.map((item: any) => ({
                      _id: item._id,
                      name: `${item.sign}.${item.name}`,
                    }))}
                    initialValue={defaultValues?.package}
                    formatItem={{
                      id: "_id",
                      text: "name",
                    }}
                    onSearchInputChange={debounce(
                      (value) => setPackageKeyword(value),
                      1000
                    )}
                    onchangeValue={(value) =>
                      setFieldValue("packageID", value.id)
                    }
                  />
                </div>
                <div>
                  <p className="text-[13px] text-primary-gray mb-1">
                    Gói thầu nhận (chỉ áp dụng cho giao dự án)
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
                    data={listDocumentPackage.map((item: any) => ({
                      _id: item._id,
                      name: `${item.sign}.${item.name}`,
                    }))}
                    initialValue={defaultValues?.toPackage}
                    formatItem={{
                      id: "_id",
                      text: "name",
                    }}
                    onSearchInputChange={debounce(
                      (value) => setPackageKeyword(value),
                      1000
                    )}
                    onchangeValue={(value) =>
                      setFieldValue("toPackageID", value.id)
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
                <div>
                  <p className="text-primary-gray text-[13px] mb-1">Trạng thái (5-Hoạt động | 6-Hủy)</p>
                  <div className="rounded border px-2 py-1 bg-cbs-table-header">
                    <Field
                      type="text"
                      name="status"
                      placeholder="5-Hoạt động | 6-Hủy"
                      className="w-full h-6 outline-none"
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        handleBlur(e);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-primary-gray text-[13px] mb-1">Phân loại  (0-Thông thường | 1-Phiếu đầu kỳ)</p>
                  <div className="rounded border px-2 py-1 bg-cbs-table-header">
                    <Field
                      type="text"
                      name="forward"
                      placeholder="0-Thông thường | 1-Phiếu đầu kỳ"
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