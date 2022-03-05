import SearchIcon from 'assets/icons/SearchIcon'
import TriangleDown from 'assets/icons/TriangleDown'
import React, { FC, useState } from 'react'
import useCheckedList from 'services/hooks/ppt/useCheckedList'
import { CustomFieldFormik } from 'views/datahub/sharedComponents/common'

type Props = {
	toggle: () => void
}
const ModalAddNotificationEmail: FC<Props> = ({ toggle }) => {
	const data = [
		{ _id: 1, name: 'Nguyễn Phan Thanh Hương-CPMI' },
		{ _id: 2, name: 'Nguyễn Phan Thanh Hương-CPMI' },
		{ _id: 3, name: 'Nguyễn Phan Thanh Hương-CPMI' },
		{ _id: 4, name: 'Nguyễn Phan Thanh Hương-CPMI' },
		{ _id: 5, name: 'Nguyễn Phan Thanh Hương-CPMI' },
		{ _id: 6, name: 'Nguyễn Phan Thanh Hương-CPMI' },
		{ _id: 7, name: 'Nguyễn Phan Thanh Hương-CPMI' },
		{ _id: 8, name: 'Nguyễn Phan Thanh Hương-CPMI' },
		{ _id: 9, name: 'Nguyễn Phan Thanh Hương-CPMI' },
	]
	const [isShow, setIsShow] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const { assigned, checked, checkboxRef, handleChangeCheckbox, handleCheckAll } = useCheckedList(data);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		console.log({
			title,
			content,
			checked
		})
	}

	return (
		<div>
			<div className="flex items-center px-6 py-2.5 justify-between">
				<h3 className="text-2x-large font-bold" >
					Thông báo email
				</h3>
				<button
					type="button"
					onClick={toggle}
					className="bg-cbs-gray p-2 rounded-full"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<form className='px-[30px] mt-2' onSubmit={handleSubmit}>
				<input type="text"
					className="text-black py-1.5 px-3 w-full border-0.5 placeholder-shown:bg-cbs-gray border-cbs-border bg-white focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-cbs-sm"
					placeholder="Tiêu đề email"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<textarea
					className="mt-4 text-black py-1.5 px-3 w-full border-0.5 placeholder-shown:bg-cbs-gray border-cbs-border bg-white focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-cbs-sm"
					placeholder="Nội dung email"
					value={content}
					onChange={e => setContent(e.target.value)}
				/>

				<div className='relative border-cbs-border border-0.5 flex items-center mt-4'>
					<SearchIcon className='absolute left-3 w-4 h-4' />
					<input type="text" placeholder='Nhập từ khóa tìm kiếm' className='pl-9 py-3 text-medium w-full focus:outline-none bg-cbs-table-header' />
				</div>
				<div className='text-small overflow-auto' style={{ height: '470px' }}>
					<table>
						<thead>
							<tr onClick={handleCheckAll} className="sticky top-0 bg-white">
								<th className='px-1.5'>
									<div className='flex items-center'>
										<input type='checkbox' className='cbs-checkbox inline-block' ref={checkboxRef} />
										<button onClick={e => { e.stopPropagation(); setIsShow(!isShow) }} className="ml-1.5">
											<TriangleDown className='inline-block' />
										</button>
									</div>
								</th>
								<th className='font-normal py-4'>Chọn tất cả</th>
							</tr>
						</thead>
						<tbody className='overflow-y-auto'>
							{
								isShow && data.map((item, index) => (
									<tr key={index}>
										<td className='px-1.5 align-middle'>
											<input type='checkbox' className='cbs-checkbox' checked={Boolean(assigned[item._id])} onChange={e => handleChangeCheckbox(null, item)} />
										</td>
										<td>
											<div className='flex items-center py-1'>
												<div className='w-10 h-10 object-cover rounded-full overflow-hidden mr-4'>
													<img className='w-full h-full' src="https://dntdurzwr12tp.cloudfront.net/files/db/users/4f3f2758-676b-4e41-b533-fb5841b360a5.jpg" alt="" />
												</div>
												<div>
													{item.name}
												</div>
											</div>
										</td>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
				<div className="flex justify-end py-2 px-6">
					<div className="mr-1.5">
						<button
							type="submit"
							className="px-4 py-2 rounded-md bg-primary text-white text-small leading-5 disabled:opacity-30 disabled:cursor-not-allowed"
						>
							Xác nhận
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default ModalAddNotificationEmail