import React from "react";
import { Formik, Form, Field } from "formik";
import moment from "moment";
// import DayPickerInput from "react-day-picker/DayPickerInput";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import { useModal } from "services/hooks/useModal";

interface WorkHistoryProps {
  defaultValues?: {
    fromDate: string;
    toDate: string;
    workplace: string;
    reference: string;
  };
  onFinish?: (values: any) => void;
  contactDocumentID?: string;
  title: string;
}

export const FormWorkHistory: React.FC<WorkHistoryProps> = ({
  defaultValues,
  onFinish,
  contactDocumentID,
  title
}) => {
  const { closeModal } = useModal();
  const { t: i18n } = useTranslation(["human"]);

  const initialValues = React.useMemo(() => ({
    fromDate: '',
    toDate: '',
    workplace: '',
    reference: '',
    ...defaultValues
  }), [defaultValues]);

  const handleSubmit = React.useCallback((values) => {
    const formatData = {
      ...values,
      fromDate: moment(values.fromDate).isValid() && moment(values.fromDate).toJSON() || '',
      toDate: moment(values.toDate).isValid() && moment(values.toDate).toJSON() || '',
    }
    if (contactDocumentID) {
      formatData.contactDocumentID = contactDocumentID
    }
    if (onFinish) {
      onFinish(formatData);
    }
  }, [contactDocumentID, onFinish]);

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
              onClick={closeModal}
            />
          </div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(formik) => {
              const { handleBlur, setFieldValue, values } = formik;

              return (
                <Form className='flex justify-between items-center h-10 border-b border-gray-200'>
                  <div className="w-1/6 flex items-center">
                    <span className="w-4/12 text-primary-gray text-left">
                      {i18n("from-date")}
                    </span>
                    <DatePicker
                      name="fromDate"
                      selected={
                        values.fromDate
                          ? new Date(values.fromDate)
                          : initialValues.fromDate ? new Date(initialValues.fromDate) : null}
                      onChange={(date: Date | null) => setFieldValue("fromDate", date)}
                      onSelect={(date: Date | null) => setFieldValue("fromDate", date)}
                      isClearable={false}
                      closeOnScroll
                      autoComplete="off"
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Từ ngày..."
                      className="w-full h-6 pl-3 outline-none focus:outline-none focus:border-primary"
                    />
                    {/* <DayPickerInput
                      value={
                        initialValues.fromDate &&
                        moment(initialValues.fromDate).format("DD/MM/YYYY")
                      }
                      onDayChange={(day) => setFieldValue("fromDate", day)}
                      inputProps={{
                        className: "w-full h-6 outline-none pl-3",
                        placeholder: "Từ ngày...",
                      }}
                    /> */}
                  </div>
                  <div className="w-1/6 flex items-center">
                    <span className="w-4/12 text-primary-gray text-left">
                      {i18n("to-date")}
                    </span>
                    <DatePicker
                      name="toDate"
                      selected={
                        values.toDate
                          ? new Date(values.toDate)
                          : initialValues.toDate ? new Date(initialValues.toDate) : null}
                      onChange={(date: Date | null) => setFieldValue("toDate", date)}
                      onSelect={(date: Date | null) => setFieldValue("toDate", date)}
                      isClearable={false}
                      closeOnScroll
                      autoComplete="off"
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Đến ngày..."
                      className="w-full h-6 pl-3 outline-none focus:outline-none focus:border-primary"
                    />
                    {/* <DayPickerInput
                      value={
                        initialValues.toDate &&
                        moment(initialValues.toDate).format("DD/MM/YYYY")
                      }
                      onDayChange={(day) => setFieldValue("toDate", day)}
                      inputProps={{
                        className: "w-full h-6 outline-none pl-3",
                        placeholder: "Đến ngày...",
                      }}
                    /> */}
                  </div>
                  <div className="w-2/6 flex items-center">
                    <span className="w-6/12 text-primary-gray text-left">
                      {i18n('history-workplace')}
                    </span>
                    <Field
                      type="text"
                      name="workplace"
                      placeholder="Tên cơ quan đơn vị công tác..."
                      className="w-full h-6 outline-none"
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        handleBlur(e);
                      }}
                    />
                  </div>
                  <div className="w-2/6 flex items-center">
                    <span className="w-6/12 text-primary-gray text-left">
                      {i18n('reference-info')}
                    </span>
                    <Field
                      type="text"
                      name="reference"
                      placeholder="Thông tin người tham chiếu..."
                      className="w-full h-6 outline-none"
                      onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        handleBlur(e);
                      }}
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