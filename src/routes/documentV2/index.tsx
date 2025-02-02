/*=====LIBRARY=====*/
import { FC , lazy} from "react";
import { Route, Switch, matchPath } from "react-router-dom";
import { ProtectedRoute } from "routes/components";
import { ModalCreateDocument } from 'views/document/sharedComponents/common';
import { ModalProvider } from "views/document/contexts/modal";
import DocumentLayoutV2 from "../../views/document/sharedComponents/layouts/DocumentLayoutV2";
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary';
import AdminFunctionalTab from "views/document/pages/DocumentAdminPage/pages/AdminFunctionalTab";
import AdminDetail from "views/document/pages/DocumentAdminPage/pages/AdminDetail";
import AdminAuthorTab from "views/document/pages/DocumentAdminPage/pages/AdminAuthorTab";

const DocumentHomePageV2       = lazy(() => import("views/document/pages/DocumentHomePageV2"))
const DocumentListProject       = lazy(() => import("views/document/pages/DocumentListProject"))
const DocumentDetailPage       = lazy(() => import("views/document/pages/DocumentDetailPage"))

const DocumentV2Router: FC = () => {
    return (
        <DocumentLayoutV2>
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
                        <Route exact path="/document/admin" component={AdminFunctionalTab} />
                        <Route exact path="/document/admin/:id/detail" component={AdminDetail} />
                        <Route exact path="/document/admin/2" component={AdminAuthorTab} />
                    </LayoutSecondary>
                </Route>
                <ProtectedRoute
                    exact
                    path="/document/home"
                >
                    <DocumentHomePageV2/>
                </ProtectedRoute>
                <ProtectedRoute
                    exact
                    path="/document/home/:docID"
                >
                    <ModalProvider>
                        <DocumentDetailPage/>
                        <ModalCreateDocument />
                    </ModalProvider>
                </ProtectedRoute>
                <ProtectedRoute
                    exact
                    path="/document/projects/:tab?"
                >
                   <DocumentListProject/>
                </ProtectedRoute>
            </Switch>    
        </DocumentLayoutV2>
        )
    };

export default DocumentV2Router;