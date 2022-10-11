import { FC, FormEvent, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import cn from "classnames";

import UserRepository from "apis/user";

import SignInImage from "assets/images/signin-image.svg";
import BackIcon from "assets/images/icon-back.svg";
import MailIcon from "assets/images/icon-email-open.svg";
import ResendIcon from "assets/images/icon-resend.svg";
import EyeCloseIcon from "assets/images/icon-eye-close.svg";
import EyeOpenIcon from "assets/images/icon-eye-open.svg";

import "styles/common.css";
import { toast } from "react-toastify";

const step = {
  step1: "stepResetPassword",
  step2: "stepCheckMail",
  step3: "stepCreatePassword",
};

const ResetPasswordPage: FC = () => {
  const [currentStep, setCurrentStep] = useState("stepResetPassword");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { t } = useTranslation(["signIn", "resetPassword"]);
  const history = useHistory();

  const { step1, step2, step3 } = step;

  const initialValues = {
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema =
    currentStep === step1
      ? Yup.object({
          email: Yup.string()
            .email("Please enter valid email address")
            .required("Email required!"),
        })
      : currentStep === step2
      ? Yup.object({
          otp: Yup.string()
            .matches(/^[0-9]+$/, "OTP must be a number")
            .min(6, "Minimum of 6 characters")
            .max(6, "Maximum of 6 characters")
            .required("OTP required!"),
        })
      : currentStep === step3 &&
        Yup.object({
          password: Yup.string()
            .min(8, "Minimum of 8 characters")
            .required("Password Required!"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "The two passwords do not match")
            .required("Confirm password required!"),
        });

  const handleSubmit = async (values: any) => {
    const { email, otp, confirmPassword } = values;

    switch (currentStep) {
      case step1: {
        if(!email) break;
        await UserRepository.recoverPassword({ email });

        setCurrentStep(step2);
        break;
      }
      case step2: {
        if(!otp) break;
        const checkOTP = await UserRepository.checkOTPRecoverPassword({ email, codeReset: otp });

        if(!checkOTP.error) {
          setCurrentStep(step3);
        } else{
          toast.warn('OTP không hợp lệ', { autoClose: 1500 });
        }

        break;
      }
      case step3: {
        if(!confirmPassword) break;
        const updatePassword = await UserRepository.updatePasswordRecover({ email, newPassword: confirmPassword });

        if(!updatePassword.error) {
          toast.success('Reset mật khẩu thành công', { autoClose: 2000 });

          setTimeout(() => {
            history.push('/login');
          }, 2200);
        }

        break;
      }
      default:
        break;
    }
  }

  return (
    <section className="flex h-full w-full">
      <div className="w-7/12">
        <div className="flex flex-col justify-center h-full w-full lg:px-20 xl:px-40 2xl:px-72">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              const { handleBlur, dirty, isValid, values } = formik;
              const { password, confirmPassword } = values;

              return (
                <Form
                  style={{
                    width: 510,
                    height: 530,
                  }}
                  className="relative border border-gray-300 rounded-lg shadow-lg"
                >
                  <div
                    className={cn("h-14 px-5 rounded-t-lg bg-accent-light", {
                      "flex items-center justify-between":
                        currentStep !== "stepCreatePassword",
                      "flex items-center": currentStep === "stepCreatePassword",
                    })}
                  >
                    <div className="flex items-center">
                      <img
                        src={BackIcon}
                        alt="Back"
                        className="w-5 h-4 cursor-pointer"
                        onClick={() => {
                          currentStep === step1 && history.goBack();
                          currentStep === step2 && setCurrentStep(step1);
                          currentStep === step3 && setCurrentStep(step2);
                        }}
                      />
                      <span className="pl-3 font-bold">
                        {t("resetPassword:back")}
                      </span>
                    </div>

                    {currentStep === step1 ? (
                      <p className="font-bold text-xl">
                        {t("resetPassword:resetPassword")}
                      </p>
                    ) : currentStep === step2 ? (
                      <p className="font-bold text-xl">
                        {t("resetPassword:checkEmail")}
                      </p>
                    ) : (
                      <p className="font-bold text-xl ml-14">
                        {t("resetPassword:createPassword")}
                      </p>
                    )}

                    {currentStep !== step3 && (
                      <button
                        type="submit"
                        disabled={
                          currentStep === step2 && !(dirty && isValid)
                            ? true
                            : false
                        }
                        className={
                          currentStep === step2 && !(dirty && isValid)
                            ? "text-secondary-gray font-bold text-lg bg-transparent cursor-not-allowed"
                            : "font-bold text-lg text-primary"
                        }
                      >
                        {t("resetPassword:next")}
                      </button>
                    )}
                  </div>

                  {currentStep === step1 ? (
                    <>
                      <p className="p-5 text-secondary-gray">
                        {t("resetPassword:resetDescription")}
                      </p>

                      <div className="p-5 text-secondary-gray">
                        <p className="uppercase">{t("resetPassword:email")}</p>
                        <Field
                          type="email"
                          name="email"
                          autoFocus={true}
                          placeholder={t("signIn:emailPlaceholder")}
                          className="w-full p-2 mt-2.5 border border-gray-300 rounded-lg outline-none"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />

                        <ErrorMessage
                          name="email"
                          component="span"
                          className="font-bold text-xs text-negative"
                        />
                      </div>
                    </>
                  ) : currentStep === step2 ? (
                    <>
                      <div className="text-center flex justify-center mt-10">
                        <div className="w-28 h-28 bg-accent-light rounded-3xl flex justify-center items-center">
                          <img src={MailIcon} alt="Mail" />
                        </div>
                      </div>

                      <p className="p-5 text-center text-secondary-gray">
                        {t("resetPassword:checkEmailDescription")}
                      </p>

                      <div className="px-5">
                        <p className="uppercase text-secondary-gray">
                          {t("resetPassword:otp")}
                        </p>
                        <Field
                          type="text"
                          name="otp"
                          autoFocus={true}
                          placeholder={t("resetPassword:otpPlaceholder")}
                          className="w-full p-2 mt-2.5 border border-gray-300 rounded-lg outline-none"
                          onBlur={(e: FormEvent<HTMLInputElement>) => {
                            handleBlur(e);
                          }}
                        />
                        <ErrorMessage
                          name="otp"
                          component="span"
                          className="font-bold text-xs text-negative"
                        />
                      </div>

                      {/* <div className="p-5 flex">
                        <img src={ResendIcon} alt="Resend" />
                        <span className="pl-2 text-sm text-primary">
                          {t("resetPassword:resendOTP")}
                        </span>
                      </div> */}

                      <div className="px-5 flex justify-end mt-3">
                        <button
                          type="submit"
                          className="h-11 w-28 bg-primary rounded text-primary-light hover:opacity-90"
                        >
                          {t("resetPassword:next")}
                        </button>
                      </div>

                      <ErrorMessage
                        name="email"
                        component="span"
                        className="font-bold text-xs text-negative"
                      />
                    </>
                  ) : (
                    <>
                      <p className="p-5 text-secondary-gray">
                        {t("resetPassword:createPasswordDescription")}
                      </p>

                      <div>
                        <div className="relative px-5">
                          <p className="uppercase text-secondary-gray">
                            {t("signIn:password")}
                          </p>
                          <Field
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            autoFocus={true}
                            placeholder={t("resetPassword:passwordPlaceholder")}
                            className="w-full p-2 mt-2.5 border border-gray-300 rounded-lg outline-none"
                            onBlur={(e: FormEvent<HTMLInputElement>) => {
                              handleBlur(e);
                            }}
                          />
                          <img
                            className="absolute right-10 top-9 cursor-pointer"
                            src={showPassword ? EyeOpenIcon : EyeCloseIcon}
                            alt="Eye Close"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                          {dirty && isValid && password === "" ? (
                            <p className="pt-1 text-xs text-secondary-gray">
                              {t("resetPassword:passwordWarning")}
                            </p>
                          ) : (
                            <ErrorMessage
                              name="password"
                              component="span"
                              className="font-bold text-xs text-negative"
                            />
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="relative p-5">
                          <p className="uppercase text-secondary-gray">
                            {t("resetPassword:confirmPassword")}
                          </p>
                          <Field
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder={t(
                              "resetPassword:confirmPasswordPlacehoder"
                            )}
                            className="w-full p-2 mt-2.5 border border-gray-300 rounded-lg outline-none"
                            onBlur={(e: FormEvent<HTMLInputElement>) => {
                              handleBlur(e);
                            }}
                          />
                          <img
                            className="absolute right-10 top-14 cursor-pointer"
                            src={
                              showConfirmPassword ? EyeOpenIcon : EyeCloseIcon
                            }
                            alt="Eye Close"
                            onClick={() => {
                              setShowConfirmPassword(!showConfirmPassword);
                            }}
                          />
                          {dirty && isValid && confirmPassword === "" ? (
                            <span className="text-xs text-secondary-gray">
                              {t("resetPassword:confirmPasswordWarning")}
                            </span>
                          ) : (
                            <ErrorMessage
                              name="confirmPassword"
                              component="span"
                              className="font-bold text-xs text-negative"
                            />
                          )}
                        </div>

                        <div className="absolute px-5 text-right bottom-10 right-5">
                          <button
                            type="submit"
                            className="h-11 w-28 bg-primary rounded text-primary-light hover:opacity-90"
                          >
                            {t("resetPassword:next")}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </Form>
              );
            }}
          </Formik>

          <Link to="/login">
            <p className="mt-6 font-bold text-primary">
              {t("signIn:submitButton")}
            </p>
          </Link>
        </div>
      </div>

      <div className="w-5/12 z-0 bg-primary">
        <div className="relative">
          <img
            className="object-fill h-screen w-full"
            src={SignInImage}
            alt="Logo"
          />

          <div className="absolute top-0 my-80 mx-44 md:my-60 md:mx-20 lg:my-72 lg:mx-24 xl:my-72 xl:mx-32 2xl:my-80 2xl:mx-44">
            <p className="font-bold text-5xl max-w-md leading-tight text-primary-light">
              {t("signIn:target")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
