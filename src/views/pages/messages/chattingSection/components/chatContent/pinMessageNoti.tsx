import React, {FC, ReactNode, useEffect, useRef} from "react";
import Pin from "assets/images/icons8-pin-48.svg";
type Props = {
    content: string;
}
const PinMessageNoti:FC<Props> = ({content}) => {
    const notificationRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if(notificationRef.current) {
            notificationRef.current.innerHTML = content
        }
    },[content]);

    return (
        <div className={"pin-noti-content flex items-center justify-center mb-2"}>
            <div className={"rounded-full text-xs bg-white text-gray-500 px-5 py-1 mb-2 px-[33px] flex items-center"}>
                <img src={Pin} alt={"-----"} className={"w-[18px] h-[18px] mr-2"}/>
                <span ref={notificationRef}>
                </span>
            </div>
        </div>
    )
}

export default PinMessageNoti;
