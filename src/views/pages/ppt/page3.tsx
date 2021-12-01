import { FC, useEffect, useState } from "react";

import cn from "classnames";

import styles from "./style.module.css";

const _pages = [
	{ id: 'dashboard', title: 'Dashboard', type: 'asc' },
	{ id: 'finnace', title: 'Kế hoạch tài chính', type: 'asc' },
	{ id: 'report', title: 'Báo cáo', type: 'asc' },
]

const ExamplePage: FC = () => {
	const [pages, setPages] = useState(_pages);

	useEffect(() => {
		document.title = "PPT - Dự án đang phát triển"
	}, []);

	return (
		<div className={styles.content}>
			<div className={cn(styles.header, 'px-4 flex justify-between w-full items-center')}>
				<div className="flex flex-wrap h-full justify-center flex-1">
					{pages.map(page => <div key={page.id} className={styles.navigator}>
						<button>
							{page.title}
						</button>
					</div>)}
				</div>
				<div className={cn(styles['input-container'], 'rounded-full flex my-2.5')}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<input className="bg-transparent focus:outline-none py-3 px-2.5 flex-1" placeholder="Tìm kiếm" />
				</div>
			</div>
			<div className="flex-1 overflow-y-auto p-3.5">
				{/* Content */}
			</div>
		</div>
	);
};
export default ExamplePage;
