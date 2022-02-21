import SearchInput from 'components/common/SearchInput';
import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import ModalCreateDocument from 'views/pages/document/components/common/ModalCreateDocument';
import { Provider } from 'views/pages/document/contexts/contextModal';
import LayoutPrimary from 'views/pages/media/layouts/LayoutPrimary';

const LayoutProjectDrawing: FC<RouteComponentProps> = ({ match, children }) => {
	const pages = [
		{ id: '1', title: 'Danh sách', path: match.url },
		{ id: '2', title: 'Quản lý phiên bản', path: match.url + '/2' },
	]

	return (
		<Provider>
			<LayoutPrimary
				pages={pages}
				rightHeader={() => (
					<SearchInput classNameWrapper='w-[296px]' onChange={() => false} placeholder='Tìm kiếm bản vẽ' />
				)}
			>
				{children}
			</LayoutPrimary>
			<ModalCreateDocument />
		</Provider>
	)
}

export default LayoutProjectDrawing
