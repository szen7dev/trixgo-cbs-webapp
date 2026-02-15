/*=====1.LIBRARY=====*/
import React, { UIEvent, FC, useState, ChangeEvent, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import { useParams, Link } from 'react-router-dom';
import iconRefresh from "assets/images/icons8-refresh.png";
import PaginateV2 from "shareComponents/common/PaginateV2";
import { createLinkAndClick } from "utils";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput, Loader } from "shareComponents/common";

import RowTableInsertInline from "./components/RowTableInsertInline";
import RowTableUpdateInline from "./components/RowTableUpdateInline";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useContract } from "services/hooks/items/useContract";
import { useCashFlowPlan } from "services/hooks/financial/useCashFlow";
import CashFlowPlan from "typings/financial/cashFlowPlan";
import { LIMIT_DROPDOWN } from "apis/localdb/index";
import {
	useDoctype,
} from "services/hooks/items/useDoctype";
import { useModal } from "services/hooks/useModal";
import { ModalConfirm } from "shareComponents/common";
import API from "apis/repository";

export const AccountingCashFlowDetailPage: FC = () => {
    const [pageIndex, setPageIndex] = useState(0)
    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);

    const { openModal, closeModal } = useModal();
    const { cashFlowId } = useParams<{ cashFlowId: string }>();

    const [showRowInsert, setShowRowInsert] = useState(true);
    const [keywordContract, setKeywordContract] = useState('');
    const [keyword, setKeyword] = useState('');
    const [itemsChecked, setItemsChecked] = useState<string[]>([]);
    const [dataCashFlow, setDataCashFlow] = useState<CashFlowPlan.CashFlowPlan[]>([]);

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
        isLoading,
        totalPage,
        hasNextPage,
        refetch,
        fetchNextPage,
        totalRecord
    } = useCashFlowPlan({
        params: {
            limit: 100,
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
        if(!listCashFlowPlans || isLoading) return;

        setDataCashFlow(listCashFlowPlans);
    }, [JSON.stringify(listCashFlowPlans)])

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

    const toggleModalOpenSign = (param: any) => {
    openModal(
        <div
        className={
            "inline-block w-[521px] h-[240px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
        }
        >
        <ModalConfirm
            title= {param?.title}
            description= {param?.description}
            onConfirm={() => handleConfirmSync({ option: param.option, cashFlowID: param.cashFlowID })}
            defaultText={false}
            onCancel={closeModal}
        />
        </div>
    )
    }

    const handleConfirmSync = useCallback(async (param: any) => {
    closeModal();

    const { data, status } = await API.post(
        `/api/fin/cash_flow_plans/sync-data`, {
        option: param.option,
        cashFlowID: param.cashFlowID,
        }
    )
    
    if (status !== 200 || data.error) {
        return toast.error(data?.message)
    }

    refetch();
    return toast.success('Đồng bộ thành công')
    }, [])

    //_____Import, export excel
    const [, setStateExport] = useState<{ isExporting: boolean }>({
    isExporting: false,
    });

    const { exportExcelAsync } = useCashFlowPlan({});

    const handleDownloadExcel = async (param: any) => {
    try {
        setStateExport({ isExporting: true });
        const { error, data } = await exportExcelAsync({
        // option: `${param.option}`,
        parentID: param.parentID,
        });
        
        if (error) {
        return toast.warn(data?.message);
        }

        data && createLinkAndClick(data, "_self");
    } catch (error: any) {
        toast.error(error.message);
    } finally {
        setStateExport({ isExporting: false });
    }
    };

    if(isLoading || isLoadingInfo || !cashFlowInfo || !user) return <Loader className="border-primary" />

    return (
        <main className="relative h-full overflow-auto">
            <header className="sticky top-0 bg-primary-light z-10">
                <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
                    <div className="flex items-center">
                        <Link to={`/accounting/cashflow`}>
							<img src="/images/common/button_back.png" alt="Button Back" />
						</Link>
                        <p className="text-lg ml-2">{cashFlowInfo.name}</p>
                        <div className="ml-3">
                            <button className={"flex text-primary-gray items-center rounded hover:bg-cbs-form-input-bg h-[30px]"} onClick={() => toggleModalOpenSign({ option: 1, cashFlowID: cashFlowInfo._id, title: 'Bạn có muốn đồng bộ không?', description: 'Dữ liệu thực tế sẽ được đồng bộ sang' })}>
                                <img src={iconRefresh} className={"w-[24px] h-[24px] mr-3"} />
                                <span>Đồng bộ</span>
                            </button>
                        </div>
                        <SearchInput
                            classNameWrapper="ml-4 mr-2"
                            classNameInput="outline-none w-[296px]"
                            onChange={onChangeSearch}
                        />
                        <div>
                            <button
                                className={"mr-2 text-primary"}
                                onClick={() => handleDownloadExcel({ option: 1, parentID: cashFlowInfo._id })}
                            >
                                Tải excel Báo cáo
                            </button>
                        </div>
                    </div>
                    <div className="absolute right-0">
                    <PaginateV2
                        ref={ref}
                        totalRecord={totalRecord}
                        totalPages={totalPage}
                        limit={100}
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
                        <th className="py-1" style={{width: '40px'}}>
                            <div className="border-r-2 border-gray-300 font-normal pl-2">
                                TT
                            </div>
                        </th>
                        <th className="py-1">
                            <div className="border-r-2 border-gray-300 font-normal pl-2" style={{minWidth: "250px"}}>
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

                    {showRowInsert && <RowTableInsertInline onInsert={handleInsert} />}
                </tbody>
            </table>
        </main>
    );
};