import React from 'react'

import { Link } from 'react-router-dom'

import iconComment from 'assets/images/icon-chat-project.png';
import { useSocial } from "services/hooks/useSocial";
import { MediaProps } from 'typings/social';
import { abbreviateNumber } from 'utils';

const SocialCommunityPost: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	const { listMedias } = useSocial('list_medias_community', { type: 'community' });

	return (
		<div {...props}>
			<span className="text-24px font-bold inline-block border-b border-primary pb-3 mt-3">Dự án phòng ban</span>
			<ul>
				{listMedias.length ? listMedias.map((media: MediaProps) => (
					<li key={media._id} className="border-primary-gray border-opacity-20 pt-5 pb-3.5" style={{ borderBottomWidth: '0.5px' }}>
						<div className='max-w-xs'>
							<Link to="/social/post" className="text-lg leading-5"><b>
								{media.title}
							</b></Link>
							<div className="mt-4 text-sm leading-[18px]">
								{media?.content?.length > 200 ? `${media?.content?.substring(0, 200)}...` : media.content}
								<div className="inline-flex items-center align-middle text-x-small ml-1.5">
									<img src={iconComment} alt="Comment" className="w-4 h-4 inline-block mr-2" />
									<span className="text-primary">
									{abbreviateNumber(media.totalComments)}
									</span>
								</div>
							</div>
						</div>
					</li>
				)) : ''}
			</ul>
		</div>
	)
}

export default SocialCommunityPost
