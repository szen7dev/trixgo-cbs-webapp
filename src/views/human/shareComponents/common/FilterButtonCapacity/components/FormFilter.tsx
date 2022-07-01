import React from "react";
import { Formik, Form } from "formik";
import debounce from "lodash/debounce";

import { InputClearable, DropdownSearchable } from "shareComponents/common";
import TagIcon from "assets/images/icons8-price-tag-96.svg";
import {
  CONTACT_SUB_TYPES,
  GENDER_TYPES,
  CONTACT_TA,
  INSURANCE_STATUS,
  CONTACT_POLICY
} from 'apis/localdb';

import {
  useQueryListDepartments,
  useQueryListDoctype,
} from "services/hooks/useHuman";

import { usePosition } from "services/hooks/items/usePosition";

interface FormFilterProps {
  onSubmit?: (values: any) => void;
  onCancel?: () => void;
  onShowFilter: (isShow: boolean) => void;
  initialValues?: {
    [k: string]: any;
  };
}

export const FormFilter: React.FC<FormFilterProps> = ({
  onSubmit,
  onShowFilter,
  onCancel,
  initialValues,
  ...props
}) => {

  const [searchValues, setSearchValues] = React.useState<{
    [k: string]: string;
  }>({});

  const { listDepartments } = useQueryListDepartments({
    limit: 10,
    keyword: searchValues.department || "",
  });

  const { data: listPositions } = usePosition({
    limit: 10,
    keyword: searchValues.position || "",
  }, true);

  const { listDoctypes: listWorkingStatus } = useQueryListDoctype({
    limit: 50,
    type: 9,
    keyword: searchValues.workingStatus || "",
  });

  const { listDoctypes: listContractType } = useQueryListDoctype({
    limit: 50,
    type: 8,
    keyword: searchValues.contractType || "",
  });
  // Trình độ type = 6
  const { listDoctypes: listDoctypes6 } = useQueryListDoctype({
    limit: 50,
    type: 6,
    keyword: searchValues.level || "",
  });

  // Chuyên ngành type = 7
  const { listDoctypes: listDoctypes7 } = useQueryListDoctype({
    limit: 50,
    type: 7,
    keyword: searchValues.majors || "",
  });

  const listFieldDropdown = React.useMemo(() => {
    return [
      {
        title: "Giới tính",
        data: GENDER_TYPES.map(elm => ({_id: elm.value, name: elm.text})),
        name: "gender",
      },
      {
        title: "Trình độ",
        data: listDoctypes6,
        name: "educationalBackground2",
      },
      {
        title: "Chuyên ngành",
        data: listDoctypes7,
        name: "field2",
      },
      { title: "Loại hợp đồng", data: listContractType, name: "contractType" },
      {
        title: "Tình trạng làm việc",
        data: listWorkingStatus,
        name: "workingStatus",
      },
    ];
  }, [listContractType, listDepartments, listPositions, listWorkingStatus]);

  const handleSubmit = React.useCallback(
    (values) => {
      const formatData = {
        ...values,
      };
      if (typeof values.department === "object") {
        formatData.department = values.department._id;
      }
      if (typeof values.position === "object") {
        formatData.position = values.position._id;
      }
      if (typeof values.propertyID === "object") {
        formatData.propertyID = values.propertyID._id;
      }
      if (typeof values.workingStatus === "object") {
        formatData.workingStatus = values.workingStatus._id;
      }
      if (typeof values.contractType === "object") {
        formatData.contractType = values.contractType._id;
      }
      onSubmit && onSubmit(formatData);
    },
    [onSubmit]
  );
  
  return (
    <Formik
      initialValues={initialValues || {}}
      onSubmit={handleSubmit}
      {...props}
    >
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
                      initialValue={
                        initialValues ? initialValues[field.name] : {}
                      }
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