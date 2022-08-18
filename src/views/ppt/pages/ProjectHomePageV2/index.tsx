import { FC, useEffect } from "react";
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';

SwiperCore.use([Pagination]);

const ProjectHomePageV2: FC = () => {
	useEffect(() => {
		document.title = "TRANG CHỦ DỰ ÁN"
	}, []);

	return (
		<div className={"project-home p-2"}>
			<p className={"font-bold text-primary-gray"}>Giới thiệu dự án</p>
		</div>
	);
};
export default ProjectHomePageV2;