/*=====1.LIBRARY=====*/
import React, { FC, useRef, useState, useCallback, useEffect, ChangeEvent } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";
import { Link, useParams, useHistory } from "react-router-dom";
import { validateFiles } from 'validation/file';
import { read, utils } from 'xlsx';
// import { formatNumberMoney } from "utils/cmcs";
import iconCreate from "assets/images/icons8-create.png";
import { ModalConfirm } from "shareComponents/common";
import { DropdownSearchableV2, Loader } from "shareComponents/common";

/*=====2.CSS=====*/
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/
import pencilIcon from 'assets/images/icons8-pencil-96 1.png';
import CameraIcon from "assets/images/camera-icon.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";
import { ModalCreateOrUpdateMeasurement } from '../../shareComponents/common';
 
/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useModal } from "services/hooks/useModal";
import { useMediaMenu } from "services/hooks/crm/useMediaMeasurement";

/*=====7.OTHER=====*/
import { GENDER_TYPES } from "apis/localdb";
import { ImageProps } from "typings/common";
import { createLinkAndClick } from "utils";
import { ModalZoomView } from "shareComponents/common";
import { useUpload } from "services/hooks/useUpload";
import { APP_ID } from "apis/localdb";
import API from "apis/repository";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import { useContact } from "services/hooks/items/useContact";
import { useMediaEvent } from "services/hooks/crm/useMediaEvent";

type PaginateHandle = React.ElementRef<typeof PaginateV2>;
type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;

