/*=====1.LIBRARY=====*/
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SwiperCore, { Pagination } from 'swiper';
import cn from "classnames";

/*=====2.CSS=====*/
import styles from "./style.module.css";
import 'swiper/swiper-bundle.min.css';

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/
SwiperCore.use([Pagination]);

export const SamplePage: FC = () => {
	useEffect(() => {
		document.title = "Note"
	}, []);

	return (
		<div className={cn(styles.content)}>
			<h2>Sample Page</h2>
		</div>
	);
};