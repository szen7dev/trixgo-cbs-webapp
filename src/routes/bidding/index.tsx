/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { BiddingLayout } from "views/bidding/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
	BiddingHomePage,
	BiddingOtherPage,
	BiddingDetailHomePage,
	BiddingTechnicalRequirements,
	BiddingMaterialRequirements,
	BiddingFinancialProposals,
	FinancialBiddingDocuments,
	ProjectBiddingPage,
	BiddingPlanPage,
	BiddingPlanPageDoc
} from "views/bidding/pages";
import LayoutSecondary from "views/bidding/shareComponents/layouts/LayoutSecondary";

const BiddingRouter: FC = () => {
	return (
		<BiddingLayout>
			<Switch>
				<Route exact path="/bidding/home" component={BiddingHomePage} />
				<Route exact path="/bidding/other" component={BiddingOtherPage} />
				<Route exact path="/bidding/plan" component={ProjectBiddingPage} />
				<Route exact path="/bidding/plan/:projectID" component={BiddingPlanPage} />
				<Route exact path="/bidding/plan/:projectID/:planID" component={BiddingPlanPageDoc} />
				<Route exact path={["/bidding/:id", '/bidding/:id/(1|2|3)']} >
					<LayoutSecondary back pages={[
						{ id: '1', path: '/bidding/:id', navExact: true, title: 'Home' },
						{ id: '2', path: '/bidding/:id/1', title: 'Yêu cầu kỹ thuật' },
						{ id: '3', path: '/bidding/:id/2', title: 'Yêu cầu vật tư thiết bị' },
						{ id: '4', path: '/bidding/:id/3', title: 'Đề xuất tài chính' },
					]} >
						<Switch>
							<Route exact path="/bidding/:id" component={BiddingDetailHomePage} />
							<Route exact path="/bidding/:id/1" component={BiddingTechnicalRequirements} />
							<Route exact path="/bidding/:id/2" component={BiddingMaterialRequirements} />
							<Route exact path="/bidding/:id/3" component={BiddingFinancialProposals} />
						</Switch>
					</LayoutSecondary>
				</Route>
				<Route exact path="/bidding/:id/3/item/:itemId" component={FinancialBiddingDocuments} />
				<Route path="/bidding/*" component={ErrorPage} />
			</Switch>
		</BiddingLayout>
	)
};

export default BiddingRouter;