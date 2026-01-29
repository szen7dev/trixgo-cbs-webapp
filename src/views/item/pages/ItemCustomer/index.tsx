/*=====1.LIBRARY=====*/
import { FC, useState, useCallback, useEffect } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";
import { Link, useParams, useHistory } from "react-router-dom";
import { read, utils } from 'xlsx';
import { createLinkAndClick } from "utils";

/*=====2.CSS=====*/
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/
import DeleteIcon from "assets/images/icons8-remove.svg";
import pencilIcon from 'assets/images/icons8-pencil-96 1.png';

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";
import { ModalCreateOrUpdateCustomer, ModalConfirm } from '../../shareComponents/common';
 
/*=====5.TYPINGS=====*/
import { Customer } from "typings/items";

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useCustomer } from "services/hooks/items/useCustomer";

/*=====7.OTHER=====*/
import { CONTACT_TYPES, GENDER_TYPES, CUSTOMER_TYPES } from "apis/localdb";

export const ItemCustomerPage: FC<{ type: number }> = ({ type }) => {
	const history = useHistory();
    const { closeModal, openModal } = useModal();
	const { parentID } = useParams<{ parentID: string }>();
    const [keyword, setKeyword] = useState('');
    const [title, setTitle] = useState("Danh sách");
    const [itemsChecked, setItemsChecked] = useState<Array<Customer.Customer>>([]);
    const [initialValues, setInitialValues] = useState({
        parent: parentID,
        contactID: '',
        type: '2',
        name: '',
        sign: '',
        address: '',
        note: '',
        taxid: '',
        phone: '',
        email: '',
        description: '',
        funda: '',
        sale: '',
        gender: 1,
        birthday: '',
        nonResident: '1'
    });

    const {
        deleteAsync,
        list: listCustomers,
        hasNextPage,
        refetch,
        fetchNextPage,
        totalRecord
    } = useCustomer({
        params: { 
            populates: {
                path: 'parent userUpdate funda sale linkUser',
                select: 'name fullname'
            },
            keyword, isListParentOrListChilds: "1", parentID 
        }, // Khi keyword thay đổi giá trị => API tự động cập nhật lại Data => cập nhật lại view
        isFetchList: true,
    })

    // Reset form
    const clearData = () => {
        setInitialValues(previousValue => ({
            ...previousValue,
            contactID: '',
            type: '',
            name: '',
            sign: '',
            address: '',
            taxid: '',
            phone: '',
            email: '',
            description: '',
            nonResident: '',
        }))
    }

    // Gọi lại API refetch lại danh sách sau khi tạo/update thành công
    const handleConfirmCreateOrUpdate = () => refetch();

    // Xử lý sự kiện tìm kiếm
    const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }, 500);

    // Làm việc với update mẩu tin
    const onClickCheckButton = (doc: Customer.Customer) => {
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
            const { _id, type, name, sign, address, taxid, phone, email, description, funda, sale, note, gender, birthday, nonResident } = newListIDChecked[0];
            setInitialValues({
                parent: parentID,
                contactID: _id,
                type,
                name,
                sign,
                address: address || '',
                taxid: taxid || '',
                phone: phone || '', 
                email: email || '', 
                description: description || '',
                funda: funda,
                sale: sale,
                note,
                gender,
                birthday,
                nonResident
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
        return itemsChecked.length == listCustomers.length;
    }, [itemsChecked]);

    const onClickCheckAll = () => {
        if (itemsChecked.length == listCustomers.length) {
            setItemsChecked([]);
        } else {
            setItemsChecked(listCustomers);
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
                parent: parentID,
                contactID: '',
                type: '2',
                name: '',
                sign: '',
                address: '',
                taxid: '',
                phone: '',
                email: '',
                description: '',
                nonResident: '1',
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
                style={{
                    height: "820px",
                }}
            >
                <ModalCreateOrUpdateCustomer
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdate}
                />
            </div>
        )
    }

    //_____Import, export excel
    const [dataImport, setDataImport] = useState([]);
    const [dataImport2, setDataImport2] = useState([]);
    const [dataImport3, setDataImport3] = useState([]);
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
        isExporting: false,
    });
    const { downloadTemplateImportExcelCustomerAsync, importCustomerFromExcelAsync, exportCustomerAsync } = useCustomer({});

    const handleDownloadTemplateImportExcel = async () => {
		try {
            setStateExport({ isExporting: true });
            const { error, data } = await downloadTemplateImportExcelCustomerAsync({
                filterParams: {  }
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

    //_____Import excel
    const handleImport1 = ($event: any) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows: any = utils.sheet_to_json(wb.Sheets[sheets[0]]); // Index=0 (Sheet 1 từ trái sang)
                    setDataImport(rows) // Set data để Import
                }
            }
            reader.readAsArrayBuffer(file)
        }
        $event.target.value = null; // Đọc xong xóa value trong Input đi
    }

    const handleImport2 = ($event: any) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows: any = utils.sheet_to_json(wb.Sheets[sheets[1]]); // Index=0 (Sheet 1 từ trái sang)
                    setDataImport2(rows) // Set data để Import
                }
            }
            reader.readAsArrayBuffer(file)
        }
        $event.target.value = null; // Đọc xong xóa value trong Input đi
    }

    const handleImport3 = ($event: any) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows: any = utils.sheet_to_json(wb.Sheets[sheets[2]]); // Index=0 (Sheet 1 từ trái sang)
                    setDataImport3(rows) // Set data để Import

                    console.log(dataImport3)
                }
            }
            reader.readAsArrayBuffer(file)
        }
        $event.target.value = null; // Đọc xong xóa value trong Input đi
    }

    //_____Gọi tới API để đẩy data lên
    useEffect(() => {
        if(dataImport.length){
            const fetchData = async () => {
                const data = await importCustomerFromExcelAsync({ dataImport: JSON.stringify(dataImport), option: 1 })
                setDataImport([])

                if(!data.error){
                    return toast.success("Import thành công")
                }
                return toast.error(data.message)
            }
            fetchData()
        }
    }, [dataImport])

    useEffect(() => {
        if(dataImport2.length){
            const fetchData = async () => {
                const data = await importCustomerFromExcelAsync({ dataImport: JSON.stringify(dataImport2), option: 2 })
                setDataImport2([])

                if(!data.error){
                    return toast.success("Import thành công")
                }
                return toast.error(data.message)
            }
            fetchData()
        }
    }, [dataImport2])

    useEffect(() => {
        if(dataImport3.length){
            const fetchData = async () => {
                const data = await importCustomerFromExcelAsync({ dataImport: JSON.stringify(dataImport3), option: 3 })
                setDataImport3([])

                if(!data.error){
                    return toast.success("Import thành công")
                }
                return toast.error(data.message)
            }
            fetchData()
        }
    }, [dataImport3])
    
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

                        <button className={"flex items-center justify-center mx-3 ml-3"}
                                onClick={handleDownloadTemplateImportExcel}
                            >
                                Tải mẫu Import
                        </button>

                        <button className={"flex items-center justify-center mx-3 ml-3"}>
                            <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required hidden onChange={handleImport1}
                            accept=".xlsx, .xlsm, .xls, .csv"/>
                            <label className="custom-file-label" htmlFor="inputGroupFile">Import excel Tạo danh bạ</label>
                        </button>

                        <button className={"flex items-center justify-center mx-3 ml-3"}>
                            <input type="file" name="file" className="custom-file-input" id="inputGroupFile3" required hidden onChange={handleImport3}
                            accept=".xlsx, .xlsm, .xls, .csv"/>
                            <label className="custom-file-label" htmlFor="inputGroupFile3">***Import nhanh Danh bạ***</label>
                        </button>

                        <button className={"flex items-center justify-center mx-3 ml-3"}>
                            <input type="file" name="file" className="custom-file-input" id="inputGroupFile2" required hidden onChange={handleImport2}
                            accept=".xlsx, .xlsm, .xls, .csv"/>
                            <label className="custom-file-label" htmlFor="inputGroupFile2">Import excel Tạo hồ sơ</label>
                        </button>

                        {/* Nếu chọn 1 phẩn tử => chỉ cho update */}
                        {itemsChecked.length === 1 ? (
                            <button
                                className="mr-3"
                                onClick={() => handleOpenModalCreateOrUpdate('update')}
                            >
                                <img src={pencilIcon} alt="icon pencil" />
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
                        <th className="py-1 w-1/6">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Phân loại
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
                                Địa chỉ
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Mã số thuế
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Điện thoại
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Ngày sinh
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Ghi chú
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Thông tin khách
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
                    {listCustomers.length ? listCustomers.map((item: any) => (
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
                                {item.type > 1 ? CONTACT_TYPES[Number(item.type)-1].text : ""}
                                <p className="text-xs"><i>{item.email}</i></p>
                                <p className="text-primary-gray text-[12px]"><i>{item._id}</i></p>
                            </td>
                            <td className="py-1 px-2">
                                <Link to={`/item/contact/${item._id}`}>
                                    {item?.childs.length > 0? <b>{item.name}({item?.childs.length})</b>: item.name }
                                </Link>
                                <p className="text-primary-gray text-[12px]">{item?.sign}</p>
                                <p className="text-primary-gray text-[12px]">Tuyến trên: {item?.parent?.name || ''}</p>
                                <p className="text-primary-gray text-[12px]">Link user: {item?.linkUser?.fullname || ''}</p>
                                <p className="text-primary-gray text-[12px]">Sale: {item?.sale?.fullname || ''}</p>
                            </td>
                            <td className="py-1 px-2">{item.gender > 1 ? GENDER_TYPES[Number(item.gender)-1].text : ""}</td>
                            <td className="py-1 px-2">{item.address}</td>
                            <td className="py-1 px-2">{item.taxid}</td>
                            <td className="py-1 px-2">{item.phone}</td>
                            <td className="py-1 px-2">
                                {item.birthday ? moment(item.birthday).format('DD/MM/YYYY') : ''}
                            </td>
                            <td className="py-1 px-2">{item.note}</td>
                            <td className="py-1 px-2">{item?.nonResident > 1 ? CUSTOMER_TYPES[Number(item?.nonResident)-1].text : ''}</td>
                            <td className="py-1 px-2">
                                {item.modifyAt ? moment(item.modifyAt).format('DD/MM/YYYY - HH:mm') : ''} <br /> {item?.userUpdate?.bizfullname || ''}
                            </td>
                        </tr>
                    )) : <></>}
                </tbody>
            </table>

            {hasNextPage && (
                <div className="w-full flex justify-center my-5">
                    <button onClick={fetchNextPage}>
                        <span className="text-primary">
                            {`Xem thêm (${totalRecord - listCustomers.length})`}
                        </span>
                    </button>
                </div>
            )}
        </main>
    )
}