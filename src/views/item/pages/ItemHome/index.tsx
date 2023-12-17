import { FC, useState, useCallback, useMemo, useEffect } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";
import { read, utils } from 'xlsx';

/**
 * Components
 */
import { SearchInput } from "shareComponents/common";
import { ModalCreateOrUpdateDoctype, ModalConfirm } from '../../shareComponents/common';

/**
 * Assets
 */
import styles from "views/support/styles/support.module.css";
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

    const [initialValues, setInitialValues] = useState({
        doctypeID: '',
        name: '',
        description: '',
        type,
        salesChannel: 1
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
            const { _id, name, description, type, salesChannel } = newListIDChecked[0];
            setInitialValues({
                doctypeID: _id,
                name,
                description,
                type,
                salesChannel
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
                name: '',
                description: '',
                type,
                salesChannel: 1
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[280px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
                style={ type== 22 && {height: "420px"}|| {height: "320px"}}>
                <ModalCreateOrUpdateDoctype
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdateDoctype}
                />
            </div>
        )
    }

    //_____Import excel
    const [dataImport, setDataImport] = useState([]);
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
        isExporting: false,
    });
    const { importFromExcelAsync } = useDoctype({});

    /**
     * Xử lý import excel (đọc file)
     */
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

    // Gọi tới API để đẩy data lên
    useEffect(() => {
        if(dataImport.length){
            const fetchData = async () => {
                const data = await importFromExcelAsync({ type, dataImport: JSON.stringify(dataImport) });
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
                        <p className="text-lg">Danh sách</p>
                        <SearchInput
                            classNameWrapper="ml-4 mr-2"
                            classNameInput="outline-none w-[296px]"
                            onChange={onChangeSearchDoctype}
                        />

                        <button className={"flex items-center justify-center mx-3 ml-3"}>
                            <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required hidden onChange={handleImport}
                            accept=".xlsx, .xlsm, .xls, .csv"/>
                            <label className="custom-file-label" htmlFor="inputGroupFile">Import excel tạo danh mục</label>
                        </button>

                        {doctypesChecked.length === 1 ? (
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
                                    checked={getStateCheckedAll}
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
                    {listDoctypes.length ? listDoctypes.map((item: any) => (
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
                                <Link to={`/item/home/${type}/${item._id}`}>
                                    {item.amountChilds>0? <b>{item?.name}({item.amountChilds})</b>: item.name }
                                </Link>
                                <p className="text-primary-gray text-[12px]"><i>{item._id}</i></p>
                            </td>
                            <td className="py-1 px-2">{item.description}</td>
                            <td className="py-1 px-2">
                                {item.modifyAt ? moment(item.modifyAt).format('DD/MM/YYYY - HH:mm') : ''}
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
    )
}