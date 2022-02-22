import React from 'react'

const ReportTotal: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<div>Tổng mức</div>
			<div className="flex justify-between items-center mt-2">
				<div className="text-large text-black font-bold">
					13.128
				</div>
			</div>
		</div>
	)
}

export default ReportTotal
