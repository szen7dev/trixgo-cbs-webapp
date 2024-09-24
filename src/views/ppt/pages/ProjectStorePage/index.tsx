/*=====1.LIBRARY=====*/
import { FC, useRef, useState, useCallback, useEffect, ChangeEvent } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";
import { Link, useParams, useHistory } from "react-router-dom";
import { validateFiles } from 'validation/file';
import { read, utils } from 'xlsx';
import { formatNumberMoney } from "utils/cmcs";

/*=====2.CSS=====*/
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/
import iconPencil from 'assets/images/icons8-pencil-96 1.png';
import CameraIcon from "assets/images/camera-icon.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";
import { ModalCreateOrUpdateProjectGoods } from 'views/ppt/pages/ProjectStorePage/shareComponents/common/modal/';

/*=====5.TYPINGS=====*/
import { Storage } from "typings/items";

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useModal } from "services/hooks/useModal";
import { useGoods } from "services/hooks/items/useGoods";

/*=====7.OTHER=====*/
import { ImageProps } from "typings/common";
import { createLinkAndClick } from "utils";
import { ModalZoomView } from "shareComponents/common";
import { useUpload } from "services/hooks/useUpload";
import { APP_ID } from "apis/localdb";
import API from "apis/repository";

const TYPE = [
	{ value: 1, text: "Thông thường" },
	{ value: 2, text: "Topping" },
]

const STATUS = [
	{ value: 1, text: "Hoạt động" },
	{ value: 2, text: "Hủy" },
]

const USAGE = [
	{ value: 1, text: "Chung" },
	{ value: 2, text: "Cho đơn hàng" },
]

