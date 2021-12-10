import { FC, FormEvent, useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import cn from "classnames";

import SignInImage from "assets/images/signin-image.svg";
import BackIcon from "assets/images/icon-back.svg";
import MailIcon from "assets/images/icon-email-open.svg";
import ResendIcon from "assets/images/icon-resend.svg";
import EyeCloseIcon from "assets/images/icon-eye-close.svg";
import EyeOpenIcon from "assets/images/icon-eye-open.svg";
import "styles/common.css";

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

  useEffect(() => {
    document.title = `Trixgo - ${t("resetPassword:resetPassword")}`;
  }, [t]);

  const fontFamily = "Arial";
  const textGray = "#757c8a";
  const blueColor = "#0060e1";
  const borderGray = "#cccccc";

  return (
    <section className="flex h-full w-full">
      <div className="w-7/12">
        <div
          className="flex flex-col justify-center h-full w-full"
          style={{ padding: "0 18rem" }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={() => {
              currentStep === step1 && setCurrentStep(step2);
              currentStep === step2 && setCurrentStep(step3);
            }}
          >
            {(formik) => {
              const { handleBlur, dirty, isValid, values } = formik;
              const { password, confirmPassword } = values;

              return (
                <Form
                  style={{
                    width: 510,
                    height: 530,
                    border: `1px solid ${borderGray}`,
                    boxSizing: "border-box",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: 10,
                  }}
                  className="relative"
                >
                  <div
                    className={cn("h-14 px-5", {
                      "flex items-center justify-between":
                        currentStep !== "stepCreatePassword",
                      "flex items-center": currentStep === "stepCreatePassword",
                    })}
                    style={{ background: "#f2f2f4" }}
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
                      <span className="pl-3 font-bold" style={{ fontFamily }}>
                        {t("resetPassword:back")}
                      </span>
                    </div>
                    {currentStep === step1 ? (
                      <p className="font-bold text-xl" style={{ fontFamily }}>
                        {t("resetPassword:resetPassword")}
                      </p>
                    ) : currentStep === step2 ? (
                      <p className="font-bold text-xl" style={{ fontFamily }}>
                        {t("resetPassword:checkEmail")}
                      </p>
                    ) : (
                      <p
                        className="font-bold text-xl ml-14"
                        style={{ fontFamily }}
                      >
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
                        style={
                          currentStep === step2 && !(dirty && isValid)
                            ? {
                                fontFamily,
                                fontWeight: "bold",
                                fontSize: 18,
                                color: textGray,
                                background: "transparent",
                                cursor: "not-allowed",
                              }
                            : {
                                fontFamily,
                                fontWeight: "bold",
                                fontSize: 18,
                                color: "#2660db",
                              }
                        }
                      >
                        {t("resetPassword:next")}
                      </button>
                    )}
                  </div>

                  {currentStep === step1 ? (
                    <>
                      <p className="p-5" style={{ color: textGray }}>
                        {t("resetPassword:resetDescription")}
                      </p>

                      <div className="p-5">
                        <p
                          className="uppercase"
                          style={{ color: textGray, fontFamily }}
                        >
                          {t("resetPassword:email")}
                        </p>
                        <Field
                          type="email"
                          name="email"
                          autoFocus={true}
                          placeholder={t("signIn:emailPlaceholder")}
                          className="w-full p-2 mt-2.5 rounded-lg outline-none"
                          style={{ border: `1px solid ${borderGray}` }}
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
                        <div
                          className="w-28 h-28 rounded-3xl flex justify-center items-center"
                          style={{ background: "#f2f4f7" }}
                        >
                          <img src={MailIcon} alt="Mail" />
                        </div>
                      </div>

                      <p
                        className="p-5 text-center"
                        style={{ color: textGray, fontFamily }}
                      >
                        {t("resetPassword:checkEmailDescription")}
                      </p>

                      <div className="px-5">
                        <p className="uppercase" style={{ color: textGray }}>
                          {t("resetPassword:otp")}
                        </p>
                        <Field
                          type="text"
                          name="otp"
                          autoFocus={true}
                          placeholder={t("resetPassword:otpPlaceholder")}
                          className="w-full p-2 mt-2.5 rounded-lg outline-none"
                          style={{ border: `1px solid ${borderGray}` }}
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

                      <div className="p-5 flex">
                        <img src={ResendIcon} alt="Resend" />
                        <span
                          className="pl-2 text-sm"
                          style={{ color: blueColor, fontFamily }}
                        >
                          {t("resetPassword:resendOTP")}
                        </span>
                      </div>

                      <div className="px-5 flex justify-end">
                        <button
                          type="submit"
                          className="h-11 w-28 hover:opacity-90"
                          style={{
                            background: blueColor,
                            borderRadius: 5,
                            color: "#ffffff",
                          }}
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
                      <p
                        className="p-5"
                        style={{ color: textGray, fontFamily }}
                      >
                        {t("resetPassword:createPasswordDescription")}
                      </p>

                      <div>
                        <div className="relative px-5">
                          <p
                            className="uppercase"
                            style={{ color: textGray, fontFamily }}
                          >
                            {t("signIn:password")}
                          </p>
                          <Field
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            autoFocus={true}
                            placeholder={t("resetPassword:otpPlaceholder")}
                            className="w-full p-2 mt-2.5 rounded-lg outline-none"
                            style={{ border: `1px solid ${borderGray}` }}
                            onBlur={(e: FormEvent<HTMLInputElement>) => {
                              handleBlur(e);
                            }}
                          />
                          <img
                            className="absolute right-10 top-11 cursor-pointer"
                            src={showPassword ? EyeOpenIcon : EyeCloseIcon}
                            alt="Eye Close"
                            onClick={() => setShowPassword(!showPassword)}
                          />
                          {dirty && isValid && password === "" ? (
                            <p
                              className="pt-1 text-xs"
                              style={{ color: textGray, fontFamily }}
                            >
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
                          <p
                            className="uppercase"
                            style={{ color: textGray, fontFamily }}
                          >
                            {t("resetPassword:confirmPassword")}
                          </p>
                          <Field
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder={t("resetPassword:otpPlaceholder")}
                            className="w-full p-2 mt-2.5 rounded-lg outline-none"
                            style={{ border: `1px solid ${borderGray}` }}
                            onBlur={(e: FormEvent<HTMLInputElement>) => {
                              handleBlur(e);
                            }}
                          />
                          <img
                            className="absolute right-10 top-16 cursor-pointer"
                            src={
                              showConfirmPassword ? EyeOpenIcon : EyeCloseIcon
                            }
                            alt="Eye Close"
                            onClick={() => {
                              setShowConfirmPassword(!showConfirmPassword);
                            }}
                          />
                          {dirty && isValid && confirmPassword === "" ? (
                            <span
                              className="text-xs"
                              style={{ color: textGray, fontFamily }}
                            >
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
                            className="h-11 w-28 hover:opacity-90"
                            style={{
                              background: blueColor,
                              borderRadius: 5,
                              color: "#ffffff",
                            }}
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

          <Link to="/authentication/sign-in">
            <p
              className="mt-6 font-bold"
              style={{ color: blueColor, fontFamily }}
            >
              {t("signIn:submitButton")}
            </p>
          </Link>
        </div>
      </div>

      <div className="w-5/12" style={{ background: blueColor }}>
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
  );
};

export default ResetPasswordPage;
