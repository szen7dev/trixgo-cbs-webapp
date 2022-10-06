import { FC, UIEvent, useState } from 'react';

import { captureException } from "@sentry/react";
import debounce from 'lodash/debounce';
import { toast } from "react-toastify";
import { useTask } from "services/hooks/useTask";
import { DropdownSearchable } from "shareComponents/common";
import { Task } from 'typings/task';
import { TOAST_DEFAULT_OPTIONS } from 'utils/constants';

type Props = {
	closeModal: () => void,
  	onConfirm?: () => void,
	taskID: string,
	projectID: string,
}

export const ModalMoveTaskToParent: FC<Props> = ({ taskID, projectID, closeModal, onConfirm }) => {
	const [parentID, setParentID] = useState("");
	const [keyword, setKeyword] = useState("");

	const {
		moveTaskToParentAsync,
		listTasks,
		hasNextPage,
		nextPageListTask
	} = useTask({
		params: {
			keyword,
			projectID
		},
		isFetch: true
	});

	const handleConfirm = async () => {
		if(!parentID) return toast.warn('Vui lòng chọn công việc cha', TOAST_DEFAULT_OPTIONS);

		try {
			const { error, data } = await moveTaskToParentAsync({
				taskID,
				parentID
			});

			if(error) return toast.warn(data?.message);

      		onConfirm?.();
			toast.success('Di chuyển thành công', TOAST_DEFAULT_OPTIONS);
		} catch (error) {
			captureException(error);
			if(error instanceof Error)
			  toast.error(error.message);
			if(typeof error === 'string')
			  toast.error(error);
		} finally {
			closeModal();
		}
	};

	const handleScroll = (e: UIEvent<HTMLDivElement>) => {
		const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
		const bottom = scrollHeight - scrollTop === clientHeight;

		if(bottom && hasNextPage) {
			nextPageListTask();
		}
	}

	return (
		<div>
			<div className="flex items-center px-6 py-2.5 justify-between">
				<h3 className="text-2x-large font-bold" >
					Di chuyển tới việc cha
				</h3>
				<button
					type="button"
					onClick={closeModal}
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

			<div className='px-[30px] mt-2'>
				<div className='relative' style={{ height: '270px' }}>
					<div className={"text-gray-500 mb-2"}>Tìm việc cha</div>
					<DropdownSearchable
						onchangeValue={(item: any) => setParentID(item.value)}
						onClearData={() => setParentID("")}
						onSearchInputChange={debounce(
							(value) => setKeyword(value),
							500
						)}
						onScroll={handleScroll}
						className={"w-full flex-1 focus:outline-none bg-cbs-table-header"}
						placeholder="Việc cha"
						isMultiple={false}
						allowClearValueSingleInput={true}
						showTriangle={true}
						maxWidthInput="max-w-none"
						data={listTasks.reduce((prev: any, curr: Task) => {
							if(curr._id === taskID) return prev;

							prev[prev.length] = {
								value: curr._id,
								label: curr.name
							}

							return prev;
						}, [])}
						formatItem={{
							id: "value",
							text: "label",
						}}
						inlineSearch={true}
					/>
				</div>
				<div className="flex justify-end py-3">
					<div>
						<button
							className="px-4 py-2 rounded-md bg-primary text-white text-small leading-5 disabled:opacity-30 disabled:cursor-not-allowed"
							onClick={handleConfirm}
						>
							Xác nhận
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}