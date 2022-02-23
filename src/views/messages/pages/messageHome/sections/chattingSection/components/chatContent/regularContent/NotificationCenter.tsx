import React, {FC, ReactNode, useEffect, useRef} from "react";
type Props = {
    content: string;
}
export const NotificationCenter:FC<Props> = ({content}) => {
    const notificationRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(notificationRef.current) {
            notificationRef.current.innerHTML = content
        }
    },[content]);

    return (
        <div className={"notifi-center flex items-center justify-center mb-2"}>
            <div className={"rounded-full text-xs bg-gray-200 text-gray-500 px-5 py-1"} ref={notificationRef}></div>
        </div>
    )
}
