/*=====1.LIBRARY=====*/
import React, { UIEvent, FC, useState, useCallback, ChangeEvent, useEffect } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import { useParams, Link, useHistory } from 'react-router-dom';

/*=====2.CSS=====*/
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/
import DeleteIcon from "assets/images/icons8-remove.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput, ModalConfirm, Loader } from "shareComponents/common";
import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";
// import { AccessingUsers } from "../../sharedComponents/common";

import RowTableInsertInline from "./components/RowTableInsertInline";
import RowTableUpdateInline from "./components/RowTableUpdateInline";
import RowTableView from "./components/RowTableView";
import ModalShare from "./components/ModalShare";
import PaginateV2 from "shareComponents/common/PaginateV2";
import { useFunda } from 'services/hooks/items/useFunda';

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useAuth } from "services/hooks/auth/useAuth";
import { useContract } from "services/hooks/items/useContract";
import { useCashFlowPlan } from "services/hooks/financial/useCashFlow";
import CashFlowPlan from "typings/financial/cashFlowPlan";
import { User } from "typings/user";
import { useFnbGeneralBook } from 'services/hooks/fnb/useFnbGeneralBook';

export const FnbExpenseFundaDetailPage: FC = () => {
    const history = useHistory();
    const { fundaID, detailID } = useParams<{ fundaID: string, detailID: string }>();
    const { closeModal, openModal } = useModal();

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
            // cashFlowID: cashFlowId,
            populates: JSON.stringify({
                path: 'admins members userCreate',
                select: '_id bizfullname image'
            })
        },
        isFetchInfo: true
    })

    const {
        listContracts,
        hasNextPage: hasNextPageListContract,
        fetchNextPage: fetchNextPageListContract
    } = useContract({
        params: { keyword: keywordContract },
        isFetch: true
    })

    const {  
        insertAsync,
        updateAsync,
        deleteManyAsync, isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFnbGeneralBook({ 
		params: { 
			keyword: keyword, 
			fundasID: [fundaID], 
			parentID: detailID, 
			populates: JSON.stringify({
				path: 'userCreate',
				select: 'fullname',
			}) 
		}, isFetchList: true, isFetchInfo: false  });

    const { info: infoFunda } = useFunda({ params: { fundaID }, isFetchList: false, isFetchInfo: true  });
    const { info: infoBook } = useFnbGeneralBook({ params: { bookID: detailID }, isFetchList: false, isFetchInfo: true  });
    const onChangeSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }, 500);

    // Handle for checkbox each table row
	const handleChangeCheckbox = (ids: string[]) => {
        setItemsChecked(ids)
	};

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
                fundaID,
                parentID: detailID,
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
            refetch();
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
            toast.success("Lưu thành công");
            refetch();
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

    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

    return (
        <main className="relative h-full overflow-auto">
            
            <header className="sticky top-0 bg-primary-light z-10">
                <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
                    <div className="flex items-center">
                        <button onClick={history.goBack}>
                            <img src="/images/common/button_back.png" alt="Button Back" />
                        </button>
                        <p className="text-lg  ml-2">{infoFunda?.name}/{infoBook?.name}</p>
                        <SearchInput
                            classNameWrapper="ml-4 mr-2"
                            classNameInput="outline-none w-[296px]"
                            onChange={onChangeSearch}
                        />
                   
                        {/* Xóa 1 hoặc nhiều */}
                        {(itemsChecked.length && permissions.hasPermissionDelete) ? (
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
                        <PaginateV2
                            ref={ref}
                            totalRecord={totalRecord}
                            totalPages={totalPage}
                            limit={20}
                            hasNextPage={hasNextPage}
                            isFetching={isLoading}
                            nextPageAction={() => {
                                fetchNextPage();
                                setPageIndex(oldState => oldState+1)
                            }}
                            prevPageAction={() => {
                                setPageIndex(oldState => oldState-1)
                            }}
                        />
                    </div>
                </div>
            	
            </header>

            <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
                <thead className="bg-cbs-table-header h-[38px] border-b border-primary-border">
                    <tr className="text-left text-sm">
                        <th className={cn("py-1", styles.theadInput)}>
                            <div className="border-gray-300 font-normal pl-2">
                                TT
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-gray-300 font-normal pl-2">
                                Nội dung
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-gray-300 font-normal pl-2">
                                Khối lượng
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-gray-300 font-normal pl-2">
                                Đơn giá
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-gray-300 font-normal pl-2">
                                Thành tiền
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-gray-300 font-normal pl-2">
                                Người tạo
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-gray-300 font-normal pl-2">
                                Ghi chú
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                {
					(listWithPager[pageIndex]??[]).map((item: any, i: number) => (
                        <RowTableUpdateInline
                            index={i}
                            key={item._id}
                            contracts={listContracts}
                            cashFlow={item}
                            itemsChecked={itemsChecked}
                            onUpdate={handleUpdate}
                            onScrollContract={handleScroll}
                            onChangeCheckbox={handleChangeCheckbox}
                            onSearchContract={onChangeSearchContract}
                        />
				    ))}
                    { <RowTableInsertInline onInsert={handleInsert} />}
                </tbody>
            </table>

            {hasNextPage && (
                <div className="w-full flex justify-center my-5">
                    <button onClick={fetchNextPage}>
                        <span className="text-primary">

                        </span>
                    </button>
                </div>
            )}

            <ModalLarge
                show={modalShare.isShow}
                toggle={() => setModalShare(prev => ({ ...prev, isShow: !modalShare.isShow }))}
                className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-[600px] rounded-cbs-md"
            >
            </ModalLarge>
        </main>
    );
};