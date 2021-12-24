import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

interface Tab {
	id: string | number,
	title: string,
	path?: string
}

interface TabsProps {
	tabs: Tab[],
	defaultValue?: number,
	onSelect?: (tab: Tab) => unknown,
	url: string
}

const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement> & TabsProps> = ({ url, defaultValue, onSelect, tabs, ...props }) => {
	const pathname = '/document/project/asd/document'
	return (
		<div {...props}>
			{tabs.map(({ id, title, path }) => (
				<NavLink
					exact
					activeClassName='border-primary text-black font-bold'
					className="border-b-2 border-transparent mx-2 py-2.5 text-center"
					style={{ minWidth: "64px" }}
					key={id}
					to={pathname + (path === '/' ? '' : path)}
				>
					{title}
				</NavLink>
			))
			}
		</div >
	)
}

export default TabsList
