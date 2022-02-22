import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';

import { ModalProvider } from '../../contexts/modal'

import ModalExample from '../common/ModalExample';

import LayoutPrimary from './LayoutPrimary';

const LayoutProjectBidding: FC<RouteComponentProps> = ({ match, children }) => {
	const pages = [
		{ id: '1', title: 'Hồ sơ dự thầu', path: match.url },
		{ id: '2', title: 'Hồ sơ mời thầu', path: match.url + '/1' },
		{ id: '3', title: 'Tư vấn thầu', path: match.url + '/2' },
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

export default LayoutProjectBidding
