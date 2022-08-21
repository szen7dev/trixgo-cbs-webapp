import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import searchIcon from "assets/images/icons8-search-120.png";
import { useOnClickOutside } from "services/hooks/useOnclickOutside";
import userAvt from "assets/images/task-user.svg";
import { useDispatch } from "react-redux";
import { useAppSelector } from "redux/reducer";
import {
  setKeywordForResponse,
  setKeywordForSubject,
  setShowModalResult,
  setTabActive,
  setTabIndex,
} from "redux/reducer/DashboardV2Slice";
import {
  useListResponseFromSearch,
  useListSubjectFromSearch,
  useListCompaniesSystems,
} from "services/hooks/pcm/usePcmDashboardV2";
import { subContentHtml } from "views/homepage/pages";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useUserSystem } from "services/hooks/users/useUserSystem";
import companyDefault from "assets/images/company_default.png";

export const HomeHeaderContent: FC = () => {
  const wrapperClass = useRef<HTMLDivElement>(null);
  useOnClickOutside(wrapperClass, () => dispatch(setShowModalResult(false)));

  const tabIndex = useAppSelector((state) => state.dashboardV2.data.tabIndex);
  const showResult = useAppSelector(
    (state) => state.dashboardV2.data.showModalResult
  );
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");

  const [keywordSearchForResponse, setKeywordSearchForResponse] = useState("");
  const [keywordSearchForSubject, setKeywordSearchForSubject] = useState("");

  const { listDataForResponse, isLoadingResponse } = useListResponseFromSearch({
    keyword: keywordSearchForResponse,
  });

  const { listDataForSubject, isLoadingSubject } = useListSubjectFromSearch(
    {
      keyword: keywordSearchForSubject,
    },
    keywordSearchForSubject ? true : false
  );

  const { data: listUsersSystem, loading: isLoadingUserSystem } = useUserSystem(
    {
      keyword:
        tabIndex === 1 ? keywordSearchForResponse : keywordSearchForSubject,
      limit: 3,
    },
    keywordSearchForResponse || keywordSearchForSubject ? true : false
  );

  const { listDataCompaniesSystems, isLoadingCompaniesSystems } =
    useListCompaniesSystems(
      {
        keyword:
          tabIndex === 1 ? keywordSearchForResponse : keywordSearchForSubject,
      },
      keywordSearchForResponse || keywordSearchForSubject ? true : false
    );

  const setTypingTimeoutRef: any = useRef(null);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setTypingTimeoutRef.current) {
      clearTimeout(setTypingTimeoutRef.current);
    }
    setTypingTimeoutRef.current = setTimeout(() => {
      if (!showResult) {
        dispatch(setShowModalResult(true));
      }
      switch (tabIndex) {
        case 1:
          setKeywordSearchForResponse(e.target.value);
          break;
        case 2:
          setKeywordSearchForSubject(e.target.value);
          break;
        default:
          break;
      }
    }, 500);
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      switch (tabIndex) {
        case 1:
          dispatch(setKeywordForResponse(keywordSearchForResponse));
          break;
        case 2:
          dispatch(setKeywordForSubject(keywordSearchForSubject));
          break;
        default:
          break;
      }
      dispatch(setShowModalResult(false));
      dispatch(setTabActive(tabIndex));
    }
  };

  const shortListDataForResponse = listDataForResponse || [];
  if (shortListDataForResponse.length > 3) {
    shortListDataForResponse.length = 3;
  }

  const shortListDataForSubject = listDataForSubject || [];
  if (shortListDataForSubject.length > 3) {
    shortListDataForSubject.length = 3;
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
            style={{ minHeight: 300 }}
          >
            {!isLoadingResponse &&
            !isLoadingSubject &&
            !isLoadingCompaniesSystems &&
            !isLoadingUserSystem &&
            (tabIndex === 1
              ? (!listDataForResponse.length)
              : (!listDataForSubject.length)) &&
            !listUsersSystem.length &&
            !listDataCompaniesSystems.length ? (
              <div className="italic pt-200 flex items-center justify-center h-[200px]">
                <span>Không tìm thấy kết quả phù hợp</span>
              </div>
            ) : (
              <></>
            )}

            {isLoadingResponse ||
            isLoadingSubject ||
            isLoadingUserSystem ||
            isLoadingCompaniesSystems ? (
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

            {!isLoadingResponse &&
              !isLoadingUserSystem &&
              !isLoadingCompaniesSystems &&
              tabIndex === 1 &&
              shortListDataForResponse.map((item: any, index: number) => {
                return (
                  <Link
                    to={"/pcm/detail/" + item.task?._id}
                    className={"flex items-center py-2"}
                    key={index}
                    onClick={() => dispatch(setShowModalResult(false))}
                  >
                    <div
                      className={
                        "w-[36px] min-w-[36px] flex items-center justify-center"
                      }
                    >
                      <img
                        src={searchIcon}
                        alt={"----"}
                        className={"w-[18px] h-[18px]"}
                      />
                    </div>
                    <div className={"ml-4 w-[calc(100%-36px-1rem)]"}>
                      <p className={"truncate"}>
                        {subContentHtml(item.content)}
                      </p>
                      <p className="text-primary-gray truncate">
                        {item.project?.sign}.{item.task?.name}
                      </p>
                    </div>
                  </Link>
                );
              })}

            {!isLoadingSubject &&
              !isLoadingUserSystem &&
              !isLoadingCompaniesSystems &&
              tabIndex === 2 &&
              shortListDataForSubject.map((item: any, index: number) => {
                return (
                  <Link
                    to={"/pcm/detail/" + item._id}
                    className={"flex items-center py-2"}
                    key={index}
                    onClick={() => dispatch(setShowModalResult(false))}
                  >
                    <div
                      className={
                        "w-[36px] min-w-[36px] flex items-center justify-center"
                      }
                    >
                      <img
                        src={searchIcon}
                        alt={"----"}
                        className={"w-[18px] h-[18px]"}
                      />
                    </div>
                    <div className={"ml-4 w-[calc(100%-36px-1rem)]"}>
                      <p className={"truncate"}>
                        {subContentHtml(item.lastComment?.content)}
                      </p>
                      <p className="text-primary-gray truncate">
                        {item.project?.sign}.{subContentHtml(item.name)}
                      </p>
                    </div>
                  </Link>
                );
              })}

            {!isLoadingResponse &&
            !isLoadingSubject &&
            !isLoadingCompaniesSystems &&
            !isLoadingUserSystem ? (
              <>
                {listUsersSystem.map((item, index) => (
                  <div key={index} className={"flex items-center py-2"}>
                    <div
                      className={
                        "w-[36px] min-w-[36px] flex items-center justify-center"
                      }
                    >
                      <img
                        src={`${process.env.REACT_APP_URL_S3_USER}/${item.image}`}
                        alt={"avatar"}
                        className={
                          "w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full overflow-hidden"
                        }
                      />
                    </div>
                    <p className={"ml-4 w-[calc(100%-36px-1rem)]"}>
                      {item.bizfullname}
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}

            {!isLoadingResponse &&
            !isLoadingSubject &&
            !isLoadingCompaniesSystems &&
            !isLoadingUserSystem ? (
              <>
                {listDataCompaniesSystems.map((item: any, index: number) => (
                  <div key={index} className={"flex items-center py-2"}>
                    <div
                      className={
                        "w-[36px] min-w-[36px] flex items-center justify-center"
                      }
                    >
                      <img
                        src={
                          item.image
                            ? `${process.env.REACT_APP_URL_S3_USER}/${item.image}`
                            : companyDefault
                        }
                        alt={"avatar"}
                        className={
                          "w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full overflow-hidden"
                        }
                      />
                    </div>
                    <p className={"ml-4 w-[calc(100%-36px-1rem)]"}>
                      {item.name}
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
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
