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
import { ModalCreateOrUpdateMenu, ModalCreateOrUpdateBanner, ModalCreateOrUpdateCombo, ModalCreateOrUpdateTag } from '../../shareComponents/common';
 
/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useModal } from "services/hooks/useModal";
import { useMediaPost } from "services/hooks/crm/useMediaPost";

/*=====7.OTHER=====*/
import { ImageProps } from "typings/common";
import { useUpload } from "services/hooks/useUpload";
import { APP_ID } from "apis/localdb";
import API from "apis/repository";

export const CrmMediaPost: FC<{ type: number }> = ({ type }) => {
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
        tagID: '',
        type: '1',
        status: '1',
        name: '',
        expired: '',
        slug: '',
        note: '',
    })

    const {
        list: listData,
        hasNextPage,
        refetch,
        fetchNextPage,
        totalRecord
    } = useMediaPost({
        params: { 
            parentID,
            keyword, 
            populates: {
                path: 'parent category userUpdate userCreate images thumbnail author',
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
            tagID: '',
            type: '',
            status: '',
            name: '',
            expired: '',
            slug: '',
            note: '',
        }))
    }

    // Gọi lại API refetch lại danh sách sau khi tạo/update thành công
    const handleConfirmCreateOrUpdate = () => refetch();

    // Xử lý sự kiện tìm kiếm
    const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }, 500)   

    const handleOpenModalCreateOrUpdate = (modalType: 'create' | 'update') => {

        let initValues: any = {...initialValues};

        setItemsChecked([]);

        // Mở modal tạo mới
        if(modalType === 'create') {
            clearData();
            initValues = {
                parentID,
                tagID: '',
                type: '1',
                status: '1',
                name: '',
                expired: '',
                slug: '',
                note: '',
            }
        }

        openModal(
            <div
                className={"inline-block w-[521px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
                style={{
                    height: "500px",
                }}
            >
                <ModalCreateOrUpdateTag
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdate}
                />
            </div>
        )
    }

    const handleUploadAttach = async (filesSelected: FileList | null, tagID: string) => {
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
            `/api/medias/tag`,
            {
                tagID,
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
                        <th className="py-1">
                            <div className="border-gray-300 font-normal pl-2">
                                Thời gian
                            </div>
                        </th> 
                        <th className="py-1" style={{width: "90px"}}>
                            <div className="border-gray-300 font-normal pl-2">
                               
                            </div>
                        </th> 
                        <th className="py-1 w-1/6">
                            <div className="border-gray-300 font-normal pl-2">
                                Tiêu đề
                            </div>
                        </th> 
                        <th className="py-1">
                            <div className="border-gray-300 font-normal pl-2">
                                Lượt xem
                            </div>
                        </th> 
                        <th className="py-1">
                            <div className="border-gray-300 font-normal pl-2">
                                Chuyên mục
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-gray-300 font-normal pl-2">
                                Tác giả
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-gray-300 font-normal pl-2">
                                Trạng thái
                            </div>
                        </th>
                        <th className="py-1 font-normal">
                            <div className="border-gray-300 font-normal pl-2">
                                Cập nhật lần cuối
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {listData.length ? listData.map((item: any) => (
                        <tr key={item._id} className="border-b border-primary-border h-10">
                            <td className="py-1 px-2">
                                {moment(item.createAt).format('DD/MM/YYYY HH:mm')}
                            </td>
                            <td className="py-1 px-2">
                                <div
                                    className="mt-2 cursor-pointer relative w-[75px] h-[75px]"
                                >
                                    <img src={`${process.env.REACT_APP_URL_S3}${item?.thumbnail?.path}`} />
                                </div>
                            </td>
                            <td className="py-1 px-2">
                                <Link to={`/crm/post/${item._id}`}>
                                    {item?.title}
                                </Link>
                                <p><i>{item?.slug}</i></p>
                            </td>
                            <td className="py-1 px-2">{item.amountView}</td>
                            <td className="py-1 px-2">{item?.category?.name}</td>
                            <td className="py-1 px-2">{item?.author?.fullname}</td>
                            <td className="py-1 px-2">
                                {item?.status == 1 ? <span className="bg-green-400">Active</span> : <span className="bg-red-400">Inactive</span>}
                            </td>
                            <td className="py-1 px-2">
                                {moment(item.modifyAt).format('DD/MM/YYYY HH:mm')}
                            </td>
                        </tr>
                    )) : <></>}
                </tbody>
            </table>

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