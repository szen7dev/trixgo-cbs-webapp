import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import ModalCreateDocument from 'views/pages/document/components/common/ModalCreateDocument';
import { Provider } from 'views/pages/document/contexts/contextModal';
import LayoutPrimary from 'views/pages/media/layouts/LayoutPrimary';

const LayoutProjectDocument: FC<RouteComponentProps> = ({ match, children }) => {
	const pages = [
		{ id: '1', title: 'List', path: match.url },
		{ id: '2', title: 'Phân loại', path: match.url + '/1' },
		{ id: '3', title: 'Thư mục', path: match.url + '/2' },
		{ id: '3', title: 'Báo cáo', path: match.url + '/3' },
		{ id: '3', title: 'Lịch sử upload file', path: match.url + '/4' },
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

export default LayoutProjectDocument
