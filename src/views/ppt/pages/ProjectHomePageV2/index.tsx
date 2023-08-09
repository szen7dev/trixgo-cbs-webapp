import React, {FC, useContext, useEffect} from "react";
import Carousel from 'react-elastic-carousel'
import {useProject} from "../../../../services/hooks/items/useProject";
import {useParams} from "react-router-dom";
import { ContextModalPost } from "views/media/contexts/post";
import {ModalZoomView} from "../../../../shareComponents/common";
import moment from "moment";

const ProjectHomePageV2: FC = () => {
	const {openPost, state, toggleModal } = useContext(ContextModalPost);

	const { id: projectID } = useParams<{ id: string }>();
	const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID
		},
		isFetchInfo: true
	})

	useEffect(() => {
		document.title = `${projectInfo.sign} | Trang chủ dự án`;
	}, [projectInfo.sign]);

	const renderPrevNextButton = (type: string, onClick: () => void) => {
		return (
			<div className={"flex items-center absolute z-10 h-full " + (type === "PREV" ? "left-0" : "right-0")}>
				<button
					onClick={onClick}
					className={"w-10 h-10 flex items-center justify-center border-0.5 rounded-lg border-primary-border bg-cbs-next-prev-button " + (type === "PREV" ? "" : "rotate-180")}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>
			</div>
		)
	}

	return (
		<div className={"project-home p-2"}>
			{/* <p className={"font-bold text-primary-gray"}>Giới thiệu dự án</p>
			<div className={"mt-4 pl-6"}>
				<table className={"table-fixed w-full"}>
					<tbody>
					<tr>
						<td className={"w-1/12"}>
							<div className={"flex justify-center"}>
								<img src={userAvt} alt={"----"} className={"w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full overflow-hidden"}/>
							</div>
						</td>
						<td className={"w-2/12"}>
							<p className={"truncate"}>Phan Văn Trường-PGI</p>
							<p className={"mt-1 text-xs text-primary-gray truncate"}>8 liên quan, 2 cc</p>
						</td>
						<td className={"w-8/12"}>
							<p className={"truncate"}>HAR.MAR.Tài liệu giới thiệu thông tin dự án</p>
							<p className={"truncate mt-1 text-primary-gray text-xs"}>Kính gửi anh Hiếu và các anh Chủ đầu tư, Đính kèm là Biên bản họp giao ban tuần 1 tháng 12.2021 ngày 10/12/2021 lúc 2:00 PM giữa Chủ đầu tư và Ban quản lý dự án. Trân trọng, Ms. Linh from CPMI...</p>
						</td>
						<td className={"w-1/12"}>
							<p className={"truncate text-right"}>4 thg 8</p>
						</td>
					</tr>
					</tbody>
				</table>
			</div> */}

			{/* <p className={"font-bold text-primary-gray mt-6"}>Hình ảnh gần đây</p>
			<div className={"swipe-image w-full mt-4 relative"}>
				<Carousel
					itemsToShow={6}
				 	isRTL={false}
					itemPadding={[0,5,0,5]}
					pagination={false}
					renderArrow={({type, onClick}) => renderPrevNextButton(type, onClick)}
				>
					{
						projectInfo?.photos?.map((photo,i) => (
							<div key={photo._id} className='w-full pb-[100%] relative' onClick={()=> openPost({ author: photo.author, images: projectInfo.photos, index: i, createAt: photo.createAt, mediaId: photo._id.toString() })}>
								<div className='absolute inset-0 overflow-hidden z-1'>
									<img src={`${process.env.REACT_APP_URL_S3}${photo.path}`} alt={`Report ${photo.path}`} className="object-cover h-full w-full" />
								</div>
								<div className={"absolute bottom-0 bg-cbs-gray py-1 px-2 flex items-start w-full max-w-full z-2"}>
									<img src={`${process.env.REACT_APP_URL_S3_USER}/${photo.author.image}`} alt={`Report ${photo.author.bizfullname}`} className={"w-[28px] h-[28px] min-w-[28px] min-h-[28px] max-w-[28px] max-h-[28px] rounded-full overflow-hidden"}/>
									<div className={"ml-2 w-10/12"}>
										<p className={"truncate"}>{photo.author.bizfullname}</p>
										<p className={"truncate text-primary-gray text-xs"}>{projectInfo.sign}</p>
										<p className={"truncate text-primary-gray text-xs"}>{moment(photo.createAt).format('DD/M/YYYY HH:mm')} ({moment(photo.createAt).fromNow()})</p>
									</div>
								</div>
							</div>
						))
					}
				</Carousel>
			</div> */}
			
			{/* <table className={"mt-6 table-fixed w-full"}>
				<thead>
					<tr className={"border-b-0.5 border-primary-border py-2"}>
						<th className={"w-6/12 text-primary-gray text-left pl-4 py-2"}>Đơn vị</th>
						<th className={"w-3/12 text-primary-gray text-left py-2"}>Tương tác ngày nay</th>
						<th className={"w-3/12 text-primary-gray text-left py-2"}>Tổng tương tác</th>
					</tr>
				</thead>
				<tbody>
					<tr className={"border-b-0.5 border-primary-border"}>
						<td className={"pl-4 py-2"}>
							<div className={"flex items-center"}>
								<img src={imageCompany} alt={"---"} className={"w-[56px] h-[56px] min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-full overflow-hidden"}/>
								<div className={"ml-4"}>
									<p>HAR.Công ty cổ phần đầu tư và phát triển haritex</p>
									<p className={"mt-1 text-primary-gray text-xs"}>05 thành viên</p>
								</div>
							</div>
						</td>
						<td className={"py-2"}>12</td>
						<td className={"py-2"}>105</td>
					</tr>
					<tr className={"border-b-0.5 border-primary-border"}>
						<td className={"pl-4 py-2"}>
							<div className={"flex items-center"}>
								<img src={imageCompany} alt={"---"} className={"w-[56px] h-[56px] min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-full overflow-hidden"}/>
								<div className={"ml-4"}>
									<p>HAR.Công ty cổ phần đầu tư và phát triển haritex</p>
									<p className={"mt-1 text-primary-gray text-xs"}>05 thành viên</p>
								</div>
							</div>
						</td>
						<td className={"py-2"}>12</td>
						<td className={"py-2"}>105</td>
					</tr>
					<tr className={"border-b-0.5 border-primary-border"}>
						<td className={"pl-4 py-2"}>
							<div className={"flex items-center"}>
								<img src={imageCompany} alt={"---"} className={"w-[56px] h-[56px] min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-full overflow-hidden"}/>
								<div className={"ml-4"}>
									<p>HAR.Công ty cổ phần đầu tư và phát triển haritex</p>
									<p className={"mt-1 text-primary-gray text-xs"}>05 thành viên</p>
								</div>
							</div>
						</td>
						<td className={"py-2"}>12</td>
						<td className={"py-2"}>105</td>
					</tr>
				</tbody>
			</table> */}

			<ModalZoomView prioritySingleImageAuthor isShow={state.isShow} toggle={toggleModal} initialData={{
				createAt: state.createAt,
				images: state.images,
				index: state.index,
				mediaID: state.mediaID,
				author: state.author
			}} />
		</div>
	);
};
export default ProjectHomePageV2;