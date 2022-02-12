import React, {FC} from "react";

type Props = {
    message: any;
    className?: string;
}
const ImageReply:FC<Props> = ({message, className}) => {
    return (
        <div className={"reply-content border-l-2 border-primary pl-[7px] flex " + (className??"")}>
            <div className={"flex items-center justify-center mr-1"}>
                <img className={"w-[32px] h-[32px] rounded-md overflow-hidden"} src={`${process.env.REACT_APP_URL_S3}/${message.files[0].file.file.path}`} alt={"icon pdf"}/>
            </div>
            <div className={"flex-1"}>
                <div className={"reply-user-name text-blue-900"} style={{color: message.themeColor}}>
                    {message.sender.bizfullname}
                </div>
                <div className={"truncate text-gray-400"}>
                    {message.files[0].file.file.nameOrg??message.files[0].file.file.name}
                </div>
            </div>
        </div>
    )
}

export default ImageReply;
