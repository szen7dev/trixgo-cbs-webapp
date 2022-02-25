import { RouteComponentProps } from "react-router-dom";

import { TabsList } from "views/document/sharedComponents/common";

import "views/document/styles/document.css";

const tabs = [
	{ id: "list", title: "List", path: '/' },
	{ id: "x", title: "Phân loại", path: '/1' },
	{ id: "structure", title: "Thư mục", path: '/2' },
	{ id: "report", title: "Báo cáo", path: '/3' },
	{ id: "history", title: "Lịch sử upload file", path: '/4' },
]

const pathname = '/ppt/project/5e847180d7e3490be59aef70/document';

export const PPTLayout: React.FC<RouteComponentProps> = ({ match, children, location, ...props }) => {
	return (
		<div className="flex flex-col text-sm text-black overflow-hidden h-full">
			{/* Header */}
			<div className="px-2 flex justify-between w-full text-primary-gray bg-white border-b-0.5 border-gray-300">
				<TabsList className="flex flex-1 text-medium" tabs={tabs} url={pathname} />
				<div className="py-1 flex items-center">

				</div>
			</div>

			{/* Content */}
			<div className="flex flex-1 flex-col overflow-hidden">
				{children}
			</div>
		</div>
	);
}
