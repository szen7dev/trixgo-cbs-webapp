/*=====1.LIBRARY=====*/
import { FC, useState, useCallback, ChangeEvent } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import moment from "moment";
import classnames from "classnames";
import { useParams, useLocation, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { formatNumberMoney } from "utils/cmcs";

/*=====2.CSS=====*/
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/
import DeleteIcon from "assets/images/icons8-remove.svg";
import iconPencil from 'assets/images/icons8-pencil-96 1.png';

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";
import { ModalCreateOrUpdateCashFlow, ModalConfirm } from "../../sharedComponents/common";

/*=====5.TYPINGS=====*/
import CashFlowPlan from "typings/financial/cashFlowPlan";

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useCashFlowPlan } from "services/hooks/pcm/usePcmProjectCashFlowPlan";

const ProjectCashFlowPlanPage: FC<{ type: number }> = ({ type }) => {
	const { id: projectID } = useParams<{ id: string }>();
    const { pathname } = useLocation();
    const { closeModal, openModal } = useModal();
    const [keyword, setKeyword] = useState('');
    const [itemsChecked, setItemsChecked] = useState<Array<CashFlowPlan.CashFlowPlan>>([]);
    const [initialValues, setInitialValues] = useState({
        projectID,
        name: '',
        sign: '',
        type: 5,
        property: 3,
        date: '',
        priority: null,
    });

    const {
        deleteManyAsync,
        list: listCashFlowPlans,
        hasNextPage,
        refetch,
        fetchNextPage,
        totalRecord
    } = useCashFlowPlan({
        params: { keyword, projectID },
        isFetchList: true
    });

    // Reset form
    const clearData = () => {
        setInitialValues(previousValue => ({
            ...previousValue,
            name: '',
            sign: '',
            date: '',
            type: 5,
            property: 3,
            priority: null,
        }))
    }

    // Gọi lại API refetch lại danh sách sau khi tạo/update thành công
    const handleConfirmCreateOrUpdate = () => refetch();

    // Xử lý sự kiện tìm kiếm
    const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }, 500);

    // Handle for checkbox each table row
	const getStateCheckbox = useCallback((id: string) => {
		const isChecked = itemsChecked.find(_item => _item._id === id)
		return !!isChecked;
	}, [itemsChecked]);

	const handleChangeCheckbox = (item: any) => {
		const isChecked = itemsChecked.find(_item => _item._id === item._id)
        let newList: any[] = [];

		if(isChecked) {
		    newList = itemsChecked.filter(_item => _item._id !== item._id);
		} else {
			newList = [...itemsChecked, item];
		};
        setItemsChecked(newList);

        if(newList.length === 1) {
            setInitialValues(previousValue => ({
                ...previousValue,
                ...newList[0],
                cashFlowID: newList[0]._id
            }))
        }
	};

	// Handle for checkbox all
	const getStateCheckboxAll = useCallback(() => {
		return itemsChecked.length === listCashFlowPlans.length;
	}, [itemsChecked, listCashFlowPlans]);

	const handleChangeCheckboxAll = (event: ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;

		if(isChecked) {
			setItemsChecked(listCashFlowPlans);
		} else{
			setItemsChecked([]);
		}
	}

    // Xóa 1 hoặc nhiều mẩu tin
    const handleConfirmDelete = async () => {
        try {
            const ids = itemsChecked.map(item => item._id);
            const { error, data } = await deleteManyAsync(ids);

            if(error) {
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
                projectID,
                name: '',
                sign: '',
                date: '',
                type: 5,
                property: 3,
                priority: null,
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[320px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
            >
                <ModalCreateOrUpdateCashFlow
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
                        {/* <div className="w-10 h-10 bg-secondary-light rounded-full flex items-center justify-center ml-5 cursor-pointer">
                            <img src={`${process.env.PUBLIC_URL}/images/common/icon-3dots-vertical-gray.svg`} alt="Three Dot" />
                        </div> */}
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
                                    checked={getStateCheckboxAll()}
                                    onChange={handleChangeCheckboxAll}
                                />
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Nội dung
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Mã hiệu
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Kế hoạch giải ngân
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Thực tế giải ngân
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
                        <tr
                            key={item._id}
                            className={classnames('border-b border-primary-border h-10 font-bold')}
                        >
                            <td className="px-2 text-center align-middle">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={getStateCheckbox(item._id)}
                                    onChange={() => handleChangeCheckbox(item)}
                                />
                            </td>
                            <td className="px-2 align-middle">
                                <Link to={`/pcm/project/${projectID}/cash-flow/${item._id}`}>
                                    {item.name}
                                </Link>
                            </td>
                            <td className="px-2 align-middle">{item.sign}</td>
                            <td className="px-2 align-middle">{formatNumberMoney(item?.value)}</td>
                            <td className="px-2 align-middle">{formatNumberMoney(item?.realValue)}</td>
                            <td className="px-2 align-middle">{item.priority === 1 ? 'Bình thường' : 'Ưu tiên'}</td>
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