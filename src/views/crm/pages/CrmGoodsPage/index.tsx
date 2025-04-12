/*=====1.LIBRARY=====*/
import { FC, useRef, useState, useEffect, ChangeEvent } from "react";
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
// import pencilIcon from 'assets/images/icons8-pencil-96 1.png';
import CameraIcon from "assets/images/camera-icon.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";

/*=====5.TYPINGS=====*/
// import { Storage } from "typings/items";

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

const STATUS = [
	{ value: 1, text: "Hoạt động" },
	{ value: 2, text: "Hủy" },
]

const USAGE = [
	{ value: 1, text: "Chung" },
	{ value: 2, text: "Cho đơn hàng" },
]

export const CrmGoodsPage: FC<{ type: number }> = ({ type }) => {
    const { user } = useAuth();
    const [isShowImageFullScreen, setIsShowImageFullScreen] = useState(false);

	const [defaultState, setDefaultState] = useState({
	    mediaID: '',
	    images: [] as ImageProps[],
	    index: 0,
	    createAt: ""
  	})
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { addFileToUpload } = useUpload({
        appID: APP_ID.ITEM.id,
        companyID: user?.company?._id,
    })

	const history = useHistory();
    const { closeModal, openModal } = useModal();
    const [keyword, setKeyword] = useState('');
	const { parentID } = useParams<{ parentID: string }>();

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
            parentID
        },
        isFetchList: true
    })

    // Xử lý sự kiện tìm kiếm
    const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }, 500)

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
                        <SearchInput
                            classNameWrapper="ml-4 mr-2"
                            classNameInput="outline-none w-[296px]"
                            onChange={onChangeSearch}
                        />
                    </div>
                </div>
            </header>

            <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
                <thead className="bg-cbs-table-header h-[38px] border-b border-primary-border">
                    <tr className="text-left text-sm">
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Phân loại
                            </div>
                        </th>
                        <th className="w-1/6 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Sản phẩm
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
                                Đơn giá bán
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
                            <td className="py-1 px-2">
                                <p>{STATUS[item.status-1]?.text}</p>
                                <p>{USAGE[item.usage-1]?.text}</p>
                            </td>
                            <td className="py-1 px-2">
                                <Link to={`/crm/goods/detail/${item._id}`} className="text-cbs-highlight-color">
                                    { item.name }
                                </Link>
                                <p className="text-primary-gray text-[12px]"><i>{item._id}</i></p>
                                <p className="text-primary-gray text-[14px] text-cbs-highlight-color font-bold">Chuyên mục: {item?.category?.name}</p>
                                {/* <Link to={`/crm/goods/detail/${item._id}`} className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                                    Go to Detail
                                </Link> */}
                                <div>
                                    <p className="text-primary-gray">Mô tả sản phẩm</p>
                                    <p>{item?.description}</p>
                                    <hr />
                                </div>
                                <div>
                                    <p className="text-primary-gray">Đặc điểm nổi bật</p>
                                    <p>{item?.features}</p>
                                </div>
                                <div>
                                    <p className="text-primary-gray">Thành phần</p>
                                    <p>{item?.ingredients}</p>
                                    <hr />
                                </div>
                                <div>
                                    <p className="text-primary-gray">Công dụng/lợi ích</p>
                                    <p>{item?.benefits}</p>
                                    <hr />
                                </div>
                                <div>
                                    <p className="text-primary-gray">Cách dùng</p>
                                    <p>{item?.instructions}</p>
                                    <hr />
                                </div>
                                <div>
                                    <p className="text-primary-gray">Tác dụng phụ</p>
                                    <p>{item?.sideEffects}</p>
                                    <hr />
                                </div>
                                <div>
                                    <p className="text-primary-gray">Lưu ý</p>
                                    <p>{item?.warnings}</p>
                                    <hr />
                                </div>
                                <div className="text-primary-gray">
                                    <p>Bảo quản</p>
                                    <p>{item?.storage}</p>
                                    <hr />
                                </div>
                                <p><i>{item.modifyAt ? moment(item.modifyAt).format('DD/MM/YYYY HH:mm') : ''} - {item?.userUpdate?.fullname}</i></p>
                            </td>
                            <td className="py-1 px-2">{item?.sign}</td>
                            <td className="py-1 px-2">{item?.unit}</td>
                            <td className="py-1 px-2 text-right">
                                {formatNumberMoney(item?.unitprice)}
                            </td>
                            <td className="py-1 px-2 text-right">
                                {formatNumberMoney(item?.sellingUnitprice)}
                                <hr />
                                <p><i>{formatNumberMoney(item?.listedUnitprice)}</i></p>
                                <p className="text-left"><i>Thời hạn ưu đãi: {item?.expired ? moment(item?.expired).format('DD/MM/YYYY HH:mm') : ''}</i></p>
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