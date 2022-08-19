import React, { FC, useEffect } from "react";
import userAvt from "assets/images/human-avatar.svg";
import imageCompany from "assets/images/image-company.png";
import projectHomeImage from "assets/images/project-home-image.png";
import Carousel from 'react-elastic-carousel'
import cn from "classnames";
import styles from "../../../cmcs/styles/styles.module.css";

const ProjectHomePageV2: FC = () => {
	useEffect(() => {
		document.title = "TRANG CHỦ DỰ ÁN"
	}, []);

	const renderPrevNextButton = (type: string, onClick: () => void) => {
		return (
			<div className={"flex items-center absolute z-10 h-full " + (type === "PREV" ? "left-0" : "right-0")}>
				<button
					onClick={onClick}
					className={"w-10 h-10 flex items-center justify-center border-0.5 rounded-lg border-primary-border bg-cbs-next-prev-button " + (type === "PREV" ? "" : "rotate-180")}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
			</div>
		)
	}

	return (
		<div className={"project-home p-2"}>
			<p className={"font-bold text-primary-gray"}>Giới thiệu dự án</p>
			<div className={"mt-4 pl-6"}>
				<table className={"table-fixed w-full"}>
					<tbody>
					<tr>
						<td className={"w-1/12"}>
							<div className={"flex justify-center"}>
								<img src={userAvt} alt={"----"} className={"w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full overflow-hidden"}/>
							</div>
						</td>
						<td className={"w-2/12"}>
							<p className={"truncate"}>Phan Văn Trường-PGI</p>
							<p className={"mt-1 text-xs text-primary-gray truncate"}>8 liên quan, 2 cc</p>
						</td>
						<td className={"w-8/12"}>
							<p className={"truncate"}>HAR.MAR.Tài liệu giới thiệu thông tin dự án</p>
							<p className={"truncate mt-1 text-primary-gray text-xs"}>Kính gửi anh Hiếu và các anh Chủ đầu tư, Đính kèm là Biên bản họp giao ban tuần 1 tháng 12.2021 ngày 10/12/2021 lúc 2:00 PM giữa Chủ đầu tư và Ban quản lý dự án. Trân trọng, Ms. Linh from CPMI...</p>
						</td>
						<td className={"w-1/12"}>
							<p className={"truncate text-right"}>4 thg 8</p>
						</td>
					</tr>
					</tbody>
				</table>
			</div>

			<p className={"font-bold text-primary-gray mt-6"}>Hình ảnh gần đây</p>
			<div className={"swipe-image w-full mt-4 relative"}>
				<Carousel
					itemsToShow={6}
				 	isRTL={false}
					itemPadding={[0,8,0,8]}
					pagination={false}
					renderArrow={({type, onClick}) => renderPrevNextButton(type, onClick)}
				>
					{
						[...Array(12)].map((e,i) => (
							<div key={i} className={"relative max-w-1/6 rounded border-0.5 border-primary-border overflow-hidden"}>
								<img className={"object-cover w-full max-h-[210px] h-[210px] min-h-[210px]"} src={projectHomeImage} alt={"-----"}/>
								<div className={"absolute bottom-0 bg-cbs-gray py-1 px-2 flex items-start max-w-full"}>
									<img src={userAvt} alt={"---"} className={"w-[28px] h-[28px] min-w-[28px] min-h-[28px] max-w-[28px] max-h-[28px] rounded-full overflow-hidden"}/>
									<div className={"ml-2 w-10/12"}>
										<p className={"truncate"}>Vũ Thanh Duy-CPMI</p>
										<p className={"truncate text-primary-gray text-xs"}>CHT.THT.Xây dựng trường trung học...</p>
										<p className={"truncate text-primary-gray text-xs"}>24/3/2021 16 giờ trước</p>
									</div>
								</div>
							</div>
						))
					}
				</Carousel>
			</div>
			<table className={"mt-6 table-fixed w-full"}>
				<thead>
					<tr className={"border-b-0.5 border-primary-border py-2"}>
						<th className={"w-6/12 text-primary-gray text-left pl-4 py-2"}>Đơn vị</th>
						<th className={"w-3/12 text-primary-gray text-left py-2"}>Tương tác ngày nay</th>
						<th className={"w-3/12 text-primary-gray text-left py-2"}>Tổng tương tác</th>
					</tr>
				</thead>
				<tbody>
					<tr className={"border-b-0.5 border-primary-border"}>
						<td className={"pl-4 py-2"}>
							<div className={"flex items-center"}>
								<img src={imageCompany} alt={"---"} className={"w-[56px] h-[56px] min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-full overflow-hidden"}/>
								<div className={"ml-4"}>
									<p>HAR.Công ty cổ phần đầu tư và phát triển haritex</p>
									<p className={"mt-1 text-primary-gray text-xs"}>05 thành viên</p>
								</div>
							</div>
						</td>
						<td className={"py-2"}>12</td>
						<td className={"py-2"}>105</td>
					</tr>
					<tr className={"border-b-0.5 border-primary-border"}>
						<td className={"pl-4 py-2"}>
							<div className={"flex items-center"}>
								<img src={imageCompany} alt={"---"} className={"w-[56px] h-[56px] min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-full overflow-hidden"}/>
								<div className={"ml-4"}>
									<p>HAR.Công ty cổ phần đầu tư và phát triển haritex</p>
									<p className={"mt-1 text-primary-gray text-xs"}>05 thành viên</p>
								</div>
							</div>
						</td>
						<td className={"py-2"}>12</td>
						<td className={"py-2"}>105</td>
					</tr>
					<tr className={"border-b-0.5 border-primary-border"}>
						<td className={"pl-4 py-2"}>
							<div className={"flex items-center"}>
								<img src={imageCompany} alt={"---"} className={"w-[56px] h-[56px] min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-full overflow-hidden"}/>
								<div className={"ml-4"}>
									<p>HAR.Công ty cổ phần đầu tư và phát triển haritex</p>
									<p className={"mt-1 text-primary-gray text-xs"}>05 thành viên</p>
								</div>
							</div>
						</td>
						<td className={"py-2"}>12</td>
						<td className={"py-2"}>105</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
export default ProjectHomePageV2;