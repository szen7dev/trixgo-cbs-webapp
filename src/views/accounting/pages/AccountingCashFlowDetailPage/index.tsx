/*=====1.LIBRARY=====*/
import { UIEvent, FC, useState, useCallback, ChangeEvent, useEffect } from "react";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import { useParams, Link, useHistory } from 'react-router-dom';

/*=====2.CSS=====*/

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput, ModalConfirm, Loader } from "shareComponents/common";
import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";
import { AccessingUsers } from "views/financial/sharedComponents/common";

import RowTableInsertInline from "./components/RowTableInsertInline";
import RowTableUpdateInline from "./components/RowTableUpdateInline";
import RowTableView from "./components/RowTableView";
import ModalShare from "./components/ModalShare";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useAuth } from "services/hooks/auth/useAuth";
import { useContract } from "services/hooks/items/useContract";
import { useCashFlowPlan } from "services/hooks/financial/useCashFlow";
import CashFlowPlan from "typings/financial/cashFlowPlan";
import { User } from "typings/user";
import { LIMIT_DROPDOWN } from "apis/localdb/index";
import {
	useDoctype,
} from "services/hooks/items/useDoctype";

export const AccountingCashFlowDetailPage: FC = () => {
    const history = useHistory();
    const { cashFlowId } = useParams<{ cashFlowId: string }>();

    const [showRowInsert, setShowRowInsert] = useState(true);
    const [keywordContract, setKeywordContract] = useState('');
    const [keyword, setKeyword] = useState('');
    const [itemsChecked, setItemsChecked] = useState<string[]>([]);
    const [dataCashFlow, setDataCashFlow] = useState<CashFlowPlan.CashFlowPlan[]>([]);

    const [permissions, setPermissions] = useState<{
        usersShared: User[];
        onlyView: boolean;
        hasPermissionCreateUpdate: boolean;
        hasPermissionDelete: boolean;
        hasPermissionShare: boolean;
    }>({
        usersShared: [],
        onlyView: true,
        hasPermissionCreateUpdate: false,
        hasPermissionDelete: false,
        hasPermissionShare: false,
    });

    const [modalShare, setModalShare] = useState<{ isShow: boolean, users: User[] | undefined, modalType: 'members' | 'admins' }>({
        isShow: false,
        users: [],
        modalType: 'members'
    });

    const { user } = useAuth();

    const { info: cashFlowInfo, isLoadingInfo, refetchInfo } = useCashFlowPlan({
        params: {
            cashFlowID: cashFlowId,
            populates: JSON.stringify({
                path: 'admins members userCreate',
                select: '_id bizfullname image'
            })
        },
        isFetchInfo: true
    })

    const {
        insertAsync,
        updateAsync,
        list: listCashFlowPlans,
        isLoading: isLoadingCashFlowPlans,
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

    const [keywordSubtype, setKeywordSubtype] = useState('');
    const { list } = useDoctype({
        params: {
            limit: LIMIT_DROPDOWN,
            type: 23,
            keyword: keywordSubtype,
            },
        isFetchList: true
    });

    useEffect(() => {
        if(!listCashFlowPlans || isLoadingCashFlowPlans) return;

        setDataCashFlow(listCashFlowPlans);
    }, [JSON.stringify(listCashFlowPlans)])

    useEffect(() => {
        if(!cashFlowInfo || !user || isLoadingInfo) return;

        const usersShared = [...cashFlowInfo?.admins, ...cashFlowInfo?.members];
        const adminsID    = cashFlowInfo.admins.map(item => item._id);
        const membersID   = cashFlowInfo.members.map(item => item._id);

        const usersIDShared = [
            ...adminsID,
            ...membersID,
        ];
        let authorID = '';

        if(typeof cashFlowInfo.userCreate === 'string') {
            authorID = cashFlowInfo.userCreate;
        } else{
            authorID = cashFlowInfo.userCreate?._id;
        }

        usersIDShared.push(authorID);

        if(!usersIDShared.includes(user._id)) {
            toast.warn('Bạn đang không có quyền truy cập');
            history.push('/accounting/cashflow');
        }

        const hasPermissionCreateUpdate = adminsID.includes(user._id) || authorID === user._id;
        const hasPermissionShare = authorID === user._id;
        const hasPermissionDelete = authorID === user._id;
        const onlyView = membersID.includes(user._id) && !adminsID.includes(user._id) && authorID !== user._id;

        setPermissions({
            usersShared,
            onlyView,
            hasPermissionCreateUpdate,
            hasPermissionDelete,
            hasPermissionShare
        })
    }, [JSON.stringify(user), JSON.stringify(cashFlowInfo)])

    const onChangeSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }, 500);

    // Handle for checkbox each table row
	const handleChangeCheckbox = (ids: string[]) => {
        setItemsChecked(ids)
	}

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        const bottom = scrollHeight - scrollTop === clientHeight;

        if(bottom && hasNextPageListContract) {
            fetchNextPageListContract();
        }
    }

    const onChangeSearchContract = (keyword: string) => setKeywordSubtype(keyword);

    const handleInsert = async (values: any) => {
        if(!permissions.hasPermissionCreateUpdate) {
            return toast.warn('Bạn không có quyền tạo nội dung này');
        }

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

    const handleUpdate = async (values: any) => {
        if(!permissions.hasPermissionCreateUpdate) {
            return toast.warn('Bạn không có quyền cập nhật nội dung này');
        }

        try {
            const { error, data } = await updateAsync(values);

            if(error) {
                return toast.warn(data?.message);
            }

            if(data.length) {
                return data.map((item: any) => toast.warn(item.message));
            }
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

    if(isLoadingCashFlowPlans || isLoadingInfo || !cashFlowInfo || !user) return <Loader className="border-primary" />

    return (
        <main className="relative h-full overflow-auto">
            <header className="sticky top-0 bg-primary-light z-10">
                <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
                    <div className="flex items-center">
                        <Link to={`/accounting/cashflow`}>
							<img src="/images/common/button_back.png" alt="Button Back" />
						</Link>
                        <p className="text-lg ml-2">{cashFlowInfo.name}</p>

                        <SearchInput
                            classNameWrapper="ml-4 mr-2"
                            classNameInput="outline-none w-[296px]"
                            onChange={onChangeSearch}
                        />
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
                        <AccessingUsers users={permissions.usersShared} />
                    </div>
                </div>
            </header>

            <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
                <thead className="bg-cbs-table-header h-[38px] border-b border-primary-border">
                    <tr className="text-left text-sm">
                        <th className="py-1" style={{width: '40px'}}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                TT
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Nội dung
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Khoản mục
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Doanh thu kế hoạch
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                               Chi phí kế hoạch
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Doanh thu thực tế
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                               Chi phí thực tế
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                Ghi chú
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {(dataCashFlow && dataCashFlow.length) ? dataCashFlow.map((item, index) => {
                        if(permissions.onlyView) {
                            return <RowTableView key={item._id} cashFlow={item} />
                        }

                        return (
                            <RowTableUpdateInline
                                key={item._id}
                                contracts={list}
                                cashFlow={item}
                                itemsChecked={itemsChecked}
                                onUpdate={handleUpdate}
                                onScrollContract={handleScroll}
                                onChangeCheckbox={handleChangeCheckbox}
                                onSearchContract={onChangeSearchContract}
                                index={Number(index + 1)}
                            />
                        )
                    }) : <></>}

                    {(showRowInsert && permissions.hasPermissionCreateUpdate) && <RowTableInsertInline onInsert={handleInsert} />}
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
                    hasPermission={permissions.hasPermissionShare}
                />
            </ModalLarge>
        </main>
    );
};