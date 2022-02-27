/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import { WorkshopCategory, WorkshopList, WorkshopEditor } from "views/workshop/pages";
import WorkshopLayout from "views/workshop/sharedComponents/layouts/WorkshopLayout";

const WorkshopRouter: FC = () => {
	return (
		<WorkshopLayout>
			<Route exact path="/workshop/home" component={WorkshopCategory} />
			<Route exact path="/workshop/home/category/:id" component={WorkshopList} />
			<Route exact path="/workshop/home/category/:id/:workshopID" component={WorkshopEditor} />
		</WorkshopLayout>
	)
};

export default WorkshopRouter;