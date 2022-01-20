import React, {FC} from "react";
import {map as _map} from "lodash"
import {LazyLoadImage} from "react-lazy-load-image-component";
type Props = {
    avatars: string[];
    classesMap: {[key: string] : any};
    imageClass: string;
}

const AvatarGroupChat:FC<Props> = ({avatars, classesMap, imageClass}) => {
    const classObj = classesMap["group_" + (avatars.length??1)];

    return (
        <div className={`rounded-full flex items-center justify-center text-white font-bold text-xl relative ${imageClass}`}>
            {
                _map(avatars, (avatar,index) => (
                    <LazyLoadImage effect="blur" wrapperClassName={`w-full h-full ${classObj["imgWidth"]} ${classObj["groupPosition"][index]}`} key={index} className={`rounded-full bg-gray-100 ring-2 ring-white`} src={avatar} alt={"---"}/>
                ))
            }
        </div>
    )
}

export default AvatarGroupChat;