/**
 * ? Import orders:
 * ? 1. react importation
 * ? 2. third party libraries importation
 * ? 3. libs, services, data, api importation
 * ? 4. components, assets importation
 * ? 5. helpers, util importation
 * ? 6. typings importation
 */
import { FC } from "react";

import { Link } from "react-router-dom";

import avatar from 'assets/images/avatar.jpg';
import imageContent from 'assets/images/media/image 189.png';
import iconThumb from 'assets/images/icons8-thumbs-up-96 1.png';
import iconEye from 'assets/images/icons8-eye-96 1.png';
import iconComment from 'assets/images/icon-chat-project.png';
import './style.css';

const SocialPostPage: FC = () => {
	return (
		<>
			<div className="page__post text-sm custom-scroll">
				<div className="page__post-container">
					{/* Header */}
					<div className="page__post-header">
						<h1 className="page__post-title">Hơn 110.000 người đi tàu Cát Linh - Hà Đông sau một tuần có phí, liệu có hiệu quả?</h1>
						<div className="flex justify-between items-center mt-4">
							<div className="post__author">
								<div className="post__author-avt">
									<Link to="/">
										<img src={avatar} alt="" className="object-cover" />
									</Link>
								</div>
								<div className="post__author-info">
									<p className="text-lg leading-5 font-bold">
										<Link to="/">
											Lê Văn Thành
										</Link>
									</p>
									<p className="text-primary-gray text-base leading-[18px] mt-1.5">
										<Link to="/">
											Kiến trúc sư giải pháp, Google
										</Link>
										<span className="mx-2">•</span>
										<Link to="/">
											Phòng kế toán
										</Link>
									</p>
								</div>
							</div>
							<div>
								<span className="mr-6">29/11/2021 15:37</span>
								<button className="post__follow text-primary-gray">Theo dõi</button>
							</div>
						</div>
					</div>
					{/* Content */}
					<div className="flex pr-6">
						<div className="post__content  border-b border-gray-300 pb-2.5">
							<div className="post__content-images">
								<div>
									<img src={imageContent} alt="" />
								</div>
								<div>
									<img src={imageContent} alt="" />
								</div><div>
									<img src={imageContent} alt="" />
								</div>
							</div>
							<p>
								Buổi sáng tháng 10 sáu năm trước, người phụ trách kinh doanh thị trường phía Nam vừa bay từ Sài Gòn ra, bước vào phòng họp và chia sẻ tin đồn hãng Dell sẽ mua lại công ty chúng tôi.
							</p>
							<p>
								Đó là cuộc họp đầu tuần tại trụ sở văn phòng đại diện EMC Việt Nam, tầng 14, toà nhà IPH, đường Xuân Thuỷ, Hà Nội. Tôi lúc đó đang là trưởng nhóm tư vấn công nghệ tại Việt Nam của công ty hàng đầu thế giới về hệ thống lưu trữ này.
							</p>
							<p>
								Vị sếp lớn trấn an rằng tin đồn này có từ lâu, &quot;việc đó gần như không thể xảy ra&quot;, anh nói, &quot;cá bé không thể nuốt cá lớn được&quot;.
							</p>
							<p>
								Gọi là cá bé vì khi đó Dell là công ty tư nhân, giá trị ước tính khoảng 24 tỷ USD. Trong khi đó, EMC có vốn hoá thị trường ước tính 35 tỷ USD, chưa kể EMC còn sở hữu khoảng 80% cổ phần của Vmware, một tên tuổi về ảo hoá hạ tầng công nghệ thông tin thị giá tương đương 23 tỷ USD nữa.
							</p>
							<div className="flex justify-between text-primary-gray mt-7 text-[13px] leading-[15px]">
								<span>
									<img src={iconThumb} alt="Like" className="inline-block mr-2" />
									28,7k
								</span>
								<span>
									<img src={iconComment} alt="Comment" className="inline-block mr-2" />
									21,3k
								</span>
								<span>
									<img src={iconEye} alt="View" className="inline-block mr-2" />
									11,2k
								</span>
							</div>
						</div>
						<div className="post__suggest">
							<p>Liên quan</p>
							<div>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
								<Link to="/"><div>21,3k</div></Link>
								<Link to="/">Đề xuất thanh toán hồ sơ chỉ gồm 01 bước duy nhất</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SocialPostPage;
