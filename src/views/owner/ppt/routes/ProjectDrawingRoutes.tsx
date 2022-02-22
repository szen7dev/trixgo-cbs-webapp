import { FC } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import LayoutProjectDrawing from "../sharedComponents/layouts/LayoutProjectDrawing";

import ProjectDrawingPage from "../screens/ProjectDrawingPage";
import ProjectDrawing2Page from "../screens/ProjectDrawing2Page";

const ProjectDrawingRoutes: FC<RouteComponentProps> = ({ ...props }) => {
	return <LayoutProjectDrawing {...props}>
		<Switch>
			<Route exact path={props.match.url}>
				<ProjectDrawingPage />
			</Route>
			<Route exact path={props.match.url + '/2'}>
				<ProjectDrawing2Page />
			</Route>
		</Switch>
	</LayoutProjectDrawing>
}

export default ProjectDrawingRoutes
