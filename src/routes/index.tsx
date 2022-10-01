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
import { MediaLayout } from "shareComponents/layouts/MediaLayout";
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
// const CmcsRouter = lazy(() => import("./cmcs/index"));
const CmcsRouterV2 = lazy(() => import("./cmcs/indexV2"));
// const DatahubRouter = lazy(() => import("./datahub"));
const DatahubRouterV2 = lazy(() => import("./datahub/indexV2"));
// const DocumentRouter = lazy(() => import("./document"));
const DocumentV2Router = lazy(() => import("./documentV2"));
// const PPTRouter = lazy(() => import("./ppt"));
// const FinancialRouter = lazy(() => import("./financial"));
const FinancialRouterV2 = lazy(() => import("./financial/indexV2"));
// const HumanRouter = lazy(() => import("./human"));
// const MarketRouter = lazy(() => import("./market"));
const MarketRouterV2 = lazy(() => import("./market/indexV2"));
const MediaRouter = lazy(() => import("./media"));
const MessagesRouter = lazy(() => import("./messages"));
// const OperationRouter = lazy(() => import("./operation"));
const OperationRouterV2 = lazy(() => import("./operation/indexV2"));
// const OwnerRouter = lazy(() => import('./owner'));
const OwnerRouterV2 = lazy(() => import('./owner/indexV2'));
const PcmRouter = lazy(() => import('./pcm'));
const PmRouter = lazy(() => import('./pm'));
// const WorkshopRouter = lazy(() => import('./workshop'));
const WorkshopRouterV2 = lazy(() => import('./workshop/indexV2'));
// const PersonalRouter = lazy(() => import("./personal"));
const PersonalRouterV2 = lazy(() => import("./personal/indexV2"));
// const QrcodeRouter = lazy(() => import("./qrcode"));
const QrcodeRouterV2 = lazy(() => import("./qrcode/indexV2"));
// const ReeRouter = lazy(() => import("./ree"));
const ReeRouterV2 = lazy(() => import("./ree/indexV2"));
const InspectionRouter = lazy(() => import("./inspection/index"));
const SupportRouter = lazy(() => import("./support"));
// const TimesheetRouter = lazy(() => import("./timesheet"));
const TimesheetRouterV2 = lazy(() => import("./timesheet/indexV2"));
// const ItemRouter = lazy(() => import("./item"));
const ItemRouterV2 = lazy(() => import("./item/indexV2"));
// const BudgetRouter = lazy(() => import("./budget"));
const BudgetRouterV2 = lazy(() => import("./budget/indexV2"));

/*=====5.PAGES=====*/
const ErrorPage = lazy(() => import("views/authentication/Error"));
const HomeLayout = lazy(() => import("shareComponents/layouts"));
// const HumanLayout = lazy(() => import("views/human/shareComponents/layouts"));
const HumanLayoutV2 = lazy(() => import("views/human/shareComponents/layoutsV2"));
// const DocumentLayout = lazy(() => import('views/document/sharedComponents/layouts'));
// const AccountingLayout = lazy(() => import('views/accounting/shareComponents/layouts'));
const AccountingLayoutV2 = lazy(() => import('views/accounting/shareComponents/layoutsV2'));
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
                                {/* =====PRINT===== */}
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
                                    <AccountingLayoutV2>
                                        <AccountingRouter />
                                    </AccountingLayoutV2>
                                </Route>

                                {/* =====BIDDING===== */}
                                <Route path="/bidding">
                                    <BiddingRouter />
                                </Route>

                                {/* =====CMCS===== */}
                                <Route path="/cmcs">
                                    <CmcsRouterV2/>
                                </Route>

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

                                {/* =====HUMAN===== */}
                                <Route path="/human">
                                    <HumanLayoutV2>
                                        <HumanRouterV2 />
                                    </HumanLayoutV2>
                                </Route>

                                {/* =====FINANCIAL===== */}
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

                                {/* =====OWNER===== */}
                                <Route path="/owner">
                                    <OwnerRouterV2 />
                                </Route>

                                <Route path="/budget">
                                    <BudgetRouterV2 />
                                </Route>

                                {/* =====TIMESHEET===== */}
                                <Route path="/timesheet">
                                    <TimesheetRouterV2 />
                                </Route>

                                {/* =====WORKSHOP===== */}
                                <Route path="/workshop">
                                    <WorkshopRouterV2 />
                                </Route>

                                {/* =====MARKET===== */}
                                <Route path="/market">
                                    <MarketRouterV2 />
                                </Route>

                                {/* =====QRCODE===== */}
                                <Route path="/qrcode">
                                    <QrcodeRouterV2 />
                                </Route>

                                {/* =====OPERATION===== */}
                                <Route path="/operation">
                                    <OperationRouterV2 />
                                </Route>

                                {/* =====REE===== */}
                                <Route path="/ree">
                                    <ReeRouterV2 />
                                </Route>

                                {/* =====MEDIA===== */}
                                <Route path="/media">
                                    <MediaLayout>
                                        <MediaRouter />
                                    </MediaLayout>
                                </Route>

                                {/* =====PERSONAL===== */}
                                <Route path="/personal">
                                    <PersonalRouterV2 />
                                </Route>

                                {/* =====SUPPORT===== */}
                                <Route path="/support">
                                    <SupportRouter />
                                </Route>

                                {/* =====MESSAGES===== */}
                                <Route path="/messages">
                                    <MessagesRouter />
                                </Route>

                                {/* =====SUPPERVISION===== */}
                                <Route path="/inspection">
                                    <InspectionRouter />
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