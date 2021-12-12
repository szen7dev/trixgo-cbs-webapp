import React from 'react'
import { Link } from 'react-router-dom';

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
		</div>
	)
}

export default SocialSpecializedTopics;
