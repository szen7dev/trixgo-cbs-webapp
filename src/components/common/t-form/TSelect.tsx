import React, { ElementType } from 'react'

type Props = {
	title: string
	required?: boolean
	name: string,
	error?: React.ComponentType<any>,
}

function TSelect(props: Props & React.ComponentProps<'select'>): JSX.Element {
	const { title, required, error, children, ...rest } = props
	return (
		<label className='block'>
			<div className='mb-1.5'>
				{title} {required && "(*)"}
			</div>
			<select
				className="py-1.5 px-3 bg-cbs-gray w-full border-0.5 border-cbs-border focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-md"
				{...rest}
			>
				{children}
			</select>
			{props.error && <props.error />}
		</label>
	)
}

export default TSelect