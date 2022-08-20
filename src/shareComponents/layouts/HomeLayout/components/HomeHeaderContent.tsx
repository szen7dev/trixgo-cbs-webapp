import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import searchIcon from "assets/images/icons8-search-120.png";
import { useOnClickOutside } from "services/hooks/useOnclickOutside";
import userAvt from "assets/images/task-user.svg";
import { useDispatch } from "react-redux";
import { useAppSelector } from "redux/reducer";
import { setKeywordForSubject, setShowModalResult, setTabActive, setTabIndex } from "redux/reducer/DashboardV2Slice";
import { usePcmDashboardV2 } from "services/hooks/pcm/usePcmDashboardV2";
import { subContentHtml } from "views/homepage/pages";
import {Oval} from "react-loader-spinner";

export const HomeHeaderContent: FC = () => {
  const wrapperClass = useRef<HTMLDivElement>(null);
  const tabIndex = useAppSelector((state) => state.dashboardV2.data.tabIndex);
  const showResult = useAppSelector((state) => state.dashboardV2.data.showModalResult);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");

  const [keywordSearchFromSubject, setKeywordSearchFromSubject] = useState("");

  const { listDataSubject, isLoadingSubject } = usePcmDashboardV2({
    keyword: keywordSearchFromSubject,
  });

  useOnClickOutside(wrapperClass, () => dispatch(setShowModalResult(false)));
  const menuFilter: {
    text: string;
    filter: string;
  }[] = [
    {
      text: "Tất cả",
      filter: "all",
    },
    {
      text: "Chưa đọc",
      filter: "unread",
    },
    {
      text: "Đã đọc",
      filter: "read",
    },
  ];

  const setTypingTimeoutRef: any = useRef(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setTypingTimeoutRef.current) {
      clearTimeout(setTypingTimeoutRef.current);
    }
    setTypingTimeoutRef.current = setTimeout(() => {
      if (!showResult) {
        dispatch(setShowModalResult(true));
      }
      setKeywordSearchFromSubject(e.target.value);
    }, 500);
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      dispatch(setKeywordForSubject(keywordSearchFromSubject));
      dispatch(setShowModalResult(false));
      dispatch(setTabActive(tabIndex));
    }
  };

  const dataListView = listDataSubject || [];
  if (dataListView.length > 3) {
    dataListView.length = 3;
  } 

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
          onChange={(e) => handleSearchChange(e)}
          className={
            "pl-12 w-full h-[45px] bg-cbs-bg-input-search rounded-md p-4 text-primary-gray placeholder:text-primary-gray placeholder:text-xl focus:outline-none focus:bg-white focus:shadow-md transition-all"
          }
          placeholder={`Tìm trong ${
            tabIndex === 1 ? "phản hồi" : tabIndex === 2 ? "chủ đề" : "file"
          }`}
          onKeyDown={onKeyDown}
        />

        {showResult && (
          <div
            className={
              "absolute top-full w-full mt-2 rounded border-0.5 border-primary-border p-4 bg-white"
            }
            style={{minHeight: 300}}
          >
            {isLoadingSubject ? 
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
            </div> : <></>
            }

            {!isLoadingSubject && listDataSubject.map((item: any, index: number) => {
              return (
                <div className={"flex items-center py-2"} key={index}>
                  <div className={"w-[36px] min-w-[36px] flex items-center justify-center"}>
                    <img
                      src={searchIcon}
                      alt={"----"}
                      className={"w-[18px] h-[18px]"}
                    />
                  </div>
                  <div className={"ml-4 w-[calc(100%-36px-1rem)]"}>
                    <p className={"truncate"}>{subContentHtml(item.content)}</p>
                    <p className="text-primary-gray truncate">
                      {item.project?.sign}.{item.task?.name}
                    </p>
                  </div>
                </div>
              );
            })}

           {!isLoadingSubject ? 
            <div className={"flex items-center py-2"}>
            <div className={"w-[36px] min-w-[36px] flex items-center justify-center"}>
              <img
                src={userAvt}
                alt={"----"}
                className={
                  "w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full overflow-hidden"
                }
              />
            </div>
            <p className={"ml-4 w-[calc(100%-36px-1rem)]"}>Lê Lưu Phong-CPMI (người tạo phản hồi)</p>
          </div> : <></>
           }
            
          </div>
        )}
      </div>
      <div className={"flex border-collapse ml-3 mr-3"}>
        <button
          onClick={() => dispatch(setTabIndex(1))}
          className={
            "border-0.5 border-primary-border px-3 py-1 " +
            (tabIndex === 1
              ? "bg-cbs-soft-blue text-primary"
              : "text-primary-gray")
          }
        >
          Phản hồi
        </button>
        <button
          onClick={() => dispatch(setTabIndex(2))}
          className={
            "border-0.5 border-primary-border px-3 py-1 " +
            (tabIndex === 2
              ? "bg-cbs-soft-blue text-primary"
              : "text-primary-gray")
          }
        >
          Chủ đề
        </button>
        <button
          onClick={() => dispatch(setTabIndex(3))}
          className={
            "border-0.5 border-primary-border px-3 py-1 " +
            (tabIndex === 3
              ? "bg-cbs-soft-blue text-primary"
              : "text-primary-gray")
          }
        >
          File
        </button>
      </div>
    </div>
  );
};
