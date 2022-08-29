/*=====LIBRARY=====*/
import { FC , lazy} from "react";
import { Route, Switch, matchPath } from "react-router-dom";
import { ProtectedRoute } from "routes/components";
import DocumentLayoutV2 from "../../views/document/sharedComponents/layouts/DocumentLayoutV2";
const DocumentHomePageV2       = lazy(() => import("views/document/pages/DocumentHomePageV2"))
const DocumentDetailPage       = lazy(() => import("views/document/pages/DocumentDetailPage"))
const DocumentV2Router: FC = () => {
    return (
        <Switch>
            <ProtectedRoute
                exact
                path="/document/home"
            >
                <DocumentLayoutV2>
                    <DocumentHomePageV2/>
                </DocumentLayoutV2>
            </ProtectedRoute>
            <ProtectedRoute
                exact
                path="/document/home/:docID"
            >
                <DocumentLayoutV2>
                    <DocumentDetailPage/>
                </DocumentLayoutV2>
            </ProtectedRoute>
        </Switch>
        )
    };

export default DocumentV2Router;