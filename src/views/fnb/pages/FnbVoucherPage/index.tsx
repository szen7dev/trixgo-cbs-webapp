/*=====1.LIBRARY=====*/
import React, { FC, useRef, useCallback, useState, useEffect, ChangeEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import { APP_ID } from "apis/localdb";
import { formatNumberMoney } from "utils/converter";
import { read, utils } from 'xlsx';

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import PencilIcon from "assets/images/icons8-pencil-96.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput, ModalContainer } from "shareComponents/common";
import { CreateFnbVoucher } from "./modal";
import { useFnbVoucher } from 'services/hooks/fnb/useFnbVoucher';
import PaginateV2 from "shareComponents/common/PaginateV2";
 
/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useCheckPerAccessOneMenu } from "services/hooks/auth/usePermissions";
import { useAuth } from "services/hooks/auth/useAuth";

/*=====7.OTHER=====*/
import { createLinkAndClick } from "utils";

const TYPE_VOUCHER = [
	{ value: 1, text: "Thông thường" },
	{ value: 2, text: "Tặng người giới thiệu" },
	{ value: 3, text: "Tặng khách mới" },
	{ value: 4, text: "Tặng sự kiện" },
	{ value: 5, text: "Tặng nhân viên" },
	{ value: 6, text: "Tặng đối tác" },
	{ value: 7, text: "Tặng khác" },
]

