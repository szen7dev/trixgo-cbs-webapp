import { FC, useEffect } from "react";
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import cn from "classnames";

import styles from "./style.module.css";
import 'swiper/swiper-bundle.min.css';
import image from 'assets/images/image-home-project.png';

SwiperCore.use([Pagination]);

const HumanOtherFilterPage: FC = () => {
	useEffect(() => {
		document.title = "Trixgo | Note"
	}, []);

	return (
		<div className={cn(styles.content)}>
			<h2>Tra cứu khác</h2>
		</div>
	);
};
export default HumanOtherFilterPage;