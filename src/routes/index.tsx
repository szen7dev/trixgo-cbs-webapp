/*=====1.LIBRARY=====*/
import React, { FC, useEffect, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useTranslation } from "react-i18next";

/*=====2.PROVIDERS=====*/
import AuthProvider from "services/providers/Auth";
import ModalProvider from "services/providers/Modal";
import RightClickMenuProvider from "services/providers/RightClickMenu";

/*=====3.LAYOUTS=====*/
import { FullPageLayout } from "shareComponents/layouts";
import { MediaLayout } from "shareComponents/layouts/MediaLayout";
import Policy from "views/authentication/Policy";
import HumanRouterV2 from "./human/indexV2";

/*=====4.CONFIG ROUTE=====*/
const AccountingRouter = lazy(() => import("./accounting"))
const AuthenticationRouter = lazy(() => import("./authentication"))
const BiddingRouter = lazy(() => import("./bidding/indexV2"))//
const CmcsRouterV2 = lazy(() => import("./cmcs/indexV2"))//
const DatahubRouterV2 = lazy(() => import("./datahub/indexV2"))//
const DocumentV2Router = lazy(() => import("./documentV2"))//
const FinancialRouterV2 = lazy(() => import("./financial/indexV2"))//
const MediaRouter = lazy(() => import("./media"))
const MessagesRouter = lazy(() => import("./messages"))
const OwnerRouterV2 = lazy(() => import('./owner/indexV2'))//
const PcmRouter = lazy(() => import('./pcm'))
const PmRouter = lazy(() => import('./pm'))
const WorkshopRouterV2 = lazy(() => import('./workshop/indexV2'))//
const PersonalRouterV2 = lazy(() => import("./personal/indexV2"))//
const FnbRouter = lazy(() => import("./fnb/index"))
const MobileRouter = lazy(() => import("./mobile/index"))
const SupportRouter = lazy(() => import("./support"))
const TimesheetRouter = lazy(() => import("./timesheet/index"))
const ItemRouter = lazy(() => import("./item/index"))
const BudgetRouterV2 = lazy(() => import("./budget/indexV2"))
const PaymentRouter = lazy(() => import("./payment/index"))
const CrmRouter = lazy(() => import("./crm/index"))
const StoreRouter = lazy(() => import("./store/index"))

/*=====5.PAGES=====*/
const ErrorPage = lazy(() => import("views/authentication/Error"))
const HumanLayoutV2 = lazy(() => import("views/human/shareComponents/layoutsV2"))//
const AccountingLayoutV2 = lazy(() => import('views/accounting/shareComponents/layoutsV2'))//
const PcmPrintTaskTypeOnePage = lazy(() => import('views/pcm/pages/PcmPrintTaskTypeOne'))
const PcmPrintTaskTypeTwoPage = lazy(() => import('views/pcm/pages/PcmPrintTaskTypeTwo'))
const PcmPrintTaskTypeThreePage = lazy(() => import('views/pcm/pages/PcmPrintTaskTypeThree'))
const PcmPrintTaskTypeFourPage = lazy(() => import('views/pcm/pages/PcmPrintTaskTypeFour'))
const PcmPrintTaskTypeFivePage = lazy(() => import('views/pcm/pages/PcmPrintTaskTypeFive'))
const FnbPrintBillListPage = lazy(() => import('views/fnb/pages/FnbPrintBillListPage'))
const FnbPrintBillListPage2 = lazy(() => import('views/fnb/pages/FnbPrintBillListPage2'))

const Routes: FC = () => {
    const { t } = useTranslation()
    useEffect(() => {
        document.title = `${t("menu:homeTitle")}`;
    }, [])

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
                        <ModalProvider>
                            <Switch>
                                {/* =====PRINT===== */}
                                <Route exact path="/pcm/detail/:id/print/1" component={PcmPrintTaskTypeOnePage} />
                                <Route exact path="/pcm/detail/:id/print/2" component={PcmPrintTaskTypeTwoPage} />
                                <Route exact path="/pcm/detail/:id/print/3" component={PcmPrintTaskTypeThreePage} />
                                <Route exact path="/pcm/detail/:id/print/4" component={PcmPrintTaskTypeFourPage} />
                                <Route exact path="/pcm/detail/:id/print/5" component={PcmPrintTaskTypeFivePage} />
                                <Route exact path="/fnb/home/:orderID/print/2" component={FnbPrintBillListPage} />
                                <Route exact path="/fnb/home/:orderID/print/4" component={FnbPrintBillListPage2} />

                                {/* =====AUTHENTICATION===== */}
                                <Route path="/(authentication|login)/:path?">
                                    <AuthenticationRouter />
                                </Route>
                                <Route exact path="/"><PcmRouter /></Route>
                                <Route path="/support"><SupportRouter /></Route>
                                <Route path="/owner"><OwnerRouterV2 /></Route>
                                <Route path="/personal"><PersonalRouterV2 /></Route>
                                <Route path="/item"><ItemRouter /></Route>
                                <Route path="/pcm"><PcmRouter /></Route>
                                <Route path="/pm"><PmRouter /></Route>
                                <Route path="/document"><DocumentV2Router /></Route>
                                <Route path="/cmcs"><CmcsRouterV2/></Route>
                                <Route path="/human">
                                    <HumanLayoutV2>
                                        <HumanRouterV2 />
                                    </HumanLayoutV2>
                                </Route>
                                <Route path="/accounting">
                                    <AccountingLayoutV2>
                                        <AccountingRouter />
                                    </AccountingLayoutV2>
                                </Route>
                                <Route path="/budget"><BudgetRouterV2 /></Route>
                                <Route path="/financial"><FinancialRouterV2 /></Route>
                                <Route path="/bidding"><BiddingRouter /></Route>
                                <Route path="/datahub"><DatahubRouterV2 /></Route>
                                <Route path="/timesheet"><TimesheetRouter /></Route>
                                <Route path="/workshop"><WorkshopRouterV2 /></Route>
                                <Route path="/fnb"><FnbRouter /></Route>
                                <Route path="/payment"><PaymentRouter/></Route>
                                <Route path="/crm"><CrmRouter/></Route>
                                <Route path="/store"><StoreRouter/></Route>
                                <Route path="/mobile"><MobileRouter /></Route>
                                <Route path="/messages"><MessagesRouter /></Route>
                                <Route path="/media">
                                    <MediaLayout>
                                        <MediaRouter />
                                    </MediaLayout>
                                </Route>
                                {/* <Route
                                    exact
                                    path="/policy"
                                    component={Policy}
                                /> */}
                                <Route
                                    exact
                                    path="/privacy-policy"
                                    component={Policy}
                                />
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
    )
}

export default Routes