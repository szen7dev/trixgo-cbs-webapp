/*=====1.LIBRARY=====*/
import { UIEvent, FC, useState, useCallback, ChangeEvent, useEffect } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import { useParams, Link } from 'react-router-dom';

/*=====2.CSS=====*/
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/
import DeleteIcon from "assets/images/icons8-remove.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput, ModalConfirm, Loader } from "shareComponents/common";
import RowTableInsertInline from "./components/RowTableInsertInline";
import RowTableUpdateInline from "./components/RowTableUpdateInline";
import { AccessingUsers } from "../../sharedComponents/common";
import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";
import ModalShare from "./components/ModalShare";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useContract } from "services/hooks/items/useContract";
import { useCashFlowPlan } from "services/hooks/financial/useCashFlow";
import CashFlowPlan from "typings/financial/cashFlowPlan";
import { User } from "typings/user";

export const CashFlowDetailPage: FC = () => {
	const { cashFlowId } = useParams<{ cashFlowId: string }>();
    const { closeModal, openModal } = useModal();

    const [showRowInsert, setShowRowInsert] = useState(true);
    const [keywordContract, setKeywordContract] = useState('');
    const [keyword, setKeyword] = useState('');
    const [itemsChecked, setItemsChecked] = useState<string[]>([]);
    const [dataCashFlow, setDataCashFlow] = useState<CashFlowPlan.CashFlowPlan[]>([]);

    const [modalShare, setModalShare] = useState<{ isShow: boolean, users: User[] | undefined, modalType: 'members' | 'admins' }>({
        isShow: false,
        users: [],
        modalType: 'members'
    });

    const { info: cashFlowInfo, isLoadingInfo, refetchInfo } = useCashFlowPlan({
        params: {
            cashFlowID: cashFlowId,
            populates: JSON.stringify({
                path: 'admins members',
                select: '_id bizfullname image'
            })
        },
        isFetchInfo: true
    })

    const {
        insertAsync,
        updateAsync,
        deleteManyAsync,
        list: listCashFlowPlans,
        isLoading,
        hasNextPage,
        refetch,
        fetchNextPage,
        totalRecord
    } = useCashFlowPlan({
        params: {
            parentID: cashFlowId,
            keyword,
            sortKey: JSON.stringify(['createAt__1', '_id__1'])
        },
        isFetchList: true
    });

    const {
        listContracts,
        hasNextPage: hasNextPageListContract,
        fetchNextPage: fetchNextPageListContract
    } = useContract({
        params: { keyword: keywordContract },
        isFetch: true
    })

    useEffect(() => {
        if(!listCashFlowPlans.length) return;

        setDataCashFlow(listCashFlowPlans);
    }, [listCashFlowPlans.length])

    const onChangeSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }, 500);

    // Handle for checkbox each table row
	const handleChangeCheckbox = (ids: string[]) => {
        setItemsChecked(ids)
	};

	// Handle for checkbox all
	const getStateCheckboxAll = useCallback(() => {
		return itemsChecked.length === listCashFlowPlans.length;
	}, [itemsChecked, listCashFlowPlans]);

	const handleChangeCheckboxAll = (event: ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;

		if(isChecked) {
            const ids = listCashFlowPlans.map(item => item._id);
			setItemsChecked(ids);
		} else{
			setItemsChecked([]);
		}
	}

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        const bottom = scrollHeight - scrollTop === clientHeight;

        if(bottom && hasNextPageListContract) {
            fetchNextPageListContract();
        }
    }

    const onChangeSearchContract = (keyword: string) => setKeywordContract(keyword);

    const handleDelete = async () => {
        try {
            const { error, data } = await deleteManyAsync({
                cashFlowsID: itemsChecked
            });

            if(error) {
                return toast.warn(data?.message);
            }

            if(data.length) {
                return data.map((item: any) => toast.warn(item.message));
            }

            toast.success('Xoá dữ liệu thành công', { autoClose: 1500 });
            closeModal();
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

    const handleInsert = async (values: any) => {
        try {
            setShowRowInsert(false);

            const dataInsert = {
                parentID: cashFlowId,
                date: new Date(),
                ...values
            };
            const { error, data } = await insertAsync(dataInsert);

            if(error) {
                return toast.warn(data?.message);
            }

            if(data.length) {
                return data.map((item: any) => toast.warn(item.message));
            }

            setDataCashFlow(previous => ([
                ...previous,
                data,
            ]))
            toast.success('Tạo thành công');
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setShowRowInsert(true);
        }
    }

    const handleUpdate = async (values: any, callback: (response: any) => void) => {
        try {
            const { error, data } = await updateAsync(values);

            if(error) {
                return toast.warn(data?.message);
            }

            if(data.length) {
                return data.map((item: any) => toast.warn(item.message));
            }

            callback(data);
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    const toggleModalShare = (modalType: 'admins' | 'members', users: User[] | undefined) =>
        setModalShare({ isShow: !modalShare.isShow, users, modalType });

    if(isLoading || isLoadingInfo || !cashFlowInfo) return <Loader className="border-primary" />

    const usersShared = [...cashFlowInfo.admins, ...cashFlowInfo.members];

    return (
        <main className="relative h-full overflow-auto">
            <header className="sticky top-0 bg-primary-light z-10">
                <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
                    <div className="flex items-center">
                        <Link to={`/financial/cashflow`}>
							<img src="/images/common/button_back.png" alt="Button Back" />
						</Link>
                        <p className="text-lg ml-2">Danh sách</p>

                        <SearchInput
                            classNameWrapper="ml-4 mr-2"
                            classNameInput="outline-none w-[296px]"
                            onChange={onChangeSearch}
                        />

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
                                            <ModalConfirm onConfirm={handleDelete} />
                                        </div>
                                    )
                                }>
                                <img src={DeleteIcon} alt="Delete" />
                            </button>
                        ) : ''}
                    </div>
                    <div className={"flex-1 flex items-center justify-end"}>
                        <button
                            className="text-gray-400 mr-2"
                            onClick={() => toggleModalShare('admins', cashFlowInfo.admins)}
                        >Admin ({cashFlowInfo.admins?.length})</button> |
                        <button
                            className="text-gray-400 mr-2 ml-2"
                            onClick={() => toggleModalShare('members', cashFlowInfo.members)}
                        >Thành viên ({cashFlowInfo.members?.length})</button>
                        <AccessingUsers users={usersShared} />
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
                                Gói thầu/Hợp đồng
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Nhà thầu
                            </div>
                        </th>
                        <th className="py-1">
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
                    {dataCashFlow.length ? dataCashFlow.map(item => (
                        <RowTableUpdateInline
                            key={item._id}
                            contracts={listContracts}
                            cashFlow={item}
                            itemsChecked={itemsChecked}
                            onUpdate={handleUpdate}
                            onScrollContract={handleScroll}
                            onChangeCheckbox={handleChangeCheckbox}
                            onSearchContract={onChangeSearchContract}
                        />
                    )) : <></>}
                    {showRowInsert && <RowTableInsertInline onInsert={handleInsert} />}
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
                    refetch={refetchInfo}
                    cashFlowID={cashFlowId}
                    users={modalShare.users}
                    modalType={modalShare.modalType}
                />
            </ModalLarge>
        </main>
    );
};