/*=====1.LIBRARY=====*/
import { FC } from "react";

export const LeftMenuMessage: FC = ({children}) => {

    return (
        <div className="t-leftsidebar-navigation-v2 bg-white fixed left-[68px] top-14 bottom-0 transition-all duration-500 ease-out z-10">
            {children}
        </div>
    );
};