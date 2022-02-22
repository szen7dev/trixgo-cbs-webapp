import { FC, useEffect } from "react";
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import cn from "classnames";

import styles from "./style.module.css";
import 'swiper/swiper-bundle.min.css';
import image from 'assets/images/image-home-project.png';

SwiperCore.use([Pagination]);

const ProjectHomePage: FC = () => {
	useEffect(() => {
		document.title = "TRANG CHỦ DỰ ÁN"
	}, []);

	return (
		<div className={cn(styles.content)}>
			<div className={cn(styles['content-container'], styles.scroll, "overflow-y-auto px-4 pt-36 flex-1")}>
				<div className={cn(styles.black, 'text-center pt-1 mx-auto')} style={{ width: "560px" }}>
					<h2>Chào mừng đến với hệ thống <b>Quản lý dự án</b></h2>
					<p className="px-4">Giúp chủ đầu tư, tổng thầu và các đơn vị tham gia dự án tiết kiệm khoảng 5% (tổng mức đầu tư) chi phí cho việc trao đổi và quản trị thông tin</p>
					<div className={cn(styles['image-messageHome'], 'mt-11')}>
						<img src={image} alt="" />
					</div>
					<div className="mx-auto mt-11" style={{ width: "300px" }}>
						<Swiper
							observer
							observeParents
							parallax
							slidesPerView={1}
							pagination={{
								clickable: true,
								el: '.pagination',
								bulletClass: 'mx-1 swiper-pagination-bullet'
							}}
						>
							<SwiperSlide className="cursor-pointer">
								<h2 className={styles.info}><b>Đa dạng hóa dữ liệu</b></h2>
								<p className="my-3.5">Dữ liệu nhiều chiều trực quan, dễ dàng ra quyết định điều hành chính xác</p>
							</SwiperSlide>
							<SwiperSlide className="cursor-pointer">
								<h2 className={styles.info}><b>Đa dạng hóa dữ liệu</b></h2>
								<p className="my-3.5">Dữ liệu nhiều chiều trực quan, dễ dàng ra quyết định điều hành chính xác</p>
							</SwiperSlide>
							<SwiperSlide className="cursor-pointer">
								<h2 className={styles.info}><b>Đa dạng hóa dữ liệu</b></h2>
								<p className="my-3.5">Dữ liệu nhiều chiều trực quan, dễ dàng ra quyết định điều hành chính xác</p>
							</SwiperSlide>
						</Swiper>
						<div className="pagination"></div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProjectHomePage;