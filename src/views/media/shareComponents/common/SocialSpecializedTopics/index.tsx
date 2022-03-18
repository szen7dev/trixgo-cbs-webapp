import React from 'react';
import { Link } from 'react-router-dom';

import iconComment from 'assets/images/icon-chat-project.png';
import { MediaProps } from 'typings/media';
import { abbreviateNumber } from 'utils/converter';

type Props = {
	listMediasDigital: Array<MediaProps>,
	listMediasSystem: Array<MediaProps>,
	isLoadingDigital: boolean,
	isLoadingSystem: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const SocialSpecializedTopics: React.FC<Props> = ({ 
	listMediasDigital, listMediasSystem, isLoadingDigital, isLoadingSystem, ...props
}) => {
	return (
		<div {...props}>
			<span className="text-24px font-bold inline-block border-b border-black text-primary pb-3 mt-3">Chuyển đổi số</span>
			<ul>
				{!isLoadingDigital ? listMediasDigital.map((media: MediaProps) => (
					<li className="mt-4 5 mb-1" key={media._id}>
						<Link to={`/media/post/${media._id}`}>
							{media.title}
						</Link>
					</li>
				)) : ''}
			</ul>
			<span className="text-24px font-bold inline-block border-b border-black text-primary pb-3 mt-3">Hệ thống</span>
			<ul>
				{!isLoadingSystem ? listMediasSystem.map((media: MediaProps) => (
					<li className="mt-4 5 mb-1" key={media._id}>
						<Link to={`/media/post/${media._id}`}>
							{media.title}
							<div className="inline-flex items-center align-middle text-x-small ml-1.5">
								<img src={iconComment} alt="Comment" className="w-4 h-4 inline-block mr-2" />
								<span className="text-primary">
									{abbreviateNumber(media.amountComment)}
								</span>
							</div>
						</Link>
					</li>
				)) : ''}
			</ul>
		</div>
	)
}