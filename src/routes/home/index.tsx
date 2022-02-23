/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import PCMRouter from "routes/pcm";

const HomeRouter: FC = () => {
    return (
        <Route exact path="/">
            <PCMRouter />
        </Route>
    )
};

export default HomeRouter;