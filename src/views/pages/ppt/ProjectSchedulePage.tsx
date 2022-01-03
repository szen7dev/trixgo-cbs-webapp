import { FC, useEffect } from "react";
import SwiperCore, { Pagination } from 'swiper';
import {useHistory} from "react-router-dom"
import cn from "classnames";

import styles from "./style.module.css";
import 'swiper/swiper-bundle.min.css';
import image from 'assets/images/icons8-stacked-organizational-chart-highlighted-first-node-96 1.png';
import avatar from 'assets/images/avatar.jpg';

SwiperCore.use([Pagination]);

const ProjectSchedulePage: FC = () => {
	const history = useHistory();
	useEffect(() => {
		document.title = "CHG.THT-Quản lý tiến độ"
	}, []);

	function handleClick() {
		history.goBack();
	}

	return (
		<div className={styles['progress-page']}>
			{/* Header */}
			<div className={cn(styles["progress-header"], "flex justify-between")}>
				<div className="ml-4">
					<button onClick={handleClick}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
					</button>
					<img src={image} alt="icon" className="inline-block mx-2.5" />
					<h1 className="inline-block font-bold">CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây</h1>
				</div>
				<div className="flex">
					<img src={avatar} alt="avatar" width="28" className="mx-1 object-cover rounded-3xl border border-white" />
					<img src={avatar} alt="avatar1" width="28" className="mx-1 object-cover rounded-3xl border border-white" />
					<img src={avatar} alt="avatar2" width="28" className="mx-1 object-cover rounded-3xl border border-white" />
					<img src={avatar} alt="avatar3" width="28" className="mx-1 object-cover rounded-3xl border border-white" />
				</div>
			</div>
			{/* Content */}
			<main>

			</main>
		</div>
	);
};
export default ProjectSchedulePage;
