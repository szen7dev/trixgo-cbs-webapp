import React, { FC, useEffect, useState } from "react";
import projectIcon from "assets/images/icons8-project-50.svg";
import timetableIcon from "assets/images/icons8-timetable-48.svg";
import { debounce } from "lodash";
import { createLinkAndClick } from 'utils';
import { toast } from "react-toastify";
import { DropdownSearchableV2, Loader } from "shareComponents/common";
import { setFilterDropdown } from "redux/reducer/CmcsHomeSlice";
import { useProjectCustom } from "services/hooks/items/useProject";
import { useDispatch } from "react-redux";
import PaginateV2 from "shareComponents/common/PaginateV2";
import { useAppSelector } from "redux/reducer";
import { useListAccessByContract, useListFilterContract } from "services/hooks/cmcs/useContract";
// Hook dùng để export excel
import { useContractCustom } from "services/hooks/cmcs/useContractIncome";
import TriangleDown from "assets/icons/TriangleDown";
import moment from "moment";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import iconMaleUser from "assets/images/icons8-male-user-64.svg";
import { formatNumberMoney } from "utils";
import { CONTRACT_COME_IN_STATUS } from "apis/localdb";
import iconSmallBlackDown from "assets/images/iconSmallBlackDown.svg";
import icons8pdf from "assets/images/icons8-pdf-100 1.svg";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import defaultAva from "assets/images/image 166.jpg";
import backIcon from "assets/images/Frame 3707.svg";

