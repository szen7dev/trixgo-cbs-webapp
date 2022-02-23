/*=====1.LIBRARY=====*/
import { FC, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

/*=====2.PROVIDERS=====*/
import AuthProvider from "services/providers/Auth";
import ModalProvider from "services/providers/Modal";
import ChatProvider from "services/providers/Chat";
import DeleteConfirmProvider from "services/providers/DeleteConfirm";
import RightClickMenuProvider from "services/providers/RightClickMenu";

/*=====3.LAYOUTS=====*/
import { FullPageLayout } from "shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/
// import AccountingRouter from "./accounting";
import AuthenticationRouter from "./authentication";
// import BiddingRouter from "./bidding";
// import CmcsRouter from "./cmcs";
import DatahubRouter from "./datahub";
import DocumentRouter from "./document";
import PPTRouter from "./ppt";
// import FinancialRouter from "./financial";
// import HomeRouter from './home';
import HumanRouter from "./human";
// import MarketRouter from "./market";
import MediaRouter from "./media";
// import MessagesRouter from "./messages";
// import OperationRouter from "./operation";
// import OwnerRouter from './owner';
import PcmRouter from "./pcm";
// import PersonalRouter from "./personal";
// import QrcodeRouter from "./qrcode";
// import ReeRouter from "./ree";
// import SupportRouter from "./support";
// import TimesheetRouter from "./timesheet";
// import WorkshopRouter from "./workshop";

/*=====5.PAGES=====*/
import ErrorPage from "views/authentication/Error";
import { HomeLayout } from "shareComponents/layouts";
import { HumanLayout } from "views/human/shareComponents/layouts";
import { DocumentLayout } from 'views/document/sharedComponents/layouts';

const Routes: FC = () => {
    useEffect(() => {
        document.title = "Trixgo | Quản trị doanh nghiệp";
    }, []);

    return (
        <Router>
            <AuthProvider>
                <RightClickMenuProvider>
                    <DeleteConfirmProvider>
                        <ChatProvider>
                            <ModalProvider>
                                <Switch>

                                    {/* =====HOME===== */}
                                    <Route exact path="/">
                                        <PcmRouter />
                                    </Route>

                                    {/* =====AUTHENTICATION===== */}
                                    <Route path="/authentication/:path?">
                                        <AuthenticationRouter />
                                    </Route>

                                    {/* =====PCM===== */}
                                    <Route path="/pcm">
                                        <PcmRouter />
                                    </Route>

                                    {/* =====HUMAN===== */}
                                    <Route path="/human">
                                        <HumanLayout>
                                            <HumanRouter />
                                        </HumanLayout>
                                    </Route>

                                    {/* =====DOCUMENT===== */}
                                    <Route path="/document">
                                        <DocumentLayout>
                                            <DocumentRouter />
                                        </DocumentLayout>
                                    </Route>

                                    {/* =====PPT===== */}
                                    <Route
                                        path='/ppt'
                                        component={PPTRouter}
                                    />
                                    {/* <Route path="/ppt">
                                            <DocumentLayout>
                                                <PPTRouter />
                                            </DocumentLayout>
                                        </Route> */}

                                    {/* =====MEDIA===== */}
                                    <Route path="/media">
                                        <HomeLayout>
                                            <MediaRouter />
                                        </HomeLayout>
                                    </Route>

                                    {/* =====DATHUB===== */}
                                    <Route path="/datahub">
																				<DatahubRouter />
                                    </Route>

                                    {/* =====OTHER===== */}
                                    <Route path="*">
                                        <FullPageLayout>
                                            <Route path="/*" component={ErrorPage} />
                                        </FullPageLayout>
                                    </Route>
                                </Switch>
                            </ModalProvider>
                        </ChatProvider>
                    </DeleteConfirmProvider>
                </RightClickMenuProvider>
            </AuthProvider>
        </Router>
    );
};

export default Routes;