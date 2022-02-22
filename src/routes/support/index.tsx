/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import { SupportLayout } from "views/support/shareComponents/layouts";

/*=====PAGES=====*/
import SupportPage from "views/support/components/home";
import RegisterDashboardPage from "views/support/components/register";
import SupportCompanyPage from "views/support/SupportCompanyPage";
import SupportGrantPage from "views/support/SupportGrantPage";
import SupportMemberPage from "views/support/SupportMemberPage";
import SupportItemPage from "views/support/SupportItemPage";
import DocumentsManagement from "views/support/components/grant/DocumentsManagement";
import ErrorPage from "views/authentication/Error";

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