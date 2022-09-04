import React, { FC } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";
import debounce from "lodash/debounce";

import { Paginate } from "shareComponents/common";
import {
  NavigateTab,
  // DocumentDropdown,
  SearchInput,
} from "views/document/sharedComponents/common";

import { useQueryListPackage } from "services/hooks/document/usePackage";

const IconArrowRight = () => (
  <div className="">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </div>
);

export const DocumentFolderPage: FC = () => {
  const params = useParams<any>();
	const location = useLocation();
  const { t } = useTranslation(["document"]);
  const [pageParam, setPageParam] = React.useState<any>({});
  const [prevCursor, setPrevCursor] = React.useState<any>([null]);
  const [keyword, setKeyword] = React.useState("")

  const {
    listPackage,
    totalPages,
    totalRecord,
	  nextCursor
  } = useQueryListPackage({ keyword, departmentID: params.id, ...pageParam });

  const nextPageAction = React.useCallback(() => {
    setPageParam({ lastestID: nextCursor || "" });
  }, [nextCursor]);

  const prevPageAction = React.useCallback(() => {
    if (!nextCursor) {
      setPageParam({
		  lastestID: prevCursor[prevCursor.length - 2] || ''
	  })
    } else {
      const prev = prevCursor.findIndex((item: any) => item === nextCursor)
      setPageParam({
		  lastestID: prevCursor[prev - 2] || ''
	  })
    }
  }, [nextCursor, prevCursor]);

  React.useEffect(() => {
    if (!nextCursor) {
      return;
    }
    const isExist = prevCursor.find((item: any) => item === nextCursor)
    if (!isExist) {
      setPrevCursor([...prevCursor, nextCursor])
    }
  }, [nextCursor, prevCursor]);

  return (
    <>
      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden h-full">
        <div className={"sticky top-0 z-10"}>
          <div className={"flex items-center pb-2"}>
            <NavigateTab/>
          </div>
        </div>
        <div className="flex flex-wrap items-center w-full px-4 gap-x-2 text-black text-small py-1">
        <span className="text-x-large mr-7">Danh sách</span>
          {/* <span className="">CHG.THT</span>
          <IconArrowRight />
          <button className="bg-cbs-active-comment text-cbs-primary h-10 w-10 text-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </button>
          <IconArrowRight />
          <span className="truncate max-w-[132px]">
            Thi công san lấp mặt bằng
          </span>
          <IconArrowRight /> */}
          {/* <span>Hợp đồng</span> */}
          <SearchInput
              classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2"
              onChange={debounce((e) => {
                setKeyword(e.target.value)
              }, 500)}
            />
        </div>
        <div className="flex-1 overflow-y-auto">
          <table
            className="text-black text-medium border-separate space-x-0 space-y-0 w-full"
            style={{ borderSpacing: 0 }}
          >
            <thead className="">
              <tr className="text-primary-gray whitespace-nowrap align-middle text-left">
                <th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                </th>
                <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                  <span className="pl-2 border-l border-cbs-border">
                    Nội dung
                  </span>
                </th>
                <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                  <span className="pl-2 border-l border-cbs-border">
                    Người tạo
                  </span>
                </th>
                <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                  <span className="pl-2 border-l border-cbs-border">
                    Ngày văn bản
                  </span>
                </th>
                <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
                  <span className="pl-2 border-l border-cbs-border">
                    Số lượng hồ sơ
                  </span>
                </th>
                <th
                  className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border"
                  style={{ minWidth: "150px" }}
                >
                  <span className="pl-2 border-l border-cbs-border">
                    Người được truy cập
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {listPackage.map((elm, index) => {
                let linkRef;
                if(location.pathname.includes("/document/project/")){
                  linkRef = `/document/project/${params.id}/package/${elm._id}`
                }else{
                  linkRef = `/pm/project/${params.id}/package/${elm._id}`
                }
                return (
                  <tr
                    key={index}
                    className="text-left hover:bg-cbs-active-comment"
                  >
                    <td className="px-4 py-2 w-[1px]">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <Link to={linkRef}>
                        <p className="align-top">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 inline text-cbs-subtext mr-3"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                          </svg>
                          {elm.name}({ elm.numberOfDocs})
                        </p>
                      </Link>
                    </td>
                    <td className="py-2 px-2">{elm?.author?.fullname}</td>
                    <td className="py-2 px-2">
                      {t("nameWithTimeReverse", {
                        time:
                          moment(elm.modifyAt).isValid() &&
                          moment(elm.modifyAt).format("DD/MM/YYYY"),
                        user: {
                          name: elm.userUpdate?.fullname,
                          sign: elm.userUpdate?.sign,
                        },
                      })}
                    </td>
                    <td className="py-2 px-2">{elm?.numberOfDocs || 0}</td>
                    <td className="py-2 px-2">
                      <div className="flex">
                        {Array.isArray(elm.members) &&
                          (elm?.members?.length > 5 ? (
                            <>
                              {elm.members.slice(0, 4).map((member) => (
                                <img
                                  key={member._id}
                                  src={`${process.env.REACT_APP_URL_S3_USER}/${member.image}`}
                                  alt=""
                                  className="w-6 h-6 rounded-full"
                                />
                              ))}
                              <div
                                className="h-6 w-6 rounded-full -ml-1.5 bg-cbs-border text-white flex justify-center items-center"
                                style={{ fontSize: "10px" }}
                              >
                                +{elm.members.length - 4}
                              </div>
                            </>
                          ) : (
                            elm.members.map((member) => (
                              <img
                                key={member._id}
                                src={`${process.env.REACT_APP_URL_S3_USER}/${member.image}`}
                                alt=""
                                className="w-6 h-6 rounded-full"
                              />
                            ))
                          ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Paginate
          totalPages={totalPages}
          totalRecord={totalRecord}
          hasNextPage
          nextPageAction={nextPageAction}
          prevPageAction={prevPageAction}
        />
      </div>
    </>
  );
};

export default DocumentFolderPage;