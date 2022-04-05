import { FC, useEffect, useState } from "react";

import { SearchInput } from "shareComponents/common";
import { RouteComponentProps, useHistory, useLocation, useParams, Link } from "react-router-dom";
import debounce from "lodash/debounce";

import iconDownload from 'assets/images/icons8-download-48_2.png';
import iconPdf from 'assets/images/icons8-pdf.svg';

//HOOK
import { usePcmProject } from "services/hooks/pcm/usePcmProject";
import {
	useQueryListDocument,
  } from "services/hooks/ppt/useDocument";

const ProjectDrawingPage: FC = () => {
	const [keyword, setKeyword] = useState("");
	// ID của dự án
	const { id: projectID, documentID } = useParams<{ id: string, documentID: string }>();
	// Call hook lấy thông tin project
	const { infoDepartment } = usePcmProject({ departmentID: projectID });
	useEffect(() => {
		document.title = `${infoDepartment?.data?.sign}.${infoDepartment?.data?.name}`
	}, []);

	const { data: listDocumentParent, totalRecord, totalPages, loading, nextCursor, refetch }   = useQueryListDocument(projectID, { type:" 9", parentID: documentID, keyword }, "");
	useEffect(() => {
		refetch();
	}, [keyword]);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			{/* Content */}
			<div className="flex overflow-auto flex-1">
				<div className="w-[330px] border-r border-cbs-border h-full">
					{
						!documentID && listDocumentParent?.map((document, index) => (
							<div key={index} className="flex gap-x-2.5 px-4 pt-3 pb-2 hover:bg-cbs-active-comment">
								<div>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
									</svg>
								</div>
								<div>
									<Link to={`/pcm/project/${projectID}/drawing/${document._id}`} className="align-top">
										<h3 className="font-bold">{document?.name}</h3>
										<p>{document?.amountDocumentChild} bản vẽ</p>
									</Link>
								</div>
							</div>
						))
					}
				</div>
				<div className="flex-1 pt-1.5 pb-8 px-4 h-full overflow-auto">
					<SearchInput placeholder="Tìm kiếm bản vẽ" classNameWrapper="rounded-sm flex bg-cbs-left-menu" 	onChange={debounce(
							(event: any) => setKeyword(event.target.value),
							500
						)} />
					<div className="grid grid-cols-6 gap-4 mt-2">
						{ documentID &&listDocumentParent?.map((document, index) => 
							<Link  key={index} to={`/ppt/project/${projectID}/document/${document._id}`} className="align-top">
								<div className="border-0.5 border-cbs-border">
									<div className="flex p-2 min-h-[90px]">
										<img src={iconPdf} alt="" className="self-start w-6 mr-2" />
										<div>
											<h3 className="text-small" style={{ wordBreak: 'break-all' }}>{document?.name}</h3>
											<p className="text-x-small mt-1.5 text-cbs-subtext">Rev 1 - 159 KB</p>
										</div>
									</div>
									<div className="flex justify-evenly w-full bg-cbs-table-header px-3.5 py-1">
										<button type="button">
											<img src={iconDownload} alt="download icon" className="w-6 h-6" />
										</button>
										<button type="button">
											<img src={iconDownload} alt="download icon" className="w-6 h-6" />
										</button>
										<button type="button">
											<img src={iconDownload} alt="download icon" className="w-6 h-6" />
										</button>
									</div>
								</div>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectDrawingPage;