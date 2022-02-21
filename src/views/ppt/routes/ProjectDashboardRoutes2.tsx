import { FC } from "react";
import { Doughnut } from "react-chartjs-2";

import { Route, RouteComponentProps, Switch } from "react-router-dom";
import LayoutPrimary from "views/pages/media/layouts/LayoutPrimary";
import ProjectDashboardTaskPage from "../ProjectDashboardTaskPage";
import ProjectPortfolioPage from "../ProjectPortfolioPage";

const ProjectDashboardRoutes2: FC<RouteComponentProps> = ({ match, ...props }) => {
	const pages = [
		{ id: '1', title: 'Dashboard1', path: match.url + '/2' },
		{ id: '2', title: 'Dashboard2', path: match.url },
		{ id: '3', title: 'Dashboard3', path: match.url + '/3' },
	]

	return <LayoutPrimary pages={pages}>
		<Switch>
			<Route exact path={match.url}>
				<ProjectPortfolioPage />
			</Route>
			<Route exact path={match.url + '/2'}>
				<div>
					<div className="h-44 w-44">
						<Doughnut
							data={{
								labels: ['test', 'test2', 'test3', 'test4', 'test5', 'test6', 'Test7', 'Test8', 'Test9', 'Test10'],
								datasets: [{
									data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
									backgroundColor: ['red', 'blue', 'green'],
									borderWidth: 0,
									hoverBorderWidth: 0,
								}]
							}}
							options={{
								cutout: 50,
								rotation: 90,
								plugins: {
									datalabels: {
										display: false,
									},
									
									legend: {
										display: true,
										position: "right",
										align: "start",
										labels: {
											usePointStyle: true,
										},
									}
								},
							}}
						/>
					</div>
				</div>
			</Route>
			<Route exact path={match.url + '/3'}>
				asd
			</Route>
		</Switch>
	</LayoutPrimary>
}

export default ProjectDashboardRoutes2
