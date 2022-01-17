import React, { FC, useState } from "react";
import LayoutPrimary from "../media/layouts/LayoutPrimary";
import PageOne from "./planning/components/FinancialCashbook/PageOne";
import PageTwo from "./planning/components/FinancialCashbook/PageTwo";

const pages = [
	{ id: '1', title: 'Tổng hợp quỹ' },
	{ id: '2', title: 'Sổ quỹ công ty' },
	{ id: '3', title: 'Sổ quỹ khác' },
]
const FinDashboardPage: FC = () => {
	const [page, setPage] = useState(pages[0])
	return (
		<LayoutPrimary component pages={pages} value={page} onClickPage={setPage} >
			{page.id === '1' && <PageOne />}
			{page.id === '2' && <PageTwo />}
			{page.id === '3' && <h1>Sổ quỹ3</h1>}
		</LayoutPrimary>
	)
};

export default FinDashboardPage;