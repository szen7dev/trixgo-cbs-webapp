import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import ModalExample from '../common/ModalExample';
import { ModalProvider } from '../../contexts/modal'

import LayoutPrimary from './LayoutPrimary';

const LayoutProjectDocument: FC<RouteComponentProps> = ({ match, children }) => {
	const pages = [
		{ id: '1', title: 'List', path: match.url },
		{ id: '2', title: 'Phân loại', path: match.url + '/1' },
		{ id: '3', title: 'Thư mục', path: match.url + '/2' },
		{ id: '4', title: 'Báo cáo', path: match.url + '/3' },
		{ id: '5', title: 'Lịch sử upload file', path: match.url + '/4' },
	]

	return (
		<ModalProvider>
			<LayoutPrimary pages={pages}>
				{children}
			</LayoutPrimary>
			<ModalExample />
		</ModalProvider>
	)
}

export default LayoutProjectDocument
