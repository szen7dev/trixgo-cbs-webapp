/*=====1.LIBRARY=====*/
import { FC, ReactNode, useState } from "react";
import cn from "classnames";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import {LeftMenu, MainHeaderV2, LeftNavigate} from "../../common";
import {CmcsLeftMenuContent} from "./components/CmcsLeftMenuContent";
import {CmcsHeaderSearchContent} from "./components/CmcsHeaderSearchContent";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/

type Props = {
    children: ReactNode;
};

export const CmcsLayoutV2: FC<Props> = ({ children }) => {
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
                    <MainHeaderV2
                        headerTitle={"Hợp đồng"}
                    >
                        <CmcsHeaderSearchContent/>
                    </MainHeaderV2>

                    {/* Left navigation */}
                    <LeftMenu>
                        <CmcsLeftMenuContent/>
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