const ProjectStorePage: FC = () => {
    const { id: projectID } = useParams<{ id: string }>();
    
    const { user } = useAuth();
    const [isShowImageFullScreen, setIsShowImageFullScreen] = useState(false);

	const [defaultState, setDefaultState] = useState({
	    mediaID: '',
	    images: [] as ImageProps[],
	    index: 0,
	    createAt: ""
  	});

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { addFileToUpload } = useUpload({
        appID: APP_ID.ITEM.id,
        companyID: user?.company?._id,
    });

	const history = useHistory();
    const { closeModal, openModal } = useModal();
    const [keyword, setKeyword] = useState('');
	const { parentID } = useParams<{ parentID: string }>();

    // console.log({projectID})
    // console.log({parentID})

    const [itemsChecked, setItemsChecked] = useState<Array<any>>([]);
    const [initialValues, setInitialValues] = useState({
        goodsID: '',
        type: 1,
        status: 1,
        usage: 1,
        name: '',
        sign: '',
        unit: '',
        unitprice: 0,
        sellingUnitprice: 0,
        unitPrice: 0,
        unitPrice2: 0,
        unitPrice3: 0,
        unitPrice4: 0,
        note: '',
        convert: '',
        convertQuantity: 1,
    })

    const {
        list: listGoods,
        hasNextPage,
        refetch,
        fetchNextPage,
        totalRecord
    } = useGoods({
        params: { 
            keyword, 
            isListParentOfListChilds: "1", 
            parentID,
            // populates: JSON.stringify({
            //     path: 'parent',
            //     select: '_id name sign path'
            // })
        },
        isFetchList: true
    })

    // Reset form
    const clearData = () => {
        setInitialValues(previousValue => ({
            ...previousValue,
            goodsID: '',
            name: '',
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
            const { _id, type, name, sign, unit, unitprice, sellingUnitprice, unitPrice, unitPrice2, unitPrice3, unitPrice4, note, convert, convertQuantity, status, usage } = newListIDChecked[0];
            setInitialValues({
                goodsID: _id,
                type,
                status,
                usage,
                name,
                sign,
                unit,
                unitprice,
                sellingUnitprice,
                unitPrice,
                unitPrice2,
                unitPrice3,
                unitPrice4,
                note,
                convert,
                convertQuantity
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
        return itemsChecked.length == listGoods.length;
    }, [itemsChecked]);

    const onClickCheckAll = () => {
        if (itemsChecked.length == listGoods.length) {
            setItemsChecked([]);
        } else {
            setItemsChecked(listGoods);
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
                goodsID: '',
                tpye: 1,
                status: 1,
                usage: 1,
                name: '',
                sign: '',
                unit: '',
                unitprice: 0,
                sellingUnitprice: 0,
                unitPrice: 0,
                unitPrice2: 0,
                unitPrice3: 0,
                unitPrice4: 0,
                note: ''
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[400px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
                style={{
                    height: "800px",
                }}
            >
                <ModalCreateOrUpdateProjectGoods
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdate}
                />
            </div>
        )
    }

    const handleUploadAttach = async (filesSelected: FileList | null, goodsID: string) => {
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
			`/api/item/goods`,
			{
				goodsID,
				imagesID,
			}
		);
		refetch();
	}

     /**
     * LÀM VIỆC VỚI EXCEL
     */
    //_____Import, export excel
    const [dataImport, setDataImport] = useState([]);
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
        isExporting: false,
    });
    const { downloadTemplateExcelAsync, importExcelAsync, exportExcelAsync } = useGoods({});

    const handleDownloadTemplateImportExcel = async () => {
		try {
            setStateExport({ isExporting: true });
            const { error, data } = await downloadTemplateExcelAsync({
                filterParams: {  
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

                if(!data.error){
                    return toast.success("Import thành công");
                }
                return toast.error(data.message);
            }
            fetchData();
        }
    }, [dataImport])

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
                                onClick={handleDownloadTemplateImportExcel}
                            >
                                Tải mẫu Import Excel
                        </button>

                        <button className={"flex items-center justify-center mx-3 ml-3"}>
                            <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required hidden onChange={handleImport}
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
                    </div>
                    <div className="flex items-center">
                        <button
                            className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
                            onClick={() => handleOpenModalCreateOrUpdate('create')}
                            >
                            Tạo mới
                        </button>
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
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Phân loại
                            </div>
                        </th>
                        <th className="w-1/6 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Tên
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Mã hiệu
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Đơn vị tính
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Đơn giá nhập
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Đơn giá xuất
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Trọng lượng (Kg)
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Ghi chú
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Hình ảnh
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {listGoods.length ? listGoods.map((item: any) => (
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
                                <p>{TYPE[item.type-1]?.text}</p>
                                <p>{STATUS[item.status-1]?.text}</p>
                                <p>{USAGE[item.usage-1]?.text}</p>
                            </td>
                            <td className="py-1 px-2">
                                <Link to={`/pm/project/${projectID}/store/${item._id}`}>
                                    {item.amountChilds>0? <b>{item?.name} ({item.amountChilds})</b>: item.name }
                                    <p>{item?.namecv}</p>
                                </Link>
                                <p className="text-primary-gray text-[12px]"><i>{item._id}</i></p>
                                <p><i>{item.modifyAt ? moment(item.modifyAt).format('DD/MM/YYYY HH:mm') : ''} - {item?.userUpdate?.fullname}</i></p>
                            </td>
                            <td className="py-1 px-2">{item?.sign}</td>
                            <td className="py-1 px-2">{item?.unit}</td>
                            <td className="py-1 px-2 text-right">
                                {formatNumberMoney(item?.unitprice)}
                            </td>
                            <td className="py-1 px-2 text-right">
                                {formatNumberMoney(item?.sellingUnitprice)}
                            </td>
                            <td className="py-1 px-2 text-right">
                                {formatNumberMoney(item?.weight)}
                            </td>
                            <td className="py-1 px-2">
                                {item.note}
                            </td>
                            <td className="py-1 px-2">
                            <div style={{display: "flex"}}>
									{item?.images?.map((image: any, i: number) => {
										return (
											<div
												key={image._id}
												className="mt-2 cursor-pointer relative w-[75px] h-[75px]"
												onClick={() => {
													setDefaultState({
														mediaID: image._id,
														images: item?.images,
														index: i,
														createAt: image.createAt
													});
													setIsShowImageFullScreen(true);
												}}
											>
												<img src={`${process.env.REACT_APP_URL_S3}${image?.path}`} />
											</div>
										)
									})}

									<label className="ml-2">
										<div className="w-[30px] h-[30px] bg-secondary-gray rounded-full flex items-center justify-center">
											<img
											src={CameraIcon}
											alt="Camera"
											className="w-[15px] h-[13px]"
											/>
											<input 
												type="file" 
												className="hidden" 
												accept="image/*"
												onChange={(e: ChangeEvent<HTMLInputElement>) => handleUploadAttach(e.target.files, item._id)}
											/>
										</div>
									</label>
								</div>
                            </td>
                        </tr>
                    )) : <></>}
                </tbody>
            </table>

            <ModalZoomView
		        isShow={isShowImageFullScreen}
		        toggle={() => setIsShowImageFullScreen(!isShowImageFullScreen)}
		        initialData={defaultState}
		    />

            {hasNextPage && (
                <div className="w-full flex justify-center my-5">
                    <button onClick={fetchNextPage}>
                        <span className="text-primary">
                            {`Xem thêm (${totalRecord - listGoods.length})`}
                        </span>
                    </button>
                </div>
            )}
        </main>
    )
}

export default ProjectStorePage;