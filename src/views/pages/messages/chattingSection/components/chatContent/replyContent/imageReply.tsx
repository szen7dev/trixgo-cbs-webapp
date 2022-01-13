import React, {FC} from "react";

type Props = {
    message: any
}
const ImageReply:FC<Props> = ({message}) => {
    return (
        <div className={"reply-content border-l-2 border-primary pl-[7px] flex"}>
            <div className={"flex items-center justify-center mr-1"}>
                {/*<img className={"w-[25px] h-[25px]"} src={message.content[0].fileUrl} alt={"icon pdf"}/>*/}
            </div>
            <div className={"flex-1"}>
                <div className={"reply-user-name text-blue-900"} style={{color: message.themeColor}}>
                    {message.sender.fullname}
                </div>
                <div className={"truncate text-gray-400"}>
                    {/*{message.content[0].fileName}*/}
                    [Hình ảnh]
                </div>
            </div>
        </div>
    )
}

export default ImageReply;
