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
import InfiniteScroll from "react-infinite-scroll-component";
import cn from "classnames";

import DropdownFilterButton from "../components/DocumentFilterButton";
import SearchInput from "components/common/SearchInput";
import ButtonMore from "../components/common/ButtonMore";
import ButtonCreate from "../components/common/ButtonCreate";

import iconFilter from 'assets/images/icons8-filter-96.png';
import projectImage from "assets/images/project.jpg";
import styles from '../document.module.css';

interface IData {
	id: number
	title: string
	company: string
	count: number
}

const DocumentHomePage: FC = () => {
	const [data, setData] = useState<IData[]>(Array.from({ length: 20 }).map((_, index) => ({
		id: index,
		title: 'CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây',
		company: 'Công ty Cổ phần Đầu tư và Thương mại Thủ Đô',
		count: 288
	})));

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
			<div className="px-4 flex items-center w-full text-primary-gray bg-white border border-gray-300 py-1">
				<div className="flex flex-1 items-center">
					<span className="text-x-large mr-7 text-black">
						Danh sách
					</span>
					<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2" onChange={() => 1} />
					<DropdownFilterButton />
				</div>
				<ButtonCreate />
				<ButtonMore />
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
