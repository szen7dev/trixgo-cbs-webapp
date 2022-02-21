import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";

import TabsList from "views/pages/document/components/common/TabsList";
import DocumentFolderPage from "views/pages/document/screens/DocumentFolderPage";
import DocumentHistoryPage from "views/pages/document/screens/DocumentHistoryPage";
import DocumentProfilePage from "views/pages/document/screens/DocumentProfilePage";
import DocumentProjectPage from "views/pages/document/screens/DocumentProjectPage";
import DocumentReportPage from "views/pages/document/screens/DocumentReportPage";

import '../document.css';

const tabs = [
	{ id: "list", title: "List", path: '/' },
	{ id: "x", title: "Phân loại", path: '/1' },
	{ id: "structure", title: "Thư mục", path: '/2' },
	{ id: "report", title: "Báo cáo", path: '/3' },
	{ id: "history", title: "Lịch sử upload file", path: '/4' },
]

const DocumentNav: React.FC<RouteComponentProps> = ({ match }) => {
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
					<Switch>
						<Route exact path={'/document/project/:id/document'} component={DocumentProjectPage} />
						<Route exact path={'/document/project/:id/document/1'} component={DocumentProfilePage} />
						<Route exact path={'/document/project/:id/document/2'} component={DocumentFolderPage} />
						<Route exact path={'/document/project/:id/document/3'} component={DocumentReportPage} />
						<Route exact path={'/document/project/:id/document/4'} component={DocumentHistoryPage} />
						<Route path={'/document/project/:id/document/*'}>
							<Redirect to='/document/dashboard' />
						</Route>
					</Switch>
				</div>
			</div>
	);
}

export default DocumentNav
