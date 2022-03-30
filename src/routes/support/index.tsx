/*=====1.LIBRARY=====*/
import { FC, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

/*=====3.LAYOUTS=====*/
import { SupportLayout } from "views/support/shareComponents/layouts";

/*=====4.HOOK=====*/
import { useAuth } from 'services/hooks/auth/useAuth';

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    SupportHomePage,
    SupportRegisterPage,
    SupportCompanyPage,
    SupportGrantPage,
    SupportDocsManagementPage,
    SupportItemPage,
    SupportMemberPage
} from "views/support/pages";

const SupportRouter: FC = () => {
    const history = useHistory();
    const { user } = useAuth();

    useEffect(() => {
        if(!user) return;
        const emailAccept = [
            'contact@trixgo.com',
            'vuhuynhminh9221@gmail.com',
            'hiepnh@pgipartner.com'
        ];

        if(!emailAccept.includes(user.email)) {
            history.push('/');
        }
    }, [user])

    return (
        <SupportLayout>
            <Switch>
                <Route
                    exact
                    path="/support/home"
                    component={SupportHomePage}
                />
                <Route
                    exact
                    path="/support/register"
                    component={SupportRegisterPage}
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
                    path="/support/grant/documents-management/:appID/:companyID/:appName"
                    component={SupportDocsManagementPage}
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
    )
};

export default SupportRouter;