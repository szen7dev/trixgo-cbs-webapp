import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom';

// ======== ASSETS IMPORT ========
import iconWallet from 'assets/images/icons8-wallet-100.png'

const DatahubHome: FC<RouteComponentProps> = () => {
	return (
		<div className='h-full w-full bg-gradient-to-tr from-blue-300 to-blue-600'>
			<div className='max-w-4xl mx-auto'>
				<div className="flex justify-center">
					<div className='w-6/12 px-2 '>
						<div className='bg-white py-5 rounded-cbs'>
							<div className='flex justify-around'>
								<div className='flex flex-col items-center'>
									<img src={iconWallet} alt="Icon wallet" className='w-6 h-6' />
									<p className='text-x-large mt-1.5'><strong>125</strong></p>
									<p className='text-medium text-cbs-subtext mt-1'>Lĩnh vực</p>
								</div>
								<div className='flex flex-col items-center'>
									<img src={iconWallet} alt="Icon wallet" className='w-6 h-6' />
									<p className='text-x-large mt-1.5'><strong>125</strong></p>
									<p className='text-medium text-cbs-subtext mt-1'>Lĩnh vực</p>
								</div>
								<div className='flex flex-col items-center'>
									<img src={iconWallet} alt="Icon wallet" className='w-6 h-6' />
									<p className='text-x-large mt-1.5'><strong>125</strong></p>
									<p className='text-medium text-cbs-subtext mt-1'>Lĩnh vực</p>
								</div>
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
							<div key={index} className='w-3/12 px-2 '>
								<div className='bg-white px-[1.375rem] py-5 rounded-cbs'>
									<div>
										<img src={iconWallet} alt="Icon wallet" className='w-6 h-6' />
										<p className='text-medium text-cbs-subtext mt-3'>Lĩnh vực số {index + 1}</p>
									</div>
								</div>
							</div>
						)
					}
				</div>
				<div className='flex'>
					<div className='px-2 w-6/12'>
						<div className='border-cbs-border border-[1px] bg-white'>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit minima doloremque atque maiores?</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit minima doloremque atque maiores?</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit minima doloremque atque maiores?</p>
						</div>
					</div>
					<div className='px-2 w-6/12'>
						<div className='border-cbs-border border-[1px] bg-white'>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit minima doloremque atque maiores?</p>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit minima doloremque atque maiores?</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DatahubHome