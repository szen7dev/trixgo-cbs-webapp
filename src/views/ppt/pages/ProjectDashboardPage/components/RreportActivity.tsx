import React from 'react'

const ReportActivity: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<div>Tổng hoạt động</div>
			<div className="flex justify-between items-center mt-2">
				<div className="text-large font-bold mr-6 text-black">
					1.328
				</div>
				<li className="whitespace-nowrap" style={{ color: 'rgba(0, 96, 225, 1)' }}>
					Lần cuối cách đây 2 giờ
				</li>
			</div>
		</div>
	)
}

export default ReportActivity
