/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import OperationLayout from "views/layouts/OperationLayout"; 

/*=====PAGES=====*/
import OperationHomePage from 'views/pages/operation/OperationHomePage';
import OperationNewsPage from 'views/pages/operation/OperationNewsPage';
import OperationRfsPage from 'views/pages/operation/OperationRfsPage';
import OperationProjectPage from 'views/pages/operation/OperationProjectPage';
import ErrorPage from "views/pages/authentication/Error";

const OperationRouter: FC = () => {
    return (
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
    )
};

export default OperationRouter;