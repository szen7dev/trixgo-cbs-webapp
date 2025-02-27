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

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";

/*=====5.TYPINGS=====*/
import { Storage } from "typings/items";

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useModal } from "services/hooks/useModal";
import { useGoods } from "services/hooks/items/useGoods";

/*=====7.OTHER=====*/
import { ImageProps } from "typings/common";
import { createLinkAndClick } from "utils";
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

export const StoreHomePage: FC<{ type: number }> = ({ type }) => {
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
        listedUnitprice: 0,
        sellingUnitprice: 0,
        unitPrice: 0,
        unitPrice2: 0,
        unitPrice3: 0,
        unitPrice4: 0,
        note: '',
        convert: '',
        category: '',
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
            // isListParentOfListChilds: "1", 
            // parentID,
            // populates: JSON.stringify({
            //     path: 'parent',
            //     select: '_id name sign path'
            // })
        },
        isFetchList: true
    })

    // Xử lý sự kiện tìm kiếm
    const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }, 500)

    //_____Import, export excel
    const [dataImport, setDataImport] = useState([]);
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
        isExporting: false,
    });
    const { downloadTemplateExcelAsync } = useGoods({});

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

    return (
        <main className="relative h-full">
            <header className="sticky top-0 bg-primary-light z-10">
                <div className="h-[50px] border border-primary-border flex items-center justify-between">
                    <div className="flex items-center">
                        <SearchInput
                            classNameWrapper="ml-4 mr-2"
                            classNameInput="outline-none w-[296px]"
                            onChange={onChangeSearch}
                        />

                        <button className={"flex items-center justify-center mx-3 ml-3"}
                                onClick={handleDownloadTemplateImportExcel}
                            >
                                Tải danh mục Kho
                        </button>
                    </div>
                </div>
            </header>

            <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
                <thead className="bg-cbs-table-header h-[38px] border-b border-primary-border">
                    <tr className="text-left text-sm">
                        <th className="w-1/6 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Tên
                            </div>
                        </th>
                        <th className="w-1/6 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Danh mục cha
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
                                Ghi chú
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Hình ảnh
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Trạng thái
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {listGoods.length ? listGoods.map((item: any) => (
                        <tr key={item._id} className="border-b border-primary-border h-10">
                            <td className="py-1 px-2">
                                <Link to={`/item/goods/${item._id}`}>
                                    {item.amountChilds>0? <b>{item?.name} ({item.amountChilds})</b>: item.name }
                                    {/* <p>{item?.namecv}</p> */}
                                </Link>
                                {/* <p className="text-primary-gray text-[12px]"><i>{item._id}</i></p> */}
                                <p className="text-primary-gray text-[12px] text-cbs-highlight-color font-bold">{item?.project?.name}</p>
                            </td>
                            <td className="py-1 px-2">
                                {item?.category?.name}
                                <p>{item?.parent?.name}</p>
                            </td>
                            <td className="py-1 px-2">{item?.sign}</td>
                            <td className="py-1 px-2">{item?.unit}</td>
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
								</div>
                            </td>
                            <td className="py-1 px-2">
                                <p>{STATUS[item.status-1]?.text}</p>
                                <p><i>{item.modifyAt ? moment(item.modifyAt).format('DD/MM/YYYY HH:mm') : ''} - {item?.userUpdate?.fullname}</i></p>
                            </td>
                        </tr>
                    )) : <></>}
                </tbody>
            </table>

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