import { FC, useCallback, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { useModal } from "services/hooks/useModal";
import debounce from "lodash/debounce";
import { SearchInput } from "shareComponents/common";

import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
import FolderIcon from "assets/images/icons8-folder.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
// import { Create, Update, DeleteGroup } from "../../modal";
import { usePcmPlanGroup } from "services/hooks/pcm/usePcmGroup";
import moment from "moment";

export const PcmGroupPage: FC = () => {
	const { id: projectID } = useParams<{ id: string }>();
	const [keyword, setKeyword] = useState("");

	const {   
		isLoading,
        refetch,
        data: listPcmPlanGroup,
        fetchNextPage: fetchNextPagePcmPlanGroup,
        hasNextPage: hasNextPagePcmPlanGroup,
        totalRecord,
		totalPage
        } = usePcmPlanGroup({ projectID, keyword }, true, false);

	return (
		<main className="h-full">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<p className="text-lg">Danh sách</p>
					<SearchInput
						classNameWrapper="ml-4"
						classNameInput="outline-none w-[296px]"
						onChange={debounce(
							(event: any) => setKeyword(event.target.value),
							500
						)}
					/>
				</div>
			</header>
			
			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r px-2 border-primary-border">
				<thead className="bg-cbs-table-header h-10 border-b border-primary-border">
					<tr className="text-left text-sm text-primary-gray">
						
						<th className="w-1/3 pb-1 pt-1">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Nội dung
							</div>
						</th>
						<th className="w-1/3 pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Mã hiệu
							</div>
						</th>
						<th className="w-1/3 pb-1 pt-1 font-normal">
							<div className="font-normal pl-2">Cập nhật lần cuối</div>
						</th>
					</tr>
				</thead>
				
				{listPcmPlanGroup && listPcmPlanGroup.length ?
					<tbody className="bg-primary-light text-left">
						{listPcmPlanGroup.map((item: any, index: number) => (
							<tr key={index} className="border-b border-primary-border h-10">
								<td className="py-1 px-2">
									<Link to={`/pcm/project/${projectID}/group/${item._id}`}>
										<div className="flex items-center">
											<img src={FolderIcon} alt="Folder" className="w-6 h-6 mr-2" />
											<p>{item.name}</p>
										</div>
									</Link>
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{item?.sign}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{moment(item.modifyAt).format("HH:mm DD/MM/YYYY")} {item?.userUpdate?.bizfullname}
								</td>
							</tr>
						))
						}
					</tbody> : <></>
				}
			</table>
			
			{hasNextPagePcmPlanGroup && (
				<div className="w-full flex justify-center my-5">
					<button onClick={() => fetchNextPagePcmPlanGroup()}>
						<span className="text-primary">
							{`Xem thêm (${totalRecord - listPcmPlanGroup.length})`}
						</span>
					</button>
				</div>
			)}
		</main>
	);
};
