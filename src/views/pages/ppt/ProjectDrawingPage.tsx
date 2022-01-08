import { FC, useContext, useEffect } from "react";

// Context
import { Context as ModalContext, Provider as ModalProvider } from "../document/contexts/contextModal";

import SearchInput from "components/common/SearchInput";
import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import ButtonCreate from "views/pages/document/components/common/ButtonCreate";
import ButtonMore from "views/pages/document/components/common/ButtonMore";
import ModalCreateDocument from "../document/components/common/ModalCreateDocument";
import ChartReportByTime from "./components/chart/ChartReportByTime";
import generateImageLink from "../media/utils/images";
import classNames from "classnames";

import iconDownload from 'assets/images/icons8-download-48_2.png';
import iconPdf from 'assets/images/icons8-pdf.svg';

const ProjectDrawing: FC = () => {
	const { toggleModal } = useContext(ModalContext)

	useEffect(() => {
		document.title = "CHG.THT-Hình ảnh"
	}, []);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
				<span className="text-x-large mr-7">Danh sách</span>
				<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
				<DropdownFilterButton className="mr-auto" />

				<ButtonCreate onClick={toggleModal} />
				<ButtonMore />
			</div>
			{/* Content */}
			<div className="flex overflow-auto flex-1">
				<div className="w-[330px] border-r border-cbs-border h-full">
					{
						Array.from({ length: 3 }).map((_, index) => (
							<div key={index} className="flex gap-x-2.5 px-4 pt-3 pb-2 hover:bg-cbs-active-comment">
								<div>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
									</svg>
								</div>
								<div>
									<h3 className="font-bold">Bản vẽ phần hoàn thiện toàn bộ hạng mục công trình</h3>
									<p>182 bản vẽ</p>
								</div>
							</div>
						))
					}
				</div>
				<div className="flex-1 pt-1.5 pb-8 px-4 h-full overflow-auto">
					<SearchInput placeholder="Tìm kiếm bản vẽ" classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
					<div className="grid grid-cols-6 gap-4 mt-2">
						{Array.from({ length: 37 }).map((_, index) => <div key={index} className="border-0.5 border-cbs-border">
							<div className="flex p-2 min-h-[90px]">
								<img src={iconPdf} alt="" className="self-start w-6 mr-2" />
								<div>
									<h3 className="text-small" style={{ wordBreak: 'break-all' }}>AA.FF.RR.XXXX.YYY-A101.225</h3>
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
						</div>)}
					</div>
				</div>
			</div>
		</div>
	);
};

const ProjectDrawingPage: FC = () => {
	return (
		<ModalProvider>
			<ProjectDrawing />
			<ModalCreateDocument />
		</ModalProvider>
	)
}

export default ProjectDrawingPage;