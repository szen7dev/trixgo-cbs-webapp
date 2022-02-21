import React, { FC, HTMLAttributes } from 'react'
import iconWallet from 'assets/images/icons8-wallet-100.png'
import { Link } from 'react-router-dom'

type Props = {
	value: string,
	link?: string,
}

const ContactInfo: FC<Props & HTMLAttributes<HTMLDivElement>> = ({ value, link, ...props }) => {
	return (
		<div {...props}>
			<p>
				<img className='inline-block w-6 h-6 mr-2.5' src={iconWallet} alt="" />
				{
					link
						? <Link to={link}>
							{value}
						</Link>
						: <span>{value}</span>
				}
			</p>
		</div>
	)
}

export default ContactInfo;