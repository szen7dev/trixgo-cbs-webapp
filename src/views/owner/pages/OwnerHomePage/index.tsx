/*=====1.LIBRARY=====*/
import { FC, useEffect } from "react";
import SwiperCore, { Pagination } from 'swiper';
import cn from "classnames";

/*=====2.CSS=====*/
import styles from "views/human/styles/style.module.css";
import 'swiper/swiper-bundle.min.css';

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/
SwiperCore.use([Pagination]);

export const OwnerHomePage: FC = () => {
	useEffect(() => {
		document.title = "Quản trị viên"
	}, []);

	return (
		<div className={cn(styles.content)}>
			<h2>OwnerHomePage</h2>
		</div>
	)
}