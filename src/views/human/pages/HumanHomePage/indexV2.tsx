/*=====1.LIBRARY=====*/
import { FC, useEffect, useCallback, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu } from '@headlessui/react';
import { toast } from "react-toastify";
import debounce from 'lodash/debounce';

/*=====2.CSS=====*/
import "views/human/styles/style.module.css";

/*=====3.ICONS=====*/
// import BackIcon from "assets/images/icon-back.svg";
import SearchIcon from "assets/images/icons8-search.svg";
// import ThreeDotIcon from "assets/images/icon-3dots.png";

/*=====4.PAGES/COMPONENTS=====*/
import { InputClearable, DropdownOption, Loader } from "shareComponents/common";
import { NewHumanModal } from "views/human/shareComponents/common/NewHumanModal";
import { useModal } from "services/hooks/useModal";
import { DropdownFilterButton } from "views/human/shareComponents/common";

/*=====5.TYPINGS=====*/
import type { Human } from "typings/human";

/*=====6.HOOKS/APIS=====*/
import { useFetchListHuman, useCreateContactMutation, useHumanCustom } from "services/hooks/useHuman";
import { useHistoryTraffics } from "services/hooks/auth/useAuth";
import { useListAccessByContract, useListFilterContract } from "services/hooks/cmcs/useContract";
import { useProjectCustom } from "services/hooks/items/useProject";
// import { usePcmProject } from "services/hooks/pcm/usePcmProject";

/*=====7.OTHER=====*/
import { APP_ID } from "apis/localdb"
import { createLinkAndClick } from 'utils';
import { FilterNav } from "./filterNav";
import downloadIcon from "assets/images/icons8-download-96.svg";
import iconPencil from "assets/images/icons8-pencil-96 1.png";
import iconMaleUser from "assets/images/icons8-male-user-64.svg";
import PaginateV2 from "shareComponents/common/PaginateV2";
import React from "react";
import { useAppSelector } from "redux/reducer";

