import { FC, ReactNode, useState } from "react";
import cn from "classnames";

import HomeNavigation from "components/common/HomeNavigation";
import HomeRightSideBar from "components/common/HomeRightSideBar";
import MainHeader from "components/common/main-header";

import chevronIcon from "assets/images/icon-chevron-right.png";

type Props = {
  children: ReactNode;
};

const HomeLayout: FC<Props> = ({ children }) => {
  const [isRightSideBarCollapse, setIsRightSideBarCollapse] = useState(false);
  const handleRightSideBarEvent = () => {
    setIsRightSideBarCollapse(!isRightSideBarCollapse);
  };
  return (
    <section
      className={cn("home-layout relative bg-primary-light", {
        "active-right": isRightSideBarCollapse,
      })}
    >

      {/*  Main header */}
      <MainHeader />

      {/* Left navigation */}
      <HomeNavigation />

      {/* Content area */}
      <main className="home-main-content transition-all duration-500 ease-out overflow-auto">
        {children}
      </main>

      {/* Right side bar */}
      <HomeRightSideBar />

      {/* Collapse right side bar button */}
      <button
        onClick={handleRightSideBarEvent}
        className="tm-right-sidebar-toggle-btn fixed bottom-2 right-2 z-10 w-10 h-10 pl-3 pr-3 rounded-full text-center transition-all duration-500 ease-out"
      >
        <img
          className="w-5 inline-block transition-all duration-500 ease-out"
          src={chevronIcon}
          alt="Right side bar toggle button"
        />
      </button>
    </section>
  );
};

export default HomeLayout;
