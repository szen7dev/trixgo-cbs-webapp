import React, { FC, useState, UIEvent } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useQueryListCompany } from "services/hooks/useCompanies";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "views/pcm/styles/pcm.module.css";
import userAvt from "assets/images/task-user.svg";

// import newsImg1 from "assets/images/home-slide-img1.jpg";
// import iconThumbsUp from "assets/images/icons8-thumbs-up-48.png";
// import iconComments from "assets/images/icons8-comments-48.png";
// import iconEye from "assets/images/icons8-eye-48.png";
// import iconArrowRight from "assets/images/icon-arrow-right.svg";

import {
  DropdownSearchableV2,
  Loader,
  TimeRangeDropdown,
} from "../../../../shareComponents/common";
import userIcon from "assets/images/icon-user-avatar.svg";
import maleUserIcon from "assets/images/icons8-male-user-64.svg";
import categoryIcon from "assets/images/icons8-category-48.svg";
import timeTableIcon from "assets/images/icons8-timetable-48.svg";
import projectIcon from "assets/images/icons8-project-50.svg";
import downloadIcon from "assets/images/icons8-download-96.svg";
import sendMailIcon from "assets/images/icons8-send-email-96.svg";
import nextIcon from "assets/images/icons-arrow-next.svg";
import TriangleDown from "assets/icons/TriangleDown";
import timelineIcon from "assets/images/icons8-timeline-week-48.svg";
import businessBuiding from "assets/images/icons8-business-building-48.svg";

import { useUserSystem } from "services/hooks/users/useUserSystem";
import { useAuth } from "services/hooks/auth/useAuth";
import { useAppSelector } from "redux/reducer";
import {
  useListResponseFromSearch,
  useListSubjectFromSearch,
} from "services/hooks/pcm/usePcmDashboardV2";
import { debounce } from "lodash";
import { useQueryListDepartmentsIsMember } from "services/hooks/items/useDepartment";
import { useDispatch } from "react-redux";
import { setTabActive } from "redux/reducer/DashboardV2Slice";

type Props = {
  type?: number;
};