export const CrmMediaMeasurement: FC<{ type: number }> = ({ type }) => {
    const { user } = useAuth();
    const [isShowImageFullScreen, setIsShowImageFullScreen] = useState(false);

    const ref = useRef<PaginateHandle>(null);
    const datahubRef = useRef<DropdownHandle>(null);
    const typeRef = useRef<DropdownHandle>(null);

    const [pageIndex, setPageIndex] = useState(0);

    const history = useHistory();
    const { closeModal, openModal } = useModal();
    const { parentID } = useParams<{ parentID: string }>();
    const [keyword, setKeyword] = useState('');
    const [title, setTitle] = useState("Danh sách");
    const [itemsChecked, setItemsChecked] = useState<Array<any>>([]);
    const accountRef = React.useRef<DropdownHandle>(null);

    const [eventID, setEventID] = useState<string | null>();
    const [supportID, setSupportID] = useState<string | null>();

    const [contactKeyword, setContactKeyword] = useState("");
    const [eventKeyword, setEventKeyword] = useState("");

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

    const { list: listContact } = useContact({
        params: { keyword: contactKeyword, limit: 20 },
        isFetchList: true
    })

    const {
        list: listEvent,
    } = useMediaEvent({
        params: { 
            limit: 20,
            keyword: eventKeyword,
        },
        isFetchList: true,
    })

    const [initialValues, setInitialValues] = useState({
        parent: parentID,
        trackID: '',
        type: '1',
        status: '1',
        name: '',
        expired: '',
        slug: '',
        note: '',
        phone: '',
        email: '',
        parentName: '',
        birthday: '',
        pubertyOnsetDate: '',
        facebook: '',
        tiktok: '',
        gender: 1,
        height: 0,
        weight: 0,
    })

    const {
        listWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch
    } = useMediaMenu({
        params: { 
            eventID,
            supportID,
            parentID,
            keyword, 
            populates: {
                path: 'parent userUpdate userCreate images contact support source product secialist event',
                select: 'name fullname parent createAt path unit',
                populate: {
                    path: 'parent',
                    select: 'name',
                }
            },
            limit: 20,
        },
        isFetchList: true,
    })

    // Reset form
    const clearData = () => {
        setInitialValues(previousValue => ({
            ...previousValue,
            trackID: '',
            type: '',
            status: '',
            name: '',
            expired: '',
            slug: '',
            note: '',
            phone: '',
            email: '',
            parentName: '',
            birthday: '',
            pubertyOnsetDate: '',
            facebook: '',
            tiktok: '',
            gender: 1,
            height: 0,
            weight: 0,
        }))
    }

    // Gọi lại API refetch lại danh sách sau khi tạo/update thành công
    const handleConfirmCreateOrUpdate = () => refetch();

    // Xử lý sự kiện tìm kiếm
    const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }, 500);

    // Làm việc với update mẩu tin
    const onClickCheckButton = (doc: any) => {
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
            const { _id, type, status, name, expired, slug, note, phone, email, parentName, facebook, tiktok, birthday, gender, height, weight, pubertyOnsetDate } = newListIDChecked[0];
            setInitialValues({
                parent: parentID,
                trackID: _id,
                type,
                status,
                name,
                expired,
                slug,
                note,
                phone,
                email,
                birthday,
                pubertyOnsetDate,
                facebook,
                tiktok,
                gender,
                height,
                weight,
                parentName,
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
    
    const handleOpenModalCreateOrUpdate = (modalType: 'create' | 'update') => {

        let initValues: any = {...initialValues};

        setItemsChecked([]);

        // Mở modal tạo mới
        if(modalType === 'create') {
            clearData();
            initValues = {
                parentID,
                trackID: '',
                type: '1',
                status: '1',
                name: '',
                expired: '',
                slug: '',
                note: '',
                phone: '',
                email: '',
                parentName: '',
                facebook: '',
                tiktok: '',
                birthday: '',
                pubertyOnsetDate: '',
                gender: 1,
                height: 0,
                weight: 0,
            }
        }

        openModal(
            <div
                className={"inline-block w-[521px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
                style={{
                    height: "1350px",
                }}
            >
                <ModalCreateOrUpdateMeasurement
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdate}
                />
            </div>
        )
    }

    const { importExcelAsync, exportExcelAsync } = useMediaMenu({});

    //_____Import, export excel
    const [dataImport, setDataImport] = useState([]);
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
        isExporting: false,
    });

    const exportExcel = async () => {
        try {
            setStateExport({ isExporting: true });
            const { error, data } = await exportExcelAsync({
                eventID,
                supportID,
                keyword,
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

    //_____Gọi tới API để đẩy data lên
    useEffect(() => {
        if(dataImport.length){
            const fetchData = async () => {
                const data = await importExcelAsync({ dataImport: JSON.stringify(dataImport), option: 1 })
                setDataImport([])

                if(!data.error){
                    return toast.success("Import thành công")
                }
                return toast.error(data.message)
            }
            fetchData()

            refetch();
        }
    }, [dataImport])

    const toggleModalOpenSign = (param: any) => {
        openModal(
            <div
            className={
                "inline-block w-[521px] h-[240px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
            }
            >
            <ModalConfirm
                title= {param?.title}
                description= {param?.description}
                onConfirm={() => handleConfirmSync({ option: param.option, trackID: param.trackID })}
                defaultText={false}
                onCancel={closeModal}
            />
            </div>
        )
    }

    const handleConfirmSync = useCallback(async (param: any) => {
        closeModal();

        const { data, status } = await API.post(
            `/api/crm/grow_track/sync-data`, {
                option: param.option,
                trackID: param.trackID,
            }
        )
    
        if (status !== 200 || data.error) {
        return toast.error(data?.data?.message)
        }

        refetch();
        return toast.success('Đồng bộ thành công')
    }, [])

    return (
        <main className="relative h-full">
            <header className="h-[50px] w-full border border-primary-border flex items-center px-3">
                <SearchInput classNameWrapper={"mr-1"} onChange={onChangeSearch} />

                <DropdownSearchableV2
                    ref={accountRef}
                    className={"mr-1 border border-primary-border rounded-lg"}
                    placeholder={"Thuộc sự kiện"}
                    isMultiple={false}
                    allowClearValueSingleInput={true}
                    data={listEvent}
                    formatItem={{
                        id: "_id",
                        text: "name",
                    }}
                    onSearchInputChange={debounce(
                        (valueSearch) => setEventKeyword(valueSearch),
                        500
                    )}
                    onClearData={() => {
                        setEventID("");
                    }}
                    onchangeValue={item => {
                        setEventID(item._id);
                        setPageIndex(0);
                        ref.current&&ref.current.resetPaginate();
                    }}
                    renderItem={(item) => (
                        <p className={"min-w-[300px]"}>{item.text}</p>
                    )}
                    selectOneByOne={true}
                />

                <DropdownSearchableV2
                    ref={accountRef}
                    className={"mr-1 border border-primary-border rounded-lg"}
                    placeholder={"Chủ Trạm Tăng Cao"}
                    isMultiple={false}
                    allowClearValueSingleInput={true}
                    data={listContact}
                    formatItem={{
                        id: "_id",
                        text: "name",
                    }}
                    onSearchInputChange={debounce(
                        (valueSearch) => setContactKeyword(valueSearch),
                        500
                    )}
                    onClearData={() => {
                        setSupportID("");
                    }}
                    onchangeValue={item => {
                        setSupportID(item._id);
                        setPageIndex(0);
                        ref.current&&ref.current.resetPaginate();
                    }}
                    renderItem={(item) => (
                        <p className={"min-w-[300px]"}>{item.text}</p>
                    )}
                    selectOneByOne={true}
                />

                <button className={"flex items-center justify-center mx-3 ml-3"}
                        onClick={exportExcel}
                    >
                    Tải Báo cáo
                </button>

                <div className="flex items-center">
                    <button
                        className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
                        onClick={() => handleOpenModalCreateOrUpdate('create')}
                        >
                        Tạo mới
                    </button>
                </div>

                <div className="absolute right-0">
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
                </div>
            </header>

            <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
                <thead className="bg-cbs-table-header h-[38px] border-b border-primary-border">
                    <tr className="text-left text-sm">
                        <th className={cn("py-1 text-center", styles.theadInput)}>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Ngày đo
                            </div>
                        </th>
                        <th className="py-1 w-1/6">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Nội dung đo cao
                            </div>
                        </th> 
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Giới tính
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Ngày sinh
                            </div>
                        </th> 
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Chiều cao (Cm)
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Cân nặng (Kg)
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Đường tăng trưởng
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Ba mẹ (tên, điện thoại)
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Ghi chú
                            </div>
                        </th>
                        {/* <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Hình ảnh
                            </div>
                        </th> */}
                        <th className="py-1 font-normal">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Cập nhật lần cuối
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                {
                    (listWithPager[pageIndex] ?? []).map((item: any, index: any) => (
                        <tr key={item._id} className="border-b border-primary-border h-10">
                            <td className="py-1 px-2 text-center">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={getStateChecked(item._id)}
                                    onChange={() => onClickCheckButton(item)}
                                />
                                {(itemsChecked.length === 1 && itemsChecked[0]?._id.toString() === item._id.toString()) ? (
                                    <button
                                        className="mr-3"
                                        onClick={() => handleOpenModalCreateOrUpdate('update')}
                                    >
                                        <img src={pencilIcon} alt="icon pencil" />
                                    </button>
                                ) : ''}
                            </td>
                            <td className="py-1 px-2">
                                {moment(item?.date).format('DD/MM/YYYY')}
                                <div className="mb-3">
                                    <button className={"flex text-primary-gray items-center rounded hover:bg-cbs-form-input-bg px-3 h-[30px] ml-2 mr-2"} onClick={() => toggleModalOpenSign({ option: 1, trackID: item._id, title: 'Bạn có muốn tạo dữ liệu Ba mẹ và Bé không?', description: 'Tài khoản ba mẹ được tạo và cấp quyền truy cập Game Habit. Dữ liệu của bé được cập nhật vào hệ thống' })}>
                                    <img src={iconCreate} title={'Đồng bộ'} className={"w-[24px] h-[24px] mr-3"} />
                                    <span>Đồng bộ</span>
                                    </button>
                                </div>
                            </td>
                            <td className="py-1 px-2 text-cbs-highlight-color text-[14px]">
                                <a target="blank" href={`https://lamin.com.vn/tai-khoan/lich-su-do-cao/${item._id}`}>{item?.name}</a>
                                <p className="text-primary-gray text-[12px]"><i>{item._id}</i></p>
                                <p className="text-primary-gray text-[12px]"><i>Trẻ: {item?.contact?.name}</i></p>
                                <p className="text-primary-gray text-[12px]"><i>Chủ trạm: {item?.support?.name}</i></p>
                                <p className="text-primary-gray text-[12px]"><i>Sự kiện: {item?.event?.name}</i></p>
                            </td>
                            <td className="py-1 px-2">
                                {item.gender >= 1 ? GENDER_TYPES[Number(item.gender)-1].text : ""}
                            </td>
                            <td className="py-1 px-2">
                                {moment(item?.birthday).format('DD/MM/YYYY')}
                                <p className="text-primary-gray text-[12px]"><i>Dậy thì: {item?.pubertyOnsetDate != null && moment(item?.pubertyOnsetDate).format('DD/MM/YYYY')}</i></p>
                            </td>
                            <td className="py-1 px-2">{item.height}</td>
                            <td className="py-1 px-2">{item.weight}</td>
                            <td className="py-1 px-2">
                                {item.percentile} | {item.predictedAdultHeight} cm
                                <hr className="text-primary-gray"/>
                                <p><i>{item?.product?.name}</i></p>
                                <p><i>{item?.quantity} ({item?.product?.unit})</i></p>
                            </td>
                            <td className="py-1 px-2">
                                {item.parentName} - {item.phone}
                                {/* {item?.facebook ? <p className="text-cbs-highlight-color"><i>FB: {item?.facebook}</i></p> : ''}
                                {item?.tiktok ? <p className="text-cbs-highlight-color"><i>TT: {item?.tiktok}</i></p> : ''} */}
                                <hr className="text-primary-gray"/>
                                <p><i>Nguồn: {item?.source?.name}</i></p>
                                <p><i>Chuyên viên: {item?.secialist?.name}</i></p>
                            </td>
                            <td className="py-1 px-2">
                                {item.note}
                                <div>
                                    {item?.status == 1 ? <span className="bg-green-400">Active</span> : <span className="bg-red-400">Inactive</span>}
                                </div>
                            </td>
                            {/* <td className="py-1 px-2">
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
                            </td> */}
                            <td className="py-1 px-2 text-primary-gray text-[12px]">
                                <p><i>Cre: {item?.userCreate?.fullname} {moment(item.createAt).format('DD/MM/YY HH:mm')}</i></p>
                                <p><i>Modify: {item.userUpdate ? `${item?.userUpdate?.fullname} ${moment(item.modifyAt).format('DD/MM/YY HH:mm')}` : ``}</i></p>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            {/* <ModalZoomView
                isShow={isShowImageFullScreen}
                toggle={() => setIsShowImageFullScreen(!isShowImageFullScreen)}
                initialData={defaultState}
            /> */}
        </main>
    )
}