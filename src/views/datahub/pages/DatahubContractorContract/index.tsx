/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useMemo, useState } from "react";

import { SearchInput } from "shareComponents/common";
import ModalCreateContract from "./components/ModalCreateContract";

// import DropdownFilterButton from "views/document/components/DocumentFilterButton";
import { GroupActions,ButtonCreate, ButtonMore } from "shareComponents/common";
import { DocumentDropdown } from "views/document/sharedComponents/common";
import ModalExtraLarge from "shareComponents/common/ModalContainer/components/ModalExtraLarge";
import { DatahubContract } from "typings/datahub/contract";
import { useContractorCompany } from "views/datahub/contexts/Company";
import useInfinitePackage from "services/hooks/datahub/package/useInfinitePackage";

import getColumnsContractorContract from "views/datahub/utils/getColumnsContractorContract";
import { TableWithoutContext } from "shareComponents/common/Table";
import { useRowSelect, useTable } from "react-table";

const pkgs = Array.from(Array(2).keys()).map((_, i) => ({
	id: i as string | number,
	title: "Thẻ lọc chính" as string | number,
}));

const DatahubContractorContract: FC = () => {
	const [pkg, setPkg] = useState(pkgs[0]);
	const [show, setShow] = useState(false);
	const [keyword, setKeyword] = useState('');

	// Get data contractur
	const { data: company } = useContractorCompany();
	const { data, isLoading } = useInfinitePackage(
		['datahub_packages', keyword, company!.data._id],
		{ keyword, contractorID: company?.data._id || '', populates: JSON.stringify({ path: 'field' }) },
		{ enable: Boolean(company?.data._id) }
	);

	const [selected, setSelected] = useState<DatahubContract | Record<string, any>>({});

	// Table handling
	const columns = useMemo(getColumnsContractorContract, []);
	const _data = useMemo(() => data?.pages.flatMap(p => p.data.listRecords) || [], [data]);

	const instance = useTable({ columns, data: _data, getRowId: (row) => row._id }, useRowSelect);

	useEffect(() => {
		document.title = "CHG.THT-Lựa chọn nhà thầu";
	}, []);

	return (
		<div className="w-full px-3.5 ">
			<div className="bg-white border-cbs-border border-[0.5px]">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
					<span className="text-x-large mr-7">Hợp đồng minh chứng</span>
					{/* <SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} /> */}
					{/* <DocumentDropdown
						data={pkgs}
						value={pkg.title}
						onSelectValue={setPkg}
					/> */}
					{/* <DropdownFilterButton /> */}
					<GroupActions
						className="flex items-center flex-1"
						onClickPencil={() => { setShow(true); setSelected(instance.selectedFlatRows[0]) }}
						disabled={{
							pencil: instance.selectedFlatRows.length !== 1,
						}}
					/>

					<ButtonCreate onClick={() => { setShow(!show); setSelected({}) }} />
					{/* <ButtonMore /> */}
				</div>
				<div className="overflow-auto relative">
					<TableWithoutContext
						isLoading={isLoading}
						instance={instance}
						rowLoading={4}
						tableProps={{
							className: "text-black text-medium border-separate space-x-0 space-y-0 w-full text-left",
							style: { borderSpacing: 0 }
						}}
						// ={{ className: 'text-primary-gray whitespace-nowrap align-middle text-left' }}
					/>
				</div>
				{/* <Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" /> */}
				<ModalExtraLarge show={show}>
					<ModalCreateContract
						contractor={company?.data._id || ''}
						datahubPackageID={selected._id}

						toggle={() => setShow(!show)}
					/>
				</ModalExtraLarge>
			</div>
		</div>
	);
};

export default DatahubContractorContract