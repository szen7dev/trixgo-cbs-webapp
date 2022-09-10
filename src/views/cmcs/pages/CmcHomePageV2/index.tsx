import React, {FC, useEffect, useState} from "react";
import projectIcon from "assets/images/icons8-project-50.svg";
import timetableIcon from "assets/images/icons8-timetable-48.svg";
import {debounce} from "lodash";
import {DropdownSearchableV2} from "shareComponents/common";
import {setFilterDropdown} from "redux/reducer/CmcsHomeSlice";
import {useProjectCustom} from "services/hooks/items/useProject";
import {useDispatch} from "react-redux";
import PaginateV2 from "shareComponents/common/PaginateV2";
import {useAppSelector} from "redux/reducer";
import {useListAccessByContract, useListFilterContract} from "services/hooks/cmcs/useContract";
import TriangleDown from "assets/icons/TriangleDown";
import moment from "moment";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import downloadIcon from "assets/images/icons8-download-96.svg";
import iconPencil from "assets/images/icons8-pencil-96 1.png";
import iconMaleUser from "assets/images/icons8-male-user-64.svg";
import {formatNumberMoney} from "utils";
import {CONTRACT_COME_IN_STATUS} from "apis/localdb";
import categoryIcon from "assets/images/icons8-category-48.svg";
import {Link} from "react-router-dom";

