import { FC, useEffect } from "react";
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import cn from "classnames";

import styles from "./style.module.css";
import 'swiper/swiper-bundle.min.css';
import image from 'assets/images/image-home-project.png';

SwiperCore.use([Pagination]);

const ProjectFolderPage: FC = () => {
	useEffect(() => {
		document.title = "CHG.THT-Thư mục dữ liệu"
	}, []);

	return (
		<div className={cn(styles.content)}>
			<h2>Thư mục dữ liệu</h2>
		</div>
	);
};
export default ProjectFolderPage;