import React, {FC} from "react";
import {map as _map} from "lodash"
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
                    <img key={index} className={`rounded-full bg-gray-100 ring-2 ring-white ${classObj["imgWidth"]} ${classObj["groupPosition"][index]}`} src={avatar} alt={"---"}/>
                ))
            }
        </div>
    )
}

export default AvatarGroupChat;