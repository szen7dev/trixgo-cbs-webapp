/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, matchPath } from "react-router-dom";

/*=====LAYOUTS=====*/
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary'
import { ModalProvider } from "views/document/contexts/modal";
import { ModalCreateDocument } from 'views/document/sharedComponents/common';

/*=====PAGES=====*/
// import { } from 'views/document/pages';
import {
    DocumentDashboardPage, DocumentHomePage,
	DocumentDetailPage,
	DocumentFolderPage,
    DocumenDatahubContactPage,
	// DocumentHistoryPage,
	DocumentProjectPage,
	DocumentProfilePage,
	// DocumentReportPage,
    DocumentOfTypePage,
    DocumentOfPackagePage
} from 'views/document/pages';

import ErrorPage from 'views/authentication/Error';
import { ProtectedRoute } from "routes/components";
// import LayoutSecondary from "views/document/sharedComponents/layouts/LayoutSecondary";
import DocumentAdminFunctionalTab from "views/document/pages/DocumentAdminPage/pages/DocumentAdminFunctionalTab";
import DocumentAdminDetail from "views/document/pages/DocumentAdminPage/pages/DocumentAdminDetail";
import DocumentAdminAuthorTab from "views/document/pages/DocumentAdminPage/pages/DocumentAdminAuthorTab";

const DocumentRouter: FC = () => {
    return (
        <Switch>
            <ProtectedRoute
                exact
                path="/document/home"
                component={DocumentHomePage}
            />
            <ProtectedRoute
                exact
                path="/document/dashboard"
                component={DocumentDashboardPage}
            />
            <ProtectedRoute
                path="/document/admin"
                component={() => (
                    <Switch>
                        <Route path="/document/admin">
                            <LayoutSecondary pages={[
                                { id: '1', title: 'Nhóm chức năng', path: '/document/admin', navExact: true },
                                {
                                    id: '2', title: 'Phân quyền chức năng', path: '/document/admin/2', location: (location) => {
                                        // Get match params
                                        const match = matchPath<{ id: string }>(location.pathname, { path: '/document/admin/:id/detail' })
                                        // Push to state
                                        return ({ pathname: '/document/admin/2', state: match ? match.params.id : null })
                                    }
                                }
                            ]}>
                                <Route exact path="/document/admin" component={DocumentAdminFunctionalTab} />
                                <Route exact path="/document/admin/:id/detail" component={DocumentAdminDetail} />
                                <Route exact path="/document/admin/2" component={DocumentAdminAuthorTab} />
                            </LayoutSecondary>
                        </Route>
                    </Switch>
                )}
            />

        <Route exact path={['/document/project/:id/home', '/document/project/:id/home/(1|2|3|4)']}>
            <LayoutSecondary pages={[
                { id: '1', title: 'Danh sách', path: '/document/project/:id/home', navExact: true },
                { id: '2', title: 'Phân loại', path: '/document/project/:id/home/1' },
                { id: "3", title: "Danh bạ hệ thống", path: "/document/project/:id/home/2" },
                { id: '4', title: 'Gói thầu', path: '/document/project/:id/home/3' },
                // { id: '4', title: 'Báo cáo', path: '/ppt/project/:id/document/3' },
                // { id: '5', title: 'Lịch sử upload file', path: '/ppt/project/:id/document/4' },
            ]}>
                <ModalProvider>
                    <Switch>
                        <Route exact path='/document/project/:id/home' component={DocumentProjectPage} />
                        <Route exact path='/document/project/:id/home/1' component={DocumentProfilePage} />
                        <Route exact path="/document/project/:id/home/2"  component={DocumenDatahubContactPage}/>
                        <Route exact path='/document/project/:id/home/3' component={DocumentFolderPage} />
                        {/* <Route exact path='/document/project/:id/home/3' component={DocumentReportPage} /> */}
                        {/* <Route exact path='/document/project/:id/home/4' component={DocumentHistoryPage} /> */}
                    </Switch>
                    <ModalCreateDocument />
                </ModalProvider>
            </LayoutSecondary>
        </Route>
        <Route exact path="/document/project/:id/document/1/type/:type" component={DocumentOfTypePage} />
        <Route exact path="/document/project/:id/document/1/datahubContact/:datahubContactID" component={DocumentOfTypePage} />
        <Route exact path="/document/project/:id/package/:packageID" component={DocumentOfPackagePage} />

        <Route exact path='/document/project/:id/detail/:docID' component={DocumentDetailPage} />
            <Route path="/document/*" component={ErrorPage} />
        </Switch>
        )
    };

export default DocumentRouter;