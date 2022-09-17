import React, { FC, HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type Props = {
	value: string,
	imgIcon?: string,
	link?: string,
}

const ContactInfo: FC<Props & HTMLAttributes<HTMLDivElement>> = ({ value, link, imgIcon, ...props }) => {
	return (
		<div {...props}>
			<p>
				<img className='inline-block w-6 h-6 mr-2.5' src={imgIcon} alt="" />
				{
					link
						? <Link to={link} className="text-cbs-primary">
							{value}
						</Link>
						: <span>{value}</span>
				}
			</p>
		</div>
	)
}

export default ContactInfo;