import { FC, Fragment, useState } from "react";

import DocumentDropdown from "../components/DocumentDropdown";

import { IPackage, IProjects } from "typings/document";
import ButtonCreate from "../components/common/ButtonCreate";
import ButtonMore from "../components/common/ButtonMore";
import SearchInput from "components/common/SearchInput";
import DropdownFilterButton from "../components/DocumentFilterButton";
import GroupActions from "../components/projects/GroupActions";

const pkgs: Array<IPackage> = Array.from(Array(2).keys()).map((_, i) => ({
	id: i,
	title: 'Đơn vị ban hành',
}))

interface IProfile {
	id: number | string,
	total: number,
	title: string,
	type: string,
	value: number,
}

const data: Array<IProfile> = Array.from(Array(30).keys()).map((_, i) => ({
	id: i,
	total: 123123,
	title: 'Quyết định',
	type: 'weekly',
	value: 100,
}))

const DocumentProfilePage: FC = () => {
	const [pkg, setPkg] = useState<IPackage>(pkgs[0])

	return (
		<>
			{/* Content */}
			<div className="flex flex-1 flex-col overflow-hidden bg-cbs-gray">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
					<span className="text-x-large mr-7">Hồ sơ: Tất cả</span>
					<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2" onChange={() => 1} />
					<DocumentDropdown
						data={pkgs}
						value={pkg.title}
						onSelectValue={setPkg}
					/>
					<DropdownFilterButton />
					<GroupActions className="flex items-center flex-1" />

					<ButtonCreate />
					<ButtonMore />
				</div>
				<div className="flex flex-wrap gap-x-3 gap-y-3.5 flex-1 overflow-y-auto px-5 py-2.5">
					{data.map((d, i) => (
						i % 2
							? <div className="bg-white rounded-lg w-[300px] h-[150px] px-3.5 py-4 flex flex-col justify-between">
								<div className="flex justify-between">
									<h4 className="text-x-large">Quyết định</h4>
									<div>
										<div className="bg-cbs-secondary rounded-md px-2.5 py-0.5 text-x-small text-white">weekly</div>
									</div>
								</div>
								<p className="text-3x-large">24.532</p>
								<div>
									<span className="bg-cbs-up text-cbs-up-text py-0.5 px-1 rounded-sm mr-2.5 text-small">+355</span>
									<span className="text-medium">Tuần này</span>
								</div>
							</div>
							: <div className="bg-white rounded-lg w-[300px] h-[150px] px-3.5 py-4 flex flex-col justify-between">
								<div className="flex justify-between">
									<h4 className="text-x-large">Hợp đồng kinh tế</h4>
									<div>
										<div className="bg-cbs-secondary rounded-md px-2.5 py-0.5 text-x-small text-white">weekly</div>
									</div>
								</div>
								<p className="text-3x-large">24.532</p>
								<div>
									<span className="bg-cbs-down text-cbs-down-text py-0.5 px-1 rounded-sm mr-2.5 text-small">-355</span>
									<span className="text-medium">Tuần này</span>
								</div>
							</div>
					))}
				</div>
			</div>
		</>
	);
};

export default DocumentProfilePage;
