import React, {FC} from "react";

type Props = {
    message: any;
    className?: string;
}
const ImagePinned:FC<Props> = ({message, className}) => {
    return (
        <>
            <img className={"w-[36px] h-[36px] rounded-md overflow-hidden object-cover"} style={{width: 36}} src={`${process.env.REACT_APP_URL_S3}/${message.files[0].file.file.path}`} alt={"icon pdf"}/>
            <div className={"flex-1 max-w-[185px] ml-[5px]  flex flex-col justify-start"}>
                <div className={"text-primary text-left"}>Tin đã ghim</div>
                <div className={"truncate text-left"}>
                    Hình ảnh
                </div>
            </div>
        </>
    )
}

export default ImagePinned;
