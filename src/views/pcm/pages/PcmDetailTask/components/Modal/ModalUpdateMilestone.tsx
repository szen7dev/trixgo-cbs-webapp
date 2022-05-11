import { FC, UIEvent, useState, useEffect } from 'react';
import { useQuery } from "react-query";

import { captureException } from "@sentry/react";
import debounce from 'lodash/debounce';
import { toast } from "react-toastify";
import { usePcmPlanGroup } from "services/hooks/pcm/usePcmGroup";
import { useTask } from "services/hooks/useTask";
import { DropdownSearchable } from "shareComponents/common";
import { TOAST_DEFAULT_OPTIONS } from 'utils/constants';
import { PCM_MILESTONE } from "apis/localdb/index";
import TaskRepository from "apis/task";

type Props = {
	toggle: () => void,
	taskID: string,
	projectID: string,
}

const ModalUpdateMilestone: FC<Props> = ({ taskID, projectID, toggle }) => {
	const [milestone, setMilestone] = useState<any>();
	const [keyword, setKeyword] = useState("");
	const { updateTaskAsync } = useTask({});

	const handleConfirm = async () => {
		if(!milestone && milestone != 0) return toast.warn('Vui lòng chọn cột mốc', TOAST_DEFAULT_OPTIONS);

		try {
			const { error, data } = await updateTaskAsync({
				taskID,
				milestone
			});

			if(error) return toast.warn(data?.message);
			toast.success('Gán cột mốc thành công', TOAST_DEFAULT_OPTIONS);
			refetchInfoTask();
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

	const { data: infoTask, refetch: refetchInfoTask, isLoading } = useQuery(`task_info.${taskID}`, () =>
		TaskRepository.taskInfo({ taskID }),
		{ refetchOnWindowFocus: false }
	);

	useEffect(() => {
		setMilestone(infoTask.data.milestone);
    }, [infoTask]);

	return (
		<div>
			<div className="flex items-center px-6 py-2.5 justify-between">
				<h3 className="text-2x-large font-bold" >
					Gán phân loại cột mốc
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

			<div className='px-[30px] mt-2'>
				<div className='relative' style={{ height: '270px' }}>
					<div className={"text-gray-500 mb-2"}>Tìm phân loại cột mốc</div>
					<DropdownSearchable
						onchangeValue={(item: any) => setMilestone(item.value)}
						onClearData={() => setMilestone("")}
						onSearchInputChange={debounce(
							(value) => setKeyword(value),
							500
						)}
						className={"w-full flex-1 focus:outline-none bg-cbs-table-header"}
						placeholder="Nhóm dữ liệu"
						isMultiple={false}
						allowClearValueSingleInput={true}
						showTriangle={true}
						maxWidthInput="max-w-none"
						initialValue={
							{
								id: infoTask.data.milestone,
								text: PCM_MILESTONE[infoTask.data.milestone]?.text || "Vui lòng chọn cột mốc"
							}
						}
						data={PCM_MILESTONE.map((milestone: any) => {
							return {value: milestone.value, label: milestone.text};
						})}
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

export default ModalUpdateMilestone