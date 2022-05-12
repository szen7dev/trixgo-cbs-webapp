import { FC, useState, useEffect } from 'react';
import { unionBy } from 'lodash';
import { toast } from "react-toastify";
import SearchIcon from 'assets/icons/SearchIcon';
import useCheckedList from 'services/hooks/ppt/useCheckedList';
import { usePcm } from 'services/hooks/pcm/usePcm';
import { useUserSystem } from 'services/hooks/users/useUserSystem';
import debounce from "lodash/debounce";

// import TriangleDown from 'assets/icons/TriangleDown';
// import { CustomFieldFormik } from 'views/datahub/sharedComponents/common'

type Props = {
	toggle: () => void,
	task: any
}

const ModalAddNotificationEmail: FC<Props> = ({ toggle, task }) => {
	const data = unionBy([task.author, task.assignee, ...task?.related], '_id');
	const { sendMailDetailTaskAsync } = usePcm();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [emails, setEmails] = useState('');
	const [keyword, setKeyword] = useState('');
	const { assigned, checked, checkboxRef, handleChangeCheckbox, handleCheckAll } = useCheckedList(data);
	const {
		data: listUsersSystem,
		refetch: refetchUser,
	} = useUserSystem({
		arrayID: JSON.stringify(data.map(item => item._id)),
		keyword,
		isFetch: true,
		limit: 20
	});

	useEffect(()=> {
		refetchUser()
	}, [keyword])

	const handleSubmit = async () => {
		if((!checked || !checked.length) && !emails)
			return toast.warning('Vui lòng chọn người gửi mail');

		if(!title)
			return toast.warning('Vui lòng nhập tiêu đề');

		if(!content)
			return toast.warning('Vui lòng nhập nội dung');

		const listReceiversID = checked.map(user => user._id);
		toggle();

		const result = await sendMailDetailTaskAsync({
			taskID: task._id,
			title,
			notice: content,
			members: listReceiversID,
			emails
		});

		if(result.error) {
			if(result.data?.keyError === 'params_mail_invalid') {
				return toast.error(result.data?.message);
			}

			return toast.error('Gửi email thất bại');
		}

		toast.success('Gửi email thành công');
	}

	return (
		<div>
			<div className="flex items-center px-6 py-2.5 justify-between">
				<h3 className="text-2x-large font-bold">
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
			<form className='px-[30px] mt-2'>
				<input type="text"
					className="text-black py-1.5 px-3 w-full border-0.5 placeholder-shown:bg-cbs-gray border-cbs-border bg-white focus:bg-white focus:border-cbs-primary focus:outline-none resize-none rounded-cbs-sm"
					placeholder="Tiêu đề email"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<textarea
					className="mt-4 text-black py-1.5 px-3 w-full border-0.5 placeholder-shown:bg-cbs-gray border-cbs-border bg-white focus:bg-white focus:border-cbs-primary focus:outline-none rounded-cbs-sm"
					placeholder="Nội dung email"
					value={content}
					onChange={e => setContent(e.target.value)}
				/>

				<textarea
					className="mt-4 text-black py-1.5 px-3 w-full border-0.5 placeholder-shown:bg-cbs-gray border-cbs-border bg-white focus:bg-white focus:border-cbs-primary focus:outline-none rounded-cbs-sm"
					placeholder="Email ngoài hệ thống"
					value={emails}
					onChange={e => setEmails(e.target.value)}
				/>

				<div className='relative border-cbs-border border-0.5 flex items-center mt-4'>
					<SearchIcon className='absolute left-3 w-4 h-4' />
					<input 
						type="text"
					 	placeholder='Nhập từ khóa tìm kiếm' 
						className='pl-9 py-3 text-medium w-full focus:outline-none bg-cbs-table-header' 
						onChange={debounce((e: any) => setKeyword(e.target.value), 600)}
					/>
				</div>
				<div className='text-small overflow-auto' style={{ height: '470px' }}>
					<table>
						<thead>
							<tr onClick={handleCheckAll} className="sticky top-0 bg-white">
								<th className='px-1.5'>
									<div className='flex items-center'>
										<input type='checkbox' className='cbs-checkbox inline-block' ref={checkboxRef} />
										{/* <button onClick={e => { e.stopPropagation(); setIsShow(!isShow) }} className="ml-1.5">
											<TriangleDown className='inline-block' />
										</button> */}
									</div>
								</th>
								<th className='font-normal py-4'>Chọn tất cả</th>
							</tr>
						</thead>
						<tbody className='overflow-y-auto'>
							{
								listUsersSystem.map((item, index) => (
									<tr key={index}>
										<td className='px-1.5 align-middle'>
											<input type='checkbox' className='cbs-checkbox' checked={Boolean(assigned[item._id])} onChange={e => handleChangeCheckbox(null, item)} />
										</td>
										<td>
											<div className='flex items-center py-1'>
												<div className='w-10 h-10 object-cover rounded-full overflow-hidden mr-4'>
													<img className='w-full h-full' src={`${process.env.REACT_APP_URL_S3_USER}/${item.image}`} alt="" />
												</div>
												<div>
													{item.bizfullname}
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
							type="button"
							className="px-4 py-2 rounded-md bg-primary text-white text-small leading-5 disabled:opacity-30 disabled:cursor-not-allowed"
							onClick={handleSubmit}
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