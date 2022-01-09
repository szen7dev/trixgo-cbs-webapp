import { FC, ReactNode, useState } from "react";
import cn from "classnames";

import FinLeftSideBar from "components/common/FinLeftSideBar";
import HomeRightSideBar from "components/common/HomeRightSideBar";
import MainHeader from "components/common/main-header";
import menuIcon from "assets/images/icon-mobile-menu-black.png";

import chevronRightIcon from "assets/images/icon-chevron-right.png";
import chevronUpIcon from "assets/images/icon-chevron-up.png";

type Props = {
  children: ReactNode;
};

const MessagesLayout: FC<Props> = ({ children }) => {
  const [isLeftMenuCollapse, setIsLeftMenuCollapse] = useState(true);

  const handleMenuEvent = () => {
    setIsLeftMenuCollapse(!isLeftMenuCollapse);
  };
  return (
    <section
      className={cn("messages-layout relative bg-primary-light", {
        "collapse-left": isLeftMenuCollapse,
      })}
    >
      {/* Collapse menu button */}
      <button title="Toggle left sidebar" onClick={handleMenuEvent} className="home-left-sidebar-collapse-btn transition-all duration-500 ease-out fixed top-3 left-2 z-40 p-2">
        <img className="w-4" src={menuIcon} alt="Menu" />
      </button>

      {/*  Main header */}
      <MainHeader />

      {/* Left navigation */}
      <FinLeftSideBar />

      {/* Content area */}
      <main className="messages-main-content content-avoid-header transition-all duration-500 ease-out overflow-auto relative">
        {children}
      </main>
    </section>
  );
};

export default MessagesLayout;
