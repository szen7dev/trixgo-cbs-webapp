import { FC } from "react";

import { Route, RouteComponentProps, Switch } from "react-router-dom";
import ProjectResourcePage from "../ProjectResourcePage";
import LayoutPrimary from "views/pages/media/layouts/LayoutPrimary";

const ProjectResourceRoutes: FC<RouteComponentProps> = ({ match, ...props }) => {
	const pages = [
		{ id: '1', title: 'Danh sách', path: match.url + '/2' },
		{ id: '2', title: 'Gói thầu', path: match.url },
		{ id: '3', title: 'Báo cáo quản trị', path: match.url + '/3' },
	]

	return <LayoutPrimary pages={pages}>
		<Switch>
			<Route exact path={match.url}>
				<ProjectResourcePage />
			</Route>
			<Route exact path={match.url + '/2'}>
				{/* <ProjectDrawing2Page /> */}
				asd
			</Route>
			<Route exact path={match.url + '/3'}>
				{/* <ProjectDrawing2Page /> */}
				asd
			</Route>
		</Switch>
	</LayoutPrimary>
}

export default ProjectResourceRoutes
