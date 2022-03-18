import { FC, useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import SearchIcon from 'assets/icons/SearchIcon';
import TriangleDown from 'assets/icons/TriangleDown';
import { toast } from "react-toastify";
import { useTask } from "services/hooks/useTask";
import { useUsersProject } from "services/hooks/users/useUserSystem";
import type { User } from "typings/user";
import { UserSystemProps } from 'typings/users/userSystem';

type Props = {
	modalType: 'ADD_RELATION_USER' | 'LIST_ALL_RELATION_USER',
	toggle: () => void,
	refetch?: () => void,
	taskID: string,
	projectID: string,
	related?: Array<User>
}

const ModalAddRelationUser: FC<Props> = ({ taskID, projectID, related, modalType, refetch, toggle }) => {
	const relatedsID = related?.map(user => user._id.toString());
	const [hasDefault, setHasDefault] = useState(false);
	const [isShow, setIsShow] = useState(true);
	const [keyword, setKeyword] = useState("");
	const [idsChecked, setIdsChecked] = useState<Array<string>>(relatedsID || []);

	const { data: listUsersProject, hasNextPage, fetchNextPage, totalRecord } = useUsersProject({ 
		projectID,
		keyword
	}, modalType === 'ADD_RELATION_USER');

	const { addRelationUserAsync } = useTask({ taskID });

	const getStateChecked = useCallback((id: string) => {
		if(!hasDefault && relatedsID?.includes(id)) {
			return true;
		}

		return idsChecked.includes(id) ? true : false;
	}, [idsChecked]);

	const onClickCheckButton = (id: string) => {
		const check = idsChecked.includes(id);
		if (check) {
			const newList = [...idsChecked];
			newList.splice(newList.findIndex((e: any) => e == id), 1);
			setIdsChecked(newList);
		} else {
			const newList = [...idsChecked, id];
			setIdsChecked(newList);
		};
	};

	const getStateCheckedAll = useCallback(() => idsChecked.length == listUsersProject.length, [idsChecked]);

	const onClickCheckAll = () => {
		if (idsChecked.length == listUsersProject.length) {
			setIdsChecked([]);
		} else {
			const idsAll = listUsersProject.map((e: any) => e._id);
			setIdsChecked(idsAll);
		}
	};

	const handleConfirmAddRelationUser = async () => {
		if (!idsChecked || !idsChecked.length) {
			return toast.warning('Vui lòng chọn người liên quan');
		}

		const result = await addRelationUserAsync({
			taskID, related: idsChecked
		});

		if(result.error) {
			return toast.warning(result?.data?.message);
		}

		refetch && refetch();
		setIdsChecked([]);
		toggle();
		toast.success('Thêm người liên quan thành công');
	};

	useEffect(() => {
		setHasDefault(true);
	}, [])

	return (
		<div>
			<div className="flex items-center px-6 py-2.5 justify-between">
				<h3 className="text-2x-large font-bold" >
					{modalType === 'ADD_RELATION_USER' ? 'Thêm người liên quan' : 'Danh sách người liên quan'}
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

			{modalType === 'ADD_RELATION_USER' ? (
				<form className='px-[30px] mt-2' onSubmit={e => e.preventDefault()}>
					<div className='relative border-cbs-border border-0.5 flex items-center'>
						<SearchIcon className='absolute left-3 w-4 h-4' />
						<input 
							type="text" 
							placeholder='Nhập từ khóa tìm kiếm' 
							className='pl-9 py-3 text-medium w-full focus:outline-none bg-cbs-table-header'
							onChange={debounce((event: any) => setKeyword(event.target.value), 500)}
						/>
					</div>
					<div className='text-small overflow-auto' style={{ height: '470px' }}>
						<table>
							<thead>
								<tr className="sticky top-0 bg-white">
									<th className='px-1.5'>
										<div className='flex items-center'>
											<input 
												type='checkbox' 
												className='cbs-checkbox inline-block' 
												checked={getStateCheckedAll()}
												onChange={onClickCheckAll}
											/>
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
									(listUsersProject.length && isShow) ? listUsersProject.map((user: UserSystemProps) => (
										<tr key={user._id}>
											<td className='px-1.5 align-middle'>
												<input 
													type='checkbox' 
													className='cbs-checkbox'
													checked={getStateChecked(user._id)}
													onChange={() => onClickCheckButton(user._id)}
													// checked={Boolean(assigned[user._id]false 
													// onChange={e => handleChangeCheckbox(null, user)}
												/>
											</td>
											<td>
												<div className='flex items-center py-1'>
													<div className='w-10 h-10 object-cover rounded-full overflow-hidden mr-4'>
														<img className='w-full h-full' src={`${process.env.REACT_APP_URL_S3_USER}/${user.image}`} alt="" />
													</div>
													<div>
														{user.bizfullname}
													</div>
												</div>
											</td>
										</tr>
									)) : <></>
								}
							</tbody>
						</table>

						{hasNextPage && (
							<div className="w-full flex justify-center my-5">
							<button onClick={fetchNextPage}>
								<span className="text-primary">{`Xem thêm (${totalRecord - listUsersProject.length
								})`}</span>
							</button>
							</div>
						)}
					</div>
					<div className="flex justify-end py-3">
						<div>
							<button
								type="submit"
								className="px-4 py-2 rounded-md bg-primary text-white text-small leading-5 disabled:opacity-30 disabled:cursor-not-allowed"
								onClick={handleConfirmAddRelationUser}
							>
								Xác nhận
							</button>
						</div>
					</div>
				</form>
			) : (
				<div className='px-[30px] mb-3 text-small overflow-auto' style={{ height: '470px' }}>
					<table>
						<thead>
							<tr className="sticky top-0 bg-white">
								<th className='font-normal'></th>
							</tr>
						</thead>
						<tbody className='overflow-y-auto'>
							{
								(related?.length && isShow) ? related.map(userRelate => (
									<tr key={userRelate._id}>
										<td>
											<div className='flex items-center py-1'>
												<div className='w-10 h-10 object-cover rounded-full overflow-hidden mr-4'>
													<img className='w-full h-full' src={`${process.env.REACT_APP_URL_S3_USER}/${userRelate.image}`} alt="" />
												</div>
												<div>
													{userRelate.bizfullname}
												</div>
											</div>
										</td>
									</tr>
								)) : <></>
							}
						</tbody>
					</table>
				</div>
			)}
			
		</div>
	)
}

export default ModalAddRelationUser