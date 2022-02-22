/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

/*=====LAYOUTS=====*/


/*=====PAGES=====*/


const DatahubRouter: FC = () => {
    return (
        <>
            <Route path="/datahub">
                <DatahubRoutes />
            </Route>
        </>
    )
};

export default DatahubRouter;