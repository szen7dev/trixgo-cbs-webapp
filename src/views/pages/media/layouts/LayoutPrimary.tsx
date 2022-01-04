import { ElementType, FC } from "react";
import { NavLink } from "react-router-dom";

import '../style.css';
interface PageProps {
	id: string | number
	title: string
	path: string
}

interface Props {
	rightHeader?: ElementType,
	pages: PageProps[]
}
const LayoutPrimary: FC<Props> = ({ pages, children, rightHeader: RightHeader }) => {
	return (
		<div className="flex flex-col text-sm text-black overflow-hidden h-full">
			{/* Header */}
			<div className="px-4 flex justify-between w-full text-primary-gray bg-white border-b border-cbs-border">
				<div className="flex flex-1 text-medium">
					{pages.map(page => <NavLink
						key={page.id}
						className="flex items-center justify-center border-b-2 border-transparent mx-2 leading-4 py-3"
						activeClassName="border-cbs-primary text-black font-bold"
						style={{ minWidth: "110px" }}
						to={page.path}
						exact
					>
						{page.title}
					</NavLink>)}
				</div>
				{RightHeader && <RightHeader />}
			</div>
			{/* Content */}
			{children}
		</div>
	)
}

export default LayoutPrimary
