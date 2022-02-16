import { Dialog } from "@headlessui/react";
import moment from "moment";
import React, { Fragment, useContext } from "react";
import cn from "classnames";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { Formik, Form, Field } from "formik";
import uniqBy from "lodash/uniqBy";

import { Context } from "../../contexts/contextModal";
import ModalContainer from "views/pages/media/components/ModalContainer";
import iconAttach from "assets/images/icons8-attach-96.png";
import itemTag from "assets/images/icons8-price-tag.svg";
import DropdownSearchable from "components/common/DropdownSearch";

import { useQueryListPackage } from "services/hooks/document/usePackage";
import { useQueryContact } from "services/hooks/items/useContact";
import { useQueryListDoctype } from "services/hooks/items/useDoctype";
import { useQueryListStorage } from "services/hooks/items/useStorage";
import { useQueryItemContract } from "services/hooks/items/useContract";
import { DIRECTION_TYPES, DOCUMENT_TYPES } from "apis/localdb";

const fieldInputByRow = [
  { title: "Số lượng", name: "amount", type: "text" },
  { title: "Số lượng giao", name: "amountDelivery", type: "text" },
  {
    title: "Phản hồi",
    name: "requestResponse",
    type: "checkbox",
    checked: true,
  },
  {
    title: "Thời hạn",
    name: "expiredResponse",
    type: "datepicker",
  },

  {
    title: "Mã hiệu",
    name: "sign",
    type: "text",
  },
  {
    title: "Mã hiệu lưu",
    name: "storeSign",
    type: "text",
  },
  {
    title: "Người ký",
    name: "approver",
    type: "text",
  },
  { title: "Giá trị", name: "value", type: "text" },

  { title: "Nhận dạng", name: "style", type: "text" },
  { title: "Tình trạng", name: "status", type: "text" },
  { title: "Ngày văn bản", name: "date", type: "datepicker" },
  {
    title: "Ngày nhận",
    name: "receivedDate",
    type: "datepicker",
  },
];

const useInitialValues = (departmentID: string, companyID: string) => {
  const { listPackage } = useQueryListPackage({ departmentID });
  const { listContact } = useQueryContact({ companyID });
  const { listDoctypes: fields } = useQueryListDoctype({ type: 1, companyID }); // lĩnh vực
  const { listDoctypes: properties } = useQueryListDoctype({
    type: 2,
    companyID,
  }); // tính chất
  const { listStorages } = useQueryListStorage({ companyID });
  const { listContracts } = useQueryItemContract(companyID);

  if (!companyID || !departmentID) {
    return {
      listPackage: [],
      listContact: [],
      fields: [],
      properties: [],
      listStorages: [],
      listContracts: [],
    };
  }

  return {
    listPackage,
    listContact,
    fields,
    properties,
    listStorages,
    listContracts,
  };
};

