import React, { FC } from 'react';
import moment from 'moment';

import { Link } from 'react-router-dom';

import image from 'assets/images/media/hoi-thao-khoa-hoc-la-gi 1.png';
import iconThumb from 'assets/images/icons8-thumbs-up-96 1.png';
import iconEye from 'assets/images/icons8-eye-96 1.png';
import iconComment from 'assets/images/icon-chat-project.png';
import { MediaProps } from 'typings/social';
import { abbreviateNumber } from 'utils';

type Props = {
	media: MediaProps
} & React.HTMLAttributes<HTMLDivElement>

const SocialMainArticle: FC<Props> = ({ media, ...props }) => {
	if (!media) return null;
	return (
		<div {...props}>
			<div className="w-full 3xl:max-h-[384px]">
				<img src={(media.images && media.images.length) ? media.images[0].url : image} alt="" className="w-full h-full object-cover" />
			</div>
			<div className="inline-flex flex-col px-5 pt-4 pb-3 w-full lg:w-min box-content" style={{ minWidth: "287px", minHeight: "363px" }}>
				<h4 className="text-2xl leading-7 font-bold px-2.5">
					<Link to={`/social/post/${media._id}`}>
						{media.title}
					</Link>
				</h4>
				<div className="line-clamp flex-1">
					<p className="mt-5 px-2.5 flex-1 text-base">
						{media.content?.length > 200 ? `${media.content?.substring(0, 200)}...` : media.content}
					</p>
				</div>
				<p className="text-[13px] leading-[15px] px-2 border-b border-primary-gray border-opacity-20 text-secondary-gray pb-2.5 mt-3">
					{media.author.fullname}
					<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
					{media.author?.department?.name}
					<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
					{moment(media.createAt).fromNow()}
				</p>
				<p className="flex justify-between text-primary-gray mt-3 px-1">
					<span>
						<img src={iconThumb} alt="Like" className="inline-block mr-2" />
						{abbreviateNumber(media.totalReactions)}
					</span>
					<span>
						<img src={iconComment} alt="Comment" className="inline-block mr-2" />
						{abbreviateNumber(media.totalComments)}
					</span>
					<span>
						<img src={iconEye} alt="View" className="inline-block mr-2" />
						{abbreviateNumber(media.totalWatched)}
					</span>
				</p>
			</div>
		</div>
	)
}

export default SocialMainArticle
