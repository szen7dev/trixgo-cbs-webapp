/*=====1.LIBRARY=====*/
import { FC, lazy } from "react";
import { Route, Switch, matchPath } from "react-router-dom";
import ErrorPage from "views/authentication/Error";
import { FnBHomePage } from "views/fnb/pages/FnbHomePage/index";
import { FnBProductPage } from "views/fnb/pages/FnbProductPage/index";
import { FnbVoucherPage } from "views/fnb/pages/FnbVoucherPage/index";
import { FnbVoucherDetailPage } from "views/fnb/pages/FnbVoucherDetailPage/index";
import { FnbShiftPage } from "views/fnb/pages/FnbShiftPage/index";
import { FnbContactPage } from "views/fnb/pages/FnbContactPage/index";
import { FnbRiskReportPage } from "views/fnb/pages/FnbRiskReportPage/index";
import { FnbShiftDetailPage } from "views/fnb/pages/FnbShiftDetailPage/index";
import { FnbRiskReportDetailPage } from "views/fnb/pages/FnbRiskReportDetailPage/index";
import { FnbReportPage } from "views/fnb/pages/FnbReportPage/index";
import { FnbReportAllPage, FnbReportMistake, FnbReportCustomer, FnbReportNonameOrder, FnbReportSallary, FnbReportRevenue } from "views/fnb/pages/FnbReportAllPage/index";
import { FnbLayout } from "views/fnb/shareComponents/layouts/FnbLayout";
import { FnbBillOrder } from "views/fnb/pages/FnbBill/FnbBillOrder";
import { FnbBillList } from "views/fnb/pages/FnbBill/FnbBillList";
import LayoutSecondary from "views/fnb/shareComponents/layouts/LayoutSecondary";

const FnbAdminFunctionalTab = lazy(() => import("views/fnb/pages/FnbAdminPage/pages/FnbAdminFunctionalTab"))
const FnbAdminDetail = lazy(() => import("views/fnb/pages/FnbAdminPage/pages/FnbAdminDetail"))
const FnbAdminAuthorTab = lazy(() => import("views/fnb/pages/FnbAdminPage/pages/FnbAdminAuthorTab"))

const FnbRouter: FC = () => {
    return (
        <Switch>
            <Route path="/fnb/admin">
                <FnbLayout>
                    <LayoutSecondary pages={[
                        { id: '1', title: 'Nhóm chức năng', path: '/fnb/admin', navExact: true },
                        {
                            id: '2', title: 'Phân quyền chức năng', path: '/fnb/admin/2', location: (location) => {
                                // Get match params
                                const match = matchPath<{ id: string }>(location.pathname, { path: '/cmcs/admin/:id/detail' })
                                // Push to state
                                return ({ pathname: '/fnb/admin/2', state: match ? match.params.id : null })
                            }
                        },
                    ]}>
                        <Route exact path="/fnb/admin" component={FnbAdminFunctionalTab} />
                        <Route exact path="/fnb/admin/:id/detail" component={FnbAdminDetail} />
                        <Route exact path="/fnb/admin/2" component={FnbAdminAuthorTab} />
                    </LayoutSecondary>
                </FnbLayout>
            </Route>
            <Route
                exact
                path="/fnb/home"
                component={() =>
                    <FnbLayout>
                        <FnBHomePage />
                    </FnbLayout>
                }
            />
            <Route
                exact
                path="/fnb/home/:orderID/print/1"
                component={() =>
                    <FnbBillOrder />
                }
            />
            <Route
                exact
                path="/fnb/home/order1"
                component={() =>
                    <FnbBillOrder />
                }
            />
            <Route
                exact
                path="/fnb/home/order2"
                component={() =>
                    <FnbBillList />
                }
            />
            <Route
                exact
                path="/fnb/revenue-report"
                component={() =>
                    <FnbLayout>
                        <FnbReportPage />
                    </FnbLayout>
                }
            />
            <Route
                exact
                path="/fnb/risk-report"
                component={() =>
                    <FnbLayout>
                        <FnbRiskReportPage />
                    </FnbLayout>
                }
            />
            <Route
                exact
                path="/fnb/risk-report/:fundaID"
                component={() =>
                    <FnbLayout>
                        <FnbRiskReportDetailPage />
                    </FnbLayout>
                }
            />
            <Route
                exact
                path="/fnb/contacts"
                component={() =>
                    <FnbLayout>
                        <FnbContactPage />
                    </FnbLayout>
                }
            />
            <Route
                exact
                path="/fnb/shift"
                component={() =>
                    <FnbLayout>
                        <FnbShiftPage />
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/shift/:fundaID"
                component={() =>
                    <FnbLayout>
                        <FnbShiftDetailPage />
                    </FnbLayout>
                }
            />
            <Route
                exact
                path="/fnb/product"
                component={() =>
                    <FnbLayout>
                        <FnBProductPage />
                    </FnbLayout>
                }
            />
            <Route
                exact
                path="/fnb/voucher"
                component={() =>
                    <FnbLayout>
                        <FnbVoucherPage />
                    </FnbLayout>
                }
            />
            <Route
                exact
                path="/fnb/voucher/:voucherID"
                component={() =>
                    <FnbLayout>
                        <FnbVoucherDetailPage />
                    </FnbLayout>
                }
            />
            <Route
                exact
                path="/fnb/reports"
                component={() =>
                    <FnbLayout>
                        <FnbReportAllPage />
                    </FnbLayout>
                }
            />
            <Route
                exact
                path="/fnb/reports/type/1"
                component={() =>
                    <FnbLayout>
                        <FnbReportMistake />
                    </FnbLayout>
                }
            />
            <Route
                exact
                path="/fnb/reports/type/2"
                component={() =>
                    <FnbLayout>
                        <FnbReportNonameOrder />
                    </FnbLayout>
                }
            />
            <Route
                exact
                path="/fnb/reports/type/3"
                component={() =>
                    <FnbLayout>
                        <FnbReportCustomer />
                    </FnbLayout>
                }
            />
            <Route
                exact
                path="/fnb/reports/type/4"
                component={() =>
                    <FnbLayout>
                        <FnbReportSallary />
                    </FnbLayout>
                }
            />
            <Route
                exact
                path="/fnb/reports/type/5"
                component={() =>
                    <FnbLayout>
                        <FnbReportRevenue />
                    </FnbLayout>
                }
            />
            <Route path="/fnb/*" component={ErrorPage} />
        </Switch>
    )
};

export default FnbRouter;