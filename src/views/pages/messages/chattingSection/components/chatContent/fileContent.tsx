import React, {FC} from "react";
import PDFIcon from 'assets/images/CBS-PDF-Icon-48.svg';

type Props = {
    file: any
}
const FileChatContent:FC<Props> = ({file}) => {
    const renderFileTypeImage = () => {
        switch (file.fileType){
            case "pdf":
                return <img className={"w-[48px] h-[48px]"} src={PDFIcon} alt={"icon pdf"}/>
        }
    }
    return (
        <div className={"message-file-content flex"}>
            {renderFileTypeImage()}
            <div className={"flex-1 flex flex-col justify-center ml-[7px]"}>
                <a href={file.fileUrl} download className={"mb-[2px]"}>{file.fileName}</a>
                <div className={"text-gray-400"}>{file.fileSize}</div>
            </div>
        </div>
    )
}

export default FileChatContent
