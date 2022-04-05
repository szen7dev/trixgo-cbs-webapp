import { FC, memo, MouseEventHandler, useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";

// import { SearchInput } from "shareComponents/common";
import { ModalZoomView } from "shareComponents/common/ZoomView";
import { FileProps, ImageProps } from "typings/common";
import { useCommentPcm } from 'services/hooks/useTask';
import { useContract } from 'services/hooks/items/useContract';
import moment from "moment";
import { User } from "typings/user";

type CardItemProps = {
	image: FileProps,
	total: number,
	onClick: MouseEventHandler<HTMLDivElement>
}

const CardItem = memo(({ image, total, onClick }: CardItemProps) => {
	const imgUrl = image.path ? `${process.env.REACT_APP_URL_S3}${image.path}` : ``;
	return (
		<div className="w-32 cursor-pointer" onClick={onClick}>
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
		totalRecord
	} = useCommentPcm({
		params: {
			contractID,
			select: "_id content author images createAt",
			populates: JSON.stringify({
				path: "images author",
				select: "_id nameOrg path bizfullname image"
			})
		},
		isFetchComment: !!contractID
	});

	useEffect(() => {
		document.title = "CHG.THT-Hình ảnh"
	}, []);

	// const mediaID = '620b09c36a97815180b079b5';
	// const handleOpenPost = (i = 0) => {
	// 	setDefaultState({
	// 		mediaID,
	// 		images: [],
	// 		index: i,
	// 		author: undefined,
	// 		createAt: ""
	// 	});
	// 	setIsShow(true)
	// }
	const toggle = () => setIsShow(!isShow)

	if(!contractInfo) return <>Nothing...</>;

	return (
		<>
			<div className="flex flex-col h-full overflow-hidden">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-3">
					<button onClick={history.goBack}>
						<img src="/images/common/button_back.png" alt="Button Back" />
					</button>
					<span className="max-w-sm text-x-large mr-7">{contractInfo?.name}</span>
					{/* <SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} /> */}
					{/* <DropdownFilterButton className="mr-auto" /> */}

					{/* <ButtonCreate onClick={toggleModal} /> */}
					{/* <ButtonMore /> */}
				</div>
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
								<div key={comment._id} className="px-5 py-4 border-b border-cbs-border">
									{/* Card header */}
									<div className="flex cursor-pointer">
										<img src={`${process.env.REACT_APP_URL_S3_USER}/${comment.author.image}`} alt="" className="w-10 h-10 mr-3.5 object-cover rounded-full" />
										<div>
											<strong className="truncate text-base">
												{comment.content}
											</strong>
											<p>{comment.author?.bizfullname} |
												<span className="text-cbs-subtext mr-1 ml-1">
													{moment(comment.createAt).format('hh:mm DD/MM/yy')}
												</span>
												-
												<span className="text-cbs-subtext ml-1">
													{moment(comment.createAt).fromNow()}
												</span>
											</p>
										</div>
									</div>

									{/* List images */}
									<div className="flex flex-wrap gap-x-3 mt-5">
										{
											comment.images?.map((image, index) =>
												<CardItem
													key={image._id}
													image={image}
													total={comment.images?.length || 0}
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
												/>)
										}
									</div>
								</div>
							)) : <></>
						}
					</InfiniteScroll>
				</div>
			</div>
			<ModalZoomView isShow={isShow} toggle={toggle} initialData={defaultState} />
		</>
	);
};

export default ProjectPhotoContractPage;