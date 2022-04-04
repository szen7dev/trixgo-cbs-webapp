/*=====1.LIBRARY=====*/
import { FC, useState, useCallback } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import { toast } from "react-toastify";
import { formatNumberMoney } from "utils/cmcs";

/*=====2.CSS=====*/
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/
import DeleteIcon from "assets/images/icons8-remove.svg";
import iconPencil from 'assets/images/icons8-pencil-96 1.png';

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";
// import { ModalCreateOrUpdateCustomer, ModalConfirm } from '../../shareComponents/common';
 
/*=====5.TYPINGS=====*/
import { CashFlowPlan } from "typings/fin";

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useCashFlowPlan } from "services/hooks/pcm/usePcmProjectCashFlowPlan";

/*=====7.OTHER=====*/
const ProjectCashFlowPlanPage: FC<{ type: number }> = ({ type }) => {
    const { closeModal, openModal } = useModal();
    const [keyword, setKeyword] = useState('');
    const [itemsChecked, setItemsChecked] = useState<Array<CashFlowPlan.CashFlowPlan>>([]);
    const [initialValues, setInitialValues] = useState({
        contactID: '',
        type: '',
        name: '',
        planValue: '',
        realValue: '',
        date: '',
        realDate: '',
        note: '',
        priority: '',
        outin: '',
    });

    const {
        deleteAsync,
        list: listCashFlowPlans,
        hasNextPage,
        refetch,
        fetchNextPage,
        totalRecord
    } = useCashFlowPlan({
        params: { keyword }, // Khi keyword thay đổi giá trị => API tự động cập nhật lại Data => cập nhật lại view
        isFetchList: true
    });

    // Reset form
    const clearData = () => {
        setInitialValues(previousValue => ({
            ...previousValue,
            contactID: '',
            type: '',
            name: '',
            planValue: '',
            realValue: '',
            date: '',
            realDate: '',
            note: '',
            priority: '',
            outin: '',
        }))
    }

    // Gọi lại API refetch lại danh sách sau khi tạo/update thành công
    const handleConfirmCreateOrUpdate = () => refetch();

    // Xử lý sự kiện tìm kiếm
    const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }, 500);

    // Làm việc với update mẩu tin
    const onClickCheckButton = (doc: CashFlowPlan.CashFlowPlan) => {
        const check = itemsChecked.find(item => item._id === doc._id);
        let newListIDChecked = [];

        if (check) {
            newListIDChecked = itemsChecked.filter(item => item._id !== doc._id)
            setItemsChecked(newListIDChecked);
        } else {
            newListIDChecked = [...itemsChecked, doc];
            setItemsChecked(newListIDChecked);
        };

        // if (newListIDChecked.length === 1) {
        //     const { _id, outin, type, name, planValue, date, realValue, note, priority,   } = newListIDChecked[0];
        //     setInitialValues({
        //         contactID: _id,
        //         outin,
        //         type,
        //         name,
        //         planValue,
        //         date,
        //         realValue: realValue || '',
        //         note: note || '',
        //         priority: priority || '',
        //     });
        // } else {
        //     clearData();
        // }
    };

    // Check chọn 1 hoặc nhiều mẩu tin
    const getStateChecked = useCallback((id: string) => {
        const user = itemsChecked.find(item => item._id === id);
        return user ? true : false;
    }, [itemsChecked]);

    const getStateCheckedAll = useCallback(() => {
        return itemsChecked.length == listCashFlowPlans.length;
    }, [itemsChecked]);

    const onClickCheckAll = () => {
        if (itemsChecked.length == listCashFlowPlans.length) {
            setItemsChecked([]);
        } else {
            setItemsChecked(listCashFlowPlans);
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
                contactID: '',
                type: '',
                name: '',
                planValue: '',
                date: '',
                realValue: '',
                realDate: '',
                note: '',
                priority: '',
                outin: '',
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[620px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
            >
                {/* <ModalCreateOrUpdateCustomer
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdate}
                /> */}
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
                                            {/* <ModalConfirm onConfirm={handleConfirmDelete} /> */}
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
                        <th className="w-1/12 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Nội dung
                            </div>
                        </th>
                        <th className="w-1/6 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Gói thầu/Hợp đồng
                            </div>
                        </th>
                        <th className="w-1/5 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Nhà thầu
                            </div>
                        </th>
                        <th className="w-1/6 py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Giá trị kế hoạch
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Ngày kế hoạch
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Giá trị thực tế
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                               Ngày thực tế
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Ghi chú
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Mức độ ưu tiên
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {listCashFlowPlans.length ? listCashFlowPlans.map(item => (
                        <tr key={item._id} className="border-b border-primary-border h-10">
                            <td className="py-1 px-2 text-center">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={getStateChecked(item._id)}
                                    onChange={() => onClickCheckButton(item)}
                                />
                            </td>
                            <td className="py-1 px-2">{item.type}</td>
                            <td className="py-1 px-2">{item.name}</td>
                            <td className="py-1 px-2"></td>
                            <td className="text-right py-1 px-2">{formatNumberMoney(item.planValue || 0)}</td>
                            <td className="text-right py-1 px-2">{item.date ? moment(item.date).format('DD/MM/YYYY') : ''}</td>
                            <td className="text-right py-1 px-2">{formatNumberMoney(item.realValue || 0)}</td>
                            <td className="text-right py-1 px-2">{item.realDate ? moment(item.realDate).format('DD/MM/YYYY') : ''}</td>
                            <td className="py-1 px-2">{item.note}</td>
                            <td className="py-1 px-2"></td>
                        </tr>
                    )) : <></>}
                </tbody>
            </table>

            {hasNextPage && (
                <div className="w-full flex justify-center my-5">
                    <button onClick={fetchNextPage}>
                        <span className="text-primary">
                            {`Xem thêm (${totalRecord - listCashFlowPlans.length})`}
                        </span>
                    </button>
                </div>
            )}
        </main>
    );
};

export default ProjectCashFlowPlanPage;