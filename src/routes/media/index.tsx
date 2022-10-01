/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import { SocialLayoutPrimary } from "views/media/shareComponents/layouts";

/*=====CONTEXTS=====*/
import { ProviderModalPost } from "views/media/contexts/post";
import CommentProvider from 'views/media/contexts/comment/comment.provider';

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
        <ProviderModalPost>
			<CommentProvider>
                <Switch>
                    <Route
                        exact
                        path="/media/home"
                        component={() =>
                                <MediaHomePage />
                        }
                    />
                    <Route
                        exact
                        path="/media/2"
                        component={() =>
                                <MediaCategoryPage type="department" />
                        }
                    />
                    <Route
                        exact
                        path="/media/3"
                        component={() =>
                                <MediaCategoryPage type="digital-conversion" />
                        }
                    />
                    <Route
                        exact
                        path="/media/4"
                        component={() =>
                                <MediaCategoryPage type="system" />
                        }
                    />
                    <Route
                        exact
                        path="/media/5"
                        component={() =>
                                <MediaCategoryPage type="just-me" />
                        }
                    />
                    <Route
                        exact
                        path="/media/post/:mediaID"
                        component={MediaDetailPage}
                    />
                    <Route
                        exact
                        path="/media/:mediaID/comments"
                        component={MediaCommentsPage}
                    />
                    <Route path="/media/*" component={ErrorPage} />
                </Switch>
			</CommentProvider>
		</ProviderModalPost>
    )
};

export default MediaRouter;