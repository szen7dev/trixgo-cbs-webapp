/*=====1.LIBRARY=====*/
import { FC, useState, useCallback, ChangeEvent, useMemo } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import { useParams, Link } from 'react-router-dom';
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
import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";
import ModalShare from "./components/ModalShare";

/*=====5.TYPINGS=====*/
import CashFlowPlan from "typings/financial/cashFlowPlan";

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useModal } from "services/hooks/useModal";
import { useCashFlowPlan } from "services/hooks/financial/useCashFlow";
import { User } from "typings/user";

const ProjectCashFlowPlanPage: FC<{ outin: number }> = ({ outin }) => {
	const { id: projectID } = useParams<{ id: string }>();
    const { closeModal, openModal } = useModal();
    const [keyword, setKeyword] = useState('');
    const [itemsChecked, setItemsChecked] = useState<Array<CashFlowPlan.CashFlowPlan>>([]);
    const [initialValues, setInitialValues] = useState({
        projectID,
        name: '',
        note: '',
        sign: '',
        outin,
        type: 5,
        property: 3,
        date: '',
        priority: null,
    });

    const [modalShare, setModalShare] = useState<{
        isShow: boolean,
        users: User[] | undefined,
        cashFlowId: string,
        projectID: string,
        hasPermission: boolean,
        modalType: 'members' | 'admins'
    }>({
        isShow: false,
        users: [],
        hasPermission: false,
        cashFlowId: '',
        projectID: '',
        modalType: 'members'
    });

    const { user } = useAuth();

    const {
        deleteManyAsync,
        list: listCashFlowPlans,
        hasNextPage,
        refetch,
        fetchNextPage,
        totalRecord
    } = useCashFlowPlan({
        params: { keyword, projectID, outin },
        isFetchList: true
    });

    // Reset form
    const clearData = () => {
        setInitialValues(previousValue => ({
            ...previousValue,
            name: '',
            note: '',
            sign: '',
            date: '',
            outin,
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
	const getStateCheckboxAll = useMemo(() => {
        if(!itemsChecked.length && !listCashFlowPlans.length) return false;
		return itemsChecked.length === listCashFlowPlans.length;
	}, [itemsChecked.length, listCashFlowPlans.length]);

	const handleChangeCheckboxAll = (event: ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;

		if(isChecked) {
			setItemsChecked(listCashFlowPlans);
		} else{
			setItemsChecked([]);
		}
	}

    const handleConfirmDelete = async () => {
        try {
            const ids = itemsChecked.map(item => item._id);
            const { error, status, data } = await deleteManyAsync(ids);

            if(error || status !== 200) {
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
                note: '',
                sign: '',
                date: '',
                outin,
                type: 5,
                property: 3,
                priority: null,
            };
        }

        openModal(
            <div
                className={"inline-block w-[521px] h-[350px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"}
            >
                <ModalCreateOrUpdateCashFlow
                    modalType={modalType}
                    initialValues={initValues}
                    onConfirm={handleConfirmCreateOrUpdate}
                />
            </div>
        )
    }

    const toggleModalShare = (cashFlow: CashFlowPlan.CashFlowPlan, modalType: 'admins' | 'members') =>
        setModalShare({
            isShow: !modalShare.isShow,
            users: cashFlow.members,
            cashFlowId: cashFlow._id,
            projectID: cashFlow.project?._id,
            hasPermission: true,
            modalType
        });

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
                                    checked={getStateCheckboxAll}
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
                                Phân loại
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
                                Ghi chú
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Tác vụ
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {listCashFlowPlans.length ? listCashFlowPlans.map(item => (
                        <tr key={item._id} className="border-b border-primary-border h-10">
                            <td className="px-2 text-center align-middle">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={getStateCheckbox(item._id)}
                                    onChange={() => handleChangeCheckbox(item)}
                                />
                            </td>
                            <td className="px-2 align-middle">
                                <Link to={`/pcm/project/${projectID}/cash-flow/${item._id}/${outin}`}>
                                    {item.name}
                                </Link>
                            </td>
                            <td className="px-2 align-middle">{item.sign}</td>
                            <td className="px-2 align-middle">{item.outin === 1 ? 'Bán ra' : 'Mua vào'}</td>
                            <td className="px-2 align-middle">{formatNumberMoney(item?.value)}</td>
                            <td className="px-2 align-middle">{formatNumberMoney(item?.realValue)}</td>
                            <td className="px-2 align-middle">{item.note}</td>
                            <td className="px-2 align-middle">
                                {item.userCreate?._id === user?._id && (
                                    <button
                                        className="text-primary underline"
                                        onClick={() => toggleModalShare(item, 'members')}
                                    >
                                        Share
                                    </button>
                                )}
                            </td>
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

            <ModalLarge
                show={modalShare.isShow}
                toggle={() => setModalShare(prev => ({ ...prev, isShow: !modalShare.isShow }))}
                className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-[600px] rounded-cbs-md"
            >
                <ModalShare
                    toggle={() => setModalShare(prev => ({ ...prev, isShow: !modalShare.isShow }))}
                    cashFlowID={modalShare.cashFlowId}
                    projectID={modalShare.projectID}
                    users={modalShare.users}
                    modalType={modalShare.modalType}
                    hasPermission={modalShare.hasPermission}
                />
            </ModalLarge>
        </main>
    );
};

export default ProjectCashFlowPlanPage;