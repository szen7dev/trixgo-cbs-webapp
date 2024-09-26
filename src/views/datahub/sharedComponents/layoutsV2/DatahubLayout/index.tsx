import { FC, ReactNode, useState } from "react";
import cn from "classnames";
import "react-loading-skeleton/dist/skeleton.css";

import { HomeRightSideBar } from "shareComponents/layouts";
import { LeftNavigate, MainHeader, MainHeaderV2 } from "shareComponents/common";
import menuIcon from "assets/images/icon-mobile-menu-black.png";

import chevronRightIcon from "assets/images/icon-chevron-right.png";
import chevronUpIcon from "assets/images/icon-chevron-up.png";
import DatahubLeftSideBar from "./components/DatahubLeftSideBar";
import { HomeHeaderContent } from "shareComponents/layouts/HomeLayout/components";

type Props = {
  children: ReactNode;
};

const DatahubLayoutV2: FC<Props> = ({ children }) => {
  const [isHeaderCollapse, setIsHeaderCollapse] = useState(false);
  const [isLeftMenuCollapse, setIsLeftMenuCollapse] = useState(false);
  const [isRightSideBarCollapse, setIsRightSideBarCollapse] = useState(false);

  const handleHeaderEvent = () => {
    setIsHeaderCollapse(!isHeaderCollapse);
  };
  const handleMenuEvent = () => {
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
      {/* Collapse menu button */}
      <button
        title="Toggle left sidebar"
        onClick={handleMenuEvent}
        className="home-left-sidebar-collapse-btn transition-all duration-500 ease-out fixed top-3 left-2 z-40 p-2"
      >
        <img className="w-4" src={menuIcon} alt="Menu" />
      </button>

      <div className={"flex"}>
        <LeftNavigate handleMenuEvent={handleMenuEvent} />
        <section className={"main-content-wrapper flex-1 w-header"}>
          {/*  Main header */}
          <MainHeaderV2 headerTitle={"Datahub"}>
            <HomeHeaderContent />
          </MainHeaderV2>

          {/* Left navigation */}
          <DatahubLeftSideBar />

          {/* Content area */}
          <main className="home-main-content home-main-content-v2 transition-all duration-500 ease-out overflow-auto relative">
            {children}
          </main>
        </section>
      </div>
    </section>
  );
};

export default DatahubLayoutV2;
