import React from 'react'
import moment from 'moment';
import { useAuth } from "services/hooks/useAuth";
import { useSocial } from "services/hooks/useSocial";
import { Link } from 'react-router-dom';

import image from 'assets/images/media/image 177.png';
import { MediaProps } from 'typings/social';

const SocialInternalArticles: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	const { user } = useAuth();
	const { listMedias } = useSocial('list_medias_internal_company', { type: 'company', companyID: user?.company._id });

	return (
		<div {...props}>
			<span className="text-24px font-bold inline-block border-b border-primary pb-3 mt-3">Nội bộ công ty</span>
			<ul>
				{listMedias.length ? listMedias.map((media: MediaProps) => media && (
					<li className="border-primary-gray border-opacity-20 pt-3.5 pb-3.5 mr-7" style={{ borderBottomWidth: '0.5px' }} key={media._id}>
						<p className="font-bold text-lg leading-5">
							<Link to={`/social/post/${media._id}`}>
								{media.title}
							</Link>
						</p>
						<div className="flex mt-3">
							<Link to={`/social/post/${media._id}`} className="inline-block mr-7 flex-shrink-0 max-h-[110px]" style={{ width: "180px" }}>
								<img src={(media.images && media.images.length) ? media.images[0].url : image} alt="vaccine" />
							</Link>
							<div className="flex flex-col">
								<p className="text-sm leading-4">
									{media?.content?.length > 200 ? `${media?.content?.substring(0, 200)}...` : media.content}
								</p>
								<p className="mt-auto text-[13px] leading-[15px] text-secondary-gray mb-1.5">
									<Link to="/">
										{media.author.fullname}
									</Link>
									<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
									<Link to="/">
										{media.author?.department?.name}
									</Link>
									<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
									{moment(media.createAt).fromNow()}
								</p>
							</div>
						</div>
					</li>
				)) : ''}
			</ul>
		</div>
	)
}

export default SocialInternalArticles;
