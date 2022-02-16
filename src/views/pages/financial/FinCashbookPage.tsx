import React, { FC } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import LayoutPrimary from "../media/layouts/LayoutPrimary";
import PageOne from "./planning/components/FinancialCashbook/PageOne";
import PageTwo from "./planning/components/FinancialCashbook/PageTwo";
import PageTwoDetail from "./planning/components/FinancialCashbook/PageTwoDetail";

const pages = [
	{ id: '1', title: 'Tổng hợp quỹ', path: '/fin/cashbook', state: 1 },
	{ id: '2', title: 'Sổ quỹ công ty', path: '/fin/cashbook', state: 2 },
	{ id: '3', title: 'Sổ quỹ khác', path: '/fin/cashbook', state: 3 },
]
const FinDashboardPage: FC<RouteComponentProps> = ({ match, history, location }) => {
	return (
		<LayoutPrimary pages={pages} value={location.state || 1} >
			<Switch>
				<Route exact path='/fin/cashbook'>
					{(!location.state || location.state === 1) && <PageOne />}
					{location.state === 2 && <PageTwo />}
					{location.state === '3' && <h1>Sổ quỹ3</h1>}
				</Route>
				<Route path='/fin/cashbook/:cashbookId'>
					<PageTwoDetail />
				</Route>
			</Switch>
		</LayoutPrimary>
	)
};

export default FinDashboardPage;