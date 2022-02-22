/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import SupportLayout from "views/layouts/SupportLayout";

/*=====PAGES=====*/
import SupportPage from "views/pages/support/components/home";
import RegisterDashboardPage from "views/pages/support/components/register";
import SupportCompanyPage from "views/pages/support/SupportCompanyPage";
import SupportGrantPage from "views/pages/support/SupportGrantPage";
import SupportMemberPage from "views/pages/support/SupportMemberPage";
import SupportItemPage from "views/pages/support/SupportItemPage";
import DocumentsManagement from "views/pages/support/components/grant/DocumentsManagement";
import ErrorPage from "views/pages/authentication/Error";

const SupportRouter: FC = () => {
    return (
        <Route path="/support">
            <SupportLayout>
                <Switch>
                    <Route
                        exact
                        path="/support/home"
                        component={SupportPage}
                    />
                    <Route
                        exact
                        path="/support/register"
                        component={RegisterDashboardPage}
                    />
                    <Route
                        exact
                        path="/support/companies"
                        component={SupportCompanyPage}
                    />
                    <Route
                        exact
                        path="/support/grant"
                        component={SupportGrantPage}
                    />
                    <Route
                        exact
                        path="/support/grant/documents-management"
                        component={DocumentsManagement}
                    />
                    <Route
                        exact
                        path="/support/members"
                        component={SupportMemberPage}
                    />
                    <Route
                        exact
                        path="/support/items"
                        component={SupportItemPage}
                    />
                    <Route path="/support/*" component={ErrorPage} />
                </Switch>
            </SupportLayout>
        </Route>
    )
};

export default SupportRouter;