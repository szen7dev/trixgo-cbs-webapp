import React, { FC, HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type Props = {
	to: string
	title: string
}

const Card: FC<Props & HTMLAttributes<HTMLDivElement>> = ({ title, to, children, ...props }) => {
	return (
		<div  {...props}>
			<div className='mx-3'>
				<div className='flex justify-between items-center'>
					<span className='font-bold text-2x-large'>{title}</span>
					<Link to={to} className='text-cbs-primary'>
						Xem tất cả
					</Link>
				</div>
			</div>
			{children}
		</div>
	)
}

export default Card