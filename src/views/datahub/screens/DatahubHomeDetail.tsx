import React, { FC } from 'react'
import SwiperCore, { Navigation } from 'swiper';
import SliderRow from '../components/SliderRow';

type Props = {

}

SwiperCore.use([Navigation]);

const DatahubHomeDetail: FC<Props> = (props) => {
	const data = Array.from({ length: 3 }).map((_, index) => ({
		id: index,
		items: Array.from({ length: 3 }).map((_, index) => ({
			id: index,
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
								Lĩnh vực số 1.{item.id}
							</div>
							<SliderRow {...item} />
						</div>
					))
				}
			</div>
		</div >
	)
}

export default DatahubHomeDetail