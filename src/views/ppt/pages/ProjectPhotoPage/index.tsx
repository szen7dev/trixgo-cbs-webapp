import { FC, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import debounce from 'lodash/debounce';

import { SearchInput } from "shareComponents/common";
// import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import ModalExample from "views/ppt/sharedComponents/common/ModalExample";

import ChartReportByTime from "./components/ChartReportByTime";
import CardImage from "./components/CardImage";
import { useQueryDetailDepartment } from "services/hooks/items/useDepartment";
import { usePcmFile } from 'services/hooks/pcm/usePcm';
import { APP_ID } from 'apis/localdb';
import { useHistoryTraffics } from "services/hooks/auth/useAuth";
import { useProject } from 'services/hooks/items/useProject';

const ProjectPhotoPage: FC = () => {
	//_____Start history traffict
	 const payloadHistoryTraffic: any = {
		appID: APP_ID.PCM.id,
		menuID: APP_ID.PCM.menuPcmProject.photo.id,
		type: "1"
	  };
	const { createHistoryTraffics } = useHistoryTraffics();
	useEffect(() => {
		createHistoryTraffics({...payloadHistoryTraffic, type: 1});
	}, []);
	//_____End history traffict

	const { id: projectID } = useParams<{ id: string }>();
	// const [keyword, setKeyword] = useState('');
	const [isShow, setIsShow] = useState(false);
	const location = useLocation();

	const { onFetchDetailDepartmentAsync, detailDepartment } = useQueryDetailDepartment();
	const { filesGroupByDate, filesGroupByContract } = usePcmFile({
		params: {
			projectID
		},
		isFetchFilesGroupDate: true,
		isFetchFilesGroupContract: true
	});

	useEffect(() => {
		if(projectID) {
			onFetchDetailDepartmentAsync(projectID);
		}
	}, [projectID])

	const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID,
			select: "name sign",
			populates: ""
		},
		isFetchInfo: true
	})

	useEffect(() => {
		document.title = `${projectInfo.sign} | Hình ảnh`
	}, []);

	const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        // setKeyworkd(event.target.value);
    }, 500);

	return (
		<>
			<div className="flex flex-col h-full overflow-hidden">
				<div className="overflow-auto">
					<div className="pl-6 pr-2.5">
						<div className="flex justify-between flex-wrap items-center">
							<h3 className="text-x-large mt-2.5 font-bold text-cbs-subtext">Báo cáo theo thời gian</h3>
						</div>
						<div className="h-[180px]">
							<ChartReportByTime project={detailDepartment} files={filesGroupByDate} />
						</div>
					</div>

					<div className="flex flex-wrap py-5 gap-y-4">
						{(filesGroupByContract && filesGroupByContract.length) ? filesGroupByContract.map((file, i) => (
							<div className="lg:w-6/12 2xl:w-4/12 px-2" key={file.contract?._id}>
								<div className="grid border-0.5 border-primary-border h-full" style={{gridTemplateRows:'1fr max-content'}}>
									{/* grid grid-cols-3 gap-1 */}
									<div className="flex flex-wrap text-white px-1">
										{file.contract?.photos?.slice(0, 6)?.map((photo, index) =>
											<CardImage
												image={photo}
												pathname={`${location.pathname}/${file.contract?._id}`}
												index={index}
												total={file.count}
												key={photo._id}
											/>)}
									</div>
									<Link to={`${location.pathname}/${file.contract?._id}`}>
										<div className="px-4 py-3 text-justify font-bold text-large">
											{file.contract?.name}
										</div>
									</Link>
									<div className="flex justify-between pl-4 pr-6 py-1.5 bg-cbs-table-header">
										<span className={"text-primary-gray"}>Số lượng ảnh</span>
										<span>
											<b> {file.count} </b>
										</span>
									</div>
								</div>
							</div>
						)) : <></>}
					</div>
				</div>
			</div>
			<ModalExample isShow={isShow} toggle={() => setIsShow(!isShow)} />
		</>
	);
};

export default ProjectPhotoPage;