import React, {FC} from "react";

type Props = {
    media: any
}
const ItemMediaInMessage:FC<Props> = ({media}) => {
    return (
        <div className={"w-4/12 p-[2px] relative media-item-message"}>
            <img src={media.imageUrl} alt={"----"} className={"w-full h-full object-cover"}/>
            <input type="checkbox" className="form-check-input transition duration-200 rounded-full cursor-pointer absolute top-10px right-10px invisible opacity-0 w-[24px] h-[24px]" />
        </div>
    )
}

export default ItemMediaInMessage
