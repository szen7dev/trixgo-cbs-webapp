/**
 * ? Import orders:
 * ? 1. react importation
 * ? 2. third party libraries importation
 * ? 3. libs, services, data, api importation
 * ? 4. components, assets importation
 * ? 5. helpers, util importation
 * ? 6. typings importation
 */
import { FC, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import cn from "classnames";

import iconFilter from 'assets/images/icons8-filter-96.png';
import projectImage from "assets/images/project.jpg";
import styles from '../document.module.css';
import InfiniteScroll from "react-infinite-scroll-component";

interface IData {
	id: number
	title: string
	company: string
	count: number
}

const tabs = [
	{ id: "projects", title: "Dự án, phòng ban" },
	{ id: "Manage", title: "Quản trị ứng dụng" },
]

const DocumentHomePage: FC = () => {
	const [tab, setTab] = useState<string>(tabs[0].id)
	const [page] = useState<number>(1);
	const [data, setData] = useState<IData[]>(Array.from({ length: 20 }).map((_, index) => ({
		id: index,
		title: 'CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây',
		company: 'Công ty Cổ phần Đầu tư và Thương mại Thủ Đô',
		count: 288
	})));
	const [loading, setLoading] = useState<boolean>(true);

	const fetchData = () => {
		setTimeout(() => {
			setData(data.concat(Array.from({ length: 20 }).map((_, index) => ({
				id: index,
				title: 'CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây',
				company: 'Công ty Cổ phần Đầu tư và Thương mại Thủ Đô',
				count: 288
			}))));
		}, 1500);
	}

	return (
		<div className="flex flex-col text-sm text-black overflow-hidden h-full">
			{/* Header */}
			<div className="px-4 flex justify-between w-full text-primary-gray bg-white border border-gray-300">
				<div className="flex flex-1 justify-center text-[14px]">
					{tabs.map(({ id, title }) => (
						<button
							key={id}
							className={cn("border-b-2 border-transparent mx-2 leading-4", { 'border-primary text-black font-bold': id === tab })}
							style={{ minWidth: "148px" }}
							onClick={() => setTab(id)}
						>
							{title}
						</button>
					))}
				</div>
				<div className="flex items-center">
					<div className="rounded-full flex my-2.5 bg-gray-100 mr-5" style={{ minWidth: "284px" }}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
						<input className="bg-transparent focus:outline-none py-3 px-2.5 flex-1 leading-[15px]" placeholder="Tìm kiếm" />
					</div>
					<div className="w-10 h-10 rounded bg-gray-100 flex justify-center items-center">
						<img src={iconFilter} alt="icon filter" />
					</div>
				</div>
			</div>

			{/* Content */}
			<div id="scrollable" className="flex-1 overflow-y-auto">
				<InfiniteScroll
					dataLength={data.length} //This is important field to render the next data
					next={fetchData}
					hasMore={true}
					loader={<div className="w-full pt-2 text-center">
						Loading...
					</div>}
					endMessage={
						<p style={{ textAlign: 'center' }}>
							<b>Yay! You have seen it all</b>
						</p>
					}
					
					scrollableTarget="scrollable"
					className="flex flex-wrap w-full px-4 pt-2 pb-20 gap-y-2.5 gap-x-2 text-primary-gray"
				>
					{data.map((item, index) => {
						return (
							<div
								key={index}
								className={cn(
									styles.card,
									"relative mt-2"
								)}
							>
								<div className="flex mb-5">
									<img src={projectImage} alt="Avatar" className={styles.project__image} />
									<div className="flex flex-1 justify-center items-center">
										<div className={cn(styles.project__circle, "rounded-full flex flex-col justify-center items-center")}>
											<p className={cn(styles.text__large, "text-black")}>{item.count}</p>
											<p>Hồ sơ</p>
										</div>
									</div>
								</div>
								<Link className={cn(styles.line, styles.text__base, "text-black")} to="/document/project/id/document">{item.title}</Link>
								<p className={cn(styles.text__small, styles.line__min, "mt-1.5")}>
									{item.company}
								</p>
							</div>
						);
					})}
				</InfiniteScroll>
			</div>
		</div>
	);
};

export default DocumentHomePage;
