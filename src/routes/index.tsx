/*=====1.LIBRARY=====*/
import React, { FC, useEffect, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/
import AuthProvider from "services/providers/Auth";
import ModalProvider from "services/providers/Modal";
import ChatProvider from "services/providers/Chat";
import DeleteConfirmProvider from "services/providers/DeleteConfirm";
import RightClickMenuProvider from "services/providers/RightClickMenu";

/*=====3.LAYOUTS=====*/
import { FullPageLayout } from "shareComponents/layouts";
import Policy from "views/authentication/Policy";

// import { Loader } from "shareComponents/common";
/*=====4.CONFIG ROUTE=====*/
const AccountingRouter = lazy(() => import("./accounting"));
const AuthenticationRouter = lazy(() => import("./authentication"));
const SampleRouter = lazy(() => import("./sample"));
const BiddingRouter = lazy(() => import("./bidding"));
const CmcsRouter = lazy(() => import("./cmcs"));
const DatahubRouter = lazy(() => import("./datahub"));
const DocumentRouter = lazy(() => import("./document"));
const PPTRouter = lazy(() => import("./ppt"));
const FinancialRouter = lazy(() => import("./financial"));
const HumanRouter = lazy(() => import("./human"));
const MarketRouter = lazy(() => import("./market"));
const MediaRouter = lazy(() => import("./media"));
const MessagesRouter = lazy(() => import("./messages"));
const OperationRouter = lazy(() => import("./operation"));
const OwnerRouter = lazy(() => import('./owner'));
const PcmRouter = lazy(() => import('./pcm'));
const WorkshopRouter = lazy(() => import('./workshop'));
const PersonalRouter = lazy(() => import("./personal"));
const QrcodeRouter = lazy(() => import("./qrcode"));
const ReeRouter = lazy(() => import("./ree"));
const SupportRouter = lazy(() => import("./support"));
const TimesheetRouter = lazy(() => import("./timesheet"));
const ItemRouter = lazy(() => import("./item"));
const BudgetRouter = lazy(() => import("./budget"));

/*=====5.PAGES=====*/
const ErrorPage = lazy(() => import("views/authentication/Error"));
const HomeLayout = lazy(() => import("shareComponents/layouts"));
const HumanLayout = lazy(() => import("views/human/shareComponents/layouts"));
const DocumentLayout = lazy(() => import('views/document/sharedComponents/layouts'));
const AccountingLayout = lazy(() => import('views/accounting/shareComponents/layouts'));

const Routes: FC = () => {
    useEffect(() => {
        document.title = "Trixgo | Quản trị doanh nghiệp";
    }, []);

    return (
        <React.Suspense fallback={<div className="fixed inset-0 flex justify-center items-center">
            <span className="cbs-clock">
            </span>
        </div>}>
            <Router>
                <AuthProvider>
                    <RightClickMenuProvider>
                        <Route path="/sample">
                            <SampleRouter />
                        </Route>
                        {/*<DeleteConfirmProvider>*/}
                        {/*    <ChatProvider>*/}
                        <ModalProvider>
                            <Switch>

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
                                <Route path="/datahub">
                                    <DatahubRouter />
                                </Route>

                                {/* =====DOCUMENT===== */}
                                <Route path="/document">
                                    <DocumentLayout>
                                        <DocumentRouter />
                                    </DocumentLayout>
                                </Route>

                                {/* =====PCM===== */}
                                <Route path="/pcm">
                                    <PcmRouter />
                                </Route>

                                {/* =====PPT===== */}
                                <Route
                                    path='/ppt'
                                    component={PPTRouter}
                                />

                                {/* =====FINANCIAL===== */}
                                <Route path="/financial">
                                    <FinancialRouter />
                                </Route>

                                {/* =====HUMAN===== */}
                                <Route path="/human">
                                    <HumanLayout>
                                        <HumanRouter />
                                    </HumanLayout>
                                </Route>

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
                                <Route path="/item">
                                    <ItemRouter />
                                </Route>

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
                        {/*</ChatProvider>*/}
                        {/*</DeleteConfirmProvider>*/}
                    </RightClickMenuProvider>
                </AuthProvider>
            </Router>
        </React.Suspense>
    );
};

export default Routes