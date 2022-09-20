/*=====1.LIBRARY=====*/
import React, { FC, useEffect, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/
import AuthProvider from "services/providers/Auth";
import ModalProvider from "services/providers/Modal";
// import ChatProvider from "services/providers/Chat";
// import DeleteConfirmProvider from "services/providers/DeleteConfirm";
import RightClickMenuProvider from "services/providers/RightClickMenu";

/*=====3.LAYOUTS=====*/
import { FullPageLayout } from "shareComponents/layouts";
import Policy from "views/authentication/Policy";
import { HomePage } from "views/financial/pages/HomePage";
import { FinancialLayoutV2 } from "views/financial/sharedComponents/layoutsV2";
import { HumanHomePage } from "views/human/pages";
import HumanRouterV2 from "./human/indexV2";
// import FinancialRouterV2 from "./financial/indexV2";

// import { Loader } from "shareComponents/common";
/*=====4.CONFIG ROUTE=====*/
const AccountingRouter = lazy(() => import("./accounting"));
const AuthenticationRouter = lazy(() => import("./authentication"));
const SampleRouter = lazy(() => import("./sample"));
// const BiddingRouter = lazy(() => import("./bidding"));
const BiddingRouter = lazy(() => import("./bidding/v2"));
const CmcsRouter = lazy(() => import("./cmcs"));
const DatahubRouter = lazy(() => import("./datahub"));
const DatahubRouterV2 = lazy(() => import("./datahub/indexV2"));
// const DocumentRouter = lazy(() => import("./document"));
const DocumentV2Router = lazy(() => import("./documentV2"));
// const PPTRouter = lazy(() => import("./ppt"));
const FinancialRouter = lazy(() => import("./financial"));
const FinancialRouterV2 = lazy(() => import("./financial/indexV2"));
const HumanRouter = lazy(() => import("./human"));
const MarketRouter = lazy(() => import("./market"));
const MediaRouter = lazy(() => import("./media"));
const MessagesRouter = lazy(() => import("./messages"));
const OperationRouter = lazy(() => import("./operation"));
const OwnerRouter = lazy(() => import('./owner'));
const PcmRouter = lazy(() => import('./pcm'));
const PmRouter = lazy(() => import('./pm'));
const WorkshopRouter = lazy(() => import('./workshop'));
const PersonalRouter = lazy(() => import("./personal"));
const QrcodeRouter = lazy(() => import("./qrcode"));
const ReeRouter = lazy(() => import("./ree"));
const SupportRouter = lazy(() => import("./support"));
const TimesheetRouter = lazy(() => import("./timesheet"));
const ItemRouter = lazy(() => import("./item"));
const ItemRouterV2 = lazy(() => import("./item/indexV2"));
const BudgetRouter = lazy(() => import("./budget"));

/*=====5.PAGES=====*/
const ErrorPage = lazy(() => import("views/authentication/Error"));
const HomeLayout = lazy(() => import("shareComponents/layouts"));
const HumanLayout = lazy(() => import("views/human/shareComponents/layouts"));
const HumanLayoutV2 = lazy(() => import("views/human/shareComponents/layoutsV2"));
// const DocumentLayout = lazy(() => import('views/document/sharedComponents/layouts'));
const AccountingLayout = lazy(() => import('views/accounting/shareComponents/layouts'));
const PcmPrintTaskTypeOnePage = lazy(() => import('views/pcm/pages/PcmPrintTaskTypeOne'));
const PcmPrintTaskTypeTwoPage = lazy(() => import('views/pcm/pages/PcmPrintTaskTypeTwo'));
const PcmPrintTaskTypeThreePage = lazy(() => import('views/pcm/pages/PcmPrintTaskTypeThree'));
const PcmPrintTaskTypeFourPage = lazy(() => import('views/pcm/pages/PcmPrintTaskTypeFour'));

const Routes: FC = () => {
    useEffect(() => {
        document.title = "Trixgo | Quản trị doanh nghiệp";
    }, []);

    return (
        <React.Suspense fallback={
            <div className="fixed inset-0 flex justify-center items-center">
                <span className="cbs-clock">
                </span>
            </div>
        }>
            <Router>
                <AuthProvider>
                    <RightClickMenuProvider>
                        <Route path="/sample">
                            <SampleRouter />
                        </Route>

                        <ModalProvider>
                            <Switch>

                                <Route exact path="/pcm/detail/:id/print/1" component={PcmPrintTaskTypeOnePage} />
                                <Route exact path="/pcm/detail/:id/print/2" component={PcmPrintTaskTypeTwoPage} />
                                <Route exact path="/pcm/detail/:id/print/3" component={PcmPrintTaskTypeThreePage} />
                                <Route exact path="/pcm/detail/:id/print/4" component={PcmPrintTaskTypeFourPage} />

                                {/* =====AUTHENTICATION===== */}
                                <Route path="/(authentication|login)/:path?">
                                    <AuthenticationRouter />
                                </Route>

                                {/* =====SAMPLE UI===== */}
                                <Route path="/sample">
                                    <SampleRouter />
                                </Route>

                                {/* =====HOME===== */}
                                <Route exact path="/">
                                    <PcmRouter />
                                </Route>

                                {/* =====ACCOUNTING===== */}
                                <Route path="/accounting/:fundaID">
                                    <AccountingLayout>
                                        <AccountingRouter />
                                    </AccountingLayout>
                                </Route>

                                {/* =====BUDGET===== */}
                                <Route path="/budget">
                                    <BudgetRouter />
                                </Route>

                                {/* =====BIDDING===== */}
                                <Route path="/bidding">
                                    <BiddingRouter />
                                </Route>

                                {/* =====CMCS===== */}
                                <Route path="/cmcs">
                                    <CmcsRouter />
                                </Route>

                                {/* =====DATHUB===== */}
                                {/* <Route path="/datahub">
                                    <DatahubRouter />
                                </Route> */}

                                {/* =====DOCUMENT===== */}
                                {/* <Route path="/document">
                                    <DocumentLayout>
                                        <DocumentRouter />
                                    </DocumentLayout>
                                </Route> */}

                                {/* =====DOCUMENT V2===== */}
                                <Route path="/document">
                                    <DocumentV2Router />
                                </Route>

                                {/* =====PCM===== */}
                                <Route path="/pcm">
                                    <PcmRouter />
                                </Route>

                                {/* =====PM===== */}
                                <Route path="/pm">
                                    <PmRouter />
                                </Route>

                                {/* =====FINANCIAL===== */}
                                {/* <Route path="/financial">
                                    <FinancialRouter />
                                </Route> */}

                                {/* =====HUMAN===== */}
                                {/* <Route path="/human">
                                    <HumanLayout>
                                        <HumanRouter />
                                    </HumanLayout>
                                </Route> */}

                                {/* =====V2===== */}
                                {/* =====HUMAN===== */}
                                <Route path="/human">
                                    <HumanLayoutV2>
                                        <HumanRouterV2 />
                                    </HumanLayoutV2>
                                </Route>
                                {/* =====financial===== */}
                                <Route path="/financial">
                                        <FinancialRouterV2 />
                                </Route>
                                {/* =====ITEM===== */}
                                <Route path="/item">
                                    <ItemRouterV2 />
                                </Route>
                                {/* =====DATHUB===== */}
                                <Route path="/datahub">
                                    <DatahubRouterV2 />
                                </Route>
                                {/* =====end V2===== */}

                                {/* =====MARKET===== */}
                                <Route path="/market">
                                    <MarketRouter />
                                </Route>

                                {/* =====MEDIA===== */}
                                <Route path="/media">
                                    <HomeLayout>
                                        <MediaRouter />
                                    </HomeLayout>
                                </Route>

                                {/* =====MARKET===== */}
                                <Route path="/market">
                                    <MarketRouter />
                                </Route>

                                {/* =====OPERATION===== */}
                                <Route path="/operation">
                                    <OperationRouter />
                                </Route>

                                {/* =====OWNER===== */}
                                <Route path="/owner">
                                    <OwnerRouter />
                                </Route>

                                {/* =====PERSONAL===== */}
                                <Route path="/personal">
                                    <PersonalRouter />
                                </Route>

                                {/* =====QRCODE===== */}
                                <Route path="/qrcode">
                                    <QrcodeRouter />
                                </Route>

                                {/* =====REE===== */}
                                <Route path="/ree">
                                    <ReeRouter />
                                </Route>

                                {/* =====SUPPORT===== */}
                                <Route path="/support">
                                    <SupportRouter />
                                </Route>

                                {/* =====ITEM===== */}
                                {/* <Route path="/item">
                                    <ItemRouter />
                                </Route> */}

                                {/* =====WORKSHOP===== */}
                                <Route path="/workshop">
                                    <WorkshopRouter />
                                </Route>

                                {/* =====MESSAGES===== */}
                                <Route path="/messages">
                                    <MessagesRouter />
                                </Route>

                                {/* =====TIMESHEET===== */}
                                <Route path="/timesheet">
                                    <TimesheetRouter />
                                </Route>

                                {/* =====POLICY===== */}
                                <Route
                                    exact
                                    path="/policy"
                                    component={Policy}
                                />

                                {/* =====OTHER===== */}
                                <Route path="*">
                                    <FullPageLayout>
                                        <Route path="/*" component={ErrorPage} />
                                    </FullPageLayout>
                                </Route>

                            </Switch>
                        </ModalProvider>

                    </RightClickMenuProvider>
                </AuthProvider>
            </Router>
        </React.Suspense>
    );
};

export default Routes