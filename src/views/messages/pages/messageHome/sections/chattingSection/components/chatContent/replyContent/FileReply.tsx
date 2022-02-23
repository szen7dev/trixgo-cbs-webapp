import React, {FC} from "react";
import PDFIcon from "assets/images/CBS-PDF-Icon-48.svg";
import WordIcon from "assets/images/CBS-Word-Icon.svg";
import ExcelIcon from "assets/images/CBS-Excel-Icon.svg";
import SampleImage from "assets/images/icons8-image-256.svg";
import OtherIcon from "assets/images/CBS-Other-Icon.svg";

type Props = {
    message: any;
    className?: string;
}
export const FileReply:FC<Props> = ({message, className}) => {
    const renderFileTypeImage = (file:any) => {
        const filename = file.name;
        const extension = filename.split(".").pop();
        switch (extension){
            case "pdf":
                return <img  className={"w-[32px] h-[32px]"} src={PDFIcon} alt={"icon pdf"}/>
            case "doc":
            case "docx":
                return <img  className={"w-[32px] h-[32px]"} src={WordIcon} alt={"icon word"}/>
            case "xlsx":
            case "xls":
                return <img  className={"w-[32px] h-[32px]"} src={ExcelIcon} alt={"icon excel"}/>
            case "jpg":
            case "jpeg":
            case "png":
                return <img  className={"w-[32px] h-[32px]"} src={SampleImage} alt={"icon images"}/>
            default:
                return <img  className={"w-[32px] h-[32px]"} src={OtherIcon} alt={"icon other"}/>
        }
    }

    return (
        <div className={"reply-content border-l-2 border-primary pl-[7px] flex " + (className??"")}>
            <div className={"flex items-center justify-center mr-1 rounded-md overflow-hidden"}>
                {renderFileTypeImage(message.files[0].file.file)}
            </div>
            <div className={"flex-1"}>
                <div className={"reply-user-name text-blue-900"} style={{color: message.themeColor}}>
                    {message.sender.bizfullname||message.sender.fullname}
                </div>
                <div className={"truncate text-gray-400"}>
                    {message.files[0].file.file.nameOrg??message.files[0].file.file.name}
                </div>
            </div>
        </div>
    )
}
