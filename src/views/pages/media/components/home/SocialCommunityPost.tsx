import React from 'react'

import { Link } from 'react-router-dom'

import iconComment from 'assets/images/icon-chat-project.png';

const SocialCommunityPost: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<span className="text-24px font-bold inline-block border-b border-primary pb-3 mt-3">Cộng đồng</span>
			<ul>
				<li className="border-primary-gray border-opacity-20 pt-5 pb-3.5" style={{ borderBottomWidth: '0.5px' }}>
					<div className='max-w-xs'>
						<Link to="/social/post" className="text-lg leading-5"><b>
							Thầy trò HLV Park luyện tập trong mưa
						</b></Link>
						<div className="mt-4 text-sm leading-[18px]">
							Một ngày trước khi sang Singapore dự AFF Cup, HLV Park Hang-seo cho các cầu thủ tập luyện bất chấp mưa to.
							<div className="inline-flex items-start align-middle ml-1.5">
								<img src={iconComment} alt="Comment" className="w-4 h-4 inline-block mr-2" />
								<span className="text-primary" style={{ fontSize: "10px", lineHeight: '11.5px' }}>
									21,3k
								</span>
							</div>
						</div>
					</div>
				</li>
				<li className="border-primary-gray border-opacity-20 pt-5 pb-3.5" style={{ borderBottomWidth: '0.5px' }}>
					<div className='max-w-xs'>
						<Link to="/social/post" className="text-lg leading-5"><b>
							Thầy trò HLV Park luyện tập trong mưa
						</b></Link>
						<div className="mt-4 text-sm leading-[18px]">
							Một ngày trước khi sang Singapore dự AFF Cup, HLV Park Hang-seo cho các cầu thủ tập luyện bất chấp mưa to.
							<div className="inline-flex items-start align-middle ml-1.5">
								<img src={iconComment} alt="Comment" className="w-4 h-4 inline-block mr-2" />
								<span className="text-primary" style={{ fontSize: "10px", lineHeight: '11.5px' }}>
									21,3k
								</span>
							</div>
						</div>
					</div>
				</li>
				<li className="border-primary-gray border-opacity-20 pt-5 pb-3.5" style={{ borderBottomWidth: '0.5px' }}>
					<div className='max-w-xs'>
						<Link to="/social/post" className="text-lg leading-5"><b>
							Thầy trò HLV Park luyện tập trong mưa
						</b></Link>
						<div className="mt-4 text-sm leading-[18px]">
							Một ngày trước khi sang Singapore dự AFF Cup, HLV Park Hang-seo cho các cầu thủ tập luyện bất chấp mưa to.
							<div className="inline-flex items-start align-middle ml-1.5">
								<img src={iconComment} alt="Comment" className="w-4 h-4 inline-block mr-2" />
								<span className="text-primary" style={{ fontSize: "10px", lineHeight: '11.5px' }}>
									21,3k
								</span>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	)
}

export default SocialCommunityPost
