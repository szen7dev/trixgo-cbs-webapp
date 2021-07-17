import { FC, ReactNode, useState } from "react";
import cn from "classnames";

import TaskManagementNavigation from "components/common/TaskManagementNavigation";
import TaskManagementRightSideBar from "components/common/TaskManagementRightSideBar";
import MainHeader from "components/common/main-header";

import menuIcon from "assets/images/icon-mobile-menu-black.png";
import chevronIcon from "assets/images/RightSideBarIcon/icon-chevron-left.png";

type Props = {
  children: ReactNode;
};

const TaskManagementLayout: FC<Props> = ({ children }) => {
  const [isLeftMenuCollapse, setIsLeftMenuCollapse] = useState(false);
  const [isRightSideBarCollapse, setIsRightSideBarCollapse] = useState(false);

  const handleMenuEvent = () => {
    setIsLeftMenuCollapse(!isLeftMenuCollapse);
  };
  const handleRightSideBarEvent = () => {
    setIsRightSideBarCollapse(!isRightSideBarCollapse);
  };
  return (
    <section
      className={cn("task-management-layout relative bg-white min-h-screen", {
        active: isLeftMenuCollapse,
        "active-right": isRightSideBarCollapse,
      })}
    >
      {/* Collapse menu button */}
      <button onClick={handleMenuEvent} className="fixed top-4 left-4 z-40">
        <img className="w-5" src={menuIcon} alt="Menu" />
      </button>

      {/*  Main header */}
      <MainHeader />

      {/* Left navigation */}
      <TaskManagementNavigation />

      {/* Content area */}
      <main className="task-management-main-content transition-all duration-500 ease-out pl-56 pr-12">
        {children}
      </main>

      {/* Right side bar */}
      <TaskManagementRightSideBar />

      {/* Collapse right side bar button */}
      <button
        onClick={handleRightSideBarEvent}
        className="tm-right-sidebar-toggle-btn fixed bottom-4 right-1 z-10 w-10 h-10 pl-2 pr-2 rounded-full text-center transition-all duration-500 ease-out"
      >
        <img
          className="w-4 inline-block transition-all duration-500 ease-out"
          src={chevronIcon}
          alt="Right side bar toggle button"
        />
      </button>
    </section>
  );
};

export default TaskManagementLayout;
