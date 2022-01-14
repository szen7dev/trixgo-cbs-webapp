import { FC, FormEvent, useState } from "react";

import cn from "classnames";
import { Form, Formik } from "formik";

import styles from "../style.module.css";

import PersonalLogo from "assets/images/personal-logo.svg";
import CameraIcon from "assets/images/camera-icon.svg";
import EyeCloseIcon from "assets/images/icon-eye-close.svg";
import EyeOpenIcon from "assets/images/icon-eye-open.svg";
import SignatureLogo from "assets/images/signature-logo.svg";

const PersonalHomePage: FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const infoValues = {
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    language: "",
    signatureImage: "",
  };

  return (
    <main className="bg-cbs-gray h-full flex justify-center gap-7 py-4">
      <section
        className={cn(
          "w-[404px] h-fit bg-primary-light relative p-5",
          styles.boxShadowBorderRadius
        )}
      >
        <div className="relative flex pt-5 pb-3">
          <img src={PersonalLogo} alt="Personal" />
          <div className="bg-primary-light absolute bottom-4 left-24 h-9 w-9 rounded-full flex items-center justify-center">
            <div className="w-[30px] h-[30px] bg-secondary-gray rounded-full flex items-center justify-center">
              <img
                src={CameraIcon}
                alt="Camera"
                className="w-[15px] h-[13px]"
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <p className="text-2xl">Phùng Thị Thu-PGI</p>
          <p className="text-sm text-primary-gray">@thunpt</p>
        </div>

        <Formik
          initialValues={passwordValues}
          // eslint-disable-next-line no-console
          onSubmit={(values) => console.log(values)}
        >
          {(formik) => {
            const { handleBlur } = formik;

            return (
              <Form>
                <div className="mb-[30px] relative">
                  <p className="text-sm mb-2">Mật khẩu hiện tại</p>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPassword"
                    placeholder="Nhập mật khẩu hiện tại của bạn"
                    className="w-full h-9 px-4 border border-primary-border rounded outline-none"
                    onBlur={(e: FormEvent<HTMLInputElement>) => {
                      handleBlur(e);
                    }}
                  />
                  <img
                    className="absolute right-4 top-34px cursor-pointer"
                    src={showCurrentPassword ? EyeOpenIcon : EyeCloseIcon}
                    alt="Eye Close"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  />
                </div>

                <div className="mb-[30px] relative">
                  <p className="text-sm mb-2">Mật khẩu mới</p>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Nhập mật khẩu mới"
                    className="w-full h-9 px-4 border border-primary-border rounded outline-none"
                    onBlur={(e: FormEvent<HTMLInputElement>) => {
                      handleBlur(e);
                    }}
                  />
                  <img
                    className="absolute right-4 top-34px cursor-pointer"
                    src={showNewPassword ? EyeOpenIcon : EyeCloseIcon}
                    alt="Eye Close"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  />
                </div>

                <div className="relative mb-[30px]">
                  <p className="text-sm mb-2">Xác nhận mật khẩu mới</p>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu mới"
                    className="w-full h-9 px-4 border border-primary-border rounded outline-none"
                    onBlur={(e: FormEvent<HTMLInputElement>) => {
                      handleBlur(e);
                    }}
                  />
                  <img
                    className="absolute right-4 top-34px cursor-pointer"
                    src={showConfirmPassword ? EyeOpenIcon : EyeCloseIcon}
                    alt="Eye Close"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>

                <div className="float-right">
                  <button
                    type="submit"
                    className="text-primary-light text-[15px] w-[105px] h-[38px] bg-primary rounded"
                  >
                    Cập nhật
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>

      <section
        className={cn(
          "w-[840px] h-[738px] bg-primary-light relative",
          styles.boxShadowBorderRadius
        )}
      >
        <p className="text-lg p-5">Thông tin tài khoản</p>

        <Formik
          initialValues={infoValues}
          // eslint-disable-next-line no-console
          onSubmit={(value) => console.log(value)}
        >
          {(formik) => {
            const { handleBlur } = formik;

            return (
              <Form className="px-5">
                <div className="mb-6">
                  <p className="text-sm mb-2">Email</p>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="w-full h-9 px-4 border border-primary-border rounded outline-none"
                    onBlur={(e: FormEvent<HTMLInputElement>) => {
                      handleBlur(e);
                    }}
                  />
                </div>

                <div className="mb-6">
                  <p className="text-sm mb-2">Điện thoại</p>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Điện thoại"
                    className="w-full h-9 px-4 border border-primary-border rounded outline-none"
                    onBlur={(e: FormEvent<HTMLInputElement>) => {
                      handleBlur(e);
                    }}
                  />
                </div>

                <div className="mb-6">
                  <p className="text-sm mb-2">Ngày sinh</p>
                  <input
                    type="text"
                    name="birthDate"
                    placeholder="Ngày sinh"
                    className="w-full h-9 px-4 border border-primary-border rounded outline-none"
                    onBlur={(e: FormEvent<HTMLInputElement>) => {
                      handleBlur(e);
                    }}
                  />
                </div>

                <div className="mb-6">
                  <p className="text-sm">Giới tính</p>
                  <div className="flex items-center gap-14 mt-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        defaultChecked
                        value="Nam"
                        className="mr-3"
                      />
                      <p>Nam</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Nữ"
                        className="mr-3"
                      />
                      <p>Nữ</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Khác"
                        className="mr-3"
                      />
                      <p>Khác</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm">Ngôn ngữ hiển thị</p>
                  <div className="flex items-center gap-14 mt-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="language"
                        defaultChecked
                        value="Vietnamese"
                        className="mr-3"
                      />
                      <p>Tiếng Việt</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="language"
                        value="English"
                        className="mr-3"
                      />
                      <p>English</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center">
                    <p className="text-sm">Ảnh chữ ký xác nhận</p>
                    <div className="w-[30px] h-[30px] bg-secondary-gray rounded-full flex items-center justify-center ml-4">
                      <img src={CameraIcon} alt="Camera" />
                    </div>
                  </div>
                  <div>
                    <img src={SignatureLogo} alt="Signature" />
                  </div>
                </div>

                <div className="absolute bottom-0 right-0 p-5">
                  <button
                    type="submit"
                    className="text-primary-light text-[15px] w-[105px] h-[38px] bg-primary rounded"
                  >
                    Cập nhật
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>
    </main>
  );
};
export default PersonalHomePage;
