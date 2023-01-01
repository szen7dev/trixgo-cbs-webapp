/*=====1.LIBRARY=====*/
import { FC, lazy } from "react";
import { Route, Switch, matchPath } from "react-router-dom";
import ErrorPage from "views/authentication/Error";
import { FnBHomePage } from "views/fnb/pages/FnbHomePage/index";
import { FnBProductPage } from "views/fnb/pages/FnbProductPage/index";
import { FnbProductQuotasPage } from "views/fnb/pages/FnbProductQuotasPage/index";
import { FnbShiftPage } from "views/fnb/pages/FnbShiftPage/index";
import { FnbContactPage } from "views/fnb/pages/FnbContactPage/index";
import { FnbContactDetailPage } from "views/fnb/pages/FnbContactDetailPage/index";
import { FnbRiskReportPage } from "views/fnb/pages/FnbRiskReportPage/index";
import { FnbShiftDetailPage } from "views/fnb/pages/FnbShiftDetailPage/index";
import { FnbRiskReportDetailPage } from "views/fnb/pages/FnbRiskReportDetailPage/index";
import { FnbShiftCashPage } from "views/fnb/pages/FnbShiftCashPage/index";
import { FnbShiftMaterialPage } from "views/fnb/pages/FnbShiftMaterialPage/index";
import { FnbReportPage } from "views/fnb/pages/FnbReportPage/index";
import { FnbStorePage } from "views/fnb/pages/FnbStorePage/index";
import { FnbStoreImportPage } from "views/fnb/pages/FnbStoreImportPage/index";
import { FnbStoreImportDetailPage } from "views/fnb/pages/FnbStoreImportDetailPage/index";
import { FnbStoreExportPage } from "views/fnb/pages/FnbStoreExportPage/index";
import { FnbStoreExportDetailPage } from "views/fnb/pages/FnbStoreExportDetailPage/index";
import { FnbExpensePage } from "views/fnb/pages/FnbExpensePage/index";
import { FnbExpenseFundaPage } from "views/fnb/pages/FnbExpenseFundaPage";
import { FnbExpenseFundaDetailPage } from "views/fnb/pages/FnbExpenseFundaDetailPage";
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
                path="/fnb/product"
                component={() =>
                    <FnbLayout>
                        <FnBProductPage />
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/product/:productID"
                component={() =>
                    <FnbLayout>
                        <FnbProductQuotasPage />
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
                path="/fnb/shift/:fundaID/:shiftID/cash"
                component={() =>
                    <FnbLayout>
                        <FnbShiftCashPage />
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/shift/:fundaID/:shiftID/material"
                component={() =>
                    <FnbLayout>
                        <FnbShiftMaterialPage />
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
                path="/fnb/contacts/:fundaID"
                component={() =>
                    <FnbLayout>
                        <FnbContactDetailPage />
                    </FnbLayout>
                }
            />

            {/* Quản lý kho: Nhập, xuất, tồn, thất thoát */}
            <Route
                exact
                path="/fnb/store"
                component={() =>
                    <FnbLayout>
                        <FnbStorePage />
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/store/:fundaID/import"
                component={() =>
                    <FnbLayout>
                        <FnbStoreImportPage />
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/store/:fundaID/import/:detailID"
                component={() =>
                    <FnbLayout>
                        <FnbStoreImportDetailPage />
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/store/:fundaID/export"
                component={() =>
                    <FnbLayout>
                        <FnbStoreExportPage />
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/store/:fundaID/export/:detailID"
                component={() =>
                    <FnbLayout>
                        <FnbStoreExportDetailPage />
                    </FnbLayout>
                }
            />

            {/* Doanh thu-1, Chi phí-2 */}
            <Route
                exact
                path="/fnb/expense"
                component={() =>
                    <FnbLayout>
                        <FnbExpensePage />
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/expense/:fundaID"
                component={() =>
                    <FnbLayout>
                        <FnbExpenseFundaPage />
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/expense/:fundaID/:detailID"
                component={() =>
                    <FnbLayout>
                        <FnbExpenseFundaDetailPage />
                    </FnbLayout>
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
            {/* <Route
                exact
                path="/fnb/home/:orderID/print/2"
                component={() =>
                    <FnbBillList />
                }
            /> */}
            <Route
                exact
                path="/fnb/home/order2"
                component={() =>
                    <FnbBillList />
                }
            />
            {/* F7 (https://app.trixgo.com/fnb/home/:orderID/print/2) */}
            {/* F6 (https://app.trixgo.com/fnb/home/:orderID/print/1) */}
            <Route path="/fnb/*" component={ErrorPage} />
        </Switch>
    )
};

export default FnbRouter;