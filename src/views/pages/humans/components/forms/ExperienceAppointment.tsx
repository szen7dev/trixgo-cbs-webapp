import React from "react";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { useTranslation } from "react-i18next";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import TagIcon from "assets/images/icons8-price-tag-96.svg";
import { useModal } from "services/hooks/useModal";
import DropdownSearchable from "components/common/DropdownSearch";
import {
  useQueryItemContract,
  useQueryListDoctype,
} from "services/hooks/useHuman";

interface ExperienceAppointmentProps {
  title: string;
  defaultValues?: {
    name: string;
    sign: string;
    toDate: string;
    position2: string;
    contract: string;
    factor: number;
    timeMobilize: number;
  };
  onFinish?: (values: any) => void;
  companyID: string;
  contactDocumentID?: string;
}

const ExperienceAppointment: React.FC<ExperienceAppointmentProps> = ({
  defaultValues,
  onFinish,
  title,
  companyID,
  contactDocumentID
}) => {
  const { closeModal } = useModal();
  const { t: i18n } = useTranslation(["human"]);
  const { listContracts } = useQueryItemContract(companyID);
  const { listDoctypes } = useQueryListDoctype({ limit: 50, type: 13 });

  const initialValues = React.useMemo(
    () => ({
      name: "",
      sign: "",
      toDate: "",
      position2: "",
      contract: "",
      factor: "",
      timeMobilize: "",
      ...defaultValues,
    }),
    [defaultValues]
  );

  const handleSubmit = React.useCallback(
    (values) => {
      const formatData = {
        ...values,
        factor: `${values.factor}`,
        timeMobilize: `${values.timeMobilize}`,
        toDate:
          (moment(values.toDate).isValid() && moment(values.toDate).toJSON()) ||
          "",
      };
      if (contactDocumentID) {
        formatData.contactDocumentID = contactDocumentID
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
        <div className="relative w-full h-5/6 bg-primary-light">
          <div className="h-12 flex items-center border-b border-gray-300 px-6">
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
                        {i18n("experience-appointment-name")}
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
                        Số hiệu
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
                          initialValues.toDate &&
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
                        Vị trí công việc đảm nhận
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("position2", value.value)
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
                        initialValue={initialValues?.position2}
                        data={listDoctypes.map((position) => ({
                          label: position.name,
                          value: position._id,
                        }))}
                        formatItem={{
                          text: "label",
                          id: "value",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                  </div>

                  {/* -------------- Line 2 --------------- */}

                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/4 flex items-center">
                      <span className="w-7/12 text-primary-gray text-left">
                        Thuộc hợp đồng
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("contract", value.value)
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
                        initialValue={initialValues?.contract}
                        data={listContracts.map((contract) => ({
                          label: contract.name,
                          value: contract._id,
                        }))}
                        formatItem={{
                          text: "label",
                          id: "value",
                        }}
                        inlineSearch={true}
                      />
                    </div>
                    <div className="w-1/4 flex items-center">
                      <span className="w-6/12 text-primary-gray text-left text-left">
                        Hệ số huy động
                      </span>
                      <Field
                        type="text"
                        name="factor"
                        placeholder="Hệ số huy động..."
                        className="w-full h-6 outline-none"
                        onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/4 flex items-center">
                      <span className="w-7/12 text-primary-gray text-left">
                        Thời gian huy động
                      </span>
                      <Field
                        type="text"
                        name="timeMobilize"
                        placeholder="..."
                        className="w-full h-6 outline-none"
                        onBlur={(e: React.FormEvent<HTMLInputElement>) => {
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

export default ExperienceAppointment;