export const FnbVoucherPage: FC = () => {
	useEffect(() => {
		document.title = "eShop";
	}, []);

	const history = useHistory();
	const { user } = useAuth();
	const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.FNB.id });
	const { permission } = useCheckPerAccessOneMenu({ appID: APP_ID.FNB.id, menuID: APP_ID.FNB.menuFnbApp.voucher.id, companyID: user?.company._id, type: "1", });

	// useEffect(() => {
	// 	if (!permission.read || permission.read == 0) {
	// 		toast.error("Không có quyền truy cập");
	// 		history.push("/fnb/home")
	// 	}
	// }, [permission]);

	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");
    const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFnbVoucher({
		params: {
			isMember: 1,
			keyword,
			limit: 20,
			populates: JSON.stringify({
				path: "referrer customer userCreate",
                select: "_id name fullname phone"
			})
		},
		isFetchList: true,
		isFetchInfo: false,
	});

	const getStateChecked = useCallback((id: string) => {
		return idsChecked.includes(id) ? true : false;
	}, [idsChecked]);

	const onClickCheckButton = (id: string) => {
		setIdsChecked([id]);
	};

	const getStateCheckedAll = useCallback(() => {
		return idsChecked.length == listWithPager.length;
	}, [idsChecked]);

	const onClickCheckAll = () => {
		if (idsChecked.length == listWithPager.length) {
			setIdsChecked([]);
		} else {
			const idsAll = listWithPager.map((e: any) => e._id);
			setIdsChecked(idsAll);
		}
	};

	const [modalCreateFnbProduct, setModalCreateFnbProduct] = useState<boolean>(false);
	const toggleModalCreateFnbProduct = () => setModalCreateFnbProduct(!modalCreateFnbProduct);

	const [initialValues, setInitialValues] = useState(null);
	const onConfirmCreateFnbProduct = () => refetch();

	type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

	/**
     * LÀM VIỆC VỚI EXCEL
     */
    //_____Import, export excel
    const [dataImport, setDataImport] = useState([]);
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
        isExporting: false,
    });
    const { downloadTemplateExcelAsync, importExcelAsync, exportExcelAsync } = useFnbVoucher({});

    const handleDownloadTemplateImportExcel = async () => {
		try {
            setStateExport({ isExporting: true });
            const { error, data } = await downloadTemplateExcelAsync({
                filterParams: {  
                    // keyword: keywordInput 
                }
            });

            if(error) {
                return toast.warn(data?.message);
            }

            data && createLinkAndClick(data, '_self');
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setStateExport({ isExporting: false });
        }
	}

	//_____Xử lý import excel (đọc file)
    const handleImport = ($event: any) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows: any = utils.sheet_to_json(wb.Sheets[sheets[0]]); // Index=1 (tức Sheet số 2 từ trái sang)
                    
                    // Set data để Import
                    setDataImport(rows)
                }
            }
            
            reader.readAsArrayBuffer(file);
        }

        // Đọc xong thì xóa value trong Input đi
        $event.target.value = null;
    }

	//_____Gọi tới API để đẩy data lên
    useEffect(() => {
        if(dataImport.length){
            const fetchData = async () => {
                const data = await importExcelAsync({ dataImport: JSON.stringify(dataImport) });
                setDataImport([]);
                // refetchTaskInfo?.()
                // console.log(data)

                if(!data.error){
                    return toast.success("Import thành công");
                }
                return toast.error(data.message);
            }
            fetchData();
        }
    }, [dataImport])

	return (
		<main className="h-full overflow-auto">
			{hasPermission && dataUserAccess?.level == 0 ?
				<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
					<div className="flex items-center">
						<SearchInput
							classNameWrapper=""
							classNameInput="outline-none w-[296px]"
							onChange={debounce(
								(event: any) => setKeyword(event.target.value),
								500
							)}
						/>
						{(idsChecked && idsChecked.length) ? (
							<div className="flex items-center gap-2 border-l-2 border-primary-border px-4 ml-4">
								{idsChecked.length == 1 ?
									<>
									<div
										className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray"
										onClick={() => {
											const item = listWithPager[pageIndex].find((e: any) => e._id == idsChecked[0]);
											setInitialValues({
												...item,
												startTime: item.startTime ? moment(item.startTime).format('MM/DD/YYYY') : '',
												expiredTime: item.expiredTime ? moment(item.expiredTime).format('MM/DD/YYYY') : '',
											});
											toggleModalCreateFnbProduct();
										}}
									>
										<img src={PencilIcon} alt="Pencil" />
									</div>
								</> : <></>
								}
							</div>
						) : <></>}
					</div>
					<button className={"flex items-center justify-center mx-3 ml-1"}
							onClick={handleDownloadTemplateImportExcel}
						>
							Tải mẫu Import excel
					</button> 
					<button className={"flex items-center justify-center mx-3 ml-1"}>
							<input type="file" name="file" className="custom-file-input" id="inputGroupFile" required hidden onChange={handleImport}
							accept=".xlsx, .xlsm, .xls, .csv"/>
							<label className="custom-file-label" htmlFor="inputGroupFile">Import excel</label>
					</button>
					<div className="flex items-center">
						<button
							className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold ml-6"
							onClick={() => {
								setInitialValues(null);
								toggleModalCreateFnbProduct();
							}}
						>
							Tạo mới
						</button>
					</div>
					<PaginateV2
						ref={ref}
						totalRecord={totalRecord}
						totalPages={totalPage}
						limit={20}
						hasNextPage={hasNextPage}
						isFetching={isLoading}
						nextPageAction={() => {
							fetchNextPage();
							setPageIndex(oldState => oldState+1)
						}}
						prevPageAction={() => {
							setPageIndex(oldState => oldState-1)
						}}
					/>
				</header>
			: <></>
			}

			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
				<thead className="bg-cbs-table-header h-10 border-b border-primary-border">
					<tr className="text-left text-sm text-primary-gray">
						<th className="pb-1 pt-1 text-center" style={{ width: "3.5%" }}>
							<div className="border-r-2 border-gray-300 flex items-center justify-center">
								<input
									className="form-check-input"
									type="checkbox"
									checked={getStateCheckedAll()}
									onChange={() => onClickCheckAll()}
								/>
							</div>
						</th>
						<th className="pb-1 pt-1 w-[250px]">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Phân loại
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-[150px]">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Tên
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-[150px]">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Mã hiệu
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Thời hạn sử dụng
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Đơn hàng tối thiểu áp dụng
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Giá trị giảm giá
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Tỷ lệ giảm giá trên đơn hàng
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Ghi chú
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-[150px]">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Số khách hàng được nhận
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Số khách hàng đã sử dụng
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Tỷ lệ
							</div>
						</th>
					</tr>
				</thead>
				{
					(
                        listWithPager[pageIndex]??[]).map((item: any, i: any) => (
							<tr key={item._id} className="text-[14px]">
								<td className={"p-2 border-0.5 border-primary-border text-center"}>
									<input
										className="form-check-input"
										type="checkbox"
										checked={getStateChecked(item._id)}
										onChange={() => onClickCheckButton(item._id)}
									/>
								</td>
								<td className={"p-2 border-0.5 border-primary-border"}>
									{TYPE_VOUCHER[item.type-1]?.text}
									<p className="text-xs text-primary-gray"><i>{item._id}</i></p>
								</td>
								<td className={"p-2 border-0.5 border-primary-border text-cbs-highlight-color"}>
									<Link to={`/fnb/voucher/${item._id}`}>
										{item?.name}
									</Link>
								</td>
								<td className={"p-2 border-0.5 border-primary-border"}>
									{item?.sign}
								</td>
								<td className={"p-2 border-0.5 border-primary-border"}>
									{moment(item?.expired).format("DD/MM/YYYY HH:mm")} ({moment(item?.expired).fromNow()})
								</td>
								<td className={"p-2 border-0.5 border-primary-border"}>
									{formatNumberMoney(item?.minOrderAmount||0)}
								</td>
								<td className={"p-2 border-0.5 border-primary-border"}>
									{formatNumberMoney(item?.salesoffAmount||0)}
								</td>
								<td className={"p-2 border-0.5 border-primary-border"}>
									{formatNumberMoney(item?.salesoffRate||0)}
								</td>
								<td className={"p-2 border-0.5 border-primary-border"}>
									{item?.note}
								</td>
								<td className={"p-2 border-0.5 border-primary-border"}>
									{formatNumberMoney(item?.receivers?.length || 0)}
								</td>
								<td className={"p-2 border-0.5 border-primary-border"}>
									{formatNumberMoney( item?.buyers?.length || 0 )}
								</td>
								<td className={"p-2 border-0.5 border-primary-border"}>
									{ item?.receivers?.length != 0 ? Number(Number(item?.buyers?.length/item?.receivers?.length)*100 ).toFixed(2): 0}%
								</td>
							</tr>
				    	)
					)
                }
			</table>
			{hasPermission && dataUserAccess?.level == 0 ?
				<ModalContainer isModalOpen={modalCreateFnbProduct} toggle={toggleModalCreateFnbProduct}>
					<div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light">
						<CreateFnbVoucher
							modalType={initialValues ? "update" : "create"}
							show={modalCreateFnbProduct}
							toggle={toggleModalCreateFnbProduct}
							initialValues={initialValues ? initialValues : undefined}
							onConfirm={onConfirmCreateFnbProduct}
						/>
					</div>
				</ModalContainer>
				: <></>
			}
		</main>
	)
}