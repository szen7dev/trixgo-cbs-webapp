import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import searchIcon from "assets/images/icons8-search-120.png";
import { useOnClickOutside } from "services/hooks/useOnclickOutside";
import { useSearchTask } from "services/hooks/useMainSearch";
import { useDispatch } from "react-redux";
import { useAppSelector } from "redux/reducer";
import {
  setKeywordForFile,
  setKeywordForRedux,
  setKeywordForResponse,
  setKeywordForSubject,
  setQueryFile,
  setQueryResponse,
  setQuerySubject,
  setShowModalResult,
  setTabActive,
  setTabIndex,
} from "redux/reducer/DashboardV2Slice";
import {
  useListResponseFromSearch,
  useListCompaniesSystems,
  useListFileFromSearch,
} from "services/hooks/pcm/usePcmDashboardV2";
import { subContentHtml } from "views/homepage/pages";
import { Oval } from "react-loader-spinner";
import { Link, useHistory } from "react-router-dom";
import { useUserSystem } from "services/hooks/users/useUserSystem";
import companyDefault from "assets/images/company_default.png";

export const HomeHeaderContent: FC = () => {
  const wrapperClass = useRef<HTMLDivElement>(null);
  useOnClickOutside(wrapperClass, () => dispatch(setShowModalResult(false)));
  const history = useHistory();

  const tabIndex = useAppSelector((state) => state.dashboardV2.data.tabIndex);
  const showResult = useAppSelector(
    (state) => state.dashboardV2.data.showModalResult
  );
  const dispatch = useDispatch();
  const queryResponse = useAppSelector(
    (state) => state.dashboardV2.data.queryResponse
  );
  const querySubject = useAppSelector(
    (state) => state.dashboardV2.data.querySubject
  );
  const queryFile = useAppSelector(
    (state) => state.dashboardV2.data.queryFile
  );

  const keyword = useAppSelector(
    (state) => state.dashboardV2.data.keyword
  );

  const [keywordSearchForResponse, setKeywordSearchForResponse] = useState("");
  const [keywordSearchForSubject, setKeywordSearchForSubject] = useState("");
  const [keywordSearchForFile, setKeywordSearchForFile] = useState("");

  const { listDataForResponse, isLoadingResponse } = useListResponseFromSearch({
    isGroup: "1",
    keyword: keywordSearchForResponse,
    enabled: keywordSearchForResponse ? true : false,
  });

  const { listTasks: listDataForSubject, isLoadingListTask: isLoadingSubject } =
    useSearchTask({
      params: {
        keyword: keywordSearchForSubject,
        isParent: "0",
        isActive: "1",
        isGroup: "1"
      },
      isFetch: keywordSearchForSubject ? true : false,
    });

  const { isLoadingFile, listDataForFile } = useListFileFromSearch({
    keyword: keywordSearchForFile,
    enabled: keywordSearchForFile ? true : false,
    limit: "3",
    isGroup: "1"
  });

  const { data: listUsersSystem, loading: isLoadingUserSystem } = useUserSystem(
    {
      keyword:
        tabIndex === 1
          ? keywordSearchForResponse
          : tabIndex === 2
          ? keywordSearchForSubject
          : keywordSearchForFile,
      limit: 3,
    },
    keywordSearchForResponse || keywordSearchForSubject || keywordSearchForFile
      ? true
      : false
  );

  const { listDataCompaniesSystems, isLoadingCompaniesSystems } =
    useListCompaniesSystems(
      {
        keyword:
          tabIndex === 1
            ? keywordSearchForResponse
            : tabIndex === 2
            ? keywordSearchForSubject
            : keywordSearchForFile,
      },
      keywordSearchForResponse ||
        keywordSearchForSubject ||
        keywordSearchForFile
        ? true
        : false
    );

  const setTypingTimeoutRef: any = useRef(null);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeywordForRedux(e.target.value));
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
        case 3:
          setKeywordSearchForFile(e.target.value);
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
        case 3:
          dispatch(setKeywordForFile(keywordSearchForFile));
          break;
        default:
          break;
      }
      dispatch(setShowModalResult(false));
      dispatch(setTabActive(tabIndex));
      history.push('/pcm/home');
    }
  };

  const onClickUser = (id: string) => {
    dispatch(setTabActive(tabIndex));
    if (tabIndex === 1) {
      if (!queryResponse.authorsID?.includes?.(id as string)) {
        const newData: any = [...queryResponse.authorsID, id];
        dispatch(
          setQueryResponse({
            ...queryResponse,
            authorsID: newData,
          })
        );
      }
    }
    if (tabIndex === 2) {
      if (!querySubject.assigneesID?.includes?.(id as string)) {
        const newData: any = [...querySubject.assigneesID, id];
        dispatch(
          setQuerySubject({
            ...querySubject,
            assigneesID: newData,
          })
        );
      }
    };

    if (tabIndex === 2) {
      if (!querySubject.assigneesID?.includes?.(id as string)) {
        const newData: any = [...querySubject.assigneesID, id];
        dispatch(
          setQuerySubject({
            ...querySubject,
            assigneesID: newData,
          })
        );
      }
    }
    if (tabIndex === 3) {
      if (!queryFile.authorsID?.includes?.(id as string)) {
        const newData: any = [...queryFile.authorsID, id];
        dispatch(
          setQueryFile({
            ...queryFile,
            authorsID: newData,
          })
        );
      }
    };
    dispatch(setShowModalResult(false));
  };

  const onClickCompany = (id: string) => {
    dispatch(setTabActive(tabIndex));
    if (tabIndex === 1) {
      if (!queryResponse.companyOfAuthorsID?.includes?.(id as string)) {
        const newData: any = [...queryResponse.companyOfAuthorsID, id];
        dispatch(
          setQueryResponse({
            ...queryResponse,
            companyOfAuthorsID: newData,
          })
        );
      }
    }
    if (tabIndex === 2) {
      if (!querySubject.companiesOfAssignee?.includes?.(id as string)) {
        const newData: any = [...querySubject.companiesOfAssignee, id];
        dispatch(
          setQuerySubject({
            ...querySubject,
            companiesOfAssignee: newData,
          })
        );
      }
    };
    if (tabIndex === 3) {
      if (!queryFile.companyOfAuthorsID?.includes?.(id as string)) {
        const newData: any = [...queryFile.companyOfAuthorsID, id];
        dispatch(
          setQuerySubject({
            ...queryFile,
            companyOfAuthorsID: newData,
          })
        );
      }
    };
    dispatch(setShowModalResult(false));
  };

  const shortListDataForResponse = listDataForResponse || [];
  if (shortListDataForResponse.length > 10) {
    shortListDataForResponse.length = 10;
  }

  const shortListDataForSubject = listDataForSubject || [];
  if (shortListDataForSubject.length > 10) {
    shortListDataForSubject.length = 10;
  }

  const shortListDataForFile = listDataForFile || [];
  if (shortListDataForFile.length > 10) {
    shortListDataForFile.length = 10;
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
          value={keyword}
          onChange={(e) => handleSearchChange(e)}
          className={
            "pl-12 w-full h-[45px] bg-cbs-bg-input-search rounded-md p-4 text-primary-gray placeholder:text-primary-gray placeholder:text-xl focus:outline-1  focus:outline-cbs-border focus:bg-white focus:shadow-md transition-all home-input-search"
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
            !isLoadingFile &&
            !isLoadingSubject &&
            !isLoadingCompaniesSystems &&
            !isLoadingUserSystem &&
            (tabIndex === 1
              ? !listDataForResponse.length
              : tabIndex === 2
              ? !listDataForSubject.length
              : !listDataForFile.length) &&
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
            isLoadingFile ||
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

            {!isLoadingFile &&
              !isLoadingUserSystem &&
              !isLoadingCompaniesSystems &&
              tabIndex === 3 &&
              shortListDataForFile.map((item: any, index: number) => {
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
                      <p className={"truncate"}>{item.nameOrg}</p>
                    </div>
                  </Link>
                );
              })}

            {!isLoadingResponse &&
            !isLoadingSubject &&
            !isLoadingCompaniesSystems &&
            !isLoadingUserSystem ? (
              <>
                {listUsersSystem.map((item: any, index) => (
                  <button
                    key={index}
                    className={"flex items-center py-2"}
                    onClick={() => onClickUser(item._id)}
                  >
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
                  </button>
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
                  <button
                    key={index}
                    className={"flex items-center py-2"}
                    onClick={() => onClickCompany(item._id)}
                  >
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
                  </button>
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
