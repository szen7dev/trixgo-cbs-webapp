import React, {FC} from "react";
import PDFIcon from "assets/images/CBS-PDF-Icon-48.svg";
import WordIcon from "assets/images/CBS-Word-Icon.svg";
import ExcelIcon from "assets/images/CBS-Excel-Icon.svg";
import OtherIcon from "assets/images/CBS-Other-Icon.svg";
import {LazyLoadImage} from "react-lazy-load-image-component";
type Props = {
    file: any
}
const ItemFileInMessage:FC<Props> = ({file}) => {
    const renderFileTypeImage = (file:any) => {
        switch (file.fileType){
            case "pdf":
                return <LazyLoadImage effect="blur" className={"w-[48px] h-[48px]"} src={PDFIcon} alt={"icon pdf"}/>
            case "word":
                return <LazyLoadImage effect="blur" className={"w-[48px] h-[48px]"} src={WordIcon} alt={"icon pdf"}/>
            case "excel":
                return <LazyLoadImage effect="blur" className={"w-[48px] h-[48px]"} src={ExcelIcon} alt={"icon pdf"}/>
            default:
                return <LazyLoadImage effect="blur" className={"w-[48px] h-[48px]"} src={OtherIcon} alt={"icon pdf"}/>
        }
    }

    return (
        <div className={"flex media-item-message py-[10px] px-[21px] relative hover:bg-gray-200"}>
            {renderFileTypeImage(file)}
            <div className={"flex-1 ml-2"}>
                <p>{file.fileName}</p>
                <p className={"text-gray-400"}>{file.fileSize} {file.date}</p>
            </div>
            <input type="checkbox" className="form-check-input transition duration-200 rounded-full cursor-pointer absolute top-10px right-10px invisible opacity-0 w-[24px] h-[24px]" />
        </div>
    )
}

export default ItemFileInMessage