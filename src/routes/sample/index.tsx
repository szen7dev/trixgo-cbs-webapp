/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { SampleLayout } from "views/sample/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
	SampleHomePage,
} from "views/sample/pages";

const SampleRouter: FC = () => {
	return (
		<SampleLayout>
			<Switch>
				<Route exact path="/sample/home" component={SampleHomePage} />
				<Route path="/sample/*" component={ErrorPage} />
			</Switch>
		</SampleLayout>
	)
};

export default SampleRouter;