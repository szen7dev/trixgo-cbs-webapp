import React from 'react'
import { Link } from 'react-router-dom';

import iconComment from 'assets/images/icon-chat-project.png';

const SocialSpecializedTopics: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<span className="text-24px font-bold inline-block border-b border-black text-primary pb-3 mt-3">Chủ đề chuyên ngành</span>
			<ul>
				<li className="mt-4 5 mb-1">
					<Link to="/">Quản lý dự án</Link>
				</li>
				<li className="mt-4 5 mb-1">
					<Link to="/">Quản lý thanh toán</Link>
				</li>
				<li className="mt-4 5 mb-1">
					<Link to="/">Hồ sơ thanh quyết toán</Link>
				</li>
				<li className="mt-4 5 mb-1">
					<Link to="/">Quản lý dự án</Link>
				</li>
				<li className="mt-4 5 mb-1">
					<Link to="/">Quản lý thanh toán</Link>
				</li>
				<li className="mt-4 5 mb-1">
					<Link to="/">Hồ sơ thanh quyết toán</Link>
				</li>
			</ul>
			<span className="text-24px font-bold inline-block border-b border-black text-primary pb-3 mt-3">Hệ thống</span>
			<ul>
				<li className="mt-4 5 mb-1">
					<Link to="/">
						Thông báo nâng cấp lần 1
						<div className="inline-flex items-center align-middle text-x-small ml-1.5">
							<img src={iconComment} alt="Comment" className="w-4 h-4 inline-block mr-2" />
							<span className="text-primary">
								21,3k
							</span>
						</div>
					</Link>
				</li>
				<li className="mt-4 5 mb-1">
					<Link to="/">
						Thông báo nâng cấp lần 2
						<div className="inline-flex items-center align-middle text-x-small ml-1.5">
							<img src={iconComment} alt="Comment" className="w-4 h-4 inline-block mr-2" />
							<span className="text-primary">
								21,3k
							</span>
						</div>
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default SocialSpecializedTopics;
