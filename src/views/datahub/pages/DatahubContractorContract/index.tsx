/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useEffect, useMemo, useState } from "react";

import ModalCreateContract from "./components/ModalCreateContract";

// import DropdownFilterButton from "views/document/components/DocumentFilterButton";
import useInfinitePackage from "services/hooks/datahub/package/useInfinitePackage";
import { ButtonCreate, GroupActions } from "shareComponents/common";
import ModalExtraLarge from "shareComponents/common/ModalContainer/components/ModalExtraLarge";
import { DatahubContract, DatahubContractBase } from "typings/datahub/contract";
import { useContractorCompany } from "views/datahub/contexts/Company";

import { Cell, useRowSelect, useTable } from "react-table";
import { TableWithoutContext } from "shareComponents/common/Table";
import getColumnsContractorContract from "views/datahub/utils/getColumnsContractorContract";
import { useAuth } from "services/hooks/auth/useAuth";
import { isSupporter } from "configs";
import { useUpload } from 'services/hooks/useUpload';
import { validateFiles } from 'validation/file';
import { toast } from "react-toastify";
import { APP_KEY } from "utils/constants";
import DatahubRepository from 'apis/datahub';

const DatahubContractorContract: FC = () => {
	const { user } = useAuth();
	const [show, setShow] = useState(false);
	const [keyword] = useState('');

	// Get data contractur
	const { data: company } = useContractorCompany();
	const { data, isLoading, refetch } = useInfinitePackage(
		['datahub_packages', keyword, company?.data._id || ''],
		{
			keyword,
			contractorID: company?.data._id || '',
			populates: JSON.stringify({
				path: 'field files project client area1 area2 area3'
			})
		},
		{ enable: Boolean(company?.data._id) }
	);

	const { addFileToUpload } = useUpload({
		appID: APP_KEY.DATAHUB,
		companyID: company?.data._id,
	});

	const [selected, setSelected] = useState<DatahubContract | Record<string, any>>({});

	// Callback
	const onClickUpload = useCallback(async (filesSelected: FileList | null, cell: Cell<DatahubContractBase>) => {
		if (!filesSelected) return;

        try {
			const { _id: datahubPackageID } = cell.row.original;

			const { error, message } = await validateFiles(filesSelected);
			if (error) return toast.warn(message);

			const files: string[] = [];

			for await (const [key, file] of Object.entries(filesSelected)) {
				const { _id } = await addFileToUpload({
					files: file as any,
					fileType: 2,
					progress: percentCompleted => {
						console.log(`${percentCompleted}%`, key);
					}
				})
				_id && files.push(_id);
			}

			if(!files.length) return toast.warn('Thêm file thất bại');

			const response: any = await DatahubRepository.updateDatahubContract({
				datahubPackageID,
				files
			});

			if(response.error) return toast.warn('Thêm file thất bại')

			refetch();
			toast.success('Thêm file thành công');
		} catch(error) {
			if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
		}
	}, []);

	// Table handling
	const columns = useMemo(() => getColumnsContractorContract({ onClickUpload }), [onClickUpload]);
	const _data = useMemo(() => data?.pages.flatMap(p => p.data.listRecords) || [], [data]);

	const instance = useTable({ columns, data: _data, getRowId: (row) => row._id }, useRowSelect);

	useEffect(() => {
		document.title = "Thầu và mua sắm | Trixgo";
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
					{user && isSupporter(user) ?
						<GroupActions
							className="flex items-center flex-1"
							onClickPencil={() => { setShow(true); setSelected(instance.selectedFlatRows[0]) }}
							disabled={{
								pencil: instance.selectedFlatRows.length !== 1,
							}}
						/>
						: <></>
					}
					{user && isSupporter(user) ?
						<ButtonCreate onClick={() => { setShow(!show); setSelected({}) }} />
						: <></>
					}
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
						datahubPackageID={selected.id}
						toggle={() => setShow(!show)}
					/>
				</ModalExtraLarge>
			</div>
		</div>
	);
};

export default DatahubContractorContract