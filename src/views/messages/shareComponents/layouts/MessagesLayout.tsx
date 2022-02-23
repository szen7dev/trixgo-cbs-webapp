import { FC, ReactNode, useState } from "react";
import cn from "classnames";

// import FinLeftSideBar from "components/common/FinLeftSideBar";
import { MainHeader } from "shareComponents/common";
import menuIcon from "assets/images/icon-mobile-menu-black.png";
import {LeftSideBar} from "shareComponents/layouts/HomeLayout/components";

type Props = {
  children: ReactNode;
};

export const MessagesLayout: FC<Props> = ({ children }) => {
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
      <LeftSideBar />

      {/* Content area */}
      <main className="messages-main-content content-avoid-header transition-all duration-500 ease-out overflow-auto relative mt-[2px]">
        {children}
      </main>
    </section>
  );
};
