import React, {FC, useEffect, useRef} from "react";

type Props = {
    message: any;
    className?: string;
}
export const DeletedPinned:FC<Props> = ({message, className}) => {
    return (
        <div className={"flex-1 max-w-[185px] ml-[5px] flex flex-col justify-start"}>
            <div className={"text-primary text-left"}>Tin đã ghim</div>
            <div className={"truncate text-left text-gray-400"}>
                Tin nhắn đã xoá
            </div>
        </div>
    )
}
