/*=====1.LIBRARY=====*/
import { FC, FormEvent, useEffect, useState } from "react";
import cn from "classnames";

/*=====2.CSS=====*/
import styles from "views/human/styles/style.module.css";
import 'swiper/swiper-bundle.min.css';

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
/*=====5.TYPINGS=====*/
import { CompanyInfo } from "typings/companies";

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useCompany, useQueryInfoCompany } from 'services/hooks/useCompanies';

/*=====7.OTHER=====*/
import { Form, Formik} from "formik";

const infoValues = {
	email: "",
	phone: "",
	birthDay: "",
	gender: '1',
	lang: "vn",
	bankName: "",
	bankAccount: "",
	bank: "",
    company: {
        _id: "",
        name: "",
        sign: "",
        image: "",
        bankName: "",
        bankAccount: "",
        bank: "",
    },
};

export const OwnerPaymentPage: FC = () => {
    const { updateCompanyAsync } = useCompany();

    const [infoUser, setInfoUser] = useState(infoValues);
	const { dataUserInfo, refetchDataUserInfo } = useAuth();

	const handleSubmit = async (values: CompanyInfo) => {
        console.log(values)
		await updateCompanyAsync(values);
	}

    useEffect(() => {
        refetchDataUserInfo()
        setInfoUser(infoValues)
	},[dataUserInfo])
	  
    const {
		data
	} = useQueryInfoCompany({ companyID: dataUserInfo?.data?.company });
	
	return (
		<section 
			className={cn(
				"h-fit bg-primary-light relative",
				styles.boxShadowBorderRadius
			)}
		>
		  <p className="text-lg p-5">Thông tin tài khoản</p>
		  <Formik
			enableReinitialize
			initialValues={ data ? data?.pages[0].data : {
                bankName: "",
                bankAccount: "",
                bank: "",
            } }
			onSubmit={handleSubmit}
		  >
			{(formik) => {
			  const { handleBlur, values, handleChange, setFieldValue } = formik;
  
			  return (
				<Form className="px-5">
				  <div className="mb-6">
					<p className="text-sm mb-2">Tài khoản ngân hàng</p>
					<input
					  type="text"
					  name="bankAccount"
					  placeholder="Tài khoản ngân hàng"
					  value={values?.bankAccount}
					  onChange={handleChange}
					  className="w-full h-9 px-4 border border-primary-border rounded outline-none"
					  onBlur={(e: FormEvent<HTMLInputElement>) => {
						handleBlur(e);
					  }}
					/>
				  </div>

				  <div className="mb-6">
					<p className="text-sm mb-2">Tên chủ tài khoản</p>
					<input
					  type="text"
					  name="bankName"
					  placeholder="Tên chủ tài khoản"
					  value={values?.bankName}
					  onChange={handleChange}
					  className="w-full h-9 px-4 border border-primary-border rounded outline-none"
					  onBlur={(e: FormEvent<HTMLInputElement>) => {
						handleBlur(e);
					  }}
					/>
				  </div>

				  <div className="mb-6">
					<p className="text-sm mb-2">Tên ngân hàng</p>
					<input
					  type="text"
					  name="bank"
					  placeholder="Tên ngân hàng"
					  value={values?.bank}
					  onChange={handleChange}
					  className="w-full h-9 px-4 border border-primary-border rounded outline-none"
					  onBlur={(e: FormEvent<HTMLInputElement>) => {
						handleBlur(e);
					  }}
					/>
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
	)
}