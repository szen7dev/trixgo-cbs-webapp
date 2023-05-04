/*=====1.LIBRARY=====*/
import React, { FC, useRef, useCallback, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { APP_ID } from "apis/localdb";
import { read, utils } from 'xlsx';

/*=====2.CSS=====*/

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput, ModalContainer } from "shareComponents/common";
import { CreateFnbVoucherDetail } from "./modal";
import { useFnbVoucher } from 'services/hooks/fnb/useFnbVoucher';
import { useCustomer } from "services/hooks/items/useCustomer";
import PaginateV2 from "shareComponents/common/PaginateV2";
 
/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useCheckPerAccessOneMenu } from "services/hooks/auth/usePermissions";
import { useAuth } from "services/hooks/auth/useAuth";

/*=====7.OTHER=====*/
import { createLinkAndClick } from "utils";

export const FnbVoucherDetailPage: FC = () => {
	useEffect(() => {
		document.title = "FnB";
	}, []);

	const history = useHistory();
	const { user } = useAuth();
	const { permission } = useCheckPerAccessOneMenu({ appID: APP_ID.FNB.id, menuID: APP_ID.FNB.menuFnbApp.voucher.id, companyID: user?.company._id, type: "1", });

	// useEffect(() => {
	// 	if (!permission.read || permission.read == 0) {
	// 		toast.error("Không có quyền truy cập");
	// 		history.push("/fnb/home")
	// 	}
	// }, [permission]);

	const { voucherID } = useParams<{ voucherID: string }>();
	const { info: infoVoucher } = useFnbVoucher({ params: { voucherID }, isFetchList: false, isFetchInfo: true  });

	const {
		isLoading, fetchNextPage, hasNextPage, totalRecord, list: listCustomers, totalPage, refetch
    } = useCustomer({
        params: { 
			limit: 10,
			voucherID,
            // keyword, 
            select: "name phone", 
        },
        isFetchList: true,
    });
	// console.log(listCustomers)

	const [modalCreateFnbProduct, setModalCreateFnbProduct] = useState<boolean>(false);
	const toggleModalCreateFnbProduct = () => setModalCreateFnbProduct(!modalCreateFnbProduct);

	const [initialValues, setInitialValues] = useState(null);
	const onConfirmCreateFnbProduct = () => refetch();

	type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);

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
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<button onClick={history.goBack}>
                        <img src="/images/common/button_back.png" alt="Button Back" />
                    </button>
					<p className="text-lg ml-4">{infoVoucher?.name} - {infoVoucher?.sign}</p>
				</div>
				{/* <button className={"flex items-center justify-center mx-3 ml-1"}
						onClick={handleDownloadTemplateImportExcel}
					>
						Tải mẫu Import excel
				</button> 
				<button className={"flex items-center justify-center mx-3 ml-1"}>
						<input type="file" name="file" className="custom-file-input" id="inputGroupFile" required hidden onChange={handleImport}
						accept=".xlsx, .xlsm, .xls, .csv"/>
						<label className="custom-file-label" htmlFor="inputGroupFile">Import excel</label>
				</button> */}
				<div className="flex items-center">
					<button
						className="flex items-center justify-center text-primary-light bg-cbs-green w-[125px] h-8 rounded font-bold ml-6"
						onClick={() => {
							setInitialValues(null);
							toggleModalCreateFnbProduct();
						}}
					>
						Cấp phát voucher
					</button>
				</div>
			</header>

			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
				<thead className="bg-cbs-table-header h-10 border-b border-primary-border">
					<tr className="text-left text-sm text-primary-gray">
						<th className="pb-1 pt-1 text-center" style={{ width: "3.5%" }}>
							TT
						</th>
						<th className="pb-1 pt-1 font-normal w-[150px]">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Tên khách hàng
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-[150px]">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Điện thoại
							</div>
						</th>
					</tr>
				</thead>
				{listCustomers.length ? listCustomers.map((item: any, index: any) => (
					<tr key={item._id} className="text-[14px]">
					<td className={"p-2 border-0.5 border-primary-border text-center"}>
						{index + 1}
					</td>
					<td className={"p-2 border-0.5 border-primary-border text-cbs-highlight-color"}>
						{item?.name}
					</td>
					<td className={"p-2 border-0.5 border-primary-border"}>
						{item?.phone}
					</td>
				</tr>
				)) : <></>}
			</table>

			{hasNextPage && (
                <div className="w-full flex justify-center my-5">
                    <button onClick={fetchNextPage}>
                        <span className="text-primary">
                            {`Xem thêm (${totalRecord - listCustomers.length})`}
                        </span>
                    </button>
                </div>
            )}

			<ModalContainer isModalOpen={modalCreateFnbProduct} toggle={toggleModalCreateFnbProduct}>
				<div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light">
					<CreateFnbVoucherDetail
						modalType={initialValues ? "update" : "create"}
						show={modalCreateFnbProduct}
						toggle={toggleModalCreateFnbProduct}
						initialValues={initialValues ? initialValues : undefined}
						onConfirm={onConfirmCreateFnbProduct}
					/>
				</div>
			</ModalContainer>

		</main>
	)
}