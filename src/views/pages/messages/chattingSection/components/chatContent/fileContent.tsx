import React, {FC} from "react";
import PDFIcon from 'assets/images/CBS-PDF-Icon-48.svg';
import DoubleTickIcon from "assets/images/icons8-double-tick-96.svg";
import {map as _map} from "lodash";
type Props = {
    message: any;
    className?: string;
}
const FileChatContent:FC<Props> = ({message, className}) => {
    const renderFileTypeImage = (file:any) => {
        switch (file.fileType){
            case "pdf":
                return <img className={"w-[48px] h-[48px]"} src={PDFIcon} alt={"icon pdf"}/>
        }
    }
    return (
        <div className={"max-w-[466px] rounded-lg p-[7px] pb-[10px] relative " + (className??"")}>
            {
                message.replyTo&&
                <div className={"reply-content border-l-2 border-primary pl-[7px]"}>
                    <div className={"reply-user-name"} style={{color: message.replyTo.themeColor}}>
                        {message.replyTo.userName}
                    </div>
                    <div className={"truncate text-gray-400"}>
                        {message.replyTo.content}
                    </div>
                </div>
            }
            <div className={"pr-[20px] pb-[5px]"}>
                {
                    message.content&&
                    _map(message.content, file => (
                        <div key={file._id} className={"message-file-content flex"}>
                            {renderFileTypeImage(file)}
                            <div className={"flex-1 flex flex-col justify-center ml-[7px]"}>
                                <a href={file.fileUrl} download className={"mb-[2px]"}>{file.fileName}</a>
                                <div className={"text-primary"}>{file.fileSize}</div>
                            </div>
                        </div>
                    ))
                }
                <div className={"date-message absolute bottom-3px right-4px text-primary text-xs flex items-center"}>
                    {message.date}<img className={"ml-1"} src={DoubleTickIcon} alt={"tick"}/>
                </div>
            </div>
        </div>
    )
}

export default FileChatContent
