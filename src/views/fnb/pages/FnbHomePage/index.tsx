/*=====1.LIBRARY=====*/
import React, { FC, useState, UIEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { formatNumberMoney } from "utils/converter";
import { toast } from "react-toastify";

/*=====2.CSS=====*/
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "views/pcm/styles/pcm.module.css";

/*=====3.ICONS=====*/
import iconDown from "assets/images/icons8-download-64 1.svg";
// import StarIcon from '@mui/icons-material/Star';
// import StarBorderIcon from '@mui/icons-material/StarBorder';

import offlineChannelIcon from "assets/images/fnb/offline.svg";
import grabChannelIcon from "assets/images/fnb/grab.svg";
import shopeeChannelIcon from "assets/images/fnb/shopee.svg";
import gojekChannelIcon from "assets/images/fnb/gojek.svg";
import baemineChannelIcon from "assets/images/fnb/baemin.svg";
import loshipChannelIcon from "assets/images/fnb/loship.svg";

/*=====4.PAGES/COMPONENTS=====*/
// import { DropdownSearchableV2, Loader } from "shareComponents/common";
// import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";
import PaginateV2 from "shareComponents/common/PaginateV2";
import { UpdateStatusDialog } from "./UpdateStatusDialog";
// import { ModalCreateResultSearch } from "./ModalCreateResultSearch";
import { ModalDetailItem } from "./components/ModalDetailItem/index";
import { ModalErrorDetailItem } from "./components/ModalErrorDetailItem";
import { ModalConfirm } from "shareComponents/common";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useQueryListCompany } from "services/hooks/useCompanies";
import { useAuth } from "services/hooks/auth/useAuth";
import { useAppSelector } from "redux/reducer";
import { useUserSystem } from "services/hooks/users/useUserSystem";
import { useQueryListDepartmentsIsMember } from "services/hooks/items/useDepartment";
import { useSearchTask } from "services/hooks/useMainSearch";
import { useTask } from "services/hooks/useTask";
import { useModal } from "services/hooks/useModal";
import {
  useListFileFromSearch,
  useListResponseFromSearch,
  usePcmPlanTaskNotification,
} from "services/hooks/pcm/usePcmDashboardV2";
import {
  resetFilterDashboard,
  setQueryFile,
  setQueryResponse,
  setQuerySubject,
  setTabActive,
  setTabIndex,
} from "redux/reducer/DashboardV2Slice";
import API from "apis/repository";

import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';

/*=====7.OTHER=====*/
import { FNB_CHANNEL, FNB_SERVICE, FNB_PAYMENT, FNB_ORDER_STATUS } from "apis/localdb";

type Props = {
  type?: number;
};

