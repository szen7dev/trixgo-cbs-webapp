import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import searchIcon from "assets/images/icons8-search-120.png";
// import { useOnClickOutside } from "services/hooks/useOnclickOutside";
import { useDispatch } from "react-redux";
import { useAppSelector } from "redux/reducer";
import { useModal } from "services/hooks/useModal";
import { Oval } from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import { setKeywordForFnb, setShowModalFnbResult, setKeywordHomeFnb } from "redux/reducer/FnbSlice";
import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';
import { getIconApp } from "views/fnb/pages/FnbHomePage";
import { ModalDetailItem } from "views/fnb/pages/FnbHomePage/components/ModalDetailItem";

export const FnbHeaderContent: FC = () => {
  const wrapperClass = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();
  // useOnClickOutside(wrapperClass, () => dispatch(setShowModalFnbResult(false)));
  const history = useHistory();
  const showResult = useAppSelector(
    (state) => state.fnbSlice.data.showModalResult
  );
  const dispatch = useDispatch();

  const queryFnb = useAppSelector(
    (state) => state.fnbSlice.data.queryFnb
  );

  const keyword = useAppSelector(
    (state) => state.fnbSlice.data.keyword
  );

  const [keywordSearchForResponse, setKeywordSearchForResponse] = useState("");

  const setTypingTimeoutRef: any = useRef(null);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeywordForFnb(e.target.value));
    if (setTypingTimeoutRef.current) {
      clearTimeout(setTypingTimeoutRef.current);
    }
    setTypingTimeoutRef.current = setTimeout(() => {
      if (!showResult) {
        dispatch(setShowModalFnbResult(true));
      }
      setKeywordSearchForResponse(e.target.value);
    }, 500);
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      dispatch(setKeywordHomeFnb(keywordSearchForResponse));
      dispatch(setShowModalFnbResult(false));
      history.push('/fnb/home');
    }
  };

  const { isLoading, isFetching, fetchNextPage, hasNextPage, totalRecord, list, totalPage, refetch } = useFnbOrder({
    params: {
      limit: 15,
      keyword: keywordSearchForResponse,
      ...queryFnb,
      populates: JSON.stringify({
        path: 'funda shift customer userCreate userUpdate',
        select: "name sign address bizfullname fullname phone numberOfOrders",
      })
    }, isFetchList: keyword ? true : false, isFetchInfo: false
  });

  return (
    <div className={"flex items-center"}>
      <div ref={wrapperClass} className={"w-[600px] relative"}>
        <div
          className={
            "absolute left-0 flex items-center px-4 justify-center h-full"
          }
        >
          <img src={searchIcon} alt={"search icon"} />
        </div>
        <input
          value={keyword}
          onChange={(e) => handleSearchChange(e)}
          className={
            "pl-12 w-full h-[45px] bg-cbs-bg-input-search rounded-md p-4 text-primary-gray placeholder:text-primary-gray placeholder:text-xl focus:outline-1  focus:outline-cbs-border focus:bg-white focus:shadow-md transition-all home-input-search"
          }
          placeholder={`Tìm kiếm đơn hàng `}
          onKeyDown={onKeyDown}
        />

        {showResult && (
          <div
            className={
              "absolute top-full w-full mt-2 rounded border-0.5 border-primary-border p-4 bg-white"
            }
            style={{ minHeight: 300 }}
          >
            {!(list && list.length) && !isLoading && !isFetching ? (
              <div className="italic pt-200 flex items-center justify-center h-[200px]">
                <span>Không tìm thấy kết quả phù hợp</span>
              </div>
            ) : (
              <></>
            )}

            {isLoading || isFetching ? (
              <div
                className={
                  "absolute w-full flex items-center justify-center h-[200px]"
                }
              >
                <div className={"bg-white rounded-full"}>
                  <Oval
                    color={"#0d6efd"}
                    strokeWidth={3}
                    secondaryColor={"#fff"}
                    height={30}
                    width={30}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            {list && list.length ? (
              <>
                {list.map((item: any, index: number) => (
                  <button
                    key={index}
                    className={"flex items-center py-2"}
                    onClick={() =>
                      openModal(
                        <div className="t-add-new-task-dialog text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block">
                          <ModalDetailItem order={item} />
                        </div>
                      )
                    }
                  >
                    <div
                      className={
                        "w-[36px] min-w-[36px] flex items-center justify-center"
                      }
                    >
                      <img
                        src={getIconApp(item.salesChannel)}
                        alt={"avatar"}
                        className={
                          "w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full overflow-hidden"
                        }
                      />
                    </div>
                    <p className={"ml-4 w-[calc(100%-36px-1rem)]"}>
                      {item.name}
                    </p>
                  </button>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
