import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import ModalCreateDocument from 'views/pages/document/components/common/ModalCreateDocument';
import { Provider } from 'views/pages/document/contexts/contextModal';
import LayoutPrimary from 'views/pages/media/layouts/LayoutPrimary';

const LayoutProjectBidding: FC<RouteComponentProps> = ({ match, children }) => {
	const pages = [
		{ id: '1', title: 'Hồ sơ dự thầu', path: match.url },
		{ id: '2', title: 'Hồ sơ mời thầu', path: match.url + '/1' },
		{ id: '3', title: 'Tư vấn thầu', path: match.url + '/2' },
	]

	return (
		<Provider>
			<LayoutPrimary pages={pages}>
				{children}
			</LayoutPrimary>
			<ModalCreateDocument />
		</Provider>
	)
}

export default LayoutProjectBidding