export const FnBHomePage: FC<Props> = ({ type = 0 }) => {

  useEffect(() => {
		document.title = "Trixgo | FnB";
	}, []);

  const [keyword, setKeyword] = useState("");
  const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFnbOrder({ 
		params: { 
      limit: 50,
			keyword, 
			populates: JSON.stringify({
				path: 'funda shift customer userCreate',
        select: "name sign address bizfullname fullname phone numberOfOrders",
			}) 
		}, isFetchList: true, isFetchInfo: false  });

  // Hàm trả về icon app
  const getIconApp = (salesChannel: any) => {
    switch (salesChannel) {
      case 1:
        return offlineChannelIcon

      case 2:
        return grabChannelIcon

      case 3:
        return shopeeChannelIcon

      case 4:
        return gojekChannelIcon

      case 5:
        return baemineChannelIcon

      case 6:
        return loshipChannelIcon

      default:
        return offlineChannelIcon
    }
  }

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [pageIndex, setPageIndex] = useState(0);

  const [idsChecked, setIdsChecked] = useState<Array<string>>([]);

  const ref = React.useRef<PaginateHandle>(null);
  const tabIndex = useAppSelector((state) => state.dashboardV2.data.tabIndex);
  const tabActive = useAppSelector((state) => state.dashboardV2.data.tabActive);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    return () => {
      dispatch(setTabActive(2));
      dispatch(setTabIndex(1));
    }
  }, []);

  const { refetch: refetchPcmPlanTaskNotification } = usePcmPlanTaskNotification({ enabled: false });

  const { updateStatusMultipleAsync } = useTask({
    params: {},
    isFetchInfo: false,
  });

  const onPressUpdateStatus = async () => {
    await updateStatusMultipleAsync({ option: 2 });
    refetchPcmPlanTaskNotification();
  };

  // popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const getStateChecked = React.useCallback((id: string) => {
    return idsChecked.includes(id) ? true : false;
  }, [idsChecked]);

  const onClickCheckButton = (id: string) => {
    const check = idsChecked.includes(id);
    if (check) {
      const newList = [...idsChecked];
      newList.splice(newList.findIndex((e: any) => e == id), 1);
      setIdsChecked(newList);
    } else {
      const newList = [...idsChecked, id];
      setIdsChecked(newList);
    };
  };

  const getStateCheckedAll = React.useCallback(() => idsChecked.length == listWithPager?.[pageIndex]?.length, [idsChecked]);

  const onClickCheckAll = () => {
    if (idsChecked.length == listWithPager?.[pageIndex]?.length) {
      setIdsChecked([]);
    } else {
      const idsAll = listWithPager?.[pageIndex]?.map((e: any) => e._id);
      setIdsChecked(idsAll);
    }
  };

  const handleCancelOrder = async () => {
    try {
      closeModal();

      const response = await API.put(
        `/api/fnb/orders`,
        {
          orderID: idsChecked[0],
          status: 4
        }
      );

      if (response.status !== 200 || response.data?.error) {
        return toast.warn('Hủy đơn hàng thất bại');
      }

      refetch();
      toast.info('Hủy đơn hàng thành công');
    } catch(err: any) {
      toast.error(err.message);
    }
  }

  return (
    <div className="t-home flex flex-col h-full overflow-hidden">
      <div className={"sticky top-0 bg-white z-10"}>
        {/* <div className={"filter-bar flex flex-wrap px-4 py-2"}>
          {(isLoadingResponse ||
            isLoadingListTask ||
            isFetchingNextPageSubject ||
            isFetchingResponse ||
            isLoadingFile ||
            isFetchingFile) && <Loader className="border-primary" />}
          
          <DropdownSearchableV2
              reset={reset}
              selectOneByOne={true}
              countBadge={queryResponse.companyOfAuthorsID.length}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Cơ sở"}
              onchangeValue={(value) => {
                if (
                  !queryResponse.companyOfAuthorsID?.includes?.(
                    value.id as string
                  )
                ) {
                  const newData: any = [
                    ...queryResponse.companyOfAuthorsID,
                    value.id,
                  ];
                  dispatch(
                    setQueryResponse({
                      ...queryResponse,
                      companyOfAuthorsID: newData,
                    })
                  );
                }
                setSearchCompanyName("");
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = queryResponse.companyOfAuthorsID.filter(
                  (item: any) => item !== id
                );
                dispatch(
                  setQueryResponse({
                    ...queryResponse,
                    companyOfAuthorsID: newList,
                  })
                );
              }}
              onClearData={() =>
                dispatch(
                  setQueryResponse({
                    ...queryResponse,
                    companyOfAuthorsID: [],
                  })
                )
              }
              onScroll={handleScrollCompany}
              onSearchInputChange={debounce(
                (value) => setSearchCompanyName(value),
                500
              )}
              showTriangle={true}
              isMultiple={true}
              data={listCompany.map((company) => ({
                label: company.name,
                value: company._id,
              }))}
              formatItem={{
                id: "value",
                text: "label",
              }}
              renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
              )}
              prefixIcon={
                <img className={"mr-2"} src={businessBuiding} alt={"icon"} />
              }
            />

            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              countBadge={queryResponse.authorsID.length}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Ca làm"}
              showTriangle={true}
              isMultiple={true}
              onchangeValue={(value) => {
                if (!queryResponse.authorsID?.includes?.(value.id as string)) {
                  const newData: any = [...queryResponse.authorsID, value.id];
                  dispatch(
                    setQueryResponse({
                      ...queryResponse,
                      authorsID: newData,
                    })
                  );
                }
                setSearchUserSystem("");
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = queryResponse.authorsID.filter(
                  (item: any) => item !== id
                );
                dispatch(
                  setQueryResponse({
                    ...queryResponse,
                    authorsID: newList,
                  })
                );
              }}
              onClearData={() =>
                dispatch(
                  setQueryResponse({
                    ...queryResponse,
                    authorsID: [],
                  })
                )
              }
              onSearchInputChange={debounce(
                (value) => setSearchUserSystem(value),
                500
              )}
              onScroll={handleScrollUserSystem}
              renderSelectedItem={(item: any) => (
                <div className="flex items-center">
                  <img
                    alt="Thumbnail"
                    src={item.imageUrl || userIcon}
                    className="mr-1 w-6 h-6 rounded-full"
                  />
                  <p
                    style={{
                      textOverflow: "ellipsis",
                      maxWidth: "100%",
                      minWidth: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      flex: "1 1 auto",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              )}
              data={listUsersSystem.map((item) => ({
                label: item.bizfullname || item.fullname,
                value: item._id,
                imgUrl: item.imgUrl,
                email: item.email,
              }))}
              formatItem={{
                id: "value",
                text: "label",
                imageUrl: "imgUrl",
              }}
              renderItem={(item) => (
                <div className={"flex"}>
                  <div
                    className={
                      "w-[44px] h-[44px] flex items-center justify-center rounded-full bg-accent text-white text-2xl font-bold"
                    }
                  >
                    {item.label.charAt(0)}
                  </div>
                  <div className={"flex-1 ml-2"}>
                    <p className={"truncate"}>{item.label}</p>
                    <p className={"text-primary-gray truncate"}>{item.email}</p>
                  </div>
                </div>
              )}
              prefixIcon={
                <img className={"mr-2"} src={iconShift} alt={"icon"} />
              }
            />

            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Kênh khách hàng"}
              prefixIcon={
                <img className={"mr-2"} src={projectIcon} alt={"icon"} />
              }
              isMultiple={true}
              onchangeValue={(value) => {
                if (!project?.includes?.(value.id as string)) {
                  const newData: any = [...project, value.id];
                  setProject(newData);
                }
                setSearchProject("");
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = project.filter((item: any) => item !== id);
                setProject(newList);
              }}
              onClearData={() => setProject([])}
              onSearchInputChange={debounce(
                (value) => setSearchProject(value),
                500
              )}
              onScroll={handleScrollProject}
              data={listProject.map((item) => ({
                label: `${item.sign}.${item.name}`,
                value: item._id,
              }))}
              formatItem={{
                id: "value",
                text: "label",
              }}
              renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
              )}
            />      

            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Hình thức phục vụ"}
              prefixIcon={
                <img className={"mr-2"} src={iconSupport} alt={"icon"} />
              }
              isMultiple={false}
              disableSearch={true}
              data={[
                {
                  id: 0,
                  text: "Tất cả",
                },
                {
                  id: 1,
                  text: "Chính thức",
                },
                {
                  id: 2,
                  text: "Không chính thức",
                },
              ]}
              onchangeValue={(value) => {
                dispatch(
                  setQueryResponse({
                    ...queryResponse,
                    official: value.id,
                  })
                );
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
            />
          <TimeRangeDropdown
              className={
                "mr-2 border border-primary-border rounded-lg mb-2 p-1 pl-2 "
              }
              placeholder={"Thời khoảng"}
              iconBack={<TriangleDown />}
              iconFront={<img src={iconSandtime} alt={"----"} />}
              onValueChange={(val) => {
                setFromCreateDate(val.fromDate);
                settoCreateDate(val.toDate);
                dispatch(setTabActive(tabIndex));
              }}
              options={[
                {
                  text: "Tất cả",
                  fromDate: "",
                  toDate: "",
                },
                {
                  text: "Ngày nay",
                  fromDate: moment().format("YYYY-MM-DD 00:00"),
                  toDate: moment().format("YYYY-MM-DD 23:59"),
                },
                {
                  text: "Cách đây 1 tuần",
                  fromDate: moment().subtract(7, "days").format("YYYY-MM-DD 00:00"),
                  toDate: moment().format("YYYY-MM-DD HH:mm"),
                },
                {
                  text: "Cách đây 1 tháng",
                  fromDate: moment().subtract(1, "months").format("YYYY-MM-DD 00:00"),
                  toDate: moment().format("YYYY-MM-DD HH:mm"),
                },
              ]}
            />

            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Trạng thái"}
              prefixIcon={
                <img className={"mr-2"} src={iconOk} alt={"icon"} />
              }
              isMultiple={false}
              disableSearch={true}
              data={[
                {
                  id: 0,
                  text: "Tất cả",
                },
                {
                  id: 1,
                  text: "Chính thức",
                },
                {
                  id: 2,
                  text: "Không chính thức",
                },
              ]}
              onchangeValue={(value) => {
                dispatch(
                  setQueryResponse({
                    ...queryResponse,
                    official: value.id,
                  })
                );
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
            />

            <DropdownSearchableV2
              selectOneByOne={true}
              reset={reset}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Lỗi gặp phải"}
              prefixIcon={
                <img className={"mr-2"} src={iconWarning} alt={"icon"} />
              }
              isMultiple={false}
              disableSearch={true}
              data={[
                {
                  id: 0,
                  text: "Tất cả",
                },
                {
                  id: 1,
                  text: "Chính thức",
                },
                {
                  id: 2,
                  text: "Không chính thức",
                },
              ]}
              onchangeValue={(value) => {
                dispatch(
                  setQueryResponse({
                    ...queryResponse,
                    official: value.id,
                  })
                );
                dispatch(setTabActive(tabIndex));
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
              }}
            />

          <button
            className={"border-primary border-0.5 bg-cbs-secondary rounded text-white px-4 h-[32px] mb-2"}
          >
            Lọc
          </button>

          <button
              className={"bg-grey rounded px-2 h-[32px] ml-2"}
              onClick={onSaveResultSearch}
            >
              Lưu
            </button>
        </div> */}

        {/* Action bar */}
        <div className={"header-table flex px-4 w-full top-0 bg-white mb-1 pb-2"}>
          <div className={"flex gap-7 items-center justify-center mr-2"}>
            <div className="flex gap-2 items-center">
              <input
                className="form-check-input line"
                type="checkbox"
                id="checkAll"
                checked={getStateCheckedAll()}
                onChange={onClickCheckAll}
                style={{ width: "14px", height: "14px" }}
              />
              {/* <div>
                <button onClick={() => setpopBox1(!popBox1)} className="relative w-[20px] h-[20px]">
                  <img src={arrowDown} className="m-auto" />
                </button>
                <div
                  className={"w-auto rounded flex flex-col bg-white absolute " + (popBox1 ? "block" : "hidden")}
                  style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                >
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Tất cả
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Bỏ chọn tất cả
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Chủ đề đã đọc
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Chủ đề chưa đọc
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Chủ đề quan tâm
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Chủ đề không quan tâm
                  </button>
                </div>
              </div> */}
            </div>

            <div className="flex gap-7 items-center">
              {/* <button><img src={updateIcon} alt="" /></button>
              <button><img src={mailIcon} alt="" /></button>
              <button onClick={() => setpopBox2(!popBox2)} className="relative w-[20px] h-[20px]">
                <img src={moreIcon} className="m-auto" />
                <div
                  className={"w-[250px] rounded flex flex-col bg-white absolute " + (popBox2 ? "block" : "hidden")}
                  style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                >
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Đánh dấu là đã đọc
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Đánh dấu là quan trọng
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Đánh dấu quan tâm
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Chủ đề chưa đọc
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Chủ đề quan tâm
                  </button>
                  <button className="w-full px-9 py-2 text-left hover:bg-cbs-gray">
                    Chủ đề không quan tâm
                  </button>
                </div>
              </button> */}
              {idsChecked.length === 1 && (
                <button
                  className="text-cbs-schedule-expired"
                  onClick={() =>
                    openModal(
                      <div
                        className={
                          "inline-block w-[521px] h-[240px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
                        }
                      >
                        <ModalConfirm
                          title="Bạn có muốn xác nhận hủy đơn không?"
                          description="Đơn hàng của bạn sẽ không thể hoàn tác"
                          onConfirm={handleCancelOrder}
                          defaultText={false}
                          onCancel={closeModal}
                        />
                      </div>
                    )
                  }
                >
                  Hủy đơn
                </button>
              )}
              <button
                className="text-cbs-schedule-nextweek"
                onClick={() =>
                  openModal(
                    <div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block" style={{width:"640px"}}>
                      <ModalErrorDetailItem defaultValues={{ orderID: idsChecked.length ? idsChecked[0] : '' }} />
                    </div>
                  )
                }
              >
                Gán lỗi gặp phải
              </button>
              <button><img src={iconDown} alt="" /></button>
            </div>
          </div>
          {/* Chưa rõ chỗ này, hình như để phân trang */}
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
                setPageIndex(oldState => oldState + 1)
              }}
              prevPageAction={() => {
                setPageIndex(oldState => oldState - 1)
              }}
            />
          </div>
        </div>
      </div>

      {/* Dữ liệu chính */}
      <div className={"flex flex-1 overflow-y-auto gap-3 bg-cbs-table-highlight"}>
        {/* Danh sách đơn hàng */}
        {/* <div className="w-3/4"> */}
        <div>
          <table className={"w-full table-fixed tasks"}>
            <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
              <tr>
                <th className="pb-1 pt-1 font-normal w-[50px]"></th>
                <th className="pb-1 pt-1 font-normal text-left w-[150px]">Thời gian</th>
                <th className="pb-1 pt-1 font-normal text-left w-[50px]">Kênh</th>
                <th className="pb-1 pt-1 font-normal text-left w-[100px]"></th>
                <th className="pb-1 pt-1 font-normal text-left">Đơn hàng</th>
                <th className="pb-1 pt-1 font-normal text-left">Mã đơn/Mã đơn app</th>
                <th className="pb-1 pt-1 font-normal text-left">Cơ sở</th>
                <th className="pb-1 pt-1 font-normal text-left">Hình thức</th>
                <th className="pb-1 pt-1 font-normal text-left">Trạng thái</th>
                <th className="pb-1 pt-1 font-normal text-left">Giá trị</th>
                <th className="pb-1 pt-1 font-normal text-left">In ấn</th>
              </tr>
            </thead>
            <tbody>
            {
                (listWithPager[pageIndex]??[]).map((item: any, i: any) => (
                  <tr key={item._id}
                    className={"border-b-0.5 border-primary-border bg-white hover:shadow-md hover:z-2 hover:relative text-[14px]"}
                  >
                    <td className={"w-[50px]"}>
                      <div
                        className={"flex gap-4  p-4"}
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={getStateChecked(item._id)}
                          onChange={() => onClickCheckButton(item._id)}
                          style={{ width: "16px", height: "16px", marginTop: "5px" }}
                        />
                        {/* <StarToggle /> */}
                      </div>
                    </td>
                    <td className={"px-1 py-2"}>
                      <div>
                        {moment(item?.createAt).format('DD/MM/YYYY HH:mm')}
                      </div>
                    </td>
                    <td className={"w-[50px]"}>
                        <div className={"py-2"}>
                          <img
                            src={getIconApp(Number(item?.salesChannel))}
                            alt={"avatar"}
                            className={
                              "w-[36px] h-[36px] max-w-[36px] max-h-[36px] min-w-[36px] min-h-[36px] rounded-full overflow-hidden"
                            }
                            aria-owns={open ? "mouse-over-popover" : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                          />
                        </div>
                    </td>
                    <td className={"w-[90px] px-1 py-2"}>
                        <div className={"user-infor py-2"}>
                          <p className={"truncate user-infor-name text-[14px]  text-left"}>
                            {FNB_CHANNEL[Number(item?.salesChannel)-1]?.text}
                          </p>
                        </div>
                    </td>
                    <td className={"px-1 py-2 w-1/4"}>
                      <button
                        onClick={() =>
                          openModal(
                            <div className="t-add-new-task-dialog text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block">
                              <ModalDetailItem order={item} />
                            </div>
                          )
                        }
                      >
                        <div className={"user-infor py-2"}>
                          <p className={"user-infor-name text-[14px] text-left"}>
                            {/* <span className="rounded-md bg-cbs-orage text-white px-3 py-1 mr-3">
                              02 lỗi
                            </span> */}
                            {/* {FNB_SERVICE[Number(item?.service)-1]?.text} -  */}
                            <span className="text-cbs-primary">{item?.name}</span>
                          </p>
                          {/* <span className={"truncate text-xs text-primary-gray py-2"}>{item?.note}</span> */}
                        </div>
                      </button>
                    </td>
                    <td className={"px-1 py-2"}>
                      <div className="">
                        {item?.sign} | {item?.appOrderSign}
                      </div>
                    </td>
                    <td className={"px-1 py-2"}>
                      <div>
                        {item?.funda?.name}
                      </div>
                    </td>
                    <td className={"px-1 py-2"}>
                      <div>
                        {FNB_SERVICE[Number(item?.service)-1]?.text}
                      </div>
                    </td>
                    <td className={"px-2 py-2"}>
                      {
                        item?.status == 4 ? 
                          <div className="w-[70px] text-center rounded-md bg-cbs-schedule-expired text-white" style={{ fontSize: "12px" }}>
                            {FNB_ORDER_STATUS[Number(item?.status)-1]?.text}
                          </div>
                        : 
                          <div className="w-[70px] text-center rounded-md bg-cbs-schedule-after-7days text-white" style={{ fontSize: "12px" }}>
                          {FNB_ORDER_STATUS[Number(item?.status)-1]?.text}
                        </div>
                      }
                    </td>
                    <td className={"text-right px-2 py-2"}>
                      <div>
                        {formatNumberMoney(item?.total||0)} đ
                      </div>
                    </td>
                    <td className={"text-right px-2 py-2"}>
                      <Link to={`/fnb/home/${item._id}/print/1`}>
                        <span className="mr-5 text-cbs-primary underline">In bill</span>
                      </Link>
                      <Link to={`/fnb/home/${item._id}/print/2`}>
                        <span className="text-cbs-primary underline">In tem</span>
                      </Link>
                    </td>
                  </tr>
              ))}
             
            </tbody>

          </table>
        </div>

        {/* Báo cáo quản trị */}
        {/* <div className="w-1/4 mt-3">
          <div className="bg-white border-0.5 border-second-color-border py-6 px-3">
            <button className="m-auto font-bold text-cbs-fnb-bg flex items-center">Winggo Thái thịnh <ExpandMoreIcon /></button>
            <button className="flex items-center m-auto"><img src={iconCalendar} alt="" />
              Hôm nay <ExpandMoreIcon />
            </button>
            <div className="font-bold text-center">Tổng doanh số</div>
            <div className="flex items-center gap-4 justify-center	">
              <span className="text-cbs-down-text flex gap-3"><img src={arrowDownRed} /> 93.49 %</span>
              <span className="text-primary text-[22px] font-bold ">20.000.000đ</span>
            </div>
            <div className="flex border-t-0.5 border-b-0.5 border-primary-border justify-between mx-1 py-2">
              <div>
                <div className="flex text-cbs-subtext gap-1"><img src={dotGreen} alt="" /> Hệ thống</div>
                <div className="font-bold ">15.000.000</div>
              </div>
              <div className="border-r-0.5 border-primary-border pr-2">
                <div className="flex text-cbs-subtext gap-1"><img src={dotGreen} alt="" />Nhượng quyền</div>
                <div className="font-bold ">15.000.000</div>
              </div>
              <div>
                <div className="flex text-cbs-subtext gap-1"><img src={dotGreen} alt="" />Tiền mặt</div>
                <div className="text-cbs-fnb-bg ">15.000.000</div>
              </div>
              <div>
                <div className="flex text-cbs-subtext gap-1"><img src={dotGreen} alt="" />Chuyển khoản</div>
                <div className="text-cbs-fnb-bg">15.000.000</div>
              </div>
            </div>
            <div className="flex  justify-between my-3">
              <div>
                <div className=" text-cbs-subtext pb-3">Tỷ lệ Off</div>
                <div className="font-bold text-cbs-fnb-bg">5%</div>
              </div>
              <div>
                <div className=" text-cbs-subtext pb-3">Tỷ lệ App</div>
                <div className="font-bold text-cbs-fnb-bg">5%</div>
              </div>
              <div>
                <div className=" text-cbs-subtext pb-3">Hóa đơn</div>
                <div className="font-bold ">50</div>
              </div>
              <div>
                <div className=" text-cbs-subtext pb-3">Mặt hàng</div>
                <div className="font-bold ">200</div>
              </div>
              <div>
                <div className=" text-cbs-subtext pb-3">Khách hàng</div>
                <div className="font-bold ">50</div>
              </div>
            </div>
            <div>
              <div className="flex justify-between	">
                <div className="text-cbs-schedule-nextweek font-bold">Các lỗi hay gặp (168) </div>
                <div><a href="#" className="text-cbs-fnb-bg">Xem tất cả</a></div>
              </div>
              <div className="flex justify-between	">
                <div>Đường quá ngọt</div>
                <div className="text-cbs-down-text">2</div>
              </div>
            </div>
            <div className="flex">
              <ChartRevenueByHour />
            </div>
          </div>
        </div> */}
      </div>

      <UpdateStatusDialog
        showUpdateStatus={showUpdateStatus}
        setShowUpdateStatus={setShowUpdateStatus}
        onPress={onPressUpdateStatus}
      />
    </div>
  );
};

export const subContentHtml = (html?: string) => {
  const removeHtmlTag = parse(
    (html || "").replace(/<[^>]*>?/gm, " ")
  ).toString();

  const result =
    removeHtmlTag.length > 150
      ? `${removeHtmlTag.slice(0, 150)}...`
      : removeHtmlTag;
  return result;
};

export const showTime = (time: any) => {
  const toDay = new Date();
  const timeDay = new Date(time);
  if (
    toDay.getDate() === timeDay.getDate() &&
    toDay.getMonth() === timeDay.getMonth()
  ) {
    return moment(time).format("HH:mm");
  } else {
    return moment(time).format("DD/MM/YYYY");
  }
};