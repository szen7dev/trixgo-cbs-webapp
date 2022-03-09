import React, {FC} from "react";

import {ItemMediaOfConversation} from "typings/apis/messages/listConversation";
import {map as _map} from "lodash";
type Props = {
    media: ItemMediaOfConversation;
    setModalShowImage: React.Dispatch<React.SetStateAction<{ show: boolean, index: number }>>;
    listImages: any[];
}
export const ItemMediaInMessage:FC<Props> = ({media, setModalShowImage, listImages}) => {
    return (
        <div className={"mb-3 smooth-animation"}>
            <div className={"px-[10px] py-[15px] font-bold"}>{media.dataFormat}</div>
            <div className={"flex flex-wrap"}>
                {
                    _map(media.messages.filter(image => image !== null), (image, index) => (
                        <div
                            key={image._id} className={"w-[130px] h-[130px] p-[2px] relative media-item-message"}>
                            <img onClick={() => {
                                const startIndexFrom = listImages.findIndex(item => item === image._id);
                                setModalShowImage({show: true, index: startIndexFrom})
                            }}  src={`${process.env.REACT_APP_URL_S3}${image?.path}`} alt={"----"} className={"w-full h-full object-cover cursor-pointer"}/>
                            <input type="checkbox" className="form-check-input transition duration-200 rounded-full cursor-pointer absolute top-10px right-10px invisible opacity-0 w-[24px] h-[24px] min-w-[24px] min-h-[24px]" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
