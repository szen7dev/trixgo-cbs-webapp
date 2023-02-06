/*=====1.LIBRARY=====*/
import React, { FC, useState, UIEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";
import { debounce, toArray } from "lodash";
import { useDispatch } from "react-redux";
import { formatNumberMoney } from "utils/converter";
import { toast } from "react-toastify";
import Axios from "axios";

/*=====2.CSS=====*/
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "views/pcm/styles/pcm.module.css";

/*=====3.ICONS=====*/
import iconDown from "assets/images/icons8-download-64 1.svg";

import offlineChannelIcon from "assets/images/fnb/offline.svg";
import grabChannelIcon from "assets/images/fnb/grab.svg";
import shopeeChannelIcon from "assets/images/fnb/shopee.svg";
import gojekChannelIcon from "assets/images/fnb/gojek.svg";
import baemineChannelIcon from "assets/images/fnb/baemin.svg";
import loshipChannelIcon from "assets/images/fnb/loship.svg";
import beeChannelIcon from "assets/images/fnb/bee.svg";
import businessBuiding from "assets/images/icons8-business-building-48.svg";
import { IconImage } from 'views/media/shareComponents/common';
import iconPhoto from "assets/images/icons8-photo.svg";

/*=====4.PAGES/COMPONENTS=====*/
import PaginateV2 from "shareComponents/common/PaginateV2";
import { ModalDetailItem } from "./components/ModalDetailItem/index";
import { ModalErrorDetailItem } from "./components/ModalErrorDetailItem";
import { ModalUpdatePayment } from "./components/ModalUpdatePayment";
import { ModalUpdateSalesChannel } from "./components/ModalUpdateSalesChannel";
import { DropdownSearchableV2, Loader, ModalConfirm } from "shareComponents/common";
import TriangleDown from "assets/icons/TriangleDown";
import useUploadFile, { modifyUploadedFilesV2 } from 'services/hooks/useUploadFile';
import { APP_ID } from "apis/localdb";
import { validateFiles } from 'validation/file';
import { FileProp, FileProps, FilePropsUpload, ImageProps } from "typings/common";
import { ModalZoomView } from "shareComponents/common";

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useAppSelector } from "redux/reducer";
import { useTask } from "services/hooks/useTask";
import { useModal } from "services/hooks/useModal";

import API from "apis/repository";

import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';
import { useUpload } from 'services/hooks/useUpload';

/*=====7.OTHER=====*/
import { createLinkAndClick } from "utils";
import { FNB_CHANNEL, FNB_SERVICE, FNB_PAYMENT, FNB_ORDER_STATUS, FNB_SHIFT, FNB_NORESIDENT_TYPES } from "apis/localdb";
import { useInfiniteQuery } from "react-query";
import { setQueryFnb } from "redux/reducer/FnbSlice";
import TimeRangeDropdown from "shareComponents/common/TimeRangeDropdown";

type Props = {
  type?: number;
};

// Hàm trả về icon app
export const getIconApp = (salesChannel: any) => {
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

    case 7:
      return beeChannelIcon

    default:
      return offlineChannelIcon
  }
}

