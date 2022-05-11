import React, { FC, UIEvent, ChangeEvent, useState, useCallback } from "react";

import iconChevronRight from "assets/images/icon-chevron-right.png";
import classNames from "classnames";
import debounce from "lodash/debounce";

import Work from "./components/Work";
import File from "./components/File";
import Profile from "./components/Profile";
import Contract from "./components/Contract";
import Member from "./components/Member";
import Project from "./components/Project";

import { useUserSystem } from "services/hooks/users/useUserSystem";
import { useProjectCustom } from "services/hooks/items/useProject";

export const MainSearchDialog: FC = () => {
  const [userKeyword, setUserKeyword] = useState('');
  const [projectKeyword, setProjectKeyword] = useState('');

  const categories = [
    { id: "1", name: "Công việc" },
    { id: "2", name: "File công việc" },
    { id: "3", name: "Hồ sơ" },
    { id: "4", name: "Hợp đồng" },
    { id: "5", name: "Nhân sự" },
    { id: "6", name: "Dự án" },
    // { id: "7", name: "Workshop" },
    // { id: "8", name: "Chấm công" }
  ];

  const {
    data: listUsersSystem,
    hasNextPage: hasNextPageUsersSystem,
    fetchNextPage: fetchNextPageUsersSystem
  } = useUserSystem({
    keyword: userKeyword
  }, true);

  const {
    listProjectsUserIsMember,
    fetchNextPageProjectsUserIsMember,
    hasNextPageProjectsUserIsMember,
  } = useProjectCustom({
    paramsProjectsUserIsMember: { keyword: projectKeyword },
    isFetchProjectsUserIsMember: true
  });

  const [show, setShow] = useState<"left" | "right" | "both">("right");
  const [activeCategory, setActiveCategory] = useState<string | number>(categories[0].id);

  const handleClickScrollRight = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const scrollElement = e.currentTarget.parentNode as HTMLElement;
      scrollElement.scrollTo({ left: scrollElement.scrollLeft + 320, behavior: "smooth" });
      if (scrollElement.scrollLeft + scrollElement.clientWidth + 320 >= scrollElement.scrollWidth)
        return setShow("left");
      setShow("both");
    },
    []
  );

  const handleClickScrollLeft = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const scrollElement = e.currentTarget.parentNode as HTMLElement;
      scrollElement.scrollTo({ left: scrollElement.scrollLeft - 320, behavior: "smooth" });
      if (scrollElement.scrollLeft - 320 <= 0) return setShow("right");
      setShow("both");
    },
    []
  );

  const handleScrollUser = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if(bottom && hasNextPageUsersSystem) {
      fetchNextPageUsersSystem();
    }
  }

  const handleScrollProject = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if(bottom && hasNextPageProjectsUserIsMember) {
      fetchNextPageProjectsUserIsMember();
    }
  }

  const handleSearchUser = debounce((keyword: string | ChangeEvent<HTMLInputElement>) => {
    typeof keyword === 'string' && setUserKeyword(keyword);
  }, 700)

  const handleSearchProject = debounce((keyword: string | ChangeEvent<HTMLInputElement>) => {
    typeof keyword === 'string' && setProjectKeyword(keyword);
  }, 700)

  return (
    <div className="t-main-search-wrapper rounded pb-4">
      <header className="flex pt-3 pl-6 pr-8 items-center">
        <span className="mr-5 font-bold text-3x-large" title="Trợ lý ảo của Trixgo">
          <span className="text-cbs-primary">V</span>
          <span className="text-cbs-schedule-expired">i</span>
          <span className="text-cbs-schedule-nextweek">a</span>
          <span className="text-cbs-schedule-after-7days">s</span>
        </span>
        <div className="flex-grow overflow-hidden relative">
          <div className="flex w-full overflow-auto whitespace-nowrap space-x-2 scrollbar-hide">
            {categories.map((cat, index) => {
              return (
                <span
                  key={cat.id}
                  tabIndex={index}
                  className={classNames(
                    "cursor-pointer px-4 py-2.5 transition-colors hover:bg-cbs-primary hover:text-white  hover:border-cbs-primary border-0.5 rounded-full select-none",
                    activeCategory === cat.id
                      ? "bg-cbs-primary border-cbs-primary text-white"
                      : "text-cbs-subtext border-cbs-border"
                  )}
                  onClick={(e) => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </span>
              );
            })}
            {show !== "right" && (
              <button
                onClick={handleClickScrollLeft}
                className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 border absolute left-0"
              >
                <img
                  alt="Next"
                  src={iconChevronRight}
                  className="w-4 filter-primary-gray rotate-180"
                />
              </button>
            )}
            {show !== "left" && (
              <button
                onClick={handleClickScrollRight}
                className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 border absolute right-0"
              >
                <img alt="Next" src={iconChevronRight} className="w-4 filter-primary-gray" />
              </button>
            )}
          </div>
        </div>
      </header>
      {/* Search form */}
      {["1", "7", "8", "10", "11", "12"].includes(String(activeCategory)) && <Work />}
      {activeCategory === "2" &&
        <File
          users={listUsersSystem}
          projects={listProjectsUserIsMember}
          onScrollUser={handleScrollUser}
          onScrollProject={handleScrollProject}
          onSearchUser={handleSearchUser}
          onSearchProject={handleSearchProject}
        />
      }
      {activeCategory === "3" &&
        <Profile
        />
      }
      {activeCategory === "4" && <Contract />}
      {activeCategory === "5" && <Member />}
      {activeCategory === "6" && <Project />}
    </div>
  );
};
