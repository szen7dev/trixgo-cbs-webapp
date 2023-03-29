/*=====1.LIBRARY=====*/
import { FC, lazy, Suspense } from "react";
import { Route } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import WorkshopLayoutV2 from "views/workshop/sharedComponents/layoutsV2/WorkshopLayout";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
const WorkshopCategory = lazy(() => import("views/workshop/pages/WorkshopCategory"));
const WorkshopList = lazy(() => import("views/workshop/pages/WorkshopList"));
const WorkshopEditor = lazy(() => import("views/workshop/pages/WorkshopEditor"));

const WorkshopRouterV2: FC = () => {
	return (
		<WorkshopLayoutV2>
			<Suspense fallback={<div className="absolute inset-0 flex justify-center items-center">
				<span className="cbs-clock">
				</span>
			</div>}>
				<Route exact path="/workshop/home" component={WorkshopCategory} />
				<Route exact path="/workshop/home/category/:id" component={WorkshopList} />
				<Route exact path="/workshop/home/category/:id/:workshopID" component={WorkshopEditor} />
			</Suspense>
		</WorkshopLayoutV2>
	)
};

export default WorkshopRouterV2;