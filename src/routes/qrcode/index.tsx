/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { QrcodeLayout } from "views/qrcode/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
   QrcodeHomePage,
} from "views/qrcode/pages";

const QrcodeRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/qrcode/home"
                component={() =>
                    <QrcodeLayout>
                        <QrcodeHomePage />
                    </QrcodeLayout>
                }
            />
            <Route path="/qrcode/*" component={ErrorPage} />
        </Switch>
    )
};

export default QrcodeRouter;