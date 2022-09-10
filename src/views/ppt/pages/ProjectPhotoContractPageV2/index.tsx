import React, { FC, useEffect, useState } from "react";
import {useParams, Link, useHistory} from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import parse from "html-react-parser";

import { ModalZoomView } from "shareComponents/common/ZoomView";
import { ImageProps } from "typings/common";
import { useCommentPcm } from 'services/hooks/useTask';
import { useContract } from 'services/hooks/items/useContract';
import moment from "moment";
import { User } from "typings/user";
import iconBack from "assets/images/icon-back-gray.svg";
import { useProject } from 'services/hooks/items/useProject';

const ProjectPhotoContractPage: FC = () => {
	const subContentHtml = (html?: string) => {
        const removeHtmlTag = parse(
            (html || "").replace(/<[^>]*>?/gm, " ")
        ).toString();

        const result =
            removeHtmlTag.length > 75
                ? `${removeHtmlTag.slice(0, 75)}...`
                : removeHtmlTag;
        return result;
    };

	const history = useHistory();
	const { contractID, id: projectID } = useParams<{ contractID: string, id: string }>();
	const [defaultState, setDefaultState] = useState({
		mediaID: contractID,
		images: [] as ImageProps[],
		index: 0,
		author: {} as User,
		createAt: ""
	});
	const [isShow, setIsShow] = useState(false);

	const { contractInfo } = useContract({
		params: {
			contractID,
			select: "name",
			populates: JSON.stringify({
				path: "project",
				select: "_id"
			})
		},
		isFetchInfo: !!contractID
	});

	const {
		listComments,
		nextPageListComments,
		hasNextPageComments,
	} = useCommentPcm({
		params: {
			contractID,
			isHaveImage: true,
			select: "_id content author images task createAt",
			populates: JSON.stringify({
				path: "images author task",
				select: "_id nameOrg path bizfullname image"
			})
		},
		isFetchComment: !!contractID
	});
	
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

	const toggle = () => setIsShow(!isShow)

	if(!contractInfo) return <>Nothing...</>;

	return (
		<>
			<div className="flex flex-col h-full overflow-hidden">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-2">
					<button
						onClick={() => history.push(`/pm/project/${projectID}/photo`)}
						className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}>
						<img src={iconBack} alt={"----"} className={"w-[18px]"}/>
					</button>
					{/* max-w-sm */}
					<span className="text-x-large mr-7 text-primary-gray">{contractInfo?.name}</span>
					{/* <SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} /> */}
					{/* <DropdownFilterButton className="mr-auto" /> */}

					{/* <ButtonCreate onClick={toggleModal} /> */}
					{/* <ButtonMore /> */}
				</div>

				{/*Tạm comment cho BE xử lý sau*/}

				<div id="scrollable" className="overflow-auto">
					<InfiniteScroll
						dataLength={listComments.length} //This is important field to render the next data
						next={nextPageListComments}
						hasMore={Boolean(hasNextPageComments)}
						loader={hasNextPageComments ? <div className="w-full pt-2 text-center">
							Loading...
						</div> : <></>}
						scrollableTarget="scrollable"
					>
						{(listComments && listComments.length) ?
							listComments.map((comment, i) => (
								<div key={comment._id} className={"photo-item p-4 border-b-0.5 border-primary-border"}>
									<div className={"flex items-start"}>
										<img src={`${process.env.REACT_APP_URL_S3_USER}/${comment.author.image}`} alt={"----"} className={"w-[40px] h-[40px] min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] rounded-full overflow-hidden"}/>
										<div className={"ml-4"}>
											<Link to={`/pcm/detail/${comment.task?._id}`}>
												{/* line-clamp-1  */}
												<div
													className={"text-base"}
													title={comment.content}
													dangerouslySetInnerHTML={{
														__html: subContentHtml(comment.content)
													}}
												>
												</div>
											</Link>
											<div className={"mt-1 text-xs"}>
												<span>{comment.author?.bizfullname}</span><span className={"text-primary-gray ml-2"}>| {moment(comment.createAt).format('hh:mm DD/MM/yy')} - {moment(comment.createAt).fromNow()}</span>
											</div>
										</div>
									</div>

									<div className={"grid grid-cols-10 gap-4 mt-4"}>
										{
											comment.images?.slice(0, 10).map((image, index) => (
												<div key={image._id} className={"p-item"}>
													<div
														onClick={() => {
															if (comment.images && comment.images?.length) {
																setDefaultState({
																	mediaID: contractID,
																	images: comment.images,
																	index,
																	author: comment.author,
																	createAt: comment.createAt
																});
																setIsShow(true);
															}
														}}
														className={"relative text-white text-xl cursor-pointer"}>
														<img src={`${process.env.REACT_APP_URL_S3}${image.path}`} alt={"----"} className={"max-h-[130px] max-w-[130px] min-h-[130px] h-[130px] w-full max-w-[130px] object-cover"}/>
														{
															index === 9 && comment.images && comment.images?.length - 10 > 0 &&
															<div className={"absolute z-2 w-full h-full bg-opacity-50 bg-primary-gray top-0 left-0 right-0 bottom-0 flex items-center justify-center"}>
																{comment.images?.length - 10}+
															</div>
														}
													</div>
													<p className={"text-primary-gray line-clamp-2 mt-2"}>{image.description}</p>
												</div>
											))
										}
									</div>
								</div>
							)) : <></>
						}
					</InfiniteScroll>
				</div>
			</div>
			<ModalZoomView prioritySingleImageAuthor={true} isShow={isShow} toggle={toggle} initialData={defaultState} />
		</>
	);
};

export default ProjectPhotoContractPage;