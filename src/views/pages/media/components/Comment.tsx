import { FC, HTMLAttributes } from 'react'

import cn from "classnames";

import iconFaceSweet from 'assets/images/icons8-grinning-face-with-sweat-48.png';

interface Props {
	onClickLike?: () => unknown;
	onClickReply?: () => unknown;
	renderOptions?: React.ComponentType<HTMLAttributes<HTMLElement>>;
	renderEndComment?: React.ComponentType;
	comment: {
		id?: string | number,
		name?: string,
		image?: string
	}
}

const Comment: FC<Props & HTMLAttributes<HTMLDivElement>> = ({ comment, onClickReply, renderEndComment: EndComment, renderOptions: Options, ...props }) => {
	return (
		<div {...props} className={cn("flex pb-1.5", props.className)}>
			{/* Avatar */}
			<div className="rounded-full overflow-hidden self-start mr-2 min-w-min">
				<div className="h-9 w-9">
					<img src={comment.image} alt="" className='h-9 w-9' />
				</div>
			</div>
			{/* Info and reply */}
			<div className='group w-full'>
				<div className="flex items-center">
					<div className='bg-gray-100 rounded-xl p-2 hover:bg-primary hover:bg-opacity-10 '>
						<p className="font-bold text-medium">{comment.name}</p>
						<p className="mt-0.5 text-[15px] leading-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
					</div>
					{Options && <Options className="opacity-0 group-hover:opacity-100" />}
				</div>
				<div>

				</div>
				{EndComment
					? <EndComment />
					:
					<div className="flex justify-between mt-1">
						<ul className="inline-block">
							<li className="inline-block mr-2"><a href="/">10/6/20, 17:35</a></li>
							<li className="inline-block mr-2"><button className="font-bold">Thích</button></li>
							<li className="inline-block"><button className="font-bold" onClick={onClickReply}>Phản hồi</button></li>
						</ul>
						<div>
							<span className='align-middle text-secondary-gray mr-0.5'>215</span>
							<span className='relative z-10 -mr-3'><img src={iconFaceSweet} alt="" className='inline' /></span>
							<span><img src={iconFaceSweet} alt="" className='inline' /></span>
						</div>
					</div>
				}
			</div>
		</div>
	)
}

export default Comment
