/*=====1.LIBRARY=====*/
import React, { FC, useRef, useCallback, useState, useEffect, ChangeEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import { APP_ID } from "apis/localdb";
import { formatNumberMoney } from "utils/converter";
import { validateFiles } from 'validation/file';
import { read, utils } from 'xlsx';

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import CameraIcon from "assets/images/camera-icon.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput, ModalContainer } from "shareComponents/common";
import { CreateFnbProduct } from "./modal";
import { useFnbProduct } from 'services/hooks/fnb/useFnbProduct';
import PaginateV2 from "shareComponents/common/PaginateV2";
 
/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useUpload } from "services/hooks/useUpload";
import { useAuth } from "services/hooks/auth/useAuth";
import API from "apis/repository";

/*=====7.OTHER=====*/
import { createLinkAndClick } from "utils";

const TYPE_PRODUCT = [
	{ value: 1, text: "Thông thường" },
	{ value: 2, text: "Topping" },
]

export const FnBProductPage: FC = () => {
	useEffect(() => {
		document.title = "Trixgo | FnB";
	}, []);

	const history = useHistory();
	const { user } = useAuth();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });
	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const { addFileToUpload } = useUpload({
		appID: APP_ID.FNB.id,
		companyID: user?.company?._id,
	});

    const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFnbProduct({
		params: {
			keyword,
			populates: JSON.stringify({
				path: 'images',
			})
		},
		isFetchList: true,
		isFetchInfo: false,
	});
	// console.log({listWithPager});

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

	const handleUploadAttach = async (filesSelected: FileList | null, productID: string) => {
		if (!filesSelected || !filesSelected.length) return;

		const validation = await validateFiles(filesSelected);
		if (validation.error) return toast.warn(validation.message);

		// Clear input file
		if (fileInputRef.current) {
		  fileInputRef.current.value = '';
		}

		const imagesID: any = [];

		// Upload images
		for (const [_, file] of Object.entries(filesSelected)) {
			const { _id } = await addFileToUpload({
				files: file as any,
				fileType: 1,
				progress: percentCompleted => {
					console.info(`${percentCompleted}%`)
				}
			})
			_id && imagesID.push(_id);
		}

		// Update image to products
		await API.put(
			`/api/fnb/products`,
			{
				productID,
				imagesID,
			}
		);
		refetch();
	  }

	const [modalCreateFnbProduct, setModalCreateFnbProduct] = useState<boolean>(false);
	const toggleModalCreateFnbProduct = () => setModalCreateFnbProduct(!modalCreateFnbProduct);

	const [initialValues, setInitialValues] = useState(null);
	const onConfirmCreateFnbProduct = () => refetch();

	useEffect(() => {
		if (isSuccess && !(hasPermission && dataUserAccess?.level == 0)) {
			toast.error("Không có quyền truy cập. Bạn không phải là quản trị viên!");
			history.push("/")
		}
	}, [hasPermission, dataUserAccess]);

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
    const { downloadTemplateExcelAsync, importExcelAsync, exportExcelAsync } = useFnbProduct({});

    const handleDownloadTemplateImportExcel = async () => {
		try {
            setStateExport({ isExporting: true });
            const { error, data } = await downloadTemplateExcelAsync({
                filterParams: {  
                    // departmentsID: [departmentID],
                    // ...fromToDate,
                    // datahubContactsID,
                    // types,
                    // directions,
                    // contractsID,
                    // storagesID,
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
                console.log(data)

                if(!data.error){
                    return toast.success("Import thành công");
                }
                return toast.error(data.message);
            }
            fetchData();
        }
        
        console.log('=========DATA THAY ĐỔI RỒI==============')
    }, [dataImport])

	return (
		<main className="h-full overflow-auto">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<p className="text-lg">Danh sách thực đơn</p>
					<SearchInput
						classNameWrapper="ml-4"
						classNameInput="outline-none w-[296px]"
						onChange={debounce(
							(event: any) => setKeyword(event.target.value),
							500
						)}
					/>
					{/* <FinancialCashFlowFilterButton /> */}
					{(idsChecked && idsChecked.length) ? (
						<div className="flex items-center gap-2 border-l-2 border-primary-border px-4 ml-4">
							{/* <div className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray">
								<img src={DownloadIcon} alt="Download" />
							</div> */}
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
				<button className={"flex items-center justify-center mx-3 ml-3"}
						onClick={handleDownloadTemplateImportExcel}
					>
						Tải mẫu Import Excel thực đơn
				</button>
				<button className={"flex items-center justify-center mx-3 ml-3"}>
						<input type="file" name="file" className="custom-file-input" id="inputGroupFile" required hidden onChange={handleImport}
						accept=".xlsx, .xlsm, .xls, .csv"/>
						<label className="custom-file-label" htmlFor="inputGroupFile">Import excel tạo thực đơn</label>
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
					{/* <button className="w-10 h-10 rounded-full bg-cbs-gray flex items-center justify-center hover:bg-accent-light">
						<img src={Vertical3Dots} alt="3Dots" />
					</button> */}
				</div>
				<PaginateV2
					ref={ref}
					totalRecord={totalRecord}
					totalPages={totalPage}
					limit={10}
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
								Tên thực đơn
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-[150px]">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Mã hiệu
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-[150px]">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Đơn vị tính
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Đơn giá bán Off
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Đơn giá bán App
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Phân loại
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Ghi chú
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Hình ảnh
							</div>
						</th>

					</tr>
				</thead>
				{
					(listWithPager[pageIndex]??[]).map((item: any, i: any) => (
						<tr key={item._id} className="text-[14px]">
							<td className={"p-2 border-0.5 border-primary-border text-center"}>
								<input
									className="form-check-input"
									type="checkbox"
									checked={getStateChecked(item._id)}
									onChange={() => onClickCheckButton(item._id)}
								/>
							</td>
							<td className={"p-2 border-0.5 border-primary-border text-cbs-highlight-color"}>
								<Link to ={`/fnb/product/${item._id}`}>
									{item?.name}
								</Link>
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.sign}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.unit}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(item?.unitPrice||0)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(item?.unitPrice2||0)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{TYPE_PRODUCT[item.type-1]?.text}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.note}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								<div style={{display: "flex"}}>
									{!!item?.images?.length && (
										<img
											className="w-[75px] h-[75px] object-contain"
											src={`${process.env.REACT_APP_URL_S3}${item?.images[0]?.path}`}
											alt="Left side bar"
										/>
									)}
									<label className="ml-2">
										<div className="w-[30px] h-[30px] bg-secondary-gray rounded-full flex items-center justify-center">
											<img
											src={CameraIcon}
											alt="Camera"
											className="w-[15px] h-[13px]"
											/>
											<input type="file" name="signature" id="signature" className="hidden" accept="image/*"
											ref={fileInputRef}
											onChange={(e: ChangeEvent<HTMLInputElement>) => handleUploadAttach(e.target.files, item._id)}
											/>
										</div>
									</label>
								</div>
							</td>
						</tr>
				))}

			</table>

			<ModalContainer isModalOpen={modalCreateFnbProduct} toggle={toggleModalCreateFnbProduct}>
				<div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light">
					<CreateFnbProduct
						modalType={initialValues ? "update" : "create"}
						show={modalCreateFnbProduct}
						toggle={toggleModalCreateFnbProduct}
						initialValues={initialValues ? initialValues : undefined}
						onConfirm={onConfirmCreateFnbProduct}
					/>
				</div>
			</ModalContainer>

		</main>
	);
};
