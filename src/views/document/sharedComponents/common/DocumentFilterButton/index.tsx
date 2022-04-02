import React, { FC, HTMLAttributes, useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import cn from "classnames";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import debounce from "lodash/debounce";

import { InputClearable } from "../InputClearable";
import { DropdownSearchable } from "shareComponents/common";

import SortingIcon from "assets/images/icons8-sorting-100.svg";
import TagIcon from "assets/images/icons8-price-tag-96.svg";

import { useQueryDetailDepartment } from "services/hooks/items/useDepartment";
import {
  useQueryContact,
  useQueryDetailContact,
} from "services/hooks/items/useContact";
import {
  useQueryItemContract,
  useQueryDetailContract,
} from "services/hooks/items/useContract";
import {
  useQueryListDoctype,
  useQueryDetailDoctype,
} from "services/hooks/items/useDoctype";
import { useStorage } from "services/hooks/items/useStorage";

interface FormFilterProps {
  onSubmit?: (values: any) => void;
  onCancel?: () => void;
  onShowFilter: (isShow: boolean) => void;
  companyID: string;
  initialValues: {
    [k: string]: any;
  };
}

const FormFilter: FC<FormFilterProps> = ({
  companyID,
  onSubmit,
  onShowFilter,
  onCancel,
  initialValues,
  ...props
}) => {
  const [searchValues, setSearchValues] = useState<{ [k: string]: string }>({});

  const { listContact } = useQueryContact(
    Object.assign(
      {
        companyID,
      },
      searchValues["senderID"] && { keyword: searchValues["senderID"] }
    )
  );
  const { listContracts } = useQueryItemContract({companyID,
    keyword: searchValues["contractID"] || "",
  });
  const { listDoctypes: properties } = useQueryListDoctype({
    type: 2,
    companyID,
    keyword: searchValues["property"] || "",
  }); // tính chất
  const { list: listStorages } = useStorage({
    params: {
      companyID,
      keyword: searchValues["storage"] || "",
    },
    isFetchList: true
  });

  const listFieldDropdown = React.useMemo(() => {
    return [
      { title: "Chủ thể ban hành", data: listContact, name: "senderID" },
      { title: "Hợp đồng", data: listContracts, name: "contractID" },
      { title: "Tính chất văn bản", data: properties, name: "propertyID" },
      {
        title: "Yêu cầu phản hồi",
        data: [
          { _id: 0, name: "Không" },
          { _id: 1, name: "Có" },
        ],
        name: "requestResponse",
      },
      { title: "Địa chỉ lưu trữ", data: listStorages, name: "storageID" },
    ];
  }, [listContact, listContracts, listStorages, properties]);

  const handleSubmit = React.useCallback(
    (values) => {
      const formatData = {
        ...values,
      };
      if (typeof values.senderID === "object") {
        formatData.senderID = values.senderID._id;
      }
      if (typeof values.contractID === "object") {
        formatData.contractID = values.contractID._id;
      }
      if (typeof values.propertyID === "object") {
        formatData.senderID = values.senderID._id;
      }
      if (typeof values.storageID === "object") {
        formatData.contractID = values.contractID._id;
      }
      onSubmit && onSubmit(formatData);
    },
    [onSubmit]
  );

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} {...props}>
      {(formik) => {
        const { setFieldValue } = formik;
        return (
          <Form>
            <div
              className={
                "absolute transition duration-150 top-full left-3 bg-white py-2 pb-6 px-4 shadow-md z-20 rounded-md max-w-[900px] min-w-[600px]"
              }
            >
              <InputClearable
                placeholder={"Nội dung tìm kiếm tại đây"}
                className={"w-full shadow-lg rounded-md h-[45px]"}
                onChange={(value) => setFieldValue("keyword", value)}
                initialValue={initialValues?.keyword}
              />
              {listFieldDropdown.map((field) => {
                return (
                  <div key={field.name} className={"flex items-center mt-4"}>
                    <p className={"text-gray-500 mr-4"}>{field.title}</p>
                    <DropdownSearchable
                      placeholder={field.title}
                      className={"w-full flex-1 border-b border-gray-200"}
                      focusedClass={"border-b border-primary"}
                      maxWidthInput={"max-w-none"}
                      isMultiple={false}
                      allowClearValueSingleInput={true}
                      renderSelectedItem={(item) => (
                        <div className={"flex items-center"}>
                          <img alt={"tag icon"} src={TagIcon} />
                          <span>{item.text}</span>
                        </div>
                      )}
                      onSearchInputChange={debounce((value) => {
                        setSearchValues({
                          [field.name]: value,
                        });
                      }, 500)}
                      onClearData={() => {
                        setFieldValue(field.name, "");
                      }}
                      onchangeValue={(value) =>
                        setFieldValue(field.name, value._id)
                      }
                      initialValue={initialValues[field.name]}
                      data={field.data}
                      formatItem={{
                        id: "_id",
                        text: "name",
                      }}
                      inlineSearch={true}
                    />
                  </div>
                );
              })}
              <div className={"flex items-center mt-4"}>
                <p className={"text-gray-500 mr-4"}>Ngày tháng</p>
                <div className={"flex items-center flex-1"}>
                  <div className={"w-1/2 flex items-center"}>
                    <p className={"text-gray-500 mr-4"}>Từ</p>
                    <DayPickerInput
                      clickUnselectsDay
                      onDayChange={(day) =>
                        setFieldValue("from", moment(day).toJSON())
                      }
                      value={
                        initialValues.from &&
                        moment(initialValues.from).format("YYYY-MM-DD")
                      }
                      inputProps={{
                        className:
                          "w-full border-b border-gray-200 p-1 pl-2 pr-2 focus:outline-none focus:border-primary",
                        placeholder: "Ngày tháng...",
                        dateformat: "YYYY-MM-DD",
                      }}
                    />
                  </div>
                  <div className={"w-1/2 flex items-center"}>
                    <p className={"text-gray-500 mr-4"}>Đến</p>
                    <DayPickerInput
                      clickUnselectsDay
                      onDayChange={(day) =>
                        setFieldValue("to", moment(day).toJSON())
                      }
                      value={
                        initialValues.to &&
                        moment(initialValues.to).format("YYYY-MM-DD")
                      }
                      inputProps={{
                        className:
                          "w-full border-b border-gray-200 p-1 pl-2 pr-2 focus:outline-none focus:border-primary",
                        placeholder: "Ngày tháng...",
                        dateformat: "YYYY-MM-DD",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={"flex items-center justify-end mt-5"}>
                <button
                  onClick={() => {
                    onShowFilter(false);
                    onCancel && onCancel();
                  }}
                  className={"h-[45px] w-[117px] bg-gray-200 rounded mr-3"}
                >
                  Bỏ qua
                </button>
                <button
                  type="submit"
                  className={"h-[45px] w-[117px] bg-primary rounded text-white"}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export const DropdownFilterButton: FC<
  HTMLAttributes<HTMLDivElement> & {
    onSubmit?: (values: any) => boolean;
    onCancel?: () => void;
    initialValues?: {
      [k: string]: any;
    };
  }
> = ({ onSubmit, onCancel, initialValues, ...props }) => {
  const params = useParams<any>();

  const [showFilter, setShowFilter] = useState(false);
  const [defaultValues, setDefaultValues] = useState<any>({});

  const { onFetchDetailContactAsync } = useQueryDetailContact();
  const { onFetchDetailContractAsync } = useQueryDetailContract();
  const { onFetchDetailDoctypeAsync } = useQueryDetailDoctype();
  const { info: storageInfo } = useStorage({
    params: {
      storageID: initialValues?.storageID
    },
    isFetchInfo: true
  });

  const { onFetchDetailDepartmentAsync, detailDepartment } =
    useQueryDetailDepartment();

  const fetchInitialValues = React.useCallback(
    async (_initialValues: any) => {
      const data = { ..._initialValues };
      if (_initialValues?.senderID) {
        const contact = await onFetchDetailContactAsync(
          _initialValues.senderID || ""
        );
        data.contact = {
          _id: contact._id,
          name: contact.name,
        };
      }
      if (_initialValues?.contractID) {
        const contract = await onFetchDetailContractAsync({
          contractID: _initialValues.contractID,
          populates: "",
          select: "name",
        });
        data.contactID = {
          _id: contract._id,
          name: contract.name,
        };
      }
      if (initialValues?.propertyID) {
        const property = await onFetchDetailDoctypeAsync(
          initialValues.propertyID
        );
        data.propertyID = {
          _id: property._id,
          name: property.name,
        };
      }
      if ([0, 1].includes(_initialValues?.requestResponse)) {
        const requestResponse = [
          { _id: 0, name: "Không" },
          { _id: 1, name: "Có" },
        ].find((elm) => elm._id === _initialValues?.requestResponse);
        data.requestResponse = {
          _id: requestResponse?._id,
          name: requestResponse?.name,
        };
      }
      if (_initialValues?.storageID) {
        data.storageID = {
          _id: storageInfo?._id,
          name: storageInfo?.name,
        };
      }
      if (_initialValues?.receivedDate) {
        data.from = _initialValues.receivedDate.from;
        data.to = _initialValues.receivedDate.to;
      }
      setDefaultValues(data);
    },
    [
      initialValues,
      onFetchDetailContactAsync,
      onFetchDetailContractAsync,
      onFetchDetailDoctypeAsync,
    ]
  );
  const handleSubmit = React.useCallback(
    ({ to, from, ...values }) => {
      const result =
        onSubmit &&
        onSubmit({
          ...values,
          receivedDate: {
            to: to || "",
            from: from || "",
          },
        });
      if (result) {
        setShowFilter(false);
      }
    },
    [onSubmit]
  );

  React.useEffect(() => {
    fetchInitialValues(initialValues);
  }, [fetchInitialValues, initialValues]);

  React.useEffect(() => {
    if (params.id) {
      onFetchDetailDepartmentAsync(params.id);
    }
  }, [onFetchDetailDepartmentAsync, params.id]);

  return (
    <div {...props} className={cn("relative", props.className)}>
      <button
        onClick={() => {
          setShowFilter(!showFilter);
          if (showFilter) {
            onCancel && onCancel();
          }
        }}
        className={
          "bg-gray-50 flex items-center justify-center ml-3 px-3 h-[30px] rounded hover:bg-blue-100"
        }
      >
        <img src={SortingIcon} alt={"icon sorting icon"} />
        <span className={"ml-2 text-gray-500"}>Filter</span>
      </button>
      {showFilter && detailDepartment?.company?._id && (
        <FormFilter
          companyID={detailDepartment?.company?._id}
          onShowFilter={setShowFilter}
          onSubmit={handleSubmit}
          onCancel={onCancel}
          initialValues={defaultValues || {}}
        />
      )}
    </div>
  );
};
