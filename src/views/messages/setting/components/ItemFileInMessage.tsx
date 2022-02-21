import React, {FC} from "react";
import PDFIcon from "assets/images/CBS-PDF-Icon-48.svg";
import WordIcon from "assets/images/CBS-Word-Icon.svg";
import ExcelIcon from "assets/images/CBS-Excel-Icon.svg";
import OtherIcon from "assets/images/CBS-Other-Icon.svg";

import {ItemMediaOfConversation} from "typings/apis/messages/listConversation";
import {map as _map} from "lodash";
import SampleImage from "assets/images/icons8-image-256.svg";
type Props = {
    file: ItemMediaOfConversation
}
const ItemFileInMessage:FC<Props> = ({file}) => {
    const renderFileTypeImage = (filename: string) => {
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

    const formatBytes = (bytes: number, decimals = 3) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    return (
        <div className={"mb-3"}>
            <div className={"px-[10px] py-[15px] font-bold"}>{file.dataFormat}</div>
            {
                _map(file.messages, f => (
                    <div key={f._id} className={"flex media-item-message py-[10px] px-[21px] relative hover:bg-gray-200"}>
                        {renderFileTypeImage(f.name)}
                        <div className={"flex-1 ml-2"}>
                            <a href={`${process.env.REACT_APP_URL_S3}/${f.path}`} download target="_blank" rel="noreferrer">{f.nameOrg??f.name}</a>
                            <p className={"text-gray-400"}>{formatBytes(f.size)}</p>
                        </div>
                        <input type="checkbox" className="form-check-input transition duration-200 rounded-full cursor-pointer absolute top-10px right-10px invisible opacity-0 w-[24px] h-[24px] min-w-[24px] min-h-[24px]" />
                    </div>
                ))
            }
        </div>
    )
}

export default ItemFileInMessage