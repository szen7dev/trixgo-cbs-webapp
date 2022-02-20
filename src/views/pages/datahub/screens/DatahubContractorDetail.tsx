import React, { FC, Fragment, useContext, useEffect, useState } from 'react'
import AuthContext from 'services/contexts/Auth'
import CompanyFeed from '../components/CompanyFeed';
import ProfileFeed from '../components/ProfileFeed';
import Wallethub from '../components/Wallethub';

type Props = {

}

const DatahubContractorDetail: FC<Props> = (props) => {
	const { state } = useContext(AuthContext);
	const ref = React.useRef<HTMLDivElement>(null);
	const sticky = React.useRef<HTMLDivElement>(null);
	const innerRef = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		let lastScrollTop = 0;
		let type = 'up';
		function handleScroll(this: HTMLDivElement, event: Event) {
			if (!sticky.current || !innerRef.current) return;
			if (sticky.current.scrollHeight <= this.clientHeight) return sticky.current.style.top = '10px';

			if (type === 'up' && lastScrollTop < this.scrollTop) {
				// downscroll code
				const scrolled = (innerRef.current.offsetTop + innerRef.current.scrollHeight -
					this.scrollTop)
				if (scrolled >= 0) {
					if (this.scrollTop <= innerRef.current.offsetTop - 10) innerRef.current.style.height = '';
					else innerRef.current.style.height = innerRef.current.scrollHeight - scrolled + 10 + 'px';
				}

				sticky.current.style.top = (this.clientHeight - sticky.current.scrollHeight) - 10 + 'px';
				sticky.current.style.bottom = ''
				type = 'down';

			} else if (type === 'down' && lastScrollTop > this.scrollTop) {
				// upscroll code

				innerRef.current.style.height = sticky.current.offsetTop - innerRef.current.offsetTop + 'px';
				sticky.current.style.bottom = (this.clientHeight - sticky.current.scrollHeight) - 10 + 'px';
				sticky.current.style.top = ''
				type = 'up'
			}
			lastScrollTop = this.scrollTop
		}
		if (ref.current) ref.current.addEventListener('scroll', handleScroll, false);
	}, [])

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
		<div className='h-full w-full overflow-scroll bg-cbs-gray' ref={ref}>
			<div className='w-full max-w-[1185px] mx-auto space-y-10 pb-9'>
				{/* ======= FIRST BLOCK ======= */}
				<div className='bg-white'>
					{/* ======= BACKGROUND ======= */}
					<div className='h-[365px]'>
						<img className='w-full h-full object-cover' src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" alt="" />
					</div>
					{/* ======= GENERAL INFO ======= */}
					<div className='flex'>
						<div className='w-4/12'>
							<div className='flex w-full justify-around'>
								<Wallethub title="125" description='Dịch vụ' />
								<Wallethub title="125" description='Dự án' />
								<Wallethub title="125" description='Hợp đồng' />
							</div>
						</div>
						<div className='w-4/12'>
							<div className='mt-0 h-0 flex items-center justify-center'>
								<div className='bg-white rounded-full p-1'>
									<img className='h-[8.25rem] w-[8.25rem] border-cbs-border border-[0.5px] rounded-full' src={process.env.REACT_APP_URL_S3_USER + '/' + state.user?.image} alt="" />
								</div>
							</div>
						</div>
						<div className='w-4/12'>

						</div>
					</div>
					{/* ======= LIST ACTIONS ======= */}
					<div>

					</div>
				</div>
			</div>

			<div className='flex justify-center'>
				<div className='w-full max-w-[1185px] mt-4 flex justify-center'>
					{/* ======= LIST PROFILE FEED ======= */}
					<ProfileFeed className='mx-3.5 flex-shrink flex-grow max-w-lg' innerref={innerRef} ref={sticky} />
					{/* ======= NEW FEED ======= */}
					<CompanyFeed className='mx-3.5 flex-shrink flex-grow' />
				</div>
			</div>
		</div >
	)
}

export default DatahubContractorDetail