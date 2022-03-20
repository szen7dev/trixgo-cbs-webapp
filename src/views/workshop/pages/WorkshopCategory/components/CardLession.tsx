/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import { WorkshopLession } from 'typings/workshop'

type Data<D extends Record<string, unknown> = {}> = D & Partial<WorkshopLession>

interface Props<D extends Record<string, unknown>> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: Data<D>
}

function CardLession<D extends Record<string, unknown>>({ data, ...props }: Props<D>): JSX.Element {
	return (
		<div {...props}>
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
				<p className='text-x-large'><strong>{data.name}</strong></p>
				<div>
					<img className='inline mr-2 w-6 h-6' src="/images/workshop/google-presentation.png" alt="" />
					<span>{data.amountLessions || 0} Workshops</span>
				</div>
				<div className='h-[3px] bg-cbs-schedule-after-7days'></div>
				<div className='flex justify-between text-medium py-3'>
					<div>
						<img className='inline-block w-[18px] h-[18px]' src="/images/workshop/love.png" alt="" />
						<span>{data.amountReaction || 0}</span>
					</div>
					<div>
						<img className='inline-block w-[18px] h-[18px]' src="/images/workshop/view.png" alt="" />
						<span>{data.amountView || 0}</span>
					</div>
					<div>
						<img className='inline-block w-[18px] h-[18px]' src="/images/workshop/user.png" alt="" />
						<span>{data.amountLessions || 0}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CardLession