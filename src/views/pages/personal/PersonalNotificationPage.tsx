import { FC, useEffect } from "react";
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import cn from "classnames";

import styles from "./style.module.css";
import 'swiper/swiper-bundle.min.css';
import image from 'assets/images/image-home-project.png';

SwiperCore.use([Pagination]);

const PersonalNotificationPage: FC = () => {
	useEffect(() => {
		document.title = "Trixgo | Thông báo"
	}, []);

	return (
		<div className={cn(styles.content)}>
			<h2>Quản lý thông báo</h2>
		</div>
	);
};
export default PersonalNotificationPage;