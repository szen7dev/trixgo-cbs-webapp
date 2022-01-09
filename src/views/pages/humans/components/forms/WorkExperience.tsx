import React from "react";
import { Formik, Form, Field } from "formik";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { useTranslation } from "react-i18next";
import debounce from 'lodash/debounce';

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import TagIcon from "assets/images/icons8-price-tag-96.svg";
import { useModal } from "services/hooks/useModal";
import DropdownSearchable from "components/common/DropdownSearch";
import {
  useQueryListDoctype,
  useQueryItemContract
} from "services/hooks/useHuman";

interface WorkExperienceProps {
  defaultValues?: {
    fromDate: string; // từ ngày
    toDate: string; // đến ngày
    field2: string; // lĩnh vực chuyên môn tham gia
    position2: string; // vị trí công việc đảm nhận
    contract: string; // hợp đồng
    project: string; // dự án
    client: string; // chủ đầu tư
  };
  onFinish?: (values: any) => void;
  contactDocumentID?: string;
  companyID: string;
  title: string;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({
  defaultValues,
  onFinish,
  contactDocumentID,
  companyID,
  title
}) => {
  const [searchPositionValue, setSearchPositionValue] = React.useState('');
  const [searchFieldValue, setSearchFieldValue] = React.useState('');
  const [searchContract, setSearchContractValue] = React.useState('');
  
  const { closeModal } = useModal();
  const { t: i18n } = useTranslation(["human"]);
  const { listDoctypes: listPositions } = useQueryListDoctype({ 
    limit: 50,
    type: 13,
    keyword: searchPositionValue,
  });
  const { listDoctypes: listField2 } = useQueryListDoctype({
    limit: 50,
    type: 7,
    keyword: searchFieldValue,
  });
  const { listContracts } = useQueryItemContract(companyID, {
    keyword: searchContract
  })

  const initialValues = React.useMemo(
    () => ({
      fromDate: "",
      toDate: "",
      field2: "",
      position2: "",
      contract: "",
      project: "",
      client: "",
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
                <Form>
                  {/* -------------- Line 1 --------------- */}
                  <div className="flex justify-between items-center h-10 border-b border-gray-200">
                    <div className="w-1/4 flex items-center">
                      <span className="w-4/12 text-primary-gray text-left">
                        {i18n("from-date")}
                      </span>
                      <DayPickerInput
                        value={
                          initialValues.fromDate &&
                          moment(initialValues.fromDate).format("DD/MM/YYYY")
                        }
                        onDayChange={(day) => setFieldValue("fromDate", day)}
                        inputProps={{
                          className: "w-full h-6 outline-none pl-3",
                          placeholder: "Từ ngày...",
                        }}
                      />
                    </div>
                    <div className="w-1/4 flex items-center">
                      <span className="w-4/12 text-primary-gray text-left">
                        {i18n("to-date")}
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
                      <span className="w-7/12 text-primary-gray text-left">
                        Lĩnh vực chuyên môn tham gia
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("field2", value.value)
                        }
                        onSearchInputChange={debounce(value => setSearchFieldValue(value), 1000)}
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
                        data={listField2.map((field2) => ({
                          label: field2.name,
                          value: field2._id,
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
                        Vị trí công việc đảm nhận
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("position2", value.value)
                        }
                        onSearchInputChange={debounce(value => setSearchPositionValue(value), 1000)}
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
                        data={listPositions.map((position) => ({
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
                      <span className="w-6/12 text-primary-gray text-leftt">
                        Hợp đồng
                      </span>
                      <DropdownSearchable
                        onchangeValue={(value) =>
                          setFieldValue("contract", value.value)
                        }
                        onSearchInputChange={debounce(value => setSearchContractValue(value), 1000)}
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
                      <span className="w-6/12 text-primary-gray text-leftt">
                        Dự án
                      </span>
                      <Field
                        type="text"
                        name="project"
                        placeholder="Thông tin người tham chiếu..."
                        className="w-full h-6 outline-none"
                        onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                    </div>
                    <div className="w-1/4 flex items-center">
                      <span className="w-6/12 text-primary-gray text-leftt">
                        Chủ đầu tư
                      </span>
                      <Field
                        type="text"
                        name="client"
                        placeholder="Thông tin người tham chiếu..."
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

export default WorkExperience;
