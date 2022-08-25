import React, {FC} from "react";

type Props = {
    message: any;
    className?: string;
    isMyMessage?: boolean
}
export const ImageReply:FC<Props> = ({message, className, isMyMessage}) => {
    return (
        <div className={"reply-content border-l-2 border-primary pl-[7px] flex " + (className??"")}>
            <div className={"flex items-center justify-center mr-1"}>
                <img className={"w-[32px] h-[32px] min-w-[32px] min-h-[32px] rounded-md overflow-hidden object-cover"} src={`${process.env.REACT_APP_URL_S3}${message.files[0].file.path??message.files[0].file.file.path}`} alt={"icon pdf"}/>
            </div>
            <div className={"flex-1"}>
                <div className={"reply-user-name " + (isMyMessage? "text-white font-bold text-opacity-75" : "text-gray-900")} style={{color: message.themeColor}}>
                    {message.sender.bizfullname||message.sender.fullname}
                </div>
                <div className={"truncate reply-content-text max-w-[250px] " + (isMyMessage? "text-white text-opacity-75" : "text-gray-400")}>
                    {message.files[0].file.nameOrg??message.files[0].file.file.nameOrg}
                </div>
            </div>
        </div>
    )
}
