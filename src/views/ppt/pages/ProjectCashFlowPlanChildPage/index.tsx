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
import { SearchInput } from "shareComponents/common";
import { ModalConfirm, RowTableInsertInline, RowTableUpdateInline } from "../../sharedComponents/common";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useContract } from "services/hooks/items/useContract";
import { useCashFlowPlan } from "services/hooks/pcm/usePcmProjectCashFlowPlan";
import { CashFlowPlan } from "typings/fin";

const ProjectCashFlowPlanChildPage: FC = () => {
	const { id: projectID, cashFlowID } = useParams<{ id: string, cashFlowID: string }>();
    const { closeModal, openModal } = useModal();

    const [showRowInsert, setShowRowInsert] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [itemsChecked, setItemsChecked] = useState<string[]>([]);
    const [dataCashFlow, setDataCashFlow] = useState<CashFlowPlan.CashFlowPlan[]>([]);

    const {
        insertAsync,
        updateAsync,
        deleteManyAsync,
        list: listCashFlowPlans,
        hasNextPage,
        refetch,
        fetchNextPage,
        totalRecord
    } = useCashFlowPlan({
        params: { keyword, projectID, parentID: cashFlowID },
        isFetchList: true
    });

    const {
        listContracts,
        hasNextPage: hasNextPageListContract,
        fetchNextPage: fetchNextPageListContract
    } = useContract({
        params: { projectID },
        isFetch: true
    })

    useEffect(() => {
        if(!listCashFlowPlans.length) return;

        setDataCashFlow(listCashFlowPlans);
    }, [listCashFlowPlans.length])

    const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
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
                projectID,
                parentID: cashFlowID,
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

    return (
        <main className="relative h-full overflow-auto">
            <header className="sticky top-0 bg-primary-light z-10">
                <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
                    <div className="flex items-center">
                        <Link to={`/pcm/project/${projectID}/cash-flow`}>
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
                            onScroll={handleScroll}
                            onChangeCheckbox={handleChangeCheckbox}
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
        </main>
    );
};

export default ProjectCashFlowPlanChildPage;