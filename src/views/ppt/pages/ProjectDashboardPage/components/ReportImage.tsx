import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { ContextModalPost } from "views/media/contexts/post";

// import image1 from 'assets/images/ppt/image 161.jpg';
// import image2 from 'assets/images/ppt/image 162.jpg';
// import image3 from 'assets/images/ppt/image 163.jpg';
// import image4 from 'assets/images/ppt/image 164.jpg';
import { Project } from 'typings/items/project';

type Props = {
	projectInfo: Project | undefined,
} & React.HTMLAttributes<HTMLDivElement>

const ReportImage: React.FC<Props> = ({ projectInfo, ...props }) => {
	const {openPost } = useContext(ContextModalPost);
	if(!projectInfo || !projectInfo?.photos?.length) return <></>;

	return (
		<div {...props}>
			<div className='bg-white w-full mt-4 py-2 flex px-3'>
				<div className="flex items-center">
					<button id='prev' className="border-[0.5px] rounded-cbs-md border-cbs-border box-border w-10 h-10 flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</button>
				</div>
				<Swiper
					observer
					observeParents
					parallax
					slidesPerView={5}
					spaceBetween={10}
					navigation={{
						nextEl: '#next',
						prevEl: '#prev'
					}}
				>
					{projectInfo?.photos?.map((photo,i) => (
						<SwiperSlide key={photo._id}>
							<div className='w-full pb-[100%]' onClick={()=> openPost({ author: photo.author, images:projectInfo.photos, index: i, createAt: photo.createAt, mediaId: photo._id.toString() })}>
								<p className='opacity-0 invisible'>{photo.name}</p>
								<img src={`${process.env.REACT_APP_URL_S3}${photo.path}`} alt={`Report ${photo.path}`} className="absolute inset-0 mx-auto object-cover h-full w-full" height="130px" />
							</div>
						</SwiperSlide>
					))}
					{/* <SwiperSlide><img src={image4} alt="image4" className="mx-auto object-cover" height="130px" /></SwiperSlide> */}
				</Swiper>
				<div className="flex items-center">
					<button id='next' className="border-[0.5px] rounded-cbs-md border-cbs-border box-border w-10 h-10 flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}

export default ReportImage
