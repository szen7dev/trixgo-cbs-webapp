import { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

/*=====LAYOUTS=====*/
import FullPageLayout from "views/layouts/FullPage";

/*=====PAGES=====*/
import SignInPage from "views/pages/authentication/SignIn";
import RegisterPage from "views/pages/authentication/Register";
import ResetPasswordPage from "views/pages/authentication/ResetPassword";
import ErrorPage from "views/pages/authentication/Error";

const MediaRouter: FC = () => {
    return (
        <>
            <Route path="/media">
                <HomeLayout>
                    <Switch>
                        <Route
                            exact
                            path="/media/home"
                            component={() =>
                                <SocialLayoutPrimary>
                                    <SocialHomePage />
                                </SocialLayoutPrimary>
                            }
                        />
                        <Route
                            exact
                            path="/media/home/2"
                            component={() =>
                                <SocialLayoutPrimary>
                                    <SocialCategoryPage type="department" />
                                </SocialLayoutPrimary>
                            }
                        />
                        <Route
                            exact
                            path="/media/home/3"
                            component={() =>
                                <SocialLayoutPrimary>
                                    <SocialCategoryPage type="digital-conversion" />
                                </SocialLayoutPrimary>
                            }
                        />
                        <Route
                            exact
                            path="/media/home/4"
                            component={() =>
                                <SocialLayoutPrimary>
                                    <SocialCategoryPage type="system" />
                                </SocialLayoutPrimary>
                            }
                        />
                        <Route
                            exact
                            path="/media/home/5"
                            component={() =>
                                <SocialLayoutPrimary>
                                    <SocialCategoryPage type="just-me" />
                                </SocialLayoutPrimary>
                            }
                        />
                        <Route
                            exact
                            path="/media/post/:mediaID"
                            component={SocialPostPage}
                        />
                        <Route
                            exact
                            path="/media/comments"
                            component={SocialCommentsPage}
                        />
                        <Route path="/media/*" component={ErrorPage} />
                    </Switch>
                </HomeLayout>
            </Route>
        </>
    )
};

export default MediaRouter;