import React, {FC} from "react";

import {ItemFileMessage, ItemMediaOfConversation} from "typings/apis/messages/listConversation";
import {map as _map} from "lodash";
type Props = {
    media: {
        dateFormat: string,
        files: ItemFileMessage[]
    };
    setModalShowImage: React.Dispatch<React.SetStateAction<{ show: boolean, index: number }>>;
}
export const ItemMediaInMessage:FC<Props> = ({media, setModalShowImage}) => {
    return (
        <div className={"mb-3 smooth-animation"}>
            <div className={"px-[10px] py-[15px] font-bold"}>{media.dateFormat}</div>
            <div className={"flex flex-wrap"}>
                {
                    _map(media.files.filter(image => image !== null), (image) => (
                        <div
                            key={image._id} className={"w-[108px] h-[108px] p-[2px] relative media-item-message"}>
                            <img onClick={() => {
                                setModalShowImage({show: true, index: image.index})
                            }}  src={`${process.env.REACT_APP_URL_S3}${image?.path}`} alt={"----"} className={"w-full h-full object-cover cursor-pointer"}/>
                            <div className={"absolute top-[10px] right-[10px] input-wrapper"}>
                                <input type="checkbox" className="form-check-input transition duration-200 invisible opacity-0  rounded-full cursor-pointer w-[24px] h-[24px] min-w-[24px] min-h-[24px]" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
