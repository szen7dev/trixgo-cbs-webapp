import { FC } from "react";

import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";
import { NavLink, useRouteMatch, generatePath } from 'react-router-dom';
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
		path: '/pcm/project/:id/home',
		name: 'Trang chủ',
	},
	{
		path: '/pcm/project/:id/dashboard',
		name: 'Báo cáo quản trị',
	},
	{
		path: '/pcm/project/:id/folder',
		name: 'Thư mục dữ liệu',
	},
	{
		path: '/pcm/project/:id/schedule',
		name: 'Tiến độ',
	},
	{
		path: '/pcm/project/:id/budget',
		name: 'Ngân sách và kế hoạch'
	},
	{
		path: '/pcm/project/:id/bidding',
		name: 'Lựa chọn nhà thầu'
	},
	{
		path: '/pcm/project/:id/payment',
		name: 'Báo cáo',
	},
	{
		path: '/pcm/project/:id/document',
		name: 'Hồ sơ văn bản',
	},
	{
		path: '/pcm/project/:id/photo',
		name: 'Hình ảnh',
	},
	{
		path: '/pcm/project/:id/drawing',
		name: 'Bản vẽ và chỉ dẫn',
	},
	{
		path: '/pcm/project/:id/resource',
		name: 'Quản lý vật tư',
	},
	{
		path: '/pcm/project/:id/inspection',
		name: 'Nghiệm thu chất lượng',
	},
	{
		path: '/pcm/project/:id/contact',
		name: 'Danh bạ dự án',
	},
]

const ProjectLeftSideBar: FC = () => {
	const { user } = useAuth();
	const match = useRouteMatch<{ id: string }>();

	return (
		<div className="t-leftsidebar-navigation t-leftsidebar-navigation-type2 fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
			<div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
				{/* title */}
				<div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 text-[14px] font-bold">
					<img src={user?.image ? `${process.env.REACT_APP_URL_S3_USER}/${user?.image}` : fakeThumbnail} alt="Thumbnail" className="w-10 h-10 rounded-full mr-3" />
					<span>Project</span>
				</div>

				{/* menu block */}
				<div className="t-link-menu-container">
					{
						routes.map((route, index) => {
							return (
								<NavLink
									key={index}
									to={{ pathname: generatePath(route.path, match.params), }}
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

export default ProjectLeftSideBar