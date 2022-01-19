import { FC, FormEvent, useState, useEffect, memo } from "react";

import cn from "classnames";
import { Form, Formik, Field } from "formik";
import { useAuth } from "services/hooks/useAuth";
import { useUpload } from 'services/hooks/useUpload';
import useCustomReducer from 'views/pages/document/reducer/upload/useCustomReducer';
import fileUploadReducer, { INITIAL_STATE } from 'views/pages/media/context/upload.reducer';
import uploadActions from 'views/pages/media/context/upload.actions';
import { modifyUploadedFiles, modifyUploadedFilesV2 } from 'views/pages/media/context/upload.utils';
import { UpdateUser, UpdatePasswordUser, UpdateAvatarUser } from 'typings/user';
import DatePicker from "react-datepicker";
import moment from 'moment'
import { useUser } from 'services/hooks/useUser';
import styles from "../style.module.css";

import PersonalLogo from "assets/images/personal-logo.svg";
import CameraIcon from "assets/images/camera-icon.svg";
import EyeCloseIcon from "assets/images/icon-eye-close.svg";
import EyeOpenIcon from "assets/images/icon-eye-open.svg";
import SignatureLogo from "assets/images/signature-logo.svg";

const infoValues = {
  email: "",
  phone: "",
  birthDay: "",
  gender: '1',
  lang: "vn",
  // signature: "",
};
const passwordValues = {
  currentPass: "",
  newPass: "",
  confirmPass: "",
};
const PersonalHomePage: FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [infoUser, setInfoUser] = useState(infoValues);
  const [avatar, setAvatar] = useState(PersonalLogo);
  const { dataUserInfo, user, refetchDataUserInfo } = useAuth();
  const { updateUser, updatePasswordUser, updateAvatarUser } = useUser();
  const { addFileToUpload } = useUpload('MEDIA');

  // Cập nhật info
  const handleSubmitUpdateUser = async (values: UpdateUser) => {
    await updateUser(values);
  }

  // Đổi Password
  const handleSubmitUpdatePassword = async (values: UpdatePasswordUser) => {
    await updatePasswordUser(values);
  }

  const updateAvatar = async (values: UpdateAvatarUser) => {
    await updateAvatarUser(values);
  }

  // Upload avatar
  const [uploads, {
		setUploadImageProgress,
		setUploadFileProgress,
		setIDImageUploaded,
		setIDFileUploaded,
		setUploadImage,
		setUploadFile,
	}] = useCustomReducer(fileUploadReducer, uploadActions, modifyUploadedFiles(INITIAL_STATE));

  const handleSetFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || !event.target.files.length) return;

		// Modify file to with key with each file;
		const [files, images] = modifyUploadedFilesV2({
			imgLastKey: Object.keys(uploads.images).length || null,
			fileLastKey: Object.keys(uploads.files).length || null,
		}, event.target.files);
		setUploadImage(images);
		setUploadFile(files);
		// Upload images
		for (const [key, { file }] of Object.entries(images)) {
			const { _id, name } = await addFileToUpload({
				files: file,
				progress: percentCompleted => {
					setUploadImageProgress(key, percentCompleted)
				},
			})
     setIDImageUploaded(key, _id)
     updateAvatar({image: name})
     setTimeout(() => {
      refetchDataUserInfo()
     }, 500)
		}

		// Upload files
		for (const [key, { file }] of Object.entries(files)) {
			const { _id } = await addFileToUpload({
				files: file,
				progress: percentCompleted => {
					setUploadFileProgress(key, percentCompleted)
				}
			})
			setIDFileUploaded(key, _id);
		}
	}

  useEffect(() => {
    refetchDataUserInfo()
    if(dataUserInfo) {
      setInfoUser(dataUserInfo.data)
      // Nếu giới tính chưa có
      if(!dataUserInfo?.data?.gender) {
        setInfoUser(user => ({
          ...user,
          ...{gender: '1'}
        }));
      } else { // Nếu có sẽ đổi sang string
        setInfoUser(user => ({
          ...user,
          ...{gender: user.gender.toString()}
        }));
      }
      if(!dataUserInfo?.data?.gender) {
        setInfoUser(user => ({
          ...user,
          ...{lang: 'vn'}
        }));
      }
      if(dataUserInfo?.data?.image) {
        setAvatar(dataUserInfo.data.image)
      }
    } else {
      setInfoUser(infoValues)
    }
  },[dataUserInfo])

  const Image = memo(function Image() {
    return <img src={`${process.env.REACT_APP_URL_S3}/test/${avatar}`} alt="Personal" className="w-[110px] h-[110px] rounded-full object-cover" />
  });
  return (
    <main className="bg-cbs-gray h-full flex justify-center gap-7 py-4">
      <section
        className={cn(
          "w-[404px] h-fit bg-primary-light relative p-5",
          styles.boxShadowBorderRadius
        )}
      >
        <div className="relative flex pt-5 pb-3">
        {/* <img src={avatar} alt="Personal" className="w-[110px] h-[110px] rounded-full object-cover" /> */}
          <Image />
          <div className="bg-primary-light absolute bottom-4 left-24 h-9 w-9 rounded-full flex items-center justify-center">
            <label>
            <div className="w-[30px] h-[30px] bg-secondary-gray rounded-full flex items-center justify-center">
              <img
                src={CameraIcon}
                alt="Camera"
                className="w-[15px] h-[13px]"
              />
              <input type="file" name="files" id="file" className="hidden" accept="image/*" multiple onChange={event => handleSetFiles(event)} />
            </div>
            </label>
          </div>
        </div>
        <div className="mb-8">
          <p className="text-2xl">{user? user.fullname : null}</p>
          <p className="text-sm text-primary-gray">{user? user.email : null}</p>
        </div>

        <Formik
          initialValues={passwordValues}
          // eslint-disable-next-line no-console
          onSubmit={handleSubmitUpdatePassword}
        >
          {(formik) => {
            const { handleBlur, values, handleChange } = formik;

            return (
              <Form>
                <div className="mb-[30px] relative">
                  <p className="text-sm mb-2">Mật khẩu hiện tại</p>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    name="currentPass"
                    placeholder="Nhập mật khẩu hiện tại của bạn"
                    className="w-full h-9 px-4 border border-primary-border rounded outline-none"
                    onChange={handleChange}
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
                    name="newPass"
                    placeholder="Nhập mật khẩu mới"
                    className="w-full h-9 px-4 border border-primary-border rounded outline-none"
                    onChange={handleChange}
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
                    name="confirmPass"
                    placeholder="Nhập lại mật khẩu mới"
                    className="w-full h-9 px-4 border border-primary-border rounded outline-none"
                    onChange={handleChange}
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
          enableReinitialize
          initialValues={ infoUser }
          // eslint-disable-next-line no-console
          onSubmit={handleSubmitUpdateUser}
        >
          {(formik) => {
            const { handleBlur, values, handleChange, setFieldValue } = formik;

            return (
              <Form className="px-5">
                <div className="mb-6">
                  <p className="text-sm mb-2">Email</p>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
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
                    value={values.phone}
                    onChange={handleChange}
                    className="w-full h-9 px-4 border border-primary-border rounded outline-none"
                    onBlur={(e: FormEvent<HTMLInputElement>) => {
                      handleBlur(e);
                    }}
                  />
                </div>

                <div className="mb-6">
                  <p className="text-sm mb-2">Ngày sinh</p>
                  <DatePicker
                    selected={(values.birthDay && new Date(values.birthDay)) || new Date()}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date: Date | null) => setFieldValue("birthDay", moment(date).format('YYYY-MM-DD'))}
                    showYearDropdown
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    customInput={
                      <input
                        type="text"
                        name="birthDay"
                        placeholder=""
                        // value={values.birthDay}
                        className="w-full h-9 px-4 border border-primary-border rounded outline-none"
                      />
                    }
                  />
                </div>

                <div className="mb-6">
                  <p className="text-sm">Giới tính</p>
                  <div className="flex items-center gap-14 mt-4">
                    <label>
                      <Field type="radio" name="gender" value='1' className="mr-3" onChange={handleChange} checked={values.gender === '1'} />
                      Nam
                    </label>
                    <label>
                      <Field type="radio" name="gender" value='2' className="mr-3" onChange={handleChange} checked={values.gender === '2'} />
                      Nữ
                    </label>
                    <label>
                      <Field type="radio" name="gender" value='3' className="mr-3" onChange={handleChange} checked={values.gender === '3'} />
                      Khác
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm">Ngôn ngữ hiển thị</p>
                  <div className="flex items-center gap-14 mt-4">
                  <label>
                      <Field type="radio" name="lang" value="vi" className="mr-3" onChange={handleChange} checked={values.lang === 'vi'} />
                      Tiếng Việt
                    </label>
                    <label>
                      <Field type="radio" name="lang" value="en" className="mr-3" onChange={handleChange} checked={values.lang === 'en'} />
                      English
                    </label>
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
