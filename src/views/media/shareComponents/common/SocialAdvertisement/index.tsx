import React, { FC } from 'react'

import ad from 'assets/images/media/image 175.png';

export const SocialAdvertisement: FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<a href="/">
				<img src={ad} alt="" className="h-full object-cover" />
			</a>
		</div>
	)
}