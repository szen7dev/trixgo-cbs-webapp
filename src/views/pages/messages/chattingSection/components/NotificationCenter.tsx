import React, {FC, ReactNode} from "react";
type Props = {
    content: ReactNode;
}
const NotificationCenter:FC<Props> = ({content}) => {
    return (
        <div className={"notifi-center flex items-center justify-center mb-2"}>
            <div className={"rounded-full text-xs bg-gray-500 text-white px-5 py-1"}>{content}</div>
        </div>
    )
}

export default NotificationCenter;
