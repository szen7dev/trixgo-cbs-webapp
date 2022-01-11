import React from "react";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { useTranslation } from "react-i18next";
import debounce from 'lodash/debounce';

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import { useModal } from "services/hooks/useModal";
import DropdownSearchable from "components/common/DropdownSearch";
import TagIcon from "assets/images/icons8-price-tag-96.svg";
import { useQueryListDoctype } from "services/hooks/useHuman";

interface WorkHistoryProps {
  title: string;
  defaultValues?: {
    workplace: string;
    toDate: string; 
    educationalBackground2: string;
    field2: string;
  };
  onFinish?: (values: any) => void;
  contactDocumentID?: string;
}

const WorkHistory: React.FC<WorkHistoryProps> = ({
  defaultValues,
  onFinish,
  contactDocumentID,
  title
}) => {
  const [searchWorkplace, setSearchWorkplaceValue] = React.useState('');
  const [searchEducationBackground, setSearchEducationBackground] = React.useState('');

  const { closeModal } = useModal();
  const { t: i18n } = useTranslation(["human"]);
  const { listDoctypes: listEducationalBackground } = useQueryListDoctype({
    limit: 50,
    type: 6,
    keyword: searchEducationBackground
  });
  const { listDoctypes: listWorkplace } = useQueryListDoctype({
    limit: 50,
    type: 7,
    keyword: searchWorkplace,
  });

  const initialValues = React.useMemo(
    () => ({
      workplace: "", // nơi đào tạo
      toDate: "", // năm tốt nghiệp
      educationalBackground2: "", // trình độ
      field2: "", // chuyên ngành
      ...defaultValues,
    }),
    [defaultValues]
  );

  const handleSubmit = React.useCallback(
    (values) => {
      const formatData = {
        ...values,
        fromDate:
          (moment(values.fromDate).isValid() &&
            moment(values.fromDate).toJSON()) ||
          "",
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
                <Form className="flex justify-between items-center h-10 border-b border-gray-200">
                  <div className="w-1/4 flex items-center">
                    <span className="w-4/12 text-primary-gray text-left">
                      {i18n("workplace2")}
                    </span>
                    <Field
                      type="text"
                      name="workplace"
                      placeholder="Nơi đào tạo..."
                      className="w-full h-6 outline-none"
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        handleBlur(e);
                      }}
                    />
                  </div>
                  <div className="w-1/4 flex items-center">
                    <span className="w-4/12 text-primary-gray text-left">
                      {i18n("Graduation-year")}
                    </span>
                    <DayPickerInput
                      value={
                        initialValues.toDate &&
                        moment(initialValues.toDate).format("DD/MM/YYYY")
                      }
                      onDayChange={(day) => setFieldValue("toDate", day)}
                      inputProps={{
                        className: "w-full h-6 outline-none pl-3",
                        placeholder: "Đến ngày...",
                      }}
                    />
                  </div>
                  <div className="w-1/4 flex items-center">
                    <span className="w-6/12 text-primary-gray text-left">
                      {i18n("educationalBackground")}
                    </span>
                    <DropdownSearchable
                      onchangeValue={(value) =>
                        setFieldValue("educationalBackground2", value.value)
                      }
                      onSearchInputChange={debounce(value => setSearchEducationBackground(value), 1000)}
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
                      initialValue={initialValues?.educationalBackground2}
                      data={listEducationalBackground.map(educationalBackground => ({
                        label: educationalBackground.name,
                        value: educationalBackground._id,
                      }))}
                      formatItem={{
                        text: "label",
                        id: "value",
                      }}
                      inlineSearch={true}
                    />
                  </div>
                  <div className="w-1/4 flex items-center">
                    <span className="w-6/12 text-primary-gray text-left">
                      {i18n("workplace")}
                    </span>
                    <DropdownSearchable
                      onchangeValue={(value) =>
                        setFieldValue("field2", value.value)
                      }
                      onSearchInputChange={debounce(value => setSearchWorkplaceValue(value), 1000)}
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
                      initialValue={initialValues?.field2}
                      data={listWorkplace.map(workplace => ({
                        label: workplace.name,
                        value: workplace._id,
                      }))}
                      formatItem={{
                        text: "label",
                        id: "value",
                      }}
                      inlineSearch={true}
                    />
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

export default WorkHistory;
