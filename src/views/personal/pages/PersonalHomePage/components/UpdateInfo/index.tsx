/*=====1.LIBRARY=====*/
import { FC, FormEvent, useEffect, useState, memo, ChangeEvent} from "react";
import SwiperCore, { Pagination } from 'swiper';
import cn from "classnames";
import i18n from 'i18next';

/*=====2.CSS=====*/
import styles from "views/human/styles/style.module.css";
import 'swiper/swiper-bundle.min.css';

/*=====3.ICONS=====*/
import PersonalLogo from "assets/images/personal-logo.svg";
import CameraIcon from "assets/images/camera-icon.svg";
// import SignatureLogo from "assets/images/signature-logo.svg";

/*=====4.PAGES/COMPONENTS=====*/
/*=====5.TYPINGS=====*/
import { UpdateUser, UpdateAvatarUser } from 'typings/personal/user';
/*=====6.HOOKS/APIS=====*/
import { useUser } from 'services/hooks/personal/useUser';
import { useAuth } from "services/hooks/auth/useAuth";
/*=====7.OTHER=====*/
import { Form, Formik, Field } from "formik";
import moment from 'moment'
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { useUpload } from 'services/hooks/useUpload';

SwiperCore.use([Pagination]);

const infoValues = {
	email: "",
	phone: "",
	birthDay: "",
	gender: '1',
	lang: "vn",
};

export const UpdateInfo: FC = () => {
    const [infoUser, setInfoUser] = useState(infoValues);
	const { dataUserInfo, refetchDataUserInfo } = useAuth();
    const [avatar, setAvatar] = useState(PersonalLogo);
	const { updateUser, updateAvatarUser } = useUser();
    const [signature, setSignature] = useState("signature_default.png");
    const [signatureName, setSignatureName] = useState("");

	const { addFileToUpload } = useUpload({
		typeUpload: 'user'
	});
    // Cập nhật info
	const handleSubmitUpdateUser = async (values: UpdateUser) => {
		await updateUser(values);
		i18n.changeLanguage(values.lang)
		localStorage.setItem("user_language", values.lang);
	}
    
	const updateAvatar = async (values: UpdateAvatarUser) => {
		await updateAvatarUser(values);
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

		if(dataUserInfo && dataUserInfo?.data?.signature) {
			setSignature(dataUserInfo.data.signature)
        }
	} else {
		setInfoUser(infoValues)
	}
	},[dataUserInfo])

	const handleChangeSignature = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if(!files || !files.length) return toast.warning("Vui lòng chọn ảnh chữ ký");

		const { name } = await addFileToUpload({
			files: files[0] as any,
			fileType: 1,
			useCompress: true
		});

		if(name){
			setSignatureName(name);
		}
	}
	
	useEffect(() => {
        if(signatureName) {
			updateUser({ signature: signatureName })
			setTimeout(() => {
				refetchDataUserInfo();
			}, 500);
        }
	}, [signatureName]);

	const Signature = memo(function Signature() {
        return <img src={`${process.env.REACT_APP_URL_S3_USER}/${signature}`} alt="Signature" width={200} />
	});
	return (
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
						<Field type="radio" name="lang" value="vn" className="mr-3" onChange={handleChange} checked={values.lang === 'vn'} />
						Tiếng Việt
					  </label>
					  <label>
						<Field type="radio" name="lang" value="en" className="mr-3" onChange={handleChange} checked={values.lang === 'en'} />
						English
					  </label>
					  <label>
						<Field type="radio" name="lang" value="ja" className="mr-3" onChange={handleChange} checked={values.lang === 'ja'} />
						Japanese
					  </label>
					</div>
				  </div>
  
				  <div className="mb-6">
					<div className="flex items-center">
					  <p className="text-sm">Ảnh chữ ký xác nhận</p>
					  {/* <div className="w-[30px] h-[30px] bg-secondary-gray rounded-full flex items-center justify-center ml-4">
						<img
							src={CameraIcon}
							alt="Camera"
							className="w-[15px] h-[13px]"
						/>
						<input type="file" name="signature" id="signature" className="hidden" accept="image/*" onChange={handleChangeSignature} />
					  </div> */}
						<label className="ml-2">
							<div className="w-[30px] h-[30px] bg-secondary-gray rounded-full flex items-center justify-center">
								<img
								src={CameraIcon}
								alt="Camera"
								className="w-[15px] h-[13px]"
								/>
								<input type="file" name="signature" id="signature" className="hidden" accept="image/*" onChange={handleChangeSignature} />
							</div>
						</label>
					</div>
					<div>
					  <Signature/>
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
	);
};