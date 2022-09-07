import React, { FC, memo, MouseEventHandler, useEffect, useState } from "react";
import { useParams, useHistory, Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";

// import { SearchInput } from "shareComponents/common";
import { ModalZoomView } from "shareComponents/common/ZoomView";
import { FileProps, ImageProps } from "typings/common";
import { useCommentPcm } from 'services/hooks/useTask';
import { useContract } from 'services/hooks/items/useContract';
import moment from "moment";
import { User } from "typings/user";
import iconBack from "assets/images/icon-back-gray.svg";
import userAvatar from "assets/images/task-user.svg";
import sampleImage from "assets/images/sample-image.png";

type CardItemProps = {
	image: FileProps,
	total: number,
	onClick: MouseEventHandler<HTMLDivElement>
}

const CardItem = memo(({ image, total, onClick }: CardItemProps) => {
	const imgUrl = image.path ? `${process.env.REACT_APP_URL_S3}${image.path}` : ``;
	return (
		<div className="w-32 cursor-pointer mb-3" onClick={onClick}>
			<div className="relative w-32 h-32">
				<img src={imgUrl} alt="test" width={130} height={130} className="w-full h-full object-cover" />
				{/* {<div className="absolute inset-0 flex flex-1 items-center justify-center text-white text-2x-large bg-white bg-opacity-60">
					+1
				</div>} */}
			</div>
			<p className="line-clamp-2" title={image.description}>{image.description}</p>
		</div>
	)
})

CardItem.displayName = "CardItem";

const ProjectPhotoContractPage: FC = () => {
	const history = useHistory();
	const { contractID } = useParams<{ contractID: string }>();
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

	useEffect(() => {
		document.title = "CHG.THT-Hình ảnh"
	}, []);

	const toggle = () => setIsShow(!isShow)

	if(!contractInfo) return <>Nothing...</>;

	return (
		<>
			<div className="flex flex-col h-full overflow-hidden">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-2">
					<button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}>
						<img src={iconBack} alt={"----"} className={"w-[18px]"}/>
					</button>
					{/* max-w-sm */}
					<span className="text-x-large mr-7 text-primary-gray">{contractInfo?.name}</span>
					{/* <SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} /> */}
					{/* <DropdownFilterButton className="mr-auto" /> */}

					{/* <ButtonCreate onClick={toggleModal} /> */}
					{/* <ButtonMore /> */}
				</div>

				{/*Fake UI*/}
					<div className={"photo-item p-4 border-b-0.5 border-primary-border"}>
						<div className={"flex items-center"}>
							<img src={userAvatar} alt={"----"} className={"w-[40px] h-[40px] min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] rounded-full overflow-hidden"}/>
							<div className={"ml-4"}>
								<p>Nguyễn Phan Thanh Hương-CPMI</p>
								<div className={"mt-1 text-xs"}>
									<span>Vũ Đình Khiên-CPMI</span><span className={"text-primary-gray ml-2"}>| 13:37 6/7/21 - 18 giờ trước</span>
								</div>
							</div>
						</div>

						<div className={"grid grid-cols-10 gap-4 mt-4"}>
							{
								[...Array(10)].map((e, i) => (
									<div key={i} className={"p-item"}>
										<div className={"relative text-white text-xl"}>
											<img src={sampleImage} alt={"----"} className={"max-h-[130px] max-w-[130px] min-h-[130px] h-[130px] w-full max-w-[130px] object-cover"}/>
											{
												i===9&&
												<div className={"absolute z-2 w-full h-full bg-opacity-50 bg-primary-gray top-0 left-0 right-0 bottom-0 flex items-center justify-center"}>
													20+
												</div>
											}
										</div>
										<p className={"text-primary-gray line-clamp-2 mt-2"}>Kiểm tra trạm trộn bê tông an phát tại...</p>
									</div>
								))
							}
						</div>
					</div>
				{/*End Fake UI*/}

				{/*Tạm comment cho BE xử lý sau*/}

				{/*<div id="scrollable" className="overflow-auto">*/}
				{/*	<InfiniteScroll*/}
				{/*		dataLength={listComments.length} //This is important field to render the next data*/}
				{/*		next={nextPageListComments}*/}
				{/*		hasMore={Boolean(hasNextPageComments)}*/}
				{/*		loader={hasNextPageComments ? <div className="w-full pt-2 text-center">*/}
				{/*			Loading...*/}
				{/*		</div> : <></>}*/}
				{/*		scrollableTarget="scrollable"*/}
				{/*	>*/}
				{/*		{(listComments && listComments.length) ?*/}
				{/*			listComments.map((comment, i) => (*/}
				{/*				<div key={comment._id} className="px-5 py-4 border-b border-cbs-border">*/}
				{/*					/!* Card header *!/*/}
				{/*					<div className="flex cursor-pointer">*/}
				{/*						<img src={`${process.env.REACT_APP_URL_S3_USER}/${comment.author.image}`} alt="" className="w-10 h-10 mr-3.5 object-cover rounded-full" />*/}
				{/*						<div>*/}
				{/*							<Link to={`/pcm/detail/${comment.task?._id}`}>*/}
				{/*								/!* line-clamp-1  *!/*/}
				{/*								<strong*/}
				{/*									className="text-base"*/}
				{/*									title={comment.content}*/}
				{/*									dangerouslySetInnerHTML={{*/}
				{/*										__html: comment.content*/}
				{/*									}}*/}
				{/*								>*/}
				{/*									/!* {comment.content} *!/*/}
				{/*								</strong>*/}
				{/*							</Link>*/}
				{/*							<p>{comment.author?.bizfullname} |*/}
				{/*								<span className="text-cbs-subtext mr-1 ml-1">*/}
				{/*									{moment(comment.createAt).format('hh:mm DD/MM/yy')}*/}
				{/*								</span>*/}
				{/*								-*/}
				{/*								<span className="text-cbs-subtext ml-1">*/}
				{/*									{moment(comment.createAt).fromNow()}*/}
				{/*								</span>*/}
				{/*							</p>*/}
				{/*						</div>*/}
				{/*					</div>*/}

				{/*					/!* List images *!/*/}
				{/*					<div className="flex flex-wrap gap-x-3 mt-5">*/}
				{/*						{*/}
				{/*							comment.images?.map((image, index) =>*/}
				{/*								<CardItem*/}
				{/*									key={image._id}*/}
				{/*									image={image}*/}
				{/*									total={comment.images?.length || 0}*/}
				{/*									onClick={() => {*/}
				{/*										if (comment.images && comment.images?.length) {*/}
				{/*											setDefaultState({*/}
				{/*												mediaID: contractID,*/}
				{/*												images: comment.images,*/}
				{/*												index,*/}
				{/*												author: comment.author,*/}
				{/*												createAt: comment.createAt*/}
				{/*											});*/}
				{/*											setIsShow(true);*/}
				{/*										}*/}
				{/*									}}*/}
				{/*								/>)*/}
				{/*						}*/}
				{/*					</div>*/}
				{/*				</div>*/}
				{/*			)) : <></>*/}
				{/*		}*/}
				{/*	</InfiniteScroll>*/}
				{/*</div>*/}
			</div>
			<ModalZoomView isShow={isShow} toggle={toggle} initialData={defaultState} />
		</>
	);
};

export default ProjectPhotoContractPage;