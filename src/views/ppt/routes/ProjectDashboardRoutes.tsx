import { FC } from "react";

import { Route, RouteComponentProps, Switch } from "react-router-dom";
import LayoutPrimary from "views/pages/media/layouts/LayoutPrimary";
import ProjectDashboardTaskPage from "../ProjectDashboardTaskPage";

const ProjectDashboardRoutes: FC<RouteComponentProps> = ({ match, ...props }) => {
	const pages = [
		{ id: '1', title: 'Dashboard1', path: match.url + '/2' },
		{ id: '2', title: 'Dashboard2', path: match.url },
		{ id: '3', title: 'Dashboard3', path: match.url + '/3' },
	]

	return <LayoutPrimary pages={pages}>
		<Switch>
			<Route exact path={match.url}>
				<ProjectDashboardTaskPage />
			</Route>
			<Route exact path={match.url + '/2'}>
				asd
			</Route>
			<Route exact path={match.url + '/3'}>
				asd
			</Route>
		</Switch>
	</LayoutPrimary>
}

export default ProjectDashboardRoutes
