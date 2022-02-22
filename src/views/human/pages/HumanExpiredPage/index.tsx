import { FC, useEffect } from "react";
import SwiperCore, { Pagination } from 'swiper';

import cn from "classnames";

import styles from "./style.module.css";
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Pagination]);

export const HumanExpiredPage: FC = () => {
	useEffect(() => {
		document.title = "Trixgo | Note"
	}, []);

	return (
		<div className={cn(styles.content)}>
			<h2>Quản lý thời hạn</h2>
		</div>
	);
};