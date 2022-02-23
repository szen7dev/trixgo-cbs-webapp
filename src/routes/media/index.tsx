/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import { HomeLayout } from "shareComponents/layouts/HomeLayout";
import { SocialLayoutPrimary } from "views/media/shareComponents/layouts";

/*=====PAGES=====*/
import { 
    MediaCategoryPage,
    MediaCommentsPage,
    MediaHomePage,
    MediaDetailPage
} from "views/media/pages";

import ErrorPage from "views/authentication/Error";

const MediaRouter: FC = () => {
    return (
        <HomeLayout>
            <Switch>
                <Route
                    exact
                    path="/media/home"
                    component={() =>
                        <SocialLayoutPrimary>
                            <MediaHomePage />
                        </SocialLayoutPrimary>
                    }
                />
                <Route
                    exact
                    path="/media/home/2"
                    component={() =>
                        <SocialLayoutPrimary>
                            <MediaCategoryPage type="department" />
                        </SocialLayoutPrimary>
                    }
                />
                <Route
                    exact
                    path="/media/home/3"
                    component={() =>
                        <SocialLayoutPrimary>
                            <MediaCategoryPage type="digital-conversion" />
                        </SocialLayoutPrimary>
                    }
                />
                <Route
                    exact
                    path="/media/home/4"
                    component={() =>
                        <SocialLayoutPrimary>
                            <MediaCategoryPage type="system" />
                        </SocialLayoutPrimary>
                    }
                />
                <Route
                    exact
                    path="/media/home/5"
                    component={() =>
                        <SocialLayoutPrimary>
                            <MediaCategoryPage type="just-me" />
                        </SocialLayoutPrimary>
                    }
                />
                <Route
                    exact
                    path="/media/post/:mediaID"
                    component={MediaDetailPage}
                />
                <Route
                    exact
                    path="/media/comments"
                    component={MediaCommentsPage}
                />
                <Route path="/media/*" component={ErrorPage} />
            </Switch>
        </HomeLayout>
    )
};

export default MediaRouter;