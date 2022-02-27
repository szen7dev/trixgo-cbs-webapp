/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ProtectedRoute } from "routes/components";

/*=====2.PROVIDERS=====*/
import { ModalProvider } from "views/document/contexts/modal";

/*=====3.LAYOUTS=====*/
import { HomeLayout } from "shareComponents/layouts";
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary'
import LayoutProjectSecondary from 'views/ppt/sharedComponents/layouts/LayoutProjectSecondary'

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import { WorkshopCategory, WorkshopList } from "views/workshop/pages";
import WorkshopLayout from "views/workshop/sharedComponents/layouts/WorkshopLayout";

const WorkshopRouter: FC = () => {
	return (
		<WorkshopLayout>
			<Route exact path="/workshop/home" component={WorkshopCategory} />
			<Route exact path="/workshop/list" component={WorkshopList} />
		</WorkshopLayout>
	)
};

export default WorkshopRouter;