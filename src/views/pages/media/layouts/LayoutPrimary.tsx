import cn from "classnames";
import { ElementType, FC, HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import { boolean } from "yup";

import '../style.css';
interface PageProps {
	id: string | number
	path?: string
	title: string
	state?: unknown
}
type Props = {
	rightHeader?: ElementType,
	pages: Array<PageProps>,
	onClickPage?: (page: any) => any,
	value?: PageProps | unknown,
	component?: boolean
}

const LayoutPrimary: FC<HTMLAttributes<HTMLDivElement> & Props> = ({ value, onClickPage, component, pages, children, rightHeader: RightHeader, ...props }) => {
	return (
		<div className="flex flex-col text-sm text-black overflow-hidden h-full" {...props}>
			{/* Header */}
			<div className="px-4 flex justify-between w-full text-primary-gray bg-white border-b border-cbs-border">
				<div className="flex flex-1 text-medium">
					{pages.map(page => !component
						? <NavLink
							key={page.id}
							className={cn(
								"flex items-center justify-center border-b-2 border-transparent mx-2 leading-4 py-3",
								value && page.state && value === page.state
									? "border-cbs-primary text-black font-bold"
									: ""
							)}
							activeClassName={value ? "" : "border-cbs-primary text-black font-bold"}
							style={{ minWidth: "110px" }}
							to={{ pathname: page.path || '/', state: page.state }}
							exact
						>
							{page.title}
						</NavLink>
						: <button
							key={page.id}
							className={cn(
								"flex items-center justify-center border-b-2 border-transparent mx-2 leading-4 py-3",
								{ "border-cbs-primary text-black font-bold": (value as PageProps)?.id === page.id }
							)}
							onClick={() => onClickPage?.(page)}
						>
							{page?.title}
						</button>)}
				</div>
				{RightHeader && <RightHeader />}
			</div>
			{/* Content */}
			{children}
		</div >
	)
}

export default LayoutPrimary
