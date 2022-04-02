import { FC, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { SearchInput, ButtonMore, ButtonCreate } from "shareComponents/common";
// import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import ModalExample from "views/ppt/sharedComponents/common/ModalExample";

import ChartReportByTime from "./components/ChartReportByTime";
import CardImage from "./components/CardImage";
import { useQueryDetailDepartment } from "services/hooks/items/useDepartment";
import { usePcmFile } from 'services/hooks/pcm/usePcm';

const ProjectPhotoPage: FC = () => {
	const { id: projectID } = useParams<{ id: string }>();
	const [isShow, setIsShow] = useState(false);
	const location = useLocation();

	const { onFetchDetailDepartmentAsync, detailDepartment } = useQueryDetailDepartment();
	const { listFilesPcm } = usePcmFile({
		projectID
	});

	useEffect(() => {
		if(projectID) {
			onFetchDetailDepartmentAsync(projectID);
		}
	}, [projectID])

	useEffect(() => {
		document.title = "CHG.THT-Hình ảnh"
	}, []);

	return (
		<>
			<div className="flex flex-col h-full overflow-hidden">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
					<span className="text-x-large mr-7">Danh sách</span>
					<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
					{/* <DropdownFilterButton className="mr-auto" /> */}

					<ButtonCreate onClick={() => setIsShow(false)} />
					<ButtonMore />
				</div>
				{/* Content */}
				<div className=" overflow-auto">
					<div className="pl-6 pr-2.5 border-0.5 border-cbs-border">
						<div className="flex justify-between flex-wrap items-center">
							<h3 className="text-x-large mt-2.5 font-bold text-cbs-subtext">Báo cáo theo thời gian</h3>
						</div>
						<div className="h-[180px]">
							<ChartReportByTime project={detailDepartment} files={listFilesPcm} />
						</div>
					</div>

					<div className="flex flex-wrap py-5 gap-y-4">
						{Array.from({ length: 14 }).map((_, i) => (
							<div className="lg:w-6/12 2xl:w-4/12 px-2" key={i}>
								<div className="shadow-cbs-md">
									<div className="grid grid-cols-3 gap-1 text-white px-1 pt-2.5">
										{Array.from({ length: Math.ceil(Math.random() * 12) + 5 }).map((_, index) => index <= 5 && <CardImage pathname={location.pathname + '/package/' + i} index={index} key={index} />)}
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
			<ModalExample isShow={isShow} toggle={() => setIsShow(!isShow)} />
		</>
	);
};

export default ProjectPhotoPage;