import React, {FC} from "react";
import PDFIcon from 'assets/images/CBS-PDF-Icon-48.svg';
import WordIcon from 'assets/images/CBS-Word-Icon.svg';
import ExcelIcon from 'assets/images/CBS-Excel-Icon.svg';
import OtherIcon from 'assets/images/CBS-Other-Icon.svg';
import SampleImage from "assets/images/icons8-image-256.svg";

import DoubleTickIcon from "assets/images/icons8-double-tick-96.svg";
import {map as _map} from "lodash";
import TextReply from "./replyContent/textReply";
import FileReply from "./replyContent/fileReply";
import ImageReply from "./replyContent/imageReply";

import moment from "moment";
type Props = {
    message: any;
    className?: string;
    showSenderName?: boolean;
    isMyMessage?: boolean;
}
const FileChatContent:FC<Props> = ({message, className,showSenderName, isMyMessage}) => {
    const renderFileTypeImage = (file:any) => {
        const filename = file.name;
        const extension = filename.split(".").pop();
        switch (extension){
            case "pdf":
                return <img  className={"w-[48px] h-[48px]"} src={PDFIcon} alt={"icon pdf"}/>
            case "doc":
            case "docx":
                return <img  className={"w-[48px] h-[48px]"} src={WordIcon} alt={"icon word"}/>
            case "xlsx":
            case "xls":
                return <img  className={"w-[48px] h-[48px]"} src={ExcelIcon} alt={"icon excel"}/>
            case "jpg":
            case "jpeg":
            case "png":
                return <img  className={"w-[48px] h-[48px]"} src={SampleImage} alt={"icon images"}/>
            default:
                return <img  className={"w-[48px] h-[48px]"} src={OtherIcon} alt={"icon other"}/>
        }
    }

    const renderReply = () => {
        switch (message.parent.type) {
            case 0:
                return <TextReply message={message.parent}/>;
            case 2:
                return <FileReply message={message.parent}/>;
            case 1:
                return <ImageReply message={message.parent}/>;
        }
    }

    const formatBytes = (bytes: number, decimals = 3) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    return (
        <div className={"max-w-[366px] min-w-[70px] rounded-lg p-[7px] pb-[10px] relative " + (className??"")}>
            {
                showSenderName&&
                <div className={"reply-user-name"} style={{color: message.themeColor}}>
                    {message.userName}
                </div>
            }
            {
                message.parent&&
                renderReply()
            }
            <div className={"pr-[20px] pb-[5px]"}>
                {
                    message.files&&
                    _map(message.files, file => (
                        <div key={file._id} className={"message-file-content flex mb-1"}>
                            <div className={"relative"}>
                                {renderFileTypeImage(file.file.file)}
                                {
                                    file.progress!==null&&file.progress!==undefined&&file.progress<100&&
                                    <div className={"absolute w-full flex items-center justify-center top-5px h-[5px]"}>
                                        <div className={"rounded-full overflow-hidden bg-white bg-opacity-70 relative w-11/12 h-full"}>
                                            <div style={{width: `${file.progress}%`}} className={"absolute transition duration-150 h-full bg-primary"}></div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className={"flex-1 flex flex-col justify-center ml-[7px]"}>
                                <a href={`${process.env.REACT_APP_URL_S3}/${file.file.file.path}`} download className={"mb-[2px] hover:text-primary break-all"}>{file.file.file.nameOrg??file.file.file.name}</a>
                                <div className={"text-primary"}>{formatBytes(file.file.file.size)}</div>
                            </div>
                        </div>
                    ))
                }
                <div className={"date-message absolute bottom-3px right-4px text-xs flex items-center " + (isMyMessage?"text-primary":"text-gray-500")}>
                    {moment(message.createdAt).format("HH:mm")}<img  className={"ml-1"} src={DoubleTickIcon} alt={"tick"}/>
                </div>
            </div>
        </div>
    )
}

export default FileChatContent
