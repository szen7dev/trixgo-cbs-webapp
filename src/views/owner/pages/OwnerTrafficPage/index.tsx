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

	const currentYear = new Date().getFullYear()

	//_____Import, export excel
	const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	});

	const handleExport = async (param: any) => {
        try {
			setStateExport({ isExporting: true });

			const response = await API.post(
				`/api/analysis/history_datas/export_excel?option=1&year=${param.year}`,
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
			<button className={"flex items-center justify-center mx-1 mt-3"} onClick={() => handleExport({year: 2023})}>
				{user?.email.toString() === 'kiemthuvien.dcop.trx@gmail.com' ? 
					<span>DownloadReport2023<img src={downloadIcon} className={"ml-2 w-[18px] h-[18px]"}/></span> 
					: <></>
				}
			</button>
			<button className={"flex items-center justify-center mx-1 mt-3"} onClick={() => handleExport({year: currentYear})}>
				{user?.email.toString() === 'kiemthuvien.dcop.trx@gmail.com' ? 
					<span>DownloadReportThisYear<img src={downloadIcon} className={"ml-2 w-[18px] h-[18px]"}/></span> 
					: <></>
				}
			</button>
		</div>
	)
}