const ModalCreateDocument: React.FC = (props) => {
  const { state, toggleModal, updateModal } = useContext(Context);

  const initialValues = React.useMemo(() => {
    const obj = {...state.initialValues};
    return {
      ...obj,
      field: state.initialValues?.field?._id,
      package: state.initialValues?.package?._id,
      project: state.initialValues?.project?._id,
      receiver: state.initialValues?.receiver?._id,
      sender: state.initialValues?.sender?._id,
      storage: state.initialValues?.storage?._id,
      property: state.initialValues?.property?._id,
    }
  }, [state.initialValues]);

  const {
    fields,
    listContact,
    listPackage,
    listContracts,
    listStorages,
    properties,
  } = useInitialValues(
    state.departmentId,
    state?.departmentInfo?.company?._id || ""
  );

  const listFormFieldsDropdown = React.useMemo(() => {
    return [
      { title: "Gói thầu", data: listPackage, name: "package" },
      {
        title: "Hướng",
        data: DIRECTION_TYPES.map((elm) => ({
          _id: elm.value,
          name: elm.text,
        })),
        name: "direction",
      },
      { title: "Ban hành", data: listContact, name: "sender" },
      { title: "Nhận", data: listContact, name: "receiver" },

      { title: "Tính chất", data: properties, name: "property" },
      {
        title: "Phân loại",
        data: DOCUMENT_TYPES.map((elm) => ({
          _id: elm.value,
          name: elm.text,
        })),
        name: "type",
      },
      { title: "Hợp đồng", data: listContracts, name: "contract" },
      { title: "Lưu trữ", data: listStorages, name: "storage" },
    ];
  }, [listContact, listContracts, listPackage, listStorages, properties]);

  const handleSubmit = React.useCallback(
    (values) => {
      const formatValues = {
        ...values,
      };
      if (moment(values.date).isValid()) {
        formatValues.date = moment(values.date).toJSON();
      }
      if (moment(values.expiredResponse).isValid()) {
        formatValues.expiredResponse = moment(values.expiredResponse).toJSON();
      }
      if (moment(values.receivedDate).isValid()) {
        formatValues.receivedDate = moment(values.receivedDate).toJSON();
      }
      if (state.onSubmit) {
        try {
          state.onSubmit({
            ...formatValues,
            amount: parseInt(values.amount, 10) || 0,
            amountDelivery: parseInt(values.amountDelivery, 10),
            value: parseInt(values.value, 10),
            packageID: values.package,
            storageID: values.storage,
            propertyID: values.property,
            senderID: values.sender,
            receiverID: values.receiver,
            fieldID: values.field,
          });
        } catch (error: unknown) {
          console.error(error);
        }
      }
    },
    [state]
  );

  return (
    <ModalContainer isModalOpen={state.isShow} toggle={() => false}>
      <div
        className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white"
        style={{ maxWidth: "1569px" }}
      >
        <div className="flex items-center px-6 py-2.5 justify-between border-b border-secondary-gray border-opacity-30">
          <Dialog.Title as="h3" className="text-lg leading-6 font-bold">
            {state.title}
          </Dialog.Title>
          <button
            type="button"
            onClick={() => {
              toggleModal();
              updateModal({
                initialValues: {},
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            const { handleBlur, setFieldValue } = formik;
            return (
              <Form>
                <div className="px-5 pb-4 overflow-x-auto">
                  <div className="document__profile-create whitespace-nowrap">
                    {/* Fisrt row */}
                    {listFormFieldsDropdown.map((item) => {
                      const initialValue = (() => {
                        const data = state.initialValues[item.name];
                        if (data) {
                          return data;
                        }
                        return {};
                      })();
                      const listUniqById = uniqBy(
                        [...item.data].concat(initialValue),
                        "_id"
                      ).filter(elm => elm._id);
                      return (
                        <Fragment key={item.title}>
                          <div className="py-1.5 h-[30px] box-content">
                            <p className="py-1.5">{item.title}</p>
                          </div>
                          <div
                            key={item.title + 1}
                            className="py-0.5 h-[30px] box-content px-2"
                          >
                            <DropdownSearchable
                              placeholder={item.title}
                              className={"w-full flex-1"}
                              showTriangle={false}
                              maxWidthInput={"max-w-none"}
                              isMultiple={false}
                              allowClearValueSingleInput={true}
                              renderSelectedItem={(item) => (
                                <div className={"flex items-center"}>
                                  <img alt={"tag icon"} src={itemTag} />
                                  <span>{item.text}</span>
                                </div>
                              )}
                              onchangeValue={(value) =>
                                setFieldValue(item.name, value._id)
                              }
                              initialValue={
                                state?.initialValues[item.name]?._id ||
                                state.initialValues[item.name] ||
                                ""
                              }
                              data={listUniqById}
                              formatItem={{
                                id: "_id",
                                text: "name",
                              }}
                              inlineSearch={true}
                            />
                          </div>
                        </Fragment>
                      );
                    })}
                    {fieldInputByRow.map((item) => {
                      if (item.type === "text") {
                        return (
                          <Fragment key={item.title}>
                            <div className="py-1.5 h-[30px] box-content">
                              <p className="py-1.5">{item.title}</p>
                            </div>
                            <div className="text-black py-1.5 h-[30px] box-content px-2">
                              <div className="py-1.5">
                                <Field
                                  name={item.name}
                                  type="text"
                                  className="w-full"
                                  placeholder="Nội dung"
                                  onBlur={(
                                    e: React.FormEvent<HTMLInputElement>
                                  ) => {
                                    handleBlur(e);
                                  }}
                                />
                                {/* {item.type === "text" ? (
                                  ) : (
                                    <input
                                      type={item.type}
                                      value={item.value}
                                      checked={item.checked}
                                    />
                                  )} */}
                              </div>
                            </div>
                          </Fragment>
                        );
                      }
                      if (item.type === "datepicker") {
                        return (
                          <Fragment key={item.title}>
                            <div className="py-1.5 h-[30px] box-content">
                              <p className="py-1.5">{item.title}</p>
                            </div>
                            <div className="text-black py-1.5 h-[30px] box-content px-2">
                              <div className="py-1.5">
                                <DayPickerInput
                                  onDayChange={(day) =>
                                    setFieldValue(item.name, day)
                                  }
                                  value={
                                    state?.initialValues[item.name] &&
                                    moment(
                                      state?.initialValues[item.name]
                                    ).format("DD/MM/YYYY")
                                  }
                                  inputProps={{
                                    className: "w-full",
                                    placeholder: "Ngày tháng...",
                                    dateFormat: "dd/MM/yyyy",
                                  }}
                                />
                              </div>
                            </div>
                          </Fragment>
                        );
                      }
                      if (item.type === "checkbox") {
                        return (
                          <Fragment key={item.title}>
                            <div className="py-1.5 h-[30px] box-content">
                              <p className="py-1.5">{item.title}</p>
                            </div>
                            <div className="text-black py-1.5 h-[30px] box-content px-2">
                              <div className="py-1.5">
                                <Field
                                  name={item.name}
                                  type="checkbox"
                                  checked={item.checked}
                                  // className="w-full"
                                  onBlur={(
                                    e: React.FormEvent<HTMLInputElement>
                                  ) => {
                                    handleBlur(e);
                                  }}
                                />
                              </div>
                            </div>
                          </Fragment>
                        );
                      }
                      return <div key="default" />;
                    })}
                    <label
                      htmlFor="title"
                      className="py-1.5 h-[30px] box-content"
                    >
                      <p className="py-1.5">Tiêu đề</p>
                    </label>
                    <Field
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        handleBlur(e);
                      }}
                      type="text"
                      name="name"
                      placeholder="Tiêu đề"
                      className="col-span-3 focus:outline-none py-1.5 h-[30px] box-content px-2"
                    />
                    <label
                      htmlFor="status"
                      className="py-1.5 h-[30px] box-content"
                    >
                      <p className="py-1.5">Tình trạng hoàn thành</p>
                    </label>
                    <div className="text-black py-1.5 h-[30px] box-content px-2">
                      <div className="py-1.5">
                        <Field
                          onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                          type="checkbox"
                          name="completeStatus"
                        />
                      </div>
                    </div>

                    <div className="py-1.5 h-[30px] box-content">
                      <p className="py-1.5">Lĩnh vực</p>
                    </div>
                    <div className="py-0.5 h-[30px] box-content px-2">
                      <DropdownSearchable
                        placeholder={"Dự án"}
                        className={"w-full flex-1"}
                        showTriangle={false}
                        maxWidthInput={"max-w-none"}
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        renderSelectedItem={(item) => (
                          <div className={"flex items-center"}>
                            <img alt={"tag icon"} src={itemTag} />
                            <span>{item.text}</span>
                          </div>
                        )}
                        onchangeValue={(value) =>
                          setFieldValue("field", value._id)
                        }
                        initialValue={
                          state?.initialValues['field']?._id || ""
                        }
                        data={uniqBy([...fields, state?.initialValues['field'] || {}].filter(elm => {
                          if (elm._id) {
                            return elm;
                          }
                        }), '_id')}
                        formatItem={{
                          id: "_id",
                          text: "name",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <label
                      htmlFor="description"
                      className="py-1.5 h-[30px] box-content"
                    >
                      <p className="py-1.5">Mô tả</p>
                    </label>
                    <Field
                      type="text"
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        handleBlur(e);
                      }}
                      name="description"
                      placeholder="Mô tả"
                      className="col-span-7 focus:outline-none py-1.5 h-[30px] box-content"
                    />
                    <div className="border-opacity-50 py-1 col-span-8">
                      <p className="py-1.5">Ghi chú</p>
                      <Field
                        onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                        name="note"
                      >
                        {({
                          field, // { name, value, onChange, onBlur }
                        }: // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        // meta,
                        any) => (
                          <div>
                            <textarea
                              rows={10}
                              placeholder="Biên soạn nội dung"
                              className="w-full focus:outline-none resize-none lex-grow py-2"
                              // {...formik.getFieldProps('content')}
                              {...field}
                            />
                          </div>
                        )}
                      </Field>
                      {/* <textarea
                          rows={10}
                          placeholder="Biên soạn nội dung"
                          className="w-full focus:outline-none resize-none lex-grow py-2"
                          // {...formik.getFieldProps('content')}
                        ></textarea> */}
                    </div>
                    {/* File uploaded */}
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="col-span-8 py-1 pl-2 pr-1 max-w-md flex mb-3"
                        style={{ backgroundColor: "#EDEBEB" }}
                      >
                        <a
                          className={cn(
                            "font-bold whitespace-nowrap flex overflow-hidden",
                            { "text-cbs-primary": index === 0 }
                          )}
                          href="/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <div className="document__line-min inline-block mr-1.5 py-1 align-bottom">
                            Screen Shot 2021-12-22 at 10.15.22.png
                          </div>
                          <div
                            className="inline-block py-1"
                            style={{ color: "#777" }}
                          >
                            (725K)
                          </div>
                        </a>
                        {index !== 0 ? (
                          <div className="inline-block w-[124px] min-w-[124px] bg-white border border-cbs-primary p-0.5 h-3 ml-3 my-2">
                            <div
                              className="bg-cbs-primary h-full"
                              style={{ width: 30 + "%" }}
                            ></div>
                          </div>
                        ) : null}
                        <button type="button" className="ml-auto p-1">
                          <svg
                            aria-label="Xóa tệp đính kèm"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between pt-3 px-6 pb-3.5 border-t border-cbs-border">
                  <div className="flex items-center">
                    <label className="w-6 h-6 rounded-md flex justify-center items-center cursor-pointer mr-8">
                      <img src={iconAttach} alt="" />
                      <input
                        type="file"
                        name="files"
                        id="file"
                        className="hidden"
                        accept="*"
                        multiple
                        onChange={(event) => false}
                      />
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="send-mail"
                        className="h-4 w-4 align-middle mr-5"
                      />
                      <span className="select-none align-middle ">
                        Thông báo email
                      </span>
                    </label>
                  </div>
                  <div className="mr-1.5">
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-md bg-primary text-white text-large leading-5"
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
    </ModalContainer>
  );
};
export default ModalCreateDocument;
