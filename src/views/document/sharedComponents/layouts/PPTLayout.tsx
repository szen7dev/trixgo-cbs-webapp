import { RouteComponentProps } from "react-router-dom";

import TabsList from "views/document/sharedComponents/common/TabsList";

import '../document.css';

const tabs = [
	{ id: "list", title: "List", path: '/' },
	{ id: "x", title: "Phân loại", path: '/1' },
	{ id: "structure", title: "Thư mục", path: '/2' },
	{ id: "report", title: "Báo cáo", path: '/3' },
	{ id: "history", title: "Lịch sử upload file", path: '/4' },
]

const PPTLayout: React.FC<RouteComponentProps> = ({ match, children,...props }) => {
	return (
		<div className="flex flex-col text-sm text-black overflow-hidden h-full">
			{/* Header */}
			<div className="px-2 flex justify-between w-full text-primary-gray bg-white border-b-0.5 border-gray-300">
				<TabsList className="flex flex-1 text-medium" tabs={tabs} url={match.url} />
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

export default PPTLayout
