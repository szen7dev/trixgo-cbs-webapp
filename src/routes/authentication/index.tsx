/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

/*=====LAYOUTS=====*/
import FullPageLayout from "views/layouts/FullPage";

/*=====PAGES=====*/
import SignInPage from "views/pages/authentication/SignIn";
import RegisterPage from "views/pages/authentication/Register";
import ResetPasswordPage from "views/pages/authentication/ResetPassword";
import ErrorPage from "views/pages/authentication/Error";

const AuthenticationRouter: FC = () => {
    return (
        <>
            <Route path="/authentication/:path?">
                <FullPageLayout isAuthentication>
                    <Switch>
                        <Route exact path="/authentication">
                            <Redirect to="/authentication/sign-in" />
                        </Route>
                        <Route
                            exact
                            path="/authentication/sign-in"
                            component={SignInPage}
                        />
                        <Route
                            exact
                            path="/authentication/register"
                            component={RegisterPage}
                        />
                        <Route
                            exact
                            path="/authentication/reset-password"
                            component={ResetPasswordPage}
                        />
                        <Route path="/authentication/*" component={ErrorPage} />
                    </Switch>
                </FullPageLayout>
            </Route>
        </>
    )
};

export default AuthenticationRouter;