/*=====1.LIBRARY=====*/
import { FC, useState, useCallback } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";

/*=====2.CSS=====*/
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/
import DeleteIcon from "assets/images/icons8-remove.svg";
import iconPencil from 'assets/images/icons8-pencil-96 1.png';

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";
import { ModalCreateOrUpdateStorage, ModalConfirm } from '../../shareComponents/common';
 
/*=====5.TYPINGS=====*/
import { Storage } from "typings/items";

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useStorage } from "services/hooks/items/useStorage";

/*=====7.OTHER=====*/

export const ItemStoragePage: FC<{ type: number }> = ({ type }) => {
    const { closeModal, openModal } = useModal();
    const [keyword, setKeyword] = useState('');
    const [itemsChecked, setItemsChecked] = useState<Array<Storage.Storage>>([]);
    const [initialValues, setInitialValues] = useState({
        storageID: '',
        name: '',
        description: '',
    });

    const {
        deleteAsync,
        list: listStorages,
        hasNextPage,
        refetch,
        fetchNextPage,
        totalRecord
    } = useStorage({
        params: { keyword }, // Khi keyword thay đổi giá trị => API thay đổi data => refretch kết quả
        isFetchList: true
    });

    // Reset form
    const clearData = () => {
        setInitialValues(previousValue => ({
            ...previousValue,
            storageID: '',
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
            const { _id, name, description } = newListIDChecked[0];
            setInitialValues({
                storageID: _id,
                name,
                description: description || '',
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
        return itemsChecked.length == listStorages.length;
    }, [itemsChecked]);

    const onClickCheckAll = () => {
        if (itemsChecked.length == listStorages.length) {
            setItemsChecked([]);
        } else {
            setItemsChecked(listStorages);
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
                storageID: '',
                name: '',
                description: '',
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[280px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
            >
                <ModalCreateOrUpdateStorage
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdate}
                />
            </div>
        )
    }

    return (
        <main className="relative h-full">
            <header className="sticky top-0 bg-primary-light z-10">
                <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
                    <div className="flex items-center">
                        <p className="text-lg">Danh sách</p>

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
                        <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Mô tả
                            </div>
                        </th>
                        <th className="w-1/12 py-1 font-normal">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Cập nhật lần cuối
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {listStorages.length ? listStorages.map(item => (
                        <tr key={item._id} className="border-b border-primary-border h-10">
                            <td className="py-1 px-2 text-center">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={getStateChecked(item._id)}
                                    onChange={() => onClickCheckButton(item)}
                                />
                            </td>
                            <td className="py-1 px-2">{item.name}</td>
                            <td className="py-1 px-2">{item.description}</td>
                            <td className="py-1 px-2">
                                {item.modifyAt ? moment(item.modifyAt).format('DD/MM/YYYY - HH:mm') : ''}
                            </td>
                        </tr>
                    )) : <></>}
                </tbody>
            </table>

            {hasNextPage && (
                <div className="w-full flex justify-center my-5">
                    <button onClick={fetchNextPage}>
                        <span className="text-primary">
                            {`Xem thêm (${totalRecord - listStorages.length})`}
                        </span>
                    </button>
                </div>
            )}
        </main>
    );
};