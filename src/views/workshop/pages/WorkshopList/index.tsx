import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ButtonMore } from 'shareComponents/common'
import ModalCreateContent from './components/ModalCreateContent'

type Props = {
}

const WorkshopList: FC<Props> = (props) => {
	const [isShow, setIsShow] = useState(false);
	const history = useHistory();

	return (
		<div className='flex flex-col h-full overflow-hidden'>
			<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1 shadow-cbs-md">
				<button
					type="button"
					className="p-2 rounded-3xl mr-2"
					onClick={() => history.goBack()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
				</button>
				<span className='mr-auto text-x-large font-bold text-cbs-subtext'>Quản lý dự án (92 workshop)</span>
				{/* <div className="border-0.5 h-4 border-cbs-border"></div> */}
				{/* <DropdownFilterButton /> */}
				<ButtonMore />
			</div>
			<div className='flex-1 overflow-y-auto'>
				<div className='w-full max-w-[1185px] mx-auto min-h-full space-y-10 py-2 px-[90px]'>
					<div className='grid grid-cols-4 gap-x-3.5 gap-y-7 pt-7 pb-3'>
						{
							Array.from({ length: 20 }).map((_, i) => (
								<div key={i} className='border-cbs-border border-0.5 rounded-cbs-md px-3.5 pb-3'>
									<div className='h-[133px] w-full object-cover overflow-hidden'>
										<img src="/images/workshop/workshop.png" alt="" />
									</div>
									{/* TAGS */}
									<div className='space-y-5 mt-5'>
										<div className='mt-4 text-x-small'>
											<span className='pl-2.5 pr-3 bg-[#FFEED9] py-1.5'>
												<span className='inline-block w-2.5 h-2.5 rounded-full bg-cbs-schedule-oneweek mr-2'></span>
												<span>Development</span>
											</span>
										</div>
										<p className='text-x-large'><strong>English Fluency | How to Sound Like Nattive</strong></p>
										<div>
											<img className='inline mr-2 w-6 h-6' src="/images/workshop/google-presentation.png" alt="" />
											<span>92 Workshops</span>
										</div>
										<div className='h-[3px] bg-cbs-schedule-after-7days'></div>
										<div className='flex justify-between text-medium py-3'>
											<div>
												<img className='inline-block w-[18px] h-[18px]' src="/images/workshop/love.png" alt="" />
												<span>690</span>
											</div>
											<div>
												<img className='inline-block w-[18px] h-[18px]' src="/images/workshop/view.png" alt="" />
												<span>690</span>
											</div>
											<div>
												<img className='inline-block w-[18px] h-[18px]' src="/images/workshop/user.png" alt="" />
												<span>690</span>
											</div>
										</div>
									</div>
								</div>
							))
						}
					</div>
					<button
						className='fixed bottom-0 right-20 bg-cbs-primary rounded-full text-white w-14 h-14 text-3xl font-thin'
						onClick={() => setIsShow(true)}
					>
						+
					</button>
				</div>
			</div>
			<ModalCreateContent type='create' toggle={() => setIsShow(!isShow)} show={isShow} />
		</div>
	)
}

export default WorkshopList