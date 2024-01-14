/*=====1.LIBRARY=====*/
import { FC, ReactNode, useState } from "react";
import cn from "classnames";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import menuIcon from "assets/images/icon-mobile-menu-black.png";

/*=====4.PAGES/COMPONENTS=====*/
import { LeftNavigate, MainHeaderV2 } from "shareComponents/common";
import { PersonalLeftSideBar } from './components';

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/

type Props = {
  children: ReactNode;
};

export const PersonalLayoutV2: FC<Props> = ({ children }) => {
  const [isHeaderCollapse, setIsHeaderCollapse] = useState(false);
  const [isLeftMenuCollapse, setIsLeftMenuCollapse] = useState(false);
  const [isRightSideBarCollapse, setIsRightSideBarCollapse] = useState(false);

  const handleHeaderEvent = () => {
    setIsHeaderCollapse(!isHeaderCollapse);
  };
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
      {/* Collapse menu button */}
      <button title="Toggle left sidebar" onClick={handleMenuEvent} className="home-left-sidebar-collapse-btn transition-all duration-500 ease-out fixed top-3 left-2 z-40 p-2">
        <img className="w-4" src={menuIcon} alt="Menu" />
      </button>
      <div className={"flex"}>
        <LeftNavigate handleMenuEvent={handleMenuEvent} />
        <section className={"main-content-wrapper flex-1"}>
          {/*  Main header */}
          <MainHeaderV2 headerTitle={"Tài khoản"}>
          </MainHeaderV2>

          <PersonalLeftSideBar />

          {/* Content area */}
          <main className="home-main-content home-main-content-v2 transition-all duration-500 ease-out overflow-auto relative">
            {children}
          </main>

        </section>
      </div>
    </section>
  );
};