import { FC, useEffect, useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { toast } from "react-toastify";
import { captureException } from "@sentry/react";

/**
 * Components, Assets
 */
import SearchIcon from 'assets/icons/SearchIcon';
import TriangleDown from 'assets/icons/TriangleDown';

/**
 * Hooks, Typings
 */
import { useUserSystem } from "services/hooks/users/useUserSystem";
import { UserSystemProps } from 'typings/users/userSystem';
import { useCashBook } from "services/hooks/financial/useCashBook";
import type { User } from "typings/user";

type Props = {
    cashbookId: string,
	modalType: 'admins' | 'members',
	toggle: () => void,
	refetch?: () => void,
	users: User[] | undefined,
    hasPermission: boolean
}

const ModalShare: FC<Props> = ({ cashbookId, users, modalType, refetch, toggle, hasPermission }) => {
	const usersID = users?.map(user => user._id) ?? [];
	const [hasDefault, setHasDefault] = useState(false);
	const [isShow, setIsShow] = useState(true);
	const [keyword, setKeyword] = useState("");
	const [idsChecked, setIdsChecked] = useState<string[]>(usersID || []);

    const {
        data: listUsersSystem,
        hasNextPage,
        fetchNextPage,
        totalRecord
    } = useUserSystem({ keyword }, true);

    const { updateAsync } = useCashBook({});

	const getStateChecked = useCallback((id: string) => {
		if(!hasDefault && usersID?.includes(id)) {
			return true;
		}

		return idsChecked.includes(id) ? true : false;
	}, [idsChecked]);

	const onClickCheckButton = (id: string) => {
		const isChecked = idsChecked.includes(id);
		if (isChecked) {
			const newList = [...idsChecked];
            const index = newList.findIndex((e: any) => e == id);
			newList.splice(index, 1);

			setIdsChecked(newList);
		} else {
			const newList = [...idsChecked, id];
			setIdsChecked(newList);
		};
	};

	const getStateCheckedAll = useCallback(() => idsChecked.length == listUsersSystem.length, [idsChecked]);

	const onClickCheckAll = () => {
		if (idsChecked.length == listUsersSystem.length) {
			setIdsChecked([]);
		} else {
			const idsAll = listUsersSystem.map((e: any) => e._id);
			setIdsChecked(idsAll);
		}
	};

	const handleConfirmShare = async () => {
        if(!hasPermission) {
            toggle();
			return toast.warning('Bạn không có quyền chia sẻ nội dung này');
        }

		if (!idsChecked || !idsChecked.length) {
			return toast.warning('Vui lòng chọn user để chia sẻ');
		}

        try {
            const { error, data } = await updateAsync({
                cashBookID: cashbookId,
                [modalType]: idsChecked,
            })

            if(error) return toast.warn(data?.message);

            refetch?.();
            toast.success('Cập nhật thành công');
        } catch (error) {
            captureException(error);
            if(error instanceof Error)
                toast.error(error.message);
            if(typeof error === 'string')
                toast.error(error);
        } finally {
            toggle();
        }
	};

	useEffect(() => {
		setHasDefault(true);
	}, [])

	return (
		<div>
			<div className="flex items-center px-6 py-2.5 justify-between">
				<h3 className="text-2x-large font-bold" >
					{modalType === 'admins' ? 'Thêm admin' : 'Thêm member'}
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
                {(users && users.length) ? (
                    <div className='relative flex items-center'>
                        <div className="box-content overflow-auto h-auto w-full p-4 border-4 text-cbs-primary">
                            {users?.map((item, index) => (index + 1) !== users.length ? `${item.bizfullname} | ` : item.bizfullname)}
                        </div>
                    </div>
                ) : ''}
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
                                (listUsersSystem.length && isShow) ? listUsersSystem.map((user: UserSystemProps) => (
                                    <tr key={user._id}>
                                        <td className='px-1.5 align-middle'>
                                            <input
                                                type='checkbox'
                                                className='cbs-checkbox'
                                                checked={getStateChecked(user._id)}
                                                onChange={() => onClickCheckButton(user._id)}
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
                            <span className="text-primary">{`Xem thêm (${totalRecord - listUsersSystem.length
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
                            onClick={handleConfirmShare}
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </form>
		</div>
	)
}

export default ModalShare;