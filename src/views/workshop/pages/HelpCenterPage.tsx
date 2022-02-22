import { FC, useEffect } from "react";
import SwiperCore, { Pagination } from 'swiper';

import cn from "classnames";

import styles from "./style.module.css";
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Pagination]);

const HelpCenterPage: FC = () => {
	useEffect(() => {
		document.title = "Trixgo | Help Center"
	}, []);

	return (
		<div className={cn(styles.content)}>
			<h2>Help Center</h2>
            <a href="https://www.facebook.com/help">Reference</a>
		</div>
	);
};
export default HelpCenterPage;