/*=====1.LIBRARY=====*/
import { FC, lazy, Suspense } from "react";
import { Route } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import WorkshopLayout from "views/workshop/sharedComponents/layouts/WorkshopLayout";

const WorkshopCategory = lazy(() => import("views/workshop/pages/WorkshopCategory"));
const WorkshopList = lazy(() => import("views/workshop/pages/WorkshopList"));
const WorkshopEditor = lazy(() => import("views/workshop/pages/WorkshopEditor"));

const WorkshopRouter: FC = () => {
	return (
		<WorkshopLayout>
			<Suspense fallback={<div className="absolute inset-0 flex justify-center items-center">
				<span className="cbs-clock">
				</span>
			</div>}>
				<Route exact path="/workshop/home" component={WorkshopCategory} />
				<Route exact path="/workshop/home/category/:id" component={WorkshopList} />
				<Route exact path="/workshop/home/category/:id/:workshopID" component={WorkshopEditor} />
			</Suspense>
		</WorkshopLayout>
	)
};

export default WorkshopRouter;