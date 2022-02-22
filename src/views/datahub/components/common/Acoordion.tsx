import React, { FC, HTMLAttributes } from 'react';
import AcoordionItem from './AcoordionItem';

const items = [
	{
		key: '0', name: 'Tra cứu Năng lực nhà thầu', items: [
			{ key: '0', name: '123' },
		],
	},
	{
		key: '1', name: 'Tra cứu Lĩnh vực', items: [
			{ key: '0', name: '123' },
		],
	},
	{
		key: '2', name: 'Tra cứu Giá trong DataHub', items: [
			{ key: '0', name: '123' },
		],
	},
	{
		key: '3', name: 'Tra cứu Thông tin dự án', items: [
			{ key: '0', name: '123' },
		],
	},
	{
		key: '4', name: 'Tra cứu khác', items: [
			{ key: '0', name: '123' },
		],
	},
]

type Props = {

}

const Acoordion: FC<HTMLAttributes<HTMLDivElement> & Props> = ({ ...props }) => {
	return (
		<div {...props}>
			<div className='divide-y bg-white divide-cbs-border'>
				{items.map((item, i) => {
					return (
						<AcoordionItem
							key={item.key}
							items={item.items}
							title={item.name} />
					)
				})}
			</div>
		</div>
	)
}

export default Acoordion