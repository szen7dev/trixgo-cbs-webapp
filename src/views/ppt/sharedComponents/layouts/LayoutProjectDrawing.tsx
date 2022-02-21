import SearchInput from 'components/common/SearchInput';
import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { ModalProvider } from '../../contexts/modal';

import ModalExample from '../common/ModalExample';

import LayoutPrimary from './LayoutPrimary';

const LayoutProjectDrawing: FC<RouteComponentProps> = ({ match, children }) => {
	const pages = [
		{ id: '1', title: 'Danh sách', path: match.url },
		{ id: '2', title: 'Quản lý phiên bản', path: match.url + '/2' },
	]

	return (
		<ModalProvider>
			<LayoutPrimary
				pages={pages}
				rightHeader={() => (
					<SearchInput classNameWrapper='w-[296px]' onChange={() => false} placeholder='Tìm kiếm bản vẽ' />
				)}
			>
				{children}
			</LayoutPrimary>
			<ModalExample />
		</ModalProvider>
	)
}

export default LayoutProjectDrawing
