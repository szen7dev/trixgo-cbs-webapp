/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';

// ======== COMPONENT IMPORT ========
import Acoordion from '../components/Acoordion';

// ======== ASSETS IMPORT ========
import iconWallet from 'assets/images/icons8-wallet-100.png'
import appstore from 'assets/images/appstore.png'
import chplay from 'assets/images/chplay.png'
import datahub_banner_1 from 'assets/images/datahub-banner-1.png'
import datahub_banner_2 from 'assets/images/datahub-banner-2.png'
import Wallethub from '../components/Wallethub';

const DatahubHome: FC<RouteComponentProps> = () => {
	return (
		<div className='h-full w-full bg-gradient-to-tr from-blue-300 to-blue-600 pt-12 overflow-auto'>
			<div className='flex relative'>
				<div className='max-w-4xl mx-auto mt-10 mb-8'>
					<div className="flex justify-center">
						<div className='w-6/12 px-2 '>
							<div className='bg-white py-5 rounded-cbs'>
								<div className='flex justify-around'>
									<Wallethub title="125" description='Lĩnh vực' />
									<Wallethub title="125" description='Lĩnh vực' />
									<Wallethub title="125" description='Lĩnh vực' />
								</div>
							</div>
						</div>
					</div>
					<div className='flex justify-center mt-8'>
						<div className='w-8/12 px-2 '>
							<div className='relative align-middle'>
								<label className=''>
									<span className='absolute inset-y-0 left-[1.375rem] flex items-center text-cbs-subtext'>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px" viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
										</svg>
									</span>
									<input type="text" placeholder='Tìm kiếm thông tin trong DataHub' className="pl-14 pr-6 py-2.5 w-full focus:outline-none bg-white rounded-full placeholder-cbs-subtext text-large" />
								</label>
							</div>
						</div>
					</div>
					<div className='flex flex-wrap mt-9 gap-y-4'>
						{
							Array.from({ length: 10 }).map((_, index) =>
								<Link key={index} to={"/datahub/messageHome/" + index} className='w-3/12 px-2'>
									<div>
										<div className='bg-white px-[1.375rem] py-5 rounded-cbs'>
											<div>
												<img src={iconWallet} alt="Icon wallet" className='w-6 h-6' />
												<p className='text-medium text-cbs-subtext mt-3'>Lĩnh vực số {index + 1}</p>
											</div>
										</div>
									</div>
								</Link>
							)
						}
					</div>
					<div className='flex flex-wrap mt-[2.375rem]'>
						<div className='px-2 w-full xl:w-6/12'>
							<div className='border-cbs-border border-[1px] bg-white h-full'>
								<img src={datahub_banner_1} alt='datahub banner' />
							</div>
						</div>
						<div className='px-2 w-full xl:w-6/12'>
							<div className='border-cbs-border border-[1px] bg-white h-full'>
								<img src={datahub_banner_2} alt='datahub banner' />
							</div>
						</div>
					</div>
				</div>
				<div className='relative pr-4'>
					<div className='sticky top-0'>
						<div className='text-white bg-cbs-secondary px-6 py-4'>
							Tiện ích nhanh
						</div>
						<Acoordion />
					</div>
				</div>
			</div>
			<div className='bg-white py-2.5'>
				<div className='max-w-7xl mx-auto flex text-medium'>
					<div className='w-3/12'>
						<div className='pt-1'>
							<div className='flex items-cebter'>
								<span className='text-cbs-primary text-2x-large mr-2'>
									+84 868 898 086
								</span>
								<span className='bg-cbs-primary text-white text-xs py-[7px] px-1 align-middle'>
									24/7
								</span>
							</div>
							<p className='mt-3.5 text-cbs-subtext'>© 2022 Công ty Cổ phần Trixgo</p>
						</div>
					</div>
					<div className='w-3/12'>
						<div className='leading-6'>
							<p>Câu hỏi thường gặp</p>
							<p>Điều khoản sử dụng</p>
							<p>Bảo mật thông tin khác hàng</p>
						</div>
					</div>
					<div className='w-3/12'>
						<div className='leading-6'>
							<p>Câu hỏi thường gặp</p>
							<p>Điều khoản sử dụng</p>
							<p>Bảo mật thông tin khác hàng</p>
						</div>
					</div>
					<div className='w-3/12 flex items-center'>
						<a href="#" className='w-24 mr-7'>
							<img src={appstore} alt="applestore" />
						</a>
						<a href="#" className='w-24'>
							<img src={chplay} alt="chplay" />
						</a>
					</div>
				</div>
			</div>
		</div >
	)
}

export default DatahubHome