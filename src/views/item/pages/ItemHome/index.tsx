import { FC, useState, useCallback, useEffect } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";

/**
 * Components
 */
import { SearchInput } from "shareComponents/common";
import { ModalCreateOrUpdateDoctype, ModalConfirm } from '../../shareComponents/common';

/**
 * Assets
 */
import styles from "views/support/styles/support.module.css";
import DeleteIcon from "assets/images/icons8-remove.svg";
import iconPencil from 'assets/images/icons8-pencil-96 1.png';

/**
 * Hooks
 */
import { useModal } from "services/hooks/useModal";
import { useDoctype } from "services/hooks/items/useDoctype";
import { Doctype } from "typings/items";
import { Link } from "react-router-dom";

export const ItemHomePage: FC<{ type: number }> = ({ type }) => {
    const { closeModal, openModal } = useModal();
    const [keywordDoctype, setKeywordDoctype] = useState('');
    const [doctypesChecked, setDoctypesChecked] = useState<Array<Doctype.Doctype>>([]);
    const [itemState, setItemState] = useState({
        href: ''
    });

    const [initialValues, setInitialValues] = useState({
        doctypeID: '',
        name: '',
        description: '',
        type
    });

    const {
        deleteManyAsync,
        list: listDoctypes,
        hasNextPage: hasNextPageDoctype,
        refetch: refetchListDoctype,
        fetchNextPage: fetchNextPageDoctype,
        totalRecord
    } = useDoctype({
        params: {
            type,
            keyword: keywordDoctype
        },
        isFetchList: true
    });

    const handleConfirmCreateOrUpdateDoctype = () => refetchListDoctype();

    const onChangeSearchDoctype = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeywordDoctype(event.target.value);
    }, 500);

    const clearData = () => {
        setInitialValues(previousValue => ({
            ...previousValue,
            doctypeID: '',
            name: '',
            description: '',
            type
        }))
    }

    const onClickCheckButton = (doctype: Doctype.Doctype) => {
        const check = doctypesChecked.find(item => item._id === doctype._id);
        let newListIDChecked = [];

        if (check) {
            newListIDChecked = doctypesChecked.filter(item => item._id !== doctype._id)
            setDoctypesChecked(newListIDChecked);
        } else {
            newListIDChecked = [...doctypesChecked, doctype];
            setDoctypesChecked(newListIDChecked);
        };

        if (newListIDChecked.length === 1) {
            const { _id, name, description, type } = newListIDChecked[0];
            setInitialValues({
                doctypeID: _id,
                name,
                description,
                type
            });
        } else {
            clearData();
        }
    };

    useEffect(() => {
        switch (type) {
            case 21:
                setItemState({ href: `/item/home/21` })
                break;
            default:
                break;
        }
    }, [type])

    const getStateChecked = useCallback((id: string) => {
        const user = doctypesChecked.find(item => item._id === id);
        return user ? true : false;
    }, [doctypesChecked]);

    const getStateCheckedAll = useCallback(() => {
        return doctypesChecked.length == listDoctypes.length;
    }, [doctypesChecked]);

    const onClickCheckAll = () => {
        if (doctypesChecked.length == listDoctypes.length) {
            setDoctypesChecked([]);
        } else {
            setDoctypesChecked(listDoctypes);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const ids = doctypesChecked.map(item => item._id);
            const { error, data } = await deleteManyAsync(ids);

            if (error) {
                return toast.warn(data?.message);
            }

            toast.success('Xoá dữ liệu thành công', { autoClose: 1500 });
            closeModal();
            clearData();
            refetchListDoctype();
            setDoctypesChecked([]);
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
        setDoctypesChecked([]);

        if(modalType === 'create') {
            clearData();
            initValues = {
                doctypeID: '',
                name: '',
                description: '',
                type
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[280px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
            >
                <ModalCreateOrUpdateDoctype
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdateDoctype}
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
                            onChange={onChangeSearchDoctype}
                        />

                        {doctypesChecked.length === 1 ? (
                            <button
                                className="mr-3"
                                onClick={() => handleOpenModalCreateOrUpdate('update')}
                            >
                                <img src={iconPencil} alt="icon pencil" />
                            </button>
                        ) : ''}

                        {doctypesChecked.length ? (
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
                    {listDoctypes.length ? listDoctypes.map(doctype => (
                        <tr key={doctype._id} className="border-b border-primary-border h-10">
                            <td className="py-1 px-2 text-center">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={getStateChecked(doctype._id)}
                                    onChange={() => onClickCheckButton(doctype)}
                                />
                            </td>
                            <td className="py-1 px-2">
                                {itemState.href ? (
                                    <Link to={`${itemState.href}/${doctype._id}`}>
                                        {doctype.name}
                                    </Link>
                                ) : doctype.name}
                            </td>
                            <td className="py-1 px-2">{doctype.description}</td>
                            <td className="py-1 px-2">
                                {doctype.modifyAt ? moment(doctype.modifyAt).format('DD/MM/YYYY - HH:mm') : ''}
                            </td>
                        </tr>
                    )) : <></>}
                </tbody>
            </table>

            {hasNextPageDoctype && (
                <div className="w-full flex justify-center my-5">
                    <button onClick={fetchNextPageDoctype}>
                        <span className="text-primary">
                            {`Xem thêm (${totalRecord - listDoctypes.length})`}
                        </span>
                    </button>
                </div>
            )}
        </main>
    );
};