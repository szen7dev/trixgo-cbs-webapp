import React from "react";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import CloseIcon from "assets/images/icon-small-bold-close.svg";
import { useModal } from "services/hooks/useModal";
interface FormCertificateProps {
  title: string;
  defaultValues?: {
    name: string; // nội dung
    fromDate: string; // ngày tháng
    note: string; // ghi chú
  };
  onFinish?: (values: any) => void;
  contactDocumentID?: string;
}

export const FormReview: React.FC<FormCertificateProps> = ({
  defaultValues,
  onFinish,
  title,
  contactDocumentID,
}) => {
  const { closeModal } = useModal();
  const { t: i18n } = useTranslation(["human"]);
  const initialValues: any = React.useMemo(
    () => ({
      name: "", // nội dung
      fromDate: "", // ngày tháng
      note: "", // ghi chú
      ...defaultValues,
    }),
    [defaultValues]
  );

  const handleSubmit = React.useCallback(
    (values) => {
      const formatData = {
        ...values,
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
              const { handleBlur, setFieldValue, values } = formik;

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
                        Ngày tháng
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
                        placeholderText="Ngày tháng..."
                        className="w-full h-6 outline-none pl-10 focus:outline-none focus:border-primary"
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