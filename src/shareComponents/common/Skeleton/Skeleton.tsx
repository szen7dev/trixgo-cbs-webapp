import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

type Props = HTMLAttributes<HTMLDivElement>

const Skeleton: FC<Props> = (props) => {
	return (
		<div {...props} className={classNames('relative overflow-hidden after:absolute after:animate-cbs-skeleton after:from-transparent after:via-white/10 after:to-transparent after:-translate-x-full after:inset-0 after:bg-gradient-to-r', props.className)}>
		</div>
	)
}

export default Skeleton