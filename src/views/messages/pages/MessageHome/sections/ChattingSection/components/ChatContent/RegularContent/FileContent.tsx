import React, {FC, useCallback} from "react";
import PDFIcon from 'assets/images/CBS-PDF-Icon-48.svg';
import WordIcon from 'assets/images/CBS-Word-Icon.svg';
import ExcelIcon from 'assets/images/CBS-Excel-Icon.svg';
import OtherIcon from 'assets/images/CBS-Other-Icon.svg';

import DoubleTickIcon from "assets/images/icons8-double-tick-96.svg";
import {map as _map} from "lodash";
import { CircularProgressbar , buildStyles } from 'react-circular-progressbar';
import moment from "moment";
import {ReactionList, ReactionActions} from "../../Reactions";
import {ContactReply, TextReply, FileReply, ImageReply, DeleteReply} from "../ReplyContent";
import {MessageStatus} from "./MessageStatus";
type Props = {
    message: any;
    className?: string;
    showSenderName?: boolean;
    isMyMessage?: boolean;
    context: any;
    isMini?: boolean
}
export const FileChatContent:FC<Props> = ({message, className,showSenderName, isMyMessage, context, isMini}) => {
    const renderFileTypeImage = (file:any) => {
        const filename = file.name??file.file.name;
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
                return <img  className={"w-[48px] h-[48px] rounded-md overflow-hidden object-cover"} src={file.fakeUrl ?? `${process.env.REACT_APP_URL_S3}${file.path??file.file.path}`} alt={"icon images"}/>
            default:
                return <img  className={"w-[48px] h-[48px]"} src={OtherIcon} alt={"icon other"}/>
        }
    }

    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const isDeleted = useCallback(() => {
        if (message.parent.usersDelete&&message.parent.usersDelete.includes(profileId)) {
            return true
        }
        return (message.parent.files??[]).some((file: { usersDelete: string | any[]; }) => file.usersDelete && file.usersDelete.includes(profileId));
    }, [message])
    const renderReply = () => {
        if (isDeleted()) {
            return <DeleteReply message={message} />
        }
        switch (message.parent.type) {
            case 0:
                return <TextReply message={message.parent}/>;
            case 2:
                return <FileReply message={message.parent}/>;
            case 1:
                return <ImageReply message={message.parent}/>;
            case 7:
                return <ContactReply message={message.parent}/>;
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
        <div className={"min-w-[70px] rounded-lg p-[7px] pb-[10px] relative " + (className??"") + (isMini?" max-w-[250px]":" max-w-[366px]")}>
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
            {
                message.files&&
                _map(message.files, file => (
                    <div key={file._id} className={"message-file-content flex mb-1"}>
                        <div className={"relative"}>
                            {renderFileTypeImage(file.file)}
                        </div>
                        <div className={"flex-1 flex flex-col justify-center ml-[7px] pr-[20px]"}>
                            <a href={`${process.env.REACT_APP_URL_S3}${file.file.path??file.file.file.path}`} download className={"mb-[2px] hover:text-primary break-all"}>{file.file.nameOrg??file.file.file.nameOrg}</a>
                            <div className={"text-gray-400 text-xs"}>{formatBytes(file.file.size??file.file.file.size)}</div>
                        </div>
                        {
                            message.fileProgress !== undefined && message.fileProgress[file._id] !== undefined && message.fileProgress[file._id] < 100 &&
                            <div className={"w-[40px] h-[40px]"}>
                                <CircularProgressbar
                                    styles={buildStyles({
                                        // Colors
                                        pathColor: `#0060E1`,
                                        trailColor: '#cccccc',
                                        textColor: `#0060E1`,
                                    })}
                                    value={message.fileProgress[file._id]} text={`${message.fileProgress[file._id]}%`} />
                            </div>
                        }
                    </div>
                ))
            }
            <div className={"date-message text-xs flex items-center w-full justify-end " + (isMyMessage?"text-primary":"text-gray-500")}>
                <ReactionList message={message}/>
                <span className={"ml-[5px]"}>{moment(message.createAt).format("HH:mm")}</span>
                <MessageStatus message={message}/>
            </div>
            <ReactionActions context={context} message={message}/>
        </div>
    )
}
