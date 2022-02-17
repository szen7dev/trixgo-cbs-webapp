import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'

const DatahubHome: FC<RouteComponentProps> = () => {
	return (
		<div className='h-full w-full bg-gradient-to-tr from-blue-300 to-blue-600'>
			<div className='max-w-4xl mx-auto'>
				<div className="flex justify-center">
					<div className='w-6/12 px-4 '>
						<div className='bg-white'>
							asd
						</div>
					</div>
				</div>
				<div className='flex justify-center'>
					<div className='w-8/12 px-4 '>
						<div className='bg-white'>
							123
						</div>
					</div>
				</div>
				<div className='flex flex-wrap'>
					<div className='w-3/12 px-4 '>
						<div className='bg-white'>
							123
						</div>
					</div>
					<div className='w-3/12 px-4 '>
						<div className='bg-white'>
							123
						</div>
					</div>
					<div className='w-3/12 px-4 '>
						<div className='bg-white'>
							123
						</div>
					</div>
					<div className='w-3/12 px-4 '>
						<div className='bg-white'>
							123
						</div>
					</div>
					<div className='w-3/12 px-4 '>
						<div className='bg-white'>
							123
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DatahubHome