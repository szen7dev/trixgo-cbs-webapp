import { FC, useContext, useEffect } from "react";

// Context
import { Context as ModalContext, Provider as ModalProvider } from "../document/contexts/contextModal";

import SearchInput from "components/common/SearchInput";
import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import ButtonCreate from "views/pages/document/components/common/ButtonCreate";
import ButtonMore from "views/pages/document/components/common/ButtonMore";
import ModalCreateDocument from "../document/components/common/ModalCreateDocument";
import ChartReportByTime from "./components/chart/ChartReportByTime";
import generateImageLink from "../media/utils/images";
import classNames from "classnames";
import CardImage from "./components/photo/CardImage";
import { Link, useLocation } from "react-router-dom";

const ProjectPhoto: FC = () => {
	const { toggleModal } = useContext(ModalContext);
	const location = useLocation();
	console.log(location)

	useEffect(() => {
		document.title = "CHG.THT-Hình ảnh"
	}, []);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
				<span className="text-x-large mr-7">Danh sách</span>
				<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
				<DropdownFilterButton className="mr-auto" />

				<ButtonCreate onClick={toggleModal} />
				<ButtonMore />
			</div>
			{/* Content */}
			<div className=" overflow-auto">
				<div className="pl-6 pr-2.5 border-0.5 border-cbs-border">
					<div className="flex justify-between flex-wrap items-center">
						<h3 className="text-x-large mt-2.5 font-bold text-cbs-subtext">Báo cáo theo thời gian</h3>
					</div>
					<div className="h-[180px]">
						<ChartReportByTime />
					</div>
				</div>

				<div className="flex flex-wrap py-5 gap-y-4">
					{Array.from({ length: 14 }).map((_, i) => (
						<div className="lg:w-6/12 2xl:w-4/12 px-2" key={i}>
							<div className="shadow-cbs-md">
								<div className="grid grid-cols-3 gap-1 text-white px-1 pt-2.5">
									{Array.from({ length: Math.ceil(Math.random() * 12) + 5 }).map((_, index) => index <= 5 && <CardImage pathname={location.pathname + '/package/' + i} index={index} />)}
								</div>
								<Link to={location.pathname + '/package/' + i}>
									<div className="px-4 py-3 text-justify font-bold text-large">
										CHG.THT.Thi công san lấp mặt bằng, đường giao thông nội bộ, cầu rửa xe
									</div>
								</Link>
								<div className="flex justify-between pl-4 pr-6 py-1.5 text-medium bg-cbs-table-header">
									<span >Số lượng ảnh</span>
									<span>
										<b>
											158
										</b>
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const ProjectPhotoPage: FC = () => {
	return (
		<ModalProvider>
			<ProjectPhoto />
			<ModalCreateDocument />
		</ModalProvider>
	)
}

export default ProjectPhotoPage;