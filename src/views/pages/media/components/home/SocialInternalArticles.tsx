import React from 'react'
import { Link } from 'react-router-dom';

import image from 'assets/images/media/image 177.png';

const SocialInternalArticles: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<span className="text-24px font-bold inline-block border-b border-primary pb-3 mt-3">Nội bộ công ty</span>
			<ul>
				<li className="border-primary-gray border-opacity-20 pt-3.5 pb-3.5 mr-7" style={{ borderBottomWidth: '0.5px' }}>
					<p className="font-bold text-lg leading-5">
						<Link to="/social/post">
							Tăng hạn sử dụng gần 3 triệu liều vaccine Pfizer lên 9 tháng
						</Link>
					</p>
					<div className="flex mt-3">
						<Link to="/social/post" className="inline-block mr-7" style={{ minWidth: "180px" }}>
							<img src={image} alt="vaccine" />
						</Link>
						<div className="flex flex-col">
							<p className="text-sm leading-4">Trong 13.972 ca nhiễm Bộ Y tế công bố tối 30/11 có 13.966 ca tại 62 tỉnh thành, tăng 208 ca so với hôm qua, và cao nhất kể từ khi &quot;bình thường mới&quot;; 14.624 người khỏi bệnh; 197 ca tử vong.</p>
							<p className="mt-auto text-[13px] leading-[15px] text-secondary-gray mb-1.5">
								<Link to="/">
									Nguyễn Văn Tuấn-CBS
								</Link>
								<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
								<Link to="/">
									Phòng kế toán
								</Link>
								<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
								6h
							</p>
						</div>
					</div>
				</li>
				<li className="border-primary-gray border-opacity-20 pt-3.5 pb-3.5 mr-7" style={{ borderBottomWidth: '0.5px' }}>
					<p className="font-bold text-lg leading-5">
						<Link to="/social/post">
							Tăng hạn sử dụng gần 3 triệu liều vaccine Pfizer lên 9 tháng
						</Link>
					</p>
					<div className="flex mt-3">
						<Link to="/social/post" className="inline-block mr-7" style={{ minWidth: "180px" }}>
							<img src={image} alt="vaccine" />
						</Link>
						<div className="flex flex-col">
							<p className="text-sm leading-4">Trong 13.972 ca nhiễm Bộ Y tế công bố tối 30/11 có 13.966 ca tại 62 tỉnh thành, tăng 208 ca so với hôm qua, và cao nhất kể từ khi &quot;bình thường mới&quot;; 14.624 người khỏi bệnh; 197 ca tử vong.</p>
							<p className="mt-auto text-[13px] leading-[15px] text-secondary-gray mb-1.5">
								<Link to="/">
									Nguyễn Văn Tuấn-CBS
								</Link>
								<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
								<Link to="/">
									Phòng kế toán
								</Link>
								<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
								6h
							</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	)
}

export default SocialInternalArticles;
