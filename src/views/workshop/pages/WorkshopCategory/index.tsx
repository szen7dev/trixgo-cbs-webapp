import SearchIcon from 'assets/icons/SearchIcon'
import React, { FC, useState } from 'react'
import { Link, generatePath } from 'react-router-dom'
import ArrowRight from 'views/workshop/sharedComponents/common/Icons/ArrowRight'
import CardLession from './components/CardLession'
import ModalCreateCategory from './components/ModalCreateCategory'

type Props = {
}

const WorkshopCategory: FC<Props> = (props) => {
	const [isShow, setIsShow] = useState(false)

	return (
		<div className='w-full max-w-[1185px] mx-auto bg-white min-h-full space-y-10 py-9 px-[90px]'>
			<div className='flex flex-col items-center'>
				<h1 className='text-[60px] leading-[70px] font-bold max-w-3xl text-center mb-3.5'>Tìm hiểu mọi lúc, mọi nơi và tăng tốc tương lai</h1>
				<p className='text-large text-cbs-subtext font-bold max-w-xl  text-center mt-4 mb-1'>Ai cũng có khả năng sáng tạo. Trixgo Workshop là một nơi mà có thể giúp mọi người phát triển tiềm năng của chính mình</p>
				<label className='relative align-middle border-cbs-border border-0.5 rounded-full  max-w-xl w-full mt-10'>
					<span className='absolute inset-y-0 left-[1.375rem] flex items-center text-cbs-subtext'>
						<SearchIcon className="h-6 w-6" />
					</span>
					<input type="text" placeholder='Tìm kiếm workshop' className="pl-14 pr-6 py-3 w-full focus:outline-none bg-white rounded-full placeholder-cbs-subtext text-large" />
				</label>
				<div className='justify-center mt-4'>
					{Array.from({ length: 4 }).map((_, index) => <button key={index} className='hover:bg-cbs-gray rounded-cbs pt-3 pb-2.5 px-3 text-center w-28'>
						<div className='w-[50px] h-[50px] rounded-full overflow-hidden mx-auto'>
							<img src="/images/workshop/workshop.png" className='w-full h-full object-cover' alt="" />
						</div>
						<p>Quản lý thanh toán xây dựng</p>
					</button>)}
				</div>
			</div>
			<div>
				<Link to="/workshop/home/category/1" className='text-cbs-subtext font-bold text-2xl group'>
					<span className='mr-6'>
						Quản lý dự án (92 workshop)
					</span>
					<span className='w-6 h-6 inline-flex items-center justify-center rounded-full bg-cbs-primary text-white'>
						<ArrowRight className='w-4 h-4' />
					</span>
				</Link>
				<div className='grid grid-cols-4 gap-x-3.5 pt-7 pb-3'>
					{
						Array.from({ length: 4 }).map((_, i) => (
							<Link key={i} to={generatePath("/workshop/home/category/:id/:workshopID", { id: i, workshopID: 1 })}>
								<CardLession data={{}} className='border-cbs-border border-0.5 rounded-cbs-md px-3.5 pb-3' />
							</Link>
						))
					}
				</div>
			</div>
			<div>
				<Link to="/workshop/home/category/1" className='text-cbs-subtext font-bold text-2xl group'>
					<span className='mr-6'>
						Quản lý thiết kế
					</span>
					<span className='w-6 h-6 inline-flex items-center justify-center rounded-full bg-cbs-primary text-white'>
						<ArrowRight className='w-4 h-4' />
					</span>
				</Link>
				<div className='grid grid-cols-4 gap-x-3.5 pt-7 pb-3'>
					{
						Array.from({ length: 3 }).map((_, i) => (
							<Link key={i} to={generatePath("/workshop/home/category/:id/:workshopID", { id: i, workshopID: 1 })}>
								<CardLession data={{}} className='border-cbs-border border-0.5 rounded-cbs-md px-3.5 pb-3' />
							</Link>
						))
					}
				</div>
			</div>
			<div>
				<Link to="/workshop/home/category/1" className='text-cbs-subtext font-bold text-2xl group'>
					<span className='mr-6'>
						Quản lý thiết kế
					</span>
					<span className='w-6 h-6 inline-flex items-center justify-center rounded-full bg-cbs-primary text-white'>
						<ArrowRight className='w-4 h-4' />
					</span>
				</Link>
				<div className='grid grid-cols-4 gap-x-3.5 pt-7 pb-3'>
					{
						Array.from({ length: 2 }).map((_, i) => (
							<Link key={i} to={generatePath("/workshop/home/category/:id/:workshopID", { id: i, workshopID: 1 })}>
								<CardLession data={{}} className='border-cbs-border border-0.5 rounded-cbs-md px-3.5 pb-3' />
							</Link>
						))
					}
				</div>
			</div>
			<button
				className='fixed bottom-5 right-20 bg-cbs-primary rounded-full text-white w-14 h-14 text-3xl font-thin'
				onClick={() => setIsShow(true)}
			>
				+
			</button>
			<ModalCreateCategory type='create' toggle={() => setIsShow(!isShow)} show={isShow} />
		</div>
	)
}

export default WorkshopCategory