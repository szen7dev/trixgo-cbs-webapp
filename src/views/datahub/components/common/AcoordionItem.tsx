/* eslint-disable react/no-unescaped-entities */
import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames'

type Props = {
	title: string;
	items: any;
	renderItem?: (items: any) => JSX.Element;
	renderButton?: (items: any) => JSX.Element;
}

const AcoordionItem: FC<Props> = ({ title, renderItem, items, ...props }) => {
	const [active, setActive] = useState(false);
	const item = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (item.current) {
			const height = item.current.clientHeight;
			item.current.style.height = active ? `${height}px` : '0px';
		}
	}, [])

	const onClickButton = () => {
		if (!item.current) return;
		setActive(!active);
		// console.log(item.current)
		if (!active) {
			item.current.style.height = item.current.scrollHeight + 'px';
		} else {
			item.current.style.height = '0px';
		}
	}

	return (
		<div className='overflow-hidden text-medium'>
			<button className='w-full relative px-2' onClick={onClickButton}>
				<div className={classNames('border-b text-left pr-6 py-4', active ? 'border-cbs-border' : 'border-transparent')}>
					{title}
					<div className='absolute inset-y-0 right-2 flex items-center text-cbs-primary'>
						<svg xmlns="http://www.w3.org/2000/svg" className={classNames("transition-transform ease-in-out h-5 w-5", { 'rotate-90': active })} viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
						</svg>
					</div>
				</div>
			</button>
			<div className='transition-all divide-y divide-cbs-border px-2' ref={item}>
				{renderItem
					? renderItem(items)
					: items.map((item: any, i: number) => {
						return (
							<div className='py-4' key={i}>
								{item.name}
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default AcoordionItem