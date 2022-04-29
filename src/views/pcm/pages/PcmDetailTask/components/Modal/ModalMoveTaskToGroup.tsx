import { FC, UIEvent, useState } from 'react';

import { captureException } from "@sentry/react";
import debounce from 'lodash/debounce';
import { toast } from "react-toastify";
import { usePcmPlanGroup } from "services/hooks/pcm/usePcmGroup";
import { useTask } from "services/hooks/useTask";
import { DropdownSearchable } from "shareComponents/common";
import { TOAST_DEFAULT_OPTIONS } from 'utils/constants';
import { PcmPlanGroup } from 'typings/pcm/pcm_group';

type Props = {
	toggle: () => void,
	taskID: string,
	projectID: string,
}

const ModalMoveTaskToGroup: FC<Props> = ({ taskID, projectID, toggle }) => {
	const [groupID, setGroupID] = useState("");
	const [keyword, setKeyword] = useState("");

	const { moveTaskToGroupAsync } = useTask({});

	const {
        data: listPcmPlanGroup,
        fetchNextPage,
        hasNextPage,
	} = usePcmPlanGroup({
		isShowParentAndChild: true,
		projectID,
		keyword,
		populates: JSON.stringify({
			path: 'company',
			select: '_id name sign'
		})
	}, true);

	const handleConfirm = async () => {
		if(!groupID) return toast.warn('Vui lòng chọn nhóm dữ liệu', TOAST_DEFAULT_OPTIONS);

		try {
			const { error, data } = await moveTaskToGroupAsync({
				taskID,
				groupID
			});

			if(error) return toast.warn(data?.message);

			toast.success('Di chuyển thành công', TOAST_DEFAULT_OPTIONS);
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

	const handleScroll = (e: UIEvent<HTMLDivElement>) => {
		const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
		const bottom = scrollHeight - scrollTop === clientHeight;

		if(bottom && hasNextPage) {
			fetchNextPage();
		}
	}

	return (
		<div>
			<div className="flex items-center px-6 py-2.5 justify-between">
				<h3 className="text-2x-large font-bold" >
					Di chuyển tới nhóm dữ liệu
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
					<div className={"text-gray-500 mb-2"}>Tìm nhóm dữ liệu</div>
					<DropdownSearchable
						onchangeValue={(item: any) => setGroupID(item.value)}
						onClearData={() => setGroupID("")}
						onSearchInputChange={debounce(
							(value) => setKeyword(value),
							500
						)}
						onScroll={handleScroll}
						className={"w-full flex-1 focus:outline-none bg-cbs-table-header"}
						placeholder="Nhóm dữ liệu"
						isMultiple={false}
						allowClearValueSingleInput={true}
						showTriangle={true}
						maxWidthInput="max-w-none"
						data={listPcmPlanGroup.reduce((prev: any, curr: PcmPlanGroup) => {
							if(curr._id === taskID) return prev;

							prev[prev.length] = {
								value: curr._id,
								label: `${curr.sign}.${curr.name}`
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

export default ModalMoveTaskToGroup