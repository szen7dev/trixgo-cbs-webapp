import { FC, Fragment, useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import classNames from 'classnames';

/**
 * Components, Utils
 */
import { RightClickMenuWrapper, Paginate } from "shareComponents/common";
import { MenuChildRow, ModalBudget, RowBudgetGroup } from './components';
import { formatNumberMoney } from "utils/converter";
import { createLinkAndClick } from 'utils';
import { read, utils } from 'xlsx';
import { toast } from "react-toastify";

/**
 * Hooks, Typings
 */
import { useBudget } from 'services/hooks/budget/useBudget';
import { useBudgetItem } from 'services/hooks/budget/useBudgetItem';
import { BudgetGroupRepository, BudgetWorkRepository } from "apis/budget";
import { BudgetItem } from 'typings/budget/budget-item';
import { BudgetGroup } from 'typings/budget/budget-group';
import { BudgetWork } from 'typings/budget/budget-work';

import { usePcmPlanTaskCustom } from "services/hooks/pcm/usePcm";

const executeSetState = (key: string, funcs: Array<Array<any>>, payload: any) => {
	const keys = [
	  ['create-budget-item', 'update-budget-item'],
	  ['create-budget-group', 'update-budget-group'],
	  ['create-budget-work', 'update-budget-work'],
	];
	const index = keys.findIndex(k => k.includes(key));

	// Item
	if(key.includes('item')) {
		let newData: any[] = [];

		if(key.startsWith('create')) {
			newData = [payload, ...funcs[index][0]];
		} else{
			newData = funcs[index][0].map((item: any) => item._id === payload._id ? payload : item);
		}

		funcs[index][1](newData);
	} else{
		// Group, Work
		if(key.startsWith('create')) {
			// Excute fetch data budget group or work
			if(key.includes('work')) {
				return funcs[index][2](payload.group, payload.item, payload.budget);
			} else{
				return funcs[index][2]();
			}
		}

		let stateKey = '';

		// Group
		if(funcs[index][0][payload.item]){
			stateKey = payload.item;
		}

		// Work
		if(funcs[index][0][payload.group]){
			stateKey = payload.group;
		}

		// Step 1: Find payload in listRecords and update item
		const newListRecords = funcs[index][0][stateKey]
			.listRecords?.map((item: any) => item._id === payload._id ? payload : item);

		// Step 2: Clone state data
		const newData = { ...funcs[index][0] }

		// Step 3: Assign new listRecords for group/work budget by itemID/groupID (stateKey)
		newData[stateKey]['listRecords'] = newListRecords;

		// Step 4: Set state group/work budget
		return funcs[index][1](newData);
	}
}

export const BudgetDetailPage: FC = () => {
	const { budgetID } = useParams<{ budgetID: string }>();

	const [isToggleModal, setIsToggleModal] = useState(false);
	const [initValues, setInitValues] = useState({});

	const [itemsIDToggle, setItemsIDToggle] = useState<string[]>([]);
	const [itemID, setItemID] = useState('');

	const [listBudgetItem, setListBudgetItem] = useState<BudgetItem[]>([]);

	const [listBudgetGroup, setListBudgetGroup] = useState<Record<string, {
		listRecords: BudgetGroup[],
		limit: number,
		nextCursor: string | null,
		totalRecord: number,
	}>>();

	const [listBudgetWork, setListBudgetWork] = useState<Record<string, {
		listRecords: BudgetWork[],
		limit: number,
		nextCursor: string | null,
		totalRecord: number,
	}>>();

	const {
		list: dataBudgetItem,
		fetchNextPage,
		// fetchPreviousPage,
		hasNextPage,
		totalRecord,
		// totalPage
	} = useBudgetItem({
		params: { budgetID },
		isFetchList: true
	})

	const { info: budgetInfo } = useBudget({
		params: {
			budgetID,
			select: "_id name"
		},
		isFetchInfo: true
	})

	const fetchDataBudgetGroup = async () => {
		const { error, data } = await BudgetGroupRepository.fetchList({
			itemID, budgetID
		})
		if(error) return;

		setListBudgetGroup(previous => ({
			...previous,
			[itemID]: data
		}))
	}

	const fetchDataBudgetWork = async (groupID: string, itemID: string, budgetID: string) => {
		const { error, data } = await BudgetWorkRepository.fetchList({
			groupID,
			itemID,
			budgetID
		})
		if(error) return;

		setListBudgetWork(previous => ({
			...previous,
			[groupID]: data
		}))
	}

	useEffect(() => {
		document.title = "Chi tiết ngân sách"
	}, []);

	useEffect(() => {
		if(!itemID) return;
		if(listBudgetGroup && listBudgetGroup[itemID]) return;

		fetchDataBudgetGroup();
	}, [itemID])

	useEffect(() => {
		setListBudgetItem(dataBudgetItem);
	}, [JSON.stringify(dataBudgetItem)])

	const handleConfirm = (modalType: string, payload: any) => {
		executeSetState(modalType, [
			[listBudgetItem, setListBudgetItem],
			[listBudgetGroup, setListBudgetGroup, fetchDataBudgetGroup],
			[listBudgetWork, setListBudgetWork, fetchDataBudgetWork],
		], payload);
	}

	const toggleModal = () => setIsToggleModal(!isToggleModal);

	const toggleItems = (itemID: string) => {
		const isShow = itemsIDToggle.includes(itemID);
		let newList: any[] = [];

		if(isShow) {
			newList = itemsIDToggle.filter(_itemID => _itemID !== itemID);
		} else{
			newList = [...itemsIDToggle, itemID];
		}

		setItemsIDToggle(newList);
		setItemID(itemID);
	}

	const handleMenuOpenModal = async (
		modalType:
			'create-budget-item' | 'create-budget-group' | 'create-budget-work' |
			'update-budget-item' | 'update-budget-group' | 'update-budget-work',
		item?: BudgetItem | BudgetGroup | BudgetWork
	) => {
		switch (modalType) {
			case 'create-budget-item':
				setInitValues({
					budgetID,
					modalType
				});
				break;
			case 'create-budget-group':
				item && setInitValues({
					budgetItemID: item._id,
					modalType
				})
				break;
			case 'create-budget-work':
				item && setInitValues({
					budgetGroupID: item._id,
					modalType
				})
				break;
			default:
				item && setInitValues({
					...item,
					modalType,
				});
				break;
		}

		toggleModal();
	}

	/**
     * Xử lý download template excel
     */
	const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	});

	const { downloadTemplateImportExcelTaskAsync, importTaskFromExcelAsync } = usePcmPlanTaskCustom({});

	const [dataImport, setDataImport] = useState([]);

    const handleDownloadTemplateImportExcel = async () => {
		try {
			setStateExport({ isExporting: true })
			const { error, data } = await downloadTemplateImportExcelTaskAsync({
                option: 1,
                projectID: '12334'
            })
			if(error) {
				return toast.warn(data?.message)
			}
			data && createLinkAndClick(data, '_self')
		} catch (error) {
			if(error instanceof Error)
				toast.error(error.message)
		} finally {
			setStateExport({ isExporting: false })
		}
	}

    /**
     * Xử lý import excel (đọc file)
     */
    const handleImport = ($event: any) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows: any = utils.sheet_to_json(wb.Sheets[sheets[1]]); // Index=1 (tức Sheet số 2 từ trái sang)
                    
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
                const data = await importTaskFromExcelAsync({ taskID: '123232', dataImport: JSON.stringify(dataImport) });
                setDataImport([]);
                // refetchTaskInfo?.()
                if(!data.error){
                    return toast.success("Import thành công");
                }
                return toast.error(data.message);
            }
            fetchData();
        }
    }, [dataImport])

	return (
		<main className="h-full">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<Link to={`/budget/home`}>
						<img src="/images/common/button_back.png" alt="Button Back" />
					</Link>

					<p className="text-lg ml-2">{budgetInfo?.name}</p>

					<button className={"px-4 py-2 hover:bg-cbs-table-header text-cbs-highlight-color"}
						onClick={handleDownloadTemplateImportExcel}
					>
						Tải mẫu import excel
					</button>

					<button className={"px-4 py-2 hover:bg-cbs-table-header text-cbs-highlight-color"}
					>
						<input type="file" name="file" className="custom-file-input" id="inputGroupFile" required hidden onChange={handleImport}
							accept=".xlsx, .xlsm, .xls, .csv"/>
						<label className="custom-file-label" htmlFor="inputGroupFile">Import excel tạo việc con</label>
					</button>
				</div>
				<div className="flex items-center">
					<button
						className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
						onClick={() => handleMenuOpenModal('create-budget-item')}
					>
						Tạo mới
					</button>
				</div>
			</header>

			<table className='text-medium w-full border-separate border-spacing-0 text-center'>
				<thead className="text-left">
					<tr className="font-semibold h-10">
						<th className="sticky top-0 bg-gray-300 px-1.5 z-10">
							{/* <button className="inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setShow(!show)}>{show ? '+' : '-'}</button> */}
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2 uppercase">
							TT
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2 uppercase" style={{ maxWidth: '240px' }}>
							Nội dung
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2 text-center uppercase" style={{ maxWidth: '122px' }} colSpan={4}>
							Ngân sách
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2 text-center uppercase" style={{ maxWidth: '122px' }} colSpan={3}>
							Thực hiện
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2 text-center uppercase" style={{ maxWidth: '122px' }} colSpan={3}>
							Dự kiến
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2 uppercase" style={{ maxWidth: '122px' }}>
							Ghi chú
						</th>
					</tr>
					<tr className="font-semibold h-6">
						<th className="sticky top-0 bg-gray-300 px-1.5 z-10"></th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2"></th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2" style={{ maxWidth: '240px' }}></th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Đơn vị tính
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Khối lượng
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Đơn giá
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Thành tiền
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Khối lượng
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Đơn giá
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Thành tiền
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Khối lượng
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Đơn giá
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2">
							Thành tiền
						</th>
						<th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border border-l-0 px-2"></th>
					</tr>
				</thead>

				<tbody>
					{(listBudgetItem && listBudgetItem.length) ? listBudgetItem.map((budgetItem, index) => (
						<Fragment key={budgetItem._id}>
							<RightClickMenuWrapper
								contextMenu={
									<MenuChildRow
										onAdd={handleMenuOpenModal.bind(null, 'create-budget-group', budgetItem)}
										onUpdate={handleMenuOpenModal.bind(null, 'update-budget-item', budgetItem)}
									/>
								}
								key={budgetItem._id}
								customRenderTag={"tr"}
								className="text-black text-right"
							>
								<th className='bg-gray-300 px-1.5 relative'>
									<div
										className={classNames('absolute left-1/2 bg-cbs-subtext top-1/2 w-[1px] h-1/2', {
											hidden: !itemsIDToggle.includes(budgetItem._id)
										})}
									/>
									<button className="relative inline-block text-white rounded bg-gray-700 w-5 h-5" onClick={toggleItems.bind(this, budgetItem._id)}>
										{!itemsIDToggle.includes(budgetItem._id) ? '+' : '-'}
									</button>
								</th>
								<th className='py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-center'>A{index+1}</th>
								<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-left">
									{budgetItem.name}
								</th>
								<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-center">
									{budgetItem.unit}
								</th>
								<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-right">
									{formatNumberMoney(budgetItem.quantity)}
								</th>
								<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-right">
									{formatNumberMoney(budgetItem.unitPrice)}
								</th>
								<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-right">
									{formatNumberMoney(budgetItem.amount)}
								</th>
								<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-right">
									{formatNumberMoney(budgetItem.impleQuantity)}
								</th>
								<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-right">
									{formatNumberMoney(budgetItem.impleUnitPrice)}
								</th>
								<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-right">
									{formatNumberMoney(budgetItem.impleAmount)}
								</th>
								<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-right">
									{formatNumberMoney(budgetItem.forecastQuantity)}
								</th>
								<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-right">
									{formatNumberMoney(budgetItem.forecastAmount)}
								</th>
								<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-right">
									{formatNumberMoney(budgetItem.forecastQuantity * budgetItem.forecastAmount)}
								</th>
								<th className="py-2 px-2 bg-cbs-active-comment border-t-0.5 border-cbs-border border-r-0.5 text-left">
									{budgetItem.note}
								</th>
							</RightClickMenuWrapper>

							{(listBudgetGroup && listBudgetGroup[budgetItem._id]) ?
								listBudgetGroup[budgetItem._id].listRecords?.map((budgetGroup, index) => (
									<RowBudgetGroup
										index={index}
										row={budgetGroup}
										key={budgetGroup._id}
										show={itemsIDToggle.includes(budgetItem._id)}
										onAdd={handleMenuOpenModal.bind(this, 'create-budget-work', budgetGroup)}
										onUpdate={handleMenuOpenModal.bind(this, 'update-budget-group', budgetGroup)}
										onUpdateWork={budgetWork => handleMenuOpenModal('update-budget-work', budgetWork)}
										fetchDataBudgetWork={fetchDataBudgetWork}
										listBudgetWork={listBudgetWork}
									/>
								))
							: <></>}
						</Fragment>
					)) : <></>}
				</tbody>

				{/* <tfoot>
					<tr className="text-right">
						<th className="bg-gray-300 px-1.5 z-10">
						</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">
						</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2 text-left">Tổng</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2">0</th>
						<th className="bg-cbs-summary border-0.5 border-cbs-border border-l-0 p-2"></th>
					</tr>
				</tfoot> */}
			</table>

			{/* <Paginate
				totalPages={totalPage}
				totalRecord={totalRecord}
				hasNextPage
				prevPageAction={fetchPreviousPage}
				nextPageAction={fetchNextPage}
			/> */}

			{hasNextPage && (
                <div className="w-full flex justify-center my-5">
                  <button onClick={fetchNextPage}>
                    <span className="text-primary">
                      Xem thêm ({totalRecord - listBudgetItem.length})
                    </span>
                  </button>
                </div>
			)}

			<ModalBudget
				initValues={initValues}
				isToggle={isToggleModal}
				onConfirm={handleConfirm}
				toggle={toggleModal}
			/>
		</main>
	);
};