export const FnBHomePage: FC<Props> = ({ type = 0 }) => {

  useEffect(() => {
    document.title = "Trixgo | FnB";
  }, []);

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [pageIndex, setPageIndex] = useState(0);
  const [reset, setReset] = useState(false);
  const [cancelNote, setCancelNote] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isShowImageFullScreen, setIsShowImageFullScreen] = useState(false);

  const [defaultState, setDefaultState] = useState({
    mediaID: '',
    images: [] as ImageProps[],
    index: 0,
    createAt: ""
  });

  const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
  const ref = React.useRef<PaginateHandle>(null);
  const { openModal, closeModal } = useModal();

  const { addFileToUpload } = useUpload({
    appID: APP_ID.FNB.id,
    companyID: user?.company?._id,
  });

  const keyword = useAppSelector(
    (state) => state.fnbSlice.data.keywordHomeFnb
  );

  const queryFnb = useAppSelector(
    (state) => state.fnbSlice.data.queryFnb
  );

  const { isLoading, isFetching, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFnbOrder({
    params: {
      limit: 50,
      keyword,
      ...queryFnb,
      populates: JSON.stringify({
        path: 'funda shift customer userCreate files',
        select: "name path nameOrg author sign address bizfullname fullname phone numberOfOrders",
        populate: {
          path: 'author',
          select: 'fullname bizfullname image',
        }
      })
    }, isFetchList: true, isFetchInfo: false
  });

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
          cancelNote,
          status: 4
        }
      );

      if (response.status !== 200 || response.data?.error) {
        return toast.warn('Hủy đơn hàng thất bại');
      }

      refetch();
      toast.info('Hủy đơn hàng thành công');
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  const handleSetFiles = async (filesSelected: FileList | null) => {
    if (!filesSelected) return;

    try {
      const { error, message } = await validateFiles(filesSelected);
      if (error) return toast.warn(message);

      setIsUploading(true);

      const filesID: string[] = [];

      for (const [key, file] of Object.entries(filesSelected)) {
        const { _id } = await addFileToUpload({
          files: file as any,
          fileType: 1,
          progress: percentCompleted => {
            console.log(`${percentCompleted}%`, key);
          }
        })
        _id && filesID.push(_id);
      }

      setIsUploading(false);
      setIdsChecked([]);

      if(!filesID.length) return toast.warn('Upload ảnh thất bại');

      const response = await API.put(
        `/api/fnb/orders`,
        {
          orderID: idsChecked[0],
          filesID,
        }
      );

      if (response.status !== 200 || response.data?.error) {
        return toast.warn('Upload ảnh thất bại');
      }

      refetch();
      toast.info('Upload ảnh thành công');
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  const [searchFunda, setSearchFunda] = useState('');

  const {
    data: dataFunda,
    hasNextPage: hasNextPageFunda,
    fetchNextPage: fetchNextPageFunda
  } = useInfiniteQuery(
    ['Fnb_Funda_list', searchFunda],
    async ({ pageParam }: any) =>
      API.get(
        `api/item/fundas?&isMember=1&limit=50&keyword=${searchFunda}&lastestID=${pageParam || ""}`,
      ),
    {
      getNextPageParam: ({ data }: any) => {
        return data?.nextCursor ?? undefined;
      },
      refetchOnWindowFocus: false,
      enabled: true
    }
  );

  const listFunda = []
    .concat(...(dataFunda?.pages || [])
      .map((d: any) => d.data?.data?.listRecords));

  const handleScrollFunda = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom && hasNextPageFunda) {
      fetchNextPageFunda();
    }
  };

  /**
   * 
   * Xử lý download excel
   */
  const [dataImport, setDataImport] = useState([]);
  const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
      isExporting: false,
  });
  const { exportOrderAsync, exportOrderAsync2 } = useFnbOrder({});

  const handleExportExcel = async () => {
    try {
      setStateExport({ isExporting: true });
      const { error, data } = await exportOrderAsync({
        filterParams: {  
        }
      });

      if(error) {
        return toast.warn(data?.message);
      }

      data && createLinkAndClick(data, '_self');
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setStateExport({ isExporting: false });
    }
	}

  const handleExportExcel2 = async () => {
    try {
      setStateExport({ isExporting: true });
      const { error, data } = await exportOrderAsync2({
        filterParams: {  
        }
      });

      if(error) {
        return toast.warn(data?.message);
      }

      data && createLinkAndClick(data, '_self');
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setStateExport({ isExporting: false });
    }
	}

  if(isUploading) {
    return <Loader className="border-primary" />
  }

  return (
    <div className="t-home flex flex-col h-full overflow-hidden">
      <div className={"sticky top-0 bg-white z-10"}>
        <div className={"filter-bar flex flex-wrap px-4 py-2"}>
          {(isLoading ||
            isFetching) && <Loader className="border-primary" />}

          <DropdownSearchableV2
            reset={reset}
            selectOneByOne={true}
            className={"mr-2 border border-primary-border rounded-lg mb-2"}
            placeholder={"Cơ sở"}
            showTriangle={true}
            isMultiple={true}
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
            countBadge={queryFnb.fundasID.length}
            data={listFunda.map((item: any) => ({
              label: `${item?.sign}.${item?.name}`,
              value: item._id,
            }))}
            onchangeValue={(value) => {
              if (
                !queryFnb.fundasID?.includes?.(
                  value.id as string
                )
              ) {
                const newData: any = [
                  ...queryFnb.fundasID,
                  value.id,
                ];
                dispatch(
                  setQueryFnb({
                    ...queryFnb,
                    fundasID: newData,
                  })
                );
              }
              setSearchFunda("");
              setPageIndex(0);
              ref.current && ref.current.resetPaginate();
            }}
            onMultipleRemoveValue={(id: any) => {
              const newList = queryFnb.fundasID.filter(
                (item: any) => item !== id
              );
              dispatch(
                setQueryFnb({
                  ...queryFnb,
                  fundasID: newList,
                })
              );
            }}
            onClearData={() =>
              dispatch(
                setQueryFnb({
                  ...queryFnb,
                  fundasID: [],
                })
              )
            }
            onScroll={handleScrollFunda}
            onSearchInputChange={debounce(
              (value) => setSearchFunda(value),
              500
            )}
          />

          <DropdownSearchableV2
            reset={reset}
            selectOneByOne={true}
            className={"mr-2 border border-primary-border rounded-lg mb-2"}
            placeholder={"Ca làm"}
            showTriangle={true}
            isMultiple={true}
            disableSearch={true}
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
            countBadge={queryFnb.shiftTypes.length}
            data={FNB_SHIFT.map((item: any) => ({
              label: `${item.text}`,
              value: item.value,
            }))}
            onchangeValue={(value) => {
              if (
                !queryFnb.shiftTypes?.includes?.(
                  value.id as string
                )
              ) {
                const newData: any = [
                  ...queryFnb.shiftTypes,
                  value.id,
                ];
                dispatch(
                  setQueryFnb({
                    ...queryFnb,
                    shiftTypes: newData,
                  })
                );
              }
              setSearchFunda("");
              setPageIndex(0);
              ref.current && ref.current.resetPaginate();
            }}
            onMultipleRemoveValue={(id: any) => {
              const newList = queryFnb.shiftTypes.filter(
                (item: any) => item !== id
              );
              dispatch(
                setQueryFnb({
                  ...queryFnb,
                  shiftTypes: newList,
                })
              );
            }}
            onClearData={() =>
              dispatch(
                setQueryFnb({
                  ...queryFnb,
                  shiftTypes: [],
                })
              )
            }
          />

          <DropdownSearchableV2
            reset={reset}
            selectOneByOne={true}
            className={"mr-2 border border-primary-border rounded-lg mb-2"}
            placeholder={"Kênh bán hàng"}
            showTriangle={true}
            isMultiple={true}
            disableSearch={true}
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
            countBadge={queryFnb.salesChannels.length}
            data={FNB_CHANNEL.map((item: any) => ({
              label: `${item.text}`,
              value: item.value,
            }))}
            onchangeValue={(value) => {
              if (
                !queryFnb.salesChannels?.includes?.(
                  value.id as string
                )
              ) {
                const newData: any = [
                  ...queryFnb.salesChannels,
                  value.id,
                ];
                dispatch(
                  setQueryFnb({
                    ...queryFnb,
                    salesChannels: newData,
                  })
                );
              }
              setSearchFunda("");
              setPageIndex(0);
              ref.current && ref.current.resetPaginate();
            }}
            onMultipleRemoveValue={(id: any) => {
              const newList = queryFnb.salesChannels.filter(
                (item: any) => item !== id
              );
              dispatch(
                setQueryFnb({
                  ...queryFnb,
                  salesChannels: newList,
                })
              );
            }}
            onClearData={() =>
              dispatch(
                setQueryFnb({
                  ...queryFnb,
                  salesChannels: [],
                })
              )
            }
          />

          <TimeRangeDropdown
              className={
                "mr-2 border border-primary-border rounded-lg mb-2 p-1 pl-2 "
              }
              placeholder={"Thời khoảng"}
              iconBack={<TriangleDown />}
              iconFront={<img src={businessBuiding} alt={"----"} />}
              onValueChange={(val) => {
                dispatch(
                  setQueryFnb({
                    ...queryFnb,
                    fromDate: moment(val.fromDate).format("YYYY-MM-DD 00:00"),
                    toDate: moment(val.toDate).format("YYYY-MM-DD 23:59"),
                  })
                );
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
            reset={reset}
            selectOneByOne={true}
            className={"mr-2 border border-primary-border rounded-lg mb-2"}
            placeholder={"Trạng thái"}
            showTriangle={true}
            isMultiple={true}
            disableSearch={true}
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
            countBadge={queryFnb.statuss.length}
            data={FNB_ORDER_STATUS.map((item: any) => ({
              label: `${item.text}`,
              value: item.value,
            }))}
            onchangeValue={(value) => {
              if (
                !queryFnb.statuss?.includes?.(
                  value.id as string
                )
              ) {
                const newData: any = [
                  ...queryFnb.statuss,
                  value.id,
                ];
                dispatch(
                  setQueryFnb({
                    ...queryFnb,
                    statuss: newData,
                  })
                );
              }
              setSearchFunda("");
              setPageIndex(0);
              ref.current && ref.current.resetPaginate();
            }}
            onMultipleRemoveValue={(id: any) => {
              const newList = queryFnb.statuss.filter(
                (item: any) => item !== id
              );
              dispatch(
                setQueryFnb({
                  ...queryFnb,
                  statuss: newList,
                })
              );
            }}
            onClearData={() =>
              dispatch(
                setQueryFnb({
                  ...queryFnb,
                  statuss: [],
                })
              )
            }
          />

          <DropdownSearchableV2
            reset={reset}
            selectOneByOne={true}
            className={"mr-2 border border-primary-border rounded-lg mb-2"}
            placeholder={"Lỗi gặp phải"}
            showTriangle={true}
            isMultiple={false}
            disableSearch={true}
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
            data={[{
              value: 0, text: 'Không lỗi',
            },
            {
              value: 1, text: 'Có lỗi'
            }].map((item: any) => ({
              label: `${item.text}`,
              value: item.value,
            }))}
            onchangeValue={(value) => {
              dispatch(
                setQueryFnb({
                  ...queryFnb,
                  isMistake: value.id,
                })
              );
              setPageIndex(0);
              ref.current && ref.current.resetPaginate();
            }}
            onClearData={() =>
              dispatch(
                setQueryFnb({
                  ...queryFnb,
                  isMistake: 0,
                })
              )
            }
          />

          {/* <button
            className={"border-primary border-0.5 bg-cbs-secondary rounded text-white px-4 h-[32px] mb-2"}
          >
            Lọc
          </button> */}
        </div>

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
            </div>

            <div className="flex gap-7 items-center">

              {idsChecked.length === 1 && (
                <>
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
                          isAddTextarea={false}
                          onKeyUpTextarea={(e: any) => {
                            console.log({ value: e.target.value })
                            setCancelNote(e.target.value);
                          }}
                        />
                      </div>
                    )
                  }
                >
                  Hủy đơn
                </button>
                 <button
                  className="text-cbs-schedule-today"
                  onClick={() =>
                    openModal(
                      <div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block" style={{ width: "640px" }}>
                        <ModalUpdatePayment defaultValues={{ orderID: idsChecked.length ? idsChecked[0] : '' }} />
                      </div>
                    )
                  }
                >
                  Cập nhật Phương thức thanh toán
                </button>
                <button
                  className="text-cbs-schedule-today"
                  onClick={() =>
                    openModal(
                      <div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block" style={{ width: "640px" }}>
                        <ModalUpdateSalesChannel defaultValues={{ orderID: idsChecked.length ? idsChecked[0] : '' }} />
                      </div>
                    )
                  }
                >
                  Cập nhật Kênh bán hàng
                </button>
               </>
              )}
              <button
                className="text-cbs-schedule-nextweek"
                onClick={() =>
                  openModal(
                    <div className=" text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block" style={{ width: "640px" }}>
                      <ModalErrorDetailItem defaultValues={{ orderID: idsChecked.length ? idsChecked[0] : '' }} />
                    </div>
                  )
                }
              >
                Gán tình huống gặp phải
              </button>
              <button onClick={handleExportExcel} title="Tải dữ liệu Excel">
                Tải KPI
                {/* <img src={iconDown} title="Tải dữ liệu Excel"/> */}
              </button>
              <button onClick={handleExportExcel2} title="Tải dữ liệu Excel">
                Tải đơn hàng
                {/* <img src={iconDown} title="Tải dữ liệu Excel"/> */}
              </button>

              {idsChecked.length === 1 && (
                <label className="w-8 h-8 rounded-md flex justify-center items-center cursor-pointer">
                  <IconImage />
                  <input
                    type="file"
                    name="images"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={e => handleSetFiles(e.target.files)}
                  />
                </label>
              )}
                {/*<button onClick={}><img src={iconDown} title="Tải dữ liệu Excel"/></button>*/}
            </div>
          </div>
          {/* Chưa rõ chỗ này, hình như để phân trang */}
          <div className={"flex-1 flex items-center justify-end"}>
            <PaginateV2
              ref={ref}
              totalRecord={totalRecord}
              totalPages={totalPage}
              limit={50}
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
                (listWithPager[pageIndex] ?? []).map((item: any, i: any) => (
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
                      </div>
                    </td>
                    <td className={"px-1 py-2"}>
                      <div>
                        {moment(item?.createAt).format('DD/MM/YYYY HH:mm')}
                      </div>
                      {
                        item?.nonResident == 2 ?
                          <div className="w-[100px] text-center bg-cbs-schedule-expired text-white" style={{ fontSize: "12px" }}>
                            {FNB_NORESIDENT_TYPES[Number(item?.nonResident) - 1]?.text}
                          </div>
                          : <></>
                      }
                      <Link to={`/fnb/shift/${item?.funda?._id}`}>
                        <p><span className={"text-xs text-primary-gray text-left"}>{item?.funda?.sign}.{item?.shift?.name}</span></p>
                      </Link>
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
                          {FNB_CHANNEL[Number(item?.salesChannel) - 1]?.text}
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
                            {
                              item?.numberOfMistakes ? <span className="rounded-md bg-cbs-orage text-white px-3 py-1 mr-3">{item?.numberOfMistakes} lỗi</span>: <></>
                            }
                            <span className="text-cbs-primary">{item?.name}</span>
                          </p>
                          <span className={"text-xs text-primary-gray text-left"}>{item?.note}</span>
                        </div>
                      </button>
                      <div className="flex mr-2 gap-2 text-primary-gray pb-2">
                        {
                          (item?.files)?.slice(0, 3).map((file: any, subindex: any) => (
                            <button
                              key={file._id}
                              onClick={() => {
                                setDefaultState({
                                  mediaID: file._id,
                                  images: item?.files,
                                  index: subindex,
                                  createAt: file.createAt
                                });
                                setIsShowImageFullScreen(true);
                              }}
                            >
                              <div className="border-0.5 border-cbs-border rounded-full px-3 py-1 flex overflow-hidden">
                                <img src={iconPhoto} className="mr-[5px] w-6 h-6" />
                                <span>{file?.nameOrg.substring(0, 10)}...</span>
                              </div>
                            </button>
                          ))
                        }
                        {item?.files?.length > 3 && (
                          <div className="border-0.5 border-cbs-border rounded-full py-1 px-2">+{item?.files?.length-1}</div>
                        )}
                      </div>
                    </td>
                    <td className={"px-1 py-2"}>
                      <div className="">
                        {item?.sign} {FNB_CHANNEL[Number(item?.salesChannel)-1].sign}{item?.appOrderSign}
                      </div>
                    </td>
                    <td className={"px-1 py-2"}>
                      <div>
                      {item?.funda?.sign}.{item?.funda?.name}
                      </div>
                    </td>
                    <td className={"px-1 py-2"}>
                      <div>
                        {FNB_SERVICE[Number(item?.service) - 1]?.text}
                      </div>
                    </td>
                    <td className={"px-2 py-2"}>
                      {
                        item?.status == 4 ?
                          <div className="w-[70px] text-center rounded-md bg-cbs-schedule-expired text-white" style={{ fontSize: "12px" }}>
                            {FNB_ORDER_STATUS[Number(item?.status) - 1]?.text}
                          </div>
                          :
                          <div className="w-[70px] text-center rounded-md bg-cbs-schedule-after-7days text-white" style={{ fontSize: "12px" }}>
                            {FNB_ORDER_STATUS[Number(item?.status) - 1]?.text}
                          </div>
                      }
                    </td>
                    <td className={"text-right px-2 py-2"}>
                      <div>
                        {formatNumberMoney(item?.total || 0)} đ
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
      </div>
      <ModalZoomView
        isShow={isShowImageFullScreen}
        toggle={() => setIsShowImageFullScreen(!isShowImageFullScreen)}
        initialData={defaultState}
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