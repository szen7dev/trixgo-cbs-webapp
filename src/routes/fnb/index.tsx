/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { InspectionLayout } from "views/inspection/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    InspectionHomePage,
} from "views/inspection/pages";
import { FnbLayout } from "views/fnb/shareComponents/layouts/FnbLayout";
import { FnBHomePage } from "views/fnb/pages/FnbHomePage/index";
import { FnBProductPage } from "views/fnb/pages/FnbProductPage/index";
import { FnbProductQuotasPage } from "views/fnb/pages/FnbProductQuotasPage/index";
import { FnbShiftPage } from "views/fnb/pages/FnbShiftPage/index";
import { FnbShiftDetailPage } from "views/fnb/pages/FnbShiftDetailPage/index";
import { FnbReportPage } from "views/fnb/pages/FnbReportPage/index";

const FnbRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/fnb/home"
                component={() =>
                    <FnbLayout>
                        <FnBHomePage/>
                    </FnbLayout>
                }
            />
            <Route
                exact
                path="/fnb/product"
                component={() =>
                    <FnbLayout>
                        <FnBProductPage/>
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/product/:productID"
                component={() =>
                    <FnbLayout>
                        <FnbProductQuotasPage/>
                    </FnbLayout>
                }
            />
            
            <Route
                exact
                path="/fnb/shift"
                component={() =>
                    <FnbLayout>
                        <FnbShiftPage/>
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/shift/:fundaID"
                component={() =>
                    <FnbLayout>
                        <FnbShiftDetailPage/>
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/report"
                component={() =>
                    <FnbLayout>
                        <FnbReportPage/>
                    </FnbLayout>
                }
            />
            <Route path="/fnb/*" component={ErrorPage} />
        </Switch>
    )
};

export default FnbRouter;