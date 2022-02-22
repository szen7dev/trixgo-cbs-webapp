/*=====LIBRARY=====*/
import { FC, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/*=====PROVIDERS=====*/
import AuthProvider from "services/providers/Auth";
import ThemeProvider from "services/providers/Theme";
import ModalProvider from "services/providers/Modal";
import ChatProvider from "services/providers/Chat";
import DeleteConfirmProvider from "services/providers/DeleteConfirm";
import RightClickMenuProvider from "services/providers/RightClickMenu";

/*=====LAYOUTS=====*/
import { FullPageLayout } from "shareComponents/layouts/FullPage";

/*=====PAGES=====*/
import ErrorPage from "views/authentication/Error";

/*=====CONFIG ROUTE=====*/
import SampleAppRouter from "./sampleApp";
import AccountingRouter from "./accounting";
import AuthenticationRouter from "./authentication";
import BiddingRouter from "./bidding";
import CmcsRouter from "./cmcs";
import DatahubRouter from "./datahub";
import DocumentRouter from "./document";
import FinancialRouter from "./financial";
import HomeRouter from './home';
import HumanRouter from "./human";
import MarketRouter from "./market";
import MediaRouter from "./media";
import MessagesRouter from "./messages";
import OperationRouter from "./operation";
import OwnerRouter from './owner';
import PcmRouter from "./pcm";
import PersonalRouter from "./personal";
import QrcodeRouter from "./qrcode";
import ReeRouter from "./ree";
import SupportRouter from "./support";
import TimesheetRouter from "./timesheet";
import WorkshopRouter from "./workshop";

const Routes: FC = () => {
    useEffect(() => {
        document.title = "CBS | Quản trị doanh nghiệp";
    }, []);

    return (
        <Router>
            <AuthProvider>
                <ThemeProvider>
                    <RightClickMenuProvider>
                        <DeleteConfirmProvider>
                            <ChatProvider>
                                <ModalProvider>
                                    <Switch>
                                        <SampleAppRouter />
                                        <AccountingRouter />
                                        <AuthenticationRouter />
                                        <BiddingRouter />
                                        <CmcsRouter />

                                        {/* // Fix tới đây rồi.. */}
                                        <DatahubRouter />
                                        <DocumentRouter />
                                        <FinancialRouter />
                                        <HomeRouter />
                                        <HumanRouter />
                                        <MarketRouter />
                                        <MediaRouter />
                                        <MessagesRouter />
                                        <OperationRouter />
                                        <OwnerRouter />
                                        <PcmRouter />
                                        <PersonalRouter />
                                        <QrcodeRouter />
                                        <ReeRouter />
                                        <SupportRouter />
                                        <TimesheetRouter />
                                        <WorkshopRouter />
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
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
};

export default Routes;