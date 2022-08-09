/*=====1.LIBRARY=====*/
import { FC } from "react";

export const LeftMenu: FC = ({children}) => {

    return (
        <div className="t-leftsidebar-navigation fixed left-[75px] top-14 bottom-0 transition-all duration-500 ease-out z-10">
            {children}
        </div>
    );
};