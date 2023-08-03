/*=====1.LIBRARY=====*/
import { FC, ReactNode, useState } from "react";
import cn from "classnames";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import menuIcon from "assets/images/icon-mobile-menu-black.png";
import chevronRightIcon from "assets/images/icon-chevron-right.png";
import chevronUpIcon from "assets/images/icon-chevron-up.png";
import iconChat from "assets/images/icons8-chat-96.png";

/*=====4.PAGES/COMPONENTS=====*/
import { MainHeader } from "shareComponents/common";
import { BudgetLeftSideBar } from './components';
import { HomeRightSideBar } from "shareComponents/layouts";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/

type Props = {
  children: ReactNode;
};

export const BudgetLayout: FC<Props> = ({ children }) => {
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
      <button title="Toggle left sidebar" onClick={handleMenuEvent} className="home-left-sidebar-collapse-btn transition-all duration-500 ease-out fixed top-3 left-2 z-40 p-2">
        <img className="w-4" src={menuIcon} alt="Menu" />
      </button>

      {/*  Main header */}
      <MainHeader />

      {/* Left navigation */}
      <BudgetLeftSideBar />

      {/* Content area */}
      <main className="home-main-content transition-all duration-500 ease-out overflow-auto relative">
        {children}
      </main>

      {/* Collapse header button */}
      <button
        title="Toggle header"
        onClick={handleHeaderEvent}
        className="tm-header-toggle-btn fixed top-16 right-3 z-50 w-8 h-8 pl-2 pr-2 rounded-md bg-secondary-light hover:bg-accent-light text-center transition-all duration-500 ease-out"
      >
        <img
          className="w-3 inline-block transition-all duration-500 ease-out"
          src={chevronUpIcon}
          alt="Header toggle button"
        />
      </button>

      {/* Right side bar */}
      <HomeRightSideBar />

      {/* Collapse right side bar button */}
      <button
        title="Toggle right sidebar"
        onClick={handleRightSideBarEvent}
        className="tm-right-sidebar-toggle-btn fixed bottom-2 right-2 z-10 w-10 h-10 pl-3 pr-3 rounded-full bg-secondary-light hover:bg-accent-light text-center transition-all duration-500 ease-out"
      >
        <img
          className="w-5 inline-block transition-all duration-500 ease-out"
          src={chevronRightIcon}
          alt="Right sidebar toggle button"
        />
      </button>
    </section>
  );
};