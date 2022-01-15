import { FC, useContext, useEffect, useMemo } from "react";

import cn from "classnames";
import { Route, RouteComponentProps, Switch, useHistory } from "react-router-dom";

import { Context } from 'views/pages/document/contexts/contextModal';

import LayoutProjectBidding from "./components/layouts/LayoutProjectBidding";
import Paginate from "components/common/Paginate";
import SearchInput from "components/common/SearchInput";

import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import GroupActions from "views/pages/document/components/projects/GroupActions";
import ButtonCreate from "views/pages/document/components/common/ButtonCreate";
import ButtonMore from "views/pages/document/components/common/ButtonMore";

function getStatus(status: number) {
	if (status === 1)
		return "Chưa triển khai";
	if (status === 2)
		return "Đang triển khai";

	return "Đã hoàn thành";
}

const ProjectBidding: FC = () => {
	const { toggleModal } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		document.title = "CHG.THT-Lựa chọn nhà thầu"
	}, []);
	const data = useMemo(() => Array.from({ length: 30 }).map((_, index) => ({
		_id: index,
		project: index % 2 ? "Thi công rà phá bom mìn, vật nổ" : 'Thi công ép cọc thí nghiệm, thí nghiệm cọc thí nghiệm và thi công ép cọc đại trà',
		joined: 8,
		worked: 15,
		created_at: "15:30 22/12/2021",
		updated_at: "15:30 22/12/2021",
		status: index,
	})), []);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
				<span className="text-x-large mr-7">Hồ sơ dự thầu</span>
				<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
				<DropdownFilterButton />
				<GroupActions className="flex items-center flex-1" />

				<ButtonCreate onClick={toggleModal} />
				<ButtonMore />
			</div>
			<div className="flex-1 overflow-y-auto">
				<table className="text-black text-medium border-separate space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
					<thead className="">
						<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
							<th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-1">
								<input className="cbs-checkbox" type="checkbox" value="" id="flexCheckDefault" ref={input => { if (input) input.indeterminate = true }} />
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Gói thầu
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Số nhà thầu tham dự
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Số công việc triển khai
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
								<span className="pl-2 border-l border-cbs-border">
									Thời điểm mời thầu
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
								<span className="pl-2 border-l border-cbs-border">
									Thời điểm nộp thầu
								</span>
							</th>
							<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
								<span className="pl-2 border-l border-cbs-border">
									Trạng thái
								</span>
							</th>
						</tr>
					</thead>
					<tbody className="text-small">
						{
							data.map(({
								_id,
								project,
								joined,
								worked,
								created_at,
								updated_at,
								status,
							}) => {
								return (
									<tr key={_id} className="text-left hover:bg-cbs-active-comment cursor-pointer" onClick={() => history.push('/')}>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" onClick={e => e.stopPropagation()}>
											<input className="" type="checkbox" value="" id="flexCheckDefault" />
										</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{project}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{joined}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{worked}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{created_at}</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{updated_at}</td>
										<td className={cn("pt-2.5 pb-3 px-2 border-b border-cbs-border", { "text-cbs-primary": status === 1, "text-cbs-completed": status === 2 })}>{getStatus(status)}</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
			<Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" />
		</div >
	);
};

const ProjectBiddingPage: FC<RouteComponentProps> = (props) => {
	return <LayoutProjectBidding {...props}>
		<Switch>
			<Route exact path={props.match.url}>
				<ProjectBidding />
			</Route>
			<Route exact path={props.match.url + '/1'}>
				{/* <ProjectBidding /> */}
				2
			</Route>
			<Route exact path={props.match.url + '/2'}>
				{/* <ProjectBidding /> */}
				3
			</Route>
		</Switch>
	</LayoutProjectBidding>
}
export default ProjectBiddingPage;