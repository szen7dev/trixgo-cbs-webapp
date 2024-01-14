import { FC, ReactNode, useState } from "react";
import cn from "classnames";
import { CmcsLeftSideBar } from "./components";
import { LeftNavigate, MainHeaderV2 } from "shareComponents/common";
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
          <MainHeaderV2 headerTitle={"Tài chính"}>
            <HomeHeaderContent />
          </MainHeaderV2>

          <CmcsLeftSideBar />

          <main 
          className="home-main-content home-main-content-v2 transition-all duration-500 ease-out overflow-auto relative h-left-over-content max-h-left-over-content min-h-left-over-content"
          >
            {children}
          </main>

        </section>
      </div>
    </section>
  )
}