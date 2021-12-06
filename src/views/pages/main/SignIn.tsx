import { FC, useState, FormEvent } from "react";

import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { map as _map } from "lodash";
import { Link } from "react-router-dom";

import { useAuth } from "services/hooks/useAuth";
import Loader from "components/shared/Loader";
import { LOCALES } from "assets/contents/authentication";
import SignInLogo from "assets/images/signin-logo.svg";
import SignInImage from "assets/images/signin-image.svg";
import MailIcon from "assets/images/icons-email.svg";
import LockIcon from "assets/images/icons-lock.svg";
import RegisterPage from "./Register";

import { SignInPayload } from "typings/auth";

const LoginPage: FC = () => {
  const { t, i18n } = useTranslation(["signIn"]);
  const { isLoading, signIn } = useAuth();

  const [selectedLocale, setSelectedLocale] = useState(LOCALES[0].id);
  const [showRegister, setShowRegister] = useState(false);

  const initialValues: SignInPayload = {
    email: "",
    password: "",
  };

  const signInSchema = object().shape({
    email: string()
      .email("* Please enter valid email address")
      .required("* Email required!"),
    password: string()
      .min(7, "* Password must be at least 8 characters")
      .max(25, "* Password too large (25 characters max)")
      .required("* Password required!"),
  });

  const fontFamily = "Arial";
  const textGray = "#757c8a";
  const backgroundBlue = "#0060e1";
  const borderGray = "#cccccc";

  const handleClickShowRegister = () => setShowRegister(!showRegister);

  return (
    <>
      {isLoading && <Loader className="border-primary" />}
      <section className="flex h-full w-full">
        <div className="w-7/12">
          <div className="flex justify-center mt-20 mb-12">
            <img src={SignInLogo} alt="SignIn" />
          </div>
          <div className="max-w-xl ml-72">
            <h1 style={{ fontFamily }} className="font-bold text-4xl">
              {t("signIn:title")}
            </h1>

            <p className="text-base text-primary-gray mt-5">
              {t("signIn:description")}
            </p>
          </div>

          <div className="mt-14">
            <Formik
              initialValues={initialValues}
              validationSchema={signInSchema}
              onSubmit={(values) => {
                signIn(values);
              }}
            >
              {(formik) => {
                const { handleBlur } = formik;

                return (
                  <Form>
                    <div className="relative max-w-md ml-72">
                      <p style={{ fontSize: "1.063rem", color: textGray }}>
                        {t("signIn:email")}
                      </p>
                      <Field
                        type="text"
                        name="email"
                        placeholder={t("signIn:emailPlaceholder")}
                        className="h-12 w-full outline-none mb-3"
                        style={{ borderBottom: `1px solid ${borderGray}` }}
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />
                      <div className="absolute top-9 -right-4 flex border border-transparent w-10">
                        <div className="flex items-center justify-center">
                          <img src={MailIcon} alt="Mail Icon" />
                        </div>
                      </div>

                      <ErrorMessage
                        name="email"
                        component="span"
                        className="font-normal text-sm text-negative italic"
                      />
                    </div>

                    <div className="relative max-w-md ml-72 mt-5">
                      <p style={{ fontSize: "1.063rem", color: textGray }}>
                        {t("signIn:password")}
                      </p>
                      <Field
                        type="password"
                        name="password"
                        placeholder={t("signIn:passwordPlaceholder")}
                        style={{ borderBottom: `1px solid ${borderGray}` }}
                        className="h-12 w-full outline-none mb-3"
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                        }}
                      />

                      <div className="absolute top-9 -right-4 flex border border-transparent w-10">
                        <div className="flex items-center justify-center">
                          <img
                            src={LockIcon}
                            className="text-negative"
                            alt="Password Icon"
                          />
                        </div>
                      </div>

                      <ErrorMessage
                        name="password"
                        component="span"
                        className="font-normal text-sm text-negative italic"
                      />
                    </div>

                    <div className="flex justify-between max-w-md ml-72 mt-14">
                      <div>
                        <span style={{ color: textGray }}>
                          {t("signIn:registerQuestion")}{" "}
                        </span>
                        <span
                          className="uppercase text-secondary cursor-pointer"
                          onClick={() => handleClickShowRegister()}
                        >
                          {t("signIn:register")}
                        </span>
                        <RegisterPage
                          showRegister={showRegister}
                          handleClickShowRegister={handleClickShowRegister}
                        />
                      </div>
                      <Link to="/authentication/reset-password">
                        <p className="text-secondary">
                          {t("signIn:forgotPassword")}
                        </p>
                      </Link>
                    </div>

                    <div className="flex justify-between max-w-md ml-72 mt-14">
                      <button
                        type="submit"
                        className="w-56 h-14 rounded-lg text-primary-light hover:opacity-90"
                        style={{ background: backgroundBlue }}
                      >
                        {t("signIn:submitButton")}
                      </button>

                      <div className="flex justify-end">
                        {_map(LOCALES, (locale, idx: number) => (
                          <span
                            key={locale.id}
                            className="flex items-center cursor-pointer select-none hover:opacity-80"
                            onClick={() => {
                              setSelectedLocale(locale.id);
                              i18n.changeLanguage(locale.code);
                            }}
                          >
                            {selectedLocale !== locale.id && locale.flag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>

        <div className="w-5/12 z-0" style={{ background: backgroundBlue }}>
          <div className="relative">
            <img
              className="object-fill max-h-screen"
              src={SignInImage}
              alt="Logo"
            />

            <div className="absolute top-1/3 max-w-md ml-52">
              <p
                style={{ fontFamily }}
                className="font-bold text-5xl leading-tight text-primary-light"
              >
                {t("signIn:target")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
