import React, {FC, ReactNode, useEffect, useRef} from "react";
import Members from "assets/images/icons8-member-48.svg";
type Props = {
    content: string;
    isMini?: boolean;
    isLeave?: boolean;
}
export const AddUsersNoti:FC<Props> = ({content, isMini,isLeave}) => {
    const notificationRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if(notificationRef.current) {
            notificationRef.current.innerHTML = content
        }
    },[content]);

    return (
        <div className={"add-user-content flex items-center justify-center mb-2"}>
            <div className={"rounded-full text-xs text-gray-500 px-5 py-1 mb-2 px-[33px] flex items-center " + (isMini?"bg-gray-100":"bg-white")}>
                <img src={Members} alt={"-----"} style={isLeave?{filter: "hue-rotate(180deg)"}:{}} className={"w-[18px] h-[18px] mr-2"}/>
                <span ref={notificationRef}>
                </span>
            </div>
        </div>
    )
}