const UserKpiDetail: React.FC = () => {
    const dispatch = useDispatch();
    const { keywordInput } = useAppSelector(
        (state) => state.cmcsHome.data
    );

    useEffect(() => {
        setPageIndex(0);
        ref.current && ref.current.resetPaginate();
    }, [keywordInput]);

    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const [recordSelected, setSelectRecord] = useState<any>({});

    const [fromToDate, setFromToDate] = useState({ fromDate: "", toDate: "" })

    const [projectKeyword, setProjectKeyword] = useState("");
    const [projectsID, setProjectsID] = useState<string[]>([]);

    const { listProjectsUserIsMember } = useProjectCustom({ paramsProjectsUserIsMember: { keyword: projectKeyword }, isFetchProjectsUserIsMember: true });

    const [listAccessByContractSellKeyword, setListAccessByContractSellKeyword] = useState("");
    const [buyerInfosID, setBuyerInfosID] = useState<string[]>([]);

    const [listAccessByContractBuyKeyword, setListAccessByContractBuyKeyword] = useState("");
    const [sellerInfosID, setSellerInfosID] = useState<string[]>([]);

    const { listAccessByContract: listAccessByContractSell } = useListAccessByContract({ params: { keyword: listAccessByContractSellKeyword, option: 1 }, isFetchList: true });
    const { listAccessByContract: listAccessByContractBuy } = useListAccessByContract({ params: { keyword: listAccessByContractBuyKeyword, option: 2 }, isFetchList: true });

    const [statuss, setStatuss] = useState<string[]>([]);
    const [ontimes, setOntimes] = useState<string[]>([]);
    const [onbudgets, setOnbudgets] = useState<string[]>([]);

    const { isLoading, totalRecord, totalPage, hasNextPage, listCmcsByFilterWithPager, fetchNextPageListCmcsByFilter } = useListFilterContract({
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

    //Down load excel
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
        isExporting: false,
    });

    const { exportContractAsync } = useContractCustom({});
    const handleExportReport = async () => {
        try {
            setStateExport({ isExporting: true });
            const { error, data } = await exportContractAsync({
                filterParams: {
                    ...fromToDate,
                    projectsID,
                    buyerInfosID,
                    sellerInfosID,
                    statuss,
                    ontimes,
                    onbudgets,
                    keyword: keywordInput
                },
                type: 'all'
            });
            if (error) {
                return toast.warn(data?.message);
            }

            data && createLinkAndClick(data, '_self');
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setStateExport({ isExporting: false });
        }
    }

    if (stateExport.isExporting) {
        return <Loader className="border-primary" />
    }

    return (
        <div className="p-2">
            <div className={"sticky top-0 bg-white z-10"}>
                <div className={"flex items-center py-3"}>
                    <div className="flex gap-3 items-center">
                        <button><img src={backIcon} alt="" /></button>
                        <div className="text-cbs-subtext text-[18px] leading-5 uppercase ">Nguyễn Phan Thanh Hương-CPMI</div>
                    </div>
                    <PaginateV2
                        ref={ref}
                        totalRecord={totalRecord}
                        totalPages={totalPage}
                        limit={10}
                        hasNextPage={hasNextPage}
                        isFetching={isLoading}
                        nextPageAction={() => {
                            fetchNextPageListCmcsByFilter();
                            setPageIndex(oldState => oldState + 1)
                        }}
                        prevPageAction={() => {
                            setPageIndex(oldState => oldState - 1)
                        }}
                    />
                </div>
            </div>
            <table className="border-collapse border-0.5 border-cbs-border text-[13px] leading-4">
                <thead>
                    <tr className='font-bold text-left text-[13px] leading-4'>
                        <th className="border-0.5 border-cbs-border px-[5px] w-[50px] py-3 text-center px-2">TT</th>
                        <th className="border-0.5 border-cbs-border px-[5px] py-3 px-2" style={{ width: "108px" }}>Dự án</th>
                        <th className="border-0.5 border-cbs-border px-[5px] py-3 px-2" style={{ width: "357px" }}>Công việc</th>
                        <th className="border-0.5 border-cbs-border px-[5px] py-3" style={{ width: "130px" }}>Kế hoạch kết thúc</th>
                        <th className="border-0.5 border-cbs-border px-[5px] py-3" style={{ width: "130px" }}>Thực tế kết thúc</th>
                        <th className="border-0.5 border-cbs-border px-[5px] py-3" style={{ width: "85px" }}>Đơn vị tính</th>
                        <th className="border-0.5 border-cbs-border px-[5px] py-3" style={{ width: "100px" }}>Khối lượng</th>
                        <th className="border-0.5 border-cbs-border px-[5px] py-3" style={{ width: "100px" }}>Đơn giá</th>
                        <th className="border-0.5 border-cbs-border px-[5px] py-3" style={{ width: "110px" }}>Thành tiền</th>
                        <th className="border-0.5 border-cbs-border px-[5px] py-3" style={{ width: "230px" }}>Xác nhận</th>
                        <th className="border-0.5 border-cbs-border px-[5px] py-3" style={{ width: "230px" }}>Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-[13px] leading-4'>
                        <td className="border-0.5 border-cbs-border py-4 text-center px-2">1</td>
                        <td className="border-0.5 border-cbs-border py-4 px-2">CHG.THT</td>
                        <td className="border-0.5 border-cbs-border py-4 px-2">Bóc tách khối lượng hạng mục công tác đào móng</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">15/2/2021</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">22/2/2021</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">m3</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">1.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">100.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">100.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">Nguyễn Phan Thanh Hương-CPMI</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">CĐT chưa xác nhận</td>
                    </tr>

                    <tr className='text-[13px] leading-4'>
                        <td className="border-0.5 border-cbs-border py-4 text-center px-2">2</td>
                        <td className="border-0.5 border-cbs-border py-4 px-2">CHG.THT</td>
                        <td className="border-0.5 border-cbs-border py-4 px-2">Bóc tách khối lượng hạng mục công tác đào móng</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">15/2/2021</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">22/2/2021</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">m3</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">1.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">100.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">100.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">Nguyễn Phan Thanh Hương-CPMI</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">CĐT chưa xác nhận</td>
                    </tr>

                    <tr className='text-[13px] leading-4'>
                        <td className="border-0.5 border-cbs-border py-4 text-center px-2">3</td>
                        <td className="border-0.5 border-cbs-border py-4 px-2">CHG.THT</td>
                        <td className="border-0.5 border-cbs-border py-4 px-2">Bóc tách khối lượng hạng mục công tác đào móng</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">15/2/2021</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">22/2/2021</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">m3</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">1.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">100.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">100.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">Nguyễn Phan Thanh Hương-CPMI</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">CĐT chưa xác nhận</td>
                    </tr>

                    <tr className='text-[13px] leading-4'>
                        <td className="border-0.5 border-cbs-border py-4 text-center px-2">4</td>
                        <td className="border-0.5 border-cbs-border py-4 px-2">CHG.THT</td>
                        <td className="border-0.5 border-cbs-border py-4 px-2">Bóc tách khối lượng hạng mục công tác đào móng</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">15/2/2021</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">22/2/2021</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">m3</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">1.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">100.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">100.000.000</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">Nguyễn Phan Thanh Hương-CPMI</td>
                        <td className="border-0.5 border-cbs-border px-[5px] py-4">CĐT chưa xác nhận</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default UserKpiDetail;