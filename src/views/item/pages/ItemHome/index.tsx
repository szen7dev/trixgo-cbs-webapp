import { FC, useState, useCallback, useMemo, useEffect } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";
import { read, utils } from 'xlsx';
import { SearchInput } from "shareComponents/common";
import { ModalCreateOrUpdateDoctype } from '../../shareComponents/common';
import styles from "views/support/styles/support.module.css";
import pencilIcon from 'assets/images/icons8-pencil-96 1.png';
import { useModal } from "services/hooks/useModal";
import { useDoctype } from "services/hooks/items/useDoctype";
import { Doctype } from "typings/items";
import { Link } from "react-router-dom";
import { GRADE_MISTAKE } from "apis/localdb/index";

export const ItemHomePage: FC<{ type: number }> = ({ type }) => {
    const { openModal } = useModal();
    const [keywordDoctype, setKeywordDoctype] = useState('');
    const [doctypesChecked, setDoctypesChecked] = useState<Array<Doctype.Doctype>>([]);

    const [initialValues, setInitialValues] = useState({
        doctypeID: '',
        linkItem: '',
        name: '',
        sign: '',
        unit: '',
        description: '',
        type: +type,
        grade: 1,
        salesChannel: 1,
        amount: 0,
        alert: 0,
    });

    const {
        list: listDoctypes,
        hasNextPage: hasNextPageDoctype,
        refetch: refetchListDoctype,
        fetchNextPage: fetchNextPageDoctype,
        totalRecord
    } = useDoctype({
        params: {
            type,
            keyword: keywordDoctype,
            isShowParentAndChild: 1,
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
            linkItem: '',
            name: '',
            sign: '',
            unit: '',
            description: '',
            type: +type,
            // grade: 1,
            // salesChannel,
            // amount,
        }))
    }
    
    const getStateChecked = useCallback((id: string) => {
        const item = doctypesChecked.find(item => item._id === id);
        return item ? true : false;
    }, [doctypesChecked]);

    // console.log(doctypesChecked)

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
            const { _id, linkItem, name, sign, unit, description, type, salesChannel, amount, alert, grade } = newListIDChecked[0];
            setInitialValues({
                doctypeID: _id,
                linkItem,
                name,
                sign,
                unit,
                description,
                type,
                grade: +(grade || 1),
                salesChannel,
                amount,
                alert,
            });
        } else {
            clearData();
        }
    }

    const handleOpenModalCreateOrUpdate = (modalType: 'create' | 'update') => {
        let initValues: any = {...initialValues};
        setDoctypesChecked([]);

        if(modalType === 'create') {
            clearData();
            initValues = {
                doctypeID: '',
                linkItem: '',
                name: '',
                sign: '',
                unit: '',
                description: '',
                type,
                grade: 1,
                salesChannel: 1,
                amount: 0,
                alert: 0,
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[280px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
                style={{height: "700px"}}>
                <ModalCreateOrUpdateDoctype
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdateDoctype}
                />
            </div>
        )
    }

    // const handleClick = (item: any) => {
    //     getStateChecked(item._id)
    //     onClickCheckButton(item)

    //     if(doctypesChecked.length === 1){
    //         handleOpenModalCreateOrUpdate("update")
    //     }

    //     // console.log(doctype)

    //     // // Gọi setInitialValues
    //     // setInitialValues({
    //     //   doctypeID: doctype._id,
    //     //   linkItem: doctype.linkItem,
    //     //   name: doctype.name,
    //     //   sign: doctype.sign,
    //     //   unit: doctype.unit,
    //     //   description: doctype.description,
    //     //   type: doctype.type,
    //     //   grade: doctype.grade,
    //     //   salesChannel: doctype.salesChannel,
    //     //   amount: doctype.amount,
    //     //   alert: doctype.alert,
    //     // });
    
    //     // Gọi handleOpenModalCreateOrUpdate
    //     // handleOpenModalCreateOrUpdate("update");

    //     // // Đảm bảo mở modal sau khi state đã cập nhật
    //     // setTimeout(() => {
    //     //     handleOpenModalCreateOrUpdate("update");
    //     // }, 500); // Đảm bảo React cập nhật state trước khi mở modal
    //   }

    //_____Import excel
    const [dataImport, setDataImport] = useState([]);
    const { importFromExcelAsync } = useDoctype({});

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
    }, [JSON.stringify(dataImport)])

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

                        {/* {doctypesChecked.length === 1 ? (
                            <button
                                className="mr-3"
                                onClick={() => handleOpenModalCreateOrUpdate('update')}
                            >
                                <img src={pencilIcon} alt="icon pencil" />
                            </button>
                        ) : ''} */}
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

                        </th>
                        <th className="py-1" style={{width: "20px"}}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Nội dung
                            </div>
                        </th>
                        <th className="py-1" style={{width: "20px"}}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Danh mục cha
                            </div>
                        </th>
                        <th className="py-1" style={{width: "20px"}}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Link danh mục
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
                    {listDoctypes.length ? listDoctypes.map((item: any) => (
                        <tr key={item._id} className="border-b border-primary-border h-10">
                            <td className="py-1 px-2 text-center">
                                {/* <button
                                    className="mr-3"
                                    onClick={() => handleClick(item)}
                                >
                                    <img src={pencilIcon} alt="icon pencil" />
                                </button> */}
                                
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
                                <Link to={`/item/home/${type}/${item._id}`}>
                                    {item.amountChilds>0? <b>{item?.name}({item.amountChilds})</b>: item.name }
                                </Link>
                                <p className="text-primary-gray text-[12px]"><i>{item._id}</i></p>
                                <p className="text-cbs-highlight-color text-[12px]"><i>Cấp độ: {item?.grade ? GRADE_MISTAKE[Number(item?.grade) - 1].text : ''}</i></p>
                                <p className="text-primary-gray text-[12px]"><i>{item?.userUpdate?.fullname} {moment(item.modifyAt).format('DD/MM/YYYY - HH:mm')}</i></p>
                            </td>
                            <td className="py-1 px-2">{item?.parent?.name}</td>
                            <td className="py-1 px-2">{item?.linkItem?.name}</td>
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
    )
}
