/*=====1.LIBRARY=====*/
import { FC, ReactNode, useState } from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import { LeftMenu, MainHeaderV2, LeftNavigate } from "../../common";
import { HomeHeaderContent, HomeLeftMenuContent } from "./components";
// import MiniChatbox from "shareComponents/common/MiniChat/components/MiniChatBox";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/

type Props = {
  children: ReactNode;
};

export const HomeLayout: FC<Props> = ({ children }) => {
  const { t } = useTranslation();
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
      {/* Collapse menu button */}

      <div className={"flex"}>
        <LeftNavigate handleMenuEvent={handleMenuEvent} />
        <section className={"main-content-wrapper flex-1 w-header"}>
          {/*  Main header */}
          <MainHeaderV2 headerTitle={t("menu:subject")}>
            <HomeHeaderContent />
          </MainHeaderV2>
          <div className="flex w-full">
            {/* Left navigation */}
            <LeftMenu>
              <HomeLeftMenuContent />
            </LeftMenu>

            {/* Content area */}
            <main className="main-route-content transition-all duration-500 ease-out overflow-auto relative h-left-over-content max-h-left-over-content min-h-left-over-content">
              {children}
            </main>
          </div>
        </section>
      </div>
    </section>
  );
};
