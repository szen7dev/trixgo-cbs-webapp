/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';

// ======= HOOKS ========
import useQueryFinancials from "services/hooks/datahub/financial/useQueryFinancials";
import useCheckedList from "services/hooks/ppt/useCheckedList";
import { useAuth } from "services/hooks/auth/useAuth";

// ======= GLOBAL COMPONENTS ========
import { ButtonCreate, GroupActions } from "shareComponents/common";
// import DropdownFilterButton from "views/document/components/DocumentFilterButton";

// ======= CONTEXT ========
import { useContractorCompany } from "views/datahub/contexts/Company";

// ======= COMPONENTS ========

// ======= MODAL ========
import ModalExtraLarge from "shareComponents/common/ModalContainer/components/ModalExtraLarge";
import ModalCreateFinancial from "./components/ModalCreateFinancial";

// ======= ASSETS ========
import iconPageUp from 'assets/images/icons8-upload-document-100 1.png';

import { DatahubFinancial } from "typings/datahub/financial";
import { formatNumber } from "utils/ppt";
import { isSupporter } from "configs";
import { useUpload } from 'services/hooks/useUpload';
import { validateFiles } from 'validation/file';
import { toast } from "react-toastify";
import { APP_KEY } from "utils/constants";
import DatahubRepository from 'apis/datahub';

const DatahubContractorFinancial: FC = () => {
	const { user } = useAuth();
	const [show, setShow] = useState(false);
	const [selected, setSelected] = useState<DatahubFinancial | Record<string, any>>({});

	const { data: company } = useContractorCompany();
	const { data, isLoading, refetch } = useQueryFinancials({
		contractorID: company?.data._id || '',
		populates: JSON.stringify({
			path: 'files',
			select: '_id nameOrg path size'
		})
	});

	const { assigned, checked, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data?.data.listRecords || []);

	const { addFileToUpload } = useUpload({
        appID: APP_KEY.DATAHUB,
        companyID: company?.data._id,
    });

	useEffect(() => {
		document.title = "Thầu và mua sắm | Trixgo";
	}, []);

	const handleUploadFiles = async (filesSelected: FileList | null, datahubFinreportID: string) => {
		if (!filesSelected) return;

        try {
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

			const response: any = await DatahubRepository.updateDatahubFinancial({
				datahubFinreportID,
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
	}

	return (
		<div className="w-full px-3.5 ">
			<div className="bg-white border-cbs-border border-[0.5px]">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
					<span className="text-x-large mr-7">Năng lực tài chính</span>
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
							onClickPencil={() => { setShow(true); setSelected(checked[0]) }}
							disabled={{
								pencil: checked.length !== 1,
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
					<table className="text-black text-medium border-separate space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
						<thead className="">
							<tr className="text-primary-gray align-middle text-left">
								<th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-1">
									<input className="cbs-checkbox" type="checkbox" value="" id="flexCheckDefault" ref={checkboxRef} onClick={handleCheckAll} />
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Năm tài chính
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Tổng tài sản
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Tổng doanh thu
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Doanh thu trong lĩnh vực xây dựng
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Lợi nhuận trước thuế
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Tài liệu xác nhận
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
									</span>
								</th>
							</tr>
						</thead>
						<tbody className="text-small">
							{
								data?.data.listRecords.map((props) => {
									const {
										_id,
										fiscalYear,
										asset,
										grossRevenue,
										grossConstructionRevenue,
										grossProfit,
										files
									} = props
									return (
										<tr key={_id} className="text-left group hover:bg-cbs-active-comment cursor-pointer">
											<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" onClick={e => e.stopPropagation()}>
												<input className="cbs-checkbox" type="checkbox" value="" checked={Boolean(assigned[_id])} onChange={e => handleChangeCheckbox(e, props)} />
											</td>
											<td className="pt-2.5 pb-3 px-3 border-b border-cbs-border text-left">{fiscalYear}</td>
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border text-right">{formatNumber(asset)}</td>
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border text-right">{formatNumber(grossRevenue)}</td>
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border text-right">{formatNumber(grossConstructionRevenue)}</td>
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border text-right">{formatNumber(grossProfit)}</td>
											<td className="pt-2.5 pb-3 pl-3 max-w-[300px] border-b border-cbs-border">
												{
													files.map((file: any, index) => {
														return (
															<p>
																<a
																	key={`${index}-${file._id}`}
																	href={`${process.env.REACT_APP_URL_S3}${file.path}`}
																	download
																	className="text-cbs-primary break-all"
																>
																	{file.nameOrg}{index < files.length - 1 && `, `}
																</a>
															</p>
														)
													})
												}
											</td>
											<td className="pt-2.5 pb-3 px-3 border-b border-cbs-border text-right">
												<label className="w-6 h-6 flex justify-center items-center cursor-pointer mr-2">
													<img src={iconPageUp} alt="" className="inline-block" />
													<input
														type="file"
														name="files"
														className="hidden"
														multiple
														onChange={e => handleUploadFiles(e.target.files, _id)}
													/>
												</label>
											</td>
										</tr>
									)
								})
							}
							{isLoading && Array.from({ length: 4 }).map((_, i) => (
								<tr key={i}>
									{Array.from({ length: 8 }).map((item, index) => (
										<td key={index} className="px-3 pt-2.5 pb-3 border-b border-cbs-border">
											<Skeleton style={{ borderRadius: '100px' }} duration={1} />
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<ModalExtraLarge show={show} buttonOnly>
					<ModalCreateFinancial
						datahubFinreportID={selected._id}
						contractor={company?.data._id || ''}

						toggle={() => setShow(!show)}
					/>
				</ModalExtraLarge>
			</div>
		</div>
	);
};

export default DatahubContractorFinancial
