import React, {FC, ReactNode, useEffect, useRef} from "react";
import Clock from "assets/images/icons8-time-48.svg";
type Props = {
    content: string;
    isMini?: boolean;
}
export const ReminderNoti:FC<Props> = ({content,isMini}) => {
    const notificationRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if(notificationRef.current) {
            notificationRef.current.innerHTML = content
        }
    },[content]);

    return (
        <div className={"Reminder-content flex items-center justify-center mb-2"}>
            <div className={"rounded-full text-xs text-gray-500 px-5 py-1 mb-2 px-[33px] flex items-center " + (isMini?"bg-gray-100":"bg-white")}>
                <img src={Clock} alt={"-----"} className={"w-[18px] h-[18px] mr-2"}/>
                <span ref={notificationRef}>
                </span>
            </div>
        </div>
    )
}
