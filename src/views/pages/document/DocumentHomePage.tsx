/**
 * ? Import orders:
 * ? 1. react importation
 * ? 2. third party libraries importation
 * ? 3. libs, services, data, api importation
 * ? 4. components, assets importation
 * ? 5. helpers, util importation
 * ? 6. typings importation
 */
import { FC, useState } from "react";

import { Link } from "react-router-dom";
import cn from "classnames";

import iconFilter from 'assets/images/icons8-filter-96.png';
import projectImage from "assets/images/project.jpg";
import styles from './document.module.css';

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

	const data: Array<IData> = Array.from(Array(30).keys()).map((_, i) => ({
		id: i,
		title: 'CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây',
		company: 'Công ty Cổ phần Đầu tư và Thương mại Thủ Đô',
		count: 288
	}))

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
			<div className="flex flex-wrap w-full px-4 pt-2 pb-20 flex-1 overflow-y-auto gap-y-2.5 gap-x-2 text-primary-gray">
				{data.map((item) => {
					return (
						<div
							key={item.id}
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
			</div>

			{/* Footer */}
			<div className="w-full sticky bottom-0 bg-white">
				<div className="bg-white px-4 flex items-center justify-between sm:px-6">
					<div className="mx-auto hidden sm:flex-1 sm:flex sm:items-start sm:justify-between mt-5 text-primary-gray" style={{ maxWidth: "1250px" }}>
						<button
							className="relative inline-flex items-center py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ marginLeft: "15px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
							<span style={{ marginRight: "30px", marginLeft: "9px" }}>LÙI</span>
						</button>
						<nav className="relative z-0 inline-flex " aria-label="Pagination">
							{/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
							<div className={cn("pb-4 border-b-2 border-transparent", { "border-primary text-primary": page === 1 })}>
								<button
									aria-current="page"
									className={cn("relative inline-flex items-center px-4 py-2 text-sm mx-1 font-bold bg-gray-100 rounded-md", { "bg-gray-100": page === 1 })}
								>
									1
								</button>
							</div>
							<div className={"pb-4 border-b-2 border-transparent"}>
								<button
									className="relative inline-flex items-center px-4 py-2 text-sm mx-1 font-bold bg-gray-100 rounded-md"
								>
									2
								</button>
							</div>
							<div className={"pb-4 border-b-2 border-transparent"}>
								<button
									className="hidden md:inline-flex relative items-center px-4 py-2 text-sm mx-1 font-bold bg-gray-100 rounded-md"
								>
									3
								</button>
							</div>
							<span className="relative inline-flex items-center px-4 py-2 text-sm mx-1 font-bold">
								...
							</span>
							<div className={"pb-4 border-b-2 border-transparent"}>
								<button
									className="hidden md:inline-flex relative items-center px-4 py-2 text-sm mx-1 font-bold bg-gray-100 rounded-md"
								>
									8
								</button>
							</div>
							<div className={"pb-4 border-b-2 border-transparent"}>
								<button
									className="relative inline-flex items-center px-4 py-2 text-sm mx-1 font-bold bg-gray-100 rounded-md"
								>
									9
								</button>
							</div>
							<div className={"pb-4 border-b-2 border-transparent"}>
								<button
									className="relative inline-flex items-center px-4 py-2 text-sm mx-1 font-bold bg-gray-100 rounded-md"
								>
									10
								</button>
							</div>
						</nav>
						<button
							className="ml-3 relative inline-flex items-center py-2 text-sm rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
						>
							<span style={{ marginLeft: "30px", marginRight: "9px" }}>TIẾP</span>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ marginRight: "15px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DocumentHomePage;
