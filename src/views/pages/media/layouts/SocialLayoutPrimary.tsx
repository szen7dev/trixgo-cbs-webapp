import { FC } from "react";

import iconFilter from 'assets/images/icons8-filter-96.png';
import LayoutPrimary from "./LayoutPrimary";

const pages = [
	{ id: "0", title: 'Nội bộ công ty', path: '/social/home' },
	{ id: "1", title: 'Dự án phòng ban', path: '/social/home/2' },
	{ id: "2", title: 'Chuyển đổi số', path: '/social/home/3' },
	{ id: "3", title: 'Tin hệ thống', path: '/social/home/4' },
	{ id: "4", title: 'Lưu trữ cá nhân', path: '/social/home/5' },
]
const SocialLayoutPrimary: FC = ({ children }) => {
	return (
		<LayoutPrimary
			pages={pages}
			rightHeader={() => (
				<div className="flex items-center">
					<div className="rounded-full flex my-1.5 bg-gray-100 mr-5" style={{ minWidth: "284px" }}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
						<input className="bg-transparent focus:outline-none py-3 px-2.5 flex-1 leading-[15px]" placeholder="Tìm kiếm" />
					</div>
					<div className="w-10 h-10 rounded bg-gray-100 flex justify-center items-center">
						<img src={iconFilter} alt="icon filter" />
					</div>
				</div>
			)}
		>
			{children}
		</LayoutPrimary>
	)
}

export default SocialLayoutPrimary
