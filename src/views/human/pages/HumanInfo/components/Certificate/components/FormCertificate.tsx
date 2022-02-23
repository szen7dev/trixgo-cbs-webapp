import React from "react";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { useTranslation } from "react-i18next";
import debounce from 'lodash/debounce';

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import TagIcon from "assets/images/icons8-price-tag-96.svg";
import { useModal } from "services/hooks/useModal";
import { DropdownSearchable } from "shareComponents/common";
import {
  useQueryListDoctype,
} from "services/hooks/useHuman";
import { CONTACT_DOCUMENT_GRADES } from "..";
import { convertEnumToArray } from "../../../../../shareComponents/common/NewHumanModal"; // Vlxx thế :))

import type { CertificateType, CertificateName,  } from "typings/human";
interface FormCertificateProps {
  title: string;
  defaultValues?: {
    name: string; // nội dung
    place: string; // nơi cấp
    sign: string; // ký hiệu
    fromDate: string; // ngày tháng
    toDate: string; // ngày hết hạn
    certificateType: CertificateType; // loại chứng chỉ
    certificateName: CertificateName; // lĩnh vực chứng chỉ
    certificateGrade: number; // hạng chứng chỉ
    number: number; // số lượng
    store: string; // vị trí lưu trữ
    note: string; // ghi chú
  };
  onFinish?: (values: any) => void;
  contactDocumentID?: string;
}

export const FormCertificate: React.FC<FormCertificateProps> = ({
  defaultValues,
  onFinish,
  title,
  contactDocumentID,
}) => {
  const [searchCertificateType, setSearchCertificateTypeValue] = React.useState('');
  const [searchCertificateName, setSearchCertificateNameValue] = React.useState('');

  const { closeModal } = useModal();
  const { t: i18n } = useTranslation(["human"]);
  const { listDoctypes: listCertificateType } = useQueryListDoctype({ 
    limit: 50,
    type: 14,
    keyword: searchCertificateType
  });
  const { listDoctypes: listCertificateName } = useQueryListDoctype({ 
    limit: 50,
    type: 15,
    keyword: searchCertificateName
});

  const initialValues = React.useMemo(
    () => ({
      name: "", // nội dung
      place: "", // nơi cấp
      sign: "", // ký hiệu
      fromDate: "", // ngày tháng
      toDate: "", // ngày hết hạn
      certificateType: {}, // loại chứng chỉ
      certificateName: {}, // lĩnh vực chứng chỉ
      certificateGrade: 1, // hạng chứng chỉ
      number: 0, // số lượng
      store: "", // vị trí lưu trữ
      note: "", // ghi chú
      ...defaultValues,
    }),
    [defaultValues]
  );

  const handleSubmit = React.useCallback(
    (values) => {
      const formatData = {
        ...values,
        certificateGrade: `${values.certificateGrade}`,
        number: `${values.number}`,
        toDate:
          (moment(values.toDate).isValid() && moment(values.toDate).toJSON()) ||
          "",
      };
      if (contactDocumentID) {
        formatData.contactDocumentID = contactDocumentID;
      }
      if (onFinish) {
        onFinish(formatData);
      }
    },
    [contactDocumentID, onFinish]
  );

  return (
    <main>
      <section
        className="fixed flex justify-center items-center inset-0 z-auto"
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="relative w-full h-5/6 bg-primary-light px-6">
          <div className="h-12 flex items-center border-b border-gray-300">
            <p className="text-bold text-xl">{title}</p>
            <img
              src={CloseIcon}
              alt="Close"
              className="absolute right-6 cursor-pointer"
              onClick={() => closeModal()}
            />
          </div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(formik) => {
              const { handleBlur, setFieldValue } = formik;

              return (
                <Form>
                  {/* -------------- Line 1 --------------- */}
                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/4 flex items-center">
                      <span className="w-7/12 text-primary-gray text-left">
                        Nội dung
                      </span>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Nội dung quyết định..."
                        className="w-full h-6 outline-none"
                        onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/4 flex items-center">
                      <span className="w-4/12 text-primary-gray text-left text-left">
                        Nơi cấp
                      </span>
                      <Field
                        type="text"
                        name="place"
                        placeholder="Số hiệu..."
                        className="w-full h-6 outline-none"
                        onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/4 flex items-center">
                      <span className="w-4/12 text-primary-gray text-left text-left">
                        Ký hiệu
                      </span>
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
                    <div className="w-1/4 flex items-center">
                      <span className="w-4/12 text-primary-gray text-left text-left">
                        Ngày tháng
                      </span>
                      <DayPickerInput
                        value={
                          initialValues.fromDate &&
                          moment(initialValues.toDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) => setFieldValue("fromDate", day)}
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Ngày tháng...",
                        }}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 2 --------------- */}
                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/4 flex items-center">
                      <span className="w-4/12 text-primary-gray text-left text-left">
                        Ngày hết hạn
                      </span>
                      <DayPickerInput
                        value={
                          initialValues.fromDate &&
                          moment(initialValues.toDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) => setFieldValue("toDate", day)}
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Ngày tháng...",
                        }}
                      />
                    </div>
                    <div className="w-1/4 flex items-center">
                      <span className="w-7/12 text-primary-gray text-left">
                        Loại chứng chỉ
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("certificateType", value.value)
                        }
                        onSearchInputChange={debounce(value => setSearchCertificateTypeValue(value), 1000)}
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
                        initialValue={initialValues?.certificateType}
                        data={listCertificateType.map((certificateType) => ({
                          label: certificateType.name,
                          value: certificateType._id,
                        }))}
                        formatItem={{
                          text: "label",
                          id: "value",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div className="w-1/4 flex items-center">
                      <span className="w-7/12 text-primary-gray text-left">
                        Lĩnh vực chứng chỉ
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("certificateName", value.value)
                        }
                        
                        onSearchInputChange={debounce(value => setSearchCertificateNameValue(value), 1000)}
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
                        initialValue={initialValues?.certificateName}
                        data={listCertificateName.map((certificateName) => ({
                          label: certificateName.name,
                          value: certificateName._id,
                        }))}
                        formatItem={{
                          text: "label",
                          id: "value",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div className="w-1/4 flex items-center">
                      <span className="w-7/12 text-primary-gray text-left">
                        Hạng chứng chỉ
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("certificateGrade", value.value)
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
                        initialValue={convertEnumToArray(CONTACT_DOCUMENT_GRADES).find(elm => elm.value === initialValues?.certificateGrade)}
                        data={convertEnumToArray(CONTACT_DOCUMENT_GRADES)}
                        formatItem={{
                          text: "label",
                          id: "value",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 3 --------------- */}
                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/4 flex items-center">
                      <span className="w-7/12 text-primary-gray text-left">
                        Số lượng
                      </span>
                      <Field
                        type="text"
                        name="number"
                        placeholder="..."
                        className="w-full h-6 outline-none"
                        onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/4 flex items-center">
                      <span className="w-7/12 text-primary-gray text-left">
                        Vị trí lưu trữ
                      </span>
                      <Field
                        type="text"
                        name="store"
                        placeholder="..."
                        className="w-full h-6 outline-none"
                        onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/4 flex items-center">
                      <span className="w-7/12 text-primary-gray text-left">
                        Ghi chú
                      </span>
                      <Field
                        type="text"
                        name="note"
                        placeholder="..."
                        className="w-full h-6 outline-none"
                        onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/4 flex items-center" />
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