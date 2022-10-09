import { FC, UIEvent, useState } from 'react';

import { captureException } from "@sentry/react";
import { toast } from "react-toastify";
import { useTask } from "services/hooks/useTask";
import { DropdownSearchable } from "shareComponents/common";
import { TOAST_DEFAULT_OPTIONS } from 'utils/constants';
import { PCM_MILESTONE } from 'apis/localdb';
import { useListDocument } from 'services/hooks/document/useDocument';

type Props = {
	closeModal: () => void,
  	onConfirm?: () => void,
	taskID: string,
	projectID: string;
	linksDocs: Array<string>,
}

export const ModalDocLinkTask: FC<Props> = ({ taskID, projectID, linksDocs, closeModal, onConfirm }) => {
	const [docSelected, setDocSelected] = useState('');

	const { updateTaskAsync } = useTask({});

	const {
		listDocument,
		hasNextPage,
		isLoading,
		fetchNextPageDocument
	} = useListDocument({
        params: {
            // departmentID: projectID,
            limit: "20",
        },
        isFetchList: !!projectID
    });

	const handleConfirm = async () => {
		if(!docSelected) return toast.warn('Vui lòng chọn 1 hồ sơ');

		try {
			const { error, data } = await updateTaskAsync({
				taskID,
				linksDocs: [docSelected]
			});

			if(error) return toast.warn(data?.message);

      		onConfirm?.();
			toast.success('Link hồ sơ thành công', TOAST_DEFAULT_OPTIONS);
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
		const bottom = scrollHeight - scrollTop >= clientHeight - 10;

		if(hasNextPage && bottom) {
			fetchNextPageDocument();
		}
	}

	if(!isLoading && (!listDocument || !listDocument.length)) {
		return <></>
	}
	console.log({ listDocument })

	return (
		<div>
			<div className="flex items-center px-6 py-2.5 justify-between">
				<h3 className="text-2x-large font-bold" >
					Cập nhật hồ sơ link tới công việc
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
					<div className={"text-gray-500 mb-2"}>Lựa chọn hồ sơ</div>

					{!!listDocument?.length && (
						<DropdownSearchable
							onchangeValue={(item: any) => setDocSelected(item.value)}
							onClearData={() => setDocSelected('')}
							className={"w-full flex-1 focus:outline-none bg-cbs-table-header"}
							placeholder="Hồ sơ văn bản"
							isMultiple={false}
							allowClearValueSingleInput={false}
							showTriangle={true}
							maxWidthInput="max-w-none"
							onScroll={handleScroll}
							data={listDocument?.map((doc: any) => ({
								value: doc._id,
								label: doc.name
							}))}
							formatItem={{
								id: "value",
								text: "label",
							}}
							inlineSearch={true}
						/>
					)}
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