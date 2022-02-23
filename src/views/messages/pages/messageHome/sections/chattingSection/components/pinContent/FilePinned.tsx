import React, {FC, useCallback} from "react";
import PDFIcon from "assets/images/CBS-PDF-Icon-48.svg";
import WordIcon from "assets/images/CBS-Word-Icon.svg";
import ExcelIcon from "assets/images/CBS-Excel-Icon.svg";
import SampleImage from "assets/images/icons8-image-256.svg";
import OtherIcon from "assets/images/CBS-Other-Icon.svg";
import {ItemMessage} from "typings/apis/messages/listMessage";

type Props = {
    message: ItemMessage;
}
export const FilePinned:FC<Props> = ({message}) => {
    const renderFileTypeImage = useCallback(() => {
        const filename = message.files[0].file.file.name;
        const extension = filename.split(".").pop();
        switch (extension){
            case "pdf":
                return <img  className={"w-[36px] h-[36px]"} style={{width: 36}} src={PDFIcon} alt={"icon pdf"}/>
            case "doc":
            case "docx":
                return <img  className={"w-[36px] h-[36px]"} style={{width: 36}} src={WordIcon} alt={"icon word"}/>
            case "xlsx":
            case "xls":
                return <img  className={"w-[36px] h-[36px]"} style={{width: 36}} src={ExcelIcon} alt={"icon excel"}/>
            case "jpg":
            case "jpeg":
            case "png":
                return <img  className={"w-[36px] h-[36px]"} style={{width: 36}} src={SampleImage} alt={"icon images"}/>
            default:
                return <img  className={"w-[36px] h-[36px]"} style={{width: 36}} src={OtherIcon} alt={"icon other"}/>
        }
    }, [message])

    return (
        <>
            {renderFileTypeImage()}
            <div className={"flex-1 max-w-[185px] ml-[5px] flex flex-col justify-start"}>
                <div className={"text-primary text-left"}>Tin đã ghim</div>
                <div className={"truncate text-left"}>
                    {message.files[0].file.file.nameOrg??message.files[0].file.file.name}
                </div>
            </div>
        </>
    )
}
