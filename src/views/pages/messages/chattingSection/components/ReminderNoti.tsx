import React, {FC, ReactNode, useEffect, useRef} from "react";
import Clock from "assets/images/icons8-time-48.svg";
type Props = {
    content: string;
}
const ReminderNoti:FC<Props> = ({content}) => {
    const notificationRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if(notificationRef.current) {
            notificationRef.current.innerHTML = content
        }
    },[content]);

    return (
        <div className={"reminder-content flex items-center justify-center mb-2"}>
            <div className={"rounded-full text-xs bg-white text-gray-500 px-5 py-1 mb-2 px-[33px] flex items-center"}>
                <img src={Clock} alt={"-----"} className={"w-[18px] h-[18px] mr-2"}/>
                <span ref={notificationRef}>
                </span>
            </div>
        </div>
    )
}

export default ReminderNoti;
