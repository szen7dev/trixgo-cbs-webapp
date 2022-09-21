/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { QrcodeLayoutV2 } from "views/qrcode/shareComponents/layoutsV2";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
   QrcodeHomePage,
} from "views/qrcode/pages";

const QrcodeRouterV2: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/qrcode/home"
                component={() =>
                    <QrcodeLayoutV2>
                        <QrcodeHomePage />
                    </QrcodeLayoutV2>
                }
            />
            <Route path="/qrcode/*" component={ErrorPage} />
        </Switch>
    )
};

export default QrcodeRouterV2;