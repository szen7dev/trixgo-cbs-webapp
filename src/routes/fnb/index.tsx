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

import { FnBHomePage } from "views/fnb/pages/FnbHomePage/index";
import { FnBProductPage } from "views/fnb/pages/FnbProductPage/index";
import { FnbProductQuotasPage } from "views/fnb/pages/FnbProductQuotasPage/index";
import { FnbShiftPage } from "views/fnb/pages/FnbShiftPage/index";
import { FnbShiftDetailPage } from "views/fnb/pages/FnbShiftDetailPage/index";
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
                path="/fnb/shift/:fundaID/:shiftID/material"
                component={() =>
                    <FnbLayout>
                        <FnbShiftMaterialPage/>
                    </FnbLayout>
                }
            />

            {/* Quản lý kho: Nhập, xuất, tồn, thất thoát */}
            <Route
                exact
                path="/fnb/store"
                component={() =>
                    <FnbLayout>
                        <FnbStorePage/>
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/store/:fundaID/import"
                component={() =>
                    <FnbLayout>
                        <FnbStoreImportPage/>
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/store/:fundaID/import/:detailID"
                component={() =>
                    <FnbLayout>
                        <FnbStoreImportDetailPage/>
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/store/:fundaID/export"
                component={() =>
                    <FnbLayout>
                        <FnbStoreExportPage/>
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/store/:fundaID/export/:detailID"
                component={() =>
                    <FnbLayout>
                        <FnbStoreExportDetailPage/>
                    </FnbLayout>
                }
            />

            {/* Doanh thu-1, Chi phí-2 */}
            <Route
                exact
                path="/fnb/expense"
                component={() =>
                    <FnbLayout>
                        <FnbExpensePage/>
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/expense/:fundaID"
                component={() =>
                    <FnbLayout>
                        <FnbExpenseFundaPage/>
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/expense/:fundaID/:detailID"
                component={() =>
                    <FnbLayout>
                        <FnbExpenseFundaDetailPage/>
                    </FnbLayout>
                }
            />

            <Route
                exact
                path="/fnb/revenue-report"
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