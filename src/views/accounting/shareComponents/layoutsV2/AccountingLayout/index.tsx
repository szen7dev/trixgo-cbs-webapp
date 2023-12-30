import { FC, ReactNode, useState } from "react";
import cn from "classnames";

import AccountingLeftSideBar from "./components/AccountingLeftSideBar";
import { LeftNavigate, MainHeaderV2 } from "shareComponents/common";
import menuIcon from "assets/images/icon-mobile-menu-black.png";
import { HomeHeaderContent } from "shareComponents/layouts/HomeLayout/components";

type Props = {
  children: ReactNode
}

export const AccountingLayout: FC<Props> = ({ children }) => {
  const [isHeaderCollapse, setIsHeaderCollapse] = useState(false);
  const [isLeftMenuCollapse, setIsLeftMenuCollapse] = useState(false);
  const [isRightSideBarCollapse, setIsRightSideBarCollapse] = useState(false);

  const handleMenuEvent = () => {
    setIsLeftMenuCollapse(!isLeftMenuCollapse);
  };

  return (
    <section
      className={cn("home-layout relative bg-primary-light", {
        "collapse-left": isLeftMenuCollapse,
        "active-right": isRightSideBarCollapse,
        "collapse-header": isHeaderCollapse,
      })}
    >

      <button title="Toggle left sidebar" onClick={handleMenuEvent} className="home-left-sidebar-collapse-btn transition-all duration-500 ease-out fixed top-3 left-2 z-40 p-2">
        <img className="w-4" src={menuIcon} alt="Menu" />
      </button>

      <div className={"flex"}>
        <LeftNavigate handleMenuEvent={handleMenuEvent} />
        <section className={"main-content-wrapper flex-1"}>

          <MainHeaderV2 headerTitle={"Kế toán"}>
            <HomeHeaderContent />
          </MainHeaderV2>

          <AccountingLeftSideBar />

          <main className="home-main-content home-main-content-v2 transition-all duration-500 ease-out overflow-auto relative">
            {children}
          </main>

        </section>
      </div>

    </section>
  )
}