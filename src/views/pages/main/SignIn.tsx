import { FC, useState, FormEvent } from "react";

import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import cn from "classnames";
import { map as _map } from "lodash";

import { useAuth } from "services/hooks/useAuth";

import Loader from "components/shared/Loader";
import WhiteLogoImage from "assets/images/white-logo.png";
import MailIcon from "assets/icons/Mail";
import MailOpenIcon from "assets/icons/MailOpen";
import LockClosedIcon from "assets/icons/LockClosed";
import LockOpenIcon from "assets/icons/LockOpen";
import { LOCALES } from "assets/contents/authentication";

import { SignInPayload } from "typings/auth";

const SignInPage: FC = () => {
  const { t, i18n } = useTranslation(["signIn"]);
  const { isLoading, signIn } = useAuth();

  const [selectedLocale, setSelectedLocale] = useState(LOCALES[0].id);
  const [activeField, setActiveField] = useState("");

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

  return (
    <>
      {isLoading && <Loader className="border-primary" />}
      <div className="grid grid-cols-2 w-[1000px] bg-primary-light rounded-lg shadow-2xl">
        <div className="relative bg-authentication-img bg-cover bg-no-repeat w-[500px] h-[650px]">
          <img src={WhiteLogoImage} alt="Logo" className="mt-7" />

          <p className="absolute bottom-20 font-medium text-base leading-5 text-primary-light px-8">
            {t("signIn:target")}
          </p>
        </div>

        <div className="flex flex-col py-8 pr-8 pl-16">
          <div className="flex justify-end">
            {_map(LOCALES, (locale, idx: number) => (
              <span
                key={locale.id}
                className="flex items-center cursor-pointer ml-3"
                onClick={() => {
                  setSelectedLocale(locale.id);
                  i18n.changeLanguage(locale.code);
                }}
              >
                {selectedLocale === locale.id ? locale.flag : locale.grayFlag}{" "}
                <strong
                  className={cn("uppercase text-lg ml-2", {
                    "border-r-2 border-solid border-secondary-gray":
                      idx !== LOCALES.length - 1,
                    "text-accent-gray": selectedLocale === locale.id,
                    "text-secondary-gray": selectedLocale !== locale.id,
                    "pr-3": idx !== LOCALES.length - 1,
                  })}
                >
                  {locale.code}
                </strong>
              </span>
            ))}
          </div>

          <h1 className="font-semibold text-3xl leading-8 text-accent-gray mt-10">
            {t("signIn:title")}
          </h1>

          <p className="font-medium text-base text-accent-gray mt-3">
            {t("signIn:description")}
          </p>

          <div className="mt-14">
            <Formik
              initialValues={initialValues}
              validationSchema={signInSchema}
              onSubmit={(values) => {
                signIn(values);
              }}
            >
              {(formik) => {
                const { errors, touched, isValid, dirty, handleBlur } = formik;

                return (
                  <Form>
                    <div className="relative">
                      <div className="absolute top-3 left-1 flex border border-transparent w-10">
                        <div className="flex items-center justify-center rounded-tl rounded-bl z-10 text-accent-gray text-lg h-full w-full">
                          {activeField === "email" ? (
                            <MailOpenIcon
                              className={cn("w-6 h-6", {
                                "text-negative": errors.email && touched.email,
                              })}
                            />
                          ) : (
                            <MailIcon
                              className={cn("w-6 h-6", {
                                "text-negative": errors.email && touched.email,
                              })}
                            />
                          )}
                        </div>
                      </div>
                      <Field
                        type="text"
                        name="email"
                        placeholder={t("signIn:emailPlaceholder")}
                        className={cn("form-input mb-3", {
                          "input-error": errors.email && touched.email,
                        })}
                        onFocus={(e: FormEvent<HTMLInputElement>) =>
                          setActiveField((e.target as HTMLInputElement).name)
                        }
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                          setActiveField("");
                        }}
                      />
                      <ErrorMessage
                        name="email"
                        component="span"
                        className="font-normal text-sm text-negative italic"
                      />
                    </div>

                    <div className="relative mt-5">
                      <div className="absolute top-3 left-1 flex border border-transparent w-10">
                        <div className="flex items-center justify-center rounded-tl rounded-bl z-10 text-accent-gray text-lg h-full w-full">
                          {activeField === "password" ? (
                            <LockOpenIcon
                              className={cn("w-6 h-6", {
                                "text-negative":
                                  errors.password && touched.password,
                              })}
                            />
                          ) : (
                            <LockClosedIcon
                              className={cn("w-6 h-6", {
                                "text-negative":
                                  errors.password && touched.password,
                              })}
                            />
                          )}
                        </div>
                      </div>
                      <Field
                        type="password"
                        name="password"
                        placeholder={t("signIn:passwordPlaceholder")}
                        className={cn("form-input mb-3", {
                          "input-error": errors.password && touched.password,
                        })}
                        onFocus={(e: FormEvent<HTMLInputElement>) =>
                          setActiveField((e.target as HTMLInputElement).name)
                        }
                        onBlur={(e: FormEvent<HTMLInputElement>) => {
                          handleBlur(e);
                          setActiveField("");
                        }}
                      />
                      <ErrorMessage
                        name="password"
                        component="span"
                        className="font-normal text-sm text-negative italic"
                      />
                    </div>

                    <div className="flex justify-between items-center mt-14">
                      <a
                        href="/authentication/register"
                        className="font-semibold text-base text-primary hover:text-secondary hover:underline"
                      >
                        {t("signIn:register")}
                      </a>
                      <button
                        type="submit"
                        disabled={!(dirty && isValid)}
                        className={cn("medium-button", {
                          "disabled-button": !(dirty && isValid),
                          "primary-button": dirty && isValid,
                        })}
                      >
                        {t("signIn:submitButton")}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
