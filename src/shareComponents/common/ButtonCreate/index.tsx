import React, { FC } from 'react'

export const ButtonCreate: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
	return (
		<button className="py-2 px-5 bg-cbs-green hover:bg-opacity-90 disabled:bg-opacity-40 disabled:cursor-not-allowed text-white rounded-md mr-5 h-8 text-medium" {...props}>
			Tạo mới
		</button>
	)
};