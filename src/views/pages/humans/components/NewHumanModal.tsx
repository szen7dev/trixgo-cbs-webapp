import { FC, FormEvent, useRef, useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";

import "react-day-picker/lib/style.css";

import { useOnClickOutside } from "services/hooks/useOnclickOutside";
import { useModal } from "services/hooks/useModal";
import DropdownSearchable from "components/common/DropdownSearch";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import TagIcon from "assets/images/icons8-price-tag-96.svg";
import { INSURANCE_STATUS, CONTACT_POLICY } from "./views/GeneralInfo";
import { 
  useFetchListDepartments,
  useQueryListPosition,
  useFetchListDoctype,
  useFetchListArea,
} from "services/hooks/useHuman";
import type {
  MutationContactPayload
} from 'typings/human';

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

function convertEnumToArray(enumVariable: any) {
  return Object.values(enumVariable)
    .filter((value) => typeof value === "string")
    .map((value, index) => ({
      label: value,
      value: index + 1, // value phải có giá trị bắt đầu từ 1.
    }));
}

interface NewHumanModalProps {
  initialValues?: any;
  onFinish: (values: MutationContactPayload) => Promise<boolean>;
}

const NewHumanModal: FC<NewHumanModalProps> = ({ initialValues, onFinish }) => {
  const [openOption, setOpenOption] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { t: i18n } = useTranslation(["human"]);

  const { closeModal } = useModal();
  const { listDepartments } = useFetchListDepartments({
    limit: 50,
    keyword: initialValues?.department?.name || ''
  });

  const { listPositions } = useQueryListPosition({
    limit: 50,
  });

  const { listDoctypes: listWorkingStatus } = useFetchListDoctype({
    limit: 50,
    type: 9
  });

  const { listDoctypes: listContractType } = useFetchListDoctype({
    limit: 50,
    type: 8
  });

  const { listAreas: area } = useFetchListArea({
    limit: 100,
    keyword: initialValues?.area?.name || ''
  });

  const { listAreas: area1 } = useFetchListArea({
    limit: 100,
    keyword: initialValues?.area1?.name || ''
  });
  
  const { listAreas: area2 } = useFetchListArea({
    limit: 100,
    keyword: initialValues?.area2?.name || ''
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
      insuranceSign: "",
      insuranceDate: "",
      sallaryFactor: "",
      sallarySubFactor: "",
      sallaryBasic: "",
      signerIn: "",
      signerOut: "",
      workStartDate: "",
      dayOff: "",
      appointDate: "",
      changeSallaryDate: "",
      contractDate: "",
      contractValid: "",
      contractExpire: "",
      ...initialValues,
    };
  }, [initialValues]);

  useOnClickOutside(ref, () => setOpenOption(!openOption));

  const handleSubmit = useCallback(async (values: any) => {
    const formatData = {
      ...values,
      appointDate: moment(values.appointDate).isValid() && moment(values.appointDate).toJSON() || '',
      birthday: moment(values.birthday).isValid() && moment(values.birthday).toJSON() || '',
      changeSallaryDate: moment(values.changeSallaryDate).isValid() && moment(values.changeSallaryDate).toJSON() || '',
      contractDate: moment(values.contractDate).isValid() && moment(values.contractDate).toJSON() || '',
      contractExpire: moment(values.contractExpire).isValid() && moment(values.contractExpire).toJSON() || '',
      contractValid: moment(values.contractValid).isValid() && moment(values.contractValid).toJSON() || '',
      dateProvice: moment(values.dateProvice).isValid() && moment(values.dateProvice).toJSON() || '',
      dayOff: moment(values.dayOff).isValid() && moment(values.dayOff).toJSON() || '',
      insuranceDate: moment(values.insuranceDate).isValid() && moment(values.insuranceDate).toJSON() || '',
      workStartDate: moment(values.workStartDate).isValid() && moment(values.workStartDate).toJSON() || '',
      type: values?.type?.toString(),
      gender: values?.gender?.toString(),
      realStatus: values?.realStatus?.toString(),
      insuranceStatus: values?.insuranceStatus?.toString() || '',
      familyPolicy: values?.familyPolicy?.toString() || '',
    }
    const isSuccess = await onFinish(formatData);
    if (isSuccess) {
      closeModal()
    }
  }, [onFinish, closeModal]);

  return (
    <main>
      <section
        className="fixed flex justify-center items-center inset-0 z-auto"
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="relative w-full h-5/6 bg-primary-light">
          <div className="h-12 flex items-center border-b border-gray-300 px-6">
            <p className="text-bold text-xl">{i18n("modal.add-new.title")}</p>
            <img
              src={CloseIcon}
              alt="Close"
              className="absolute right-6 cursor-pointer"
              onClick={() => closeModal()}
            />
          </div>

          <Formik initialValues={defaultValues} onSubmit={handleSubmit}>
            {(formik) => {
              const { handleBlur, setFieldValue } = formik;
              return (
                <Form className="px-6 text-left">
                  <div className="flex items-center justify-between h-10 border-b border-gray-200">
                    {/* -------------- Line 1 --------------- */}

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
                          <div className="flex items-center">
                            <img alt="Tag" src={TagIcon} className="mr-1" />
                            <span>{item.text}</span>
                          </div>
                        )}
                        initialValue={defaultValues?.type || 1}
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
                          setFieldValue("department", value.id)
                        }
                        placeholder={i18n("department") + "..."}
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div className="flex items-center">
                            <img alt="Tag" src={TagIcon} className="mr-1" />
                            <span>{item.text}</span>
                          </div>
                        )}
                        initialValue={defaultValues?.department 
                          && `${defaultValues?.department}`
                        }
                        data={listDepartments}
                        formatItem={{
                          id: "_id",
                          text: "name",
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
                          setFieldValue("position", value.id)
                        }
                        placeholder={i18n("position") + "..."}
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div className="flex items-center">
                            <img alt="Tag" src={TagIcon} className="mr-1" />
                            <span>{item.text}</span>
                          </div>
                        )}
                        initialValue={defaultValues?.position 
                          && `${defaultValues?.position}`
                        }
                        // searchUrl='/api/item/positions'
                        // searchParam='keyword'
                        data={listPositions}
                        formatItem={{
                          id: "_id",
                          text: "name",
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
                            <img alt="Tag" src={TagIcon} className="mr-1" />
                            <span>{item.text}</span>
                          </div>
                        )}
                        initialValue={defaultValues?.gender || 2}
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
                        placeholder="Tình trạng làm việc..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div className="flex items-center">
                            <img alt="Tag" src={TagIcon} className="mr-1" />
                            <span>{item.text}</span>
                          </div>
                        )}
                        initialValue={defaultValues?.workingStatus?._id}
                        data={listWorkingStatus.map(workingStatus => ({...workingStatus}))}
                        formatItem={{
                          id: "_id",
                          text: "name",
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
                          <div className="flex items-center">
                            <img alt="Tag" src={TagIcon} className="mr-1" />
                            <span>{item.text}</span>
                          </div>
                        )}
                        initialValue={defaultValues?.realStatus || 1}
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
                        Tình trạng SBH
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("insuranceStatus", value.id)
                        }
                        placeholder="Tình trạng SBH..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div className="flex items-center">
                            <img alt="Tag" src={TagIcon} className="mr-1" />
                            <span>{item.text}</span>
                          </div>
                        )}
                        initialValue={defaultValues?.insuranceStatus || 1}
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
                        Gia đình CS
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("familyPolicy", value.id)
                        }
                        placeholder="Gia đình CS..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div className="flex items-center">
                            <img alt="Tag" src={TagIcon} className="mr-1" />
                            <span>{item.text}</span>
                          </div>
                        )}
                        initialValue={defaultValues?.familyPolicy || 1}
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
                        onchangeValue={(value) =>
                          setFieldValue("contractType", value.id)
                        }
                        placeholder="Loại hợp đồng..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div className="flex items-center">
                            <img alt="Tag" src={TagIcon} className="mr-1" />
                            <span>{item.text}</span>
                          </div>
                        )}
                        initialValue={defaultValues?.contractType || 1}
                        data={listContractType}
                        formatItem={{
                          id: "_id",
                          text: "name",
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
                        Thông tin khác
                      </span>
                      <Field
                        type="text"
                        name="description"
                        placeholder="Thông tin khác..."
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
                      <DayPickerInput
                        value={
                          defaultValues.birthday && moment(defaultValues.birthday).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) => setFieldValue("birthday", day)}
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Ngày sinh...",
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Số định danh
                      </span>
                      <Field
                        type="text"
                        name="identity"
                        placeholder="Số định danh..."
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
                      <DayPickerInput
                        value={
                          defaultValues.dateProvice && moment(defaultValues.dateProvice).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) => setFieldValue("dateProvice", day)}
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Ngày cấp...",
                        }}
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
                        onchangeValue={(value) =>
                          setFieldValue("area", value.id)
                        }
                        placeholder="Thường trú..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        initialValue={defaultValues?.area
                          && `${defaultValues?.area}`
                        }
                        renderSelectedItem={(item) => (
                          <div className="flex items-center">
                            <img alt="Tag" src={TagIcon} className="mr-1" />
                            <span>{item.text}</span>
                          </div>
                        )}
                        data={area.map(elm => ({
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
                        onchangeValue={(value) =>
                          setFieldValue("area1", value.id)
                        }
                        placeholder="Thường trú..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div className="flex items-center">
                            <img alt="Tag" src={TagIcon} className="mr-1" />
                            <span>{item.text}</span>
                          </div>
                        )}
                        initialValue={defaultValues?.area1 
                          && `${defaultValues?.area1}`
                        }
                        data={area1.map(elm => ({
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
                        onchangeValue={(value) =>
                          setFieldValue("area2", value.id)
                        }
                        placeholder="Thường trú..."
                        className="w-full pl-0 -mb-1 outline-none"
                        isMultiple={false}
                        allowClearValueSingleInput={true}
                        showTriangle={false}
                        maxWidthInput="max-w-none"
                        renderSelectedItem={(item) => (
                          <div className="flex items-center">
                            <img alt="Tag" src={TagIcon} className="mr-1" />
                            <span>{item.text}</span>
                          </div>
                        )}
                        initialValue={defaultValues?.area2
                          && `${defaultValues?.area2}`
                        }
                        data={area2.map(elm => ({
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
                        Ngày nộp BH
                      </span>
                      <DayPickerInput
                        value={
                          defaultValues.insuranceDate &&
                          moment(defaultValues.insuranceDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue("insuranceDate", day)
                        }
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Ngày nộp BH...",
                        }}
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
                    <div className="w-1/5 flex items-center">
                      <span className="w-2/12 text-primary-gray">Phụ cấp</span>
                      <Field
                        type="text"
                        name="sallarySubFactor"
                        placeholder="Phụ cấp..."
                        className="w-full h-6 outline-none pl-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Mức đóng BH
                      </span>
                      <Field
                        type="text"
                        name="sallaryBasic"
                        placeholder="Mức đóng BH..."
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
                        Người ký sa thải
                      </span>
                      <Field
                        type="text"
                        name="signerOut"
                        placeholder="Người ký sa thải..."
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
                      <DayPickerInput
                        value={
                          defaultValues.workStartDate && moment(defaultValues.workStartDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue("workStartDate", day)
                        }
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Ngày bắt đầu làm việc...",
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 mr-4 text-primary-gray">
                        Ngày chấm dứt
                      </span>
                      <DayPickerInput
                        value={
                          defaultValues.dayOff && moment(defaultValues.dayOff).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) => setFieldValue("dayOff", day)}
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Ngày chấm dứt...",
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 mr-4 text-primary-gray">
                        Ngày bổ nhiệm
                      </span>
                      <DayPickerInput
                        value={
                          defaultValues.appointDate && moment(defaultValues.appointDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue("appointDate", day)
                        }
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Ngày bổ nhiệm...",
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 mr-4 text-primary-gray">
                        Thay đổi lương
                      </span>
                      <DayPickerInput
                        value={
                          defaultValues.changeSallaryDate && moment(defaultValues.changeSallaryDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue("changeSallaryDate", day)
                        }
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Thay đổi lương...",
                        }}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 10 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Ngày ký hợp đồng
                      </span>
                      <DayPickerInput
                        value={
                          defaultValues.contractDate && moment(defaultValues.contractDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) => setFieldValue("contractDate", day)}
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Ngày ký hợp đồng...",
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Ngày hiệu lực HĐ
                      </span>
                      <DayPickerInput
                        value={
                          defaultValues.contractValid && moment(defaultValues.contractValid).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue("contractValid", day)
                        }
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Ngày hiệu lực HĐ...",
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-3/12 text-primary-gray">
                        Thời hạn HĐ
                      </span>
                      <DayPickerInput
                        value={
                          defaultValues.contractExpire && moment(defaultValues.contractExpire).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue("contractExpire", day)
                        }
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Thời hạn HĐ...",
                        }}
                      />
                    </div>
                    <div className="w-1/5 flex items-center">
                      <span className="w-4/12 text-primary-gray">
                        Ngày nộp sổ BH
                      </span>
                      <DayPickerInput
                        value={
                          defaultValues.insuranceDate && moment(defaultValues.insuranceDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) =>
                          setFieldValue("insuranceDate", day)
                        }
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Ngày nộp sổ BH...",
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

export default NewHumanModal;
