import { FC, useMemo } from 'react';
import { Task } from 'typings/task';
import taskUserAvt from "assets/images/task-user.svg";

type Props = {
	task: Task,
	toggle: () => void,
}

const ModalViewUsersRelated: FC<Props> = ({ task, toggle }) => {
	const viewedUsers = useMemo(() => {
		if(!task || !task.viewedUsers) return [];

		return task.viewedUsers?.map(vuser=>vuser._id);
	}, [task.viewedUsers]);

	return (
		<div>
			<div className="flex items-center px-6 py-2.5 justify-between">
				<h3 className="text-2x-large font-bold" >
					Danh sách người liên quan
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

			<div className='px-[30px] mb-3 text-small overflow-auto' style={{ height: '470px' }}>
				<table>
					<thead>
						<tr className="sticky top-0 bg-white">
							<th className='font-normal'></th>
						</tr>
					</thead>
					<tbody className='overflow-y-auto'>
						{
							task.related?.length ? task.related.map(item => (
								<tr key={item._id}>
									<td>
										<div className='flex items-center py-2'>
											<div className='w-10 h-10 object-cover rounded-full overflow-hidden mr-4'>
												{viewedUsers.includes(item._id) ? <img title={item.bizfullname+" - Đã truy cập công việc"} key={item._id} alt={"----"} src={item?.image ? `${process.env.REACT_APP_URL_S3_USER}/${item?.image}` : taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1 border-0.5 border-primary-border border-2 border-pink-600"} />  : <img title={item.bizfullname} key={item._id} alt={"----"} src={item?.image ? `${process.env.REACT_APP_URL_S3_USER}/${item?.image}` : taskUserAvt} className={"rounded-full overflow-hidden h-[36px] w-[36px] min-h-[36px] min-w-[36px] max-h-[36px] max-w-[36px] mx-1 border-0.5 border-primary-border"} />}
											</div>
											<div>
												{item.bizfullname}
											</div>
										</div>
									</td>
								</tr>
							)) : <></>
						}
					</tbody>
				</table>
			</div>

		</div>
	)
}

export default ModalViewUsersRelated