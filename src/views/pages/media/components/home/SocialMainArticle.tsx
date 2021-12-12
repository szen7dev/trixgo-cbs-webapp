import React, { FC } from 'react'

import { Link } from 'react-router-dom'

import image from 'assets/images/media/hoi-thao-khoa-hoc-la-gi 1.png';
import iconThumb from 'assets/images/icons8-thumbs-up-96 1.png';
import iconEye from 'assets/images/icons8-eye-96 1.png';
import iconComment from 'assets/images/icon-chat-project.png';

const SocialMainArticle: FC<React.HTMLAttributes<HTMLDivElement>> = ({...props}) => {
	return (
		<div {...props}>
			<div className="w-full">
				<img src={image} alt="" className="w-full h-full object-cover" />
			</div>
			<div className="inline-flex flex-col px-5 pt-4 pb-3 w-full lg:w-min box-content" style={{ minWidth: "287px", minHeight: "363px" }}>
				<h4 className="text-2xl leading-7 font-bold px-2.5">
					<Link to="/social/post">
						PGI Partners tổ chức buổi workshop về thanh toán các gói thầu xây lắp
					</Link>
				</h4>
				<div className="line-clamp flex-1">
					<p className="mt-5 px-2.5 flex-1 text-base">Sở Y tế Hà Nội vừa đồng ý với đề xuất của Trung tâm Kiểm soát Bệnh tật phương án rút khoảng cách giữa 2 mũi vaccine AstraZeneca về còn tối thiểu 4 tuần nhằm tăng tốc độ tiêm chủng toàn quốc.</p>
				</div>
				<p className="text-[13px] leading-[15px] px-2 border-b border-primary-gray border-opacity-20 text-secondary-gray pb-2.5 mt-3">
					Nguyễn Văn Tuấn-CBS
					<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
					Phòng kế toán
					<span className="h-0.5 w-0.5 bg-primary-gray rounded-md inline-block align-middle mx-2"></span>
					6h
				</p>
				<p className="flex justify-between text-primary-gray mt-3 px-1">
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
				</p>
			</div>
		</div>
	)
}

export default SocialMainArticle
