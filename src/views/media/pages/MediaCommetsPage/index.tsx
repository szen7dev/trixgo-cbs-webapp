import { FC, useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link, useHistory, useParams } from "react-router-dom";

import { Loader, ModalContainer, ModalZoomView } from "shareComponents/common";

import { ReplyCommentField, RootCommentsList } from "views/media/shareComponents/common";
import { useCommentMedia } from 'services/hooks/useMedia';
import { ContextModalPost } from "views/media/contexts/post";
import { useAuth } from 'services/hooks/auth/useAuth';

import 'views/media/styles/index.css';

import MediaRepository from "apis/media";

export const MediaCommentsPage: FC = () => {
	const history = useHistory();
	const { state, toggleModal } = useContext(ContextModalPost);
	const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
	const { mediaID } = useParams<{ mediaID: string }>();
	const { user } = useAuth();

	const { data } = useQuery(`media_info.${mediaID}`,
		() => MediaRepository.mediaInfo(mediaID),
		{
			enabled: true,
			refetchOnWindowFocus: false
		});

	const media = data?.data;

	const { listComments, totalRecord, limit, isLoadingListComments } =
		useCommentMedia({
			key: `list_comments.${mediaID}`,
			params: { mediaID },
			isFetchComment: true
		});

	const toggleDeleteModal = () => setIsShowDeleteModal(!isShowDeleteModal);

	if (isLoadingListComments) {
		return <Loader className="border-primary" />
	}

	return (
		<>
			<div className="flex flex-col text-sm text-black overflow-hidden h-full">
				{/* Header */}
				<div className="comment__header px-4 flex justify-between w-full">
					<div className="py-1">
						<button type="button" className="p-2 rounded-3xl" onClick={history.goBack}>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
							</svg>
						</button>
					</div>
					<div className="comment__header-main mx-auto flex-grow flex items-center justify-between py-1">
						<div>Bình luận tại bài viết của <b>{media?.author?.bizfullname}</b></div>
						<Link className="py-2 px-5 bg-secondary-light rounded-md" onClick={toggleDeleteModal} to={`/media/post/${mediaID}`}>
							Xem bài viết
						</Link>
					</div>
					<div className="py-1">
						<button type="button" className="bg-primary-gray bg-opacity-20 p-2 rounded-3xl">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
							</svg>
						</button>
					</div>
				</div>
				{/* Content */}
				<div className="comment__wrapper custom-scroll overflow-y-auto flex-1 z-0 text-black">
					<div className="comment__container text-black pt-4">
						<RootCommentsList
							className="px-5"
							userID={user?._id}
							comments={listComments}
							totalRecord={totalRecord}
							limit={limit}
							mediaID={mediaID}
						/>
						<div className='flex flex-col w-full max-h-full overflow-y-auto'>
							<ReplyCommentField
								attachFile
								inputContainerClassName="flex w-full p-2"
								fileContainerClassName="border-t"
								mediaID={mediaID} />
						</div>
						{/* <div className="react__comments-header px-3.5 text-[15px] leading-4 pb-2 mb-1.5 font-bold">
							<span>Xem 152 bình luận trước</span>
						</div>
						<RootCommentsList className="px-3.5" />
						<div className="react__comments-header px-3.5 text-[15px] leading-4 pb-2 mb-1.5 font-bold">
							<span>Xem 26 bình luận sau</span>
						</div>
						<div className='flex flex-col sticky bottom-0 bg-white w-full max-h-full overflow-y-auto'>
							<ReplyCommentField attachFile inputContainerClassName="flex w-full p-2" fileContainerClassName="border-t" mediaID="" />
						</div> */}
					</div>
				</div>
			</div>
			<ModalContainer isModalOpen={isShowDeleteModal} toggle={() => ''}>
				<div className="inline-flex flex-col text-black w-full max-w-lg my-8 overflow-hidden text-left transition-all transform bg-white">
					<div className="p-5 mb-4 text-xl leading-6 font-bold">
						Bạn có muốn xóa không?
					</div>
					<div className="text-right pt-6 pb-5 px-8 text-base leading-5 border-t border-gray-100">
						<button className="py-1.5 px-5 mr-2 uppercase" onClick={toggleDeleteModal}>Hủy</button>
						<button className="py-1.5 px-3 border border-primary bg-primary hover:bg-opacity-90 text-white rounded-md" onClick={toggleDeleteModal}>Xác nhận</button>
					</div>
				</div>
			</ModalContainer>
			<ModalZoomView isShow={state.isShow} toggle={toggleModal} initialData={{
				createAt: state.createAt,
				images: state.images,
				index: state.index,
				mediaID: state.mediaID,
				author: state.author
			}} />
		</>
	);
};