export const DashboardV2: FC<Props> = ({ type = 0 }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");
  const { user } = useAuth();
  const tabIndex = useAppSelector((state) => state.dashboardV2.data.tabIndex);
  const tabActive = useAppSelector((state) => state.dashboardV2.data.tabActive);

  const keywordForResponse = useAppSelector(
    (state) => state.dashboardV2.data.keywordForResponse
  );

  ///// Đơn vị tạo phản hồi
  const [companyOfAuthor, setCompanyOfAuthor] = useState<string[]>([]);

  const [companiesAssign, setCompaniesAssign] = useState<string[]>([]);

  ///// Danh sách công ty
  const [searchCompanyName, setSearchCompanyName] = useState("");
  const {
    data: listCompany,
    hasNextPage: hasNextPageCompany,
    fetchNextPage: fetchNextPageCompany,
  } = useQueryListCompany({ keyword: searchCompanyName });

  const handleScrollCompany = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom && hasNextPageCompany) {
      fetchNextPageCompany();
    }
  };

  // Người tạo phản hồi
  const [authorsCreateResponse, setAuthorsCreateResponse] = useState<string[]>(
    []
  );

  // Người tạo
  const [authors, setAuthors] = useState<string[]>([]);

  // Người thực hiện
  const [assign, setAssign] = useState<string[]>([]);
  ////  Danh sách user
  const [searchUserSystem, setSearchUserSystem] = useState("");
  const {
    data: listUsersSystem,
    hasNextPage: hasNextPageUserSystem,
    fetchNextPage: fetchNextPageUserSystem,
  } = useUserSystem({ keyword: searchUserSystem }, true);

  const handleScrollUserSystem = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom && hasNextPageUserSystem) {
      fetchNextPageUserSystem();
    }
  };

  ////  Dự án
  const [project, setProject] = useState<string[]>([]);
  const [searchProject, setSearchProject] = useState("");

  const {
    data: listProject,
    fetchNextPage: fetchNextPagePrject,
    hasNextPage: hasNextPageProject,
  } = useQueryListDepartmentsIsMember({
    limit: 50,
    keyword: searchProject,
    isFetch: true,
  });

  const handleScrollProject = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom && hasNextPageProject) {
      fetchNextPagePrject();
    }
  };
  //

  const [fromCreateDate, setFromCreateDate] = useState("");
  const [toCreateDate, setToCreateDate] = useState("");
  const [official, setOfficial] = useState<any>(null);

  // Danh sách các response
  const query: any = {
    keyword: keywordForResponse,
    companyOfAuthor: companyOfAuthor,
    author: authorsCreateResponse,
    project: project,
    fromDate: fromCreateDate,
    toDate: toCreateDate,
    enabled: tabActive === 1 ? true : false,
  };
  if (official) {
    query.official = official === 1 ? true : false
  }
  const { listDataForResponse, isLoadingResponse } = useListResponseFromSearch(query);

  // Danh sách các subject theo keyword
  const { listDataForSubject, totalRecord: totalRecordSubject } =
    useListSubjectFromSearch({
      keyword: "",
    });

  //////

  const checkActive = (relateds: string[], user: string) => {
    let result = "read border-b-0.5 border-primary-border";
    if (relateds.includes(user)) {
      result = "unread border-b-0.5 border-primary-border";
    }
    return result;
  };

  return (
    <div className="t-home flex flex-col h-full overflow-hidden">
      <div className={"sticky top-0 bg-white z-10"}>
        <div className={"filter-bar flex flex-wrap px-4 py-2"}>
          {isLoadingResponse && <Loader className="border-primary" />}
          {tabIndex === 2 && (
            <DropdownSearchableV2
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Đơn vị thực hiện"}
              showTriangle={true}
              isMultiple={true}
              selectOneByOne={true}
              onchangeValue={(value) => {
                if (!companiesAssign?.includes?.(value.id as string)) {
                  const newData: any = [...companiesAssign, value.id];
                  setCompaniesAssign(newData);
                }
                setSearchCompanyName("");
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = companiesAssign.filter((item) => item !== id);
                setCompaniesAssign(newList);
              }}
              onClearData={() => setCompaniesAssign([])}
              onScroll={handleScrollCompany}
              onSearchInputChange={debounce(
                (value) => setSearchCompanyName(value),
                500
              )}
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
          )}

          {tabIndex === 2 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Người thực hiện"}
              showTriangle={true}
              isMultiple={true}
              onchangeValue={(value) => {
                if (!assign.includes?.(value.id as string)) {
                  const newData: any = [...assign, value.id];
                  setAssign(newData);
                }
                setSearchUserSystem("");
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = assign.filter((item) => item !== id);
                setAssign(newList);
              }}
              onClearData={() => setAssign([])}
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
                <img className={"mr-2"} src={maleUserIcon} alt={"icon"} />
              }
            />
          )}

          {tabIndex === 2 && (
            <TimeRangeDropdown
              className={
                "mr-2 border border-primary-border rounded-lg mb-2 p-1 pl-2 "
              }
              placeholder={"Thời hạn"}
              iconBack={<TriangleDown />}
              iconFront={<img src={timelineIcon} alt={"----"} />}
              onValueChange={(val) => console.log(val)}
              options={[
                {
                  text: "Tất cả",
                  fromDate: "00/00/0000",
                  toDate: "31/12/2999",
                },
                {
                  text: "1 tuần tới",
                  fromDate: "12/08/2022",
                  toDate: "17/08/2022",
                },
                {
                  text: "> 7 ngày tiếp theo",
                  fromDate: "17/08/2022",
                  toDate: "31/12/2999",
                },
              ]}
            />
          )}
          {(tabIndex === 2 || tabIndex === 3) && (
            <DropdownSearchableV2
              selectOneByOne={true}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Người tạo"}
              showTriangle={true}
              isMultiple={true}
              onchangeValue={(value) => {
                if (!authors.includes?.(value.id as string)) {
                  const newData: any = [...authors, value.id];
                  setAuthors(newData);
                }
                setSearchUserSystem("");
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = authorsCreateResponse.filter(
                  (item) => item !== id
                );
                setAuthors(newList);
              }}
              onClearData={() => setAuthors([])}
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
                <img className={"mr-2"} src={maleUserIcon} alt={"icon"} />
              }
            />
          )}

          {tabIndex === 1 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Đơn vị tạo phản hồi"}
              onchangeValue={(value) => {
                if (!companyOfAuthor?.includes?.(value.id as string)) {
                  const newData: any = [...companyOfAuthor, value.id];
                  setCompanyOfAuthor(newData);
                }
                setSearchCompanyName("");
                dispatch(setTabActive(tabIndex));
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = companyOfAuthor.filter((item) => item !== id);
                setCompanyOfAuthor(newList);
              }}
              onClearData={() => setCompanyOfAuthor([])}
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
          )}

          {tabIndex === 1 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Người tạo phản hồi"}
              showTriangle={true}
              isMultiple={true}
              onchangeValue={(value) => {
                if (!authorsCreateResponse.includes?.(value.id as string)) {
                  const newData: any = [...authorsCreateResponse, value.id];
                  setAuthorsCreateResponse(newData);
                }
                setSearchUserSystem("");
                dispatch(setTabActive(tabIndex));
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = authorsCreateResponse.filter(
                  (item) => item !== id
                );
                setAuthorsCreateResponse(newList);
              }}
              onClearData={() => setAuthorsCreateResponse([])}
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
                <img className={"mr-2"} src={maleUserIcon} alt={"icon"} />
              }
            />
          )}

          {(tabIndex === 1 || tabIndex === 2 || tabIndex === 3) && (
            <DropdownSearchableV2
              selectOneByOne={true}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Dự án"}
              prefixIcon={
                <img className={"mr-2"} src={projectIcon} alt={"icon"} />
              }
              isMultiple={true}
              onchangeValue={(value) => {
                if (!project.includes?.(value.id as string)) {
                  const newData: any = [...project, value.id];
                  setProject(newData);
                }
                setSearchProject("");
                dispatch(setTabActive(tabIndex));
              }}
              onMultipleRemoveValue={(id: any) => {
                const newList = project.filter((item) => item !== id);
                setProject(newList);
              }}
              onClearData={() => setProject([])}
              onSearchInputChange={debounce(
                (value) => setSearchProject(value),
                500
              )}
              onScroll={handleScrollProject}
              data={listProject.map((item) => ({
                label: item.name,
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
          )}

          {(tabIndex === 1 || tabIndex === 3) && (
            <TimeRangeDropdown
              className={
                "mr-2 border border-primary-border rounded-lg mb-2 p-1 pl-2 "
              }
              placeholder={"Thời gian tạo"}
              iconBack={<TriangleDown />}
              iconFront={<img src={timelineIcon} alt={"----"} />}
              onValueChange={(val) => {
                setFromCreateDate(val.fromDate);
                setToCreateDate(val.toDate);
                dispatch(setTabActive(tabIndex));
              }}
              options={[
                {
                  text: "Tất cả",
                  fromDate: "1990/01/01",
                  toDate: "31/12/2999",
                },
                {
                  text: "Ngày nay",
                  fromDate: moment().format("YYYY/MM/DD"),
                  toDate: moment().format("YYYY/MM/DD"),
                },
                {
                  text: "Cách đây 1 tuần",
                  fromDate: moment(
                    moment().subtract(7, "days").calendar(),
                    "DD-MM-YYYY"
                  ).format("YYYY/MM/DD"),
                  toDate: moment().format("YYYY/MM/DD"),
                },
                {
                  text: "Cách đây 1 tháng",
                  fromDate: moment(
                    moment().subtract(31, "days").calendar(),
                    "DD-MM-YYYY"
                  ).format("YYYY/MM/DD"),
                  toDate: moment().format("YYYY/MM/DD"),
                },
              ]}
            />
          )}

          {tabIndex === 2 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Quá hạn"}
              prefixIcon={
                <img className={"mr-2"} src={timeTableIcon} alt={"icon"} />
              }
              disableSearch={true}
              data={[
                {
                  id: 1,
                  text: "Tất cả",
                },
                {
                  id: 2,
                  text: "Đã quá hạn",
                },
                {
                  id: 3,
                  text: "Chưa quá hạn",
                },
              ]}
            />
          )}
          {tabIndex === 2 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Trạng thái"}
              prefixIcon={
                <img className={"mr-2"} src={categoryIcon} alt={"icon"} />
              }
              isMultiple={true}
              disableSearch={true}
              data={[
                {
                  id: 1,
                  text: "Khởi tạo, sắp triển khai",
                },
                {
                  id: 2,
                  text: "Đang triển khai",
                },
                {
                  id: 3,
                  text: "Hoàn thành",
                },
                {
                  id: 4,
                  text: "Treo lại",
                },
                {
                  id: 5,
                  text: "Chờ người khác giải quyết",
                },
                {
                  id: 6,
                  text: "Tiếp tục theo dõi",
                },
                {
                  id: 7,
                  text: "Khóa đóng",
                },
              ]}
            />
          )}
          {tabIndex === 1 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Phân loại"}
              prefixIcon={
                <img className={"mr-2"} src={categoryIcon} alt={"icon"} />
              }
              isMultiple={true}
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
                setOfficial(value.id);
              }}
            />
          )}
          {tabIndex === 2 && (
            <DropdownSearchableV2
              selectOneByOne={true}
              className={"mr-2 border border-primary-border rounded-lg mb-2"}
              placeholder={"Phân loại"}
              prefixIcon={
                <img className={"mr-2"} src={categoryIcon} alt={"icon"} />
              }
              isMultiple={true}
              disableSearch={true}
              data={[
                {
                  id: 0,
                  text: "Việc thông thường",
                },
                {
                  id: 1,
                  text: "Yêu cầu thông tin",
                },
                {
                  id: 2,
                  text: "Yêu cầu phê duyệt",
                },
                {
                  id: 3,
                  text: "Thanh toán",
                },
                {
                  id: 4,
                  text: "Lựa chọn nhà thầu",
                },
                {
                  id: 5,
                  text: "Nghiệm thu chất lượng",
                },
                {
                  id: 6,
                  text: "Yêu cầu sửa chữa",
                },
                {
                  id: 7,
                  text: "Yêu cầu thay đổi",
                },
                {
                  id: 8,
                  text: "Yêu cầu thực hiện",
                },
                {
                  id: 9,
                  text: "Báo cáo",
                },
                {
                  id: 10,
                  text: "Tiến độ",
                },
                {
                  id: 11,
                  text: "Họp",
                },
              ]}
            />
          )}
          {tabIndex === 2 && (
            <button
              className={
                "bg-green-success rounded text-white px-2 h-[32px] mb-2"
              }
            >
              Lưu kết quả
            </button>
          )}
        </div>
        <div className={"header-table flex px-4 w-full top-0 bg-white pb-4"}>
          <div className={"flex items-center justify-center mr-2"}>
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="checkAll"
            />
          </div>
          <button
            onClick={() => setFilter("all")}
            className={
              "py-1 px-6 mx-2 rounded-full border border-primary-border " +
              (filter === "all"
                ? "text-white bg-cbs-secondary border-none"
                : "text-primary-gray bg-white")
            }
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={
              "py-1 px-6 mx-2 rounded-full border border-primary-border " +
              (filter === "unread"
                ? "text-white bg-cbs-secondary border-none"
                : "text-primary-gray bg-white")
            }
          >
            Chưa đọc
          </button>
          <button
            onClick={() => setFilter("read")}
            className={
              "py-1 px-6 mx-2 rounded-full border border-primary-border " +
              (filter === "read"
                ? "text-white bg-cbs-secondary border-none"
                : "text-primary-gray bg-white")
            }
          >
            Đã đọc
          </button>
          <button className={"text-primary mx-2"}>
            Đánh dấu tất cả đã đọc
          </button>
          <button className={"flex items-center justify-center mx-3"}>
            <img src={downloadIcon} alt={"-----"} />
          </button>
          <button className={"flex items-center justify-center mx-3"}>
            <img src={sendMailIcon} alt={"-----"} />
          </button>
          <div className={"flex-1 flex items-center justify-end"}>
            <span className={"text-primary-gray"}>
              1-50 trong số {totalRecordSubject}
            </span>
            <button
              className={
                "w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"
              }
              disabled={true}
            >
              <img src={nextIcon} alt={"----"} className={"rotate-180"} />
            </button>
            <button
              className={
                "w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"
              }
            >
              <img src={nextIcon} alt={"----"} />
            </button>
          </div>
        </div>
      </div>
      <div className={"flex-1 overflow-y-auto"}>
        <table className={"w-full table-fixed tasks"}>
          {tabActive === 1 ? (
            <tbody>
              {listDataForResponse.map((item: any, index: number) => {
                return (
                  <tr
                    key={index}
                    className={"read border-b-0.5 border-primary-border"}
                  >
                    <td className={"w-[46px]"}>
                      <div className={"flex items-center justify-center py-2"}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="check"
                        />
                      </div>
                    </td>
                    <td className={"w-[55px]"}>
                      <Link to={"/pcm/detail/" + item._id}>
                        <div className={"py-2"}>
                          <img
                            src={`${process.env.REACT_APP_URL_S3_USER}/${item.author.image}`}
                            alt={"avatar"}
                            className={
                              "w-[36px] h-[36px] max-w-[36px] max-h-[36px] min-w-[36px] min-h-[36px] rounded-full overflow-hidden"
                            }
                          />
                        </div>
                      </Link>
                    </td>
                    <td className={"w-[170px]"}>
                      <Link to={"/pcm/detail/" + item._id}>
                        <div className={"user-infor py-2"}>
                          <p className={"truncate user-infor-name text-[14px]"}>
                            {item.author.fullname}
                          </p>
                          <span className={"text-xs text-primary-gray py-2"}>
                            {item.task.related.length} liên quan
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td className={"w-td-dashboard"}>
                      <Link to={"/pcm/detail/" + item._id}>
                        <p className={"task-title truncate text-[14px] mt-2"}>
                          {item.project?.sign}.{item.task?.name}
                        </p>
                        <p
                          className={
                            "crop-text truncate text-xs text-primary-gray py-2"
                          }
                        >
                          {subContentHtml(item.content)}
                        </p>
                      </Link>
                    </td>
                    <td className={"w-[100px]"}>
                      <div
                        className={
                          "task-date whitespace-nowrap py-2 text-right pr-4"
                        }
                      >
                        {moment(item.createAt).format("DD/MM/YYYY")}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <></>
          )}

          {tabActive === 2 ? (
            <tbody>
              {listDataForSubject?.map((item: any, index: number) => {
                return (
                  <tr
                    key={index}
                    className={checkActive(item.news, `${user?._id}`)}
                  >
                    <td className={"w-[46px]"}>
                      <div className={"flex items-center justify-center py-2"}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="check"
                        />
                      </div>
                    </td>
                    <td className={"w-[55px]"}>
                      <Link to={"/pcm/detail/" + item._id}>
                        <div className={"py-2"}>
                          <img
                            src={`${process.env.REACT_APP_URL_S3_USER}/${
                              item.lastComment
                                ? item.lastComment.author.image
                                : item.author.image
                            }`}
                            alt={"avatar"}
                            className={
                              "w-[36px] h-[36px] max-w-[36px] max-h-[36px] min-w-[36px] min-h-[36px] rounded-full overflow-hidden"
                            }
                          />
                        </div>
                      </Link>
                    </td>
                    <td className={"w-[170px]"}>
                      <Link to={"/pcm/detail/" + item._id}>
                        <div className={"user-infor py-2"}>
                          <p className={"truncate user-infor-name text-[14px]"}>
                            {item.lastComment
                              ? item.lastComment.author.fullname
                              : item.author.fullname}
                          </p>
                          <span className={"text-xs text-primary-gray py-2"}>
                            {item.related.length} liên quan
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td className={"w-td-dashboard"}>
                      <Link to={"/pcm/detail/" + item._id}>
                        <p className={"task-title truncate text-[14px] mt-2"}>
                          {item.project.sign}.{subContentHtml(item.name)}
                        </p>
                        <p
                          className={
                            "crop-text truncate text-xs text-primary-gray py-2"
                          }
                        >
                          {subContentHtml(item.lastComment?.content)}
                        </p>
                      </Link>
                    </td>
                    <td className={"w-[100px]"}>
                      <div
                        className={
                          "task-date whitespace-nowrap py-2 text-right pr-4"
                        }
                      >
                        {moment(item.modifyAt).format("DD/MM/YYYY")}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <></>
          )}
        </table>

        {tabActive === 3 ? (
          <table
            className={
              "table-fixed border-collapse w-full border-0.5 border-primary-border"
            }
          >
            <thead>
              <tr className={"sticky top-0"}>
                <th
                  className={
                    "text-center py-2 font-normal text-primary-gray w-[70px] bg-cbs-table-header"
                  }
                >
                  TT
                </th>
                <th
                  className={
                    "w-1/12 bg-cbs-table-header text-left font-normal text-primary-gray py-2 border-b-0.5 border-primary-border"
                  }
                >
                  Ngày tạo
                </th>
                <th
                  className={
                    "w-2/12 bg-cbs-table-header text-left font-normal text-primary-gray py-2 border-b-0.5 border-primary-border"
                  }
                >
                  Người tạo
                </th>
                <th
                  className={
                    "w-3/12 bg-cbs-table-header text-left font-normal text-primary-gray py-2 border-b-0.5 border-primary-border"
                  }
                >
                  Tên file
                </th>
                <th
                  className={
                    "w-1/12 bg-cbs-table-header text-left font-normal text-primary-gray py-2 border-b-0.5 border-primary-border"
                  }
                >
                  Dung lượng
                </th>
                <th
                  className={
                    "min-w-4/12 bg-cbs-table-header text-left font-normal text-primary-gray py-2 border-b-0.5 border-primary-border"
                  }
                >
                  Thuộc chủ đề
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(12)].map((e, i) => (
                <tr key={i}>
                  <td
                    className={
                      "py-2 border-b-0.5 border-primary-border text-center align-middle"
                    }
                  >
                    {i + 1}
                  </td>
                  <td
                    className={
                      "py-2 border-b-0.5 border-primary-border align-middle"
                    }
                  >
                    <p>24/3/2021</p>
                    <p className={"text-primary-gray"}>16 giờ trước</p>
                  </td>
                  <td
                    className={
                      "py-2 border-b-0.5 border-primary-border align-middle"
                    }
                  >
                    <div className={"flex items-center"}>
                      <img
                        src={userAvt}
                        alt={"---"}
                        className={
                          "w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px rounded-full overflow-hidden]"
                        }
                      />
                      <span className={"ml-2"}>Phan Văn Trường</span>
                    </div>
                  </td>
                  <td
                    className={
                      "py-2 border-b-0.5 border-primary-border align-middle text-cbs-highlight-color break-all pr-2"
                    }
                  >
                    2020.12.15_HAR.MAR.HieuNT.DuToanNoiBo_V0.xlsx
                  </td>
                  <td
                    className={
                      "py-2 border-b-0.5 border-primary-border align-middle"
                    }
                  >
                    63 KB
                  </td>
                  <td
                    className={
                      "py-2 border-b-0.5 border-primary-border align-middle"
                    }
                  >
                    HAR.MAR.Đề nghị lập chi phí nội bộ và thống nhất với ban
                    lãnh đạo công ty - Dự án Courtyard by Marriott Halong Bay
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <></>
        )}
      </div>
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
