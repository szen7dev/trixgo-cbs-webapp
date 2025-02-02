import { FC, useState, useCallback, useMemo } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";
import { useParams, Link } from 'react-router-dom';
import { SearchInput } from "shareComponents/common";
import { ModalCreateOrUpdateDoctype, ModalConfirm } from '../../shareComponents/common';
import styles from "views/support/styles/support.module.css";
import pencilIcon from 'assets/images/icons8-pencil-96 1.png';
import { useModal } from "services/hooks/useModal";
import { useDoctype } from "services/hooks/items/useDoctype";
import { Doctype } from "typings/items";
import { GRADE_MISTAKE } from "apis/localdb/index";

export const ItemChildPage: FC = () => {
    const { type, parentId } = useParams<{ type: string, parentId: string }>();
    const { closeModal, openModal } = useModal();
    const [keywordDoctype, setKeywordDoctype] = useState('');
    const [doctypesChecked, setDoctypesChecked] = useState<Array<Doctype.Doctype>>([]);
    const [initialValues, setInitialValues] = useState({
        doctypeID: '',
        parent: parentId,
        name: '',
        sign: '',
        unit: '',
        description: '',
        type: +type,
        salesChannel: 1,
        // grade: 1,
        amount: 0,
        alert: 0,
        note: '',
        unitprice: '',
        sellingUnitprice: '',
    });

    const {
        list: listDoctypes,
        hasNextPage: hasNextPageDoctype,
        refetch: refetchListDoctype,
        fetchNextPage: fetchNextPageDoctype,
        totalRecord
    } = useDoctype({
        params: {
            type: +type,
            parentID: parentId,
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
            parent: parentId,
            name: '',
            sign: '',
            unit: '',
            description: '',
            type: +type,
            note: '',
            unitprice: '',
            sellingUnitprice: '',
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
            const { _id, name, sign, unit, description, note, unitprice, sellingUnitprice, type, salesChannel, amount, alert } = newListIDChecked[0];
            setInitialValues({
                doctypeID: _id,
                parent: parentId,
                name,
                sign,
                type,
                salesChannel,
                // grade,
                amount,
                alert,
                description: description || '',
                unit: unit || '',
                note: note || '',
                unitprice: unitprice || '',
                sellingUnitprice: sellingUnitprice || '',
            });
        } else {
            clearData();
        }
    };

    const getStateChecked = useCallback((id: string) => {
        const user = doctypesChecked.find(item => item._id === id);
        return user ? true : false;
    }, [doctypesChecked]);

    const getStateCheckedAll = useMemo(() => {
        if(!doctypesChecked.length && !listDoctypes.length) return false;
        return doctypesChecked.length == listDoctypes.length;
    }, [doctypesChecked.length, listDoctypes.length]);

    const onClickCheckAll = () => {
        if (doctypesChecked.length == listDoctypes.length) {
            setDoctypesChecked([]);
        } else {
            setDoctypesChecked(listDoctypes);
        }
    };

    const handleOpenModalCreateOrUpdate = (modalType: 'create' | 'update') => {
        let initValues: any = {...initialValues};
        setDoctypesChecked([]);

        if(modalType === 'create') {
            clearData();
            initValues = {
                doctypeID: '',
                parent: parentId,
                name: '',
                sign: '',
                unit: '',
                description: '',
                type: +type,
                note: '',
                unitprice: '',
                sellingUnitprice: '',
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[340px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
                style={{height: "700px"}}
            >
                <ModalCreateOrUpdateDoctype
                    modalType={modalType}
                    level="child"
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
                        <Link className="mr-3" to={`/item/home/${type}`}>
                            <img src={`${process.env.PUBLIC_URL}/images/common/button_back.png`} alt="Back" />
                        </Link>
                        <p className="text-lg">Danh sách</p>
                        <SearchInput
                            classNameWrapper="ml-4 mr-2"
                            classNameInput="outline-none w-[296px]"
                            onChange={onChangeSearchDoctype}
                        />
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
                        </th>
                        <th className="py-1" style={{width: "20px"}}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Nội dung
                            </div>
                        </th>
                        <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Mã hiệu
                            </div>
                        </th>
                        <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Đơn vị tính
                            </div>
                        </th>
                        <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Giá trị
                            </div>
                        </th>
                        <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Thời hạn (giờ)
                            </div>
                        </th>
                        <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Mô tả, ghi chú
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {listDoctypes.length ? listDoctypes.map(item => (
                        <tr key={item._id} className="border-b border-primary-border h-10">
                            <td className="py-1 px-2 text-center">
                                {/* <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={getStateChecked(item._id)}
                                    onChange={() => onClickCheckButton(item)}
                                /> */}
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={getStateChecked(item._id)}
                                    onChange={() => onClickCheckButton(item)}
                                />
                                <hr className="text-primary-gray"/>
                                {(doctypesChecked.length === 1 && doctypesChecked[0]?._id.toString() === item._id.toString()) ? (
                                    <button
                                        className="mr-3"
                                        onClick={() => handleOpenModalCreateOrUpdate('update')}
                                    >
                                        <img src={pencilIcon} alt="icon pencil" />
                                    </button>
                                ) : ''}
                            </td>
                            <td className="py-1 px-2">
                                {item.name}
                                <p className="text-primary-gray text-[12px]"><i>{item._id}</i></p>
                                <p className="text-cbs-highlight-color text-[12px]"><i>Cấp độ: {item?.grade ? GRADE_MISTAKE[Number(item?.grade) - 1].text : ''}</i></p>
                                <p className="text-primary-gray text-[12px]"><i>{item?.userUpdate?.fullname} {moment(item.modifyAt).format('DD/MM/YYYY - HH:mm')}</i></p>
                            </td>
                            <td className="py-1 px-2">{item?.sign}</td>
                            <td className="py-1 px-2">{item?.unit}</td>
                            <td className="py-1 px-2 text-right">{item?.amount}</td>
                            <td className="py-1 px-2 text-right">{item?.alert}</td>
                            <td className="py-1 px-2">{item?.description}</td>
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