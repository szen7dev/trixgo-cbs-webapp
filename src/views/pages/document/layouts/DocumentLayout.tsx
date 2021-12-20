import { Route, RouteComponentProps } from "react-router-dom";
import TabsList from "../components/common/TabsList";
import DocumentFolderPage from "../screens/DocumentFolderPage";
import DocumentHistoryPage from "../screens/DocumentHistoryPage";
import DocumentProfilePage from "../screens/DocumentProfilePage";
import DocumentProjectPage from "../screens/DocumentProjectPage";
import DocumentReportPage from "../screens/DocumentReportPage";

const tabs = [
	{ id: "list", title: "List", path: '/' },
	{ id: "x", title: "Phân loại", path: '/1' },
	{ id: "structure", title: "Thư mục", path: '/2' },
	{ id: "report", title: "Báo cáo", path: '/3' },
	{ id: "history", title: "Lịch sử upload file", path: '/4' },
]

const DocumentLayout: React.FC<RouteComponentProps> = ({ match }) => {
	return (
		<div className="flex flex-col text-sm text-black overflow-hidden h-full">
			{/* Header */}
			<div className="px-2 flex justify-between w-full text-primary-gray bg-white border border-gray-300">
				<TabsList className="flex flex-1 text-medium" tabs={tabs} url={match.url} />
				<div className="py-1 flex items-center">

				</div>
			</div>

			{/* Content */}
			<div className="flex flex-1 flex-col overflow-hidden">
				<Route path={match.url + '/'} exact component={DocumentProjectPage} />
				<Route path={match.url + '/1'} component={DocumentProfilePage} />
				<Route path={match.url + '/2'} component={DocumentFolderPage} />
				<Route path={match.url + '/3'} component={DocumentReportPage} />
				<Route path={match.url + '/4'} component={DocumentHistoryPage} />
			</div>
		</div>
	);
}

export default DocumentLayout
