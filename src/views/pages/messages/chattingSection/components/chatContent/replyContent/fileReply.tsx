import React, {FC} from "react";
import PDFIcon from "assets/images/CBS-PDF-Icon-48.svg";
import WORDIcon from "assets/images/CBS-Word-Icon-48.svg";
import EXCELIcon from "assets/images/CBS-Excel-Icon-48.svg";

type Props = {
    message: any;
}
const FileReply:FC<Props> = ({message}) => {
    const renderFileTypeImage = (file:any) => {
        switch (file.fileType){
            case "pdf":
                return <img className={"w-[25px] h-[25px]"} src={PDFIcon} alt={"icon pdf"}/>
            case "word":
                return <img className={"w-[25px] h-[25px]"} src={WORDIcon} alt={"icon pdf"}/>
            case "excel":
                return <img className={"w-[25px] h-[25px]"} src={EXCELIcon} alt={"icon pdf"}/>
        }
    }

    return (
        <div className={"reply-content border-l-2 border-primary pl-[7px] flex"}>
            <div className={"flex items-center justify-center mr-1"}>
                {renderFileTypeImage(message.content[0])}
            </div>
            <div className={"flex-1"}>
                <div className={"reply-user-name"} style={{color: message.themeColor}}>
                    {message.userName}
                </div>
                <div className={"truncate text-gray-400"}>
                    {message.content[0].fileName}
                </div>
            </div>
        </div>
    )
}

export default FileReply;
