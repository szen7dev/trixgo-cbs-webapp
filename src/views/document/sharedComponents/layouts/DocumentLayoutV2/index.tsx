/*=====1.LIBRARY=====*/
import { FC, ReactNode, useState } from "react";
import cn from "classnames";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import {LeftMenu, LeftNavigate, MainHeaderV2} from "shareComponents/common";
import DocumentHeaderContent from "./components/DocumentHeaderContent";
import DocumentLeftMenuContent from "./components/DocumentLeftMenuContent";
// import MiniChatbox from "shareComponents/common/MiniChat/components/MiniChatBox";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/

type Props = {
    children: ReactNode;
};

const DocumentLayoutV2: FC<Props> = ({ children }) => {
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

            <div className={"flex"}>
                <LeftNavigate handleMenuEvent={handleMenuEvent}/>
                <section className={"main-content-wrapper flex-1"}>
                    {/*  Main header */}
                    <MainHeaderV2
                        headerTitle={"Hồ sơ"}
                    >
                        <DocumentHeaderContent/>
                    </MainHeaderV2>

                    {/* Left navigation */}
                    <LeftMenu>
                        <DocumentLeftMenuContent/>
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

export default DocumentLayoutV2;