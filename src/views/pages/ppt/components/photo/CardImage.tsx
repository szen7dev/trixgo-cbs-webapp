import classNames from 'classnames'
import React, { FC, HTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import generateImageLink from 'views/pages/media/utils/images'

interface Props {
	index: number,
	pathname: string,
}

const CardImage: FC<Props & HTMLAttributes<HTMLDivElement>> = ({ pathname, index, ...props }) => {
	return (
		<Link to={pathname}>
			<div className="relative" {...props}>
				<img src={generateImageLink()} alt="image1" />
				<div className={classNames("flex flex-col absolute w-full bg-black bg-opacity-60 px-1.5 py-1", index >= 5 ? 'inset-0' : 'bottom-0')}>
					{index >= 5 && <div className="flex flex-1 items-center justify-center text-2x-large">
						+12
					</div>}
					<p className="line-clamp-1">
						Đổ bê tông cột vách (8h)
					</p>
				</div>
			</div>
		</Link>
	)
}

export default React.memo(CardImage)
