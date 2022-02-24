import cn from "classnames";
import { ElementType, FC, HTMLAttributes } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import 'views/media/styles/index.css';

export interface PageProps {
	id: string | number
	path?: string
	navLink?: string

	title: string
	state?: unknown,
	isPrivate?: boolean,
	navExact?: boolean,
	navStrict?: boolean,
	isActive?: (match: any, location: any) => boolean,
}
type Props = {
	rightHeader?: ElementType,
	pages: Array<PageProps>,
}

const LayoutSecondary: FC<HTMLAttributes<HTMLDivElement> & Props> = ({ pages, children, rightHeader: RightHeader, ...props }) => {
	const match = useRouteMatch();

	return (
		<div className="flex flex-col text-sm text-black overflow-hidden h-full" {...props}>
			{/* Header */}
			<div className="px-4 flex justify-between w-full text-primary-gray bg-white border-b border-cbs-border">
				<div className="flex flex-1 text-medium">
					{
						pages.map(page => {
							if (page.isPrivate) return null;
							return <NavLink
								key={page.id}
								className="flex items-center justify-center border-b-2 border-transparent mx-2 leading-4 py-3"
								activeClassName="border-cbs-primary text-black font-bold"
								to={{ pathname: 'navLink' in page ? match.url + page.navLink : page.path }}
								exact
								isActive={page.isActive}
							// exact={page.navExact}
							// strict={page.navStrict}
							>
								{page.title}
							</NavLink>
						})
					}
				</div>
				{RightHeader && <RightHeader />}
			</div>
			{/* Content */}
			{children}
		</div >
	)
}

export default LayoutSecondary