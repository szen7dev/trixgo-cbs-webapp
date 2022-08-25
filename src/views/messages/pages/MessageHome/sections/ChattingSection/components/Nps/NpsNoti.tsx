import React, {FC, ReactNode, useEffect, useRef} from "react";
import NpsIcon from "assets/images/icons-poll.svg";

type Props = {
    content: string;
    isMini?: boolean
}
export const NpsNoti:FC<Props> = ({content, isMini}) => {
    const notificationRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if(notificationRef.current) {
            notificationRef.current.innerHTML = content
        }
    },[content]);

    return (
        <div className={"Poll-content flex items-center justify-center mb-2"}>
            <div className={"rounded-full text-xs text-gray-500 px-5 py-1 mb-2 px-[33px] flex items-center " + (isMini?"bg-gray-100":"bg-cbs-item-message-other")}>
                <img src={NpsIcon} alt={"-----"} className={"w-[14px] h-[16px] mr-2"}/>
                <span ref={notificationRef}>
                </span>
            </div>
        </div>
    )
}
