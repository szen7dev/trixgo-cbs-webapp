import { FC, ReactNode, useState } from "react";
import cn from "classnames";

import HomeRightSideBar from "components/common/HomeRightSideBar";
import KanbanBoardHeader from "components/common/kanban-board-header";

import chevronRightIcon from "assets/images/icon-chevron-right.png";
import chevronUpIcon from "assets/images/icon-chevron-up.png";

type Props = {
  children: ReactNode;
};

const KanbanBoardLayout: FC<Props> = ({ children }) => {
  const [isHeaderCollapse, setIsHeaderCollapse] = useState(false);
  const [isRightSideBarCollapse, setIsRightSideBarCollapse] = useState(false);

  const handleHeaderEvent = () => {
    setIsHeaderCollapse(!isHeaderCollapse);
  };
  const handleRightSideBarEvent = () => {
    setIsRightSideBarCollapse(!isRightSideBarCollapse);
  };
  return (
    <section
      className={cn("home-layout kanban-board-layout relative bg-primary-light", {
        "active-right": isRightSideBarCollapse,
        "collapse-header": isHeaderCollapse,
      })}
    >

      {/*  Main header */}
      <KanbanBoardHeader />

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

export default KanbanBoardLayout;
