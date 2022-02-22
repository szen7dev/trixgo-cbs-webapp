/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import { OperationLayout } from "views/operation/shareComponents/layouts";

/*=====PAGES=====*/
import OperationHomePage from 'views/operation/OperationHomePage';
import OperationNewsPage from 'views/operation/OperationNewsPage';
import OperationRfsPage from 'views/operation/OperationRfsPage';
import OperationProjectPage from 'views/operation/OperationProjectPage';
import ErrorPage from "views/authentication/Error";

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