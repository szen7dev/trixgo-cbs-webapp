import { FC, useEffect } from "react";
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import cn from "classnames";

import styles from "./style.module.css";
import 'swiper/swiper-bundle.min.css';
import image from 'assets/images/image-home-project.png';

SwiperCore.use([Pagination]);

const ProjectPhotoPage: FC = () => {
	useEffect(() => {
		document.title = "CHG.THT-Hình ảnh"
	}, []);

	return (
		<div className={cn(styles.content)}>
			<h2>Hình ảnh</h2>
		</div>
	);
};
export default ProjectPhotoPage;