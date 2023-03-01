import { FC, useState, FormEvent } from "react";

import { useTranslation } from "react-i18next";
import i18n from 'i18next';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { map as _map } from "lodash";
import { Link } from "react-router-dom";

import { useAuth } from "services/hooks/auth/useAuth";
import { SignInPayload } from "typings/auth";

import { Loader } from "shareComponents/common";
import RegisterPage from "./Register";

// import SignInLogo from "assets/images/signin-logo.svg";
import SignInImage from "assets/images/signin-image.svg";
import MailIcon from "assets/images/icons-email.svg";
import LockIcon from "assets/images/icons-lock.svg";

import USFlagIcon from "assets/icons/USFlag";
import VNFlagIcon from "assets/icons/VNFlag";
import VNFlagGrayIcon from "assets/icons/VNFlagGray";
import USFlagGrayIcon from "assets/icons/USFlagGray";

import { Locale } from "typings/common";

const LOCALES: Locale[] = [
  {
    id: "en-locale",
    code: "en",
    name: "english",
    flag: <VNFlagIcon className="w-8 h-8" />,
    grayFlag: <VNFlagGrayIcon className="w-8 h-8" />,
  },
  {
    id: "vn-locale",
    code: "vn",
    name: "vietnamese",
    flag: <USFlagIcon className="w-8 h-8" />,
    grayFlag: <USFlagGrayIcon className="w-8 h-8" />,
  },
];

const LoginPage: FC = () => {
  const { t } = useTranslation(["signIn"]);
  const { isLoading, signIn } = useAuth();

  const [selectedLocale, setSelectedLocale] = useState(LOCALES[1].id);
  const [showRegister, setShowRegister] = useState(false);

  const initialValues: SignInPayload = {
    email: "",
    password: "",
    platform: process.env.REACT_APP_PLATFORM ?? "1",
    domain: process.env.REACT_APP_DOMAIN ?? ""
  };

  const signInSchema = object().shape({
    email: string()
      .email("* Email không hợp lệ")
      .required("* Email bắt buộc!"),
    password: string()
      .required("* Password bắt buộc!"),
  });

  const handleClickShowRegister = () => setShowRegister(!showRegister);

  return (
    <>
      {isLoading && <Loader className="border-primary" />}
      <section className="flex min-h-full w-full">
        <div className="w-7/12 flex justify-center items-center">
          <div className="w-3/5 ml-10 mt-8 my-16">
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
                    {/* <div className="flex justify-center">
                      <img src={SignInLogo} alt="SignIn" />
                    </div> */}
                    <div className="mt-12">
                      <h1 className="font-bold text-4xl">
                        {/* Cú pháp signIn:<tên biến>*/}
                        {t("signIn:title")}  
                      </h1>

                      <p className="text-base text-primary-gray mt-4 mb-8">
                        {t("signIn:description")}
                      </p>
                    </div>

                    <div className="max-w-lg">
                      <div className="relative">
                        <p>{t("signIn:email")}</p>
                        <Field
                          type="text"
                          name="email"
                          placeholder={t("signIn:emailPlaceholder")}
                          className="h-12 w-full outline-none mb-3 border-b border-gray-300"
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

                      <div className="relative max-w-lg mt-5">
                        <p>{t("signIn:password")}</p>
                        <Field
                          type="password"
                          name="password"
                          placeholder={t("signIn:passwordPlaceholder")}
                          className="h-12 w-full outline-none mb-3 border-b border-gray-300"
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
                    </div>

                    <div className="flex justify-between max-w-lg mt-14">
                      {/* <div>
                        <span className="text-secondary-gray">
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
                      </div> */}
                      <Link to="/authentication/reset-password">
                        <p className="text-secondary">
                          {t("signIn:forgotPassword")}
                        </p>
                      </Link>
                    </div>

                    <div className="flex justify-between max-w-lg mt-14">
                      <button
                        type="submit"
                        className="w-56 h-14 rounded-lg text-primary-light bg-primary hover:opacity-90"
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

        <div className="w-5/12 z-0 bg-primary">
          <div className="relative h-full">
            <img
              className="object-fill h-screen w-full"
              src={SignInImage}
              alt="Logo"
            />

            <div className="absolute top-0 mx-44 md:mx-20 lg:mx-24 xl:mx-32 2xl:mx-44 bottom-0 flex items-center">
              <p className="font-bold text-5xl max-w-md leading-tight text-primary-light">
                {t("signIn:target")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage