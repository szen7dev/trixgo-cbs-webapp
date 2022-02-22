import { FC, HTMLAttributes, useContext } from 'react';

import iconFaceSweet from 'assets/images/icons8-grinning-face-with-sweat-48.png';
import iconFacebookLike from 'assets/images/icons8-facebook-like-48.png';
import ReplyCommentField from './ReplyCommentField';
import RootCommentsList from './RootCommentsList';
import { ContextModalPost } from '../../../context/post';
// import CommentContext from '../../context/comment/comment.context';

const SideComments: FC<HTMLAttributes<HTMLDivElement> & { mediaID: string }> = ({ mediaID, ...props }) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const [reply, setReply] = useState<boolean>(false);
	// const { state } = useContext(CommentContext);
	const { state: statePost } = useContext(ContextModalPost);

	return (
		<div {...props}>
			<div className="custom-scroll flex-1 overflow-y-auto">
				{/* Header post */}
				<div className="pt-4 text-black">
					<div className="flex px-4">
						<img src="https://gamek.mediacdn.vn/133514250583805952/2021/9/17/photo-1-1631856680040545802895.jpg" alt="" className="rounded-full w-12 h-12 mr-2" />
						<div>
							<p className="text-black text-[15px] font-bold">Nguyễn Thu Hương-CPMI</p>
							<p className="leading-[15px] mt-1">15:30 15/2/2021</p>
						</div>
					</div>
					<p className="text-[15px] pl-4 pr-5 mt-2.5 leading-4">Chứng kiến công tác thí nghiệm thép tại công trường số 3, Hoàng Tôn</p>
				</div>
				{/* Reaction */}
				<div className="flex pb-2 mx-2.5 text-[15px] leading-4 mt-2 text-black">
					<div className="flex flex-grow gap-x-2.5">
						<div className="flex items-center rounded-full gap-x-2 pl-3.5 pr-2.5 py-0.5 border border-gray-300">
							<img src={iconFaceSweet} alt="" className="h-6 w-6" />
							<img src={iconFaceSweet} alt="" className="h-6 w-6" />
							<span>15</span>
						</div>
						<div className="rounded-full border border-gray-300 p-0.5">
							<img src={iconFacebookLike} alt="" className="h-6 w-6" />
						</div>
					</div>
					<div className="flex items-center text-secondary-gray mr-4">
						<span>
							2 bình luận
						</span>
					</div>
				</div>
				{/* Divide */}
				<div className="border-t border-gray-300 ml-4 mr-5 text-black"></div>

				{/* Comment */}
				<div className="react__comments-container flex-1 pt-4 text-black">
					{/* Showmore Comment */}
					<div className="react__comments-header ml-4 mr-5 text-[15px] leading-4 pb-2 mb-1.5 font-bold">
						<span>Xem 152 bình luận trước</span>
					</div>
					<RootCommentsList className="px-5" smallImage />
				</div>
			</div>
			{/* Footer */}
			<div className='flex flex-col w-full max-h-full overflow-y-auto'>
				{/* File upload */}
				<ReplyCommentField
					fileContainerClassName='border-t'
					inputContainerClassName="flex w-full p-2"
					mediaID={mediaID}
					parentID={statePost.isComment ? statePost.mediaID : undefined}
				/>
			</div>
			{/* </div> */}
		</div>
	)
}

export default SideComments;
