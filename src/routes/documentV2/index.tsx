/*=====LIBRARY=====*/
import { FC , lazy} from "react";
import { Route, Switch, matchPath } from "react-router-dom";
import { ProtectedRoute } from "routes/components";
const DocumentHomePageV2       = lazy(() => import("views/document/pages/DocumentHomePageV2"))
const DocumentV2Router: FC = () => {
    return (
        <Switch>
            <ProtectedRoute
                exact
                path="/document/home"
                component={DocumentHomePageV2}
            />
        </Switch>
        )
    };

export default DocumentV2Router;