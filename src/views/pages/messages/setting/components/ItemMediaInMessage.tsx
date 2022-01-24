import React, {FC} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {ItemMediaOfConversation} from "typings/apis/messages/listConversation";
import {map as _map} from "lodash";
type Props = {
    media: ItemMediaOfConversation
}
const ItemMediaInMessage:FC<Props> = ({media}) => {
    return (
        <div className={"mb-3"}>
            <div className={"px-[10px] py-[15px] font-bold"}>{media.dataFormat}</div>
            <div className={"flex flex-wrap"}>
                {
                    _map(media.messages, image => (
                        <div key={image._id} className={"w-4/12 p-[2px] relative media-item-message"}>
                            <LazyLoadImage effect="blur" src={image.url} alt={"----"} wrapperClassName={"w-full h-full"} className={"w-full h-full object-cover"}/>
                            <input type="checkbox" className="form-check-input transition duration-200 rounded-full cursor-pointer absolute top-10px right-10px invisible opacity-0 w-[24px] h-[24px]" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ItemMediaInMessage
