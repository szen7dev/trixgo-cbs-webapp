/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { ProtectedRoute } from "routes/components";
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary'

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";

import {
        HumanOtherFilterPage,
        HumanExpiredPage,
        HumanHomePage,
        HumanPartnerPage,
        HumanCapacityPage,
        HumanCertificatePage,
        HumanInfo,
        HumanCertificateExpiredPage
    } from "views/human/pages";

const HumanRouterV2: FC = () => {
    return (
        <Switch>
            {/* <ProtectedRoute exact path="/human/home" component={HumanHomePage} /> */}
            <ProtectedRoute exact path="/human/home" component={HumanHomePage} />
            <ProtectedRoute exact path="/human/partner" component={HumanPartnerPage} />
            <ProtectedRoute exact path="/human/capacity" component={HumanCapacityPage} />
            {/* <ProtectedRoute exact path="/human/home" component={HumanDepartment} /> */}
            {/* <ProtectedRoute exact path="/human/project/:id/contacts" component={HumanHomePage} /> */}
            <ProtectedRoute exact path="/human/certificate" component={HumanCertificatePage} />
            <ProtectedRoute exact path="/human/other" component={HumanOtherFilterPage} />
            {/* <ProtectedRoute exact path="/human/expired" component={HumanExpiredPage} /> */}
            <ProtectedRoute
                path="/human/expired"
                component={() => (
                    <Switch>
                        <Route path="/human/expired">
                            <LayoutSecondary pages={[
                                { id: '1', title: 'Thời hạn hợp đồng nhỏ hơn 4 tháng', path: '/human/expired', navExact: true },
                                {
                                    id: '2', title: 'Thời hạn chứng chỉ nhỏ hơn 5 tháng', path: '/human/expired/2',
                                }
                            ]}>
                                <Route exact path="/human/expired" component={HumanExpiredPage} />
                                <Route exact path="/human/expired/2" component={HumanCertificateExpiredPage} />
                            </LayoutSecondary>
                        </Route>
                    </Switch>
                )}
            />
            <ProtectedRoute exact path="/human/home/hid=:id" component={HumanInfo} />
            <Route path="/human/*" component={ErrorPage} />
        </Switch>
    )
};

export default HumanRouterV2;