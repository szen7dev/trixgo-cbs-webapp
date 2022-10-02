import { FC, Fragment, useEffect, useState } from "react";
import moment from "moment";

import { ButtonCreate, ButtonMore } from 'shareComponents/common'
import LayoutSecondary from "views/ppt/sharedComponents/layouts/LayoutSecondary";
import ModalCreateInspection from "./components/ModalCreateInspection";
import { Link, generatePath, useRouteMatch } from "react-router-dom";

const ProjectInspectionPage: FC = () => {
	const [isShow, setIsShow] = useState(false);
	const match = useRouteMatch<{ id: string }>();

	useEffect(() => {
		document.title = "Nghiệm thu | Trixgo"
	}, []);

	return (
		<LayoutSecondary
			pages={[
				{ id: '1', title: 'Tất cả', path: '/pm/project/:id/inspection', navExact: true },
				{ id: '2', title: 'Gói thầu', path: '/pm/project/:id/inspection/tabs2' },
				{ id: '3', title: 'Báo cáo gói thầu', path: '/pm/project/:id/inspection/tabs3' },
				{ id: '4', title: 'Báo cáo quản trị', path: '/pm/project/:id/inspection/tabs4' },
			]}
			rightHeader={() => <div className="flex items-center">
				<ButtonCreate onClick={() => setIsShow(true)} />
				<ButtonMore />
			</div>}
		>
			<div className="overflow-auto">
				{Array.from({ length: 10 }).map((_, index) => (
					<div key={index} className="grid grid-cols-auto-4 text-medium px-3.5 border-b-[5px] border-[#E8F0FE]">
						<div className="col-span-4 pb-2.5 pt-4">
							<div className="inline-flex items-center bg-[#E8F0FE] py-1.5 pl-1.5 pr-2 rounded-cbs">
								<div className="text-3x-large mr-1">
									{moment(new Date).format('DD')}
								</div>
								<div>
									<p className="first-letter:uppercase">{moment(new Date).format('dddd')}</p>
									<p>{moment(new Date).format('[Tháng] MM [năm] yyyy')}</p>
								</div>
							</div>
						</div>
						{
							Array.from({ length: 2 }).map((_, i) => (
								<Fragment key={i}>
									<div className="pt-2 pb-3">
										<Link to={generatePath("/pm/project/:id/inspection/:path", { id: match.params.id, path: i })} className="hover:text-cbs-primary">
											Kiểm tra cốt thép trục A1, A2 khu vực nhà A2
										</Link>
										<p className="text-cbs-subtext"><i>Khởi tạo: Đào Nguyễn Duy Tùng-TNC 15:30 12/8/2021</i></p>
										<p className="mt-1.5">
											<svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-4 h-4 rotate-90 text-cbs-schedule-after-7days" viewBox="0 0 448 512" fill="currentColor" stroke="currentColor">
												<path d="M48 32H197.5C214.5 32 230.7 38.74 242.7 50.75L418.7 226.7C443.7 251.7 443.7 292.3 418.7 317.3L285.3 450.7C260.3 475.7 219.7 475.7 194.7 450.7L18.75 274.7C6.743 262.7 0 246.5 0 229.5V80C0 53.49 21.49 32 48 32L48 32zM112 176C129.7 176 144 161.7 144 144C144 126.3 129.7 112 112 112C94.33 112 80 126.3 80 144C80 161.7 94.33 176 112 176z" />
											</svg>
											<span className="text-cbs-subtext"><i>Căn hộ C1, tầng 2</i></span>
										</p>
									</div>
									<div className="pt-2 pb-3">
										CHG.THT.001
									</div>
									<div className="pt-2 pb-3">
										<p>Nguyễn Đình Khiên-CPMI</p>
										<p>Tạ Hoàng Trung Sơn-ARM</p>
									</div>
									<div className="pt-2 pb-3">
										Processing
									</div>
								</Fragment>
							))
						}
					</div>
				))}
			</div>
			<ModalCreateInspection type="create" show={isShow} toggle={() => setIsShow(!isShow)} />
		</LayoutSecondary>
	);
};
export default ProjectInspectionPage;