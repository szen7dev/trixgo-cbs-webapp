/*=====1.LIBRARY=====*/
import cn from "classnames";
import { FC, ReactNode, useState } from "react";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
// import sendAndReceiveIcon from "assets/images/icons-send-and-receive.svg";
import fileIcon from "assets/images/icons-file.svg";
import homeImage from "assets/menu/project/icons-project-home.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { LeftMenu, LeftNavigate, MainHeaderV2 } from "shareComponents/common";
import { HomeHeaderContent } from "shareComponents/layouts/HomeLayout/components";
import { prefix } from "views/bidding/configs";
import { BiddingLeftSideBarContent } from "./components/BiddingLeftSideBarContent";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/

type Props = {
  children: ReactNode;
  leftTabs?: {
    label: string;
    icon: string;
    count: number;
    route: string;
  }[];
};

const listTab: {
  label: string;
  icon: string;
  count: number;
  route: string;
}[] = [
  {
    label: "Trang chủ",
    icon: homeImage,
    count: 0,
    route: prefix + "/home",
  },
  // {
  //   label: "Hồ sơ dự thầu",
  //   icon: fileIcon,
  //   count: 0,
  //   route: prefix + "/bids",
  // },
  // {
  //   label: "Hồ sơ mời thầu",
  //   icon: fileIcon,
  //   count: 0,
  //   route: prefix + "/invitation",
  // },
];

const BiddingLayout: FC<Props> = ({ children }) => {
  const [isLeftMenuCollapse, setIsLeftMenuCollapse] = useState(false);

  const handleMenuEvent = () => {
    setIsLeftMenuCollapse(!isLeftMenuCollapse);
  };

  return (
    <section
      className={cn("home-layout relative bg-white", {
        "collapse-left": isLeftMenuCollapse,
      })}
    >
      {/* Collapse menu button */}

      <div className={"flex"}>
        <LeftNavigate handleMenuEvent={handleMenuEvent} />
        <section className={"main-content-wrapper flex-1"}>
          {/*  Main header */}
          <MainHeaderV2 headerTitle={"Thầu"}>
            <HomeHeaderContent />
          </MainHeaderV2>

          {/* Left navigation */}
          <LeftMenu>
            <BiddingLeftSideBarContent tabs={listTab} />
          </LeftMenu>

          {/* Content area */}
          <main className="main-route-content transition-all duration-500 ease-out overflow-auto relative h-left-over-content max-h-left-over-content min-h-left-over-content">
            {children}
          </main>
        </section>
      </div>
    </section>
  );
};

export default BiddingLayout;
