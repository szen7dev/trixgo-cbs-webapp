/*=====1.LIBRARY=====*/
import { FC, FormEvent, useEffect, useState, memo, ChangeEvent, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import SwiperCore, { Pagination } from 'swiper';
import cn from "classnames";
import { Form, Formik } from "formik";

/*=====2.CSS=====*/
import styles from "views/human/styles/style.module.css";
import 'swiper/swiper-bundle.min.css';

/*=====3.ICONS=====*/
import PersonalLogo from "assets/images/personal-logo.svg";
import CameraIcon from "assets/images/camera-icon.svg";
import EyeCloseIcon from "assets/images/icon-eye-close.svg";
import EyeOpenIcon from "assets/images/icon-eye-open.svg";

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/
import { UpdatePasswordUser } from 'typings/personal/user';

/*=====6.HOOKS/APIS=====*/
import { useUpload } from 'services/hooks/useUpload';
import { useUser } from 'services/hooks/personal/useUser';
import { useAuth } from "services/hooks/auth/useAuth";
import { toast } from "react-toastify";
import { resolve } from "path";

/*=====7.OTHER=====*/

SwiperCore.use([Pagination]);

const passwordValues = {
	currentPass: "",
	newPass: "",
	confirmPass: "",
};

export const ChangePassword: FC = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [avatar, setAvatar] = useState(PersonalLogo);
    const [avatarName, setAvatarName] = useState("");
	const { dataUserInfo, refetchDataUserInfo } = useAuth();
    const { updateUser, updatePasswordUser } = useUser();
    const { user } = useAuth();
	const { addFileToUpload } = useUpload({
		typeUpload: 'user'
	});

	const handleSubmitUpdatePassword = async (values: UpdatePasswordUser) => {
		const { confirmPass, currentPass, newPass } = values;
		if(!confirmPass || !currentPass || !newPass)
			return toast.error("Vui lòng nhập đủ thông tin");
		if(confirmPass != newPass)
			return toast.error("Xác nhận mật khẩu mới không khớp");

        const infoAfterUpdatePass = await updatePasswordUser(values);
		console.log({ infoAfterUpdatePass })
    }

	const handleChangeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if(!files || !files.length) return toast.warning("Vui lòng chọn ảnh đại diện");

		const { name } = await addFileToUpload({
			files: files[0] as any,
			fileType: 1,
			useCompress: true
		});

		if(name){
			setAvatarName(name);
		}
	}

	useEffect(() => {
        if(avatarName) {
			updateUser({ image: avatarName })
			setTimeout(() => {
				refetchDataUserInfo();
			}, 500);
        }
	}, [avatarName])

	useEffect(() => {
        if(dataUserInfo && dataUserInfo?.data?.image) {
			setAvatar(dataUserInfo.data.image)
        }
	}, [dataUserInfo])

    const Image = memo(function Image() {
        return <img src={`${process.env.REACT_APP_URL_S3_USER}/${avatar}`} alt="Personal" className="w-[110px] h-[110px] rounded-full object-cover" />
	});

	return (
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

				<input type="file" name="files" id="file" className="hidden" accept="image/*" onChange={handleChangeAvatar} />
			  </div>
			  </label>
			</div>
		  </div>
		  <div className="mb-8">
			<p className="text-2xl">{user ? user.fullname : null}</p>
			<p className="text-sm text-primary-gray">{user ? user.email : null}</p>
		  </div>

		  <Formik
			initialValues={passwordValues}
			onSubmit={handleSubmitUpdatePassword}
		  >
			{formik => {
			  const { handleBlur, handleChange } = formik;

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
					  onBlur={handleBlur}
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
					  onBlur={handleBlur}
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
					  onBlur={handleBlur}
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
	);
};
