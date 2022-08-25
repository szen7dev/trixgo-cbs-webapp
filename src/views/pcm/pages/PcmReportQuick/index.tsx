/**
 * Libraries
 */
import { FC } from "react";
import { Link, useParams } from "react-router-dom";

/**
 * Components, Assets
 */
import { RelatedResponse } from './components';
import 'views/pcm/styles/pcm_report_quick.module.css';

/**
 * Context
 */
import ResponseProvider from 'views/pcm/contexts/response/comment.provider';

/**
 * Hooks, Typings
 */
import { useProject } from "services/hooks/items/useProject";

const PcmReportQuick: FC = () => {
	const { id: projectID } = useParams<{ id: string }>();

	const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID
		},
		isFetchInfo: true
	})

	return (
		<main className="h-full overflow-y-auto comment__wrapper">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<Link to={`/pm/project/${projectID}/dashboard`}>
						<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
						</svg>
					</Link>
					<p className="text-lg ml-2">Trở lại</p>
				</div>
			</header>

			<div className="flex-1 z-0 text-black custom-scroll">
				<div className="comment__container text-black pt-3">
					<p className="text-lg px-5">Báo cáo nhanh dự án</p>
					<RelatedResponse project={projectInfo} />
				</div>
            </div>
		</main>
	);
};

const PcmReportQuickPage: FC = () => {
	return (
		<ResponseProvider>
			<PcmReportQuick />
		</ResponseProvider>
	)
}

export default PcmReportQuickPage