/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Redirect } from "react-router-dom";

const HomeRouter: FC = () => {
    return (
        <Route exact path="/">
            <Redirect to="/pcm/home" />
        </Route>
    )
};

export default HomeRouter;