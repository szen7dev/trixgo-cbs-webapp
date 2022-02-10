import React, {FC} from "react";

type Props = {
    message: any;
    className?: string;
}
const ImagePinned:FC<Props> = ({message, className}) => {
    return (
        <>
            <img className={"w-[36px] h-[36px] rounded-md overflow-hidden object-cover"} src={message.files[0].file.file.url} alt={"icon pdf"}/>
            <div className={"flex-1 max-w-[185px] ml-[5px]"}>
                <div className={"text-primary"}>Tin đã ghim</div>
                <div className={"truncate"}>
                    Hình ảnh
                </div>
            </div>
        </>
    )
}

export default ImagePinned;
