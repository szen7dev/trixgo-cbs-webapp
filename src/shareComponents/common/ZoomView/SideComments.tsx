import { FC, HTMLAttributes } from 'react';
import { toast } from "react-toastify";
import moment from 'moment';

// import iconFaceSweet from 'assets/images/icons8-grinning-face-with-sweat-48.png';
// import iconFacebookLike from 'assets/images/icons8-facebook-like-48.png';
import { usePost } from '.';

import ReplyCommentField, { SubmitComment } from './components/ReplyCommentField';
import RootCommentsList from './components/RootCommentsList';

type Props = {
	type?: string
} & HTMLAttributes<HTMLDivElement>

const SideComments: FC<Props> = ({ ...props }) => {
	const { state, createComment, data, currentComment, fetchPreviousPage } = usePost();

	// Submit chat hiện đang hoạt động tại root comment (không truyền parentID)
	const handleSubmitChat = async (props: SubmitComment) => {
		toast.info('Tính năng đang phát triển');
		// const dataInsertOrUpdate = {
		// 	mediaID: state.mediaID,
		// 	content: props.text,
		// 	files: props.files,
		// 	images: props.images,
		// 	fileID: String(state.images[state.index]._id),
		// }
		// console.log({ dataInsertOrUpdate })

		// await createComment(dataInsertOrUpdate);
	}

	return (
		<>
			<div {...props}>
				<div className="custom-scroll flex-1 overflow-y-auto">
					{/* Header post */}
					<div className="pt-4 text-black">
						<div className="flex px-4">
							<img src={`${process.env.REACT_APP_URL_S3_USER}/${state.author?.image || state.images[state.index]?.author?.image}`} alt="" className="rounded-full w-12 h-12 mr-2" />
							<div>
								<p className="text-black text-[15px] font-bold">{state?.author?.bizfullname || state.images[state.index]?.author?.bizfullname}</p>
								<p className="leading-[15px] mt-1">{moment(state.createAt).format('HH:mm DD/M/yyyy')}</p>
							</div>
						</div>
						<p className="text-[15px] pl-4 pr-5 mt-2.5 leading-4"></p>
					</div>
					{/* Reaction */}
					<div className="flex pb-2 mx-2.5 text-[15px] leading-4 mt-2 text-black">
						{/* <div className="flex flex-grow gap-x-2.5">
							<div className="flex items-center rounded-full gap-x-2 pl-3.5 pr-2.5 py-0.5 border border-gray-300">
								<img src={iconFaceSweet} alt="" className="h-6 w-6" />
								<img src={iconFaceSweet} alt="" className="h-6 w-6" />
								<span>15</span>
							</div>
							<div className="rounded-full border border-gray-300 p-0.5">
								<img src={iconFacebookLike} alt="" className="h-6 w-6" />
							</div>
						</div> */}
						<div className="flex items-center text-secondary-gray mr-4">
							<span>
								{/* {data.data?.pages && data.currentComment && data.data.pages[0].data.totalRecord || 0} bình luận */}
							</span>
						</div>
					</div>
					{/* Divide */}
					<div className="border-t border-gray-300 ml-4 mr-5 text-black"></div>

					{/* Comment */}
					<div className="react__comments-container flex-1 pt-4 text-black">
						{data?.pages && currentComment && data.pages[0].data.totalRecord > currentComment
							? <button className="react__comments-header ml-4 mr-5 text-[15px] leading-4 pb-2 mb-1.5 font-bold" onClick={() => fetchPreviousPage()}>
								<span>Xem {data.pages[0].data.totalRecord - currentComment} bình luận trước</span>
							</button> : null}
						<RootCommentsList
							className="px-5"
							smallImage
						/>
					</div>
				</div>
				{/* Footer */}
				<div className='flex flex-col w-full max-h-full overflow-y-auto'>
					{/* File upload */}
					<ReplyCommentField
						fileContainerClassName='border-t'
						inputContainerClassName="flex w-full p-2"
						onSubmitChat={handleSubmitChat}
					/>
				</div>
			</div>
		</>
	)
}

export default SideComments;
