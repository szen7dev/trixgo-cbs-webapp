import { ChangeEvent, FC, useState } from 'react';

import { captureException } from "@sentry/react";
import { toast } from "react-toastify";
import { useTask } from "services/hooks/useTask";
import { TOAST_DEFAULT_OPTIONS } from 'utils/constants';
import { Task } from 'typings/task';

type Props = {
	closeModal: () => void,
	onConfirm?: () => void,
	task: Task,
}

export const ModalUpdateTaskProduct: FC<Props> = ({ task, closeModal, onConfirm }) => {
	const [formData, setFormData] = useState({
		unit: task.unit,
		quantity: task.quantity,
		unitPrice: task.unitPrice,
		amountoftime: task.amountoftime,
	});

	const { updateTaskAsync } = useTask({});

	const handleConfirm = async () => {
		try {
			const { error, data } = await updateTaskAsync({
				taskID: task._id,
				...formData
			});

			if(error) return toast.warn(data?.message);

			onConfirm?.();
			toast.success('Cập nhật thành công', TOAST_DEFAULT_OPTIONS);
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

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	return (
		<div>
			<div className="flex items-center px-6 py-2.5 justify-between">
				<h3 className="text-2x-large font-bold" >
					Cập nhật thông tin sản lượng
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
				<div className='relative'>
					<input
						className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 mb-3 placeholder-primary-gray bg-cbs-table-header"}
						placeholder={"Đơn vị tính"}
						name='unit'
						defaultValue={task.unit}
						onChange={handleChange}
					/>
					<input
						className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 mb-3 placeholder-primary-gray bg-cbs-table-header"}
						placeholder={"Khối lượng"}
						type="number"
						name='quantity'
						defaultValue={task.quantity}
						onChange={handleChange}
					/>
					<input
						className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 mb-3 placeholder-primary-gray bg-cbs-table-header"}
						placeholder={"Đơn giá"}
						type="number"
						name='unitPrice'
						defaultValue={task.unitPrice}
						onChange={handleChange}
					/>
					<input
						className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 mb-3 placeholder-primary-gray bg-cbs-table-header"}
						placeholder={"Dự kiến thời lượng (giờ)"}
						type="number"
						name='amountoftime'
						defaultValue={task.amountoftime}
						onChange={handleChange}
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