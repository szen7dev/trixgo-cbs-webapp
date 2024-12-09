import "react-day-picker/lib/style.css";
import React, {
  FC,
  FormEvent,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import DatePicker from "react-datepicker";
import debounce from "lodash/debounce";
import { useModal } from "services/hooks/useModal";
import { DropdownSearchable } from "shareComponents/common";
import CloseIcon from "assets/images/icon-small-bold-close.svg";
import {
  useQueryListDepartments,
  useQueryListDoctype,
  useFetchListArea,
} from "services/hooks/useHuman";
import { usePosition } from "services/hooks/items/usePosition";
import { useUserSystem } from "services/hooks/users/useUserSystem";
import { useContact } from "services/hooks/items/useContact";
import type { MutationContactPayload } from "typings/human";
import { useAuth } from "services/hooks/auth/useAuth";
import { ACCESS_SALARY_TEMP } from "apis/localdb";

enum CLASSIFY {
  "Nhân viên" = 1,
  "Cộng tác viên",
  "Chuyên gia",
}

enum GENDER {
  "Nam" = 1,
  "Nữ",
  "Khác",
}

enum PERSONAL_STATUS {
  "T" = 1,
  "A",
}

enum INSURANCE_STATUS {
  "Chưa nộp" = 1,
  "Đã nộp",
  "Thêm mới",
}

enum CONTACT_POLICY {
  "Không" = 1,
  "Bộ đội phục viên",
  "Con thương bệnh binh",
  "Gia đình chính sách",
}

export function convertEnumToArray(enumVariable: any): Array<{
  label: string;
  value: number;
}> {
  return Object.values(enumVariable)
    .filter((value) => typeof value === "string")
    .map((value: any, index: number) => {
      return {
        label: value,
        value: index + 1, // value phải có giá trị bắt đầu từ 1.
      };
    });
}

interface NewHumanModalProps {
  initialValues?: any;
  onFinish: (values: MutationContactPayload) => Promise<boolean>;
  title?: string;
}

export const NewHumanModal: FC<NewHumanModalProps> = ({
  initialValues,
  onFinish,
  title,
}) => {
  const { user } = useAuth();
  const ref = useRef<HTMLDivElement>(null);
  const { t: i18n } = useTranslation(["human"]);
  const { closeModal } = useModal();

  const [searchDepartmentValue, setSearchDepartmentValue] = React.useState(
    initialValues?.department?.name || ""
  );
  const [searchPositionValue, setSearchPositionValue] = React.useState("");
  const [searchWorkingStatusValue, setSearchWorkingStatusValue] =
    React.useState(initialValues?.workingStatus?.label || "");
  const [searchContractTypeValue, setSearchContractTypeValue] =
    React.useState(initialValues?.contractType?.label || "");
  const [searchAreaValue, setSearchAreaValue] = React.useState(
    initialValues?.area?.label || ""
  );
  const [searchArea1Value, setSearchArea1Value] = React.useState(
    initialValues?.area1?.label || ""
  );
  const [searchArea2Value, setSearchArea2Value] = React.useState(
    initialValues?.area2?.label || ""
  );

  const { listDepartments } = useQueryListDepartments({
    limit: 50,
    keyword: searchDepartmentValue,
  });

  // User
  const [searchUserStr, setSearchUserStr] = React.useState(
    initialValues.linkUser?.fullname || ""
  );
  const {
    data: listUsersSystem,
  } = useUserSystem({ keyword: searchUserStr }, true);

  // Contact
  const [searchContact, setSearchContact] = React.useState('');
  const { list: contacts } = useContact({
    params: { keyword: searchContact },
    isFetchList: true,
  })

  // Position
  const {
    data: listPositions,
  } = usePosition({ keyword: searchPositionValue }, true);

  // Status
  const { listDoctypes: listWorkingStatus } = useQueryListDoctype({
    limit: 50,
    type: 9,
    keyword: searchWorkingStatusValue,
  });

  const { listDoctypes: listContractType } = useQueryListDoctype({
    limit: 50,
    type: 8,
    keyword: searchContractTypeValue,
  });

  const { listAreas: area } = useFetchListArea({
    limit: 100,
    keyword: searchAreaValue,
  });

  const { listAreas: area1 } = useFetchListArea({
    limit: 100,
    keyword: searchArea1Value,
  });

  const { listAreas: area2 } = useFetchListArea({
    limit: 100,
    keyword: searchArea2Value,
  });

  const defaultValues = useMemo(() => {
    return {
      type: 1,
      department: "",
      position: "",
      gender: 1,
      workingStatus: "",
      realStatus: 1,
      insuranceStatus: 1,
      familyPolicy: 1,
      bankAccount: "",
      bank: "",
      contractType: "",
      contractSign: "",
      family: "",
      description: "",
      name: "",
      sign: "",
      phone: "",
      email: "",
      birthday: "",
      identity: "",
      dateProvice: "",
      place: "",
      address: "",
      area: "",
      area1: "",
      area2: "",
      taxid: "",
      union: "",
      share: "",
      sallary: "",
      sallaryFactor: "",
      sallaryBasic: "",
      nods: "",
      insuranceSign: "",
      insuranceDate: "",
      signerIn: "",
      signerOut: "",
      workStartDate: "",
      dayOff: "",
      appointDate: "",
      changeSallaryDate: "",
      contractDate: "",
      contractValid: "",
      contractExpire: "",
      linkUser: "",
      note: "",
      insuranceFee: "",
      annualWorkingHours: "",
      parent: "",
      dataSource: "",
      ...initialValues,
    };
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (values: any) => {
      const formatData = {
        ...values,
        appointDate:
          (moment(values.appointDate).isValid() &&
            moment(values.appointDate).toJSON()) ||
          "",
        birthday:
          (moment(values.birthday).isValid() &&
            moment(values.birthday).toJSON()) ||
          "",
        changeSallaryDate:
          (moment(values.changeSallaryDate).isValid() &&
            moment(values.changeSallaryDate).toJSON()) ||
          "",
        contractDate:
          (moment(values.contractDate).isValid() &&
            moment(values.contractDate).toJSON()) ||
          "",
        contractExpire:
          (moment(values.contractExpire).isValid() &&
            moment(values.contractExpire).toJSON()) ||
          "",
        contractValid:
          (moment(values.contractValid).isValid() &&
            moment(values.contractValid).toJSON()) ||
          "",
        dateProvice:
          (moment(values.dateProvice).isValid() &&
            moment(values.dateProvice).toJSON()) ||
          "",
        dayOff:
          (moment(values.dayOff).isValid() && moment(values.dayOff).toJSON()) ||
          "",
        insuranceDate:
          (moment(values.insuranceDate).isValid() &&
            moment(values.insuranceDate).toJSON()) ||
          "",
        workStartDate:
          (moment(values.workStartDate).isValid() &&
            moment(values.workStartDate).toJSON()) ||
          "",
        type: values?.type?.toString(),
        gender: values?.gender?.toString(),
        realStatus: values?.realStatus?.toString(),
        insuranceStatus: values?.insuranceStatus?.toString() || "",
        familyPolicy: values?.familyPolicy?.toString() || "",
        area: values?.area?.value,
        area1: values?.area1?.value,
        area2: values?.area2?.value,
        department: values?.department?.value,
        position: values?.position?.value,
        workingStatus: values?.workingStatus?.value,
        linkUser: values?.linkUser?.value,
        parent: values?.parent?.value,
        dataSource: values?.dataSource?.value,
        contractType: values?.contractType?.value,
      };
      const isSuccess = await onFinish(formatData);
      if (isSuccess) {
        closeModal();
      }
    },
    [onFinish, closeModal]
  );

  return (
    <main>
      <section
        className="fixed flex justify-center items-center inset-0 z-auto"
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="relative w-full bg-primary-light" style={{height: "100%"}}>
          <div className="h-12 flex items-center border-b border-gray-300 px-6">
            <p className="text-bold text-xl">
              {title || i18n("modal.add-new.title")}
            </p>
            <img
              src={CloseIcon}
              alt="Close"
              className="absolute right-6 cursor-pointer"
              onClick={() => closeModal()}
            />
          </div>

          <Formik initialValues={defaultValues} onSubmit={handleSubmit}>
            {(formik) => {
              const { handleBlur, setFieldValue, values } = formik;
              // console.log('🚀 ~ defaultValues Human', defaultValues)
              return (
                <Form className="px-6 text-left">
                  {/* -------------- Line 1 --------------- */}
                  <div className="flex items-center justify-between h-10 border-b border-gray-200">
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 text-primary-gray">
                        {i18n("form.classify")}
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("type", value.value)
                        }
                        placeholder={i18n("form.classify") + "..."}
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div
                            style={{ width: 100 }}
                            className="flex items-center"
                          >
                            {/* <img alt="Tag" src={TagIcon} className="mr-1" /> */}
                            <p
                              style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                flex: "1 1 auto",
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        )}
                        initialValue={convertEnumToArray(CLASSIFY).find(elm => {
                          return elm.value === (defaultValues?.type || 1);
                        })}
                        data={convertEnumToArray(CLASSIFY)}
                        formatItem={{
                          text: "label",
                          id: "value",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 text-primary-gray">
                        {i18n("department")}
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("department", value)
                        }
                        onSearchInputChange={debounce(
                          (value) => setSearchDepartmentValue(value),
                          500
                        )}
                        placeholder={i18n("department") + "..."}
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div
                            style={{ width: 100 }}
                            className="flex items-center"
                          >
                            {/* <img alt="Tag" src={TagIcon} className="mr-1" /> */}
                            <p
                              style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                flex: "1 1 auto",
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        )}
                        initialValue={initialValues?.department}
                        data={listDepartments.map((department) => ({
                          label: department.name,
                          value: department._id,
                        }))}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-2/12 text-primary-gray">
                        {i18n("position")}
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("position", value)
                        }
                        onSearchInputChange={debounce(
                          (value) => setSearchPositionValue(value),
                          500
                        )}
                        placeholder={i18n("position") + "..."}
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div
                            style={{ width: 100 }}
                            className="flex items-center"
                          >
                            {/* <img alt="Tag" src={TagIcon} className="mr-1" /> */}
                            <p
                              style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                flex: "1 1 auto",
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        )}
                        initialValue={defaultValues?.position}
                        data={listPositions.map((position) => {
                          return ({
                            label: `${position.name}`,
                            value: position._id,
                          })
                        })}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-2/12 text-primary-gray">
                        {i18n("gender")}
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("gender", value.id)
                        }
                        placeholder="Giới tính..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div className="flex items-center">
                            {/* <img alt="Tag" src={TagIcon} className="mr-1" /> */}
                            <span>{item.text}</span>
                          </div>
                        )}
                        initialValue={convertEnumToArray(GENDER).find(elm => elm.value === (defaultValues?.gender || 2))}
                        data={convertEnumToArray(GENDER)}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 2 --------------- */}

                  <div className="flex items-center justify-between h-10 border-b border-gray-200">
                    <div className="w-1/5 flex items-center">
                      <span className="w-6/12 text-primary-gray">
                        {i18n("workingStatus")}
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("workingStatus", value)
                        }
                        onSearchInputChange={debounce(
                          (value) => setSearchWorkingStatusValue(value),
                          500
                        )}
                        placeholder="Tình trạng làm việc..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div
                            style={{ width: 100 }}
                            className="flex items-center"
                          >
                            {/* <img alt="Tag" src={TagIcon} className="mr-1" /> */}
                            <p
                              style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                flex: "1 1 auto",
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        )}
                        initialValue={defaultValues?.workingStatus}
                        data={listWorkingStatus.map((workingStatus) => ({
                          value: workingStatus._id,
                          label: workingStatus.name,
                        }))}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-6/12 text-primary-gray">
                        Tình trạng nhân sự
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("realStatus", value.id)
                        }
                        placeholder="Tình trạng nhân sự..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div
                            style={{ width: 100 }}
                            className="flex items-center"
                          >
                            {/* <img alt="Tag" src={TagIcon} className="mr-1" /> */}
                            <p
                              style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                flex: "1 1 auto",
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        )}
                        initialValue={convertEnumToArray(PERSONAL_STATUS).find(elm => elm.value === (defaultValues?.realStatus || 1))}
                        data={convertEnumToArray(PERSONAL_STATUS)}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-5/12 text-primary-gray">
                        Tình trạng Sổ bảo hiểm
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("insuranceStatus", value.id)
                        }
                        placeholder="Tình trạng Sổ bảo hiểm..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div
                            style={{ width: 100 }}
                            className="flex items-center"
                          >
                            {/* <img alt="Tag" src={TagIcon} className="mr-1" /> */}
                            <p
                              style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                flex: "1 1 auto",
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        )}
                        initialValue={convertEnumToArray(INSURANCE_STATUS).find(elm => elm.value === (defaultValues?.insuranceStatus || 1))}
                        data={convertEnumToArray(INSURANCE_STATUS)}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 text-primary-gray">
                        Gia đình chính sách
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("familyPolicy", value.id)
                        }
                        placeholder="Gia đình chính sách..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div
                            style={{ width: 100 }}
                            className="flex items-center"
                          >
                            {/* <img alt="Tag" src={TagIcon} className="mr-1" /> */}
                            <p
                              style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                flex: "1 1 auto",
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        )}
                        initialValue={convertEnumToArray(CONTACT_POLICY).find(elm => elm.value === (defaultValues?.familyPolicy || 1))}
                        data={convertEnumToArray(CONTACT_POLICY)}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 3 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Loại hợp đồng
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) => {
                          setFieldValue("contractType", value)
                        }
                        }
                        onSearchInputChange={debounce(
                          (value) => setSearchContractTypeValue(value),
                          500
                        )}
                        placeholder="Loại hợp đồng..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div
                            style={{ width: 100 }}
                            className="flex items-center"
                          >
                            {/* <img alt="Tag" src={TagIcon} className="mr-1" /> */}
                            <p
                              style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                flex: "1 1 auto",
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        )}
                        initialValue={defaultValues?.contractType}
                        data={listContractType.map((contractType) => ({
                          value: contractType._id,
                          label: contractType.name,
                        }))}
                        formatItem={{
                          id: "_id",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Số hợp đồng
                      </span>
                      <Field
                        type="text"
                        name="contractSign"
                        placeholder="Số hợp đồng..."
                        className="w-full h-6 outline-none"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-6/12 text-primary-gray">
                        Thông tin gia đình
                      </span>
                      <Field
                        type="text"
                        name="family"
                        placeholder="Thông tin gia đình..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Mô tả thông tin khác
                      </span>
                      <Field
                        type="text"
                        name="description"
                        placeholder="	Mô tả thông tin khác..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 4 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 text-primary-gray">
                        Họ và tên
                      </span>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Họ và tên"
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-2/12 text-primary-gray">Mã hiệu</span>
                      <Field
                        type="text"
                        name="sign"
                        placeholder="Mã hiệu..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 text-primary-gray">
                        Điện thoại
                      </span>
                      <Field
                        type="text"
                        name="phone"
                        placeholder="Điện thoại..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-1/12 mr-4 text-primary-gray">
                        Email
                      </span>
                      <Field
                        type="text"
                        name="email"
                        placeholder="Email..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 5 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5 flex items-center">
                      <span className="mr-4 text-primary-gray">Ngày sinh</span>
                      <DatePicker
                        name="birthday"
                        selected={
                          values.birthday
                            ? new Date(values.birthday)
                            : defaultValues.birthday && new Date(defaultValues.birthday)}
                        onChange={(date: Date | null) => setFieldValue("birthday", date)}
                        onSelect={(date: Date | null) => setFieldValue("birthday", date)}
                        isClearable={false}
                        closeOnScroll
                        autoComplete="off"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Ngày sinh..."
                        className="p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Số căn cước/CMT
                      </span>
                      <Field
                        type="text"
                        name="identity"
                        placeholder="Số căn cước/CMT..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-2/12 mr-4 text-primary-gray">
                        Ngày cấp
                      </span>
                      <DatePicker
                        name="dateProvice"
                        selected={
                          values.dateProvice
                            ? new Date(values.dateProvice)
                            : defaultValues.dateProvice && new Date(defaultValues.dateProvice)}
                        onChange={(date: Date | null) => setFieldValue("dateProvice", date)}
                        onSelect={(date: Date | null) => setFieldValue("dateProvice", date)}
                        isClearable={false}
                        closeOnScroll
                        autoComplete="off"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Ngày cấp..."
                        className="p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-2/12 text-primary-gray">Nơi cấp</span>
                      <Field
                        type="text"
                        name="place"
                        placeholder="Nơi cấp..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 6 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5 flex items-center">
                      <span className="mr-4 text-primary-gray w-9">Nơi ở</span>
                      <Field
                        type="text"
                        name="address"
                        placeholder="Nơi ở..."
                        className="w-52 h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 text-primary-gray">
                        Thường trú
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("area", value)}
                        onSearchInputChange={debounce(
                          (value) => setSearchAreaValue(value),
                          500
                        )}
                        placeholder="Tìm kiếm xã phường..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        initialValue={defaultValues?.area}
                        renderSelectedItem={(item) => (
                          <div
                            style={{ width: 100 }}
                            className="flex items-center"
                          >
                            {/* <img alt="Tag" src={TagIcon} className="mr-1" /> */}
                            <p
                              style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                flex: "1 1 auto",
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        )}
                        data={area.map((elm) => ({
                          label: `${elm.name}-${elm.parent?.name}-${elm.parent?.parent?.name}`,
                          value: elm._id,
                        }))}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="mr-4 text-primary-gray">Nơi sinh</span>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("area1", value)}
                        onSearchInputChange={debounce(
                          (value) => setSearchArea1Value(value),
                          500
                        )}
                        placeholder="Tìm kiếm xã phường..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div
                            style={{ width: 100 }}
                            className="flex items-center"
                          >
                            {/* <img alt="Tag" src={TagIcon} className="mr-1" /> */}
                            <p
                              style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                flex: "1 1 auto",
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        )}
                        initialValue={defaultValues?.area1}
                        data={area1.map((elm) => ({
                          label: `${elm.name}-${elm.parent?.name}-${elm.parent?.parent?.name}`,
                          value: elm._id,
                        }))}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 text-primary-gray">
                        Nguyên quán
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) => setFieldValue("area2", value)}
                        onSearchInputChange={debounce(
                          (value) => setSearchArea2Value(value),
                          500
                        )}
                        placeholder="Tìm kiếm xã phường..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div
                            style={{ width: 100 }}
                            className="flex items-center"
                          >
                            {/* <img alt="Tag" src={TagIcon} className="mr-1" /> */}
                            <p
                              style={{
                                textOverflow: "ellipsis",
                                maxWidth: "100%",
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                flex: "1 1 auto",
                              }}
                            >
                              {item.text}
                            </p>
                          </div>
                        )}
                        initialValue={defaultValues?.area2}
                        data={area2.map((elm) => ({
                          label: `${elm.name}-${elm.parent?.name}-${elm.parent?.parent?.name}`,
                          value: elm._id,
                        }))}
                        formatItem={{
                          id: "value",
                          text: "label",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 7 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5 flex items-center">
                      <span className="w-1/12 text-primary-gray">MST</span>
                      <Field
                        type="text"
                        name="taxid"
                        placeholder="MST..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Số bảo hiểm
                      </span>
                      <Field
                        type="text"
                        name="insuranceSign"
                        placeholder="Số bảo hiểm"
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 text-primary-gray">
                        Ngày nộp Bảo hiểm
                      </span>
                      <DatePicker
                        name="insuranceDate"
                        selected={
                          values.insuranceDate
                            ? new Date(values.insuranceDate)
                            : defaultValues.insuranceDate && new Date(defaultValues.insuranceDate)}
                        onChange={(date: Date | null) => setFieldValue("insuranceDate", date)}
                        onSelect={(date: Date | null) => setFieldValue("insuranceDate", date)}
                        isClearable={false}
                        closeOnScroll
                        autoComplete="off"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Ngày nộp Bảo hiểm..."
                        className="p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Hệ số lương
                      </span>
                      <Field
                        type="text"
                        name="sallaryFactor"
                        placeholder="Hệ số lương..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 8 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    {/* <div className="w-1/5 flex items-center">
                      <span className="w-2/12 text-primary-gray">Lương</span>
                      <Field
                        type="text"
                        name="sallary"
                        placeholder="Lương..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div> */}

                    {ACCESS_SALARY_TEMP.includes(`${user?._id.toString()}`) ?  <div className="w-1/5 flex items-center">
                      <span className="w-2/12 text-primary-gray">Lương</span>
                      <Field
                        type="text"
                        name="sallary"
                        placeholder="Lương..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div> : <span className="w-2/12 text-primary-gray">Lương</span>}
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Mức lương đóng Bảo hiểm
                      </span>
                      <Field
                        type="text"
                        name="sallaryBasic"
                        placeholder="Mức lương đóng Bảo hiểm..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Người ký nhận
                      </span>
                      <Field
                        type="text"
                        name="signerIn"
                        placeholder="Người ký nhận..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-5/12 text-primary-gray">
                        Người ký chấm dứt
                      </span>
                      <Field
                        type="text"
                        name="signerOut"
                        placeholder="Người ký chấm dứt..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 9 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5 flex items-center">
                      <span className="w-5/12 text-primary-gray">
                        Ngày bắt đầu làm việc
                      </span>
                      <DatePicker
                        name="workStartDate"
                        selected={
                          values.workStartDate
                            ? new Date(values.workStartDate)
                            : defaultValues.workStartDate && new Date(defaultValues.workStartDate)}
                        onChange={(date: Date | null) => setFieldValue("workStartDate", date)}
                        onSelect={(date: Date | null) => setFieldValue("workStartDate", date)}
                        isClearable={false}
                        closeOnScroll
                        autoComplete="off"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Ngày bắt đầu làm việc..."
                        className="p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 mr-4 text-primary-gray">
                        Ngày chấm dứt
                      </span>
                      <DatePicker
                        name="dayOff"
                        selected={
                          values.dayOff
                            ? new Date(values.dayOff)
                            : defaultValues.dayOff && new Date(defaultValues.dayOff)}
                        onChange={(date: Date | null) => setFieldValue("dayOff", date)}
                        onSelect={(date: Date | null) => setFieldValue("dayOff", date)}
                        isClearable={false}
                        closeOnScroll
                        autoComplete="off"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Ngày chấm dứt..."
                        className="p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 mr-4 text-primary-gray">
                        Ngày bổ nhiệm
                      </span>
                      <DatePicker
                        name="appointDate"
                        selected={
                          values.appointDate
                            ? new Date(values.appointDate)
                            : defaultValues.appointDate && new Date(defaultValues.appointDate)}
                        onChange={(date: Date | null) => setFieldValue("appointDate", date)}
                        onSelect={(date: Date | null) => setFieldValue("appointDate", date)}
                        isClearable={false}
                        closeOnScroll
                        autoComplete="off"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Ngày bổ nhiệm..."
                        className="p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 mr-4 text-primary-gray">
                        Thay đổi lương
                      </span>
                      <DatePicker
                        name="changeSallaryDate"
                        selected={
                          values.changeSallaryDate
                            ? new Date(values.changeSallaryDate)
                            : defaultValues.changeSallaryDate && new Date(defaultValues.changeSallaryDate)}
                        onChange={(date: Date | null) => setFieldValue("changeSallaryDate", date)}
                        onSelect={(date: Date | null) => setFieldValue("changeSallaryDate", date)}
                        isClearable={false}
                        closeOnScroll
                        autoComplete="off"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Thay đổi lương..."
                        className="p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* -------------- Line 10 --------------- */}
                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Ngày ký hợp đồng
                      </span>
                      <DatePicker
                        name="contractDate"
                        selected={
                          values.contractDate
                            ? new Date(values.contractDate)
                            : defaultValues.contractDate && new Date(defaultValues.contractDate)}
                        onChange={(date: Date | null) => setFieldValue("contractDate", date)}
                        onSelect={(date: Date | null) => setFieldValue("contractDate", date)}
                        isClearable={false}
                        closeOnScroll
                        autoComplete="off"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Ngày ký hợp đồng..."
                        className="p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Ngày hiệu lực Hợp đồng
                      </span>
                      <DatePicker
                        name="contractValid"
                        selected={
                          values.contractValid
                            ? new Date(values.contractValid)
                            : defaultValues.contractValid && new Date(defaultValues.contractValid)}
                        onChange={(date: Date | null) => setFieldValue("contractValid", date)}
                        onSelect={(date: Date | null) => setFieldValue("contractValid", date)}
                        isClearable={false}
                        closeOnScroll
                        autoComplete="off"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Ngày hiệu lực Hợp đồng..."
                        className="p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 text-primary-gray">
                        Thời hạn Hợp đồng
                      </span>
                      <DatePicker
                        name="contractExpire"
                        selected={
                          values.contractExpire
                            ? new Date(values.contractExpire)
                            : defaultValues.contractExpire && new Date(defaultValues.contractExpire)}
                        onChange={(date: Date | null) => setFieldValue("contractExpire", date)}
                        onSelect={(date: Date | null) => setFieldValue("contractExpire", date)}
                        isClearable={false}
                        closeOnScroll
                        autoComplete="off"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Thời hạn Hợp đồng..."
                        className="p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Ngày nộp sổ BH
                      </span>
                      <DatePicker
                        name="insuranceDate"
                        selected={
                          values.insuranceDate
                            ? new Date(values.insuranceDate)
                            : defaultValues.insuranceDate && new Date(defaultValues.insuranceDate)}
                        onChange={(date: Date | null) => setFieldValue("insuranceDate", date)}
                        onSelect={(date: Date | null) => setFieldValue("insuranceDate", date)}
                        isClearable={false}
                        closeOnScroll
                        autoComplete="off"
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Ngày nộp sổ BH..."
                        className="p-1 pl-2 pr-2 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Tiền đóng bảo hiểm
                      </span>
                      <Field
                        type="text"
                        name="insuranceFee"
                        placeholder="Tiền đóng bảo hiểm"
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>

                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                          Tài khoản ngân hàng
                        </span>
                        <Field
                          type="text"
                          name="bankAccount"
                          placeholder="Tài khoản ngân hàng"
                          className="w-full h-6 outline-none pl-3"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                    </div>

                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                          Số người phụ thuộc
                        </span>
                        <Field
                          type="text"
                          name="nods"
                          placeholder="Số người phụ thuộc"
                          className="w-full h-6 outline-none pl-3"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                    </div>

                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Ghi chú
                      </span>
                      <Field
                        type="text"
                        name="note"
                        placeholder="Ghi chú..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>

                  </div>

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Tiền đóng công đoàn
                      </span>
                      <Field
                        type="text"
                        name="union"
                        placeholder=" Tiền đóng công đoàn"
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>

                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                          Quỹ tương thân tương ái
                        </span>
                        <Field
                          type="text"
                          name="share"
                          placeholder="Quỹ tương thân tương ái"
                          className="w-full h-6 outline-none pl-3"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                    </div>

                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Ngân hàng thụ hưởng
                      </span>
                      <Field
                        type="text"
                        name="bank"
                        placeholder="Ngân hàng thụ hưởng"
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>

                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Số ngày tối đa được nghỉ phép năm
                      </span>
                      <Field
                        type="text"
                        name="numberOnLeave"
                        placeholder="Số ngày tối đa được nghỉ phép năm"
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>

                  </div>

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                  <div className="w-1/5 flex items-center">
                        <span className="w-6/12 text-primary-gray">
                          Link với tài khoản
                        </span>
                        <DropdownSearchable
                          onchangeValue={(value) =>
                            setFieldValue("linkUser", value)
                          }
                          onSearchInputChange={debounce(
                            (value) => setSearchUserStr(value),
                            500
                          )}
                          placeholder="Link với tài khoản"
                          className="w-full pl-0 -mb-1 outline-none"
                          isMultiple={false}
                          allowClearValueSingleInput={true}
                          showTriangle={false}
                          maxWidthInput="max-w-none"
                          renderSelectedItem={(item) => (
                            <div
                              style={{ width: 100 }}
                              className="flex items-center"
                            >
                              <p
                                style={{
                                  textOverflow: "ellipsis",
                                  maxWidth: "100%",
                                  minWidth: 0,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  flex: "1 1 auto",
                                }}
                              >
                                {item.text}
                              </p>
                            </div>
                          )}
                          initialValue={defaultValues?.linkUser}
                          data={listUsersSystem.map((linkUser) => ({
                            value: linkUser._id,
                            label: linkUser.fullname,
                          }))}
                          formatItem={{
                            id: "value",
                            text: "label",
                          }}
                          inlineSearch={true}
                        />
                    </div>
                    
                    <div className="w-1/5 flex items-center">
                        <span className="w-6/12 text-primary-gray">
                          Danh mục cha
                        </span>
                        <DropdownSearchable
                          onchangeValue={(value) =>
                            setFieldValue("parent", value)
                          }
                          onSearchInputChange={debounce(
                            (value) => setSearchContact(value),
                            500
                          )}
                          placeholder="Danh mục cha"
                          className="w-full pl-0 -mb-1 outline-none"
                          isMultiple={false}
                          allowClearValueSingleInput={true}
                          showTriangle={false}
                          maxWidthInput="max-w-none"
                          renderSelectedItem={(item) => (
                            <div
                              style={{ width: 100 }}
                              className="flex items-center"
                            >
                              <p
                                style={{
                                  textOverflow: "ellipsis",
                                  maxWidth: "100%",
                                  minWidth: 0,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  flex: "1 1 auto",
                                }}
                              >
                                {item.text}
                              </p>
                            </div>
                          )}
                          initialValue={defaultValues?.parent}
                          data={contacts.map((parent) => ({
                            value: parent._id,
                            label: parent.name,
                          }))}
                          formatItem={{
                            id: "value",
                            text: "label",
                          }}
                          inlineSearch={true}
                        />
                    </div>

                    <div className="w-1/5 flex items-center">
                        <span className="w-6/12 text-primary-gray">
                          Nguồn dữ liệu
                        </span>
                        <DropdownSearchable
                          onchangeValue={(value) =>
                            setFieldValue("dataSource", value)
                          }
                          onSearchInputChange={debounce(
                            (value) => setSearchContact(value),
                            500
                          )}
                          placeholder="Nguồn dữ liệu"
                          className="w-full pl-0 -mb-1 outline-none"
                          isMultiple={false}
                          allowClearValueSingleInput={true}
                          showTriangle={false}
                          maxWidthInput="max-w-none"
                          renderSelectedItem={(item) => (
                            <div
                              style={{ width: 100 }}
                              className="flex items-center"
                            >
                              <p
                                style={{
                                  textOverflow: "ellipsis",
                                  maxWidth: "100%",
                                  minWidth: 0,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  flex: "1 1 auto",
                                }}
                              >
                                {item.text}
                              </p>
                            </div>
                          )}
                          initialValue={defaultValues?.dataSource}
                          data={contacts.map((dataSource) => ({
                            value: dataSource._id,
                            label: dataSource.name,
                          }))}
                          formatItem={{
                            id: "value",
                            text: "label",
                          }}
                          inlineSearch={true}
                        />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Số giờ làm quy định/năm
                      </span>
                      <Field
                        type="text"
                        name="annualWorkingHours"
                        placeholder="Số giờ làm quy định/năm"
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                  </div>

                  <div className="absolute flex justify-end items-center bottom-0 -ml-6 px-6 h-12 w-full border-t border-gray-300 text-primary-light">
                    <button
                      type="submit"
                      className="bg-primary h-8 w-24 rounded-sm hover:opacity-90"
                    >
                      Xác nhận
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </main>
  );
};