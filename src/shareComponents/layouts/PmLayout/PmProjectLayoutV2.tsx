/*=====1.LIBRARY=====*/
import { FC, ReactNode, useState } from "react";
import cn from "classnames";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import {LeftMenu, MainHeaderV2, LeftNavigate} from "../../common";
import {PmTabHeaderContent, PmLeftMenuContent, PmProjectLeftMenuContent} from "./components";
import {MainHeaderPm} from "./components/shared/MainHeaderPm";
import { PmProjectTabLeftSideBar } from "./components/PmProjectTabLeftSideBar";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/

type Props = {
  children: ReactNode;
  headerSearch?: ReactNode;
};

export const PmProjectLayoutV2: FC<Props> = ({ children, headerSearch }) => {
  const [isLeftMenuCollapse, setIsLeftMenuCollapse] = useState(false);

  const handleMenuEvent = () => {
    setIsLeftMenuCollapse(!isLeftMenuCollapse);
  };

  return (
    <section
      className={cn("home-layout relative bg-primary-light", {
        "collapse-left": isLeftMenuCollapse,
      })}
    >
      {/* Collapse menu button */}

      <div className={"flex"}>
        <LeftNavigate handleMenuEvent={handleMenuEvent}/>
        <section className={"main-content-wrapper flex-1"}>
          {/*  Main header */}
          <MainHeaderPm>
            {/* {headerSearch} */}
            <PmTabHeaderContent/>
          </MainHeaderPm>
          {/* Left navigation */}
          <PmProjectTabLeftSideBar/>

          {/* Content area */}
          <main className="main-route-content transition-all duration-500 ease-out overflow-auto relative h-left-over-content max-h-left-over-content min-h-left-over-content">
            {children}
          </main>
        </section>
      </div>
    </section>
  );
};