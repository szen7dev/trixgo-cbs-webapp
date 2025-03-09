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

export const CrmMediaMeasurement: FC<{ type: number }> = ({ type }) => {
    const { user } = useAuth();
    const [isShowImageFullScreen, setIsShowImageFullScreen] = useState(false);

    const history = useHistory();
    const { closeModal, openModal } = useModal();
    const { parentID } = useParams<{ parentID: string }>();
    const [keyword, setKeyword] = useState('');
    const [title, setTitle] = useState("Danh sách");
    const [itemsChecked, setItemsChecked] = useState<Array<any>>([]);

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
        birthday: '',
        gender: 1,
        height: 0,
        weight: 0,
    })

    const {
        list: listData,
        hasNextPage,
        refetch,
        fetchNextPage,
        totalRecord
    } = useMediaMenu({
        params: { 
            parentID,
            keyword, 
            populates: {
                path: 'parent userUpdate userCreate images',
                select: 'name fullname parent createAt path',
                populate: {
                    path: 'parent',
                    select: 'name',
                }
            },
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
            birthday: '',
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
            const { _id, type, status, name, expired, slug, note, phone, birthday, gender, height, weight } = newListIDChecked[0];
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
                birthday,
                gender,
                height,
                weight,
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
        return itemsChecked.length == listData.length;
    }, [itemsChecked]);

    const onClickCheckAll = () => {
        if (itemsChecked.length == listData.length) {
            setItemsChecked([]);
        } else {
            setItemsChecked(listData);
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
                trackID: '',
                type: '1',
                status: '1',
                name: '',
                expired: '',
                slug: '',
                note: '',
                phone: '',
                birthday: '',
                gender: 1,
                height: 0,
                weight: 0,
            }
        }

        openModal(
            <div
                className={"inline-block w-[521px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
                style={{
                    height: "600px",
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

    const handleUploadAttach = async (filesSelected: FileList | null, trackID: string) => {
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
            `/api/crm/grow_track`,
            {
                trackID,
                imagesID,
            }
        );
        refetch();
    }

    return (
        <main className="relative h-full">
            <header className="sticky top-0 bg-primary-light z-10">
                <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
                    <div className="flex items-center">
                        <button onClick={history.goBack}>
                            <img src="/images/common/button_back.png" alt="Button Back" />
                        </button>
                        <p className="text-lg ml-2">{title}</p>

                        <SearchInput
                            classNameWrapper="ml-4 mr-2"
                            classNameInput="outline-none w-[296px]"
                            onChange={onChangeSearch}
                        />

                        {/* Nếu chọn 1 phẩn tử => chỉ cho update */}
                        {itemsChecked.length === 1 ? (
                            <button
                                className="mr-3"
                                onClick={() => handleOpenModalCreateOrUpdate('update')}
                            >
                                <img src={pencilIcon} alt="icon pencil" />
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
                                Ngày đo
                            </div>
                        </th>
                        <th className="py-1 w-1/6">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Tên
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
                                Chiều cao
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Cân nặng
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Số điện thoại
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
                        <th className="py-1 font-normal">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Cập nhật lần cuối
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {listData.length ? listData.map((item: any) => (
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
                                {moment(item?.createAt).format('DD/MM/YYYY HH:mm')}
                            </td>
                            <td className="py-1 px-2">
                                <Link to={`/crm/height-measurement/${item._id}`}>
                                    {item?.name}
                                </Link>
                            </td>
                            <td className="py-1 px-2">
                                {item.gender >= 1 ? GENDER_TYPES[Number(item.gender)-1].text : ""}
                            </td>
                            <td className="py-1 px-2">
                                {moment(item?.birthday).format('DD/MM/YYYY')}
                            </td>
                            <td className="py-1 px-2">{item.height}</td>
                            <td className="py-1 px-2">{item.weight}</td>
                            <td className="py-1 px-2">{item.phone}</td>
                            <td className="py-1 px-2">{item.note}</td>
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
                            <td className="py-1 px-2">
                                {item?.status == 1 ? <span className="bg-green-400">Active</span> : <span className="bg-red-400">Inactive</span>}
                            </td>
                            <td className="py-1 px-2">
                                {item.userUpdate ? `${item?.userUpdate?.fullname} ${moment(item.modifyAt).format('DD/MM/YYYY HH:mm')}` : `${item?.userCreate?.fullname} ${moment(item.createAt).format('DD/MM/YYYY HH:mm')}`}
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
                            {`Xem thêm (${totalRecord - listData.length})`}
                        </span>
                    </button>
                </div>
            )}
        </main>
    )
}