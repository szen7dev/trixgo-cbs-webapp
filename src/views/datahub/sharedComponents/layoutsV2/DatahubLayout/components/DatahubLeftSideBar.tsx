import { FC } from "react";

import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";
import { NavLink } from 'react-router-dom';
import { useAuth } from "services/hooks/auth/useAuth";

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
		path: '/datahub/contact',
		name: 'Danh bạ hệ thống'
	},
	{
		path: '/datahub/price',
		name: 'Datahub giá'
	},
]

const DatahubLeftSideBar: FC = () => {
	const { user } = useAuth();

	return (
		<div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
			<div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">

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
									className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
								>
									<img width={'20px'} src={iconFolder} alt="Menu item" />
									<span className={"flex-1 ml-2 text-left text-[14px]"}>{route.name}</span>
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