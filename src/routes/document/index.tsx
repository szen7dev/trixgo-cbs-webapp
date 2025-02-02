/*=====LIBRARY=====*/
import {FC, lazy} from "react";
import { Route, Switch, matchPath } from "react-router-dom";

/*=====LAYOUTS=====*/
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary'
import { ModalProvider } from "views/document/contexts/modal";
import { ModalCreateDocument } from 'views/document/sharedComponents/common';

/*=====PAGES=====*/
import { ProtectedRoute } from "routes/components";

const ErrorPage       = lazy(() => import("views/authentication/Error"))

const DocumentHomePageV2 = lazy(() => import("views/document/pages/DocumentHomePageV2"))
const DocumentDashboardPage       = lazy(() => import("views/document/pages/DocumentDashboardPage"))
const DocumentProjectPage       = lazy(() => import("views/document/pages/DocumentProjectPage"))
const DocumentProfilePage       = lazy(() => import("views/document/pages/DocumentProfilePage"))
const DocumentDetailPage       = lazy(() => import("views/document/pages/DocumentDetailPage"))
const DocumentFolderPage       = lazy(() => import("views/document/pages/DocumentFolderPage"))
const DocumenDatahubContactPage       = lazy(() => import("views/document/pages/DocumenDatahubContactPage"))
const DocumentOfTypePage       = lazy(() => import("views/document/pages/DocumentOfTypePage"))
const DocumentOfPackagePage       = lazy(() => import("views/document/pages/DocumentOfPackagePage"))

import AdminFunctionalTab from "views/document/pages/DocumentAdminPage/pages/AdminFunctionalTab";
import AdminDetail from "views/document/pages/DocumentAdminPage/pages/AdminDetail";
import AdminAuthorTab from "views/document/pages/DocumentAdminPage/pages/AdminAuthorTab";

const DocumentRouter: FC = () => {
    return (
        <Switch>
            
        </Switch>
        )
    };

export default DocumentRouter;