import React, { ElementType } from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';

import image from 'assets/images/media/image 177.png';
import { MediaProps } from 'typings/media';

type Props = {
	headerComponent?: ElementType,
	listMedias: Array<MediaProps>
} & React.HtmlHTMLAttributes<HTMLDivElement>

export const SocialArticles: React.FC<Props> = ({ headerComponent: Header, listMedias, ...props }) => {
	return (
		<div {...props}>
			{Header && <Header />}
			<ul>
				{listMedias.length ? listMedias.map((media: MediaProps) => (
					<li key={media._id} className="border-primary-gray border-opacity-20 pt-3.5 pb-3.5 mr-7" style={{ borderBottomWidth: '0.5px' }}>
						<p className="font-bold text-lg leading-5">
							<Link to={`/media/post/${media._id}`}>
								{media.title}
							</Link>
						</p>
						<div className="flex mt-3">
							<Link to={`/media/post/${media._id}`} className="inline-block mr-7 flex-shrink-0 max-h-[110px]" style={{ width: "180px" }}>
								<img src={(media.images && media.images.length) ? `${process.env.REACT_APP_URL_S3}${media.images[0].path}` : image} alt="vaccine" className='h-full w-full object-cover' />
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