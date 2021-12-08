import { FC, FormEvent, useRef } from "react";

import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";

import { RegisterPayload } from "typings/auth";

import CloseIcon from "assets/images/icon-close.svg";
import { useOnClickOutside } from "services/hooks/useOnclickOutside";
import { useAuth } from "services/hooks/useAuth";

type Props = {
  showRegister: boolean;
  handleClickShowRegister: (show: boolean) => void;
};

const RegisterPage: FC<Props> = (props) => {
  const { t } = useTranslation(["register"]);
  const { register } = useAuth();
  const { showRegister, handleClickShowRegister } = props;
  const ref = useRef<HTMLDivElement>(null);

  const handleCloseModal = () => {
    handleClickShowRegister(!showRegister);
  };

  useOnClickOutside(ref, () => handleClickShowRegister(false));

  const initialValues: RegisterPayload = {
    fullName: "",
    companyName: "",
    email: "",
    typeOrg: "",
    phoneNumber: "",
  };

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
          style={{
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="relative p-5"
            ref={ref}
            style={{
              background: "#ffffff",
              width: 600,
            }}
          >
            <div>
              <p
                className="font-bold text-center text-xl pt-4 pb-2"
                style={{ color: "#0060e1" }}
              >
                {t("register:title")}
              </p>
              <img
                className="absolute right-4 top-4 cursor-pointer"
                src={CloseIcon}
                alt="Close"
                onClick={() => handleCloseModal()}
              />
            </div>
            <div>
              <Formik
                initialValues={initialValues}
                validationSchema={registerSchema}
                onSubmit={(values) => register(values)}
              >
                {(formik) => {
                  const { handleBlur } = formik;

                  return (
                    <Form>
                      <div className="p-5">
                        <p
                          className="font-medium text-sm"
                          style={{ color: "#252b37" }}
                        >
                          {t("register:fullName")}
                        </p>
                        <div>
                          <Field
                            type="text"
                            name="fullName"
                            placeholder={t("register:fullNamePlaceholder")}
                            className="w-full p-2 mt-2.5 rounded-sm outline-none"
                            style={{
                              border: "1px solid #e1e5f7",
                              background: "#f5f6fA",
                            }}
                            onBlur={(e: FormEvent<HTMLInputElement>) => {
                              handleBlur(e);
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="fullName"
                          component="span"
                          className="font-normal text-sm text-negative"
                        />
                      </div>

                      <div className="pb-5 pr-5 pl-5">
                        <p
                          className="font-medium text-sm"
                          style={{ color: "#252b37" }}
                        >
                          {t("register:comOrgName")}
                        </p>
                        <div>
                          <Field
                            type="text"
                            name="companyName"
                            placeholder={t("register:comOrgNamePlaceholder")}
                            className="w-full p-2 mt-2.5 rounded-sm outline-none"
                            style={{
                              border: "1px solid #e1e5f7",
                              background: "#f5f6fA",
                            }}
                            onBlur={(e: FormEvent<HTMLInputElement>) => {
                              handleBlur(e);
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="companyName"
                          component="span"
                          className="font-normal text-sm text-negative"
                        />
                      </div>

                      <div className="pb-5 pr-5 pl-5">
                        <p
                          className="font-medium text-sm"
                          style={{ color: "#252b37" }}
                        >
                          {t("register:email")}
                        </p>
                        <div>
                          <Field
                            type="email"
                            name="email"
                            placeholder={t("register:emailPlaceholder")}
                            className="w-full p-2 mt-2.5 rounded-sm outline-none"
                            style={{
                              border: "1px solid #e1e5f7",
                              background: "#f5f6fA",
                            }}
                            onBlur={(e: FormEvent<HTMLInputElement>) => {
                              handleBlur(e);
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="font-normal text-sm text-negative"
                        />
                      </div>

                      <div className="pb-5 pr-5 pl-5">
                        <p
                          className="font-medium text-sm"
                          style={{ color: "#252b37" }}
                        >
                          {t("register:typeOrg")}
                        </p>
                        <div>
                          <Field
                            type="text"
                            name="typeOrg"
                            placeholder={t("register:typeOrgPlaceholder")}
                            className="w-full p-2 mt-2.5 rounded-sm outline-none"
                            style={{
                              border: "1px solid #e1e5f7",
                              background: "#f5f6fA",
                            }}
                            onBlur={(e: FormEvent<HTMLInputElement>) => {
                              handleBlur(e);
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="typeOrg"
                          component="span"
                          className="font-normal text-sm text-negative"
                        />
                      </div>

                      <div className="pr-5 pl-5">
                        <p
                          className="font-medium text-sm"
                          style={{ color: "#252b37" }}
                        >
                          {t("register:phoneNumber")}
                        </p>
                        <div>
                          <Field
                            type="text"
                            name="phoneNumber"
                            placeholder={t("register:phoneNumberPlaceholder")}
                            className="w-full p-2 mt-2.5 rounded-sm outline-none"
                            style={{
                              border: "1px solid #e1e5f7",
                              background: "#f5f6fA",
                            }}
                            onBlur={(e: FormEvent<HTMLInputElement>) => {
                              handleBlur(e);
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="phoneNumber"
                          component="span"
                          className="font-normal text-sm text-negative"
                        />
                      </div>

                      <div className="mt-4 mb-4 pr-5 pl-5">
                        <button
                          type="submit"
                          className="w-full h-12 rounded-sm text-primary-light hover:opacity-90"
                          style={{ background: "#0060E1" }}
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
