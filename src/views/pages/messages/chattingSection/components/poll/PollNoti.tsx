import React, {FC, ReactNode, useEffect, useRef} from "react";
import PollIcon from "assets/images/icons-poll.svg";

type Props = {
    content: string;
}
const PollNoti:FC<Props> = ({content}) => {
    const notificationRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if(notificationRef.current) {
            notificationRef.current.innerHTML = content
        }
    },[content]);

    return (
        <div className={"poll-content flex items-center justify-center mb-2"}>
            <div className={"rounded-full text-xs bg-white text-gray-500 px-5 py-1 mb-2 px-[33px] flex items-center"}>
                <img src={PollIcon} alt={"-----"} className={"w-[14px] h-[16px] mr-2"}/>
                <span ref={notificationRef}>
                </span>
            </div>
        </div>
    )
}

export default PollNoti;