const CmcHomePageV2:FC = () => {
    const dispatch = useDispatch();
    const {keywordInput} = useAppSelector(
        (state) => state.cmcsHome.data
    );

    useEffect(() => {
        setPageIndex(0);
        ref.current&&ref.current.resetPaginate();
    }, [keywordInput]);

    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

    const [recordSelected, setSelectRecord] = useState<any>({});

    const [fromToDate, setFromToDate] = useState({fromDate: "", toDate: ""})

    const [projectKeyword, setProjectKeyword] = useState("");
    const [projectsID, setProjectsID] = useState<string[]>([]);

    const { listProjectsUserIsMember } = useProjectCustom({ paramsProjectsUserIsMember: { keyword: projectKeyword }, isFetchProjectsUserIsMember: true});

    const [listAccessByContractSellKeyword, setListAccessByContractSellKeyword] = useState("");
    const [buyerInfosID, setBuyerInfosID] = useState<string[]>([]);

    const [listAccessByContractBuyKeyword, setListAccessByContractBuyKeyword] = useState("");
    const [sellerInfosID, setSellerInfosID] = useState<string[]>([]);

    const { listAccessByContract:  listAccessByContractSell} = useListAccessByContract({ params: {keyword: listAccessByContractSellKeyword, option: 1}, isFetchList: true} );
    const { listAccessByContract: listAccessByContractBuy } = useListAccessByContract({ params: {keyword: listAccessByContractBuyKeyword, option: 2}, isFetchList: true} );

    const [ statuss, setStatuss ]  = useState<string[]>([]);
    const [ ontimes, setOntimes ]  = useState<string[]>([]);
    const [ onbudgets, setOnbudgets ]  = useState<string[]>([]);

    const {isLoading, totalRecord, totalPage, hasNextPage, listCmcsByFilterWithPager, fetchNextPageListCmcsByFilter} = useListFilterContract({
        params: {
            ...fromToDate,
            projectsID,
            buyerInfosID,
            sellerInfosID,
            statuss,
            ontimes,
            onbudgets,
            keyword: keywordInput
        },
        isFetchList: true
    })
    return (
        <div className="cmcs-home flex flex-col h-full overflow-hidden">
            <div className={"sticky top-0 bg-white z-10"}>
                <div className={"filter-bar flex flex-wrap px-4 py-2"}>
                    <DropdownSearchableV2
                        className={"mr-4 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Dự án"}
                        prefixIcon={<img className={"mr-2"} src={projectIcon} alt={"icon"}/>}
                        isMultiple={true}
                        allowClearValueSingleInput={true}
                        data={listProjectsUserIsMember}
                        formatItem={{
                            id: "_id",
                            text: "name"
                        }}
                        onSearchInputChange={debounce(valueSearch => setProjectKeyword(valueSearch), 500)}
                        onchangeValue={item => {
                            const cloneIDs = [...projectsID];
                            cloneIDs.push(item._id);
                            setProjectsID(cloneIDs);
                            dispatch(setFilterDropdown({keyFilter: "projectsID", dataFilter: cloneIDs}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        onClearData={() => {
                            setProjectsID([]);
                            dispatch(setFilterDropdown({keyFilter: "projectsID", dataFilter: []}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        onMultipleRemoveValue={id => {
                            const cloneIDs = [...projectsID];
                            const newList = cloneIDs.filter(selectId => selectId !== id);
                            setProjectsID(newList);
                            dispatch(setFilterDropdown({keyFilter: "projectsID", dataFilter: newList}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        renderItem={(item) => (
                            <p className={"min-w-[300px]"}>{item.sign}.{item.text}</p>
                        )}
                        selectOneByOne={true}
                    />
                    <TimeRangeDropdown
                        className={
                            "mr-4 border border-primary-border rounded-lg mb-2 p-1 pl-2 "
                        }
                        placeholder={"Năm ký"}
                        iconBack={<TriangleDown />}
                        iconFront={<img src={timetableIcon} alt={"----"} />}
                        onValueChange={(val) => {
                            setFromToDate(val)
                            dispatch(setFilterDropdown({keyFilter: "fromDate", dataFilter: val.fromDate}))
                            dispatch(setFilterDropdown({keyFilter: "toDate", dataFilter: val.toDate}))
                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        options={[
                            {
                                text: "Tất cả",
                                fromDate: "",
                                toDate: "",
                            },
                            {
                                text: moment().subtract(2, 'y').format("YYYY"),
                                fromDate: moment().subtract(2, 'y').startOf('year').format("YYYY-MM-DD"),
                                toDate: moment().subtract(2, 'y').endOf('year').format("YYYY-MM-DD"),
                            },
                            {
                                text: moment().subtract(1, 'y').format("YYYY"),
                                fromDate: moment().subtract(1, 'y').startOf('year').format("YYYY-MM-DD"),
                                toDate: moment().subtract(1, 'y').endOf('year').format("YYYY-MM-DD"),
                            },
                            {
                                text: moment().format("YYYY"),
                                fromDate: moment().startOf('year').format("YYYY-MM-DD"),
                                toDate: moment().endOf('year').format("YYYY-MM-DD"),
                            },
                        ]}
                    />
                    <DropdownSearchableV2
                        className={"mr-4 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Bên mua"}
                        prefixIcon={<img className={"mr-2"} src={iconMaleUser} alt={"icon"}/>}
                        isMultiple={true}
                        allowClearValueSingleInput={true}
                        data={listAccessByContractBuy}
                        formatItem={{
                            id: "_id",
                            text: "name"
                        }}
                        onSearchInputChange={debounce(valueSearch => setListAccessByContractBuyKeyword(valueSearch), 500)}
                        onchangeValue={item => {
                            const cloneIDs = [...buyerInfosID];
                            cloneIDs.push(item._id);
                            setBuyerInfosID(cloneIDs);
                            dispatch(setFilterDropdown({keyFilter: "buyerInfosID", dataFilter: cloneIDs}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        onClearData={() => {
                            setBuyerInfosID([]);
                            dispatch(setFilterDropdown({keyFilter: "buyerInfosID", dataFilter: []}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        onMultipleRemoveValue={id => {
                            const cloneIDs = [...buyerInfosID];
                            const newList = cloneIDs.filter(selectId => selectId !== id);
                            setBuyerInfosID(newList);
                            dispatch(setFilterDropdown({keyFilter: "buyerInfosID", dataFilter: newList}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        renderItem={(item) => (
                            <p className={"min-w-[300px]"}>{item.company.sign}.{item.text}</p>
                        )}
                        selectOneByOne={true}
                    />
                    <DropdownSearchableV2
                        className={"mr-4 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Bên bán"}
                        prefixIcon={<img className={"mr-2"} src={iconMaleUser} alt={"icon"}/>}
                        isMultiple={true}
                        allowClearValueSingleInput={true}
                        data={listAccessByContractSell}
                        formatItem={{
                            id: "_id",
                            text: "name"
                        }}
                        onSearchInputChange={debounce(valueSearch => setListAccessByContractSellKeyword(valueSearch), 500)}
                        onchangeValue={item => {
                            const cloneIDs = [...sellerInfosID];
                            cloneIDs.push(item._id);
                            setSellerInfosID(cloneIDs);
                            dispatch(setFilterDropdown({keyFilter: "sellerInfosID", dataFilter: cloneIDs}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        onClearData={() => {
                            setSellerInfosID([]);
                            dispatch(setFilterDropdown({keyFilter: "sellerInfosID", dataFilter: []}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        onMultipleRemoveValue={id => {
                            const cloneIDs = [...sellerInfosID];
                            const newList = cloneIDs.filter(selectId => selectId !== id);
                            setSellerInfosID(newList);
                            dispatch(setFilterDropdown({keyFilter: "sellerInfosID", dataFilter: newList}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        renderItem={(item) => (
                            <p className={"min-w-[300px]"}>{item.company.sign}.{item.text}</p>
                        )}
                        selectOneByOne={true}
                    />
                    <DropdownSearchableV2
                        selectOneByOne={true}
                        className={"mr-2 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Trạng thái"}
                        prefixIcon={
                            <img className={"mr-2"} src={categoryIcon} alt={"icon"} />
                        }
                        isMultiple={true}
                        disableSearch={true}
                        onchangeValue={item => {
                            const cloneIDs = [...statuss];
                            cloneIDs.push(item.value);
                            setStatuss(cloneIDs);
                            dispatch(setFilterDropdown({keyFilter: "statuss", dataFilter: cloneIDs}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        onClearData={() => {
                            setStatuss([]);
                            dispatch(setFilterDropdown({keyFilter: "statuss", dataFilter: []}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        onMultipleRemoveValue={id => {
                            const cloneIDs = [...statuss];
                            const newList = cloneIDs.filter(selectId => selectId !== id);
                            setStatuss(newList);
                            dispatch(setFilterDropdown({keyFilter: "statuss", dataFilter: newList}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        data={CONTRACT_COME_IN_STATUS}
                        renderItem={(item) => (
                            <p className={"min-w-[300px]"}>{item.text}</p>
                        )}
                        formatItem={{
                            id: "value"
                        }}
                    />
                    <DropdownSearchableV2
                        selectOneByOne={true}
                        className={"mr-2 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Tiến độ"}
                        prefixIcon={
                            <img className={"mr-2"} src={categoryIcon} alt={"icon"} />
                        }
                        isMultiple={true}
                        disableSearch={true}
                        onchangeValue={item => {
                            const cloneIDs = [...ontimes];
                            cloneIDs.push(item.id as string);
                            setOntimes(cloneIDs);
                            dispatch(setFilterDropdown({keyFilter: "ontimes", dataFilter: cloneIDs}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        onClearData={() => {
                            setOntimes([]);
                            dispatch(setFilterDropdown({keyFilter: "ontimes", dataFilter: []}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        onMultipleRemoveValue={id => {
                            const cloneIDs = [...ontimes];
                            const newList = cloneIDs.filter(selectId => selectId !== id);
                            setOntimes(newList);
                            dispatch(setFilterDropdown({keyFilter: "ontimes", dataFilter: newList}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        data={[
                            {
                                id: 1,
                                text: "Đúng tiến độ"
                            },
                            {
                                id: 2,
                                text: "Chậm tiến độ"
                            }
                        ]}
                        renderItem={(item) => (
                            <p className={"min-w-[300px]"}>{item.text}</p>
                        )}
                    />
                    <DropdownSearchableV2
                        selectOneByOne={true}
                        className={"mr-2 border border-primary-border rounded-lg mb-2"}
                        placeholder={"Ngân sách"}
                        prefixIcon={
                            <img className={"mr-2"} src={categoryIcon} alt={"icon"} />
                        }
                        isMultiple={true}
                        disableSearch={true}
                        onchangeValue={item => {
                            const cloneIDs = [...onbudgets];
                            cloneIDs.push(item.id as string);
                            setOnbudgets(cloneIDs);
                            dispatch(setFilterDropdown({keyFilter: "onbudgets", dataFilter: cloneIDs}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        onClearData={() => {
                            setOnbudgets([]);
                            dispatch(setFilterDropdown({keyFilter: "onbudgets", dataFilter: []}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        onMultipleRemoveValue={id => {
                            const cloneIDs = [...onbudgets];
                            const newList = cloneIDs.filter(selectId => selectId !== id);
                            setOnbudgets(newList);
                            dispatch(setFilterDropdown({keyFilter: "onbudgets", dataFilter: newList}))

                            setPageIndex(0);
                            ref.current&&ref.current.resetPaginate();
                        }}
                        data={[
                            {
                                id: 1,
                                text: "Đúng ngân sách"
                            },
                            {
                                id: 2,
                                text: "Vượt ngân sách"
                            }
                        ]}
                        renderItem={(item) => (
                            <p className={"min-w-[300px]"}>{item.text}</p>
                        )}
                    />
                </div>

                <div className={"flex items-center"}>
                    <span className={"text-lg mx-4"}>Kết quả tìm kiếm</span>
                    <button className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button>
                    {
                        recordSelected._id&&
                        <button
                            className={"flex items-center justify-center mx-3 ml-6"}>
                            <img src={iconPencil} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                        </button>
                    }
                    <PaginateV2
                        ref={ref}
                        totalRecord={totalRecord}
                        totalPages={totalPage}
                        limit={10}
                        hasNextPage={hasNextPage}
                        isFetching={isLoading}
                        nextPageAction={() => {
                            fetchNextPageListCmcsByFilter();
                            setPageIndex(oldState => oldState+1)
                        }}
                        prevPageAction={() => {
                            setPageIndex(oldState => oldState-1)
                        }}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <table className={"table-fixed border-collapse w-full"}>
                    <thead>
                    <tr className={"sticky top-0 z-5"}>
                        <th className={"bg-cbs-table-header text-primary-gray text-center font-normal w-[50px] border-0.5 border-primary-border align-middle py-3 px-2"}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                            />
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left font-normal border-0.5 border-primary-border py-3 px-2"}>
                            Hợp đồng
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left font-normal w-[100px] border-0.5 border-primary-border py-3 px-2"}>
                            Ngày ký
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left max-w-[90px] font-normal border-0.5 border-primary-border py-3 px-2"}>
                            Giá trị ký + phát sinh (gồm cả VAT)
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left max-w-[90px] font-normal border-0.5 border-primary-border py-3 px-2"}>
                            Sản lượng (gồm cả VAT)
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left max-w-[90px] font-normal border-0.5 border-primary-border py-3 px-2"}>
                            Giá trị nghiệm thu hoàn thành
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray max-w-[90px] text-left font-normal border-0.5 border-primary-border py-3 px-2"}>
                            Giá trị đề nghị tạm ứng+thanh toán
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left max-w-[90px] font-normal border-0.5 border-primary-border py-3 px-2"}>
                            Giá trị đã tạm ứng, thanh toán
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left max-w-[90px] font-normal border-0.5 border-primary-border py-3 px-2"}>
                            Còn lại phải thanh toán
                        </th>
                        <th className={"bg-cbs-table-header text-primary-gray text-left font-normal w-[100px] border-0.5 border-primary-border py-3 px-2"}>
                            Tình trạng
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* <tr>
                        <td className={"border-0.5 border-primary-border py-3 px-2 text-center"}>

                        </td>
                        <td className={"border-0.5 border-primary-border py-3 px-2"}>
                        </td>
                        <td className={"border-0.5 border-primary-border py-3 px-2"}>
                        </td>
                        <td className={"border-0.5 border-primary-border py-3 px-2 text-center text-cbs-highlight-color font-bold"}>
                            15.332.000.000
                        </td>
                        <td className={"border-0.5 border-primary-border py-3 px-2 text-center text-cbs-highlight-color font-bold"}>
                            15.332.000.000
                        </td>
                        <td className={"border-0.5 border-primary-border py-3 px-2 text-center text-cbs-highlight-color font-bold"}>
                            15.332.000.000
                        </td>
                        <td className={"border-0.5 border-primary-border py-3 px-2 text-center text-cbs-highlight-color font-bold"}>
                            15.332.000.000
                        </td>
                        <td className={"border-0.5 border-primary-border py-3 px-2 text-center text-cbs-highlight-color font-bold"}>
                            15.332.000.000
                        </td>
                        <td className={"border-0.5 border-primary-border py-3 px-2 text-center text-cbs-highlight-color font-bold"}>
                            15.332.000.000
                        </td>
                        <td className={"border-0.5 border-primary-border py-3 px-2"}>
                        </td>
                    </tr> */}
                    {
                        (listCmcsByFilterWithPager[pageIndex]??[]).map((cmcs, i) => (
                            <tr key={cmcs._id}>
                                <td className={"border-0.5 border-primary-border py-3 px-2 text-center"}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id={"flexCheckDefault_" + cmcs._id}
                                        checked={cmcs._id === recordSelected._id}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectRecord(cmcs);
                                                return null;
                                            }
                                            setSelectRecord({});
                                            return null;
                                        }}
                                    />
                                </td>
                                <td className={"border-0.5 border-primary-border py-3 px-2"}>
                                    <Link to={`/cmcs/home/${cmcs._id}/tab/1`}>{cmcs.project.sign}.{cmcs.name} - {cmcs.sign}</Link>
                                </td>
                                <td className={"border-0.5 border-primary-border py-3 px-2"}>
                                    {moment(cmcs.date).format('DD/MM/YYYY')}
                                </td>
                                <td className={"border-0.5 border-primary-border py-3 px-2 text-center"}>
                                    {formatNumberMoney((cmcs.value??0)+(cmcs.vatValue??0)+(cmcs.plus??0)+(cmcs.vatPlus??0))}
                                </td>
                                <td className={"border-0.5 border-primary-border py-3 px-2 text-center"}>
                                    {formatNumberMoney((cmcs.produce??0)+(cmcs.vatProduce??0)+(cmcs.plusProduce??0)+(cmcs.vatPlusProduce??0))}
                                </td>
                                <td className={"border-0.5 border-primary-border py-3 px-2 text-center"}>
                                    {formatNumberMoney((cmcs.acceptance??0)+(cmcs.vatAcceptance??0)+(cmcs.plusAcceptance??0)+(cmcs.vatPlusAcceptance??0))}
                                </td>
                                <td className={"border-0.5 border-primary-border py-3 px-2 text-center"}>
                                    {formatNumberMoney(cmcs.recommendedPayment??0)}
                                </td>
                                <td className={"border-0.5 border-primary-border py-3 px-2 text-center"}>
                                    {formatNumberMoney((cmcs.advancePaymentPaid??0)+(cmcs.amountPaid??0))}
                                </td>
                                <td className={"border-0.5 border-primary-border py-3 px-2 text-center"}>
                                    {formatNumberMoney(cmcs.remainingPayment??0)}
                                </td>
                                <td className={"border-0.5 border-primary-border py-3 px-2"}>
                                    {CONTRACT_COME_IN_STATUS.find(status => status.value === cmcs.status)?.text}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CmcHomePageV2;