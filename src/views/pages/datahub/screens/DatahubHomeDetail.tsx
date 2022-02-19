import React, { FC } from 'react'
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {

}

SwiperCore.use([Navigation]);

const DatahubHomeDetail: FC<Props> = (props) => {
	const data = Array.from({ length: 3 }).map((_, index) => ({
		key: index,
		items: Array.from({ length: 3 }).map((_, index) => ({
			key: index,
			title: 'CPMI.Công ty Cổ phần CONINCO Quản lý dự án và đầu tư',
			location: 'Tầng 3, Toà nhà 789, Số 147 đường Hoàng Quốc Việt, Phường Nghĩa Đô...',
			image: 'https://trx-demo-003.s3-ap-southeast-1.amazonaws.com/root/test/04f94158-8b32-4ab0-9d69-73c19854a22f.jpg',
		}))
	}))

	return (
		<div className='h-full w-full overflow-auto bg-cbs-gray'>
			<div className='w-full max-w-[1185px] mx-auto bg-white min-h-full space-y-10 py-9'>
				{
					data.map((item, index) => (
						<div className='px-3.5' key={index}>
							<div className='text-[22px] leading-6'>
								Lĩnh vực số 1.{item.key}
							</div>
							<div className='relative pl-[26px] mt-3.5'>
								<Swiper
									observer
									observeParents
									parallax
									slidesPerView={4}
									spaceBetween={16}
									navigation={{
										nextEl: '#button-next' + item.key,
										prevEl: '#button-prev' + item.key
									}}
								>
									{
										item.items.map((item, index) => (
											<SwiperSlide key={item.key} className="w-1/3 rounded-[10px] overflow-hidden border-cbs-border border-[0.5px]">
												<div className='h-36'>
													<img className="w-full h-full z-0 object-cover" src={item.image} alt="News" />
												</div>
												<div className='bg-cbs-active-comment text-black text-medium px-3 py-3.5'>
													<p className='line-clamp-2'>
														{item.title}
													</p>
												</div>
												<div className="text-cbs-subtext text-x-small">
													<p className='line-clamp-2 px-4 py-2.5'>
														{item.location}
													</p>
												</div>
											</SwiperSlide>
										))
									}
									<div className="pagination"></div>
								</Swiper>
								{/* <div className='absolute inset-y-0 z-1'> */}
								<button id={'button-prev' + item.key} className='absolute top-1/2 z-1 left-0 bg-white border border-cbs-border -translate-y-1/2 rounded-full w-12 h-12 disabled:opacity-30 text-center'>
									<svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
									</svg>
								</button>
								{/* </div> */}
								<button id={'button-next' + item.key} className='absolute top-1/2 z-1 right-0 bg-white border border-cbs-border -translate-y-1/2 rounded-full w-12 h-12 disabled:opacity-30 text-center'>
									<svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</button>
							</div>
						</div>
					))
				}
			</div>
		</div >
	)
}

export default DatahubHomeDetail