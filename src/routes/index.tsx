/*=====LIBRARY=====*/
import { FC, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/*=====PROVIDERS=====*/
import AuthProvider from "services/providers/Auth";
import ThemeProvider from "services/providers/Theme";
import ModalProvider from "services/providers/Modal";
import ChatProvider from "services/providers/Chat";

/*=====LAYOUTS=====*/
import { FullPageLayout } from "shareComponents/layouts/FullPage";

/*=====PAGES=====*/
import ErrorPage from "views/authentication/Error";
import DeleteConfirmProvider from "services/providers/DeleteConfirm";
import RightClickMenuProvider from "services/providers/RightClickMenu";

/*=====NEW ROUTE=====*/
import SampleAppRouter from "./sampleApp";
import AuthenticationRouter from "./authentication";
import MessagesRouter from "./messages";
import PersonalRouter from "./personal";
import PcmRouter from "./pcm";
import MediaRouter from "./media";
import DocumentRouter from "./document";
import HumanRouter from "./human";
import TimesheetRouter from "./timesheet";
import CmcsRouter from "./cmcs";
import AccountingRouter from "./accounting";
import FinancialRouter from "./financial";
import BiddingRouter from "./bidding";
import SupportRouter from "./support";
import DatahubRouter from "./datahub";
import WorkshopRouter from "./workshop";
import OperationRouter from "./operation";
import ReeRouter from "./ree";
import MarketRouter from "./market";
import QrcodeRouter from "./qrcode";
import OwnerRouter from './owner';

const Routes: FC = () => {
    useEffect(() => {
        document.title = "CBS | Quản trị doanh nghiệp";
    }, []);

    return (
        <Router>
            <AuthProvider>      {/* Xem lại chỗ này */}
                <ThemeProvider>
                    <RightClickMenuProvider>
                        <DeleteConfirmProvider>
                            <ChatProvider>
                                <ModalProvider>
                                    <Switch>
                                        <SampleAppRouter />
                                        <AuthenticationRouter />
                                        <MessagesRouter />
                                        <PersonalRouter />
                                        {/* <PcmRouter /> */}
                                        <MediaRouter />
                                        <DocumentRouter />
                                        <HumanRouter />
                                        <TimesheetRouter />
                                        <CmcsRouter />
                                        <AccountingRouter />
                                        <FinancialRouter />
                                        <BiddingRouter />
                                        <SupportRouter />
                                        <DatahubRouter />
                                        <WorkshopRouter />
                                        <OperationRouter />
                                        <ReeRouter />
                                        <MarketRouter />
                                        <QrcodeRouter />
                                        <OwnerRouter />
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
