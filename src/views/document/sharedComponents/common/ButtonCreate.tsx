import React, { FC } from 'react'

const ButtonCreate: FC<React.HtmlHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
	return (
		<button className="py-2 px-5 bg-cbs-green hover:bg-opacity-90 text-white rounded-md mr-5 h-8 text-medium" {...props}>
			Tạo mới
		</button>
	)
}

export default ButtonCreate
