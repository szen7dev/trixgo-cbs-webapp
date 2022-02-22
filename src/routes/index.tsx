import { FC, useEffect } from "react";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import { RouteComponentProps } from 'react-router';

import AuthProvider from "services/providers/Auth";
import ProtectedRoute from "components/common/ProtectedRoute";
import ThemeProvider from "services/providers/Theme";
import ModalProvider from "services/providers/Modal";
import ChatProvider from "services/providers/Chat";

/*=====LAYOUTS=====*/
import FullPageLayout from "views/layouts/FullPage";
import MainLayout from "views/layouts/Main";
import HomeLayout from "views/layouts/HomeLayout";
import HelpCenterLayout from "views/layouts/HelpCenterLayout";

import BiddingLayout from "views/layouts/BiddingLayout"; //*** */

// import DocumentLayout from "views/layouts/DocumentLayout";


import OperationLayout from "views/layouts/OperationLayout"; //*** */
import PcmLayout from "views/layouts/PcmLayout";

import ReeLayout from "views/layouts/ReeLayout"; //*** */

import KanbanBoardLayout from "views/layouts/KanbanBoardLayout";

import OwnerLayout from "views/layouts/OwnerLayout";

/*=====PAGES=====*/
import ErrorPage from "views/pages/authentication/Error";

// Owner pages
import OwnerHomePage from "views/pages/owner/OwnerHomePage";
import OwnerGrantPage from "views/pages/owner/OwnerGrantPage";

// Human pages


// Personal pages


// Help pages
import HelpCenterPage from "views/pages/help/HelpCenterPage";

// Accounting pages


// Bidding pages


// Social pages


// Document pages
import DocumentRoutes from "views/document/routes/DocumentRoutes";
import PPTRoutes from "views/pages/document/routes/PPTRoutes";

// Datahub pages
import DatahubRoutes from "views/pages/datahub"

// Financial pages


// Cmcs pages


// Support pages


// Ree pages
import ReeHomePage from 'views/pages/ree/ReeHomePage';

// Operation pages
import OperationHomePage from 'views/pages/operation/OperationHomePage';
import OperationNewsPage from 'views/pages/operation/OperationNewsPage';
import OperationRfsPage from 'views/pages/operation/OperationRfsPage';
import OperationProjectPage from 'views/pages/operation/OperationProjectPage';

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
                                        <SampleAppRouter />   {/* ok */}
                                        <AuthenticationRouter />     {/* ok */} 
                                        <MessagesRouter />  {/* ok */}
                                        <PersonalRouter />  {/* ok */}
                                        <PcmRouter />  {/* a Hiep */}
                                        <MediaRouter />  {/* ok */}
                                        <DocumentRouter /> {/* ok */}
                                        <HumanRouter />{/* ok */}
                                        <TimesheetRouter /> {/* ok */}
                                        <CmcsRouter /> {/* ok */}
                                        <AccountingRouter /> {/* ok */}
                                        <FinancialRouter />  {/* ok */}
                                        <BiddingRouter />  {/* ok */}
                                        <SupportRouter /> {/* ok */}
                                        <DatahubRouter />
                                        <WorkshopRouter />
                                        <OperationRouter />
                                        <ReeRouter />
                                        <MarketRouter />
                                        <QrcodeRouter />
                                       
                                        
                                       

                                        <Route path="/owner">
                                            <OwnerLayout>
                                                <Switch>
                                                    <Route exact path="/owner/home" component={OwnerHomePage} />
                                                    <Route exact path="/owner/grant-permission" component={OwnerGrantPage} />
                                                    <Route path="/owner /*" component={ErrorPage} />
                                                </Switch>
                                            </OwnerLayout>
                                        </Route>

                                        <Route path="/help">
                                            <HelpCenterLayout>
                                                <Switch>
                                                    <Route exact path="/help/home" component={HelpCenterPage} />
                                                    <Route path="/help/*" component={ErrorPage} />
                                                </Switch>
                                            </HelpCenterLayout>
                                        </Route>

                                        

                                       

                                        <Route path="/operation">
                                            <OperationLayout>
                                                <Switch>
                                                    <Route exact path="/operation/home" component={OperationHomePage} />
                                                    <Route exact path="/operation/news" component={OperationNewsPage} />
                                                    <Route exact path="/operation/rfs" component={OperationRfsPage} />
                                                    <Route exact path="/operation/project" component={OperationProjectPage} />
                                                    <Route path="/operation/*" component={ErrorPage} />
                                                </Switch>
                                            </OperationLayout>
                                        </Route>

                                        <Route path="/ree">
                                            <ReeLayout>
                                                <Switch>
                                                    <Route exact path="/ree/home" component={ReeHomePage} />
                                                    <Route exact path="/ree/other" component={ReeHomePage} />
                                                    <Route path="/ree /*" component={ErrorPage} />
                                                </Switch>
                                            </ReeLayout>
                                        </Route>

                                        
                                        <Route path="/document">
                                            <DocumentRoutes />
                                        </Route>

                                        <Route path="/ppt/project/:id/document" component={PPTRoutes} />

                                        {/* <Route path="/kanban-board">
                  <KanbanBoardLayout>
                    <Switch>
                      <ProtectedRoute
                        exact
                        path="/kanban-board"
                        component={KanbanBoardPage}
                      />
                      <Route path="/kanban-board/*" component={ErrorPage} />
                    </Switch>
                  </KanbanBoardLayout>
                </Route> */}

                                      

                                        
                                      
                                        

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
