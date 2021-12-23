import { FC, HTMLAttributes } from 'react'

const table = [
	{ title: 'Mã hiệu', attr: '' },
	{ title: 'Chủ thể ban hành', attr: '' },
	{ title: 'Mã hiệu hồ sơ lưu', attr: '' },
	{ title: 'Gói thầu, hạng mục', attr: '' },
	{ title: 'Ngày hồ sơ/văn bản', attr: '' },
	{ title: 'Hợp đồng', attr: '' },
	{ title: 'Ngày nhận thực tế', attr: '' },
	{ title: 'Hướng hồ sơ', attr: '' },
	{ title: 'Nhận dạng', attr: '' },
	{ title: 'Chủ thể nhận', attr: '' },
	{ title: 'Tình trạng', attr: '' },
	{ title: 'Loại lĩnh vực', attr: '' },
	{ title: 'Số lượng', attr: '' },
	{ title: 'Tính chất văn bản', attr: '' },
	{ title: 'Số lượng giao', attr: '' },
	{ title: 'Phân loại khác', attr: '' },
	{ title: 'Yêu cầu phản hồi', attr: '' },
	{ title: 'Người ký', attr: '' },
	{ title: 'Thời hạn phản hồi', attr: '' },
	{ title: 'Giá trị', attr: '' },
	{ title: 'Ghi chú', attr: '' },
	{ title: 'Địa chỉ lưu trữ', attr: '' },
];

const TableGeneralInformation: FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div className='document__detail-grid border-collapse mt-3' {...props}>
			{table.map(t => (
				<>
					<div className='px-4 py-2.5 border-cbs-border'>{t.title}</div>
					<div className='px-4 py-2.5 border-cbs-border text-black'>{"<"}Content{">"}</div>
				</>
			))}
		</div>
	)
}

export default TableGeneralInformation
