/*=====1.LIBRARY=====*/
import { FC, ReactNode, useState } from "react";
import cn from "classnames";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import {LeftMenu, MainHeaderV2, LeftNavigate} from "../../common";
// import MiniChatbox from "shareComponents/common/MiniChat/components/MiniChatBox";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/

type Props = {
  children: ReactNode;
};

export const HomeLayout: FC<Props> = ({ children }) => {
  const [isHeaderCollapse, setIsHeaderCollapse] = useState(false);
  const [isLeftMenuCollapse, setIsLeftMenuCollapse] = useState(false);
  const [isRightSideBarCollapse, setIsRightSideBarCollapse] = useState(false);
  const [isChatboxVisible, setIsChatboxVisible] = useState(false);
  const [isNewChatboxVisible, setIsNewChatboxVisible] = useState(false);

  const handleHeaderEvent = () => {
    setIsHeaderCollapse(!isHeaderCollapse);
  };
  const handleMenuEvent = () => {
    setIsLeftMenuCollapse(!isLeftMenuCollapse);
  };
  const handleRightSideBarEvent = () => {
    setIsRightSideBarCollapse(!isRightSideBarCollapse);
  };
  const closeMiniChatbox = () => {
    setIsChatboxVisible(false);
  };
  const openMiniChatbox = () => {
    setIsChatboxVisible(true);
  };
  const handleOpenNewChatbox = () => {
    setIsNewChatboxVisible(true);
  };
  const handleCloseNewChatbox = () => {
    setIsNewChatboxVisible(false);
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

      <div className={"flex"}>
        <LeftNavigate handleMenuEvent={handleMenuEvent}/>
        <section className={"main-content-wrapper flex-1"}>
          {/*  Main header */}
          <MainHeaderV2
            headerTitle={"Chủ đề"}
          >
          </MainHeaderV2>

          {/* Left navigation */}
          <LeftMenu />

          {/* Content area */}
          <main className="main-route-content transition-all duration-500 ease-out overflow-auto relative">
            {children}
          </main>
        </section>
      </div>
    </section>
  );
};