import classNames from 'classnames'
import React, { FC, HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

interface Props {
	index: number,
	pathname: string,
	total: number,
	image: {
		nameOrg: string,
		path: string,
		description: string,
	}
}

const CardImage: FC<Props & HTMLAttributes<HTMLDivElement>> = ({ total, pathname, image, index, ...props }) => {
	const imgUrl = image.path ? `${process.env.REACT_APP_URL_S3}${image.path}` : ``;
	// https://trx-demo-003.s3-ap-southeast-1.amazonaws.com/root/test/3d049844-5477-4cb0-9333-f3a0cd5fae59.jpeg
	return (
		<Link to={pathname}>
			<div className="relative w-[100px] h-[100px] mr-2" {...props}>
				<img src={imgUrl} className="w-full object-cover" alt="Preview" />
				<div className={classNames("flex flex-col absolute w-full bg-black bg-opacity-60 px-1.5 py-1", index >= 5 ? 'inset-0' : 'bottom-0')}>
					{index >= 5 && <div className="flex flex-1 items-center justify-center text-2x-large">
						+{total - 5}
					</div>}
					<p className="line-clamp-1" title={image.description}>
						{image.description}
					</p>
				</div>
			</div>
		</Link>
	)
}

export default React.memo(CardImage)
