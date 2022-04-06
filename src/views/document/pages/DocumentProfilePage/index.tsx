import { FC, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DOCUMENT_TYPES } from "apis/localdb";

// ========== Context ==========
import { ModalContext } from "views/document/contexts/modal";

// ========= Hooks =========
import { useQueryStatistical } from "services/hooks/document/useStatistical";

// ========== App common Components ==========
import {
	DocumentDropdown,
	ButtonCreate,
	ButtonMore,
	GroupActions,
	SearchInput
} from 'views/document/sharedComponents/common';

import { IPackage } from "typings/document";

const pkgs: Array<IPackage> = Array.from(Array(2).keys()).map((_, i) => ({
	id: i,
	title: "Đơn vị ban hành",
}));

export const DocumentProfilePage: FC = () => {
	const params = useParams<any>();

	const { toggleModal } = useContext(ModalContext);
	const [pkg, setPkg] = useState<IPackage>(pkgs[0]);

	const { data } = useQueryStatistical({ departmentID: params.id });
	return (
		<>
			{/* Content */}
			<div className="flex flex-1 flex-col overflow-hidden bg-cbs-gray">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
					<span className="text-x-large mr-7">Hồ sơ: Tất cả</span>
					<SearchInput
						classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2"
						onChange={() => 1}
					/>
					<DocumentDropdown
						data={pkgs}
						value={pkg.title}
						onSelectValue={setPkg}
					/>
					{/* <DropdownFilterButton /> */}
					<GroupActions className="flex items-center flex-1" />

					<ButtonCreate onClick={toggleModal} />
					<ButtonMore />
				</div>
				<div className="flex flex-wrap gap-y-3.5 flex-1 overflow-y-auto px-5 py-2.5">
					{data.map((elm, i) => {
						const formatData = {
							...elm,
							name: DOCUMENT_TYPES[elm.type - 1].text,
						};
						return (
							<Link className="document__card-container" key={i} to={`/pcm/project/${ params.id}/document/1/type/${formatData.type}`}>
								<div className="bg-white rounded-lg h-[150px] px-3.5 py-4 flex flex-col justify-between">
									<div className="flex justify-between">
										<h4 className="text-x-large">{formatData.name}</h4>
										<div>
											<div className="bg-cbs-secondary rounded-md px-2.5 py-0.5 text-x-small text-white">
												Monthly
											</div>
										</div>
									</div>
									<p className="text-3x-large">{formatData.totalDocument}</p>
									<div>
										<span className="bg-cbs-up text-cbs-up-text py-0.5 px-1 rounded-sm mr-2.5 text-small">
											{`${formatData.totalDocumentNew}+`}
										</span>
										<span className="text-medium">Tháng này</span>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</>
	);
};