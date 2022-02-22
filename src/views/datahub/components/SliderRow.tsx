/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
	id: string | number;
	items: Array<Record<string, any>>
}
const SliderRow: FC<Props> = (props) => {
	return (
		<div className='relative pl-[26px] mt-3.5'>
			<Swiper
				observer
				observeParents
				parallax
				slidesPerView={4}
				spaceBetween={16}
				navigation={{
					nextEl: '#button-next' + props.id,
					prevEl: '#button-prev' + props.id
				}}
			>
				{
					props.items.map((_item, index) => (
						<SwiperSlide key={_item.id} className="w-1/3 rounded-[10px] overflow-hidden border-cbs-border border-[0.5px]">
							<Link to={'/datahub/contractor/messageHome/' + _item.id}>
								<div className='h-36'>
									<img className="w-full h-full z-0 object-cover" src={_item.image} alt="News" />
								</div>
								<div className='bg-cbs-active-comment text-black text-medium px-3 py-3.5'>
									<p className='line-clamp-2'>
										{_item.title}
									</p>
								</div>
								<div className="text-cbs-subtext text-x-small">
									<p className='line-clamp-2 px-4 py-2.5'>
										{_item.location}
									</p>
								</div>
							</Link>
						</SwiperSlide>
					))
				}
				<div className="pagination"></div>
			</Swiper>
			{/* <div className='absolute inset-y-0 z-1'> */}
			<button id={'button-prev' + props.id} className='absolute top-1/2 z-1 left-0 bg-white border border-cbs-border -translate-y-1/2 rounded-full w-12 h-12 disabled:opacity-30 text-center'>
				<svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			{/* </div> */}
			<button id={'button-next' + props.id} className='absolute top-1/2 z-1 right-0 bg-white border border-cbs-border -translate-y-1/2 rounded-full w-12 h-12 disabled:opacity-30 text-center'>
				<svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	)
}

export default SliderRow