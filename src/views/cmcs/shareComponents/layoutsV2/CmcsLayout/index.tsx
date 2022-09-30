import { FC, ReactNode, useState } from "react";
import cn from "classnames";

// import HomeNavigation from "components/common/HomeNavigation";
import { CmcsLeftSideBar } from "./components";
import { HomeRightSideBar } from "shareComponents/layouts";
import { LeftNavigate, MainHeader, MainHeaderV2 } from "shareComponents/common";
import menuIcon from "assets/images/icon-mobile-menu-black.png";

import chevronRightIcon from "assets/images/icon-chevron-right.png";
import chevronUpIcon from "assets/images/icon-chevron-up.png";
import { HomeHeaderContent } from "shareComponents/layouts/HomeLayout/components";

type Props = {
  children: ReactNode;
};

export const CmcsLayout: FC<Props> = ({ children }) => {
  const [isHeaderCollapse, setIsHeaderCollapse] = useState(false);
  const [isLeftMenuCollapse, setIsLeftMenuCollapse] = useState(false);
  const [isRightSideBarCollapse, setIsRightSideBarCollapse] = useState(false);

  const handleHeaderEvent = () => {
    setIsHeaderCollapse(!isHeaderCollapse);
  };
  const handleMenuEventNav = () => {
    setIsLeftMenuCollapse(!isLeftMenuCollapse);
  };
  const handleRightSideBarEvent = () => {
    setIsRightSideBarCollapse(!isRightSideBarCollapse);
  };
  return (
    <section
      className={cn("home-layout relative bg-primary-light", {
        "collapse-left": isLeftMenuCollapse,
        "active-right": isRightSideBarCollapse,
        "collapse-header": isHeaderCollapse,
      })}
    >
      <div
        className={"flex"}
      >
        <LeftNavigate handleMenuEvent={handleMenuEventNav} />
        <section
          className={"main-content-wrapper flex-1"}
        >
          {/*  Main header */}
          <MainHeaderV2 headerTitle={"Tài chính"}>
            <HomeHeaderContent />
          </MainHeaderV2>

          {/* Left navigation */}
          <CmcsLeftSideBar />

          {/* Content area */}
          <main 
          // className="home-main-content home-main-content-v2  transition-all duration-500 ease-out overflow-auto relative"
          className="home-main-content home-main-content-v2 transition-all duration-500 ease-out overflow-auto relative h-left-over-content max-h-left-over-content min-h-left-over-content"
          >
            {children}
          </main>

        </section>
      </div>
    </section>
  );
};