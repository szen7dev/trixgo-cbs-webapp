/*=====1.LIBRARY=====*/
import { FC, useEffect, useState } from "react";
import SwiperCore, { Pagination } from 'swiper';
import cn from "classnames";
import API from "apis/repository";
import { toast } from "react-toastify";
import { createLinkAndClick } from "utils";
import { useAuth } from "services/hooks/auth/useAuth";

/*=====2.CSS=====*/
import styles from "views/human/styles/style.module.css";
import 'swiper/swiper-bundle.min.css';
import downloadIcon from "assets/images/icons8-download-64.svg";

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/
SwiperCore.use([Pagination]);

export const OwnerTrafficPage: FC = () => {
	useEffect(() => {
		document.title = "Quản trị viên"
	}, []);

	const { user } = useAuth();

	//_____Import, export excel
	const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	});

	const handleExport = async () => {
        try {
			setStateExport({ isExporting: true });

			const response = await API.post(
				`/api/analysis/history_datas/export_excel?option=1`,
			  );
			const { data, status, error } = response?.data;
			// console.log({status, error})

			if(error) {
                return toast.warn(data?.message);
            }

            data && createLinkAndClick(data, '_self');
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setStateExport({ isExporting: false });
        }
    }

	return (
		<div className={cn(styles.content)}>
			<h2>OwnerTrafficPage</h2>
			<button className={"flex items-center justify-center mx-1 ml-6"} onClick={handleExport}>
				{user?.email.toString() === 'hiepnh.winggo@gmail.com' ? 
					<span>Download<img src={downloadIcon} className={"ml-2 w-[18px] h-[18px]"}/></span> 
					: <></>
				}
			</button>
		</div>
	)
}