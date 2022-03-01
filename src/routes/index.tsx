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
import AccountingRouter from "./accounting";
import AuthenticationRouter from "./authentication";
import BiddingRouter from "./bidding";
import CmcsRouter from "./cmcs";
import DatahubRouter from "./datahub";
import DocumentRouter from "./document";
import PPTRouter from "./ppt";
import FinancialRouter from "./financial";
import HumanRouter from "./human";
import MarketRouter from "./market";
import MediaRouter from "./media";
import MessagesRouter from "./messages";
import OperationRouter from "./operation";
import OwnerRouter from './owner';
import PcmRouter from "./pcm";
import WorkshopRouter from "./workshop";
import PersonalRouter from "./personal";
import QrcodeRouter from "./qrcode";
import ReeRouter from "./ree";
import SupportRouter from "./support";
import TimesheetRouter from "./timesheet";

/*=====5.PAGES=====*/
import ErrorPage from "views/authentication/Error";
import { HomeLayout } from "shareComponents/layouts";
import { HumanLayout } from "views/human/shareComponents/layouts";
import { DocumentLayout } from 'views/document/sharedComponents/layouts';
import { AccountingLayout } from 'views/accounting/shareComponents/layouts';

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

                                    {/* =====ACCOUNTING===== */}
                                    <Route path="/accounting">
                                        <AccountingLayout>
                                            <AccountingRouter />
                                        </AccountingLayout>
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

export default Routes