export const HumanHomePageV2: FC = () => {

  // page pagination
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
  // end page pagination
  // 
  const { t } = useTranslation(["human"]);
  const { id: departmentID } = useParams<{ id: string }>();
  // const history = useHistory();

  const [pageParam, setPageParam] = useState<any>({ departmentID });
  const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
    isExporting: false,
  });
  const { openModal } = useModal();

  // Lấy ra data/messageList data ngay lúc đầu vào màn hình
  const humans = useFetchListHuman(pageParam);

  // Tạo mẩu tin mới, khởi tạo sẵn hàm createContactMutateAsync để khi user
  // bấm vào nút tạo thì gọi luôn đến api tạo mẩu tin
  const { createContactMutateAsync } = useCreateContactMutation();
  const { createHistoryTraffics } = useHistoryTraffics();
  const { exportHumanAsync } = useHumanCustom({});

  useEffect(() => {
    createHistoryTraffics(
      {
        "appID": APP_ID.HUMAN.id,
        "menuID": APP_ID.CMCS.menuCmcsApp.income.id,
        "type": 1
      }
    )
  }, [])

  const handleFinishForm = useCallback(async (values) => {
    const res = await createContactMutateAsync(values);
    if (!res.error) {
      humans.refetchListHuman()
      return true;
    }
    return false;
  }, [createContactMutateAsync, humans]);

  const handleOnFilter = useCallback((values) => {
    const optionFilter = {
      ...values,
      type: values.type?._id ?? values.type,
      gender: values.gender?._id ?? values.gender,
      realStatus: values.realStatus?._id ?? values.realStatus,
      insuranceStatus: values.insuranceStatus?._id ?? values.insuranceStatus,
      familyPolicy: values.familyPolicy?._id ?? values.familyPolicy,
      departmentID: values.department?._id ?? values.department,
      positionID: values.position?._id ?? values.position,
      contractTypeID: values.contractType?._id ?? values.contractType,
      workingStatusID: values.workingStatus?._id ?? values.workingStatus,
    }

    setPageParam(optionFilter);
    return true;
  }, []);

  // const handleOnCancelFilter = useCallback(() => {
  //   setPageParam({departmentID});
  // }, []);

  const handleOnCancelFilter = useCallback(() => {
    setPageParam({});
  }, []);

  const handleExportReport = async () => {
    try {
      setStateExport({ isExporting: true });
      const { error, data } = await exportHumanAsync({
        filterParams: pageParam
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
    <FilterNav>
      <section className="w-full">
        <div className={"flex items-center mb-2.5"}>
          <div className="w-[50px] text-center mx-1">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
          </div>
          <button className={"flex items-center justify-center w-[50px] mx-1"} onClick={handleExportReport}>
            <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"} />
          </button>
          <button
            className={"flex items-center justify-center w-[50px] mx-1"}>
            <img src={iconPencil} alt={"-----"} className={"w-[18px] h-[18px]"} />
          </button>
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

        <table className={"table-fixed border-collapse w-full"}>
          <thead>
            <tr className={"sticky top-0 z-5 border-0.5"}>
              <th className={"bg-cbs-table-header text-primary-gray text-center font-normal w-[50px] border-0 border-primary-border align-middle py-3 px-2"}>
              </th>
              <th className={"bg-cbs-table-header text-primary-gray text-left font-normal w-[90px] border-0 border-primary-border py-3 px-2"}>
                Mã hiệu
              </th>
              <th className={"bg-cbs-table-header text-primary-gray text-left font-normal w-[200px] border-0 border-primary-border py-3 px-2"}>
                Họ và tên
              </th>
              <th className={"bg-cbs-table-header text-primary-gray text-left font-normal  w-[300px] border-0 border-primary-border py-3 px-2"}>
                Thường chú
              </th>
              <th className={"bg-cbs-table-header text-primary-gray text-left  font-normal  w-[250px] border-0 border-primary-border py-3 px-2"}>
                Nguyên quán
              </th>
              <th className={"bg-cbs-table-header text-primary-gray text-left w-[90px] font-normal border-0 border-primary-border py-3 px-2"}>
                Giới tính
              </th>
              <th className={"bg-cbs-table-header text-primary-gray w-[90px] text-left font-normal border-0 border-primary-border py-3 px-2"}>
                Phòng ban
              </th>
              <th className={"bg-cbs-table-header text-primary-gray text-left w-[120px] font-normal border-0 border-primary-border py-3 px-2"}>
                Chức vụ
              </th>
              <th className={"bg-cbs-table-header text-primary-gray text-left w-[110px] font-normal border-0 border-primary-border py-3 px-2"}>
                Loại hợp đồng
              </th>
              <th className={"bg-cbs-table-header text-primary-gray text-left font-normal w-[100px] border-0 border-primary-border py-3 px-2"}>
                Tình trạng
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-0.5">
              <td className={"border-0 border-primary-border w-[50px] py-3 px-2 text-center"}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </td>
              <td className={"border-0 border-primary-border py-3 px-2"}>
                truongpv
              </td>
              <td className={"border-0 border-primary-border py-3 px-2"}>
                <span>Phan Văn Trường-PGI</span>
                <br />
                <span className="text-primary-gray">truongpv@pgipartner.com</span>
                <br />
                <span className="text-primary-gray">06/05/1991 - 0975925192</span>
              </td>
              <td className={"border-0 border-primary-border py-3 px-2  "}>
                Số 30C Doãn Kế Thiện - Phường Mai Dịch,Quận Cầu Giấy,Thành phố Hà Nội
              </td>
              <td className={"border-0 border-primary-border py-3 px-2  "}>
                Thị trấn Quỹ Nhất,Huyện Nghĩa Hưng,Tỉnh Nam Định
              </td>
              <td className={"border-0 border-primary-border py-3 px-2  "}>
                Nam
              </td>
              <td className={"border-0 border-primary-border py-3 px-2  "}>
                Phòng giá
              </td>
              <td className={"border-0 border-primary-border py-3 px-2  "}>
                Phó tổng giám đốc
              </td>
              <td className={"border-0 border-primary-border py-3 px-2  "}>
                Tạm thời
              </td>
              <td className={"border-0 border-primary-border py-3 px-2 "}>
                Đã nghỉ
              </td>
            </tr>
            <tr className="border-b-0.5">
              <td className={"border-0 border-primary-border w-[50px] py-3 px-2 text-center"}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
              </td>
              <td className={"border-0 border-primary-border py-3 px-2"}>
                truongpv
              </td>
              <td className={"border-0 border-primary-border py-3 px-2"}>
                <span>Phan Văn Trường-PGI</span>
                <br />
                <span className="text-primary-gray">truongpv@pgipartner.com</span>
                <br />
                <span className="text-primary-gray">06/05/1991 - 0975925192</span>
              </td>
              <td className={"border-0 border-primary-border py-3 px-2  "}>
                Số 30C Doãn Kế Thiện - Phường Mai Dịch,Quận Cầu Giấy,Thành phố Hà Nội
              </td>
              <td className={"border-0 border-primary-border py-3 px-2  "}>
                Thị trấn Quỹ Nhất,Huyện Nghĩa Hưng,Tỉnh Nam Định
              </td>
              <td className={"border-0 border-primary-border py-3 px-2  "}>
                Nam
              </td>
              <td className={"border-0 border-primary-border py-3 px-2  "}>
                Phòng giá
              </td>
              <td className={"border-0 border-primary-border py-3 px-2  "}>
                Phó tổng giám đốc
              </td>
              <td className={"border-0 border-primary-border py-3 px-2  "}>
                Tạm thời
              </td>
              <td className={"border-0 border-primary-border py-3 px-2 "}>
                Đã nghỉ
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </FilterNav>
  );
};