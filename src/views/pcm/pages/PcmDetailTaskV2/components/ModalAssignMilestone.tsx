import { FC, useState } from 'react';

import { captureException } from "@sentry/react";
import { toast } from "react-toastify";
import { useTask } from "services/hooks/useTask";
import { DropdownSearchable } from "shareComponents/common";
import { TOAST_DEFAULT_OPTIONS } from 'utils/constants';
import { PCM_MILESTONE } from 'apis/localdb';

type Props = {
	closeModal: () => void,
  	onConfirm?: () => void,
	taskID: string,
	milestone: number,
}

export const ModalAssignMilestone: FC<Props> = ({ taskID, milestone, closeModal, onConfirm }) => {
	const [milestoneSelected, setMilestoneSelected] = useState(0);

	const { updateTaskAsync } = useTask({});
	
	const handleConfirm = async () => {
		try {
			const { error, data } = await updateTaskAsync({
				taskID,
				milestone: milestoneSelected
			});

			if(error) return toast.warn(data?.message);

      		onConfirm?.();
			toast.success('Cập nhật cột mốc thành công', TOAST_DEFAULT_OPTIONS);
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

	return (
		<div>
			<div className="flex items-center px-6 py-2.5 justify-between">
				<h3 className="text-2x-large font-bold" >
					Cập nhật cột mốc công việc
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
					<div className={"text-gray-500 mb-2"}>Lựa chọn cột mốc</div>
					<DropdownSearchable
						onchangeValue={(item: any) => setMilestoneSelected(item.value)}
						onClearData={() => setMilestoneSelected(0)}
						className={"w-full flex-1 focus:outline-none bg-cbs-table-header"}
						placeholder="Cột mốc"
						isMultiple={false}
						allowClearValueSingleInput={false}
						showTriangle={true}
						maxWidthInput="max-w-none"
						data={
							[
								{
									value: -1,
									label: "Hủy chọn"
								},
								...PCM_MILESTONE.map(milestone => ({
									value: milestone.value,
									label: milestone.text
								}))
							]
							
						}
						initialValue={{
							value: milestone,
							label: PCM_MILESTONE[milestone]?.text
						}}
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