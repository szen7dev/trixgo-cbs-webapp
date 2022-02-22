/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import HomeLayout from "views/layouts/HomeLayout";
import SocialLayoutPrimary from "views/pages/media/layouts/SocialLayoutPrimary";

/*=====PAGES=====*/
import SocialHomePage from "views/pages/media/screens/HomePage";
import SocialPostPage from "views/pages/media/screens/PostPage";
import SocialCommentsPage from "views/pages/media/screens/CommetsPage";
import SocialCategoryPage from "views/pages/media/screens/CategoryPage";
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