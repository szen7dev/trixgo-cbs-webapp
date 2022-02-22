import React from 'react'

const ReportQuickReport: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<h3>Báo cáo nhanh về dự án (tình trạng, việc nóng)</h3>
			<div className='mt-2.5 mb-4 text-black'>
				<p><u><b>TÌNH TRẠNG CHÍNH</b></u></p>
				<p>
					Đã có cấp phép xây dựng và thông báo khởi công đã gửi ra phường.
				</p>
				<p>
					Hồ sơ thiết kế bản vẽ thi công đã có để phục vụ việc triển khai. Đã có dự toán và khối lượng ban đầu
				</p>
				<p>
					Công tác lựa chọn thầu: đã hoàn tất 82% khối lượng thực hiện. Số gói ...
				</p>
				<p><u>
					<b>HOT FIX</b>
				</u></p>
				<p>
					Cần tập trung đẩy nhanh công tác chọn thầu theo đúng kế hoạch các bên đã thống nhất. Xử lý quan hệ với địa phương để đảm...
				</p>
			</div>
			<button className="text-cbs-primary">Xem tất cả</button>
		</div>
	)
}

export default ReportQuickReport
