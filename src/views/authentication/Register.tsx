import { FC, FormEvent, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";

import { useOnClickOutside } from "services/hooks/useOnclickOutside";

import CloseIcon from "assets/images/icon-close.svg";
import ExpandIcon from "assets/images/icon-expand-arrow.svg";
import TagIcon from "assets/images/icons8-price-tag.svg";

import "styles/common.css";

type Props = {
  showRegister: boolean;
  handleClickShowRegister: (show: boolean) => void;
};

const RegisterPage: FC<Props> = (props) => {
  const [openSelect, setOpenSelect] = useState(false);
  const { t } = useTranslation(["register"]);
  const { showRegister, handleClickShowRegister } = props;
  const optionRef = useRef<HTMLDivElement>(null);

  const initialValues = {
    fullName: "",
    comOrgName: "",
    email: "",
    typeOrg: "",
    phoneNumber: "",
    description: "",
  };

  useOnClickOutside(optionRef, () => setOpenSelect(!openSelect));

  const registerSchema = object().shape({
    fullName: string().required("First and last name required!"),
    companyName: string().required("Name of company/organization required!"),
    email: string()
      .email("Please enter valid email address")
      .required("Email required!"),
    typeOrg: string().required("Type of business/organization required!"),
    phoneNumber: string().required("Phone number required!"),
  });

  return (
    <div>
      {showRegister ? (
        <section
          className="fixed flex justify-center items-center inset-0 z-10"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="relative p-5 bg-primary-light" style={{ width: 600 }}>
            <div>
              <p className="font-bold text-center text-primary text-xl pt-4 pb-2">
                {t("register:title")}
              </p>
              <img
                className="absolute right-4 top-4 cursor-pointer"
                src={CloseIcon}
                alt="Close"
                onClick={() => handleClickShowRegister(!showRegister)}
              />
            </div>
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={registerSchema}
                onSubmit={(values) => console.log(values)}
              >
                {(formik) => {
                  const { handleBlur, handleChange, setFieldValue } = formik;

                  return (
                    <Form>
                      <div className="p-5">
                        <p className="font-medium text-sm">
                          {t("register:fullName")}
                        </p>
                        <Field
                          type="text"
                          name="fullName"
                          placeholder={t("register:fullNamePlaceholder")}
                          className="w-full p-2 mt-2.5 rounded-sm border border-secondary-light bg-secondary-light outline-none"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                        <ErrorMessage
                          name="fullName"
                          component="span"
                          className="font-normal text-sm text-negative"
                        />
                      </div>

                      <div className="pb-5 pr-5 pl-5">
                        <p className="font-medium text-sm">
                          {t("register:comOrgName")}
                        </p>
                        <div className="relative">
                          <Field
                            name="comOrgName"
                            placeholder={t("register:comOrgNamePlaceholder")}
                            className="w-full p-2 mt-2.5 rounded-sm border border-secondary-light bg-secondary-light outline-none"
                            onClick={() => setOpenSelect(!openSelect)}
                          />
                          <img
                            src={ExpandIcon}
                            alt="Expand"
                            className="absolute top-6 right-5"
                          />

                          {openSelect && (
                            <div
                              ref={optionRef}
                              className="absolute w-full bg-primary-light rounded-sm shadow-lg py-2"
                            >
                              <div>
                                <Field
                                  type="text"
                                  name="typeOrg"
                                  placeholder="Search here"
                                  className="h-12 w-full flex items-center px-5 outline-none"
                                />
                              </div>
                              <div
                                className="h-12 flex items-center px-5 cursor-pointer hover:bg-accent-light"
                                onClick={() => {
                                  setOpenSelect(!openSelect);
                                  setFieldValue(
                                    "comOrgName",
                                    "Đại học xây dựng Hà Nội"
                                  );
                                }}
                              >
                                <img src={TagIcon} alt="Tag" className="mr-5" />
                                <span>Đại học xây dựng Hà Nội</span>
                              </div>
                              <div
                                className="h-12 flex items-center px-5 cursor-pointer hover:bg-accent-light"
                                onClick={() => {
                                  setOpenSelect(!openSelect);
                                  setFieldValue(
                                    "comOrgName",
                                    "Kết quả trả về 2"
                                  );
                                }}
                              >
                                <img src={TagIcon} alt="Tag" className="mr-5" />
                                <span>Kết quả trả về 2</span>
                              </div>
                              <div
                                className="h-12 flex items-center px-5 cursor-pointer hover:bg-accent-light"
                                onClick={() => {
                                  setOpenSelect(!openSelect);
                                  setFieldValue(
                                    "comOrgName",
                                    "Kết quả trả về 3"
                                  );
                                }}
                              >
                                <img src={TagIcon} alt="Tag" className="mr-5" />
                                <span>Kết quả trả về 3</span>
                              </div>
                              <div
                                className="h-12 flex items-center px-5 cursor-pointer hover:bg-accent-light"
                                onClick={() => {
                                  setOpenSelect(!openSelect);
                                  setFieldValue(
                                    "comOrgName",
                                    "Kết quả trả về 4"
                                  );
                                }}
                              >
                                <img src={TagIcon} alt="Tag" className="mr-5" />
                                <span>Kết quả trả về 4</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <ErrorMessage
                          name="typeOrg"
                          component="span"
                          className="font-normal text-sm text-negative"
                        />
                      </div>

                      <div className="pb-5 pr-5 pl-5">
                        <p className="font-medium text-sm">
                          {t("register:typeOrg")}
                        </p>
                        <div className="grid grid-cols-2 gap-3 mt-2.5">
                          <label className="flex items-center">
                            <Field
                              type="radio"
                              name="typeOrg"
                              value="Doanh nghiệp"
                              className="w-6 h-6 mr-4 cursor-pointer"
                            />
                            <span>Doanh nghiệp</span>
                          </label>
                          <div className="flex items-center">
                            <Field
                              type="radio"
                              name="typeOrg"
                              value="Sinh viên"
                              className="w-6 h-6 mr-4 cursor-pointer"
                            />
                            <span>Sinh viên</span>
                          </div>
                          <label className="flex items-center">
                            <Field
                              type="radio"
                              name="typeOrg"
                              value="Tổ chức hành chính công"
                              className="w-6 h-6 mr-4 cursor-pointer checked:bg-primary"
                            />
                            <span>Tổ chức hành chính công</span>
                          </label>
                          <div className="flex items-center">
                            <Field
                              type="radio"
                              name="typeOrg"
                              value="Khác"
                              className="w-6 h-6 mr-4 cursor-pointer text-primary"
                            />
                            <span>Khác</span>
                          </div>
                        </div>
                        <ErrorMessage
                          name="typeOrg"
                          component="span"
                          className="font-normal text-sm text-negative"
                        />
                      </div>

                      <div className="pb-5 pr-5 pl-5">
                        <p className="font-medium text-sm">
                          {t("register:email")}
                        </p>
                        <Field
                          type="email"
                          name="email"
                          placeholder={t("register:emailPlaceholder")}
                          className="w-full p-2 mt-2.5 rounded-sm border border-secondary-light bg-secondary-light outline-none"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="font-normal text-sm text-negative"
                        />
                      </div>

                      <div className="pb-5 pr-5 pl-5">
                        <p className="font-medium text-sm">
                          {t("register:phoneNumber")}
                        </p>
                        <Field
                          type="text"
                          name="phoneNumber"
                          placeholder={t("register:phoneNumberPlaceholder")}
                          className="w-full p-2 mt-2.5 rounded-sm border border-secondary-light bg-secondary-light outline-none"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="span"
                          className="font-normal text-sm text-negative"
                        />
                      </div>

                      <div className="pr-5 pl-5">
                        <p className="font-medium text-sm">
                          {t("register:description")}
                        </p>
                        <textarea
                          name="description"
                          className="w-full p-2 mt-2.5 rounded-sm border border-secondary-light bg-secondary-light outline-none"
                          rows={4}
                          placeholder={t("register:descriptionPlachoher")}
                          onChange={(e: FormEvent<HTMLTextAreaElement>) => {
                            handleChange(e);
                          }}
                        ></textarea>
                      </div>

                      <div className="mt-4 mb-4 pr-5 pl-5">
                        <button
                          type="submit"
                          className="w-full h-12 rounded-sm bg-primary text-primary-light hover:opacity-90"
                        >
                          {t("register:submit")}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default RegisterPage;
