import { FC } from "react";

import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";
import { NavLink } from 'react-router-dom';
import { useAuth } from "services/hooks/useAuth";

type RouteItem = {
	path: string,
	name: string,
	exact?: boolean,
	strict?: boolean,
	isActive?(match: any, location: any): boolean
}

export const routes: Array<RouteItem> = [
	{
		path: '/datahub/home',
		exact: true,
		name: 'Trang chủ',
	},
	{
		path: '/datahub/type',
		name: 'Phân loại hệ thống',
	},
	{
		path: '/datahub/project',
		name: 'Danh mục dự án',
	},
	{
		path: '/datahub/contractor/home',
		exact: true,
		name: 'Năng lực nhà thầu',
		isActive(match: any, location: any): boolean {
			if (match) return true;
			return location.pathname.includes('/datahub/contractor/');
		}
	},
	{
		path: '/datahub/inspection',
		name: 'Biểu mẫu nghiệm thu',
	},
	{
		path: '/datahub/price',
		name: 'Datahub giá'
	},
]

const DatahubLeftSideBar: FC = () => {
	const { user } = useAuth();

	return (
		<div className="t-leftsidebar-navigation t-leftsidebar-navigation-type2 fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
			<div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
				{/* title */}
				<div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 text-[14px] font-bold">
					<img src={user?.image ? `${process.env.REACT_APP_URL_S3_USER}/${user?.image}` : fakeThumbnail} alt="Thumbnail" className="w-10 h-10 rounded-full mr-3" />
					<span>Datahub</span>
				</div>

				{/* menu block */}
				<div className="t-link-menu-container">
					{
						routes.map((route, index) => {
							return (
								<NavLink
									key={index}
									to={{ pathname: route.path, }}
									exact={route.exact}
									strict={route.strict}
									isActive={route.isActive}
									className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
								>
									<img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
									<span className="truncate">{route.name}</span>
								</NavLink>
							)
						})
					}
				</div>

			</div>
		</div>
	)
}

export default DatahubLeftSideBar