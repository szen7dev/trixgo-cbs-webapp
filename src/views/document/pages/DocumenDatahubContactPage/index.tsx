import React, { FC, useContext, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { DOCUMENT_TYPES } from "apis/localdb";

// ========== Context ==========
import { ModalContext } from "views/document/contexts/modal";

// ========= Hooks =========
import { useQueryStatistical } from "services/hooks/document/useStatistical";

// ========== App common Components ==========

import { IPackage } from "typings/document";
import {NavigateTab} from "../../sharedComponents/common";

export const DocumenDatahubContactPage: FC = () => {
	const location = useLocation()
	const params = useParams<any>();
	const { data } = useQueryStatistical({ departmentID: params.id, isDatahubContact: "1" });
	return (
		<>
			{/* Content */}
			<div className="flex flex-1 flex-col overflow-hidden h-full">
				<div className={"sticky top-0 z-10"}>
					<div className={"flex items-center pb-2"}>
						<NavigateTab/>
					</div>
				</div>
				<div className="flex flex-wrap gap-y-3.5 overflow-y-auto px-5 py-2.5">
					{data?.map((elm: any, i) => {
						const formatData = {
							...elm,
							name: elm.datahubContact.name,
						};
						let linkRef;
						if(location.pathname.includes("/document/project/")){
							linkRef = `/document/project/${params.id}/document/1/datahubContact/${formatData.datahubContact._id}`
						}else{
							linkRef = `/pm/project/${params.id}/document/1/datahubContact/${formatData.datahubContact._id}`
						}
						return (
							<Link className="document__card-container" key={i} to={linkRef}>
								<div className="bg-white border-0.5 border-primary-border rounded-lg h-[150px] px-3.5 py-4 flex flex-col justify-between">
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

export default DocumenDatahubContactPage;