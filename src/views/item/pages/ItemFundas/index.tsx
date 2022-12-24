/*=====1.LIBRARY=====*/
import { FC, useState, useCallback, useEffect } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";
import { Link, useParams, useHistory } from "react-router-dom";
import { validateFiles } from 'validation/file';
import { read, utils } from 'xlsx';

/*=====2.CSS=====*/
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/
import DeleteIcon from "assets/images/icons8-remove.svg";
import iconPencil from 'assets/images/icons8-pencil-96 1.png';

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";
import { ModalCreateOrUpdateFunda, ModalConfirm } from '../../shareComponents/common';

/*=====5.TYPINGS=====*/
import { Storage } from "typings/items";

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useStorage } from "services/hooks/items/useStorage";
import { useFunda } from "services/hooks/items/useFunda";

/*=====7.OTHER=====*/
import { createLinkAndClick } from "utils";
const CAMPAIGN_CONSTANT = ["Tắt", "Bật"];
const INTERNAL_CONSTANT = ["Hệ thống", "Nhượng quyền"];

export const ItemFundasPage: FC<{ type: number }> = ({ type }) => {
	const history = useHistory();
    const { closeModal, openModal } = useModal();
    const [keyword, setKeyword] = useState('');
	const { parentID } = useParams<{ parentID: string }>();

    const [itemsChecked, setItemsChecked] = useState<Array<any>>([]);
    const [initialValues, setInitialValues] = useState({
        fundaID: '',
        description: '',
        name: "",
        sign: "",
        address: '',
        area1: '', 
        area2: '',
        area3: '',
        initialDay: new Date(),
        campaign: 1,
        internal: 1,
        activeCampaign: []
    });

    const {
        deleteAsync,
        list: listFunda,
        hasNextPage,
        refetch,
        fetchNextPage,
        totalRecord
    } = useFunda({
        params: { 
            keyword, 
            isListParentOfListChilds: "1", 
            populates: { 
                "path": "area1 area2 area3",
                "select": "name"
            }, 
            parentID 
        },
        isFetchList: true
    });
    // console.log({ listFunda });
    // Reset form
    const clearData = () => {
        setInitialValues(previousValue => ({
            ...previousValue,
            fundaID: '',
            name: '',
            description: '',
        }))
    }

    // Gọi lại API refetch lại danh sách sau khi tạo/update thành công
    const handleConfirmCreateOrUpdate = () => refetch();

    // Xử lý sự kiện tìm kiếm
    const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }, 500);

    // Làm việc với update mẩu tin
    const onClickCheckButton = (doc: Storage.Storage) => {
        const check = itemsChecked.find(item => item._id === doc._id);
        let newListIDChecked = [];

        if (check) {
            newListIDChecked = itemsChecked.filter(item => item._id !== doc._id)
            setItemsChecked(newListIDChecked);
        } else {
            newListIDChecked = [...itemsChecked, doc];
            setItemsChecked(newListIDChecked);
        };

        if (newListIDChecked.length === 1) {
            const { _id, name, sign, description, address, initialDay, campaign, internal, area1, area2, area3, activeCampaign} = newListIDChecked[0];
            setInitialValues({
                fundaID: _id,
                name,
                sign,
                description,
                address,
                initialDay,
                campaign: +campaign,
                internal,
                area1, 
                area2,
                area3,
                activeCampaign
            });
        } else {
            clearData();
        }
    };

    // Check chọn 1 hoặc nhiều mẩu tin
    const getStateChecked = useCallback((id: string) => {
        const user = itemsChecked.find(item => item._id === id);
        return user ? true : false;
    }, [itemsChecked]);

    const getStateCheckedAll = useCallback(() => {
        return itemsChecked.length == listFunda.length;
    }, [itemsChecked]);

    const onClickCheckAll = () => {
        if (itemsChecked.length == listFunda.length) {
            setItemsChecked([]);
        } else {
            setItemsChecked(listFunda);
        }
    };

    // Xóa 1 hoặc nhiều mẩu tin
    const handleConfirmDelete = async () => {
        try {
            const ids = itemsChecked.map(item => item._id);
            const { error, data } = await deleteAsync(ids);

            if (error) {
                return toast.warn(data?.message);
            }

            toast.success('Xoá dữ liệu thành công', { autoClose: 1500 });
            closeModal();
            clearData();
            refetch();
            setItemsChecked([]);
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    const handleOpenModalCreateOrUpdate = (modalType: 'create' | 'update') => {

        let initValues: any = {...initialValues};
        setItemsChecked([]);

        // Mở modal tạo mới
        if(modalType === 'create') {
            clearData();
            initValues = {
                parentID,
                fundaID: '',
                name: '',
                sign: '',
                description: '',
                address: '',
                initialDay: new Date(),
                campaign: 1,
                internal: 1,
                activeCampaign: []
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[300px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
                style={{
                    height: "800px",
                }}
            >
                <ModalCreateOrUpdateFunda
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdate}
                />
            </div>
        )
    }

     /**
     * LÀM VIỆC VỚI EXCEL
     */
    //_____Import, export excel
    const [dataImport, setDataImport] = useState([]);
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
        isExporting: false,
    });
    // const { downloadTemplateExcelAsync, importExcelAsync, exportExcelAsync } = useFunda({});

    // const handleDownloadTemplateImportExcel = async () => {
	// 	try {
    //         setStateExport({ isExporting: true });
    //         const { error, data } = await downloadTemplateExcelAsync({
    //             filterParams: {  
    //                 // departmentsID: [departmentID],
    //                 // ...fromToDate,
    //                 // datahubContactsID,
    //                 // types,
    //                 // directions,
    //                 // contractsID,
    //                 // storagesID,
    //                 // keyword: keywordInput 
    //             }
    //         });

    //         if(error) {
    //             return toast.warn(data?.message);
    //         }

    //         data && createLinkAndClick(data, '_self');
    //     } catch (error: any) {
    //         toast.error(error.message)
    //     } finally {
    //         setStateExport({ isExporting: false });
    //     }
	// }

	// //_____Xử lý import excel (đọc file)
    // const handleImport = ($event: any) => {
    //     const files = $event.target.files;
    //     if (files.length) {
    //         const file = files[0];
    //         const reader = new FileReader();
    //         reader.onload = (event: any) => {
    //             const wb = read(event.target.result);
    //             const sheets = wb.SheetNames;

    //             if (sheets.length) {
    //                 const rows: any = utils.sheet_to_json(wb.Sheets[sheets[0]]); // Index=1 (tức Sheet số 2 từ trái sang)
                    
    //                 // Set data để Import
    //                 setDataImport(rows)
    //             }
    //         }
            
    //         reader.readAsArrayBuffer(file);
    //     }

    //     // Đọc xong thì xóa value trong Input đi
    //     $event.target.value = null;
    // }

	// //_____Gọi tới API để đẩy data lên
    // useEffect(() => {
    //     if(dataImport.length){
    //         const fetchData = async () => {
    //             const data = await importExcelAsync({ dataImport: JSON.stringify(dataImport) });
    //             setDataImport([]);
    //             // refetchTaskInfo?.()
    //             console.log(data)

    //             if(!data.error){
    //                 return toast.success("Import thành công");
    //             }
    //             return toast.error(data.message);
    //         }
    //         fetchData();
    //     }
        
    //     console.log('=========DATA THAY ĐỔI RỒI==============')
    // }, [dataImport])

    return (
        <main className="relative h-full">
            <header className="sticky top-0 bg-primary-light z-10">
                <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
                    <div className="flex items-center">
                        <button onClick={history.goBack}>
							<img src="/images/common/button_back.png" alt="Button Back" />
						</button>
                        <p className="text-lg ml-2">Danh sách</p>

                        <SearchInput
                            classNameWrapper="ml-4 mr-2"
                            classNameInput="outline-none w-[296px]"
                            onChange={onChangeSearch}
                        />

                        <button className={"flex items-center justify-center mx-3 ml-3"}
                                // onClick={handleDownloadTemplateImportExcel}
                            >
                                Tải mẫu Import Excel
                        </button>

                        <button className={"flex items-center justify-center mx-3 ml-3"}>
                            <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required hidden
                            //  onChange={handleImport}
                            accept=".xlsx, .xlsm, .xls, .csv"/>
                            <label className="custom-file-label" htmlFor="inputGroupFile">Import Excel</label>
                        </button>

                        {/* Nếu chọn 1 phẩn tử => chỉ cho update */}
                        {itemsChecked.length === 1 ? (
                            <button
                                className="mr-3"
                                onClick={() => handleOpenModalCreateOrUpdate('update')}
                            >
                                <img src={iconPencil} alt="icon pencil" />
                            </button>
                        ) : ''}

                        {/* Xóa 1 hoặc nhiều */}
                        {itemsChecked.length ? (
                            <button
                                onClick={() =>
                                    openModal(
                                        <div
                                            className={
                                                "inline-block w-[521px] h-[185px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
                                            }
                                        >
                                            <ModalConfirm onConfirm={handleConfirmDelete} />
                                        </div>
                                    )
                                }>
                                <img src={DeleteIcon} alt="Delete" />
                            </button>
                        ) : ''}
                    </div>
                    <div className="flex items-center">
                        <button
                            className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
                            onClick={() => handleOpenModalCreateOrUpdate('create')}
                            >
                            Tạo mới
                        </button>
                        <div className="w-10 h-10 bg-secondary-light rounded-full flex items-center justify-center ml-5 cursor-pointer">
                            <img src={`${process.env.PUBLIC_URL}/images/common/icon-3dots-vertical-gray.svg`} alt="Three Dot" />
                        </div>
                    </div>
                </div>
            </header>

            <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
                <thead className="bg-cbs-table-header h-[38px] border-b border-primary-border">
                    <tr className="text-left text-sm">
                        <th className={cn("py-1 text-center", styles.theadInput)}>
                            <div className="border-r-2 border-gray-300 flex items-center justify-center">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultChecked={getStateCheckedAll()}
                                    onClick={onClickCheckAll}
                                />
                            </div>
                        </th>
                        <th className="w-1/6 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Nội dung
                            </div>
                        </th>
                        <th className="w-1/6 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                               Mã hiệu
                            </div>
                        </th>
                        <th className="w-1/6 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                               Mô tả
                            </div>
                        </th>
                        <th className="w-1/6 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Địa chỉ
                            </div>
                        </th>
                        <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                             Ngày bắt đầu
                            </div>
                        </th>
                        <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                               Chiến dịch quảng cáo
                            </div>
                        </th>
                        <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                              Phân loại
                            </div>
                        </th>
                        <th className="w-1/12 py-1 font-normal">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Thành viên
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {listFunda.length ? listFunda.map((item: any) => (
                        <tr key={item._id} className="border-b border-primary-border h-10">
                            <td className="py-1 px-2 text-center">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={getStateChecked(item._id)}
                                    onChange={() => onClickCheckButton(item)}
                                />
                            </td>
                            <td className="py-1 px-2">
                                <Link to={`/item/fundas/${item._id}`}>
                                    {item.amountChilds>0? <b>{item?.name}({item.amountChilds})</b>: item.name }
                                </Link>
                            </td>
                            <td className="py-1 px-2">{item?.sign}</td>
                            <td className="py-1 px-2">{item?.description}</td>
                            <td className="py-1 px-2">{item?.address}</td>
                            <td className="py-1 px-2">{moment(item.initialDay).format('L')}</td>
                            <td className="py-1 px-2">{CAMPAIGN_CONSTANT[item?.campaign-1]}</td>
                            <td className="py-1 px-2">{INTERNAL_CONSTANT[item?.internal-1]}</td>
                            <td className="py-1 px-2 text-primary-gray">
                                 <Link to={`/item/fundas/${item._id}/members`}  className="underline text-sky-600">
                                    Xem thành viên
                                </Link>
                            </td>
                        </tr>
                    )) : <></>}
                </tbody>
            </table>

            {hasNextPage && (
                <div className="w-full flex justify-center my-5">
                    <button onClick={fetchNextPage}>
                        <span className="text-primary">
                            {`Xem thêm (${totalRecord - listFunda.length})`}
                        </span>
                    </button>
                </div>
            )}
        </main>
    );
};