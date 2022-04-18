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
import { DatahubContact } from "views/datahub/pages";

const pkgs: Array<IPackage> = Array.from(Array(2).keys()).map((_, i) => ({
	id: i,
	title: "Đơn vị ban hành",
}));

export const DocumenDatahubContactPage: FC = () => {
	const params = useParams<any>();

	const { toggleModal } = useContext(ModalContext);
	const [pkg, setPkg] = useState<IPackage>(pkgs[0]);
	const { data } = useQueryStatistical({ departmentID: params.id, isDatahubContact: "1" });
	console.log({ data })
	return (
		<>
			{/* Content */}
			<div className="flex flex-1 flex-col overflow-hidden bg-cbs-gray">
				<div className="flex flex-wrap gap-y-3.5 overflow-y-auto px-5 py-2.5">
					{data?.map((elm: any, i) => {
						const formatData = {
							...elm,
							name: elm.datahubContact.name,
						};
						return (
							<Link className="document__card-container" key={i} to={`/pcm/project/${ params.id}/document/1/datahubContact/${formatData.datahubContact._id}`}>
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