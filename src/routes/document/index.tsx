/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import { DocumentLayout } from "views/document/sharedComponents/layouts";

/*=====PAGES=====*/
import DocumentDashboardPage from 'views/document/pages/DocumentDashboardPage';
import DocumentHomePage from 'views/document/DocumentHomePage';
import ErrorPage from 'views/authentication/Error';


const DocumentRouter: FC = () => {
    return (
        <>
            <Route path="/document">
                <DocumentLayout>
                    <Switch>
                        <Route exact path="/document/home" component={DocumentHomePage} />
                        <Route exact path="/document/dashboard" component={DocumentDashboardPage} />
                        <Route path="/document/*" component={ErrorPage} />
                    </Switch>
                </DocumentLayout>
            </Route>
        </>
    )
};

export default DocumentRouter;